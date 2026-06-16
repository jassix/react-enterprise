import { Err, Ok } from "@repo/std/result";
import type { Result } from "@repo/std/result";
import type { ComponentRegistry, RegistryError } from "~/application/ports/component-registry";
import type {
  DesignSystemIntrospector,
  DesignSystemSnapshot,
} from "~/application/ports/design-system-introspector";
import type { FileSystem } from "~/application/ports/file-system";
import type { Refiner, RefinerError, RefinerOutput } from "~/application/ports/refiner";
import type { Shell } from "~/application/ports/shell";
import type { ApplyOutputOutcome, RefineLoopError } from "~/application/usecases/refine-shared";
import {
  applyOutput,
  buildDiffPairs,
  loadExemplar,
  loadRuleDocs,
  runPandaCodegen,
  runRefineLoop,
  unifiedDiffOf,
  updateBarrelsFor,
} from "~/application/usecases/refine-shared";
import { componentName as specComponentName } from "~/domain/component-spec";
import type { ComponentSpec } from "~/domain/component-spec";
import { blockPlacement, primitivePlacement } from "~/domain/placement-plan";
import type { PlacementPlan } from "~/domain/placement-plan";
import { isBlock, isUiOrComponent } from "~/domain/registry-item";
import type { RegistryFile, RegistryItem } from "~/domain/registry-item";
import type { RecipeMode, RefinementContext, SourceFile } from "~/domain/refinement-context";

export interface AddComponentDeps {
  readonly registry: ComponentRegistry;
  readonly refiner: Refiner;
  readonly introspector: DesignSystemIntrospector;
  readonly fs: FileSystem;
  readonly shell: Shell;
  readonly resolveRecipeMode: ResolveRecipeMode;
}

export interface PlanAddComponentDeps {
  readonly registry: ComponentRegistry;
  readonly introspector: DesignSystemIntrospector;
}

export interface ExecuteAddComponentDeps {
  readonly refiner: Refiner;
  readonly fs: FileSystem;
  readonly shell: Shell;
}

export type ResolveRecipeMode = (args: ResolveRecipeModeArgs) => Promise<RecipeMode | "abort">;

export interface ResolveRecipeModeArgs {
  readonly componentName: string;
  readonly matchedRecipe: string | null;
  readonly target: PlacementPlan;
}

export interface AddComponentInput {
  readonly spec: ComponentSpec;
  readonly rootDir: string;
  readonly options: AddComponentOptions;
}

export interface AddComponentPlan {
  readonly item: RegistryItem;
  readonly snapshot: DesignSystemSnapshot;
  readonly target: PlacementPlan;
  readonly matchedRecipe: string | null;
}

export interface AddComponentOptions {
  readonly dryRun: boolean;
  readonly runCodegen: boolean;
  readonly refine: boolean;
  readonly targetOverride?: PlacementPlan;
  readonly categoryOverride?: string;
}

export type AddComponentError =
  | { readonly kind: "registry"; readonly cause: RegistryError }
  | { readonly kind: "unsupported-type"; readonly type: string }
  | { readonly kind: "no-files" }
  | { readonly kind: "cancelled" }
  | { readonly kind: "refiner"; readonly cause: RefinerError }
  | { readonly kind: "validation"; readonly messages: readonly string[] }
  | { readonly kind: "io"; readonly cause: unknown }
  | { readonly kind: "codegen"; readonly stderr: string };

export interface AddComponentOutcome {
  readonly registryItem: RegistryItem;
  readonly target: PlacementPlan;
  readonly recipeMode: RecipeMode;
  readonly output: RefinerOutput;
  readonly applied: ApplyOutputOutcome | null;
  readonly diff: string | null;
  readonly codegen: "ran" | "skipped" | "failed";
  readonly notes: readonly string[];
}

export async function planAddComponent(
  deps: PlanAddComponentDeps,
  input: AddComponentInput,
): Promise<Result<AddComponentPlan, AddComponentError>> {
  const resolved = await deps.registry.resolve(input.spec);
  if (resolved.isErr()) return Err({ kind: "registry", cause: resolved.unwrapErr() });
  const item = resolved.unwrap();

  const snapshot = await deps.introspector.snapshot(input.rootDir);

  const placement = planPlacement({
    item,
    spec: input.spec,
    snapshot,
    rootDir: input.rootDir,
    options: input.options,
  });
  if (placement.isErr()) return Err(placement.unwrapErr());
  const target = placement.unwrap();

  const matchedRecipe = findMatchedRecipe(target.componentName, snapshot);
  return Ok({ item, snapshot, target, matchedRecipe });
}

export async function executeAddComponent(
  deps: ExecuteAddComponentDeps,
  input: AddComponentInput,
  plan: AddComponentPlan,
  recipeMode: RecipeMode,
): Promise<Result<AddComponentOutcome, AddComponentError>> {
  const sourceFiles = mapRegistryFiles(plan.item.files);
  if (sourceFiles.length === 0) return Err({ kind: "no-files" });

  const exemplar = await loadExemplar(deps.fs, plan.snapshot.exemplarPath);
  const rules = await loadRuleDocs(deps.fs, input.rootDir);

  const context: RefinementContext = {
    rules,
    recipes: plan.snapshot.recipes,
    semanticTokens: plan.snapshot.semanticTokens,
    categories: plan.snapshot.categories,
    iconNames: plan.snapshot.iconNames,
    exemplar,
    source: sourceFiles,
    target: plan.target,
    recipeMode,
  };

  const refined = await runRefineLoop(
    { refiner: deps.refiner, fs: deps.fs, shell: deps.shell },
    context,
    input.rootDir,
  );
  if (refined.isErr()) return Err(toAddError(refined.unwrapErr()));
  const output = refined.unwrap();

  if (input.options.dryRun) {
    const pairs = await buildDiffPairs(deps.fs, input.rootDir, output);
    return Ok({
      registryItem: plan.item,
      target: plan.target,
      recipeMode,
      output,
      applied: null,
      diff: unifiedDiffOf(pairs),
      codegen: "skipped",
      notes: output.notes ?? [],
    });
  }

  const applied = await applyOutput({ fs: deps.fs }, input.rootDir, output);
  if (applied.isErr()) return Err({ kind: "io", cause: applied.unwrapErr().cause });

  const barrels = await updateBarrelsFor(deps.fs, input.rootDir, output, plan.target);
  if (barrels.isErr()) return Err({ kind: "io", cause: barrels.unwrapErr().cause });

  let codegen: AddComponentOutcome["codegen"] = "skipped";
  if (input.options.runCodegen) {
    const result = await runPandaCodegen(deps.shell, input.rootDir);
    if (result.isErr()) {
      codegen = "failed";
      return Err({ kind: "codegen", stderr: result.unwrapErr().stderr });
    }
    codegen = "ran";
  }

  return Ok({
    registryItem: plan.item,
    target: plan.target,
    recipeMode,
    output,
    applied: applied.unwrap(),
    diff: null,
    codegen,
    notes: output.notes ?? [],
  });
}

export async function addComponent(
  deps: AddComponentDeps,
  input: AddComponentInput,
): Promise<Result<AddComponentOutcome, AddComponentError>> {
  const planned = await planAddComponent(deps, input);
  if (planned.isErr()) return Err(planned.unwrapErr());
  const plan = planned.unwrap();

  const choice = await deps.resolveRecipeMode({
    componentName: plan.target.componentName,
    matchedRecipe: plan.matchedRecipe,
    target: plan.target,
  });
  if (choice === "abort") return Err({ kind: "cancelled" });
  const recipeMode: RecipeMode = plan.matchedRecipe !== null ? "matched" : choice;

  return executeAddComponent(deps, input, plan, recipeMode);
}

interface PlanPlacementArgs {
  readonly item: RegistryItem;
  readonly spec: ComponentSpec;
  readonly snapshot: DesignSystemSnapshot;
  readonly rootDir: string;
  readonly options: AddComponentOptions;
}

function planPlacement(args: PlanPlacementArgs): Result<PlacementPlan, AddComponentError> {
  if (args.options.targetOverride) {
    return Ok(args.options.targetOverride);
  }

  const name = specComponentName(args.spec);

  if (isBlock(args.item.type)) {
    return Ok(blockPlacement(args.rootDir, name));
  }
  if (isUiOrComponent(args.item.type)) {
    const category = pickCategory({
      name,
      override: args.options.categoryOverride,
      snapshot: args.snapshot,
    });
    return Ok(primitivePlacement(args.rootDir, category, name));
  }
  return Err({ kind: "unsupported-type", type: args.item.type });
}

interface PickCategoryArgs {
  readonly name: string;
  readonly override: string | undefined;
  readonly snapshot: DesignSystemSnapshot;
}

const CATEGORY_HEURISTIC: Record<string, string> = {
  button: "buttons",
  "button-group": "buttons",
  "toggle-group": "buttons",
  toggle: "buttons",
  dialog: "overlays",
  "alert-dialog": "overlays",
  sheet: "overlays",
  drawer: "overlays",
  popover: "overlays",
  tooltip: "overlays",
  "hover-card": "overlays",
  menu: "overlays",
  menubar: "overlays",
  "context-menu": "overlays",
  "navigation-menu": "overlays",
  command: "overlays",
  toast: "feedback",
  sonner: "feedback",
  alert: "feedback",
  progress: "feedback",
  spinner: "feedback",
  skeleton: "feedback",
  empty: "feedback",
  input: "forms",
  textarea: "forms",
  "input-otp": "forms",
  "input-group": "forms",
  select: "forms",
  "native-select": "forms",
  combobox: "forms",
  checkbox: "forms",
  "radio-group": "forms",
  switch: "forms",
  slider: "forms",
  label: "forms",
  field: "forms",
  form: "forms",
  accordion: "disclosure",
  collapsible: "disclosure",
  avatar: "data-display",
  badge: "data-display",
  card: "data-display",
  table: "data-display",
  "data-table": "data-display",
  chart: "data-display",
  kbd: "data-display",
  icon: "data-display",
  item: "data-display",
  separator: "data-display",
  pagination: "collections",
  carousel: "collections",
  breadcrumb: "collections",
  "scroll-area": "layout",
  "aspect-ratio": "layout",
  resizable: "layout",
  sidebar: "layout",
  tabs: "layout",
  calendar: "date",
  "date-picker": "date",
};

function pickCategory(args: PickCategoryArgs): string {
  if (args.override && args.snapshot.categories.includes(args.override)) {
    return args.override;
  }
  const heuristic = CATEGORY_HEURISTIC[args.name];
  if (heuristic && args.snapshot.categories.includes(heuristic)) {
    return heuristic;
  }
  return args.snapshot.categories[0] ?? "data-display";
}

function findMatchedRecipe(componentName: string, snapshot: DesignSystemSnapshot): string | null {
  const match = snapshot.recipes.find((r) => r.name === componentName);
  return match ? match.name : null;
}

function mapRegistryFiles(files: readonly RegistryFile[]): readonly SourceFile[] {
  return files
    .filter((f) => f.content.length > 0)
    .map((f) => ({ path: f.path, content: f.content }));
}

function toAddError(err: RefineLoopError): AddComponentError {
  if (err.kind === "refiner") return { kind: "refiner", cause: err.cause };
  return { kind: "validation", messages: err.messages };
}

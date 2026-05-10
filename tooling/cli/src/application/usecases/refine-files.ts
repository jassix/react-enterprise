import { Err, Ok, type Result } from "@repo/std/result";
import type {
  DesignSystemIntrospector,
  DesignSystemSnapshot,
} from "~/application/ports/design-system-introspector";
import type { FileSystem } from "~/application/ports/file-system";
import type { Refiner, RefinerError, RefinerOutput } from "~/application/ports/refiner";
import type { Shell } from "~/application/ports/shell";
import type {
  ApplyOutputOutcome,
  RefineLoopError,
} from "~/application/usecases/refine-shared";
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
import {
  blockPlacement,
  type PlacementPlan,
  primitivePlacement,
} from "~/domain/placement-plan";
import type {
  RecipeMode,
  RefinementContext,
  SourceFile,
} from "~/domain/refinement-context";

export interface RefineFilesDeps {
  readonly refiner: Refiner;
  readonly introspector: DesignSystemIntrospector;
  readonly fs: FileSystem;
  readonly shell: Shell;
}

export interface RefineFilesInput {
  readonly files: readonly string[];
  readonly rootDir: string;
  readonly options: RefineFilesOptions;
}

export interface RefineFilesOptions {
  readonly dryRun: boolean;
  readonly runCodegen: boolean;
  readonly placementOverride?: PlacementPlan;
  readonly recipeMode: RecipeMode;
}

export type RefineFilesError =
  | { readonly kind: "no-files" }
  | { readonly kind: "missing-file"; readonly path: string }
  | { readonly kind: "unresolved-placement"; readonly path: string }
  | { readonly kind: "refiner"; readonly cause: RefinerError }
  | { readonly kind: "validation"; readonly messages: readonly string[] }
  | { readonly kind: "io"; readonly cause: unknown }
  | { readonly kind: "codegen"; readonly stderr: string };

export interface RefineFilesOutcome {
  readonly target: PlacementPlan;
  readonly recipeMode: RecipeMode;
  readonly output: RefinerOutput;
  readonly applied: ApplyOutputOutcome | null;
  readonly diff: string | null;
  readonly codegen: "ran" | "skipped" | "failed";
  readonly notes: readonly string[];
}

export async function refineFiles(
  deps: RefineFilesDeps,
  input: RefineFilesInput,
): Promise<Result<RefineFilesOutcome, RefineFilesError>> {
  if (input.files.length === 0) return Err({ kind: "no-files" });

  const sources: SourceFile[] = [];
  for (const abs of input.files) {
    if (!(await deps.fs.exists(abs))) return Err({ kind: "missing-file", path: abs });
    const rel = relativeTo(input.rootDir, abs);
    sources.push({ path: rel, content: await deps.fs.read(abs) });
  }

  const snapshot = await deps.introspector.snapshot(input.rootDir);

  const target =
    input.options.placementOverride ?? inferPlacement(input.rootDir, sources, snapshot);
  if (!target) {
    return Err({ kind: "unresolved-placement", path: sources[0]!.path });
  }

  const exemplar = await loadExemplar(deps.fs, snapshot.exemplarPath);
  const rules = await loadRuleDocs(deps.fs, input.rootDir);

  const context: RefinementContext = {
    rules,
    recipes: snapshot.recipes,
    semanticTokens: snapshot.semanticTokens,
    categories: snapshot.categories,
    iconNames: snapshot.iconNames,
    exemplar,
    source: sources,
    target,
    recipeMode: input.options.recipeMode,
  };

  const refined = await runRefineLoop(
    { refiner: deps.refiner, fs: deps.fs, shell: deps.shell },
    context,
    input.rootDir,
  );
  if (refined.isErr()) return Err(toRefineFilesError(refined.unwrapErr()));
  const output = refined.unwrap();

  if (input.options.dryRun) {
    const pairs = await buildDiffPairs(deps.fs, input.rootDir, output);
    return Ok({
      target,
      recipeMode: input.options.recipeMode,
      output,
      applied: null,
      diff: unifiedDiffOf(pairs),
      codegen: "skipped",
      notes: output.notes ?? [],
    });
  }

  const applied = await applyOutput({ fs: deps.fs }, input.rootDir, output);
  if (applied.isErr()) return Err({ kind: "io", cause: applied.unwrapErr().cause });

  const barrels = await updateBarrelsFor(deps.fs, input.rootDir, output, target);
  if (barrels.isErr()) return Err({ kind: "io", cause: barrels.unwrapErr().cause });

  let codegen: RefineFilesOutcome["codegen"] = "skipped";
  if (input.options.runCodegen) {
    const result = await runPandaCodegen(deps.shell, input.rootDir);
    if (result.isErr()) {
      codegen = "failed";
      return Err({ kind: "codegen", stderr: result.unwrapErr().stderr });
    }
    codegen = "ran";
  }

  return Ok({
    target,
    recipeMode: input.options.recipeMode,
    output,
    applied: applied.unwrap(),
    diff: null,
    codegen,
    notes: output.notes ?? [],
  });
}

function relativeTo(rootDir: string, abs: string): string {
  const prefix = rootDir.endsWith("/") ? rootDir : `${rootDir}/`;
  return abs.startsWith(prefix) ? abs.slice(prefix.length) : abs;
}

function inferPlacement(
  rootDir: string,
  sources: readonly SourceFile[],
  snapshot: DesignSystemSnapshot,
): PlacementPlan | null {
  const first = sources[0];
  if (!first) return null;

  const primitiveMatch = first.path.match(
    /^packages\/ui\/primitives\/src\/ui\/([^/]+)\/([^/]+)\//,
  );
  if (primitiveMatch) {
    const [, category, name] = primitiveMatch;
    if (category && name && snapshot.categories.includes(category)) {
      return primitivePlacement(rootDir, category, name);
    }
  }

  const blockMatch = first.path.match(/^packages\/ui\/blocks\/src\/([^/]+)\//);
  if (blockMatch?.[1]) {
    return blockPlacement(rootDir, blockMatch[1]);
  }

  return null;
}

function toRefineFilesError(err: RefineLoopError): RefineFilesError {
  if (err.kind === "refiner") return { kind: "refiner", cause: err.cause };
  return { kind: "validation", messages: err.messages };
}

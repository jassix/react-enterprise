import { Err, Ok, type Result } from "@repo/std/result";
import type { FileSystem } from "~/application/ports/file-system";
import type { Refiner, RefinerError, RefinerOutput } from "~/application/ports/refiner";
import type { Shell } from "~/application/ports/shell";
import { computeUnifiedDiff, type FilePair } from "~/application/refinement/compute-diff";
import { validateOutput } from "~/application/refinement/validate-output";
import { dirname, join } from "~/domain/path";
import type { PlacementPlan } from "~/domain/placement-plan";
import type { RefinementContext, RuleDoc } from "~/domain/refinement-context";
import {
  appendRecipeExport,
  updateBarrel,
  type UpdateBarrelError,
} from "~/application/usecases/update-barrel";

const UI_KIT_RULES = [
  ".agents/rules/ui-kit/component-architecture.md",
  ".agents/rules/ui-kit/recipes.md",
  ".agents/rules/ui-kit/semantic-tokens.md",
  ".agents/rules/ui-kit/design-tokens.md",
  ".agents/rules/shared/types.md",
  ".agents/rules/shared/comments.md",
] as const;

export async function loadRuleDocs(fs: FileSystem, rootDir: string): Promise<readonly RuleDoc[]> {
  const out: RuleDoc[] = [];
  for (const rel of UI_KIT_RULES) {
    const abs = join(rootDir, rel);
    if (!(await fs.exists(abs))) continue;
    out.push({ path: rel, content: await fs.read(abs) });
  }
  return out;
}

export async function loadExemplar(
  fs: FileSystem,
  exemplarPath: string,
): Promise<{ readonly path: string; readonly content: string }> {
  const content = (await fs.exists(exemplarPath)) ? await fs.read(exemplarPath) : "";
  return { path: exemplarPath, content };
}

export interface RefineLoopDeps {
  readonly refiner: Refiner;
  readonly fs: FileSystem;
  readonly shell: Shell;
}

export type RefineLoopError =
  | { readonly kind: "refiner"; readonly cause: RefinerError }
  | { readonly kind: "validation"; readonly messages: readonly string[] };

const MAX_RETRIES = 2;

export async function runRefineLoop(
  deps: RefineLoopDeps,
  initial: RefinementContext,
  rootDir: string,
): Promise<Result<RefinerOutput, RefineLoopError>> {
  let context = initial;
  let lastFailure: readonly string[] = [];

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    const refined = await deps.refiner.refine(context);
    if (refined.isErr()) return Err({ kind: "refiner", cause: refined.unwrapErr() });

    const output = refined.unwrap();
    const validation = await validateOutput(deps, output, context, rootDir);
    if (validation.isOk()) return Ok(output);

    lastFailure = validation.unwrapErr().messages;
    if (attempt === MAX_RETRIES) break;
    context = { ...context, retryFeedback: lastFailure };
  }

  return Err({ kind: "validation", messages: lastFailure });
}

export interface ApplyOutputDeps {
  readonly fs: FileSystem;
}

export type ApplyOutputError = { readonly kind: "io"; readonly cause: unknown };

export interface ApplyOutputOutcome {
  readonly written: readonly string[];
  readonly recipeWritten: boolean;
}

export async function applyOutput(
  deps: ApplyOutputDeps,
  rootDir: string,
  output: RefinerOutput,
): Promise<Result<ApplyOutputOutcome, ApplyOutputError>> {
  const written: string[] = [];
  let recipeWritten = false;

  try {
    for (const file of output.files) {
      const abs = join(rootDir, file.path);
      await deps.fs.write(abs, file.content);
      written.push(file.path);
      if (file.path.startsWith("packages/ui/foundation/src/recipes/")) {
        recipeWritten = true;
      }
    }
  } catch (cause) {
    return Err({ kind: "io", cause });
  }

  return Ok({ written, recipeWritten });
}

export type BarrelUpdateError = { readonly kind: "io"; readonly cause: unknown };

export async function updateBarrelsFor(
  fs: FileSystem,
  rootDir: string,
  output: RefinerOutput,
  target: PlacementPlan,
): Promise<Result<void, BarrelUpdateError>> {
  const componentName = pascalCase(target.componentName);
  const componentEntry = output.files.find((f) => isComponentEntry(f.path, target));

  if (componentEntry) {
    const importPath = barrelImportPath(target);
    const barrelPath = barrelPathFor(rootDir, target);
    const hasTypeExport = exportsType(componentEntry.content, componentName);
    const res = await updateBarrel(fs, {
      barrelPath,
      componentName,
      importPath,
      hasTypeExport,
    });
    if (res.isErr()) return Err({ kind: "io", cause: res.unwrapErr().cause });
  }

  const recipeFile = output.files.find((f) =>
    f.path.startsWith("packages/ui/foundation/src/recipes/") && f.path.endsWith(".recipe.ts"),
  );
  if (recipeFile) {
    const recipeName = extractRecipeName(recipeFile.path);
    if (recipeName) {
      const res = await appendRecipeExport(fs, {
        indexPath: join(rootDir, "packages/ui/foundation/src/recipes/index.ts"),
        recipeName,
      });
      if (res.isErr()) {
        const err = res.unwrapErr() as UpdateBarrelError;
        return Err({ kind: "io", cause: err.cause });
      }
    }
  }

  return Ok(undefined);
}

function isComponentEntry(path: string, target: PlacementPlan): boolean {
  if (!path.endsWith(".tsx")) return false;
  const name = target.componentName;
  if (target.kind === "primitive") {
    const expected = `packages/ui/primitives/src/ui/${target.category}/${name}/${name}.tsx`;
    return path === expected;
  }
  return path === `packages/ui/blocks/src/${name}/${name}.tsx`;
}

function barrelImportPath(target: PlacementPlan): string {
  if (target.kind === "primitive") {
    return `./ui/${target.category}/${target.componentName}/${target.componentName}`;
  }
  return `./${target.componentName}/${target.componentName}`;
}

function barrelPathFor(rootDir: string, target: PlacementPlan): string {
  if (target.kind === "primitive") {
    return join(rootDir, "packages/ui/primitives/src/index.ts");
  }
  return join(rootDir, "packages/ui/blocks/src/index.ts");
}

function exportsType(content: string, componentName: string): boolean {
  const re = new RegExp(
    `(export\\s+(interface|type)\\s+${componentName}Props\\b)|(export\\s+\\{[^}]*\\b${componentName}Props\\b[^}]*\\})`,
  );
  return re.test(content);
}

function extractRecipeName(path: string): string | null {
  const match = path.match(/packages\/ui\/foundation\/src\/recipes\/([^/]+)\/[^/]+\.recipe\.ts$/);
  return match?.[1] ?? null;
}

function pascalCase(input: string): string {
  return input
    .split(/[-_\s]+/)
    .filter((s) => s.length > 0)
    .map((s) => s[0]!.toUpperCase() + s.slice(1))
    .join("");
}

export async function buildDiffPairs(
  fs: FileSystem,
  rootDir: string,
  output: RefinerOutput,
): Promise<readonly FilePair[]> {
  const pairs: FilePair[] = [];
  for (const file of output.files) {
    const abs = join(rootDir, file.path);
    const before = (await fs.exists(abs)) ? await fs.read(abs) : null;
    pairs.push({ path: file.path, before, after: file.content });
  }
  return pairs;
}

export function unifiedDiffOf(pairs: readonly FilePair[]): string {
  return computeUnifiedDiff(pairs);
}

export async function runPandaCodegen(
  shell: Shell,
  rootDir: string,
): Promise<Result<void, { readonly stderr: string; readonly exitCode: number }>> {
  const result = await shell.runCapture({
    argv: ["bun", "--cwd", "packages/ui/foundation", "panda", "codegen"],
    cwd: rootDir,
  });
  if (result.exitCode !== 0) {
    return Err({ stderr: result.stderr || result.stdout, exitCode: result.exitCode });
  }
  return Ok(undefined);
}

// dirname re-export to avoid every consumer importing it for tmpdir cleanup logic
export { dirname };

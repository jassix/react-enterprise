import { match } from "@repo/std/match";
import type { Refiner } from "~/application/ports/refiner";
import { isCancelled } from "~/application/ports/prompter";
import {
  executeAddComponent,
  planAddComponent,
  type AddComponentError,
  type AddComponentInput,
  type AddComponentOutcome,
  type AddComponentPlan,
} from "~/application/usecases/add-component";
import type { RecipeMode } from "~/domain/refinement-context";
import {
  componentName as specComponentName,
  parseSpec,
  type ComponentSpec,
} from "~/domain/component-spec";
import type { RegistryConfig } from "~/domain/registry-config";
import { mergeWithCatalog } from "~/domain/remote-registry";
import { loadRegistryConfig } from "~/application/usecases/registry-config";
import { loadCatalogOrEmpty } from "~/application/usecases/remote-catalog";
import { blockPlacement, primitivePlacement } from "~/domain/placement-plan";
import { AnthropicSdkRefiner } from "~/infrastructure/refiner/anthropic-sdk";
import { NoneRefiner } from "~/infrastructure/refiner/none";
import { createColors } from "~/infrastructure/colors";
import type { Command } from "~/presentation/command";
import {
  parseAddArgs,
  type AddParsedArgs,
  type RefinerChoice,
} from "~/presentation/parsers/add-args";
import type { CommandDeps } from "~/presentation/deps";
import { renderError } from "~/presentation/ui/format-error";
import { renderDiff, renderNotes, renderPlan } from "~/presentation/ui/render-add-plan";

export function createAddCommand(deps: CommandDeps): Command {
  return {
    name: "add",
    summary: "fetch a shadcn component, refine to repo conventions, and place it",
    async run(argv) {
      const parsed = parseAddArgs(argv);
      if ("error" in parsed) return renderError(deps.output, parsed.error);

      let rootDir: string;
      try {
        rootDir = await deps.locator.locate(process.cwd());
      } catch (err) {
        return renderError(deps.output, err instanceof Error ? err.message : String(err));
      }

      const loaded = await loadRegistryConfig(deps.fs, rootDir);
      if (loaded.isErr()) {
        const e = loaded.unwrapErr();
        return renderError(
          deps.output,
          e.kind === "invalid"
            ? `invalid .repo/registries.json: ${e.messages.join("; ")}`
            : `failed to read .repo/registries.json: ${String(e.cause)}`,
        );
      }
      const local = loaded.unwrap();
      const catalog = await loadCatalogOrEmpty({ fs: deps.fs, fetcher: deps.fetcher }, rootDir);
      const registries = mergeWithCatalog(local, catalog);

      const specs = parseSpecs(parsed.specs, registries);
      if ("error" in specs) return renderError(deps.output, specs.error);

      const c = createColors();
      const bold = (t: string) => c.wrap("bold", t);
      const dim = (t: string) => c.wrap("dim", t);
      const cyan = (t: string) => c.wrap("cyan", t);
      const green = (t: string) => c.wrap("green", t);

      deps.prompter.intro(
        `${cyan(bold("repo add"))}  ${dim(`${specs.value.length} component${specs.value.length === 1 ? "" : "s"}`)}`,
      );

      const refiner = pickRefiner(parsed.refiner, deps.refiner);

      let exitCode = 0;
      for (const { spec, raw } of specs.value) {
        const result = await runOne({
          deps,
          parsed,
          rootDir,
          spec,
          rawSpec: raw,
          refiner,
        });
        if (result === "fail") exitCode = 1;
      }

      if (exitCode === 0) {
        deps.prompter.outro(`${green(bold("✓ done"))}  ${dim("git diff packages/ui to inspect")}`);
      } else {
        deps.prompter.outro(`${c.wrap("red", bold("✗ finished with errors"))}`);
      }
      return exitCode;
    },
  };
}

interface RunOneArgs {
  readonly deps: CommandDeps;
  readonly parsed: AddParsedArgs;
  readonly rootDir: string;
  readonly spec: ComponentSpec;
  readonly rawSpec: string;
  readonly refiner: Refiner;
}

async function runOne(args: RunOneArgs): Promise<"ok" | "fail"> {
  const { deps, parsed, rootDir, spec, rawSpec } = args;

  const componentName = specComponentName(spec);
  const targetOverride = buildTargetOverride(rootDir, componentName, parsed);

  const input: AddComponentInput = {
    spec,
    rootDir,
    options: {
      dryRun: parsed.dryRun,
      runCodegen: parsed.runCodegen && !parsed.dryRun,
      refine: parsed.refine,
      ...(targetOverride ? { targetOverride } : {}),
      ...(parsed.category ? { categoryOverride: parsed.category } : {}),
    },
  };

  const captured: { outcome?: AddComponentOutcome; failure?: AddComponentError } = {};

  let plan: AddComponentPlan | null = null;
  await deps.taskRunner
    .runSequential([
      {
        title: `Resolving ${rawSpec}`,
        run: async () => {
          const res = await planAddComponent(
            { registry: deps.registry, introspector: deps.introspector },
            input,
          );
          if (res.isErr()) {
            captured.failure = res.unwrapErr();
            throw new Error(formatError(captured.failure));
          }
          plan = res.unwrap();
          return summarizePlan(plan);
        },
      },
    ])
    .catch(() => {
      /* error already captured */
    });

  if (captured.failure || !plan) {
    if (captured.failure) renderError(deps.output, formatError(captured.failure));
    return "fail";
  }

  const recipeMode = await resolveRecipeMode(deps, parsed, plan);
  if (recipeMode === "abort") {
    captured.failure = { kind: "cancelled" };
    renderError(deps.output, formatError(captured.failure));
    return "fail";
  }

  await deps.taskRunner
    .runSequential([
      {
        title: parsed.dryRun ? "Refining (dry-run)" : "Refining with Claude",
        run: async () => {
          const res = await executeAddComponent(
            { refiner: args.refiner, fs: deps.fs, shell: deps.shell },
            input,
            plan!,
            recipeMode,
          );
          if (res.isErr()) {
            captured.failure = res.unwrapErr();
            throw new Error(formatError(captured.failure));
          }
          captured.outcome = res.unwrap();
          return summarizeOutcome(captured.outcome);
        },
      },
    ])
    .catch(() => {
      /* error already captured */
    });

  if (captured.failure || !captured.outcome) {
    if (captured.failure) renderError(deps.output, formatError(captured.failure));
    return "fail";
  }

  const outcome = captured.outcome;

  renderPlan(deps.prompter, {
    spec: rawSpec,
    target: outcome.target,
    recipeMode: outcome.recipeMode,
    matchedRecipe: outcome.recipeMode === "matched" ? outcome.target.componentName : null,
  });

  if (outcome.diff !== null) renderDiff(deps.prompter, outcome.diff);
  renderNotes(deps.prompter, outcome.notes);

  return "ok";
}

function pickRefiner(choice: RefinerChoice, defaultRefiner: Refiner): Refiner {
  if (choice === "claude-cli") return defaultRefiner;
  if (choice === "none") return new NoneRefiner();
  return new AnthropicSdkRefiner();
}

async function resolveRecipeMode(
  deps: CommandDeps,
  parsed: AddParsedArgs,
  plan: AddComponentPlan,
): Promise<RecipeMode | "abort"> {
  if (plan.matchedRecipe !== null) return "matched";
  if (parsed.recipeMode) return parsed.recipeMode;
  if (!deps.prompter.isTty) return "generate";

  const choice = await deps.prompter.select<RecipeMode | "skip">({
    message: `No recipe matches '${plan.target.componentName}' — how should styling be expressed?`,
    options: [
      {
        value: "generate",
        label: "Generate a new recipe in @lume/foundation",
        hint: "matches the kit",
      },
      { value: "inline", label: "Inline css() only", hint: "no new recipe file" },
      { value: "skip", label: "Skip this component", hint: "abort the install for this spec" },
    ],
    initialValue: "generate",
  });
  if (isCancelled(choice)) return "abort";
  if (choice === "skip") return "abort";
  return choice;
}

function summarizePlan(plan: AddComponentPlan): string {
  const where =
    plan.target.kind === "primitive"
      ? `@lume/primitives  ${plan.target.category}/${plan.target.componentName}`
      : `@lume/blocks  ${plan.target.componentName}`;
  const recipe =
    plan.matchedRecipe !== null ? `recipe: ${plan.matchedRecipe} (matched)` : "recipe: tbd";
  return `→ ${where}  ·  ${recipe}`;
}

function buildTargetOverride(rootDir: string, componentName: string, parsed: AddParsedArgs) {
  if (parsed.target === "blocks") return blockPlacement(rootDir, componentName);
  if (parsed.target === "primitives") {
    return primitivePlacement(rootDir, parsed.category ?? "data-display", componentName);
  }
  return undefined;
}

interface ParsedSpec {
  readonly raw: string;
  readonly spec: ComponentSpec;
}

function parseSpecs(
  raws: readonly string[],
  registries: RegistryConfig,
): { readonly value: readonly ParsedSpec[] } | { readonly error: string } {
  const out: ParsedSpec[] = [];
  for (const raw of raws) {
    const parsed = parseSpec(raw, registries);
    if (parsed.isErr()) {
      const err = parsed.unwrapErr();
      const detail = match(err)
        .with({ kind: "empty" }, () => "spec was empty")
        .with({ kind: "unrecognized" }, ({ input }) => `unrecognized spec: ${input}`)
        .with(
          { kind: "unknown-namespace" },
          ({ namespace, known }) =>
            `unknown registry namespace '${namespace}'. ${known.length > 0 ? `Known: ${known.join(", ")}` : "Add one with: repo registry add @<ns> <url>"}`,
        )
        .with({ kind: "invalid-name" }, ({ input }) => `invalid component name: ${input}`)
        .exhaustive();
      return { error: detail };
    }
    out.push({ raw, spec: parsed.unwrap() });
  }
  return { value: out };
}

function summarizeOutcome(outcome: AddComponentOutcome): string {
  const fileCount = outcome.output.files.length;
  if (outcome.diff !== null)
    return `Planned ${fileCount} file${fileCount === 1 ? "" : "s"} (dry-run)`;
  if (!outcome.applied) return "Refined";
  const codegen =
    outcome.codegen === "ran"
      ? " · codegen ok"
      : outcome.codegen === "failed"
        ? " · codegen failed"
        : "";
  return `Wrote ${outcome.applied.written.length} file${outcome.applied.written.length === 1 ? "" : "s"}${codegen}`;
}

function formatError(err: AddComponentError): string {
  return match(err)
    .with({ kind: "registry" }, ({ cause }) => formatRegistryError(cause))
    .with({ kind: "unsupported-type" }, ({ type }) => `unsupported registry item type: ${type}`)
    .with({ kind: "no-files" }, () => "registry item has no files")
    .with({ kind: "cancelled" }, () => "cancelled")
    .with({ kind: "refiner" }, ({ cause }) => formatRefinerError(cause))
    .with({ kind: "validation" }, ({ messages }) =>
      ["validation failed:", ...messages.map((m) => `  ${m}`)].join("\n"),
    )
    .with({ kind: "io" }, ({ cause }) => `io error: ${describe(cause)}`)
    .with({ kind: "codegen" }, ({ stderr }) => `panda codegen failed:\n${stderr}`)
    .exhaustive();
}

function formatRegistryError(
  cause: AddComponentError extends infer T
    ? T extends { kind: "registry"; cause: infer C }
      ? C
      : never
    : never,
): string {
  return match(cause)
    .with({ kind: "not-found" }, ({ spec }) => `registry not found: ${spec}`)
    .with(
      { kind: "transport" },
      (e) => `registry transport error${e.status ? ` (${e.status})` : ""}: ${describe(e.cause)}`,
    )
    .with({ kind: "invalid-payload" }, ({ messages }) =>
      ["registry payload invalid:", ...messages.map((m) => `  ${m}`)].join("\n"),
    )
    .exhaustive();
}

function formatRefinerError(
  cause: AddComponentError extends infer T
    ? T extends { kind: "refiner"; cause: infer C }
      ? C
      : never
    : never,
): string {
  return match(cause)
    .with({ kind: "transport" }, (e) => `refiner transport error: ${describe(e.cause)}`)
    .with({ kind: "unavailable" }, ({ reason }) => `refiner unavailable: ${reason}`)
    .with({ kind: "invalid-output" }, ({ messages }) =>
      ["refiner output invalid:", ...messages.map((m) => `  ${m}`)].join("\n"),
    )
    .with({ kind: "cancelled" }, () => "refiner cancelled")
    .exhaustive();
}

function describe(cause: unknown): string {
  if (cause instanceof Error) return cause.message;
  if (typeof cause === "string") return cause;
  try {
    return JSON.stringify(cause);
  } catch {
    return String(cause);
  }
}

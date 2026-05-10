import { match } from "@repo/std/match";
import type { Refiner } from "~/application/ports/refiner";
import {
  refineFiles,
  type RefineFilesError,
  type RefineFilesOutcome,
} from "~/application/usecases/refine-files";
import { dirname, join, resolve } from "~/domain/path";
import { blockPlacement, primitivePlacement } from "~/domain/placement-plan";
import { AnthropicSdkRefiner } from "~/infrastructure/refiner/anthropic-sdk";
import { NoneRefiner } from "~/infrastructure/refiner/none";
import { createColors } from "~/infrastructure/colors";
import type { Command } from "~/presentation/command";
import {
  parseRefineArgs,
  type RefineParsedArgs,
  type RefinerChoice,
} from "~/presentation/parsers/add-args";
import type { CommandDeps } from "~/presentation/deps";
import { renderError } from "~/presentation/ui/format-error";
import { renderDiff, renderNotes, renderPlan } from "~/presentation/ui/render-add-plan";

export function createRefineCommand(deps: CommandDeps): Command {
  return {
    name: "refine",
    summary: "refine local component file(s) to repo conventions",
    async run(argv) {
      const parsed = parseRefineArgs(argv);
      if ("error" in parsed) return renderError(deps.output, parsed.error);

      let rootDir: string;
      try {
        rootDir = await deps.locator.locate(process.cwd());
      } catch (err) {
        return renderError(deps.output, err instanceof Error ? err.message : String(err));
      }

      const files = await resolveInputFiles(deps, rootDir, parsed.patterns);
      if (files.length === 0) {
        return renderError(deps.output, "no files matched the given patterns");
      }

      const c = createColors();
      const bold = (t: string) => c.wrap("bold", t);
      const dim = (t: string) => c.wrap("dim", t);
      const cyan = (t: string) => c.wrap("cyan", t);
      const green = (t: string) => c.wrap("green", t);

      deps.prompter.intro(
        `${cyan(bold("repo refine"))}  ${dim(`${files.length} file${files.length === 1 ? "" : "s"}`)}`,
      );

      const refiner = pickRefiner(parsed.refiner, deps.refiner);

      const captured: { outcome?: RefineFilesOutcome; failure?: RefineFilesError } = {};

      await deps.taskRunner
        .runSequential([
          {
            title: `Refining ${files.length} file${files.length === 1 ? "" : "s"}`,
            run: async () => {
              const res = await refineFiles(
                {
                  refiner,
                  introspector: deps.introspector,
                  fs: deps.fs,
                  shell: deps.shell,
                },
                {
                  files,
                  rootDir,
                  options: {
                    dryRun: parsed.dryRun,
                    runCodegen: parsed.runCodegen && !parsed.dryRun,
                    recipeMode: parsed.recipeMode,
                    ...(buildPlacement(rootDir, files[0]!, parsed)
                      ? { placementOverride: buildPlacement(rootDir, files[0]!, parsed)! }
                      : {}),
                  },
                },
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
          /* failure captured */
        });

      if (captured.failure || !captured.outcome) {
        if (captured.failure) renderError(deps.output, formatError(captured.failure));
        return 1;
      }

      const outcome = captured.outcome;
      renderPlan(deps.prompter, {
        spec: files.map((f) => relativeTo(rootDir, f)).join(", "),
        target: outcome.target,
        recipeMode: outcome.recipeMode,
        matchedRecipe: null,
      });
      if (outcome.diff !== null) renderDiff(deps.prompter, outcome.diff);
      renderNotes(deps.prompter, outcome.notes);

      deps.prompter.outro(`${green(bold("✓ done"))}  ${dim("git diff to inspect")}`);
      return 0;
    },
  };
}

async function resolveInputFiles(
  deps: CommandDeps,
  rootDir: string,
  patterns: readonly string[],
): Promise<readonly string[]> {
  const out = new Set<string>();
  for (const pattern of patterns) {
    const abs = pattern.startsWith("/") ? pattern : resolve(process.cwd(), pattern);
    if (!hasGlobChars(pattern)) {
      if (await deps.fs.exists(abs)) out.add(abs);
      continue;
    }
    const { dir, glob } = splitGlob(pattern);
    const baseDir = dir.startsWith("/") ? dir : resolve(rootDir, dir);
    if (!(await deps.fs.exists(baseDir))) continue;
    for await (const rel of deps.fs.glob(baseDir, glob)) {
      out.add(join(baseDir, rel));
    }
  }
  return [...out];
}

function hasGlobChars(pattern: string): boolean {
  return /[*?[\]{}]/.test(pattern);
}

function splitGlob(pattern: string): { readonly dir: string; readonly glob: string } {
  const firstGlob = pattern.search(/[*?[\]{}]/);
  if (firstGlob === -1) return { dir: dirname(pattern), glob: basename(pattern) };
  const cut = pattern.lastIndexOf("/", firstGlob);
  if (cut === -1) return { dir: ".", glob: pattern };
  return { dir: pattern.slice(0, cut), glob: pattern.slice(cut + 1) };
}

function basename(path: string): string {
  const i = path.lastIndexOf("/");
  return i === -1 ? path : path.slice(i + 1);
}

function relativeTo(rootDir: string, abs: string): string {
  const prefix = rootDir.endsWith("/") ? rootDir : `${rootDir}/`;
  return abs.startsWith(prefix) ? abs.slice(prefix.length) : abs;
}

function pickRefiner(choice: RefinerChoice, defaultRefiner: Refiner): Refiner {
  if (choice === "claude-cli") return defaultRefiner;
  if (choice === "none") return new NoneRefiner();
  return new AnthropicSdkRefiner();
}

function buildPlacement(rootDir: string, firstFile: string, parsed: RefineParsedArgs) {
  if (parsed.target === "blocks") {
    return blockPlacement(rootDir, deriveName(firstFile));
  }
  if (parsed.target === "primitives") {
    return primitivePlacement(rootDir, parsed.category ?? "data-display", deriveName(firstFile));
  }
  return undefined;
}

function deriveName(absPath: string): string {
  const parts = absPath.split("/");
  const file = parts[parts.length - 1] ?? absPath;
  return file.replace(/\.(tsx|ts)$/, "");
}

function summarizeOutcome(outcome: RefineFilesOutcome): string {
  if (outcome.diff !== null) return `Planned ${outcome.output.files.length} file(s) (dry-run)`;
  if (!outcome.applied) return "Refined";
  const codegen =
    outcome.codegen === "ran" ? " · codegen ok" : outcome.codegen === "failed" ? " · codegen failed" : "";
  return `Wrote ${outcome.applied.written.length} file(s)${codegen}`;
}

function formatError(err: RefineFilesError): string {
  return match(err)
    .with({ kind: "no-files" }, () => "no input files provided")
    .with({ kind: "missing-file" }, ({ path }) => `file not found: ${path}`)
    .with({ kind: "unresolved-placement" }, ({ path }) =>
      `could not infer placement for ${path} — pass --target=primitives|blocks (and optionally --category)`,
    )
    .with({ kind: "refiner" }, ({ cause }) =>
      match(cause)
        .with({ kind: "transport" }, (e) => `refiner transport error: ${describe(e.cause)}`)
        .with({ kind: "unavailable" }, ({ reason }) => `refiner unavailable: ${reason}`)
        .with({ kind: "invalid-output" }, ({ messages }) =>
          ["refiner output invalid:", ...messages.map((m) => `  ${m}`)].join("\n"),
        )
        .with({ kind: "cancelled" }, () => "refiner cancelled")
        .exhaustive(),
    )
    .with({ kind: "validation" }, ({ messages }) =>
      ["validation failed:", ...messages.map((m) => `  ${m}`)].join("\n"),
    )
    .with({ kind: "io" }, ({ cause }) => `io error: ${describe(cause)}`)
    .with({ kind: "codegen" }, ({ stderr }) => `panda codegen failed:\n${stderr}`)
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

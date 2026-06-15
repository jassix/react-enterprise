import type { ArrayValues } from "@repo/types";
import { recipeModes } from "~/domain/refinement-context";
import type { RecipeMode } from "~/domain/refinement-context";

export const refinerChoices = ["claude-cli", "sdk", "none"] as const;
export type RefinerChoice = ArrayValues<typeof refinerChoices>;

export const targetChoices = ["primitives", "blocks"] as const;
export type TargetChoice = ArrayValues<typeof targetChoices>;

export interface AddParsedArgs {
  readonly specs: readonly string[];
  readonly dryRun: boolean;
  readonly refine: boolean;
  readonly runCodegen: boolean;
  readonly target: TargetChoice | undefined;
  readonly category: string | undefined;
  readonly refiner: RefinerChoice;
  readonly recipeMode: RecipeMode | undefined;
}

export type AddParseResult = AddParsedArgs | { readonly error: string };

export const ADD_USAGE =
  "usage: repo add <spec...> [--dry-run] [--no-refine] [--no-codegen] [--target=primitives|blocks] [--category=<name>] [--refiner=claude-cli|sdk|none] [--recipe-mode=generate|inline|skip]";

export function parseAddArgs(argv: readonly string[]): AddParseResult {
  const specs: string[] = [];
  let dryRun = false;
  let refine = true;
  let runCodegen = true;
  let target: TargetChoice | undefined;
  let category: string | undefined;
  let refiner: RefinerChoice = "claude-cli";
  let recipeMode: RecipeMode | undefined;

  for (const arg of argv) {
    if (!arg.startsWith("-")) {
      specs.push(arg);
      continue;
    }
    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }
    if (arg === "--no-refine") {
      refine = false;
      refiner = "none";
      continue;
    }
    if (arg === "--no-codegen") {
      runCodegen = false;
      continue;
    }
    if (arg === "--codegen") {
      runCodegen = true;
      continue;
    }
    const eq = arg.indexOf("=");
    if (eq === -1) {
      return { error: `unknown flag: ${arg}\n${ADD_USAGE}` };
    }
    const key = arg.slice(0, eq);
    const value = arg.slice(eq + 1);
    if (key === "--target") {
      if (!isTargetChoice(value)) {
        return {
          error: `unknown --target value '${value}' — expected: ${targetChoices.join(", ")}`,
        };
      }
      target = value;
      continue;
    }
    if (key === "--category") {
      if (value.length === 0) return { error: "--category requires a value" };
      category = value;
      continue;
    }
    if (key === "--refiner") {
      if (!isRefinerChoice(value)) {
        return {
          error: `unknown --refiner value '${value}' — expected: ${refinerChoices.join(", ")}`,
        };
      }
      refiner = value;
      continue;
    }
    if (key === "--recipe-mode") {
      if (!isRecipeMode(value) || value === "matched") {
        return {
          error: `unknown --recipe-mode value '${value}' — expected: generate, inline, skip`,
        };
      }
      recipeMode = value;
      continue;
    }
    return { error: `unknown flag: ${key}\n${ADD_USAGE}` };
  }

  if (specs.length === 0) {
    return { error: `at least one spec is required\n${ADD_USAGE}` };
  }

  return { specs, dryRun, refine, runCodegen, target, category, refiner, recipeMode };
}

export interface RefineParsedArgs {
  readonly patterns: readonly string[];
  readonly dryRun: boolean;
  readonly runCodegen: boolean;
  readonly target: TargetChoice | undefined;
  readonly category: string | undefined;
  readonly refiner: RefinerChoice;
  readonly recipeMode: RecipeMode;
}

export type RefineParseResult = RefineParsedArgs | { readonly error: string };

export const REFINE_USAGE =
  "usage: repo refine <files-or-globs...> [--dry-run] [--no-codegen] [--target=primitives|blocks] [--category=<name>] [--refiner=claude-cli|sdk|none] [--recipe-mode=generate|inline|matched|skip]";

export function parseRefineArgs(argv: readonly string[]): RefineParseResult {
  const patterns: string[] = [];
  let dryRun = false;
  let runCodegen = true;
  let target: TargetChoice | undefined;
  let category: string | undefined;
  let refiner: RefinerChoice = "claude-cli";
  let recipeMode: RecipeMode = "matched";

  for (const arg of argv) {
    if (!arg.startsWith("-")) {
      patterns.push(arg);
      continue;
    }
    if (arg === "--dry-run") {
      dryRun = true;
      continue;
    }
    if (arg === "--no-codegen") {
      runCodegen = false;
      continue;
    }
    if (arg === "--codegen") {
      runCodegen = true;
      continue;
    }
    const eq = arg.indexOf("=");
    if (eq === -1) return { error: `unknown flag: ${arg}\n${REFINE_USAGE}` };
    const key = arg.slice(0, eq);
    const value = arg.slice(eq + 1);
    if (key === "--target") {
      if (!isTargetChoice(value)) {
        return {
          error: `unknown --target value '${value}' — expected: ${targetChoices.join(", ")}`,
        };
      }
      target = value;
      continue;
    }
    if (key === "--category") {
      if (value.length === 0) return { error: "--category requires a value" };
      category = value;
      continue;
    }
    if (key === "--refiner") {
      if (!isRefinerChoice(value)) {
        return {
          error: `unknown --refiner value '${value}' — expected: ${refinerChoices.join(", ")}`,
        };
      }
      refiner = value;
      continue;
    }
    if (key === "--recipe-mode") {
      if (!isRecipeMode(value)) {
        return {
          error: `unknown --recipe-mode value '${value}' — expected: ${recipeModes.join(", ")}`,
        };
      }
      recipeMode = value;
      continue;
    }
    return { error: `unknown flag: ${key}\n${REFINE_USAGE}` };
  }

  if (patterns.length === 0) {
    return { error: `at least one file or glob is required\n${REFINE_USAGE}` };
  }

  return { patterns, dryRun, runCodegen, target, category, refiner, recipeMode };
}

function isTargetChoice(value: string): value is TargetChoice {
  return (targetChoices as readonly string[]).includes(value);
}

function isRefinerChoice(value: string): value is RefinerChoice {
  return (refinerChoices as readonly string[]).includes(value);
}

function isRecipeMode(value: string): value is RecipeMode {
  return (recipeModes as readonly string[]).includes(value);
}

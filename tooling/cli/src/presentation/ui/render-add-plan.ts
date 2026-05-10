import type { Prompter } from "~/application/ports/prompter";
import { colorizeUnifiedDiff } from "~/application/refinement/compute-diff";
import type { PlacementPlan } from "~/domain/placement-plan";
import type { RecipeMode } from "~/domain/refinement-context";
import { createColors } from "~/infrastructure/colors";

export interface PlanSummary {
  readonly spec: string;
  readonly target: PlacementPlan;
  readonly recipeMode: RecipeMode;
  readonly matchedRecipe: string | null;
}

const c = createColors();
const dim = (t: string) => c.wrap("dim", t);
const cyan = (t: string) => c.wrap("cyan", t);

export function renderPlan(prompter: Prompter, plan: PlanSummary): void {
  prompter.note(formatPlan(plan), "Plan");
}

export function renderDiff(prompter: Prompter, diff: string): void {
  if (diff.trim().length === 0) {
    prompter.note(dim("(no changes)"), "Diff");
    return;
  }
  prompter.note(colorizeUnifiedDiff(diff, c), "Diff");
}

export function renderNotes(prompter: Prompter, notes: readonly string[]): void {
  if (notes.length === 0) return;
  const body = notes.map((n) => `- ${n}`).join("\n");
  prompter.note(body, "Notes");
}

function formatPlan(plan: PlanSummary): string {
  const targetPath =
    plan.target.kind === "primitive"
      ? `${plan.target.absDir}/${plan.target.componentName}.tsx ${dim(`(category: ${plan.target.category})`)}`
      : `${plan.target.absDir}/${plan.target.componentName}.tsx ${dim("(block)")}`;

  const recipe =
    plan.matchedRecipe !== null
      ? `${cyan(plan.matchedRecipe)} ${dim("(matched existing)")}`
      : recipeLabel(plan.recipeMode);

  const rows: ReadonlyArray<readonly [string, string]> = [
    ["spec", plan.spec],
    ["target", targetPath],
    ["recipe", recipe],
  ];
  const labelWidth = Math.max(...rows.map(([label]) => label.length));
  return rows.map(([label, value]) => `${dim(label.padEnd(labelWidth))}  ${value}`).join("\n");
}

function recipeLabel(mode: RecipeMode): string {
  switch (mode) {
    case "generate":
      return `${cyan("generate")} ${dim("(emit new recipe in @lume/foundation)")}`;
    case "inline":
      return `${cyan("inline")} ${dim("(css() only — no recipe file)")}`;
    case "matched":
      return `${cyan("matched")} ${dim("(reuse existing recipe)")}`;
    case "skip":
      return `${cyan("skip")}`;
  }
}

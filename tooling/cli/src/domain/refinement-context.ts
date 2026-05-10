import type { ArrayValues } from "@repo/types";
import type { PlacementPlan } from "~/domain/placement-plan";

export const recipeModes = ["generate", "inline", "matched", "skip"] as const;
export type RecipeMode = ArrayValues<typeof recipeModes>;

export interface RecipeDescriptor {
  readonly name: string;
  readonly className: string;
  readonly slots?: readonly string[];
  readonly variantKeys: readonly string[];
}

export interface SemanticTokenGroup {
  readonly group: string;
  readonly tokens: readonly string[];
}

export interface SourceFile {
  readonly path: string;
  readonly content: string;
}

export interface RuleDoc {
  readonly path: string;
  readonly content: string;
}

export interface RefinementContext {
  readonly rules: readonly RuleDoc[];
  readonly recipes: readonly RecipeDescriptor[];
  readonly semanticTokens: readonly SemanticTokenGroup[];
  readonly categories: readonly string[];
  readonly iconNames: readonly string[];
  readonly exemplar: SourceFile;
  readonly source: readonly SourceFile[];
  readonly target: PlacementPlan;
  readonly recipeMode: RecipeMode;
  readonly retryFeedback?: readonly string[];
}

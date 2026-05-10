import type { RecipeDescriptor, SemanticTokenGroup } from "~/domain/refinement-context";

export interface DesignSystemSnapshot {
  readonly recipes: readonly RecipeDescriptor[];
  readonly semanticTokens: readonly SemanticTokenGroup[];
  readonly categories: readonly string[];
  readonly iconNames: readonly string[];
  readonly exemplarPath: string;
  readonly primitivesRoot: string;
  readonly blocksRoot: string;
  readonly foundationRoot: string;
}

export interface DesignSystemIntrospector {
  snapshot(rootDir: string): Promise<DesignSystemSnapshot>;
}

import { describe, expect, test } from "bun:test";
import { buildPrompt } from "~/application/refinement/build-prompt";
import type { RefinementContext } from "~/domain/refinement-context";

function makeContext(overrides: Partial<RefinementContext> = {}): RefinementContext {
  return {
    rules: [{ path: ".agents/rules/ui-kit/recipes.md", content: "# Recipes\nrule body" }],
    recipes: [
      { name: "button", className: "button", variantKeys: ["variant", "size"] },
      { name: "dialog", className: "dialog", slots: ["root", "content"], variantKeys: ["size"] },
    ],
    semanticTokens: [
      { group: "interactive", tokens: ["base", "hover"] },
      { group: "critical", tokens: ["accent", "text"] },
    ],
    categories: ["buttons", "forms"],
    iconNames: ["check", "x"],
    exemplar: { path: "packages/ui/primitives/src/ui/buttons/button/button.tsx", content: "exemplar source" },
    source: [{ path: "components/ui/button.tsx", content: "shadcn source" }],
    target: {
      kind: "primitive",
      category: "buttons",
      absDir: "/abs/packages/ui/primitives/src/ui/buttons/button",
      componentName: "button",
    },
    recipeMode: "matched",
    ...overrides,
  };
}

describe("buildPrompt", () => {
  test("includes core sections in user prompt", () => {
    const { user } = buildPrompt(makeContext());
    expect(user).toContain("## Available recipes");
    expect(user).toContain("## Available semantic tokens");
    expect(user).toContain("## Primitive categories");
    expect(user).toContain("## Available icons (Icon primitive)");
    expect(user).toContain("## Exemplar");
    expect(user).toContain("## Placement target");
    expect(user).toContain("## Recipe mode");
    expect(user).toContain("## Source (shadcn)");
    expect(user).toContain("## Output format");
  });

  test("system prompt embeds rule files", () => {
    const { system } = buildPrompt(makeContext());
    expect(system).toContain("rule body");
    expect(system).toContain('path=".agents/rules/ui-kit/recipes.md"');
  });

  test("recipe mode 'generate' instructs the model to emit a recipe file", () => {
    const { user } = buildPrompt(makeContext({ recipeMode: "generate" }));
    expect(user).toContain("packages/ui/foundation/src/recipes/button/button.recipe.ts");
  });

  test("recipe mode 'inline' tells the model to skip recipe emission", () => {
    const { user } = buildPrompt(makeContext({ recipeMode: "inline" }));
    expect(user).toContain("inline `css({...})`");
    expect(user).toContain("Do NOT emit a recipe file");
  });

  test("recipe mode 'matched' tells the model to reuse the recipe", () => {
    const { user } = buildPrompt(makeContext({ recipeMode: "matched" }));
    expect(user).toContain("reuse it by name");
  });

  test("retry feedback section appears when provided", () => {
    const { user } = buildPrompt(
      makeContext({ retryFeedback: ["forbidden import 'clsx'"] }),
    );
    expect(user).toContain("## Previous attempt failed");
    expect(user).toContain("forbidden import 'clsx'");
  });

  test("output format lists forbidden modules and required imports", () => {
    const { user } = buildPrompt(makeContext());
    expect(user).toContain("class-variance-authority");
    expect(user).toContain("clsx");
    expect(user).toContain("@radix-ui/");
    expect(user).toContain("@lume/foundation/recipes");
    expect(user).toContain("@lume/foundation/css");
  });

  test("recipe descriptors render slots and variants", () => {
    const { user } = buildPrompt(makeContext());
    expect(user).toContain("button (className: button");
    expect(user).toContain("variants: [variant, size]");
    expect(user).toContain("slots: [root, content]");
  });
});

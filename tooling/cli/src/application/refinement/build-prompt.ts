import {
  forbiddenModulePrefixes,
  forbiddenModules,
  requiredPrimitiveImports,
  requiredPrimitiveStylingImports,
} from "~/domain/forbidden-imports";
import type {
  RecipeDescriptor,
  RecipeMode,
  RefinementContext,
  SemanticTokenGroup,
  SourceFile,
} from "~/domain/refinement-context";

const SYSTEM_PREAMBLE = `You are a code refactor assistant for a React + PandaCSS monorepo.

Your job: rewrite shadcn-style React component source so it conforms to the conventions of this repo's design system (PandaCSS recipes + Ark UI primitives + semantic tokens). Preserve component behaviour and accessibility; replace styling, primitives, and helpers.

Follow the rules below verbatim. Emit ONLY fenced code blocks per the output format described in the user prompt — no extra prose.`;

export interface BuiltPrompt {
  readonly system: string;
  readonly user: string;
}

export function buildPrompt(context: RefinementContext): BuiltPrompt {
  return {
    system: buildSystemPrompt(context),
    user: buildUserPrompt(context),
  };
}

function buildSystemPrompt(context: RefinementContext): string {
  const ruleBlocks = context.rules.map(
    (r) => `<rule path="${r.path}">\n${r.content.trim()}\n</rule>`,
  );
  return [SYSTEM_PREAMBLE, "", ...ruleBlocks].join("\n");
}

function buildUserPrompt(context: RefinementContext): string {
  const sections: string[] = [
    sectionRecipes(context.recipes),
    sectionSemanticTokens(context.semanticTokens),
    sectionCategories(context.categories),
    sectionIcons(context.iconNames),
    sectionExemplar(context.exemplar),
    sectionPlacement(context.target),
    sectionRecipeMode(context.recipeMode, context.target.componentName),
    sectionSource(context.source),
    sectionOutputFormat(),
  ];
  if (context.retryFeedback && context.retryFeedback.length > 0) {
    sections.push(sectionRetry(context.retryFeedback));
  }
  return sections.join("\n\n");
}

function sectionRecipes(recipes: readonly RecipeDescriptor[]): string {
  if (recipes.length === 0) return "## Available recipes\n\n(none registered)";
  const lines = recipes.map((r) => {
    const slots = r.slots && r.slots.length > 0 ? `; slots: [${r.slots.join(", ")}]` : "";
    const variants =
      r.variantKeys.length > 0 ? `; variants: [${r.variantKeys.join(", ")}]` : "";
    return `- ${r.name} (className: ${r.className}${slots}${variants})`;
  });
  return ["## Available recipes", "", ...lines].join("\n");
}

function sectionSemanticTokens(groups: readonly SemanticTokenGroup[]): string {
  if (groups.length === 0) return "## Available semantic tokens\n\n(none discovered)";
  const lines = groups.map((g) => `- colors.${g.group}.{${g.tokens.join(", ")}}`);
  return ["## Available semantic tokens", "", ...lines].join("\n");
}

function sectionCategories(categories: readonly string[]): string {
  return ["## Primitive categories", "", categories.join(", ") || "(none)"].join("\n");
}

function sectionIcons(iconNames: readonly string[]): string {
  const list = iconNames.length > 0 ? iconNames.join(", ") : "(none registered)";
  return ["## Available icons (Icon primitive)", "", list].join("\n");
}

function sectionExemplar(exemplar: SourceFile): string {
  return [
    "## Exemplar",
    "",
    `Path: \`${exemplar.path}\``,
    "",
    "```tsx",
    exemplar.content.trimEnd(),
    "```",
  ].join("\n");
}

function sectionPlacement(target: RefinementContext["target"]): string {
  return [
    "## Placement target",
    "",
    "```json",
    JSON.stringify(target, null, 2),
    "```",
  ].join("\n");
}

function sectionRecipeMode(mode: RecipeMode, componentName: string): string {
  const body = recipeModeInstructions(mode, componentName);
  return ["## Recipe mode", "", `Mode: \`${mode}\``, "", body].join("\n");
}

function recipeModeInstructions(mode: RecipeMode, componentName: string): string {
  switch (mode) {
    case "generate":
      return [
        `Emit BOTH the primitive AND a new recipe at \`packages/ui/foundation/src/recipes/${componentName}/${componentName}.recipe.ts\`.`,
        "Recipe must follow `defineRecipe` / `defineSlotRecipe` conventions and reference design tokens only.",
        `The primitive must import the recipe from \`@lume/foundation/recipes\`.`,
      ].join("\n");
    case "inline":
      return [
        "Use only inline `css({...})` calls against semantic tokens. Do NOT emit a recipe file.",
        "The primitive must import `css` from `@lume/foundation/css`.",
      ].join("\n");
    case "matched":
      return [
        "An existing recipe matches this component — reuse it by name. Do NOT emit a new recipe file.",
        `Import the existing recipe from \`@lume/foundation/recipes\` and use it via \`recipeName({...variants})\`.`,
      ].join("\n");
    case "skip":
      return "(skip mode — refinement should have been aborted before reaching the model)";
  }
}

function sectionSource(source: readonly SourceFile[]): string {
  const blocks = source.map(
    (f) => `### ${f.path}\n\n\`\`\`tsx\n${f.content.trimEnd()}\n\`\`\``,
  );
  return ["## Source (shadcn)", "", ...blocks].join("\n\n");
}

function sectionOutputFormat(): string {
  const forbiddenList = [
    ...forbiddenModules,
    ...forbiddenModulePrefixes.map((p) => `${p}* (any package starting with this prefix)`),
  ]
    .map((m) => `- ${m}`)
    .join("\n");

  const requiredPrimitive = requiredPrimitiveImports.map((m) => `- ${m}`).join("\n");
  const requiredStyling = requiredPrimitiveStylingImports.map((m) => `- ${m}`).join("\n");

  return [
    "## Output format",
    "",
    "Emit each file as a fenced ```tsx``` (or ```ts```) block whose FIRST line is exactly:",
    "",
    "    // FILE: <path-relative-to-monorepo-root>",
    "",
    "Multiple files are allowed. Do not emit any prose between or around blocks.",
    "",
    "**Forbidden modules** (must NOT appear in any import):",
    "",
    forbiddenList,
    "",
    "**Required modules for primitive outputs** — every primitive file MUST import:",
    "",
    requiredPrimitive,
    "",
    "and AT LEAST ONE of:",
    "",
    requiredStyling,
    "",
    "**Icon policy** — every icon must be rendered as `<Icon name=\"...\" />` from `@lume/primitives`.",
    "If the source uses an icon name not present in the available icons list above, leave the JSX in place but add a comment immediately above it:",
    "",
    "    // TODO: missing icon \"<name>\" — please add to @lume/primitives/icon",
  ].join("\n");
}

function sectionRetry(messages: readonly string[]): string {
  const lines = messages.map((m) => `- ${m}`);
  return ["## Previous attempt failed — fix and re-emit", "", ...lines].join("\n");
}

# Recipes

PandaCSS recipes encode component styling with variants. Use `defineRecipe` for single-element components and `defineSlotRecipe` for multi-part components.

## Single-element recipe

```typescript
import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
  className: "button",
  base: {
    display: "inline-flex",
    gap: "{spacing.sm}",
    transition: "all {durations.fast} {easings.easeInOut}",
    _disabled: { opacity: "0.5", cursor: "not-allowed" },
    _focusVisible: { ring: "2px solid", ringColor: "{colors.focus.ring}" },
  },
  variants: {
    variant: {
      solid: { bg: "{colors.interactive.base}", color: "white" },
      outline: { bg: "transparent", border: "1px solid {colors.border.DEFAULT}" },
    },
    size: {
      sm: { height: "{sizes.sm}", fontSize: "{fontSizes.sm}" },
      md: { height: "{sizes.md}", fontSize: "{fontSizes.md}" },
    },
  },
  defaultVariants: { variant: "solid", size: "md" },
  compoundVariants: [
    {
      variant: "outline",
      intent: "critical",
      css: { color: "{colors.critical.text}", borderColor: "{colors.border.critical}" },
    },
  ],
});
```

## Multi-slot recipe

```typescript
import { defineSlotRecipe } from "@pandacss/dev";

export const dialogRecipe = defineSlotRecipe({
  className: "dialog",
  slots: ["root", "backdrop", "container", "content", "header", "body", "footer"],
  base: {
    backdrop: { position: "fixed", inset: 0 },
    content: { borderRadius: "{radii.lg}", bg: "{colors.surface.DEFAULT}" },
  },
  variants: {
    size: {
      sm: { content: { maxWidth: "400px" } },
      md: { content: { maxWidth: "600px" } },
    },
  },
});
```

## Rules

- All values must be **token references** — `"{spacing.md}"`, never raw numbers.
- Pseudo-states use the underscore prefix (`_disabled`, `_focusVisible`, `_dark`).
- Always set `defaultVariants` so consumers don't have to spell them out.
- Use `compoundVariants` for combinations that aren't a clean cross-product.
- Run `panda codegen` after editing a recipe.

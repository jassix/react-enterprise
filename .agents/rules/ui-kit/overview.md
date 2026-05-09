# UI-Kit — Overview

Design system: `@lume/foundation` (PandaCSS tokens + recipes) and `@lume/primitives` (React components built on Ark UI).

## Conventions

1. Always use **token references** in recipes (`"{spacing.md}"`, never hardcoded `"12px"`).
2. Prefer **semantic colors** over base colors (`colors.interactive.base`, not `colors.accent.light.9`).
3. Include `_dark` variants on every semantic token.
4. Use the `ark.element` factory for polymorphic elements.
5. Split CSS props with `splitCssProps` so callers can override styles.
6. Compose final className with `cx(recipe(...), css(cssProps), props.className)`.
7. Run `panda codegen` after changing tokens or recipes.

## Key files

- `packages/ui/foundation/src/tokens/` — base design tokens
- `packages/ui/foundation/src/semantic/colors/` — semantic color mapping
- `packages/ui/foundation/src/recipes/` — component recipes
- `packages/ui/foundation/src/animations/` — duration and easing tokens
- `packages/ui/primitives/src/ui/buttons/button/button.tsx` — canonical component example

## Detail rules

- [Color system](./colors.md)
- [Semantic tokens](./semantic-tokens.md)
- [Design tokens](./design-tokens.md)
- [Recipes](./recipes.md)
- [Component architecture](./component-architecture.md)

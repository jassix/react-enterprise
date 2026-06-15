# @lume/foundation

The design system foundation: PandaCSS **tokens**, **semantic colors**, and
**recipes**, published as a Panda preset and the generated `styled-system`.

## Layout

```
src/
├── preset.ts        # lumePreset — bundles tokens, semantic tokens, recipes
├── tokens/          # spacing, sizes, typography, radii, durations, easings
├── semantic/        # intent-based color aliases (interactive, critical, …) with _dark
├── recipes/         # defineRecipe / defineSlotRecipe per component
├── animations/      # duration + easing tokens
└── typography/      # font tokens
```

Consumers import the generated output through subpath exports:
`@lume/foundation/css`, `/recipes`, `/patterns`, `/jsx`, `/types`, and the
`/preset` for their own `panda.config.ts`.

## Codegen

`styled-system/` is generated and **git-ignored**. Regenerate it after editing
tokens or recipes:

```bash
panda codegen     # from this package
# apps run: panda codegen && panda cssgen --outfile styled-system/styles.css
```

## Conventions

See [`.agents/rules/ui-kit`](../../../.agents/rules/ui-kit):

- Recipes reference **tokens only** (`"{spacing.md}"`, never `"12px"`).
- Components use **semantic** colors (`colors.interactive.base`), not base scales.
- Every semantic token defines a `_dark` value; `ThemeProvider` from
  `@lume/primitives` toggles it.

# @lume/primitives

React component library built on **Ark UI** (behavior + a11y) and
**@lume/foundation** recipes (styling). Single barrel export: `src/index.ts`.

## Usage

```tsx
import { Button, ThemeProvider, useTheme } from "@lume/primitives";

<ThemeProvider defaultTheme="light">
  <Button variant="solid">Click</Button>
</ThemeProvider>;
```

The consuming app must run Panda codegen (the components import from
`@lume/foundation/css` and `/recipes`). Dark mode is driven by `ThemeProvider`.

## Layout

```
src/ui/<category>/<name>/<name>.tsx   # one component per folder
src/index.ts                          # barrel (alphabetical)
```

Categories: `buttons`, `forms`, `overlays`, `collections`, `data-display`,
`disclosure`, `feedback`, `layout`, `date`, `typography`, `theme`.

## Adding a component

Follow [`.agents/rules/ui-kit/component-architecture.md`](../../../.agents/rules/ui-kit/component-architecture.md):

1. Wrap an Ark primitive with `ark.element`; never hand-roll an `as` prop.
2. Pull style props out with `splitCssProps` before forwarding to the DOM.
3. Compose the className as `cx(recipe(...), css(cssProps), props.className)`.
4. Add a matching recipe in `@lume/foundation/src/recipes` (tokens only).
5. Export from `src/index.ts`.

`src/ui/buttons/button/button.tsx` is the canonical example.

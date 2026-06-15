# Semantic Tokens

Always prefer semantic tokens over raw base colors — they encode intent and adapt automatically across themes.

## Available semantic colors

```typescript
// Interactive
colors.interactive.base    // primary interactive color
colors.interactive.hover   // hover state

// Status
colors.critical.DEFAULT    // errors / danger
colors.positive.DEFAULT    // success
colors.caution.DEFAULT     // warning
colors.info.DEFAULT        // informational

// Surfaces
colors.surface.subtle
colors.surface.muted

// Borders
colors.border.DEFAULT
colors.border.critical
```

## Dark mode

Every semantic token defines a `_dark` value so theme switching is automatic.

```typescript
{
  base: {
    value: "{colors.accent.light.9}",
    _dark: "{colors.accent.dark.9}",
  },
}
```

## Applying dark mode

Panda emits `_dark` styles under `.dark &, [data-theme='dark'] &`. Wrap the app
in `ThemeProvider` from `@lume/primitives`, which toggles `.dark` /
`data-theme` on `<html>`; read or switch the theme with `useTheme()`.

```tsx
import { ThemeProvider, useTheme } from "@lume/primitives";

<ThemeProvider defaultTheme="light">
  <App />
</ThemeProvider>;

const { theme, toggleTheme } = useTheme();
```

## Rule

When you add a new semantic token, always provide both light value and `_dark` value. Never reference `colors.*.light.*` from component recipes — go through a semantic alias.

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

## Rule

When you add a new semantic token, always provide both light value and `_dark` value. Never reference `colors.*.light.*` from component recipes — go through a semantic alias.

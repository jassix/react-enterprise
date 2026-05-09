# Type Conventions

## Shared types live in `@repo/types`

```typescript
import type { Prettify, Nullable } from "@repo/types";
```

Anything reused across packages goes here. Don't re-declare common type helpers locally.

## Component prop pattern

Extend `HTMLStyledProps` (style props from PandaCSS) intersected with React's `ComponentProps` for the underlying element:

```typescript
interface ButtonProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
    ComponentProps<"button"> {
  variant?: "solid" | "outline" | "ghost" | "link";
}
```

The `Omit<..., keyof ComponentProps<"button">>` resolves the overlap between styled-system props and native React props in favor of React's typings.

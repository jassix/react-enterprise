---
title: Use `interface` for Component Props and Extend via `ComponentProps`
impact: LOW
impactDescription: enforces project-wide props typing style
tags: style, typescript, props, components
---

## Use `interface` for Component Props and Extend via `ComponentProps`

**Impact: LOW (style/consistency)**

Define props with `interface`, not `type`. When a component wraps an HTML element or another component and needs to accept its props, extend `ComponentProps<...>` from React rather than re-declaring fields or intersecting types.

Rules:
- Always declare props as `interface ComponentProps { ... }` (or `<ComponentName>Props`).
- To inherit native element props, extend `ComponentProps<"button">`, `ComponentProps<"input">`, etc.
- To inherit another component's props, extend `ComponentProps<typeof OtherComponent>`.
- Use `type` only for unions, intersections, mapped types, or other shapes that `interface` cannot express.

**Incorrect (`type` alias, manual prop list):**

```tsx
type ButtonProps = {
  variant?: "primary" | "ghost"
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
  type?: "button" | "submit" | "reset"
  disabled?: boolean
  children?: React.ReactNode
}
```

**Incorrect (intersection instead of `extends`):**

```tsx
type ButtonProps = ComponentProps<"button"> & {
  variant?: "primary" | "ghost"
}
```

**Correct (extend native element props):**

```tsx
import type { ComponentProps, FC } from "react"

interface ButtonProps extends ComponentProps<"button"> {
  variant?: "primary" | "ghost"
}

const Button: FC<ButtonProps> = ({ variant = "primary", ...props }) => (
  <button data-variant={variant} {...props} />
)
```

**Correct (extend another component's props):**

```tsx
import type { ComponentProps, FC } from "react"
import { Button } from "@champ/ui"

interface IconButtonProps extends ComponentProps<typeof Button> {
  icon: ReactNode
}

const IconButton: FC<IconButtonProps> = ({ icon, children, ...props }) => (
  <Button {...props}>
    {icon}
    {children}
  </Button>
)
```

Notes:
- `ComponentProps<"tag">` resolves to the full set of HTML attributes plus React-specific props (`className`, `ref`, event handlers) — preferred over `HTMLAttributes<HTMLButtonElement>` because it includes element-specific attributes like `type` and `disabled`.
- Use `ComponentPropsWithoutRef<...>` when the wrapper does **not** forward refs; use `ComponentPropsWithRef<...>` (or just `ComponentProps`) when it does.
- When extending fails because of conflicting prop types (e.g., overriding `onChange`), use `Omit<ComponentProps<"input">, "onChange">` inside the `extends` clause.
- Pairs with [Declare Components as `const` with `FC<Props>`](./style-component-declaration.md).

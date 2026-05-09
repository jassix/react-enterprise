---
title: Declare Components as `const` with `FC<Props>`
impact: LOW
impactDescription: enforces project-wide component style
tags: style, components, typescript, fsd
---

## Declare Components as `const` with `FC<Props>`

**Impact: LOW (style/consistency)**

Declare React components as `const` arrow functions annotated with `FC<ComponentProps>` and destructure props in the parameter list. Do **not** use `function` declarations for components. This keeps every component file shaped the same way, makes the props contract obvious at the signature line, and naturally supports rest-spreading remaining props onto the underlying element.

Rules:
- Use `const Component: FC<ComponentProps> = ({ propA, propB, ...props }) => { ... }`.
- Destructure the props you read; spread the rest as `...props` onto the root element when the component forwards to a primitive.
- Import `FC` from `react` (do not use `React.FC`).
- Reserve `function` declarations for non-component utilities (event handlers, helpers).

**Incorrect (function declaration, untyped props):**

```tsx
function Button({ children, onClick, type }) {
  return (
    <button type={type} onClick={onClick} className="btn">
      {children}
    </button>
  )
}
```

**Incorrect (`const` but no `FC` annotation, no rest spread):**

```tsx
const Button = ({ children, onClick, type }: ButtonProps) => (
  <button type={type} onClick={onClick} className="btn">
    {children}
  </button>
)
```

**Correct:**

```tsx
import type { FC } from "react"

const Button: FC<ButtonProps> = ({ children, onClick, ...props }) => (
  <button {...props} onClick={onClick} className="btn">
    {children}
  </button>
)
```

Notes:
- `FC` in modern `@types/react` (React 18+) does **not** auto-inject `children`; declare `children` explicitly on `ButtonProps` if the component accepts it.
- For components that take generic params, fall back to a generic `const` arrow: `const List = <T,>({ items }: ListProps<T>) => { ... }` — `FC` does not support generics.
- This convention pairs with [Use `interface` for Component Props and Extend via `ComponentProps`](./style-props-interface.md), which defines `ButtonProps`.

### Always set `displayName`

`const`-declared components have no inferred name in React DevTools, error stacks, profiler output, or Storybook — they show up as `Anonymous`, `_c`, or the minified bundle identifier. Explicitly assign `displayName` immediately after the declaration so debugging output stays readable. This is the trade-off you accept for using `const` over `function`; it is **not** optional.

Rules:
- Set `Component.displayName = "Component"` directly below the declaration. The string must match the variable name.
- Apply the same rule to `memo`, `forwardRef`, and any `Component.Subcomponent` compound exports.

**Incorrect (no `displayName` — anonymous in DevTools):**

```tsx
const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
)
```

**Correct:**

```tsx
const Button: FC<ButtonProps> = ({ children, ...props }) => (
  <button {...props}>{children}</button>
)

Button.displayName = "Button"
```

**Correct (compound component):**

```tsx
const Card: FC<CardProps> = ({ children, ...props }) => (
  <div {...props}>{children}</div>
)
Card.displayName = "Card"

const CardHeader: FC<ComponentProps<"div">> = (props) => <div {...props} />
CardHeader.displayName = "Card.Header"
```

**Correct (`memo` / `forwardRef`):**

```tsx
const Avatar = memo<AvatarProps>(({ src, alt }) => <img src={src} alt={alt} />)
Avatar.displayName = "Avatar"
```

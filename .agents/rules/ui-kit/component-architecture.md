# Component Architecture

Components combine **Ark UI** primitives (behavior/a11y) with **PandaCSS** recipes (styling).

## Pattern

```typescript
import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { button } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";

export interface ButtonProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
    ComponentProps<"button"> {
  variant?: "solid" | "outline" | "ghost" | "link";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export const Button: FC<ButtonProps> = ({ variant, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.button
      ref={ref}
      {...restProps}
      className={cx(
        button({ variant, size }),
        css(cssProps),
        props.className,
      )}
    />
  );
};
```

## Rules

1. **Polymorphism** via `ark.element` — never write your own `as` prop.
2. **Style separation** via `splitCssProps` — pull style props out before forwarding to the DOM.
3. **className composition order** is fixed: `cx(recipe(...), css(cssProps), props.className)`. Recipe first, ad-hoc style overrides next, caller-provided last.
4. **Forward `ref`** explicitly — destructure it from props rather than wrapping in `forwardRef`.
5. **Variant props** at the top level — don't nest them under a `styling` prop.

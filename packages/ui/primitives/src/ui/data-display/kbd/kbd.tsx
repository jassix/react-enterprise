import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { kbd } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface KbdProps
  extends
    Omit<HTMLStyledProps<"kbd">, keyof ComponentProps<"kbd">>,
    Omit<ComponentProps<"kbd">, "size"> {
  variant?: "outline" | "solid" | "subtle";
  size?: "xs" | "sm" | "md";
}

export const Kbd: FC<KbdProps> = ({ variant, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.kbd
      ref={ref}
      data-slot="kbd"
      {...restProps}
      className={cx(kbd({ variant, size }), css(cssProps), props.className)}
    />
  );
};

Kbd.displayName = "Kbd";

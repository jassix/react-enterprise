import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { button } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface ButtonProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
    ComponentProps<"button"> {
  variant?: "solid" | "outline" | "ghost" | "link";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: boolean;
  stretched?: boolean;
}

export const Button: FC<ButtonProps> = ({
  variant,
  intent,
  size,
  stretched,
  icon,
  ref,
  ...props
}) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.button
      ref={ref}
      {...restProps}
      className={cx(
        button({ variant, intent, size, icon, stretched }),
        css(cssProps),
        props.className,
      )}
    />
  );
};

Button.displayName = "Button";

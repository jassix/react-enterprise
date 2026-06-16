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
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  /**
   * Recolors the button to a semantic accent. Applies to
   * `default` (filled), `outline`, `ghost`, and `link`. `secondary` and
   * `destructive` ignore intent — they have a fixed look.
   */
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  /** Square icon-only button. Width follows the chosen `size`'s height. */
  icon?: boolean;
  stretched?: boolean;
}

export const Button: FC<ButtonProps> = ({
  variant,
  intent,
  size,
  icon,
  stretched,
  ref,
  ...props
}) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.button
      ref={ref}
      data-slot="button"
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

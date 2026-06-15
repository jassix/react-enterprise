import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { badge } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface BadgeProps
  extends Omit<HTMLStyledProps<"span">, keyof ComponentProps<"span">>, ComponentProps<"span"> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link";
  /**
   * Recolors the badge to a semantic accent. Applies to `default` (filled),
   * `outline`, and `ghost`. `secondary` and `destructive` ignore intent.
   */
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
  size?: "sm" | "md" | "lg";
}

export const Badge: FC<BadgeProps> = ({ variant, intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.span
      ref={ref}
      data-slot="badge"
      {...restProps}
      className={cx(badge({ variant, intent, size }), css(cssProps), props.className)}
    />
  );
};

Badge.displayName = "Badge";

import { Toggle as TogglePrimitive } from "@ark-ui/react/toggle";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { toggle } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type ToggleVariants = {
  variant?: "default" | "outline";
  /**
   * Recolors the pressed state. `primary` (default) is the neutral chip; the
   * others use a 10%-alpha intent fill + intent text. The indicator inherits
   * the parent's color so its icon recolors too.
   */
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
  size?: "xs" | "sm" | "md" | "lg";
  icon?: boolean;
};

export interface ToggleRootProps
  extends
    Omit<HTMLStyledProps<"button">, keyof TogglePrimitive.RootBaseProps>,
    Omit<TogglePrimitive.RootBaseProps, "size">,
    ToggleVariants {}

const Root: FC<ToggleRootProps> = ({ variant, intent, size, icon, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <TogglePrimitive.Root
      ref={ref}
      data-slot="toggle-root"
      {...restProps}
      className={cx(toggle({ variant, intent, size, icon }).root, css(cssProps), props.className)}
    />
  );
};

export interface ToggleIndicatorProps
  extends Omit<HTMLStyledProps<"span">, keyof ComponentProps<"span">>, ComponentProps<"span"> {
  variant?: ToggleVariants["variant"];
  intent?: ToggleVariants["intent"];
  size?: ToggleVariants["size"];
  icon?: ToggleVariants["icon"];
}

/**
 * Force-mounted indicator. Always present in the DOM as a styled `<span>`;
 * the recipe controls fade + scale off the parent root's `data-state="on"` via
 * descendant selectors. We bypass Ark's `Toggle.Indicator` Presence wrapper
 * intentionally — it would mount/unmount and skip the exit animation.
 */
const Indicator: FC<ToggleIndicatorProps> = ({ variant, intent, size, icon, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <span
      ref={ref}
      data-slot="toggle-indicator"
      {...restProps}
      className={cx(
        toggle({ variant, intent, size, icon }).indicator,
        css(cssProps),
        props.className,
      )}
    />
  );
};

export const Toggle = Object.assign(Root, {
  Root,
  Indicator,
});

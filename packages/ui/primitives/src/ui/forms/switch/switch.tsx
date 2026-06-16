import { Switch as SwitchPrimitive } from "@ark-ui/react/switch";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { toggleSwitch as switchRecipe } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type SwitchVariantProps = {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
};

export interface SwitchRootProps
  extends
    PropsWithChildren,
    Omit<HTMLStyledProps<"label">, keyof SwitchPrimitive.RootBaseProps>,
    SwitchPrimitive.RootBaseProps {}

const Root: FC<SwitchRootProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SwitchPrimitive.Root
      data-slot="switch-root"
      {...restProps}
      className={cx(css(cssProps), props.className)}
    />
  );
};

export interface SwitchControlProps
  extends
    Omit<HTMLStyledProps<"span">, keyof SwitchPrimitive.ControlBaseProps>,
    SwitchPrimitive.ControlBaseProps,
    SwitchVariantProps {}

const Control: FC<SwitchControlProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SwitchPrimitive.Control
      data-slot="switch-control"
      {...restProps}
      className={cx(switchRecipe({ size, intent }), css(cssProps), props.className)}
    />
  );
};

export interface SwitchLabelProps
  extends
    Omit<HTMLStyledProps<"span">, keyof SwitchPrimitive.LabelBaseProps>,
    SwitchPrimitive.LabelBaseProps {}

const Label: FC<SwitchLabelProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SwitchPrimitive.Label
      data-slot="switch-label"
      {...restProps}
      className={cx(css(cssProps), props.className)}
    />
  );
};

export interface SwitchThumbProps
  extends
    Omit<HTMLStyledProps<"span">, keyof SwitchPrimitive.ThumbBaseProps>,
    SwitchPrimitive.ThumbBaseProps {}

const Thumb: FC<SwitchThumbProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SwitchPrimitive.Thumb
      data-slot="switch-thumb"
      {...restProps}
      className={cx(css(cssProps), props.className)}
    />
  );
};

export const Switch = Object.assign(Root, {
  Root,
  Control,
  Label,
  Thumb,
});

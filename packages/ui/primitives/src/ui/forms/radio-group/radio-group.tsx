import { RadioGroup as RadioGroupPrimitive } from "@ark-ui/react/radio-group";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { radioGroup } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type RadioGroupVariantProps = {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
};

export interface RadioGroupRootProps
  extends
    PropsWithChildren,
    Omit<HTMLStyledProps<"div">, keyof RadioGroupPrimitive.RootBaseProps>,
    RadioGroupPrimitive.RootBaseProps,
    RadioGroupVariantProps {}

const Root: FC<RadioGroupRootProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      {...restProps}
      className={cx(radioGroup({ size, intent }).root, css(cssProps), props.className)}
    />
  );
};

export interface RadioGroupLabelProps
  extends
    Omit<HTMLStyledProps<"label">, keyof RadioGroupPrimitive.LabelBaseProps>,
    RadioGroupPrimitive.LabelBaseProps,
    RadioGroupVariantProps {}

const Label: FC<RadioGroupLabelProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <RadioGroupPrimitive.Label
      data-slot="radio-group-label"
      {...restProps}
      className={cx(radioGroup({ size, intent }).label, css(cssProps), props.className)}
    />
  );
};

export interface RadioGroupItemProps
  extends
    Omit<HTMLStyledProps<"label">, keyof RadioGroupPrimitive.ItemBaseProps>,
    RadioGroupPrimitive.ItemBaseProps,
    RadioGroupVariantProps {}

const Item: FC<RadioGroupItemProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      {...restProps}
      className={cx(radioGroup({ size, intent }).item, css(cssProps), props.className)}
    />
  );
};

export interface RadioGroupItemTextProps
  extends
    Omit<HTMLStyledProps<"span">, keyof RadioGroupPrimitive.ItemTextBaseProps>,
    RadioGroupPrimitive.ItemTextBaseProps,
    RadioGroupVariantProps {}

const ItemText: FC<RadioGroupItemTextProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <RadioGroupPrimitive.ItemText
      data-slot="radio-group-item-text"
      {...restProps}
      className={cx(radioGroup({ size, intent }).itemText, css(cssProps), props.className)}
    />
  );
};

export interface RadioGroupItemControlProps
  extends
    Omit<HTMLStyledProps<"div">, keyof RadioGroupPrimitive.ItemControlBaseProps>,
    RadioGroupPrimitive.ItemControlBaseProps,
    RadioGroupVariantProps {}

const ItemControl: FC<RadioGroupItemControlProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <RadioGroupPrimitive.ItemControl
      data-slot="radio-group-item-control"
      {...restProps}
      className={cx(radioGroup({ size, intent }).itemControl, css(cssProps), props.className)}
    />
  );
};

export interface RadioGroupIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof RadioGroupPrimitive.IndicatorBaseProps>,
    RadioGroupPrimitive.IndicatorBaseProps,
    RadioGroupVariantProps {}

const Indicator: FC<RadioGroupIndicatorProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <RadioGroupPrimitive.Indicator
      data-slot="radio-group-indicator"
      {...restProps}
      className={cx(radioGroup({ size, intent }).indicator, css(cssProps), props.className)}
    />
  );
};

export const RadioGroup = Object.assign(Root, {
  Root,
  Label,
  Item,
  ItemText,
  ItemControl,
  Indicator,
});

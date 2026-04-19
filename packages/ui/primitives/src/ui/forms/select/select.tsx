import { Select as SelectPrimitive } from "@ark-ui/react/select";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { select } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface SelectRootProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.RootBaseProps<SelectPrimitive.CollectionItem>>,
    SelectPrimitive.RootBaseProps<SelectPrimitive.CollectionItem> {
  size?: "sm" | "md" | "lg";
}

const Root: FC<SelectRootProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.Root
      {...(restProps as SelectPrimitive.RootProps<SelectPrimitive.CollectionItem>)}
      className={cx(select({ size }).root, css(cssProps), props.className)}
    />
  );
};

export interface SelectLabelProps
  extends
    Omit<HTMLStyledProps<"label">, keyof SelectPrimitive.LabelBaseProps>,
    SelectPrimitive.LabelBaseProps {
  size?: "sm" | "md" | "lg";
}

const Label: FC<SelectLabelProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      {...restProps}
      className={cx(select({ size }).label, css(cssProps), props.className)}
    />
  );
};

export interface SelectControlProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.ControlBaseProps>,
    SelectPrimitive.ControlBaseProps {
  size?: "sm" | "md" | "lg";
}

const Control: FC<SelectControlProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.Control
      data-slot="select-control"
      {...restProps}
      className={cx(select({ size }).control, css(cssProps), props.className)}
    />
  );
};

export interface SelectTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof SelectPrimitive.TriggerBaseProps>,
    SelectPrimitive.TriggerBaseProps {
  size?: "sm" | "md" | "lg";
}

const Trigger: FC<SelectTriggerProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      {...restProps}
      className={cx(select({ size }).trigger, css(cssProps), props.className)}
    />
  );
};

export interface SelectValueTextProps
  extends
    Omit<HTMLStyledProps<"span">, keyof SelectPrimitive.ValueTextBaseProps>,
    SelectPrimitive.ValueTextBaseProps {
  size?: "sm" | "md" | "lg";
}

const ValueText: FC<SelectValueTextProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.ValueText
      data-slot="select-value-text"
      {...restProps}
      className={cx(select({ size }).valueText, css(cssProps), props.className)}
    />
  );
};

export interface SelectIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.IndicatorBaseProps>,
    SelectPrimitive.IndicatorBaseProps {
  size?: "sm" | "md" | "lg";
}

const Indicator: FC<SelectIndicatorProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.Indicator
      data-slot="select-indicator"
      {...restProps}
      className={cx(select({ size }).indicator, css(cssProps), props.className)}
    />
  );
};

export interface SelectClearTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof SelectPrimitive.ClearTriggerBaseProps>,
    SelectPrimitive.ClearTriggerBaseProps {
  size?: "sm" | "md" | "lg";
}

const ClearTrigger: FC<SelectClearTriggerProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.ClearTrigger
      data-slot="select-clear-trigger"
      {...restProps}
      className={cx(select({ size }).clearTrigger, css(cssProps), props.className)}
    />
  );
};

export interface SelectPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.PositionerBaseProps>,
    SelectPrimitive.PositionerBaseProps {
  size?: "sm" | "md" | "lg";
}

const Positioner: FC<SelectPositionerProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.Positioner
      data-slot="select-positioner"
      {...restProps}
      className={cx(select({ size }).positioner, css(cssProps), props.className)}
    />
  );
};

export interface SelectContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.ContentBaseProps>,
    SelectPrimitive.ContentBaseProps {
  size?: "sm" | "md" | "lg";
}

const Content: FC<SelectContentProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.Content
      data-slot="select-content"
      {...restProps}
      className={cx(select({ size }).content, css(cssProps), props.className)}
    />
  );
};

export interface SelectItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.ItemBaseProps>,
    SelectPrimitive.ItemBaseProps {
  size?: "sm" | "md" | "lg";
}

const Item: FC<SelectItemProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      {...restProps}
      className={cx(select({ size }).item, css(cssProps), props.className)}
    />
  );
};

export interface SelectItemTextProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.ItemTextBaseProps>,
    SelectPrimitive.ItemTextBaseProps {
  size?: "sm" | "md" | "lg";
}

const ItemText: FC<SelectItemTextProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.ItemText
      data-slot="select-item-text"
      {...restProps}
      className={cx(select({ size }).itemText, css(cssProps), props.className)}
    />
  );
};

export interface SelectItemIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.ItemIndicatorBaseProps>,
    SelectPrimitive.ItemIndicatorBaseProps {
  size?: "sm" | "md" | "lg";
}

const ItemIndicator: FC<SelectItemIndicatorProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.ItemIndicator
      data-slot="select-item-indicator"
      {...restProps}
      className={cx(select({ size }).itemIndicator, css(cssProps), props.className)}
    />
  );
};

export interface SelectItemGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.ItemGroupBaseProps>,
    SelectPrimitive.ItemGroupBaseProps {
  size?: "sm" | "md" | "lg";
}

const ItemGroup: FC<SelectItemGroupProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.ItemGroup
      data-slot="select-item-group"
      {...restProps}
      className={cx(select({ size }).itemGroup, css(cssProps), props.className)}
    />
  );
};

export interface SelectItemGroupLabelProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SelectPrimitive.ItemGroupLabelBaseProps>,
    SelectPrimitive.ItemGroupLabelBaseProps {
  size?: "sm" | "md" | "lg";
}

const ItemGroupLabel: FC<SelectItemGroupLabelProps> = ({ size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SelectPrimitive.ItemGroupLabel
      data-slot="select-item-group-label"
      {...restProps}
      className={cx(select({ size }).itemGroupLabel, css(cssProps), props.className)}
    />
  );
};

export const Select = Object.assign(Root, {
  Root,
  Label,
  Control,
  Trigger,
  ValueText,
  Indicator,
  ClearTrigger,
  Positioner,
  Content,
  Item,
  ItemText,
  ItemIndicator,
  ItemGroup,
  ItemGroupLabel,
});

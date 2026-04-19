import { Combobox as ComboboxPrimitive } from "@ark-ui/react/combobox";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { combobox } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type ComboboxVariants = { size?: "sm" | "md" | "lg" };

export interface ComboboxRootProps
  extends
    PropsWithChildren,
    ComboboxPrimitive.RootBaseProps<ComboboxPrimitive.CollectionItem> {}

const Root: FC<ComboboxRootProps> = (props) => (
  <ComboboxPrimitive.Root
    {...(props as ComboboxPrimitive.RootProps<ComboboxPrimitive.CollectionItem>)}
  />
);

export interface ComboboxLabelProps
  extends
    Omit<HTMLStyledProps<"label">, keyof ComboboxPrimitive.LabelBaseProps>,
    ComboboxPrimitive.LabelBaseProps,
    ComboboxVariants {}

const Label: FC<ComboboxLabelProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.Label
      ref={ref}
      data-slot="combobox-label"
      {...restProps}
      className={cx(combobox({ size }).label, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxControlProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComboboxPrimitive.ControlBaseProps>,
    ComboboxPrimitive.ControlBaseProps,
    ComboboxVariants {}

const Control: FC<ComboboxControlProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.Control
      ref={ref}
      data-slot="combobox-control"
      {...restProps}
      className={cx(combobox({ size }).control, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxInputProps
  extends
    Omit<HTMLStyledProps<"input">, keyof ComboboxPrimitive.InputBaseProps | "size">,
    ComboboxPrimitive.InputBaseProps,
    ComboboxVariants {}

const Input: FC<ComboboxInputProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.Input
      ref={ref}
      data-slot="combobox-input"
      {...restProps}
      className={cx(combobox({ size }).input, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComboboxPrimitive.TriggerBaseProps>,
    ComboboxPrimitive.TriggerBaseProps,
    ComboboxVariants {}

const Trigger: FC<ComboboxTriggerProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.Trigger
      ref={ref}
      data-slot="combobox-trigger"
      {...restProps}
      className={cx(combobox({ size }).trigger, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxClearTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComboboxPrimitive.ClearTriggerBaseProps>,
    ComboboxPrimitive.ClearTriggerBaseProps,
    ComboboxVariants {}

const ClearTrigger: FC<ComboboxClearTriggerProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.ClearTrigger
      ref={ref}
      data-slot="combobox-clear-trigger"
      {...restProps}
      className={cx(combobox({ size }).clearTrigger, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComboboxPrimitive.PositionerBaseProps>,
    ComboboxPrimitive.PositionerBaseProps {}

const Positioner: FC<ComboboxPositionerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.Positioner
      data-slot="combobox-positioner"
      {...restProps}
      className={cx(combobox().positioner, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComboboxPrimitive.ContentBaseProps>,
    ComboboxPrimitive.ContentBaseProps {}

const Content: FC<ComboboxContentProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.Content
      data-slot="combobox-content"
      {...restProps}
      className={cx(combobox().content, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComboboxPrimitive.ItemBaseProps>,
    ComboboxPrimitive.ItemBaseProps {}

const Item: FC<ComboboxItemProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      {...restProps}
      className={cx(combobox().item, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxItemTextProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComboboxPrimitive.ItemTextBaseProps>,
    ComboboxPrimitive.ItemTextBaseProps {}

const ItemText: FC<ComboboxItemTextProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.ItemText
      data-slot="combobox-item-text"
      {...restProps}
      className={cx(combobox().itemText, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxItemIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComboboxPrimitive.ItemIndicatorBaseProps>,
    ComboboxPrimitive.ItemIndicatorBaseProps {}

const ItemIndicator: FC<ComboboxItemIndicatorProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.ItemIndicator
      data-slot="combobox-item-indicator"
      {...restProps}
      className={cx(combobox().itemIndicator, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxItemGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComboboxPrimitive.ItemGroupBaseProps>,
    ComboboxPrimitive.ItemGroupBaseProps {}

const ItemGroup: FC<ComboboxItemGroupProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.ItemGroup
      data-slot="combobox-item-group"
      {...restProps}
      className={cx(combobox().itemGroup, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxItemGroupLabelProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComboboxPrimitive.ItemGroupLabelBaseProps>,
    ComboboxPrimitive.ItemGroupLabelBaseProps {}

const ItemGroupLabel: FC<ComboboxItemGroupLabelProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.ItemGroupLabel
      data-slot="combobox-item-group-label"
      {...restProps}
      className={cx(combobox().itemGroupLabel, css(cssProps), props.className)}
    />
  );
};

export interface ComboboxEmptyProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComboboxPrimitive.EmptyBaseProps>,
    ComboboxPrimitive.EmptyBaseProps {}

const Empty: FC<ComboboxEmptyProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      {...restProps}
      className={cx(combobox().empty, css(cssProps), props.className)}
    />
  );
};

export const Combobox = Object.assign(Root, {
  Root,
  Label,
  Control,
  Input,
  Trigger,
  ClearTrigger,
  Positioner,
  Content,
  Item,
  ItemText,
  ItemIndicator,
  ItemGroup,
  ItemGroupLabel,
  Empty,
});

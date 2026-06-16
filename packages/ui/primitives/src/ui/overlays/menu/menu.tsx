import { Menu as MenuPrimitive } from "@ark-ui/react/menu";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { menu } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

export interface MenuRootProps extends PropsWithChildren, MenuPrimitive.RootBaseProps {}

const Root: FC<MenuRootProps> = (props) => <MenuPrimitive.Root {...props} />;

export interface MenuTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof MenuPrimitive.TriggerBaseProps>,
    MenuPrimitive.TriggerBaseProps {}

const Trigger: FC<MenuTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Trigger
      data-slot="menu-trigger"
      {...restProps}
      className={cx(menu().trigger, css(cssProps), props.className)}
    />
  );
};

export interface MenuPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.PositionerBaseProps>,
    MenuPrimitive.PositionerBaseProps {}

const Positioner: FC<MenuPositionerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Positioner
      data-slot="menu-positioner"
      {...restProps}
      className={cx(menu().positioner, css(cssProps), props.className)}
    />
  );
};

export interface MenuContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ContentBaseProps>,
    MenuPrimitive.ContentBaseProps {}

const Content: FC<MenuContentProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Content
      data-slot="menu-content"
      {...restProps}
      className={cx(menu().content, css(cssProps), props.className)}
    />
  );
};

export interface MenuItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemBaseProps>,
    MenuPrimitive.ItemBaseProps {}

const Item: FC<MenuItemProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Item
      data-slot="menu-item"
      {...restProps}
      className={cx(menu().item, css(cssProps), props.className)}
    />
  );
};

export interface MenuItemTextProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemTextBaseProps>,
    MenuPrimitive.ItemTextBaseProps {}

const ItemText: FC<MenuItemTextProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemText
      data-slot="menu-item-text"
      {...restProps}
      className={cx(menu().itemText, css(cssProps), props.className)}
    />
  );
};

export interface MenuItemIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemIndicatorBaseProps>,
    MenuPrimitive.ItemIndicatorBaseProps {}

const ItemIndicator: FC<MenuItemIndicatorProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemIndicator
      data-slot="menu-item-indicator"
      {...restProps}
      className={cx(menu().itemIndicator, css(cssProps), props.className)}
    />
  );
};

export interface MenuCheckboxItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.CheckboxItemBaseProps>,
    MenuPrimitive.CheckboxItemBaseProps {}

const CheckboxItem: FC<MenuCheckboxItemProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.CheckboxItem
      data-slot="menu-checkbox-item"
      {...restProps}
      className={cx(menu().optionItem, css(cssProps), props.className)}
    />
  );
};

export interface MenuRadioItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.RadioItemBaseProps>,
    MenuPrimitive.RadioItemBaseProps {}

const RadioItem: FC<MenuRadioItemProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.RadioItem
      data-slot="menu-radio-item"
      {...restProps}
      className={cx(menu().optionItem, css(cssProps), props.className)}
    />
  );
};

export interface MenuSeparatorProps
  extends
    Omit<HTMLStyledProps<"hr">, keyof MenuPrimitive.SeparatorBaseProps>,
    MenuPrimitive.SeparatorBaseProps {}

const Separator: FC<MenuSeparatorProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Separator
      data-slot="menu-separator"
      {...restProps}
      className={cx(menu().separator, css(cssProps), props.className)}
    />
  );
};

export interface MenuItemGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemGroupBaseProps>,
    MenuPrimitive.ItemGroupBaseProps {}

const ItemGroup: FC<MenuItemGroupProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemGroup
      data-slot="menu-item-group"
      {...restProps}
      className={cx(menu().itemGroup, css(cssProps), props.className)}
    />
  );
};

export interface MenuItemGroupLabelProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemGroupLabelBaseProps>,
    MenuPrimitive.ItemGroupLabelBaseProps {}

const ItemGroupLabel: FC<MenuItemGroupLabelProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemGroupLabel
      data-slot="menu-item-group-label"
      {...restProps}
      className={cx(menu().itemGroupLabel, css(cssProps), props.className)}
    />
  );
};

export const Menu = Object.assign(Root, {
  Root,
  Trigger,
  Positioner,
  Content,
  Item,
  ItemText,
  ItemIndicator,
  CheckboxItem,
  RadioItem,
  Separator,
  ItemGroup,
  ItemGroupLabel,
});

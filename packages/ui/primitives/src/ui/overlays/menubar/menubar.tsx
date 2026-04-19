import { ark } from "@ark-ui/react/factory";
import { Menu as MenuPrimitive } from "@ark-ui/react/menu";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { menubar } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC, PropsWithChildren } from "react";

type MenubarVariants = { size?: "sm" | "md" | "lg" };

export interface MenubarRootProps
  extends
    
		PropsWithChildren,
		Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    MenubarVariants {}

const Root: FC<MenubarRootProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      role="menubar"
      {...restProps}
      className={cx(menubar({ size }).root, css(cssProps), props.className)}
    />
  );
};

export interface MenubarMenuProps extends PropsWithChildren, MenuPrimitive.RootBaseProps {}

const Menu: FC<MenubarMenuProps> = (props) => <MenuPrimitive.Root {...props} />;

export interface MenubarTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof MenuPrimitive.TriggerBaseProps>,
    MenuPrimitive.TriggerBaseProps,
    MenubarVariants {}

const Trigger: FC<MenubarTriggerProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Trigger
      ref={ref}
      data-slot="menubar-trigger"
      {...restProps}
      className={cx(menubar({ size }).trigger, css(cssProps), props.className)}
    />
  );
};

export interface MenubarPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.PositionerBaseProps>,
    MenuPrimitive.PositionerBaseProps,
    MenubarVariants {}

const Positioner: FC<MenubarPositionerProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Positioner
      ref={ref}
      data-slot="menubar-positioner"
      {...restProps}
      className={cx(menubar({ size }).positioner, css(cssProps), props.className)}
    />
  );
};

export interface MenubarContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ContentBaseProps>,
    MenuPrimitive.ContentBaseProps,
    MenubarVariants {}

const Content: FC<MenubarContentProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Content
      ref={ref}
      data-slot="menubar-content"
      {...restProps}
      className={cx(menubar({ size }).content, css(cssProps), props.className)}
    />
  );
};

export interface MenubarItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemBaseProps>,
    MenuPrimitive.ItemBaseProps,
    MenubarVariants {}

const Item: FC<MenubarItemProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Item
      ref={ref}
      data-slot="menubar-item"
      {...restProps}
      className={cx(menubar({ size }).item, css(cssProps), props.className)}
    />
  );
};

export interface MenubarItemTextProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemTextBaseProps>,
    MenuPrimitive.ItemTextBaseProps {}

const ItemText: FC<MenubarItemTextProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemText
      data-slot="menubar-item-text"
      {...restProps}
      className={cx(menubar().itemText, css(cssProps), props.className)}
    />
  );
};

export interface MenubarItemIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemIndicatorBaseProps>,
    MenuPrimitive.ItemIndicatorBaseProps {}

const ItemIndicator: FC<MenubarItemIndicatorProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemIndicator
      data-slot="menubar-item-indicator"
      {...restProps}
      className={cx(menubar().itemIndicator, css(cssProps), props.className)}
    />
  );
};

export interface MenubarSeparatorProps
  extends
    Omit<HTMLStyledProps<"hr">, keyof MenuPrimitive.SeparatorBaseProps>,
    MenuPrimitive.SeparatorBaseProps {}

const Separator: FC<MenubarSeparatorProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Separator
      data-slot="menubar-separator"
      {...restProps}
      className={cx(menubar().separator, css(cssProps), props.className)}
    />
  );
};

export interface MenubarItemGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemGroupBaseProps>,
    MenuPrimitive.ItemGroupBaseProps {}

const ItemGroup: FC<MenubarItemGroupProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemGroup
      data-slot="menubar-item-group"
      {...restProps}
      className={cx(menubar().itemGroup, css(cssProps), props.className)}
    />
  );
};

export interface MenubarItemGroupLabelProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemGroupLabelBaseProps>,
    MenuPrimitive.ItemGroupLabelBaseProps {}

const ItemGroupLabel: FC<MenubarItemGroupLabelProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemGroupLabel
      data-slot="menubar-item-group-label"
      {...restProps}
      className={cx(menubar().itemGroupLabel, css(cssProps), props.className)}
    />
  );
};

export interface MenubarShortcutProps extends HTMLStyledProps<"kbd"> {}

const Shortcut: FC<MenubarShortcutProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return <kbd {...restProps} className={cx(menubar().shortcut, css(cssProps), props.className)} />;
};

export const Menubar = Object.assign(Root, {
  Root,
  Menu,
  Trigger,
  Positioner,
  Content,
  Item,
  ItemText,
  ItemIndicator,
  Separator,
  ItemGroup,
  ItemGroupLabel,
  Shortcut,
});

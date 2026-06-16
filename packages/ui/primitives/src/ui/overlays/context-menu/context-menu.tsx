import { Menu as MenuPrimitive } from "@ark-ui/react/menu";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { contextMenu } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

export interface ContextMenuRootProps extends PropsWithChildren, MenuPrimitive.RootBaseProps {}

const Root: FC<ContextMenuRootProps> = (props) => <MenuPrimitive.Root {...props} />;

export interface ContextMenuTriggerProps
  extends PropsWithChildren, MenuPrimitive.ContextTriggerBaseProps {}

const Trigger: FC<ContextMenuTriggerProps> = (props) => <MenuPrimitive.ContextTrigger {...props} />;

export interface ContextMenuPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.PositionerBaseProps>,
    MenuPrimitive.PositionerBaseProps {}

const Positioner: FC<ContextMenuPositionerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Positioner
      data-slot="context-menu-positioner"
      {...restProps}
      className={cx(contextMenu().positioner, css(cssProps), props.className)}
    />
  );
};

export interface ContextMenuContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ContentBaseProps>,
    MenuPrimitive.ContentBaseProps {}

const Content: FC<ContextMenuContentProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Content
      data-slot="context-menu-content"
      {...restProps}
      className={cx(contextMenu().content, css(cssProps), props.className)}
    />
  );
};

export interface ContextMenuItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemBaseProps>,
    MenuPrimitive.ItemBaseProps {}

const Item: FC<ContextMenuItemProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Item
      data-slot="context-menu-item"
      {...restProps}
      className={cx(contextMenu().item, css(cssProps), props.className)}
    />
  );
};

export interface ContextMenuItemTextProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemTextBaseProps>,
    MenuPrimitive.ItemTextBaseProps {}

const ItemText: FC<ContextMenuItemTextProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemText
      data-slot="context-menu-item-text"
      {...restProps}
      className={cx(contextMenu().itemText, css(cssProps), props.className)}
    />
  );
};

export interface ContextMenuItemIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemIndicatorBaseProps>,
    MenuPrimitive.ItemIndicatorBaseProps {}

const ItemIndicator: FC<ContextMenuItemIndicatorProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemIndicator
      data-slot="context-menu-item-indicator"
      {...restProps}
      className={cx(contextMenu().itemIndicator, css(cssProps), props.className)}
    />
  );
};

export interface ContextMenuSeparatorProps
  extends
    Omit<HTMLStyledProps<"hr">, keyof MenuPrimitive.SeparatorBaseProps>,
    MenuPrimitive.SeparatorBaseProps {}

const Separator: FC<ContextMenuSeparatorProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.Separator
      data-slot="context-menu-separator"
      {...restProps}
      className={cx(contextMenu().separator, css(cssProps), props.className)}
    />
  );
};

export interface ContextMenuItemGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemGroupBaseProps>,
    MenuPrimitive.ItemGroupBaseProps {}

const ItemGroup: FC<ContextMenuItemGroupProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemGroup
      data-slot="context-menu-item-group"
      {...restProps}
      className={cx(contextMenu().itemGroup, css(cssProps), props.className)}
    />
  );
};

export interface ContextMenuItemGroupLabelProps
  extends
    Omit<HTMLStyledProps<"div">, keyof MenuPrimitive.ItemGroupLabelBaseProps>,
    MenuPrimitive.ItemGroupLabelBaseProps {}

const ItemGroupLabel: FC<ContextMenuItemGroupLabelProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <MenuPrimitive.ItemGroupLabel
      data-slot="context-menu-item-group-label"
      {...restProps}
      className={cx(contextMenu().itemGroupLabel, css(cssProps), props.className)}
    />
  );
};

export interface ContextMenuShortcutProps extends HTMLStyledProps<"kbd"> {}

const Shortcut: FC<ContextMenuShortcutProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <kbd {...restProps} className={cx(contextMenu().shortcut, css(cssProps), props.className)} />
  );
};

export const ContextMenu = Object.assign(Root, {
  Root,
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

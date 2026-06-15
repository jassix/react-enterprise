import { NavigationMenu as NavigationMenuPrimitive } from "@ark-ui/react/navigation-menu";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { navigationMenu } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type NavigationMenuVariants = { orientation?: "horizontal" | "vertical" };

export interface NavigationMenuRootProps
  extends
    PropsWithChildren,
    Omit<HTMLStyledProps<"nav">, keyof NavigationMenuPrimitive.RootBaseProps>,
    Omit<NavigationMenuPrimitive.RootBaseProps, "orientation">,
    NavigationMenuVariants {}

const Root: FC<NavigationMenuRootProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      orientation={orientation}
      data-slot="navigation-menu-root"
      {...restProps}
      className={cx(navigationMenu({ orientation }).root, css(cssProps), props.className)}
    />
  );
};

export interface NavigationMenuListProps
  extends
    Omit<HTMLStyledProps<"div">, keyof NavigationMenuPrimitive.ListBaseProps>,
    NavigationMenuPrimitive.ListBaseProps,
    NavigationMenuVariants {}

const List: FC<NavigationMenuListProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <NavigationMenuPrimitive.List
      ref={ref}
      data-slot="navigation-menu-list"
      {...restProps}
      className={cx(navigationMenu({ orientation }).list, css(cssProps), props.className)}
    />
  );
};

export interface NavigationMenuItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof NavigationMenuPrimitive.ItemBaseProps>,
    NavigationMenuPrimitive.ItemBaseProps,
    NavigationMenuVariants {}

const Item: FC<NavigationMenuItemProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <NavigationMenuPrimitive.Item
      ref={ref}
      data-slot="navigation-menu-item"
      {...restProps}
      className={cx(navigationMenu({ orientation }).item, css(cssProps), props.className)}
    />
  );
};

export interface NavigationMenuTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof NavigationMenuPrimitive.TriggerBaseProps>,
    NavigationMenuPrimitive.TriggerBaseProps,
    NavigationMenuVariants {}

const Trigger: FC<NavigationMenuTriggerProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      data-slot="navigation-menu-trigger"
      {...restProps}
      className={cx(navigationMenu({ orientation }).trigger, css(cssProps), props.className)}
    />
  );
};

export interface NavigationMenuLinkProps
  extends
    Omit<HTMLStyledProps<"a">, keyof NavigationMenuPrimitive.LinkBaseProps>,
    NavigationMenuPrimitive.LinkBaseProps,
    NavigationMenuVariants {}

const Link: FC<NavigationMenuLinkProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <NavigationMenuPrimitive.Link
      ref={ref}
      data-slot="navigation-menu-link"
      {...restProps}
      className={cx(navigationMenu({ orientation }).link, css(cssProps), props.className)}
    />
  );
};

export interface NavigationMenuContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof NavigationMenuPrimitive.ContentBaseProps>,
    NavigationMenuPrimitive.ContentBaseProps,
    NavigationMenuVariants {}

const Content: FC<NavigationMenuContentProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <NavigationMenuPrimitive.Content
      ref={ref}
      data-slot="navigation-menu-content"
      {...restProps}
      className={cx(navigationMenu({ orientation }).content, css(cssProps), props.className)}
    />
  );
};

export interface NavigationMenuIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof NavigationMenuPrimitive.IndicatorBaseProps>,
    NavigationMenuPrimitive.IndicatorBaseProps,
    NavigationMenuVariants {}

const Indicator: FC<NavigationMenuIndicatorProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      data-slot="navigation-menu-indicator"
      {...restProps}
      className={cx(navigationMenu({ orientation }).indicator, css(cssProps), props.className)}
    />
  );
};

export interface NavigationMenuViewportProps
  extends
    Omit<HTMLStyledProps<"div">, keyof NavigationMenuPrimitive.ViewportBaseProps>,
    NavigationMenuPrimitive.ViewportBaseProps,
    NavigationMenuVariants {}

const Viewport: FC<NavigationMenuViewportProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <NavigationMenuPrimitive.Viewport
      ref={ref}
      data-slot="navigation-menu-viewport"
      {...restProps}
      className={cx(navigationMenu({ orientation }).viewport, css(cssProps), props.className)}
    />
  );
};

export const NavigationMenu = Object.assign(Root, {
  Root,
  List,
  Item,
  Trigger,
  Link,
  Content,
  Indicator,
  Viewport,
});

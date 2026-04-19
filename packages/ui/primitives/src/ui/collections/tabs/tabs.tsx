import { Tabs as TabsPrimitive } from "@ark-ui/react/tabs";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { tabs } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface TabsRootProps
  extends
    Omit<HTMLStyledProps<"div">, keyof TabsPrimitive.RootBaseProps>,
    TabsPrimitive.RootBaseProps {
  variant?: "line" | "pill" | "unstyled";
  size?: "sm" | "md" | "lg";
}

const Root: FC<TabsRootProps> = ({ variant, size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <TabsPrimitive.Root
      data-slot="tabs-root"
      {...restProps}
      className={cx(tabs({ variant, size }).root, css(cssProps), props.className)}
    />
  );
};

export interface TabsListProps
  extends
    Omit<HTMLStyledProps<"div">, keyof TabsPrimitive.ListBaseProps>,
    TabsPrimitive.ListBaseProps {
  variant?: "line" | "pill" | "unstyled";
  size?: "sm" | "md" | "lg";
}

const List: FC<TabsListProps> = ({ variant, size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      {...restProps}
      className={cx(tabs({ variant, size }).list, css(cssProps), props.className)}
    />
  );
};

export interface TabsTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof TabsPrimitive.TriggerBaseProps>,
    TabsPrimitive.TriggerBaseProps {
  variant?: "line" | "pill" | "unstyled";
  size?: "sm" | "md" | "lg";
}

const Trigger: FC<TabsTriggerProps> = ({ variant, size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      {...restProps}
      className={cx(tabs({ variant, size }).trigger, css(cssProps), props.className)}
    />
  );
};

export interface TabsContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof TabsPrimitive.ContentBaseProps>,
    TabsPrimitive.ContentBaseProps {
  variant?: "line" | "pill" | "unstyled";
  size?: "sm" | "md" | "lg";
}

const Content: FC<TabsContentProps> = ({ variant, size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      {...restProps}
      className={cx(tabs({ variant, size }).content, css(cssProps), props.className)}
    />
  );
};

export interface TabsIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof TabsPrimitive.IndicatorBaseProps>,
    TabsPrimitive.IndicatorBaseProps {
  variant?: "line" | "pill" | "unstyled";
  size?: "sm" | "md" | "lg";
}

const Indicator: FC<TabsIndicatorProps> = ({ variant, size, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <TabsPrimitive.Indicator
      data-slot="tabs-indicator"
      {...restProps}
      className={cx(tabs({ variant, size }).indicator, css(cssProps), props.className)}
    />
  );
};

export const Tabs = Object.assign(Root, {
  Root,
  List,
  Trigger,
  Content,
  Indicator,
});

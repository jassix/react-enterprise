import { Collapsible as CollapsiblePrimitive } from "@ark-ui/react/collapsible";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { collapsible } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

export interface CollapsibleRootProps
  extends
    
		PropsWithChildren,
		Omit<HTMLStyledProps<"div">, keyof CollapsiblePrimitive.RootBaseProps>,
    CollapsiblePrimitive.RootBaseProps {}

const Root: FC<CollapsibleRootProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CollapsiblePrimitive.Root
      data-slot="collapsible-root"
      {...restProps}
      className={cx(collapsible().root, css(cssProps), props.className)}
    />
  );
};

export interface CollapsibleTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof CollapsiblePrimitive.TriggerBaseProps>,
    CollapsiblePrimitive.TriggerBaseProps {}

const Trigger: FC<CollapsibleTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CollapsiblePrimitive.Trigger
      data-slot="collapsible-trigger"
      {...restProps}
      className={cx(collapsible().trigger, css(cssProps), props.className)}
    />
  );
};

export interface CollapsibleIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof CollapsiblePrimitive.IndicatorBaseProps>,
    CollapsiblePrimitive.IndicatorBaseProps {}

const Indicator: FC<CollapsibleIndicatorProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CollapsiblePrimitive.Indicator
      data-slot="collapsible-indicator"
      {...restProps}
      className={cx(collapsible().indicator, css(cssProps), props.className)}
    />
  );
};

export interface CollapsibleContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof CollapsiblePrimitive.ContentBaseProps>,
    CollapsiblePrimitive.ContentBaseProps {}

const Content: FC<CollapsibleContentProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CollapsiblePrimitive.Content
      data-slot="collapsible-content"
      {...restProps}
      className={cx(collapsible().content, css(cssProps), props.className)}
    />
  );
};

export const Collapsible = Object.assign(Root, {
  Root,
  Trigger,
  Indicator,
  Content,
});

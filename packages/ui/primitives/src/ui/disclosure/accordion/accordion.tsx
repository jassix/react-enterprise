import { Accordion as AccordionPrimitive } from "@ark-ui/react/accordion";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { accordion } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

export interface AccordionRootProps
  extends
    PropsWithChildren,
    Omit<HTMLStyledProps<"div">, keyof AccordionPrimitive.RootBaseProps>,
    AccordionPrimitive.RootBaseProps {}

const Root: FC<AccordionRootProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      {...restProps}
      className={cx(accordion(props).root, css(cssProps))}
    />
  );
};

export interface AccordionItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof AccordionPrimitive.ItemBaseProps>,
    AccordionPrimitive.ItemBaseProps {}

const Item: FC<AccordionItemProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      {...restProps}
      className={cx(accordion(props).item, css(cssProps))}
    />
  );
};

export interface AccordionTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof AccordionPrimitive.ItemTriggerBaseProps>,
    AccordionPrimitive.ItemTriggerBaseProps {}

const Trigger: FC<AccordionTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <AccordionPrimitive.ItemTrigger
      data-slot="accordion-trigger"
      {...restProps}
      className={cx(accordion(props).trigger, css(cssProps))}
    />
  );
};

export interface AccordionIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof AccordionPrimitive.ItemIndicatorBaseProps>,
    AccordionPrimitive.ItemIndicatorBaseProps {}

const Indicator: FC<AccordionIndicatorProps> = ({ children, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <AccordionPrimitive.ItemIndicator
      data-slot="accordion-indicator"
      {...restProps}
      className={cx(accordion(props).indicator, css(cssProps))}
    >
      {children ?? <DefaultChevronIcon />}
    </AccordionPrimitive.ItemIndicator>
  );
};

const DefaultChevronIcon: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export interface AccordionContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof AccordionPrimitive.ItemContentBaseProps>,
    AccordionPrimitive.ItemContentBaseProps {}

const Content: FC<AccordionContentProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <AccordionPrimitive.ItemContent
      data-slot="accordion-content"
      {...restProps}
      className={cx(accordion(props).content, css(cssProps))}
    />
  );
};

export const Accordion = Object.assign(Root, {
  Root,
  Item,
  Trigger,
  Indicator,
  Content,
});

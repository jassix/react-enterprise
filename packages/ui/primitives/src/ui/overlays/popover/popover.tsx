import { Popover as PopoverPrimitive } from "@ark-ui/react/popover";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { popover } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

export interface PopoverRootProps extends PropsWithChildren, PopoverPrimitive.RootBaseProps {}

const Root: FC<PopoverRootProps> = (props) => <PopoverPrimitive.Root {...props} />;

export interface PopoverTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof PopoverPrimitive.TriggerBaseProps>,
    PopoverPrimitive.TriggerBaseProps {}

const Trigger: FC<PopoverTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PopoverPrimitive.Trigger
      data-slot="popover-trigger"
      {...restProps}
      className={cx(popover().trigger, css(cssProps), props.className)}
    />
  );
};

export interface PopoverPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.PositionerBaseProps>,
    PopoverPrimitive.PositionerBaseProps {}

const Positioner: FC<PopoverPositionerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PopoverPrimitive.Positioner
      data-slot="popover-positioner"
      {...restProps}
      className={cx(popover().positioner, css(cssProps), props.className)}
    />
  );
};

export interface PopoverContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.ContentBaseProps>,
    PopoverPrimitive.ContentBaseProps {}

const Content: FC<PopoverContentProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PopoverPrimitive.Content
      data-slot="popover-content"
      {...restProps}
      className={cx(popover().content, css(cssProps), props.className)}
    />
  );
};

export interface PopoverTitleProps
  extends
    Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.TitleBaseProps>,
    PopoverPrimitive.TitleBaseProps {}

const Title: FC<PopoverTitleProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      {...restProps}
      className={cx(popover().title, css(cssProps), props.className)}
    />
  );
};

export interface PopoverDescriptionProps
  extends
    Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.DescriptionBaseProps>,
    PopoverPrimitive.DescriptionBaseProps {}

const Description: FC<PopoverDescriptionProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      {...restProps}
      className={cx(popover().description, css(cssProps), props.className)}
    />
  );
};

export interface PopoverCloseTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof PopoverPrimitive.CloseTriggerBaseProps>,
    PopoverPrimitive.CloseTriggerBaseProps {}

const CloseTrigger: FC<PopoverCloseTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PopoverPrimitive.CloseTrigger
      data-slot="popover-close"
      {...restProps}
      className={cx(popover().closeTrigger, css(cssProps), props.className)}
    />
  );
};

export interface PopoverArrowProps
  extends
    Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.ArrowBaseProps>,
    PopoverPrimitive.ArrowBaseProps {}

const Arrow: FC<PopoverArrowProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PopoverPrimitive.Arrow
      data-slot="popover-arrow"
      {...restProps}
      className={cx(popover().arrow, css(cssProps), props.className)}
    />
  );
};

export const Popover = Object.assign(Root, {
  Root,
  Trigger,
  Positioner,
  Content,
  Title,
  Description,
  CloseTrigger,
  Arrow,
});

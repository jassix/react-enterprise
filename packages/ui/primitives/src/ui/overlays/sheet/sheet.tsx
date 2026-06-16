import { Dialog as DialogPrimitive } from "@ark-ui/react/dialog";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { sheet } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type SheetVariants = {
  side?: "top" | "right" | "bottom" | "left";
  size?: "sm" | "md" | "lg" | "xl" | "full";
};

export interface SheetRootProps extends PropsWithChildren, DialogPrimitive.RootBaseProps {}

const Root: FC<SheetRootProps> = (props) => <DialogPrimitive.Root {...props} />;

export interface SheetTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DialogPrimitive.TriggerBaseProps>,
    DialogPrimitive.TriggerBaseProps {}

const Trigger: FC<SheetTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return <DialogPrimitive.Trigger {...restProps} className={cx(css(cssProps), props.className)} />;
};

export interface SheetBackdropProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.BackdropBaseProps>,
    DialogPrimitive.BackdropBaseProps,
    SheetVariants {}

const Backdrop: FC<SheetBackdropProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Backdrop
      ref={ref}
      data-slot="sheet-backdrop"
      {...restProps}
      className={cx(sheet({ side, size }).backdrop, css(cssProps), props.className)}
    />
  );
};

export interface SheetPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.PositionerBaseProps>,
    DialogPrimitive.PositionerBaseProps,
    SheetVariants {}

const Positioner: FC<SheetPositionerProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Positioner
      ref={ref}
      data-slot="sheet-positioner"
      {...restProps}
      className={cx(sheet({ side, size }).positioner, css(cssProps), props.className)}
    />
  );
};

export interface SheetContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.ContentBaseProps>,
    DialogPrimitive.ContentBaseProps,
    SheetVariants {}

const Content: FC<SheetContentProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Content
      ref={ref}
      data-slot="sheet-content"
      {...restProps}
      className={cx(sheet({ side, size }).content, css(cssProps), props.className)}
    />
  );
};

export interface SheetTitleProps
  extends
    Omit<HTMLStyledProps<"h2">, keyof DialogPrimitive.TitleBaseProps>,
    DialogPrimitive.TitleBaseProps,
    SheetVariants {}

const Title: FC<SheetTitleProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="sheet-title"
      {...restProps}
      className={cx(sheet({ side, size }).title, css(cssProps), props.className)}
    />
  );
};

export interface SheetDescriptionProps
  extends
    Omit<HTMLStyledProps<"p">, keyof DialogPrimitive.DescriptionBaseProps>,
    DialogPrimitive.DescriptionBaseProps,
    SheetVariants {}

const Description: FC<SheetDescriptionProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="sheet-description"
      {...restProps}
      className={cx(sheet({ side, size }).description, css(cssProps), props.className)}
    />
  );
};

export interface SheetHeaderProps extends Omit<HTMLStyledProps<"header">, "size">, SheetVariants {}

const Header: FC<SheetHeaderProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <header
      ref={ref}
      {...restProps}
      className={cx(sheet({ side, size }).header, css(cssProps), props.className)}
    />
  );
};

export interface SheetBodyProps extends Omit<HTMLStyledProps<"div">, "size">, SheetVariants {}

const Body: FC<SheetBodyProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <div
      ref={ref}
      {...restProps}
      className={cx(sheet({ side, size }).body, css(cssProps), props.className)}
    />
  );
};

export interface SheetFooterProps extends Omit<HTMLStyledProps<"footer">, "size">, SheetVariants {}

const Footer: FC<SheetFooterProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <footer
      ref={ref}
      {...restProps}
      className={cx(sheet({ side, size }).footer, css(cssProps), props.className)}
    />
  );
};

export interface SheetCloseTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DialogPrimitive.CloseTriggerBaseProps>,
    DialogPrimitive.CloseTriggerBaseProps,
    SheetVariants {}

const CloseTrigger: FC<SheetCloseTriggerProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.CloseTrigger
      ref={ref}
      data-slot="sheet-close-trigger"
      {...restProps}
      className={cx(sheet({ side, size }).closeTrigger, css(cssProps), props.className)}
    />
  );
};

export const Sheet = Object.assign(Root, {
  Root,
  Trigger,
  Backdrop,
  Positioner,
  Content,
  Title,
  Description,
  Header,
  Body,
  Footer,
  CloseTrigger,
});

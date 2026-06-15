import { Dialog as DialogPrimitive } from "@ark-ui/react/dialog";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { alertDialog } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type AlertDialogVariants = {
  intent?: "critical" | "caution" | "primary";
  size?: "sm" | "md" | "lg";
};

export interface AlertDialogRootProps extends PropsWithChildren, DialogPrimitive.RootBaseProps {}

const Root: FC<AlertDialogRootProps> = (props) => <DialogPrimitive.Root {...props} />;

export interface AlertDialogTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DialogPrimitive.TriggerBaseProps>,
    DialogPrimitive.TriggerBaseProps {}

const Trigger: FC<AlertDialogTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return <DialogPrimitive.Trigger {...restProps} className={cx(css(cssProps), props.className)} />;
};

export interface AlertDialogBackdropProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.BackdropBaseProps>,
    DialogPrimitive.BackdropBaseProps,
    AlertDialogVariants {}

const Backdrop: FC<AlertDialogBackdropProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Backdrop
      ref={ref}
      data-slot="alert-dialog-backdrop"
      {...restProps}
      className={cx(alertDialog({ intent, size }).backdrop, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.PositionerBaseProps>,
    DialogPrimitive.PositionerBaseProps,
    AlertDialogVariants {}

const Positioner: FC<AlertDialogPositionerProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Positioner
      ref={ref}
      data-slot="alert-dialog-positioner"
      {...restProps}
      className={cx(alertDialog({ intent, size }).positioner, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.ContentBaseProps>,
    DialogPrimitive.ContentBaseProps,
    AlertDialogVariants {}

const Content: FC<AlertDialogContentProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Content
      ref={ref}
      data-slot="alert-dialog-content"
      {...restProps}
      className={cx(alertDialog({ intent, size }).content, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogTitleProps
  extends
    Omit<HTMLStyledProps<"h2">, keyof DialogPrimitive.TitleBaseProps>,
    DialogPrimitive.TitleBaseProps,
    AlertDialogVariants {}

const Title: FC<AlertDialogTitleProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Title
      ref={ref}
      data-slot="alert-dialog-title"
      {...restProps}
      className={cx(alertDialog({ intent, size }).title, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogDescriptionProps
  extends
    Omit<HTMLStyledProps<"p">, keyof DialogPrimitive.DescriptionBaseProps>,
    DialogPrimitive.DescriptionBaseProps,
    AlertDialogVariants {}

const Description: FC<AlertDialogDescriptionProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Description
      ref={ref}
      data-slot="alert-dialog-description"
      {...restProps}
      className={cx(alertDialog({ intent, size }).description, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogHeaderProps
  extends Omit<HTMLStyledProps<"header">, "size">, AlertDialogVariants {}

const Header: FC<AlertDialogHeaderProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <header
      ref={ref}
      data-slot="alert-dialog-header"
      {...restProps}
      className={cx(alertDialog({ intent, size }).header, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogMediaProps
  extends Omit<HTMLStyledProps<"div">, "size">, AlertDialogVariants {}

const Media: FC<AlertDialogMediaProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <div
      ref={ref}
      data-slot="alert-dialog-media"
      aria-hidden
      {...restProps}
      className={cx(alertDialog({ intent, size }).media, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogBodyProps
  extends Omit<HTMLStyledProps<"div">, "size">, AlertDialogVariants {}

const Body: FC<AlertDialogBodyProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <div
      ref={ref}
      {...restProps}
      className={cx(alertDialog({ intent, size }).body, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogFooterProps
  extends Omit<HTMLStyledProps<"footer">, "size">, AlertDialogVariants {}

const Footer: FC<AlertDialogFooterProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <footer
      ref={ref}
      {...restProps}
      className={cx(alertDialog({ intent, size }).footer, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogCancelTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DialogPrimitive.CloseTriggerBaseProps>,
    DialogPrimitive.CloseTriggerBaseProps,
    AlertDialogVariants {}

const CancelTrigger: FC<AlertDialogCancelTriggerProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.CloseTrigger
      ref={ref}
      data-slot="alert-dialog-close-trigger"
      {...restProps}
      className={cx(alertDialog({ intent, size }).cancelTrigger, css(cssProps), props.className)}
    />
  );
};

export interface AlertDialogConfirmTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DialogPrimitive.CloseTriggerBaseProps>,
    DialogPrimitive.CloseTriggerBaseProps,
    AlertDialogVariants {}

const ConfirmTrigger: FC<AlertDialogConfirmTriggerProps> = ({ intent, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.CloseTrigger
      ref={ref}
      data-slot="alert-dialog-close-trigger"
      {...restProps}
      className={cx(alertDialog({ intent, size }).confirmTrigger, css(cssProps), props.className)}
    />
  );
};

export const AlertDialog = Object.assign(Root, {
  Root,
  Trigger,
  Backdrop,
  Positioner,
  Content,
  Header,
  Media,
  Title,
  Description,
  Body,
  Footer,
  CancelTrigger,
  ConfirmTrigger,
});

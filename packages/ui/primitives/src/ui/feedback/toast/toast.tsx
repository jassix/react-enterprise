import { createToaster, Toaster, Toast as ToastPrimitive } from "@ark-ui/react/toast";
import type { ToasterProps as ArkToasterProps } from "@ark-ui/react/toast";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { toast } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

type ToastVariants = {
  status?: "neutral" | "info" | "positive" | "caution" | "critical";
  variant?: "subtle" | "solid" | "outline";
};

export interface ToastRootProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ToastPrimitive.RootBaseProps>,
    ToastPrimitive.RootBaseProps,
    ToastVariants {}

const Root: FC<ToastRootProps> = ({ status, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ToastPrimitive.Root
      ref={ref}
      data-slot="toast-root"
      {...restProps}
      className={cx(toast({ status, variant }).root, css(cssProps), props.className)}
    />
  );
};

export interface ToastTitleProps
  extends
    Omit<HTMLStyledProps<"h3">, keyof ToastPrimitive.TitleBaseProps>,
    ToastPrimitive.TitleBaseProps,
    ToastVariants {}

const Title: FC<ToastTitleProps> = ({ status, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ToastPrimitive.Title
      ref={ref}
      data-slot="toast-title"
      {...restProps}
      className={cx(toast({ status, variant }).title, css(cssProps), props.className)}
    />
  );
};

export interface ToastDescriptionProps
  extends
    Omit<HTMLStyledProps<"p">, keyof ToastPrimitive.DescriptionBaseProps>,
    ToastPrimitive.DescriptionBaseProps,
    ToastVariants {}

const Description: FC<ToastDescriptionProps> = ({ status, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ToastPrimitive.Description
      ref={ref}
      data-slot="toast-description"
      {...restProps}
      className={cx(toast({ status, variant }).description, css(cssProps), props.className)}
    />
  );
};

export interface ToastActionTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ToastPrimitive.ActionTriggerBaseProps>,
    ToastPrimitive.ActionTriggerBaseProps,
    ToastVariants {}

const ActionTrigger: FC<ToastActionTriggerProps> = ({ status, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ToastPrimitive.ActionTrigger
      ref={ref}
      data-slot="toast-action-trigger"
      {...restProps}
      className={cx(toast({ status, variant }).actionTrigger, css(cssProps), props.className)}
    />
  );
};

export interface ToastCloseTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ToastPrimitive.CloseTriggerBaseProps>,
    ToastPrimitive.CloseTriggerBaseProps,
    ToastVariants {}

const CloseTrigger: FC<ToastCloseTriggerProps> = ({ status, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ToastPrimitive.CloseTrigger
      ref={ref}
      data-slot="toast-close-trigger"
      {...restProps}
      className={cx(toast({ status, variant }).closeTrigger, css(cssProps), props.className)}
    />
  );
};

export { createToaster };
export type ToasterProps = ArkToasterProps;

export const Toast = Object.assign(Root, {
  Root,
  Title,
  Description,
  ActionTrigger,
  CloseTrigger,
  Toaster,
  createToaster,
});

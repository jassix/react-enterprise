import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { sonner } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type SonnerVariants = {
  status?: "neutral" | "info" | "positive" | "caution" | "critical" | "loading";
  placement?:
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";
};

export interface SonnerViewportProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    SonnerVariants {}

const Viewport: FC<SonnerViewportProps> = ({ status, placement, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="sonner-viewport"
      {...restProps}
      className={cx(sonner({ status, placement }).viewport, css(cssProps), props.className)}
    />
  );
};

export interface SonnerToastProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    SonnerVariants {}

const Toast: FC<SonnerToastProps> = ({ status, placement, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="sonner-toast"
      role="status"
      {...restProps}
      className={cx(sonner({ status, placement }).toast, css(cssProps), props.className)}
    />
  );
};

export interface SonnerIconProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    SonnerVariants {}

const Icon: FC<SonnerIconProps> = ({ status, placement, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="sonner-icon"
      aria-hidden
      {...restProps}
      className={cx(sonner({ status, placement }).icon, css(cssProps), props.className)}
    />
  );
};

export interface SonnerTitleProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    SonnerVariants {}

const Title: FC<SonnerTitleProps> = ({ status, placement, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="sonner-title"
      {...restProps}
      className={cx(sonner({ status, placement }).title, css(cssProps), props.className)}
    />
  );
};

export interface SonnerDescriptionProps
  extends
    Omit<HTMLStyledProps<"p">, keyof ComponentProps<"p">>,
    ComponentProps<"p">,
    SonnerVariants {}

const Description: FC<SonnerDescriptionProps> = ({ status, placement, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.p
      ref={ref}
      data-slot="sonner-description"
      {...restProps}
      className={cx(sonner({ status, placement }).description, css(cssProps), props.className)}
    />
  );
};

export interface SonnerActionButtonProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
    ComponentProps<"button">,
    SonnerVariants {}

const ActionButton: FC<SonnerActionButtonProps> = ({ status, placement, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.button
      ref={ref}
      data-slot="sonner-action"
      type="button"
      {...restProps}
      className={cx(sonner({ status, placement }).actionButton, css(cssProps), props.className)}
    />
  );
};

const CancelButton: FC<SonnerActionButtonProps> = ({ status, placement, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.button
      ref={ref}
      data-slot="sonner-cancel"
      type="button"
      {...restProps}
      className={cx(sonner({ status, placement }).cancelButton, css(cssProps), props.className)}
    />
  );
};

export interface SonnerCloseButtonProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
    ComponentProps<"button">,
    SonnerVariants {}

const CloseButton: FC<SonnerCloseButtonProps> = ({ status, placement, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.button
      ref={ref}
      data-slot="sonner-close"
      type="button"
      aria-label="Close"
      {...restProps}
      className={cx(sonner({ status, placement }).closeButton, css(cssProps), props.className)}
    />
  );
};

export const Sonner = Object.assign(Viewport, {
  Viewport,
  Toast,
  Icon,
  Title,
  Description,
  ActionButton,
  CancelButton,
  CloseButton,
});

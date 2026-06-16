import { Dialog as DialogPrimitive } from "@ark-ui/react/dialog";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { dialog } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC, PropsWithChildren } from "react";

type DialogVariantProps = {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
  centered?: boolean;
};

export interface DialogRootProps extends PropsWithChildren, DialogPrimitive.RootBaseProps {}

const Root: FC<DialogRootProps> = (props) => <DialogPrimitive.Root {...props} />;

export interface DialogTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DialogPrimitive.TriggerBaseProps>,
    DialogPrimitive.TriggerBaseProps {}

const Trigger: FC<DialogTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      {...restProps}
      className={cx(css(cssProps), props.className)}
    />
  );
};

export interface DialogBackdropProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.BackdropBaseProps>,
    DialogPrimitive.BackdropBaseProps,
    DialogVariantProps {}

const Backdrop: FC<DialogBackdropProps> = ({ size, centered, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      {...restProps}
      className={cx(dialog({ size, centered }).backdrop, css(cssProps), props.className)}
    />
  );
};

export interface DialogPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.PositionerBaseProps>,
    DialogPrimitive.PositionerBaseProps,
    DialogVariantProps {}

const Positioner: FC<DialogPositionerProps> = ({ size, centered, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Positioner
      data-slot="dialog-positioner"
      {...restProps}
      className={cx(dialog({ size, centered }).positioner, css(cssProps), props.className)}
    />
  );
};

export interface DialogContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.ContentBaseProps>,
    DialogPrimitive.ContentBaseProps,
    DialogVariantProps {}

const Content: FC<DialogContentProps> = ({ size, centered, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Content
      data-slot="dialog-content"
      {...restProps}
      className={cx(dialog({ size, centered }).content, css(cssProps), props.className)}
    />
  );
};

export interface DialogHeaderProps extends ComponentProps<"div"> {
  size?: DialogVariantProps["size"];
  centered?: DialogVariantProps["centered"];
}

const Header: FC<DialogHeaderProps> = ({ size, centered, className, ...props }) => (
  <div
    data-slot="dialog-header"
    {...props}
    className={cx(dialog({ size, centered }).header, className)}
  />
);

export interface DialogFooterProps extends ComponentProps<"div"> {
  size?: DialogVariantProps["size"];
  centered?: DialogVariantProps["centered"];
}

const Footer: FC<DialogFooterProps> = ({ size, centered, className, ...props }) => (
  <div
    data-slot="dialog-footer"
    {...props}
    className={cx(dialog({ size, centered }).footer, className)}
  />
);

export interface DialogTitleProps
  extends
    Omit<HTMLStyledProps<"h2">, keyof DialogPrimitive.TitleBaseProps>,
    DialogPrimitive.TitleBaseProps,
    DialogVariantProps {}

const Title: FC<DialogTitleProps> = ({ size, centered, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      {...restProps}
      className={cx(dialog({ size, centered }).title, css(cssProps), props.className)}
    />
  );
};

export interface DialogDescriptionProps
  extends
    Omit<HTMLStyledProps<"p">, keyof DialogPrimitive.DescriptionBaseProps>,
    DialogPrimitive.DescriptionBaseProps,
    DialogVariantProps {}

const Description: FC<DialogDescriptionProps> = ({ size, centered, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      {...restProps}
      className={cx(dialog({ size, centered }).description, css(cssProps), props.className)}
    />
  );
};

export interface DialogCloseTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DialogPrimitive.CloseTriggerBaseProps>,
    DialogPrimitive.CloseTriggerBaseProps,
    DialogVariantProps {}

const CloseTrigger: FC<DialogCloseTriggerProps> = ({
  size,
  centered,
  children,
  "aria-label": ariaLabel = "Close",
  ...props
}) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DialogPrimitive.CloseTrigger
      data-slot="dialog-close"
      aria-label={ariaLabel}
      {...restProps}
      className={cx(dialog({ size, centered }).closeTrigger, css(cssProps), props.className)}
    >
      {children ?? <DefaultCloseIcon />}
    </DialogPrimitive.CloseTrigger>
  );
};

const DefaultCloseIcon: FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 6l12 12M6 18L18 6" />
  </svg>
);

export const Dialog = Object.assign(Root, {
  Root,
  Trigger,
  Backdrop,
  Positioner,
  Content,
  Header,
  Footer,
  Title,
  Description,
  CloseTrigger,
});

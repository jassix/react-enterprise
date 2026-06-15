import { BottomSheet as BottomSheetPrimitive } from "@ark-ui/react/bottom-sheet";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { drawer } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type DrawerVariants = {
  side?: "top" | "right" | "bottom" | "left";
  size?: "sm" | "md" | "lg" | "full";
};

export interface DrawerRootProps extends PropsWithChildren, BottomSheetPrimitive.RootBaseProps {}

const Root: FC<DrawerRootProps> = (props) => <BottomSheetPrimitive.Root {...props} />;

export interface DrawerTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof BottomSheetPrimitive.TriggerBaseProps>,
    BottomSheetPrimitive.TriggerBaseProps {}

const Trigger: FC<DrawerTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <BottomSheetPrimitive.Trigger {...restProps} className={cx(css(cssProps), props.className)} />
  );
};

export interface DrawerBackdropProps
  extends
    Omit<HTMLStyledProps<"div">, keyof BottomSheetPrimitive.BackdropBaseProps>,
    BottomSheetPrimitive.BackdropBaseProps,
    DrawerVariants {}

const Backdrop: FC<DrawerBackdropProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <BottomSheetPrimitive.Backdrop
      ref={ref}
      data-slot="drawer-backdrop"
      {...restProps}
      className={cx(drawer({ side, size }).backdrop, css(cssProps), props.className)}
    />
  );
};

export interface DrawerContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof BottomSheetPrimitive.ContentBaseProps>,
    BottomSheetPrimitive.ContentBaseProps,
    DrawerVariants {}

const Content: FC<DrawerContentProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <BottomSheetPrimitive.Content
      ref={ref}
      data-slot="drawer-content"
      {...restProps}
      className={cx(drawer({ side, size }).content, css(cssProps), props.className)}
    />
  );
};

export interface DrawerHandleProps
  extends
    Omit<HTMLStyledProps<"div">, keyof BottomSheetPrimitive.GrabberBaseProps>,
    BottomSheetPrimitive.GrabberBaseProps,
    DrawerVariants {}

const Handle: FC<DrawerHandleProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <BottomSheetPrimitive.Grabber
      ref={ref}
      data-slot="drawer-grabber"
      {...restProps}
      className={cx(drawer({ side, size }).handle, css(cssProps), props.className)}
    />
  );
};

export interface DrawerTitleProps
  extends
    Omit<HTMLStyledProps<"h2">, keyof BottomSheetPrimitive.TitleBaseProps>,
    BottomSheetPrimitive.TitleBaseProps,
    DrawerVariants {}

const Title: FC<DrawerTitleProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <BottomSheetPrimitive.Title
      ref={ref}
      data-slot="drawer-title"
      {...restProps}
      className={cx(drawer({ side, size }).title, css(cssProps), props.className)}
    />
  );
};

export interface DrawerDescriptionProps
  extends Omit<HTMLStyledProps<"p">, "size">, DrawerVariants {}

const Description: FC<DrawerDescriptionProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <p
      ref={ref}
      {...restProps}
      className={cx(drawer({ side, size }).description, css(cssProps), props.className)}
    />
  );
};

export interface DrawerHeaderProps
  extends Omit<HTMLStyledProps<"header">, "size">, DrawerVariants {}

const Header: FC<DrawerHeaderProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <header
      ref={ref}
      {...restProps}
      className={cx(drawer({ side, size }).header, css(cssProps), props.className)}
    />
  );
};

export interface DrawerBodyProps extends Omit<HTMLStyledProps<"div">, "size">, DrawerVariants {}

const Body: FC<DrawerBodyProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <div
      ref={ref}
      {...restProps}
      className={cx(drawer({ side, size }).body, css(cssProps), props.className)}
    />
  );
};

export interface DrawerFooterProps
  extends Omit<HTMLStyledProps<"footer">, "size">, DrawerVariants {}

const Footer: FC<DrawerFooterProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <footer
      ref={ref}
      {...restProps}
      className={cx(drawer({ side, size }).footer, css(cssProps), props.className)}
    />
  );
};

export interface DrawerCloseTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof BottomSheetPrimitive.CloseTriggerBaseProps>,
    BottomSheetPrimitive.CloseTriggerBaseProps,
    DrawerVariants {}

const CloseTrigger: FC<DrawerCloseTriggerProps> = ({ side, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <BottomSheetPrimitive.CloseTrigger
      ref={ref}
      data-slot="drawer-close-trigger"
      {...restProps}
      className={cx(drawer({ side, size }).closeTrigger, css(cssProps), props.className)}
    />
  );
};

export const Drawer = Object.assign(Root, {
  Root,
  Trigger,
  Backdrop,
  Content,
  Handle,
  Header,
  Title,
  Description,
  Body,
  Footer,
  CloseTrigger,
});

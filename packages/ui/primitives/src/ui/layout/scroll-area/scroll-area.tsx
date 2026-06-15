import { ScrollArea as ScrollAreaPrimitive } from "@ark-ui/react/scroll-area";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { scrollArea } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type ScrollAreaVariants = { size?: "thin" | "md" | "thick" };

export interface ScrollAreaRootProps
  extends
    PropsWithChildren,
    Omit<HTMLStyledProps<"div">, keyof ScrollAreaPrimitive.RootBaseProps>,
    Omit<ScrollAreaPrimitive.RootBaseProps, "size">,
    ScrollAreaVariants {}

const Root: FC<ScrollAreaRootProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      data-slot="scroll-area-root"
      {...restProps}
      className={cx(scrollArea({ size }).root, css(cssProps), props.className)}
    />
  );
};

export interface ScrollAreaViewportProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ScrollAreaPrimitive.ViewportBaseProps>,
    ScrollAreaPrimitive.ViewportBaseProps,
    ScrollAreaVariants {}

const Viewport: FC<ScrollAreaViewportProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ScrollAreaPrimitive.Viewport
      ref={ref}
      data-slot="scroll-area-viewport"
      {...restProps}
      className={cx(scrollArea({ size }).viewport, css(cssProps), props.className)}
    />
  );
};

export interface ScrollAreaScrollbarProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ScrollAreaPrimitive.ScrollbarBaseProps>,
    ScrollAreaPrimitive.ScrollbarBaseProps,
    ScrollAreaVariants {}

const Scrollbar: FC<ScrollAreaScrollbarProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ScrollAreaPrimitive.Scrollbar
      ref={ref}
      data-slot="scroll-area-scrollbar"
      {...restProps}
      className={cx(scrollArea({ size }).scrollbar, css(cssProps), props.className)}
    />
  );
};

export interface ScrollAreaThumbProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ScrollAreaPrimitive.ThumbBaseProps>,
    ScrollAreaPrimitive.ThumbBaseProps,
    ScrollAreaVariants {}

const Thumb: FC<ScrollAreaThumbProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ScrollAreaPrimitive.Thumb
      ref={ref}
      data-slot="scroll-area-thumb"
      {...restProps}
      className={cx(scrollArea({ size }).thumb, css(cssProps), props.className)}
    />
  );
};

export interface ScrollAreaCornerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ScrollAreaPrimitive.CornerBaseProps>,
    ScrollAreaPrimitive.CornerBaseProps,
    ScrollAreaVariants {}

const Corner: FC<ScrollAreaCornerProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ScrollAreaPrimitive.Corner
      ref={ref}
      data-slot="scroll-area-corner"
      {...restProps}
      className={cx(scrollArea({ size }).corner, css(cssProps), props.className)}
    />
  );
};

export const ScrollArea = Object.assign(Root, {
  Root,
  Viewport,
  Scrollbar,
  Thumb,
  Corner,
});

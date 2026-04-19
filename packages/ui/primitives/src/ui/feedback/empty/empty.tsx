import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { empty } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type EmptyVariants = {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "icon" | "muted" | "dashed";
};

export interface EmptyRootProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    EmptyVariants {}

const Root: FC<EmptyRootProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="empty-root"
      {...restProps}
      className={cx(empty({ size, variant }).root, css(cssProps), props.className)}
    />
  );
};

export interface EmptyIconProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    EmptyVariants {}

const Icon: FC<EmptyIconProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="empty-icon"
      aria-hidden
      {...restProps}
      className={cx(empty({ size, variant }).icon, css(cssProps), props.className)}
    />
  );
};

export interface EmptyTitleProps
  extends Omit<HTMLStyledProps<"h3">, keyof ComponentProps<"h3">>,
    Omit<ComponentProps<"h3">, "size">,
    EmptyVariants {}

const Title: FC<EmptyTitleProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.h3
      ref={ref}
      data-slot="empty-title"
      {...restProps}
      className={cx(empty({ size, variant }).title, css(cssProps), props.className)}
    />
  );
};

export interface EmptyDescriptionProps
  extends Omit<HTMLStyledProps<"p">, keyof ComponentProps<"p">>,
    Omit<ComponentProps<"p">, "size">,
    EmptyVariants {}

const Description: FC<EmptyDescriptionProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.p
      ref={ref}
      data-slot="empty-description"
      {...restProps}
      className={cx(empty({ size, variant }).description, css(cssProps), props.className)}
    />
  );
};

export interface EmptyActionsProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    EmptyVariants {}

const Actions: FC<EmptyActionsProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="empty-actions"
      {...restProps}
      className={cx(empty({ size, variant }).actions, css(cssProps), props.className)}
    />
  );
};

export interface EmptyHeaderProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    EmptyVariants {}

const Header: FC<EmptyHeaderProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="empty-header"
      {...restProps}
      className={cx(empty({ size, variant }).header, css(cssProps), props.className)}
    />
  );
};

export interface EmptyContentProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    EmptyVariants {}

const Content: FC<EmptyContentProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="empty-content"
      {...restProps}
      className={cx(empty({ size, variant }).content, css(cssProps), props.className)}
    />
  );
};

export const Empty = Object.assign(Root, {
  Root,
  Header,
  Icon,
  Title,
  Description,
  Content,
  Actions,
});

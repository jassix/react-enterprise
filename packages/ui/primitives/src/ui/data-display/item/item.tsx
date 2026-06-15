import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { item } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type ItemVariants = {
  size?: "xs" | "sm" | "md" | "lg";
  variant?: "default" | "muted" | "outline";
  interactive?: boolean;
};

export interface ItemRootProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    ItemVariants {}

const Root: FC<ItemRootProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="item-root"
      {...restProps}
      className={cx(item({ size, variant, interactive }).root, css(cssProps), props.className)}
    />
  );
};

export interface ItemMediaProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    ItemVariants {}

const Media: FC<ItemMediaProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="item-media"
      aria-hidden
      {...restProps}
      className={cx(item({ size, variant, interactive }).media, css(cssProps), props.className)}
    />
  );
};

export interface ItemContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    ItemVariants {}

const Content: FC<ItemContentProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="item-content"
      {...restProps}
      className={cx(item({ size, variant, interactive }).content, css(cssProps), props.className)}
    />
  );
};

export interface ItemTitleProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    ItemVariants {}

const Title: FC<ItemTitleProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="item-title"
      {...restProps}
      className={cx(item({ size, variant, interactive }).title, css(cssProps), props.className)}
    />
  );
};

export interface ItemDescriptionProps
  extends
    Omit<HTMLStyledProps<"p">, keyof ComponentProps<"p">>,
    Omit<ComponentProps<"p">, "size">,
    ItemVariants {}

const Description: FC<ItemDescriptionProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.p
      ref={ref}
      data-slot="item-description"
      {...restProps}
      className={cx(
        item({ size, variant, interactive }).description,
        css(cssProps),
        props.className,
      )}
    />
  );
};

export interface ItemActionsProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    ItemVariants {}

const Actions: FC<ItemActionsProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="item-actions"
      {...restProps}
      className={cx(item({ size, variant, interactive }).actions, css(cssProps), props.className)}
    />
  );
};

export interface ItemSeparatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    ItemVariants {}

const Separator: FC<ItemSeparatorProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="item-separator"
      role="separator"
      {...restProps}
      className={cx(item({ size, variant, interactive }).separator, css(cssProps), props.className)}
    />
  );
};

export interface ItemGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    ItemVariants {}

const Group: FC<ItemGroupProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      role="list"
      data-slot="item-group"
      {...restProps}
      className={cx(item({ size, variant, interactive }).group, css(cssProps), props.className)}
    />
  );
};

export interface ItemHeaderProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    ItemVariants {}

const Header: FC<ItemHeaderProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="item-header"
      {...restProps}
      className={cx(item({ size, variant, interactive }).header, css(cssProps), props.className)}
    />
  );
};

export interface ItemFooterProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    ItemVariants {}

const Footer: FC<ItemFooterProps> = ({ size, variant, interactive, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="item-footer"
      {...restProps}
      className={cx(item({ size, variant, interactive }).footer, css(cssProps), props.className)}
    />
  );
};

export const Item = Object.assign(Root, {
  Root,
  Group,
  Header,
  Footer,
  Media,
  Content,
  Title,
  Description,
  Actions,
  Separator,
});

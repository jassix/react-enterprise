import { Pagination as PaginationPrimitive } from "@ark-ui/react/pagination";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { pagination } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

type PaginationVariants = { size?: "sm" | "md" | "lg" };

export interface PaginationRootProps
  extends
    Omit<HTMLStyledProps<"nav">, keyof PaginationPrimitive.RootProps>,
    Omit<PaginationPrimitive.RootProps, "size">,
    PaginationVariants {}

const Root: FC<PaginationRootProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PaginationPrimitive.Root
      ref={ref}
      data-slot="pagination-root"
      {...restProps}
      className={cx(pagination({ size }).root, css(cssProps), props.className)}
    />
  );
};

export interface PaginationItemProps
  extends
    Omit<HTMLStyledProps<"button">, keyof PaginationPrimitive.ItemBaseProps>,
    PaginationPrimitive.ItemBaseProps,
    PaginationVariants {}

const Item: FC<PaginationItemProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PaginationPrimitive.Item
      ref={ref}
      data-slot="pagination-item"
      {...restProps}
      className={cx(pagination({ size }).item, css(cssProps), props.className)}
    />
  );
};

export interface PaginationPrevTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof PaginationPrimitive.PrevTriggerBaseProps>,
    PaginationPrimitive.PrevTriggerBaseProps,
    PaginationVariants {}

const PrevTrigger: FC<PaginationPrevTriggerProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PaginationPrimitive.PrevTrigger
      ref={ref}
      data-slot="pagination-prev-trigger"
      {...restProps}
      className={cx(pagination({ size }).prevTrigger, css(cssProps), props.className)}
    />
  );
};

export interface PaginationNextTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof PaginationPrimitive.NextTriggerBaseProps>,
    PaginationPrimitive.NextTriggerBaseProps,
    PaginationVariants {}

const NextTrigger: FC<PaginationNextTriggerProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PaginationPrimitive.NextTrigger
      ref={ref}
      data-slot="pagination-next-trigger"
      {...restProps}
      className={cx(pagination({ size }).nextTrigger, css(cssProps), props.className)}
    />
  );
};

export interface PaginationEllipsisProps
  extends
    Omit<HTMLStyledProps<"div">, keyof PaginationPrimitive.EllipsisBaseProps>,
    PaginationPrimitive.EllipsisBaseProps,
    PaginationVariants {}

const Ellipsis: FC<PaginationEllipsisProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PaginationPrimitive.Ellipsis
      ref={ref}
      data-slot="pagination-ellipsis"
      {...restProps}
      className={cx(pagination({ size }).ellipsis, css(cssProps), props.className)}
    />
  );
};

export const Pagination = Object.assign(Root, {
  Root,
  Item,
  PrevTrigger,
  NextTrigger,
  Ellipsis,
});

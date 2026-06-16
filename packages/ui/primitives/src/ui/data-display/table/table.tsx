import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { table } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type TableVariants = {
  density?: "compact" | "comfortable" | "spacious";
  striped?: boolean;
  bordered?: boolean;
};

export interface TableProps
  extends
    Omit<HTMLStyledProps<"table">, keyof ComponentProps<"table">>,
    ComponentProps<"table">,
    TableVariants {
  /** Pass-throughs for the outer scroll container. */
  containerProps?: ComponentProps<"div">;
}

/**
 * The root `<Table>` renders both the horizontal-scroll container (`root`
 * slot, a `<div>`) AND the `<table>` — matches luma's API exactly so
 * `<Table><Table.Header>…</Table.Header></Table>` drops children into the
 * table, not into the wrapper.
 */
const Root: FC<TableProps> = ({
  density,
  striped,
  bordered,
  containerProps,
  ref,
  children,
  ...props
}) => {
  const [cssProps, restProps] = splitCssProps(props);
  const styles = table({ density, striped, bordered });

  return (
    <div
      {...containerProps}
      data-slot="table-container"
      className={cx(styles.root, containerProps?.className)}
    >
      <ark.table
        ref={ref}
        data-slot="table"
        {...restProps}
        className={cx(styles.table, css(cssProps), props.className)}
      >
        {children}
      </ark.table>
    </div>
  );
};

Root.displayName = "Table";

export interface TableCaptionProps
  extends
    Omit<HTMLStyledProps<"caption">, keyof ComponentProps<"caption">>,
    ComponentProps<"caption">,
    TableVariants {}

const Caption: FC<TableCaptionProps> = ({ density, striped, bordered, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.caption
      ref={ref}
      data-slot="table-caption"
      {...restProps}
      className={cx(table({ density, striped, bordered }).caption, css(cssProps), props.className)}
    />
  );
};

Caption.displayName = "TableCaption";

export interface TableHeaderProps
  extends
    Omit<HTMLStyledProps<"thead">, keyof ComponentProps<"thead">>,
    ComponentProps<"thead">,
    TableVariants {}

const Header: FC<TableHeaderProps> = ({ density, striped, bordered, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.thead
      ref={ref}
      data-slot="table-header"
      {...restProps}
      className={cx(table({ density, striped, bordered }).head, css(cssProps), props.className)}
    />
  );
};

Header.displayName = "TableHeader";

export interface TableBodyProps
  extends
    Omit<HTMLStyledProps<"tbody">, keyof ComponentProps<"tbody">>,
    ComponentProps<"tbody">,
    TableVariants {}

const Body: FC<TableBodyProps> = ({ density, striped, bordered, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.tbody
      ref={ref}
      data-slot="table-body"
      {...restProps}
      className={cx(table({ density, striped, bordered }).body, css(cssProps), props.className)}
    />
  );
};

Body.displayName = "TableBody";

export interface TableFooterProps
  extends
    Omit<HTMLStyledProps<"tfoot">, keyof ComponentProps<"tfoot">>,
    ComponentProps<"tfoot">,
    TableVariants {}

const Footer: FC<TableFooterProps> = ({ density, striped, bordered, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.tfoot
      ref={ref}
      data-slot="table-footer"
      {...restProps}
      className={cx(table({ density, striped, bordered }).footer, css(cssProps), props.className)}
    />
  );
};

Footer.displayName = "TableFooter";

export interface TableRowProps
  extends
    Omit<HTMLStyledProps<"tr">, keyof ComponentProps<"tr">>,
    ComponentProps<"tr">,
    TableVariants {}

const Row: FC<TableRowProps> = ({ density, striped, bordered, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.tr
      ref={ref}
      data-slot="table-row"
      {...restProps}
      className={cx(table({ density, striped, bordered }).row, css(cssProps), props.className)}
    />
  );
};

Row.displayName = "TableRow";

export interface TableHeadProps
  extends
    Omit<HTMLStyledProps<"th">, keyof ComponentProps<"th">>,
    ComponentProps<"th">,
    TableVariants {}

const Head: FC<TableHeadProps> = ({ density, striped, bordered, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.th
      ref={ref}
      data-slot="table-head"
      {...restProps}
      className={cx(table({ density, striped, bordered }).header, css(cssProps), props.className)}
    />
  );
};

Head.displayName = "TableHead";

export interface TableCellProps
  extends
    Omit<HTMLStyledProps<"td">, keyof ComponentProps<"td">>,
    ComponentProps<"td">,
    TableVariants {}

const Cell: FC<TableCellProps> = ({ density, striped, bordered, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.td
      ref={ref}
      data-slot="table-cell"
      {...restProps}
      className={cx(table({ density, striped, bordered }).cell, css(cssProps), props.className)}
    />
  );
};

Cell.displayName = "TableCell";

export const Table = Object.assign(Root, {
  Root,
  Header,
  Body,
  Footer,
  Row,
  Head,
  Cell,
  Caption,
});

import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { dataTable } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type DataTableVariants = {
  density?: "compact" | "comfortable" | "spacious";
  striped?: boolean;
};

export interface DataTableRootProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    DataTableVariants {}

const Root: FC<DataTableRootProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).root, css(cssProps), props.className)}
    />
  );
};

export interface DataTableToolbarProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    DataTableVariants {}

const Toolbar: FC<DataTableToolbarProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).toolbar, css(cssProps), props.className)}
    />
  );
};

const ToolbarStart: FC<DataTableToolbarProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).toolbarStart, css(cssProps), props.className)}
    />
  );
};

const ToolbarEnd: FC<DataTableToolbarProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).toolbarEnd, css(cssProps), props.className)}
    />
  );
};

export interface DataTableTableWrapperProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    DataTableVariants {}

const TableWrapper: FC<DataTableTableWrapperProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).tableWrapper, css(cssProps), props.className)}
    />
  );
};

export interface DataTableTableProps
  extends
    Omit<HTMLStyledProps<"table">, keyof ComponentProps<"table">>,
    ComponentProps<"table">,
    DataTableVariants {}

const Table: FC<DataTableTableProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.table
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).table, css(cssProps), props.className)}
    />
  );
};

export interface DataTableSectionProps
  extends
    Omit<HTMLStyledProps<"thead">, keyof ComponentProps<"thead">>,
    ComponentProps<"thead">,
    DataTableVariants {}

const Head: FC<DataTableSectionProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.thead
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).head, css(cssProps), props.className)}
    />
  );
};

export interface DataTableRowProps
  extends
    Omit<HTMLStyledProps<"tr">, keyof ComponentProps<"tr">>,
    ComponentProps<"tr">,
    DataTableVariants {}

const HeaderRow: FC<DataTableRowProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.tr
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).headerRow, css(cssProps), props.className)}
    />
  );
};

export interface DataTableHeaderProps
  extends
    Omit<HTMLStyledProps<"th">, keyof ComponentProps<"th">>,
    ComponentProps<"th">,
    DataTableVariants {}

const Header: FC<DataTableHeaderProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.th
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).header, css(cssProps), props.className)}
    />
  );
};

export interface DataTableHeaderSortProps
  extends
    Omit<HTMLStyledProps<"button">, keyof ComponentProps<"button">>,
    ComponentProps<"button">,
    DataTableVariants {}

const HeaderSort: FC<DataTableHeaderSortProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.button
      ref={ref}
      type="button"
      {...restProps}
      className={cx(dataTable({ density, striped }).headerSort, css(cssProps), props.className)}
    />
  );
};

export interface DataTableBodyProps
  extends
    Omit<HTMLStyledProps<"tbody">, keyof ComponentProps<"tbody">>,
    ComponentProps<"tbody">,
    DataTableVariants {}

const Body: FC<DataTableBodyProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.tbody
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).body, css(cssProps), props.className)}
    />
  );
};

const Row: FC<DataTableRowProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.tr
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).row, css(cssProps), props.className)}
    />
  );
};

export interface DataTableCellProps
  extends
    Omit<HTMLStyledProps<"td">, keyof ComponentProps<"td">>,
    ComponentProps<"td">,
    DataTableVariants {}

const Cell: FC<DataTableCellProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.td
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).cell, css(cssProps), props.className)}
    />
  );
};

export interface DataTableFooterProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    DataTableVariants {}

const Footer: FC<DataTableFooterProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).footer, css(cssProps), props.className)}
    />
  );
};

export interface DataTablePaginationProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    DataTableVariants {}

const Pagination: FC<DataTablePaginationProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).pagination, css(cssProps), props.className)}
    />
  );
};

export interface DataTableEmptyProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    ComponentProps<"div">,
    DataTableVariants {}

const Empty: FC<DataTableEmptyProps> = ({ density, striped, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(dataTable({ density, striped }).empty, css(cssProps), props.className)}
    />
  );
};

export const DataTable = Object.assign(Root, {
  Root,
  Toolbar,
  ToolbarStart,
  ToolbarEnd,
  TableWrapper,
  Table,
  Head,
  HeaderRow,
  Header,
  HeaderSort,
  Body,
  Row,
  Cell,
  Footer,
  Pagination,
  Empty,
});

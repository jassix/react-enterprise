import { DatePicker as DatePickerPrimitive } from "@ark-ui/react/date-picker";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { calendar } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type CalendarVariants = {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "bordered";
};

export interface CalendarRootProps
  extends
    PropsWithChildren,
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.RootBaseProps>,
    DatePickerPrimitive.RootBaseProps,
    CalendarVariants {}

const Root: FC<CalendarRootProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Root
      ref={ref}
      inline
      data-slot="calendar-root"
      {...restProps}
      className={cx(calendar({ size, variant }).root, css(cssProps), props.className)}
    />
  );
};

export interface CalendarHeaderProps extends HTMLStyledProps<"header">, CalendarVariants {}

const Header: FC<CalendarHeaderProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <header
      ref={ref}
      {...restProps}
      className={cx(calendar({ size, variant }).header, css(cssProps), props.className)}
    />
  );
};

export interface CalendarHeadingProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.RangeTextBaseProps>,
    DatePickerPrimitive.RangeTextBaseProps,
    CalendarVariants {}

const Heading: FC<CalendarHeadingProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.RangeText
      ref={ref}
      data-slot="calendar-range-text"
      {...restProps}
      className={cx(calendar({ size, variant }).heading, css(cssProps), props.className)}
    />
  );
};

export interface CalendarPrevTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DatePickerPrimitive.PrevTriggerBaseProps>,
    DatePickerPrimitive.PrevTriggerBaseProps,
    CalendarVariants {}

const PrevTrigger: FC<CalendarPrevTriggerProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.PrevTrigger
      ref={ref}
      data-slot="calendar-prev-trigger"
      {...restProps}
      className={cx(calendar({ size, variant }).prevTrigger, css(cssProps), props.className)}
    />
  );
};

export interface CalendarNextTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DatePickerPrimitive.NextTriggerBaseProps>,
    DatePickerPrimitive.NextTriggerBaseProps,
    CalendarVariants {}

const NextTrigger: FC<CalendarNextTriggerProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.NextTrigger
      ref={ref}
      data-slot="calendar-next-trigger"
      {...restProps}
      className={cx(calendar({ size, variant }).nextTrigger, css(cssProps), props.className)}
    />
  );
};

export interface CalendarViewTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DatePickerPrimitive.ViewTriggerBaseProps>,
    DatePickerPrimitive.ViewTriggerBaseProps,
    CalendarVariants {}

const ViewTrigger: FC<CalendarViewTriggerProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.ViewTrigger
      ref={ref}
      data-slot="calendar-view-trigger"
      {...restProps}
      className={cx(calendar({ size, variant }).viewTrigger, css(cssProps), props.className)}
    />
  );
};

export interface CalendarGridProps
  extends
    Omit<HTMLStyledProps<"table">, keyof DatePickerPrimitive.TableBaseProps>,
    DatePickerPrimitive.TableBaseProps,
    CalendarVariants {}

const Grid: FC<CalendarGridProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Table
      ref={ref}
      data-slot="calendar-table"
      {...restProps}
      className={cx(calendar({ size, variant }).grid, css(cssProps), props.className)}
    />
  );
};

export interface CalendarRowHeaderProps
  extends
    Omit<HTMLStyledProps<"th">, keyof DatePickerPrimitive.TableHeaderBaseProps>,
    DatePickerPrimitive.TableHeaderBaseProps,
    CalendarVariants {}

const RowHeader: FC<CalendarRowHeaderProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableHeader
      ref={ref}
      data-slot="calendar-table-header"
      {...restProps}
      className={cx(calendar({ size, variant }).rowHeader, css(cssProps), props.className)}
    />
  );
};

export interface CalendarRowProps
  extends
    Omit<HTMLStyledProps<"tr">, keyof DatePickerPrimitive.TableRowBaseProps>,
    DatePickerPrimitive.TableRowBaseProps,
    CalendarVariants {}

const Row: FC<CalendarRowProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableRow
      ref={ref}
      data-slot="calendar-table-row"
      {...restProps}
      className={cx(calendar({ size, variant }).row, css(cssProps), props.className)}
    />
  );
};

export interface CalendarCellProps
  extends
    Omit<HTMLStyledProps<"td">, keyof DatePickerPrimitive.TableCellBaseProps>,
    DatePickerPrimitive.TableCellBaseProps,
    CalendarVariants {}

const Cell: FC<CalendarCellProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableCell
      ref={ref}
      data-slot="calendar-table-cell"
      {...restProps}
      className={cx(calendar({ size, variant }).cell, css(cssProps), props.className)}
    />
  );
};

export interface CalendarCellTriggerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.TableCellTriggerBaseProps>,
    DatePickerPrimitive.TableCellTriggerBaseProps,
    CalendarVariants {}

const CellTrigger: FC<CalendarCellTriggerProps> = ({ size, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableCellTrigger
      ref={ref}
      data-slot="calendar-table-cell-trigger"
      {...restProps}
      className={cx(calendar({ size, variant }).cellTrigger, css(cssProps), props.className)}
    />
  );
};

export const Calendar = Object.assign(Root, {
  Root,
  Header,
  Heading,
  PrevTrigger,
  NextTrigger,
  ViewTrigger,
  Grid,
  RowHeader,
  Row,
  Cell,
  CellTrigger,
  View: DatePickerPrimitive.View,
  TableHead: DatePickerPrimitive.TableHead,
  TableBody: DatePickerPrimitive.TableBody,
});

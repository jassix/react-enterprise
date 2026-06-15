import { DatePicker as DatePickerPrimitive } from "@ark-ui/react/date-picker";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { datePicker } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type DatePickerVariants = { size?: "sm" | "md" | "lg" };

export interface DatePickerRootProps
  extends
    PropsWithChildren,
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.RootBaseProps>,
    DatePickerPrimitive.RootBaseProps {}

const Root: FC<DatePickerRootProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Root
      data-slot="date-picker-root"
      {...restProps}
      className={cx(datePicker().root, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerLabelProps
  extends
    Omit<HTMLStyledProps<"label">, keyof DatePickerPrimitive.LabelBaseProps>,
    DatePickerPrimitive.LabelBaseProps {}

const Label: FC<DatePickerLabelProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Label
      data-slot="date-picker-label"
      {...restProps}
      className={cx(datePicker().label, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerControlProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.ControlBaseProps>,
    DatePickerPrimitive.ControlBaseProps,
    DatePickerVariants {}

const Control: FC<DatePickerControlProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Control
      ref={ref}
      data-slot="date-picker-control"
      {...restProps}
      className={cx(datePicker({ size }).control, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerInputProps
  extends
    Omit<HTMLStyledProps<"input">, keyof DatePickerPrimitive.InputBaseProps | "size">,
    DatePickerPrimitive.InputBaseProps,
    DatePickerVariants {}

const Input: FC<DatePickerInputProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Input
      ref={ref}
      data-slot="date-picker-input"
      {...restProps}
      className={cx(datePicker({ size }).input, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DatePickerPrimitive.TriggerBaseProps>,
    DatePickerPrimitive.TriggerBaseProps {}

const Trigger: FC<DatePickerTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Trigger
      data-slot="date-picker-trigger"
      {...restProps}
      className={cx(datePicker().trigger, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerClearTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DatePickerPrimitive.ClearTriggerBaseProps>,
    DatePickerPrimitive.ClearTriggerBaseProps {}

const ClearTrigger: FC<DatePickerClearTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.ClearTrigger
      data-slot="date-picker-clear-trigger"
      {...restProps}
      className={cx(datePicker().clearTrigger, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerPositionerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.PositionerBaseProps>,
    DatePickerPrimitive.PositionerBaseProps {}

const Positioner: FC<DatePickerPositionerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Positioner
      data-slot="date-picker-positioner"
      {...restProps}
      className={cx(datePicker().positioner, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerContentProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.ContentBaseProps>,
    DatePickerPrimitive.ContentBaseProps {}

const Content: FC<DatePickerContentProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Content
      data-slot="date-picker-content"
      {...restProps}
      className={cx(datePicker().content, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerPresetTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DatePickerPrimitive.PresetTriggerBaseProps>,
    DatePickerPrimitive.PresetTriggerBaseProps {}

const PresetTrigger: FC<DatePickerPresetTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.PresetTrigger
      data-slot="date-picker-preset-trigger"
      {...restProps}
      className={cx(datePicker().presetTrigger, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerViewProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.ViewBaseProps>,
    DatePickerPrimitive.ViewBaseProps {}

const View: FC<DatePickerViewProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.View
      data-slot="date-picker-view"
      {...restProps}
      className={cx(datePicker().view, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerViewControlProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.ViewControlBaseProps>,
    DatePickerPrimitive.ViewControlBaseProps {}

const ViewControl: FC<DatePickerViewControlProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.ViewControl
      data-slot="date-picker-view-control"
      {...restProps}
      className={cx(datePicker().viewControl, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerViewTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DatePickerPrimitive.ViewTriggerBaseProps>,
    DatePickerPrimitive.ViewTriggerBaseProps {}

const ViewTrigger: FC<DatePickerViewTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.ViewTrigger
      data-slot="date-picker-view-trigger"
      {...restProps}
      className={cx(datePicker().viewTrigger, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerPrevTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DatePickerPrimitive.PrevTriggerBaseProps>,
    DatePickerPrimitive.PrevTriggerBaseProps {}

const PrevTrigger: FC<DatePickerPrevTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.PrevTrigger
      data-slot="date-picker-prev-trigger"
      {...restProps}
      className={cx(datePicker().prevTrigger, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerNextTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof DatePickerPrimitive.NextTriggerBaseProps>,
    DatePickerPrimitive.NextTriggerBaseProps {}

const NextTrigger: FC<DatePickerNextTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.NextTrigger
      data-slot="date-picker-next-trigger"
      {...restProps}
      className={cx(datePicker().nextTrigger, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerRangeTextProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.RangeTextBaseProps>,
    DatePickerPrimitive.RangeTextBaseProps {}

const RangeText: FC<DatePickerRangeTextProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.RangeText
      data-slot="date-picker-range-text"
      {...restProps}
      className={cx(datePicker().rangeText, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerTableProps
  extends
    Omit<HTMLStyledProps<"table">, keyof DatePickerPrimitive.TableBaseProps>,
    DatePickerPrimitive.TableBaseProps {}

const Table: FC<DatePickerTableProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.Table
      data-slot="date-picker-table"
      {...restProps}
      className={cx(datePicker().table, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerTableHeadProps
  extends
    Omit<HTMLStyledProps<"thead">, keyof DatePickerPrimitive.TableHeadBaseProps>,
    DatePickerPrimitive.TableHeadBaseProps {}

const TableHead: FC<DatePickerTableHeadProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableHead
      data-slot="date-picker-table-head"
      {...restProps}
      className={cx(datePicker().tableHead, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerTableHeaderProps
  extends
    Omit<HTMLStyledProps<"th">, keyof DatePickerPrimitive.TableHeaderBaseProps>,
    DatePickerPrimitive.TableHeaderBaseProps {}

const TableHeader: FC<DatePickerTableHeaderProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableHeader
      data-slot="date-picker-table-header"
      {...restProps}
      className={cx(datePicker().tableHeader, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerTableBodyProps
  extends
    Omit<HTMLStyledProps<"tbody">, keyof DatePickerPrimitive.TableBodyBaseProps>,
    DatePickerPrimitive.TableBodyBaseProps {}

const TableBody: FC<DatePickerTableBodyProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableBody
      data-slot="date-picker-table-body"
      {...restProps}
      className={cx(datePicker().tableBody, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerTableRowProps
  extends
    Omit<HTMLStyledProps<"tr">, keyof DatePickerPrimitive.TableRowBaseProps>,
    DatePickerPrimitive.TableRowBaseProps {}

const TableRow: FC<DatePickerTableRowProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableRow
      data-slot="date-picker-table-row"
      {...restProps}
      className={cx(datePicker().tableRow, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerTableCellProps
  extends
    Omit<HTMLStyledProps<"td">, keyof DatePickerPrimitive.TableCellBaseProps>,
    DatePickerPrimitive.TableCellBaseProps {}

const TableCell: FC<DatePickerTableCellProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableCell
      data-slot="date-picker-table-cell"
      {...restProps}
      className={cx(datePicker().tableCell, css(cssProps), props.className)}
    />
  );
};

export interface DatePickerTableCellTriggerProps
  extends
    Omit<HTMLStyledProps<"div">, keyof DatePickerPrimitive.TableCellTriggerBaseProps>,
    DatePickerPrimitive.TableCellTriggerBaseProps {}

const TableCellTrigger: FC<DatePickerTableCellTriggerProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <DatePickerPrimitive.TableCellTrigger
      data-slot="date-picker-table-cell-trigger"
      {...restProps}
      className={cx(datePicker().tableCellTrigger, css(cssProps), props.className)}
    />
  );
};

export const DatePicker = Object.assign(Root, {
  Root,
  Label,
  Control,
  Input,
  Trigger,
  ClearTrigger,
  Positioner,
  Content,
  PresetTrigger,
  View,
  ViewControl,
  ViewTrigger,
  PrevTrigger,
  NextTrigger,
  RangeText,
  Table,
  TableHead,
  TableHeader,
  TableBody,
  TableRow,
  TableCell,
  TableCellTrigger,
});

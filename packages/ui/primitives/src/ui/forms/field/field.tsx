import { Field as FieldPrimitive } from "@ark-ui/react/field";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { field } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type FieldVariants = {
  orientation?: "vertical" | "horizontal";
  size?: "sm" | "md" | "lg";
};

export interface FieldRootProps
  extends
    PropsWithChildren,
    Omit<HTMLStyledProps<"div">, keyof FieldPrimitive.RootBaseProps>,
    Omit<FieldPrimitive.RootBaseProps, "orientation">,
    FieldVariants {}

const Root: FC<FieldRootProps> = ({ orientation, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <FieldPrimitive.Root
      ref={ref}
      data-orientation={orientation}
      data-slot="field-root"
      {...restProps}
      className={cx(field({ orientation, size }).root, css(cssProps), props.className)}
    />
  );
};

export interface FieldLabelProps
  extends
    Omit<HTMLStyledProps<"label">, keyof FieldPrimitive.LabelBaseProps>,
    FieldPrimitive.LabelBaseProps,
    FieldVariants {}

const Label: FC<FieldLabelProps> = ({ orientation, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <FieldPrimitive.Label
      ref={ref}
      data-slot="field-label"
      {...restProps}
      className={cx(field({ orientation, size }).label, css(cssProps), props.className)}
    />
  );
};

export interface FieldRequiredIndicatorProps
  extends
    Omit<HTMLStyledProps<"span">, keyof FieldPrimitive.RequiredIndicatorBaseProps>,
    FieldPrimitive.RequiredIndicatorBaseProps,
    FieldVariants {}

const RequiredIndicator: FC<FieldRequiredIndicatorProps> = ({
  orientation,
  size,
  ref,
  ...props
}) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <FieldPrimitive.RequiredIndicator
      ref={ref}
      data-slot="field-required-indicator"
      {...restProps}
      className={cx(field({ orientation, size }).requiredIndicator, css(cssProps), props.className)}
    />
  );
};

export interface FieldHelperTextProps
  extends
    Omit<HTMLStyledProps<"p">, keyof FieldPrimitive.HelperTextBaseProps>,
    FieldPrimitive.HelperTextBaseProps,
    FieldVariants {}

const HelperText: FC<FieldHelperTextProps> = ({ orientation, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <FieldPrimitive.HelperText
      ref={ref}
      data-slot="field-helper-text"
      {...restProps}
      className={cx(field({ orientation, size }).helperText, css(cssProps), props.className)}
    />
  );
};

export interface FieldErrorTextProps
  extends
    Omit<HTMLStyledProps<"p">, keyof FieldPrimitive.ErrorTextBaseProps>,
    FieldPrimitive.ErrorTextBaseProps,
    FieldVariants {}

const ErrorText: FC<FieldErrorTextProps> = ({ orientation, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <FieldPrimitive.ErrorText
      ref={ref}
      data-slot="field-error-text"
      {...restProps}
      className={cx(field({ orientation, size }).errorText, css(cssProps), props.className)}
    />
  );
};

export interface FieldInputProps
  extends
    Omit<HTMLStyledProps<"input">, keyof FieldPrimitive.InputBaseProps>,
    FieldPrimitive.InputBaseProps {}

const Input: FC<FieldInputProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return <FieldPrimitive.Input {...restProps} className={cx(css(cssProps), props.className)} />;
};

export interface FieldTextareaProps
  extends
    Omit<HTMLStyledProps<"textarea">, keyof FieldPrimitive.TextareaBaseProps>,
    FieldPrimitive.TextareaBaseProps {}

const Textarea: FC<FieldTextareaProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return <FieldPrimitive.Textarea {...restProps} className={cx(css(cssProps), props.className)} />;
};

export interface FieldSelectProps
  extends
    Omit<HTMLStyledProps<"select">, keyof FieldPrimitive.SelectBaseProps>,
    FieldPrimitive.SelectBaseProps {}

const Select: FC<FieldSelectProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return <FieldPrimitive.Select {...restProps} className={cx(css(cssProps), props.className)} />;
};

export const Field = Object.assign(Root, {
  Root,
  Label,
  RequiredIndicator,
  HelperText,
  ErrorText,
  Input,
  Textarea,
  Select,
});

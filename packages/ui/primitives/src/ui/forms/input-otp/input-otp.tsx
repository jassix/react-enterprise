import { PinInput as PinInputPrimitive } from "@ark-ui/react/pin-input";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { inputOtp } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type InputOtpVariants = {
  size?: "sm" | "md" | "lg" | "xl";
};

export interface InputOtpRootProps
  extends
    PropsWithChildren,
    Omit<HTMLStyledProps<"div">, keyof PinInputPrimitive.RootBaseProps>,
    Omit<PinInputPrimitive.RootBaseProps, "size">,
    InputOtpVariants {}

const Root: FC<InputOtpRootProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PinInputPrimitive.Root
      ref={ref}
      data-slot="input-otp-root"
      {...restProps}
      className={cx(inputOtp({ size }).root, css(cssProps), props.className)}
    />
  );
};

export interface InputOtpControlProps
  extends
    Omit<HTMLStyledProps<"div">, keyof PinInputPrimitive.ControlBaseProps>,
    PinInputPrimitive.ControlBaseProps,
    InputOtpVariants {}

const Control: FC<InputOtpControlProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PinInputPrimitive.Control
      ref={ref}
      data-slot="input-otp-control"
      {...restProps}
      className={cx(inputOtp({ size }).control, css(cssProps), props.className)}
    />
  );
};

export interface InputOtpInputProps
  extends
    Omit<HTMLStyledProps<"input">, keyof PinInputPrimitive.InputBaseProps | "size">,
    PinInputPrimitive.InputBaseProps,
    InputOtpVariants {}

const Input: FC<InputOtpInputProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PinInputPrimitive.Input
      ref={ref}
      data-slot="input-otp-input"
      {...restProps}
      className={cx(inputOtp({ size }).slot, css(cssProps), props.className)}
    />
  );
};

export interface InputOtpHiddenInputProps
  extends
    Omit<HTMLStyledProps<"input">, keyof PinInputPrimitive.HiddenInputBaseProps>,
    PinInputPrimitive.HiddenInputBaseProps {}

const HiddenInput: FC<InputOtpHiddenInputProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <PinInputPrimitive.HiddenInput {...restProps} className={cx(css(cssProps), props.className)} />
  );
};

export interface InputOtpLabelProps
  extends
    Omit<HTMLStyledProps<"label">, keyof PinInputPrimitive.LabelBaseProps>,
    PinInputPrimitive.LabelBaseProps {}

const Label: FC<InputOtpLabelProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return <PinInputPrimitive.Label {...restProps} className={cx(css(cssProps), props.className)} />;
};

export const InputOtp = Object.assign(Root, {
  Root,
  Control,
  Input,
  HiddenInput,
  Label,
});

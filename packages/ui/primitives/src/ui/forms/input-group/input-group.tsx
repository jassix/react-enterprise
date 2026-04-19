import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { inputGroup } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type InputGroupVariants = {
  variant?: "outline" | "filled" | "flushed";
  size?: "sm" | "md" | "lg";
};

export interface InputGroupRootProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    InputGroupVariants {}

const Root: FC<InputGroupRootProps> = ({ variant, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(inputGroup({ variant, size }).root, css(cssProps), props.className)}
    />
  );
};

export interface InputGroupInputProps
  extends Omit<HTMLStyledProps<"input">, keyof ComponentProps<"input">>,
    Omit<ComponentProps<"input">, "size">,
    InputGroupVariants {}

const Input: FC<InputGroupInputProps> = ({ variant, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.input
      ref={ref}
      {...restProps}
      className={cx(inputGroup({ variant, size }).input, css(cssProps), props.className)}
    />
  );
};

export interface InputGroupAddonProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    InputGroupVariants {}

const StartAddon: FC<InputGroupAddonProps> = ({ variant, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(inputGroup({ variant, size }).startAddon, css(cssProps), props.className)}
    />
  );
};

const EndAddon: FC<InputGroupAddonProps> = ({ variant, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(inputGroup({ variant, size }).endAddon, css(cssProps), props.className)}
    />
  );
};

export interface InputGroupElementProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    InputGroupVariants {}

const StartElement: FC<InputGroupElementProps> = ({ variant, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(inputGroup({ variant, size }).startElement, css(cssProps), props.className)}
    />
  );
};

const EndElement: FC<InputGroupElementProps> = ({ variant, size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(inputGroup({ variant, size }).endElement, css(cssProps), props.className)}
    />
  );
};

export const InputGroup = Object.assign(Root, {
  Root,
  Input,
  StartAddon,
  EndAddon,
  StartElement,
  EndElement,
});

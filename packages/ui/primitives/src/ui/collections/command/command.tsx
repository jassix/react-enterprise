import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { command } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

type CommandVariants = { size?: "sm" | "md" | "lg" };

export interface CommandRootProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    CommandVariants {}

const Root: FC<CommandRootProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      role="dialog"
      {...restProps}
      className={cx(command({ size }).root, css(cssProps), props.className)}
    />
  );
};

export interface CommandInputWrapperProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    CommandVariants {}

const InputWrapper: FC<CommandInputWrapperProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(command({ size }).inputWrapper, css(cssProps), props.className)}
    />
  );
};

export interface CommandInputProps
  extends
    Omit<HTMLStyledProps<"input">, keyof ComponentProps<"input">>,
    Omit<ComponentProps<"input">, "size">,
    CommandVariants {}

const Input: FC<CommandInputProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.input
      ref={ref}
      type="text"
      role="combobox"
      aria-expanded="true"
      {...restProps}
      className={cx(command({ size }).input, css(cssProps), props.className)}
    />
  );
};

export interface CommandListProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    CommandVariants {}

const List: FC<CommandListProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      role="listbox"
      {...restProps}
      className={cx(command({ size }).list, css(cssProps), props.className)}
    />
  );
};

export interface CommandEmptyProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    CommandVariants {}

const Empty: FC<CommandEmptyProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(command({ size }).empty, css(cssProps), props.className)}
    />
  );
};

export interface CommandGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    CommandVariants {}

const Group: FC<CommandGroupProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      role="group"
      {...restProps}
      className={cx(command({ size }).group, css(cssProps), props.className)}
    />
  );
};

export interface CommandGroupLabelProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    CommandVariants {}

const GroupLabel: FC<CommandGroupLabelProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      {...restProps}
      className={cx(command({ size }).groupLabel, css(cssProps), props.className)}
    />
  );
};

export interface CommandItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    CommandVariants {
  /** Identifier used by command-palette filter/selection logic. */
  value?: string;
}

const Item: FC<CommandItemProps> = ({ size, value, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      role="option"
      data-value={value}
      {...restProps}
      className={cx(command({ size }).item, css(cssProps), props.className)}
    />
  );
};

export interface CommandItemIndicatorProps
  extends
    Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>,
    Omit<ComponentProps<"div">, "size">,
    CommandVariants {}

const ItemIndicator: FC<CommandItemIndicatorProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      aria-hidden
      {...restProps}
      className={cx(command({ size }).itemIndicator, css(cssProps), props.className)}
    />
  );
};

export interface CommandShortcutProps
  extends
    Omit<HTMLStyledProps<"kbd">, keyof ComponentProps<"kbd">>,
    Omit<ComponentProps<"kbd">, "size">,
    CommandVariants {}

const Shortcut: FC<CommandShortcutProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.kbd
      ref={ref}
      {...restProps}
      className={cx(command({ size }).shortcut, css(cssProps), props.className)}
    />
  );
};

export interface CommandSeparatorProps
  extends
    Omit<HTMLStyledProps<"hr">, keyof ComponentProps<"hr">>,
    Omit<ComponentProps<"hr">, "size">,
    CommandVariants {}

const Separator: FC<CommandSeparatorProps> = ({ size, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.hr
      ref={ref}
      {...restProps}
      className={cx(command({ size }).separator, css(cssProps), props.className)}
    />
  );
};

export const Command = Object.assign(Root, {
  Root,
  InputWrapper,
  Input,
  List,
  Empty,
  Group,
  GroupLabel,
  Item,
  ItemIndicator,
  Shortcut,
  Separator,
});

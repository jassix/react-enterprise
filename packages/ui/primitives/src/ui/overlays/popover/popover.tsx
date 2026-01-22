import { Popover as PopoverPrimitive } from "@ark-ui/react/popover";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { popover } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface PopoverRootProps
	extends Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.RootBaseProps>,
		PopoverPrimitive.RootBaseProps {}

const Root: FC<PopoverRootProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<PopoverPrimitive.Root {...restProps} className={cx(css(cssProps), props.className)} />
	);
};

export interface PopoverTriggerProps
	extends Omit<HTMLStyledProps<"button">, keyof PopoverPrimitive.TriggerBaseProps>,
		PopoverPrimitive.TriggerBaseProps {
	variant?: "default" | "accent";
}

const Trigger: FC<PopoverTriggerProps> = ({ variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<PopoverPrimitive.Trigger
			{...restProps}
			className={cx(popover({ variant }).trigger, css(cssProps), props.className)}
		/>
	);
};

export interface PopoverPositionerProps
	extends Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.PositionerBaseProps>,
		PopoverPrimitive.PositionerBaseProps {}

const Positioner: FC<PopoverPositionerProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<PopoverPrimitive.Positioner
			{...restProps}
			className={cx(css(cssProps), props.className)}
		/>
	);
};

export interface PopoverContentProps
	extends Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.ContentBaseProps>,
		PopoverPrimitive.ContentBaseProps {
	variant?: "default" | "accent";
}

const Content: FC<PopoverContentProps> = ({ variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<PopoverPrimitive.Content
			{...restProps}
			className={cx(popover({ variant }).content, css(cssProps), props.className)}
		/>
	);
};

export interface PopoverTitleProps
	extends Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.TitleBaseProps>,
		PopoverPrimitive.TitleBaseProps {
	variant?: "default" | "accent";
}

const Title: FC<PopoverTitleProps> = ({ variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<PopoverPrimitive.Title
			{...restProps}
			className={cx(popover({ variant }).title, css(cssProps), props.className)}
		/>
	);
};

export interface PopoverDescriptionProps
	extends Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.DescriptionBaseProps>,
		PopoverPrimitive.DescriptionBaseProps {
	variant?: "default" | "accent";
}

const Description: FC<PopoverDescriptionProps> = ({ variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<PopoverPrimitive.Description
			{...restProps}
			className={cx(popover({ variant }).description, css(cssProps), props.className)}
		/>
	);
};

export interface PopoverCloseTriggerProps
	extends Omit<HTMLStyledProps<"button">, keyof PopoverPrimitive.CloseTriggerBaseProps>,
		PopoverPrimitive.CloseTriggerBaseProps {
	variant?: "default" | "accent";
}

const CloseTrigger: FC<PopoverCloseTriggerProps> = ({ variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<PopoverPrimitive.CloseTrigger
			{...restProps}
			className={cx(popover({ variant }).closeTrigger, css(cssProps), props.className)}
		/>
	);
};

export interface PopoverArrowProps
	extends Omit<HTMLStyledProps<"div">, keyof PopoverPrimitive.ArrowBaseProps>,
		PopoverPrimitive.ArrowBaseProps {
	variant?: "default" | "accent";
}

const Arrow: FC<PopoverArrowProps> = ({ variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<PopoverPrimitive.Arrow
			{...restProps}
			className={cx(popover({ variant }).arrow, css(cssProps), props.className)}
		/>
	);
};

export const Popover = Object.assign(Root, {
	Root,
	Trigger,
	Positioner,
	Content,
	Title,
	Description,
	CloseTrigger,
	Arrow,
});


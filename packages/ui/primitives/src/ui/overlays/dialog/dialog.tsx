import { Dialog as DialogPrimitive } from "@ark-ui/react/dialog";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { dialog } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface DialogRootProps
	extends Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.RootBaseProps>,
		DialogPrimitive.RootBaseProps {}

const Root: FC<DialogRootProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<DialogPrimitive.Root {...restProps} className={cx(css(cssProps), props.className)} />
	);
};

export interface DialogBackdropProps
	extends Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.BackdropBaseProps>,
		DialogPrimitive.BackdropBaseProps {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	centered?: boolean;
}

const Backdrop: FC<DialogBackdropProps> = ({ size, centered, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<DialogPrimitive.Backdrop
			{...restProps}
			className={cx(dialog({ size, centered }).backdrop, css(cssProps), props.className)}
		/>
	);
};

export interface DialogPositionerProps
	extends Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.PositionerBaseProps>,
		DialogPrimitive.PositionerBaseProps {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	centered?: boolean;
}

const Positioner: FC<DialogPositionerProps> = ({ size, centered, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<DialogPrimitive.Positioner
			{...restProps}
			className={cx(dialog({ size, centered }).positioner, css(cssProps), props.className)}
		/>
	);
};

export interface DialogContentProps
	extends Omit<HTMLStyledProps<"div">, keyof DialogPrimitive.ContentBaseProps>,
		DialogPrimitive.ContentBaseProps {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	centered?: boolean;
}

const Content: FC<DialogContentProps> = ({ size, centered, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<DialogPrimitive.Content
			{...restProps}
			className={cx(dialog({ size, centered }).content, css(cssProps), props.className)}
		/>
	);
};

export interface DialogTitleProps
	extends Omit<HTMLStyledProps<"h2">, keyof DialogPrimitive.TitleBaseProps>,
		DialogPrimitive.TitleBaseProps {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	centered?: boolean;
}

const Title: FC<DialogTitleProps> = ({ size, centered, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<DialogPrimitive.Title
			{...restProps}
			className={cx(dialog({ size, centered }).title, css(cssProps), props.className)}
		/>
	);
};

export interface DialogDescriptionProps
	extends Omit<HTMLStyledProps<"p">, keyof DialogPrimitive.DescriptionBaseProps>,
		DialogPrimitive.DescriptionBaseProps {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	centered?: boolean;
}

const Description: FC<DialogDescriptionProps> = ({ size, centered, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<DialogPrimitive.Description
			{...restProps}
			className={cx(dialog({ size, centered }).description, css(cssProps), props.className)}
		/>
	);
};

export interface DialogCloseTriggerProps
	extends Omit<HTMLStyledProps<"button">, keyof DialogPrimitive.CloseTriggerBaseProps>,
		DialogPrimitive.CloseTriggerBaseProps {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "full";
	centered?: boolean;
}

const CloseTrigger: FC<DialogCloseTriggerProps> = ({ size, centered, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<DialogPrimitive.CloseTrigger
			{...restProps}
			className={cx(dialog({ size, centered }).closeTrigger, css(cssProps), props.className)}
		/>
	);
};

export interface DialogTriggerProps
	extends Omit<HTMLStyledProps<"button">, keyof DialogPrimitive.TriggerBaseProps>,
		DialogPrimitive.TriggerBaseProps {}

const Trigger: FC<DialogTriggerProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<DialogPrimitive.Trigger {...restProps} className={cx(css(cssProps), props.className)} />
	);
};

export const Dialog = Object.assign(Root, {
	Root,
	Trigger,
	Backdrop,
	Positioner,
	Content,
	Title,
	Description,
	CloseTrigger,
});


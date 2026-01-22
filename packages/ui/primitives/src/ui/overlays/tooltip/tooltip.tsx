import { Tooltip as TooltipPrimitive } from "@ark-ui/react/tooltip";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { tooltip } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface TooltipRootProps
	extends Omit<HTMLStyledProps<"div">, keyof TooltipPrimitive.RootBaseProps>,
		TooltipPrimitive.RootBaseProps {}

const Root: FC<TooltipRootProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TooltipPrimitive.Root {...restProps} className={cx(css(cssProps), props.className)} />
	);
};

export interface TooltipTriggerProps
	extends Omit<HTMLStyledProps<"button">, keyof TooltipPrimitive.TriggerBaseProps>,
		TooltipPrimitive.TriggerBaseProps {}

const Trigger: FC<TooltipTriggerProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TooltipPrimitive.Trigger
			{...restProps}
			className={cx(tooltip().trigger, css(cssProps), props.className)}
		/>
	);
};

export interface TooltipPositionerProps
	extends Omit<HTMLStyledProps<"div">, keyof TooltipPrimitive.PositionerBaseProps>,
		TooltipPrimitive.PositionerBaseProps {}

const Positioner: FC<TooltipPositionerProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TooltipPrimitive.Positioner
			{...restProps}
			className={cx(tooltip().positioner, css(cssProps), props.className)}
		/>
	);
};

export interface TooltipContentProps
	extends Omit<HTMLStyledProps<"div">, keyof TooltipPrimitive.ContentBaseProps>,
		TooltipPrimitive.ContentBaseProps {}

const Content: FC<TooltipContentProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TooltipPrimitive.Content
			{...restProps}
			className={cx(tooltip().content, css(cssProps), props.className)}
		/>
	);
};

export interface TooltipArrowProps
	extends Omit<HTMLStyledProps<"div">, keyof TooltipPrimitive.ArrowBaseProps>,
		TooltipPrimitive.ArrowBaseProps {}

const Arrow: FC<TooltipArrowProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<TooltipPrimitive.Arrow
			{...restProps}
			className={cx(tooltip().arrow, css(cssProps), props.className)}
		/>
	);
};

export const Tooltip = Object.assign(Root, {
	Root,
	Trigger,
	Positioner,
	Content,
	Arrow,
});


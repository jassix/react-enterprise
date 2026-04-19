import { HoverCard as HoverCardPrimitive } from "@ark-ui/react/hover-card";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { hoverCard } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type HoverCardVariants = { size?: "sm" | "md" | "lg" };

export interface HoverCardRootProps extends 
		PropsWithChildren,
		HoverCardPrimitive.RootBaseProps {}

const Root: FC<HoverCardRootProps> = (props) => <HoverCardPrimitive.Root {...props} />;

export interface HoverCardTriggerProps
	extends
		Omit<HTMLStyledProps<"button">, keyof HoverCardPrimitive.TriggerBaseProps>,
		HoverCardPrimitive.TriggerBaseProps,
		HoverCardVariants {}

const Trigger: FC<HoverCardTriggerProps> = ({ size, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<HoverCardPrimitive.Trigger
			ref={ref}
			data-slot="hover-card-trigger"
			{...restProps}
			className={cx(hoverCard({ size }).trigger, css(cssProps), props.className)}
		/>
	);
};

export interface HoverCardPositionerProps
	extends
		Omit<HTMLStyledProps<"div">, keyof HoverCardPrimitive.PositionerBaseProps>,
		HoverCardPrimitive.PositionerBaseProps,
		HoverCardVariants {}

const Positioner: FC<HoverCardPositionerProps> = ({ size, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<HoverCardPrimitive.Positioner
			ref={ref}
			data-slot="hover-card-positioner"
			{...restProps}
			className={cx(hoverCard({ size }).positioner, css(cssProps), props.className)}
		/>
	);
};

export interface HoverCardContentProps
	extends
		Omit<HTMLStyledProps<"div">, keyof HoverCardPrimitive.ContentBaseProps>,
		HoverCardPrimitive.ContentBaseProps,
		HoverCardVariants {}

const Content: FC<HoverCardContentProps> = ({ size, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<HoverCardPrimitive.Content
			ref={ref}
			data-slot="hover-card-content"
			{...restProps}
			className={cx(hoverCard({ size }).content, css(cssProps), props.className)}
		/>
	);
};

export interface HoverCardArrowProps
	extends
		Omit<HTMLStyledProps<"div">, keyof HoverCardPrimitive.ArrowBaseProps>,
		HoverCardPrimitive.ArrowBaseProps,
		HoverCardVariants {}

const Arrow: FC<HoverCardArrowProps> = ({ size, ref, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<HoverCardPrimitive.Arrow
			ref={ref}
			data-slot="hover-card-arrow"
			{...restProps}
			className={cx(hoverCard({ size }).arrow, css(cssProps), props.className)}
		/>
	);
};

export const HoverCard = Object.assign(Root, {
	Root,
	Trigger,
	Positioner,
	Content,
	Arrow,
});

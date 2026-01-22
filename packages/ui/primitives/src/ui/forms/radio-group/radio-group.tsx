import { RadioGroup as RadioGroupPrimitive } from "@ark-ui/react/radio-group";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { radioGroup } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface RadioGroupRootProps
	extends Omit<HTMLStyledProps<"div">, keyof RadioGroupPrimitive.RootBaseProps>,
		RadioGroupPrimitive.RootBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Root: FC<RadioGroupRootProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<RadioGroupPrimitive.Root
			{...restProps}
			className={cx(radioGroup({ size, intent }).root, css(cssProps), props.className)}
		/>
	);
};

export interface RadioGroupLabelProps
	extends Omit<HTMLStyledProps<"label">, keyof RadioGroupPrimitive.LabelBaseProps>,
		RadioGroupPrimitive.LabelBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Label: FC<RadioGroupLabelProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<RadioGroupPrimitive.Label
			{...restProps}
			className={cx(radioGroup({ size, intent }).label, css(cssProps), props.className)}
		/>
	);
};

export interface RadioGroupItemProps
	extends Omit<HTMLStyledProps<"label">, keyof RadioGroupPrimitive.ItemBaseProps>,
		RadioGroupPrimitive.ItemBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Item: FC<RadioGroupItemProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<RadioGroupPrimitive.Item
			{...restProps}
			className={cx(radioGroup({ size, intent }).item, css(cssProps), props.className)}
		/>
	);
};

export interface RadioGroupItemTextProps
	extends Omit<HTMLStyledProps<"span">, keyof RadioGroupPrimitive.ItemTextBaseProps>,
		RadioGroupPrimitive.ItemTextBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const ItemText: FC<RadioGroupItemTextProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<RadioGroupPrimitive.ItemText
			{...restProps}
			className={cx(radioGroup({ size, intent }).itemText, css(cssProps), props.className)}
		/>
	);
};

export interface RadioGroupItemControlProps
	extends Omit<HTMLStyledProps<"div">, keyof RadioGroupPrimitive.ItemControlBaseProps>,
		RadioGroupPrimitive.ItemControlBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const ItemControl: FC<RadioGroupItemControlProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<RadioGroupPrimitive.ItemControl
			{...restProps}
			className={cx(radioGroup({ size, intent }).itemControl, css(cssProps), props.className)}
		/>
	);
};

export interface RadioGroupIndicatorProps
	extends Omit<HTMLStyledProps<"div">, keyof RadioGroupPrimitive.IndicatorBaseProps>,
		RadioGroupPrimitive.IndicatorBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Indicator: FC<RadioGroupIndicatorProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<RadioGroupPrimitive.Indicator
			{...restProps}
			className={cx(radioGroup({ size, intent }).indicator, css(cssProps), props.className)}
		/>
	);
};

export const RadioGroup = Object.assign(Root, {
	Root,
	Label,
	Item,
	ItemText,
	ItemControl,
	Indicator,
});


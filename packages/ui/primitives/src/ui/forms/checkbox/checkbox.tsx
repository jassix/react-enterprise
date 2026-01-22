import { Checkbox as CheckboxPrimitive } from "@ark-ui/react/checkbox";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { checkbox } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface CheckboxRootProps
	extends Omit<HTMLStyledProps<"label">, keyof CheckboxPrimitive.RootBaseProps>,
		CheckboxPrimitive.RootBaseProps {}

const Root: FC<CheckboxRootProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<CheckboxPrimitive.Root
			data-slot="checkbox-root"
			{...restProps}
			className={cx(css(cssProps), props.className)}
		/>
	);
};

export interface CheckboxControlProps
	extends Omit<HTMLStyledProps<"div">, keyof CheckboxPrimitive.ControlBaseProps>,
		CheckboxPrimitive.ControlBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Control: FC<CheckboxControlProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<CheckboxPrimitive.Control
			data-slot="checkbox-control"
			{...restProps}
			className={cx(checkbox({ size, intent }), css(cssProps), props.className)}
		/>
	);
};

export interface CheckboxLabelProps
	extends Omit<HTMLStyledProps<"span">, keyof CheckboxPrimitive.LabelBaseProps>,
		CheckboxPrimitive.LabelBaseProps {}

const Label: FC<CheckboxLabelProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<CheckboxPrimitive.Label
			data-slot="checkbox-label"
			{...restProps}
			className={cx(css(cssProps), props.className)}
		/>
	);
};

export interface CheckboxIndicatorProps
	extends Omit<HTMLStyledProps<"div">, keyof CheckboxPrimitive.IndicatorBaseProps>,
		CheckboxPrimitive.IndicatorBaseProps {}

const Indicator: FC<CheckboxIndicatorProps> = (props) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<CheckboxPrimitive.Indicator
			data-slot="checkbox-indicator"
			{...restProps}
			className={cx(css(cssProps), props.className)}
		/>
	);
};

export const Checkbox = Object.assign(Root, {
	Root,
	Control,
	Label,
	Indicator,
});


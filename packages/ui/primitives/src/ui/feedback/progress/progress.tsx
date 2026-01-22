import { Progress as ProgressPrimitive } from "@ark-ui/react/progress";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { progress } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface ProgressRootProps
	extends Omit<HTMLStyledProps<"div">, keyof ProgressPrimitive.RootBaseProps>,
		ProgressPrimitive.RootBaseProps {
	size?: "xs" | "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive" | "caution" | "info";
	variant?: "linear" | "striped";
}

const Root: FC<ProgressRootProps> = ({ size, intent, variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ProgressPrimitive.Root
			{...restProps}
			className={cx(progress({ size, intent, variant }).root, css(cssProps), props.className)}
		/>
	);
};

export interface ProgressLabelProps
	extends Omit<HTMLStyledProps<"label">, keyof ProgressPrimitive.LabelBaseProps>,
		ProgressPrimitive.LabelBaseProps {
	size?: "xs" | "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive" | "caution" | "info";
	variant?: "linear" | "striped";
}

const Label: FC<ProgressLabelProps> = ({ size, intent, variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ProgressPrimitive.Label
			{...restProps}
			className={cx(progress({ size, intent, variant }).label, css(cssProps), props.className)}
		/>
	);
};

export interface ProgressTrackProps
	extends Omit<HTMLStyledProps<"div">, keyof ProgressPrimitive.TrackBaseProps>,
		ProgressPrimitive.TrackBaseProps {
	size?: "xs" | "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive" | "caution" | "info";
	variant?: "linear" | "striped";
}

const Track: FC<ProgressTrackProps> = ({ size, intent, variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ProgressPrimitive.Track
			{...restProps}
			className={cx(progress({ size, intent, variant }).track, css(cssProps), props.className)}
		/>
	);
};

export interface ProgressRangeProps
	extends Omit<HTMLStyledProps<"div">, keyof ProgressPrimitive.RangeBaseProps>,
		ProgressPrimitive.RangeBaseProps {
	size?: "xs" | "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive" | "caution" | "info";
	variant?: "linear" | "striped";
}

const Range: FC<ProgressRangeProps> = ({ size, intent, variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ProgressPrimitive.Range
			{...restProps}
			className={cx(progress({ size, intent, variant }).range, css(cssProps), props.className)}
		/>
	);
};

export interface ProgressValueTextProps
	extends Omit<HTMLStyledProps<"span">, keyof ProgressPrimitive.ValueTextBaseProps>,
		ProgressPrimitive.ValueTextBaseProps {
	size?: "xs" | "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive" | "caution" | "info";
	variant?: "linear" | "striped";
}

const ValueText: FC<ProgressValueTextProps> = ({ size, intent, variant, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<ProgressPrimitive.ValueText
			{...restProps}
			className={cx(
				progress({ size, intent, variant }).valueText,
				css(cssProps),
				props.className
			)}
		/>
	);
};

export const Progress = Object.assign(Root, {
	Root,
	Label,
	Track,
	Range,
	ValueText,
});


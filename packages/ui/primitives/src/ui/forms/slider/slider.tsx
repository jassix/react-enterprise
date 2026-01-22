import { Slider as SliderPrimitive } from "@ark-ui/react/slider";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { slider } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface SliderRootProps
	extends Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.RootBaseProps>,
		SliderPrimitive.RootBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Root: FC<SliderRootProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<SliderPrimitive.Root
			{...restProps}
			className={cx(slider({ size, intent }).root, css(cssProps), props.className)}
		/>
	);
};

export interface SliderLabelProps
	extends Omit<HTMLStyledProps<"label">, keyof SliderPrimitive.LabelBaseProps>,
		SliderPrimitive.LabelBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Label: FC<SliderLabelProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<SliderPrimitive.Label
			{...restProps}
			className={cx(slider({ size, intent }).label, css(cssProps), props.className)}
		/>
	);
};

export interface SliderControlProps
	extends Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.ControlBaseProps>,
		SliderPrimitive.ControlBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Control: FC<SliderControlProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<SliderPrimitive.Control
			{...restProps}
			className={cx(slider({ size, intent }).control, css(cssProps), props.className)}
		/>
	);
};

export interface SliderTrackProps
	extends Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.TrackBaseProps>,
		SliderPrimitive.TrackBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Track: FC<SliderTrackProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<SliderPrimitive.Track
			{...restProps}
			className={cx(slider({ size, intent }).track, css(cssProps), props.className)}
		/>
	);
};

export interface SliderRangeProps
	extends Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.RangeBaseProps>,
		SliderPrimitive.RangeBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Range: FC<SliderRangeProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<SliderPrimitive.Range
			{...restProps}
			className={cx(slider({ size, intent }).range, css(cssProps), props.className)}
		/>
	);
};

export interface SliderThumbProps
	extends Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.ThumbBaseProps>,
		SliderPrimitive.ThumbBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Thumb: FC<SliderThumbProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<SliderPrimitive.Thumb
			{...restProps}
			className={cx(slider({ size, intent }).thumb, css(cssProps), props.className)}
		/>
	);
};

export interface SliderValueTextProps
	extends Omit<HTMLStyledProps<"output">, keyof SliderPrimitive.ValueTextBaseProps>,
		SliderPrimitive.ValueTextBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const ValueText: FC<SliderValueTextProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<SliderPrimitive.ValueText
			{...restProps}
			className={cx(slider({ size, intent }).valueText, css(cssProps), props.className)}
		/>
	);
};

export interface SliderMarkerGroupProps
	extends Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.MarkerGroupBaseProps>,
		SliderPrimitive.MarkerGroupBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const MarkerGroup: FC<SliderMarkerGroupProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<SliderPrimitive.MarkerGroup
			{...restProps}
			className={cx(slider({ size, intent }).markerGroup, css(cssProps), props.className)}
		/>
	);
};

export interface SliderMarkerProps
	extends Omit<HTMLStyledProps<"span">, keyof SliderPrimitive.MarkerBaseProps>,
		SliderPrimitive.MarkerBaseProps {
	size?: "sm" | "md" | "lg";
	intent?: "primary" | "critical" | "positive";
}

const Marker: FC<SliderMarkerProps> = ({ size, intent, ...props }) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<SliderPrimitive.Marker
			{...restProps}
			className={cx(slider({ size, intent }).marker, css(cssProps), props.className)}
		/>
	);
};

export const Slider = Object.assign(Root, {
	Root,
	Label,
	Control,
	Track,
	Range,
	Thumb,
	ValueText,
	MarkerGroup,
	Marker,
});


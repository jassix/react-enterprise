import { Slider as SliderPrimitive } from "@ark-ui/react/slider";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { slider } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC } from "react";

export interface SliderRootProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.RootBaseProps>,
    SliderPrimitive.RootBaseProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
}

const Root: FC<SliderRootProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SliderPrimitive.Root
      data-slot="slider-root"
      {...restProps}
      className={cx(slider({ size, intent }).root, css(cssProps), props.className)}
    />
  );
};

export interface SliderLabelProps
  extends
    Omit<HTMLStyledProps<"label">, keyof SliderPrimitive.LabelBaseProps>,
    SliderPrimitive.LabelBaseProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
}

const Label: FC<SliderLabelProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SliderPrimitive.Label
      data-slot="slider-label"
      {...restProps}
      className={cx(slider({ size, intent }).label, css(cssProps), props.className)}
    />
  );
};

export interface SliderControlProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.ControlBaseProps>,
    SliderPrimitive.ControlBaseProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
}

const Control: FC<SliderControlProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      {...restProps}
      className={cx(slider({ size, intent }).control, css(cssProps), props.className)}
    />
  );
};

export interface SliderTrackProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.TrackBaseProps>,
    SliderPrimitive.TrackBaseProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
}

const Track: FC<SliderTrackProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SliderPrimitive.Track
      data-slot="slider-track"
      {...restProps}
      className={cx(slider({ size, intent }).track, css(cssProps), props.className)}
    />
  );
};

export interface SliderRangeProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.RangeBaseProps>,
    SliderPrimitive.RangeBaseProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
}

const Range: FC<SliderRangeProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SliderPrimitive.Range
      data-slot="slider-range"
      {...restProps}
      className={cx(slider({ size, intent }).range, css(cssProps), props.className)}
    />
  );
};

export interface SliderThumbProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.ThumbBaseProps>,
    SliderPrimitive.ThumbBaseProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
}

const Thumb: FC<SliderThumbProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SliderPrimitive.Thumb
      data-slot="slider-thumb"
      {...restProps}
      className={cx(slider({ size, intent }).thumb, css(cssProps), props.className)}
    />
  );
};

export interface SliderValueTextProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.ValueTextBaseProps>,
    SliderPrimitive.ValueTextBaseProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
}

const ValueText: FC<SliderValueTextProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SliderPrimitive.ValueText
      data-slot="slider-value-text"
      {...restProps}
      className={cx(slider({ size, intent }).valueText, css(cssProps), props.className)}
    />
  );
};

export interface SliderMarkerGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SliderPrimitive.MarkerGroupBaseProps>,
    SliderPrimitive.MarkerGroupBaseProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
}

const MarkerGroup: FC<SliderMarkerGroupProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SliderPrimitive.MarkerGroup
      data-slot="slider-marker-group"
      {...restProps}
      className={cx(slider({ size, intent }).markerGroup, css(cssProps), props.className)}
    />
  );
};

export interface SliderMarkerProps
  extends
    Omit<HTMLStyledProps<"span">, keyof SliderPrimitive.MarkerBaseProps>,
    SliderPrimitive.MarkerBaseProps {
  size?: "sm" | "md" | "lg";
  intent?: "primary" | "critical" | "positive" | "caution" | "info";
}

const Marker: FC<SliderMarkerProps> = ({ size, intent, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SliderPrimitive.Marker
      data-slot="slider-marker"
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

import { Carousel as CarouselPrimitive } from "@ark-ui/react/carousel";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { carousel } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type CarouselVariants = { orientation?: "horizontal" | "vertical" };

export interface CarouselRootProps
  extends
    
		PropsWithChildren,
		Omit<HTMLStyledProps<"div">, keyof CarouselPrimitive.RootBaseProps>,
    Omit<CarouselPrimitive.RootBaseProps, "orientation">,
    CarouselVariants {}

const Root: FC<CarouselRootProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CarouselPrimitive.Root
      ref={ref}
      orientation={orientation}
      data-slot="carousel-root"
      {...restProps}
      className={cx(carousel({ orientation }).root, css(cssProps), props.className)}
    />
  );
};

export interface CarouselControlProps
  extends
    Omit<HTMLStyledProps<"div">, keyof CarouselPrimitive.ControlBaseProps>,
    CarouselPrimitive.ControlBaseProps {}

const Control: FC<CarouselControlProps> = (props) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CarouselPrimitive.Control {...restProps} className={cx(css(cssProps), props.className)} />
  );
};

export interface CarouselItemGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof CarouselPrimitive.ItemGroupBaseProps>,
    CarouselPrimitive.ItemGroupBaseProps,
    CarouselVariants {}

const ItemGroup: FC<CarouselItemGroupProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CarouselPrimitive.ItemGroup
      ref={ref}
      data-slot="carousel-item-group"
      {...restProps}
      className={cx(carousel({ orientation }).itemGroup, css(cssProps), props.className)}
    />
  );
};

export interface CarouselItemProps
  extends
    Omit<HTMLStyledProps<"div">, keyof CarouselPrimitive.ItemBaseProps>,
    CarouselPrimitive.ItemBaseProps,
    CarouselVariants {}

const Item: FC<CarouselItemProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CarouselPrimitive.Item
      ref={ref}
      data-slot="carousel-item"
      {...restProps}
      className={cx(carousel({ orientation }).item, css(cssProps), props.className)}
    />
  );
};

export interface CarouselPrevTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof CarouselPrimitive.PrevTriggerBaseProps>,
    CarouselPrimitive.PrevTriggerBaseProps,
    CarouselVariants {}

const PrevTrigger: FC<CarouselPrevTriggerProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CarouselPrimitive.PrevTrigger
      ref={ref}
      data-slot="carousel-prev-trigger"
      {...restProps}
      className={cx(carousel({ orientation }).prevTrigger, css(cssProps), props.className)}
    />
  );
};

export interface CarouselNextTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof CarouselPrimitive.NextTriggerBaseProps>,
    CarouselPrimitive.NextTriggerBaseProps,
    CarouselVariants {}

const NextTrigger: FC<CarouselNextTriggerProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CarouselPrimitive.NextTrigger
      ref={ref}
      data-slot="carousel-next-trigger"
      {...restProps}
      className={cx(carousel({ orientation }).nextTrigger, css(cssProps), props.className)}
    />
  );
};

export interface CarouselIndicatorGroupProps
  extends
    Omit<HTMLStyledProps<"div">, keyof CarouselPrimitive.IndicatorGroupBaseProps>,
    CarouselPrimitive.IndicatorGroupBaseProps,
    CarouselVariants {}

const IndicatorGroup: FC<CarouselIndicatorGroupProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CarouselPrimitive.IndicatorGroup
      ref={ref}
      data-slot="carousel-indicator-group"
      {...restProps}
      className={cx(carousel({ orientation }).indicatorGroup, css(cssProps), props.className)}
    />
  );
};

export interface CarouselIndicatorProps
  extends
    Omit<HTMLStyledProps<"button">, keyof CarouselPrimitive.IndicatorBaseProps>,
    CarouselPrimitive.IndicatorBaseProps,
    CarouselVariants {}

const Indicator: FC<CarouselIndicatorProps> = ({ orientation, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <CarouselPrimitive.Indicator
      ref={ref}
      data-slot="carousel-indicator"
      {...restProps}
      className={cx(carousel({ orientation }).indicator, css(cssProps), props.className)}
    />
  );
};

export const Carousel = Object.assign(Root, {
  Root,
  Control,
  ItemGroup,
  Item,
  PrevTrigger,
  NextTrigger,
  IndicatorGroup,
  Indicator,
});

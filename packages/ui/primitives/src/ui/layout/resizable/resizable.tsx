import { Splitter as SplitterPrimitive } from "@ark-ui/react/splitter";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { resizable } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { FC, PropsWithChildren } from "react";

type ResizableVariants = {
  orientation?: "horizontal" | "vertical";
  variant?: "bar" | "handle";
};

export interface ResizableRootProps
  extends
    
		PropsWithChildren,
		Omit<HTMLStyledProps<"div">, keyof SplitterPrimitive.RootBaseProps>,
    Omit<SplitterPrimitive.RootBaseProps, "orientation">,
    ResizableVariants {}

const Root: FC<ResizableRootProps> = ({ orientation, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SplitterPrimitive.Root
      ref={ref}
      orientation={orientation}
      data-slot="resizable-root"
      {...restProps}
      className={cx(resizable({ orientation, variant }).root, css(cssProps), props.className)}
    />
  );
};

export interface ResizablePanelProps
  extends
    Omit<HTMLStyledProps<"div">, keyof SplitterPrimitive.PanelBaseProps>,
    SplitterPrimitive.PanelBaseProps,
    ResizableVariants {}

const Panel: FC<ResizablePanelProps> = ({ orientation, variant, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SplitterPrimitive.Panel
      ref={ref}
      data-slot="resizable-panel"
      {...restProps}
      className={cx(resizable({ orientation, variant }).panel, css(cssProps), props.className)}
    />
  );
};

export interface ResizableResizeTriggerProps
  extends
    Omit<HTMLStyledProps<"button">, keyof SplitterPrimitive.ResizeTriggerBaseProps>,
    SplitterPrimitive.ResizeTriggerBaseProps,
    ResizableVariants {}

const ResizeTrigger: FC<ResizableResizeTriggerProps> = ({
  orientation,
  variant,
  ref,
  ...props
}) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <SplitterPrimitive.ResizeTrigger
      ref={ref}
      data-slot="resizable-resize-trigger"
      {...restProps}
      className={cx(
        resizable({ orientation, variant }).resizeTrigger,
        css(cssProps),
        props.className,
      )}
    />
  );
};

export const Resizable = Object.assign(Root, {
  Root,
  Panel,
  ResizeTrigger,
});

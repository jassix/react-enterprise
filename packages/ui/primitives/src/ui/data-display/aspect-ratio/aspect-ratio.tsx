import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { aspect } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface AspectRatioProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>, ComponentProps<"div"> {
  ratio?: "square" | "video" | "wide" | "portrait" | "classic" | "golden";
}

export const AspectRatio: FC<AspectRatioProps> = ({ ratio, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="aspect-ratio"
      {...restProps}
      className={cx(aspect({ ratio }), css(cssProps), props.className)}
    />
  );
};

AspectRatio.displayName = "AspectRatio";

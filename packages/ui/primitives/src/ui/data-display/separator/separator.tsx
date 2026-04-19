import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { separator } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface SeparatorProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>, ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  variant?: "solid" | "dashed" | "dotted";
  emphasis?: "subtle" | "DEFAULT" | "strong";
}

export const Separator: FC<SeparatorProps> = ({
  orientation = "horizontal",
  variant,
  emphasis,
  ref,
  ...props
}) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="separator"
      role="separator"
      aria-orientation={orientation}
      {...restProps}
      className={cx(separator({ orientation, variant, emphasis }), css(cssProps), props.className)}
    />
  );
};

Separator.displayName = "Separator";

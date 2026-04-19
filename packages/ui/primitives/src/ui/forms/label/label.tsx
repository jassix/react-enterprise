import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { label } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface LabelProps
  extends
    Omit<HTMLStyledProps<"label">, keyof ComponentProps<"label">>,
    Omit<ComponentProps<"label">, "size"> {
  size?: "sm" | "md" | "lg";
  required?: boolean;
}

export const Label: FC<LabelProps> = ({ size, required, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.label
      ref={ref}
      data-slot="label"
      {...restProps}
      className={cx(label({ size, required }), css(cssProps), props.className)}
    />
  );
};

Label.displayName = "Label";

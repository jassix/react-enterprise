import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { spinner } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface SpinnerProps
  extends Omit<HTMLStyledProps<"div">, keyof ComponentProps<"div">>, ComponentProps<"div"> {
  variant?: "circular" | "dots" | "bars";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  intent?: "neutral" | "primary" | "critical" | "positive" | "caution" | "info";
  label?: string;
}

export const Spinner: FC<SpinnerProps> = ({
  variant,
  size,
  intent,
  label = "Loading",
  ref,
  ...props
}) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.div
      ref={ref}
      data-slot="spinner"
      role="status"
      aria-label={label}
      {...restProps}
      className={cx(spinner({ variant, size, intent }), css(cssProps), props.className)}
    />
  );
};

Spinner.displayName = "Spinner";

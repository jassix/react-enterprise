import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { textarea } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface TextareaProps
  extends
    Omit<HTMLStyledProps<"textarea">, keyof ComponentProps<"textarea">>,
    Omit<ComponentProps<"textarea">, "size"> {
  variant?: "outline" | "filled" | "flushed";
  size?: "sm" | "md" | "lg";
  resize?: "none" | "vertical" | "horizontal" | "both";
}

export const Textarea: FC<TextareaProps> = ({ variant, size, resize, ref, ...props }) => {
  const [cssProps, restProps] = splitCssProps(props);

  return (
    <ark.textarea
      ref={ref}
      data-slot="textarea"
      {...restProps}
      className={cx(textarea({ variant, size, resize }), css(cssProps), props.className)}
    />
  );
};

Textarea.displayName = "Textarea";

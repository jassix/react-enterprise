import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { input } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface InputProps
	extends Omit<HTMLStyledProps<"input">, keyof ComponentProps<"input">>,
		Omit<ComponentProps<"input">, "size"> {
	variant?: "outline" | "filled" | "flushed";
	size?: "sm" | "md" | "lg" | "xl";
}

export const Input: FC<InputProps> = (
	({ variant, size, ref, ...props }) => {
		const [cssProps, restProps] = splitCssProps(props);

		return (
			<ark.input
				ref={ref}
				{...restProps}
				className={cx(input({ variant, size }), css(cssProps), props.className)}
			/>
		);
	}
);

Input.displayName = "Input";


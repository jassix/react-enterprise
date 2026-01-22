import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { card } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

export interface CardProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentPropsWithoutRef<"div">>,
		ComponentPropsWithoutRef<"div"> {
	variant?: "elevated" | "outline" | "filled" | "ghost";
	size?: "sm" | "md" | "lg" | "xl";
	interactive?: boolean;
}

export const Card = forwardRef<ElementRef<"div">, CardProps>(
	({ variant, size, interactive, ...props }, ref) => {
		const [cssProps, restProps] = splitCssProps(props);

		return (
			<ark.div
				ref={ref}
				{...restProps}
				className={cx(
					card({ variant, size, interactive }),
					css(cssProps),
					props.className
				)}
			/>
		);
	}
);

Card.displayName = "Card";


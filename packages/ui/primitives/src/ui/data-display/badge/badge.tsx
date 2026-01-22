import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { badge } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";

export interface BadgeProps
	extends Omit<HTMLStyledProps<"span">, keyof ComponentProps<"span">>,
		ComponentProps<"span"> {
	variant?: "solid" | "subtle" | "outline";
	intent?: "neutral" | "accent" | "critical" | "positive" | "caution" | "info";
	size?: "sm" | "md" | "lg";
}

export const Badge: FC<BadgeProps> = (
	({ variant, intent, size, ref, ...props }) => {
		const [cssProps, restProps] = splitCssProps(props);

		return (
			<ark.span
				ref={ref}
				{...restProps}
				className={cx(
					badge({ variant, intent, size }),
					css(cssProps),
					props.className
				)}
			/>
		);
	}
);

Badge.displayName = "Badge";


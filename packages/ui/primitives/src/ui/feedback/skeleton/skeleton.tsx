import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { skeleton } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

export interface SkeletonProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentPropsWithoutRef<"div">>,
		ComponentPropsWithoutRef<"div"> {
	variant?: "text" | "circle" | "rect";
	speed?: "slow" | "normal" | "fast";
}

export const Skeleton = forwardRef<ElementRef<"div">, SkeletonProps>(
	({ variant, speed, ...props }, ref) => {
		const [cssProps, restProps] = splitCssProps(props);

		return (
			<ark.div
				ref={ref}
				{...restProps}
				className={cx(skeleton({ variant, speed }), css(cssProps), props.className)}
			/>
		);
	}
);

Skeleton.displayName = "Skeleton";


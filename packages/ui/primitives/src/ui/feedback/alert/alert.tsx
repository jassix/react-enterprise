import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { alert } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

export interface AlertProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentPropsWithoutRef<"div">>,
		ComponentPropsWithoutRef<"div"> {
	status?: "info" | "positive" | "caution" | "critical";
	variant?: "subtle" | "solid" | "outline";
}

export const Alert = forwardRef<ElementRef<"div">, AlertProps>(
	({ status, variant, ...props }, ref) => {
		const [cssProps, restProps] = splitCssProps(props);

		return (
			<ark.div
				ref={ref}
				{...restProps}
				className={cx(alert({ status, variant }), css(cssProps), props.className)}
			/>
		);
	}
);

Alert.displayName = "Alert";


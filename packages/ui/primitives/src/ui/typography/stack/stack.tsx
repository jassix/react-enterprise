import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { stack } from "@lume/foundation/patterns";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

export interface StackProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentPropsWithoutRef<"div">>,
		ComponentPropsWithoutRef<"div"> {
	direction?: "row" | "column";
	gap?: string;
}

export const Stack = forwardRef<ElementRef<"div">, StackProps>(
	({ direction = "column", gap, ...props }, ref) => {
		const [cssProps, restProps] = splitCssProps(props);

		return (
			<ark.div
				ref={ref}
				{...restProps}
				className={cx(stack({ direction, gap }), css(cssProps), props.className)}
			/>
		);
	}
);

Stack.displayName = "Stack";


import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { avatar } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentPropsWithoutRef, ElementRef } from "react";
import { forwardRef } from "react";

export interface AvatarProps
	extends Omit<HTMLStyledProps<"div">, keyof ComponentPropsWithoutRef<"div">>,
		ComponentPropsWithoutRef<"div"> {
	size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
	shape?: "circle" | "square" | "rounded";
	src?: string;
	alt?: string;
	fallback?: string;
}

export const Avatar = forwardRef<ElementRef<"div">, AvatarProps>(
	({ size, shape, src, alt, fallback, children, ...props }, ref) => {
		const [cssProps, restProps] = splitCssProps(props);

		return (
			<ark.div
				ref={ref}
				{...restProps}
				className={cx(avatar({ size, shape }), css(cssProps), props.className)}
			>
				{src ? <img src={src} alt={alt || ""} /> : children || fallback}
			</ark.div>
		);
	}
);

Avatar.displayName = "Avatar";


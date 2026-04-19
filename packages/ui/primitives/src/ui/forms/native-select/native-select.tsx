import { ark } from "@ark-ui/react/factory";
import { css, cx } from "@lume/foundation/css";
import { splitCssProps } from "@lume/foundation/jsx";
import { nativeSelect } from "@lume/foundation/recipes";
import type { HTMLStyledProps } from "@lume/foundation/types";
import type { ComponentProps, FC } from "react";
import { Icon } from "../../data-display/icon";

export interface NativeSelectProps
	extends
		Omit<HTMLStyledProps<"select">, keyof ComponentProps<"select">>,
		Omit<ComponentProps<"select">, "size"> {
	variant?: "outline" | "filled" | "flushed";
	size?: "sm" | "md" | "lg";
}

export const NativeSelect: FC<NativeSelectProps> = ({
	variant,
	size,
	ref,
	className,
	...props
}) => {
	const [cssProps, restProps] = splitCssProps(props);

	return (
		<span
			data-slot="native-select-wrapper"
			className={css({
				position: "relative",
				display: "inline-flex",
				width: "100%",
				alignItems: "center",
			})}
		>
			<ark.select
				ref={ref}
				data-slot="native-select"
				{...restProps}
				className={cx(nativeSelect({ variant, size }), css(cssProps), className)}
			/>
			<Icon
				name="hugeicons:unfold-more"
				size="md"
				aria-hidden
				css={{
					position: "absolute",
					// 10px — luma `right-2.5`; +2 on the nearest token keeps us on
					// the spacing scale without drifting from luma.
					insetInlineEnd: "calc(token(spacing.sm) + 2px)",
					top: "50%",
					transform: "translateY(-50%)",
					pointerEvents: "none",
					color: "{colors.foreground.tertiary}",
				}}
			/>
		</span>
	);
};

NativeSelect.displayName = "NativeSelect";

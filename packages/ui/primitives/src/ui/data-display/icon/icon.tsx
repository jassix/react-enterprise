import { Icon as IconifyIcon } from "@iconify/react";
import { css, cx } from "@lume/foundation/css";
import type { CSSProperties, FC } from "react";

export interface IconProps {
	/**
	 * Fully-qualified icon name, e.g. `"hugeicons:menu-02"`. Any Iconify pack
	 * registered via `addCollection` resolves — the Storybook loader registers
	 * the full HugeIcons free pack.
	 */
	name: string;
	/** Preset size token, or any pixel number. */
	size?: "xs" | "sm" | "md" | "lg" | "xl" | number;
	/** Optional Panda `css()` style object. */
	css?: Parameters<typeof css>[0];
	/** Overrides `color` — defaults to `currentColor` so text color controls it. */
	color?: CSSProperties["color"];
	className?: string;
	style?: CSSProperties;
	"aria-label"?: string;
	"aria-hidden"?: boolean;
	role?: string;
}

const sizeMap = { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 } as const;

export const Icon: FC<IconProps> = ({
	name,
	size = "md",
	css: cssProp,
	color,
	className,
	style,
	"aria-label": ariaLabel,
	"aria-hidden": ariaHidden,
	role,
}) => {
	const resolvedSize = typeof size === "number" ? size : sizeMap[size];

	return (
		<IconifyIcon
			icon={name}
			width={resolvedSize}
			height={resolvedSize}
			className={cx(
				css({ flexShrink: 0, color: "currentColor" }),
				cssProp ? css(cssProp) : undefined,
				className,
			)}
			style={color ? { color, ...style } : style}
			aria-label={ariaLabel}
			aria-hidden={ariaHidden}
			role={role}
		/>
	);
};

Icon.displayName = "Icon";

import { defineRecipe } from "@pandacss/dev";

/**
 * Kbd — luma signature: small `rounded-lg` chip with muted surface bg, mono
 * font at `text-xs`. Sized to comfortably hold one or two glyphs (h-5.5 ≈ 24).
 */
export const kbdRecipe = defineRecipe({
	className: "kbd",
	description: "Luma kbd — keyboard shortcut chip",
	jsx: ["Kbd"],
	base: {
		pointerEvents: "none",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "{spacing.xs}", // 4 — luma `gap-1`
		fontFamily: "{fonts.body}", // luma `font-sans`
		fontSize: "{fontSizes.xs}", // 12 — luma `text-xs`
		fontWeight: "{fontWeights.medium}",
		lineHeight: "1",
		whiteSpace: "nowrap",
		userSelect: "none",
		width: "fit-content",
		height: "1.375rem", // 22 — luma `h-5.5`
		minWidth: "1.375rem",
		paddingInline: "0.375rem", // 6 — luma `px-1.5`
		borderRadius: "{radii.lg}", // 12 — luma `rounded-lg`
		bg: "{colors.surface.muted}",
		color: "{colors.foreground.tertiary}",

		"& svg:not([class*='size-'])": { width: "0.75rem", height: "0.75rem" }, // 12 — luma `size-3`

		// Contextual recolors — luma scopes `in-data-[slot=*]:bg-*` classes.
		"[data-slot='input-group'] &": {
			bg: "color-mix(in oklab, {colors.border} 50%, transparent)",
		},
		"[data-slot='tooltip-content'] &": {
			bg: "color-mix(in oklab, {colors.background} 20%, transparent)",
			color: "{colors.background}",
			_dark: {
				bg: "color-mix(in oklab, {colors.background} 10%, transparent)",
			},
		},
	},
	variants: {
		variant: {
			outline: {
				bg: "{colors.background}",
				border: "1px solid {colors.border.hairline}",
				borderBottomWidth: "2px",
			},
			solid: {
				bg: "{colors.foreground}",
				color: "{colors.background}",
			},
			subtle: {},
		},
		size: {
			xs: { fontSize: "0.625rem", height: "1rem", minWidth: "1rem" }, // 16
			sm: { height: "1.375rem", minWidth: "1.375rem" }, // 22 — luma default
			md: { fontSize: "{fontSizes.sm}", height: "2rem", minWidth: "2rem" }, // 32
		},
	},
	defaultVariants: { variant: "subtle", size: "sm" },
});

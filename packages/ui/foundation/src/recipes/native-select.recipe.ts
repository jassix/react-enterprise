import { defineRecipe } from "@pandacss/dev";

/**
 * Native select — same form-field bundle as Input. The chevron icon is
 * rendered alongside in the primitive (positioned absolutely); this recipe
 * styles only the bare `<select>`. Reserve right padding for the chevron.
 */
export const nativeSelectRecipe = defineRecipe({
	className: "native-select",
	description: "Luma native select — form-field bundle on a bare `<select>`",
	jsx: ["NativeSelect"],
	base: {
		display: "flex",
		alignItems: "center",
		width: "100%",
		minWidth: "0",
		fontFamily: "{fonts.body}",
		fontWeight: "{fontWeights.regular}",
		fontSize: "{fontSizes.sm}",
		lineHeight: "{lineHeight.normal}",
		color: "{colors.foreground}",
		outline: "none",
		cursor: "pointer",
		appearance: "none",
		WebkitAppearance: "none",
		userSelect: "none",
		border: "1px solid transparent",
		transition: "color {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}, border-color {durations.press} {easings.easeOut}",

		_disabled: {
			pointerEvents: "none",
			cursor: "not-allowed",
			opacity: "0.5",
		},

		_focusVisible: {
			borderColor: "{colors.focus.ring}",
			boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
		},

		"&[aria-invalid='true']": {
			borderColor: "{colors.critical}",
			boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
			_dark: {
				borderColor: "color-mix(in oklab, {colors.critical} 50%, transparent)",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
			},
		},
	},
	variants: {
		variant: {
			outline: {
				bg: "color-mix(in oklab, {colors.border} 50%, transparent)",
				borderRadius: "{radii.3xl}", // 24
			},
			filled: {
				bg: "{colors.surface.muted}",
				borderRadius: "{radii.3xl}",
				_hover: { bg: "{colors.surface.subtle}" },
				_focusVisible: { bg: "{colors.surface.base}" },
			},
			flushed: {
				bg: "transparent",
				border: "none",
				borderBottom: "1px solid {colors.border}",
				borderRadius: "0",
				paddingInline: "0",
			},
		},
		size: {
			sm: {
				height: "2rem", // 32 — luma `data-[size=sm]:h-8`
				paddingInlineStart: "{spacing.md}", // 12 — luma `pl-3`
				paddingInlineEnd: "{spacing.2xl}", // 32 — luma `pr-8`
				paddingBlock: "{spacing.xs}",
			},
			md: {
				height: "2.25rem", // 36 — luma `h-9`
				paddingInlineStart: "{spacing.md}",
				paddingInlineEnd: "{spacing.2xl}", // 32 — luma `pr-8`
				paddingBlock: "{spacing.xs}", // 4 — luma `py-1`
			},
			lg: {
				height: "2.5rem", // 40
				fontSize: "{fontSizes.md}",
				paddingInlineStart: "{spacing.lg}",
				paddingInlineEnd: "{spacing.2xl}",
				paddingBlock: "{spacing.xs}",
			},
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "md",
	},
});

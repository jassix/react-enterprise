import { defineRecipe } from "@pandacss/dev";

/**
 * Textarea — luma signature: same form-field treatment as Input but
 * `rounded-2xl` (luma uses `rounded-2xl` here; not `3xl`), no x-resize, and
 * `field-sizing: content` so it grows with content. `filled` / `flushed` are
 * alternate visuals if the layout calls for them.
 */
export const textareaRecipe = defineRecipe({
	className: "textarea",
	description: "Luma textarea — multi-line form field",
	jsx: ["Textarea"],
	base: {
		display: "flex",
		width: "100%",
		minHeight: "4rem", // 64px — luma min-h-16
		fontFamily: "{fonts.body}",
		fontWeight: "{fontWeights.regular}",
		fontSize: "{fontSizes.sm}",
		lineHeight: "{lineHeight.normal}",
		color: "{colors.foreground}",
		outline: "none",
		border: "1px solid transparent",
		transition: "color {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}, border-color {durations.press} {easings.easeOut}",
		fieldSizing: "content",
		resize: "none",

		_placeholder: {
			color: "{colors.foreground.tertiary}",
		},

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
				borderRadius: "{radii.2xl}", // 20px — luma rounded-2xl
				paddingInline: "{spacing.md}",
				paddingBlock: "{spacing.md}",
			},
			filled: {
				bg: "{colors.surface.muted}",
				borderRadius: "{radii.2xl}",
				paddingInline: "{spacing.md}",
				paddingBlock: "{spacing.md}",
				_hover: { bg: "{colors.surface.subtle}" },
				_focusVisible: { bg: "{colors.surface.base}" },
			},
			flushed: {
				bg: "transparent",
				border: "none",
				borderBottom: "1px solid {colors.border}",
				borderRadius: "0",
				paddingInline: "0",
				paddingBlock: "{spacing.sm}",
				_focusVisible: {
					borderBottomColor: "{colors.focus.ring}",
					boxShadow: "0 1px 0 0 {colors.focus.ring}",
				},
			},
		},
		size: {
			sm: { fontSize: "{fontSizes.sm}", minHeight: "3rem" }, // 48
			md: { fontSize: "{fontSizes.sm}", minHeight: "4rem" }, // 64
			lg: { fontSize: "{fontSizes.md}", minHeight: "6rem" }, // 96
		},
		resize: {
			none: { resize: "none" },
			vertical: { resize: "vertical" },
			horizontal: { resize: "horizontal" },
			both: { resize: "both" },
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "md",
		resize: "none",
	},
});

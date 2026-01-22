import { defineRecipe } from "@pandacss/dev";

export const inputRecipe = defineRecipe({
	className: "input",
	description: "Input field recipe with variants and sizes",
	base: {
		width: "100%",
		fontFamily: "{fonts.body}",
		fontWeight: "{fontWeights.regular}",
		lineHeight: "{lineHeight.normal}",
		outline: "none",
		transition: "all {durations.fast} {easings.easeInOut}",
		color: "{colors.foreground.DEFAULT}",

		_placeholder: {
			color: "{colors.foreground.tertiary}",
		},

		_disabled: {
			cursor: "not-allowed",
			opacity: "0.5",
		},

		_focusVisible: {
			ring: "2px solid",
			ringColor: "{colors.focus.ring}",
			ringOffset: "{colors.focus.ringOffset}",
		},
	},
	variants: {
		variant: {
			outline: {
				bg: "{colors.surface.base}",
				border: "1px solid {colors.border.DEFAULT}",
				borderRadius: "{radii.md}",

				_hover: {
					borderColor: "{colors.border.emphasis}",
				},

				_focus: {
					borderColor: "{colors.border.focus}",
				},

				_invalid: {
					borderColor: "{colors.border.critical}",
					_focus: {
						ringColor: "{colors.critical.DEFAULT}",
					},
				},
			},
			filled: {
				bg: "{colors.surface.muted}",
				border: "2px solid transparent",
				borderRadius: "{radii.md}",

				_hover: {
					bg: "{colors.surface.subtle}",
				},

				_focus: {
					bg: "{colors.surface.base}",
					borderColor: "{colors.border.focus}",
				},

				_invalid: {
					borderColor: "{colors.border.critical}",
				},
			},
			flushed: {
				bg: "transparent",
				border: "none",
				borderBottom: "2px solid {colors.border.DEFAULT}",
				borderRadius: "0",
				paddingX: "0",

				_focus: {
					borderBottomColor: "{colors.border.focus}",
				},

				_invalid: {
					borderBottomColor: "{colors.border.critical}",
				},
			},
		},
		size: {
			sm: {
				height: "{sizes.sm}",
				fontSize: "{fontSizes.sm}",
				paddingX: "{spacing.sm}",
			},
			md: {
				height: "{sizes.md}",
				fontSize: "{fontSizes.md}",
				paddingX: "{spacing.md}",
			},
			lg: {
				height: "{sizes.lg}",
				fontSize: "{fontSizes.lg}",
				paddingX: "{spacing.lg}",
			},
			xl: {
				height: "{sizes.xl}",
				fontSize: "{fontSizes.xl}",
				paddingX: "{spacing.xl}",
			},
		},
	},
	defaultVariants: {
		variant: "outline",
		size: "md",
	},
});


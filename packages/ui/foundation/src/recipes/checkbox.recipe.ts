import { defineRecipe } from "@pandacss/dev";

export const checkboxRecipe = defineRecipe({
	className: "checkbox",
	description: "Checkbox recipe for form controls",
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: "0",
		border: "2px solid {colors.border.DEFAULT}",
		bg: "{colors.surface.base}",
		cursor: "pointer",
		transition: "all {durations.fast} {easings.easeInOut}",

		_hover: {
			borderColor: "{colors.border.emphasis}",
		},

		_checked: {
			bg: "{colors.interactive.base}",
			borderColor: "{colors.interactive.base}",

			_hover: {
				bg: "{colors.interactive.hover}",
				borderColor: "{colors.interactive.hover}",
			},
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
		size: {
			sm: {
				width: "{sizes.xs}",
				height: "{sizes.xs}",
				borderRadius: "{radii.xs}",
			},
			md: {
				width: "{sizes.sm}",
				height: "{sizes.sm}",
				borderRadius: "{radii.sm}",
			},
			lg: {
				width: "{sizes.md}",
				height: "{sizes.md}",
				borderRadius: "{radii.md}",
			},
		},
		intent: {
			primary: {},
			critical: {
				_checked: {
					bg: "{colors.critical.DEFAULT}",
					borderColor: "{colors.critical.DEFAULT}",
				},
			},
			positive: {
				_checked: {
					bg: "{colors.positive.DEFAULT}",
					borderColor: "{colors.positive.DEFAULT}",
				},
			},
		},
	},
	defaultVariants: {
		size: "md",
		intent: "primary",
	},
});


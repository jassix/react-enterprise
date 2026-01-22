import { defineSlotRecipe } from "@pandacss/dev";

export const radioGroupRecipe = defineSlotRecipe({
	className: "radio-group",
	description: "Radio group recipe for radio button groups",
	slots: ["root", "label", "item", "itemText", "itemControl", "indicator"],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.md}",
		},

		label: {
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.DEFAULT}",
			marginBottom: "{spacing.xs}",
		},

		item: {
			display: "flex",
			alignItems: "center",
			gap: "{spacing.sm}",
			cursor: "pointer",

			_disabled: {
				opacity: "0.5",
				cursor: "not-allowed",
			},
		},

		itemText: {
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground.DEFAULT}",
		},

		itemControl: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			width: "{sizes.sm}",
			height: "{sizes.sm}",
			borderRadius: "{radii.full}",
			border: "2px solid {colors.border.DEFAULT}",
			bg: "{colors.surface.base}",
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

		indicator: {
			width: "50%",
			height: "50%",
			borderRadius: "{radii.full}",
			bg: "white",
		},
	},
	variants: {
		size: {
			sm: {
				itemControl: {
					width: "{sizes.xs}",
					height: "{sizes.xs}",
				},
				itemText: {
					fontSize: "{fontSizes.xs}",
				},
			},
			md: {},
			lg: {
				itemControl: {
					width: "{sizes.md}",
					height: "{sizes.md}",
				},
				itemText: {
					fontSize: "{fontSizes.md}",
				},
			},
		},
		intent: {
			primary: {},
			critical: {
				itemControl: {
					_checked: {
						bg: "{colors.critical.DEFAULT}",
						borderColor: "{colors.critical.DEFAULT}",
					},
				},
			},
			positive: {
				itemControl: {
					_checked: {
						bg: "{colors.positive.DEFAULT}",
						borderColor: "{colors.positive.DEFAULT}",
					},
				},
			},
		},
	},
	defaultVariants: {
		size: "md",
		intent: "primary",
	},
});


import { defineSlotRecipe } from "@pandacss/dev";

export const selectRecipe = defineSlotRecipe({
	className: "select",
	description: "Select recipe for dropdown selection",
	slots: [
		"root",
		"label",
		"control",
		"trigger",
		"valueText",
		"indicator",
		"clearTrigger",
		"positioner",
		"content",
		"item",
		"itemText",
		"itemIndicator",
		"itemGroup",
		"itemGroupLabel",
	],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.xs}",
		},

		label: {
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.DEFAULT}",
		},

		control: {
			display: "flex",
			alignItems: "center",
			position: "relative",
		},

		trigger: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			width: "100%",
			gap: "{spacing.sm}",
			padding: "{spacing.sm} {spacing.md}",
			bg: "{colors.surface.base}",
			border: "1px solid {colors.border.DEFAULT}",
			borderRadius: "{radii.md}",
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground.DEFAULT}",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.fast} {easings.easeInOut}",

			_hover: {
				borderColor: "{colors.border.emphasis}",
			},

			_focus: {
				borderColor: "{colors.border.focus}",
			},

			_disabled: {
				opacity: "0.5",
				cursor: "not-allowed",
			},

			_invalid: {
				borderColor: "{colors.border.critical}",
			},

			_focusVisible: {
				ring: "2px solid",
				ringColor: "{colors.focus.ring}",
				ringOffset: "{colors.focus.ringOffset}",
			},
		},

		valueText: {
			flex: "1",
			textAlign: "left",
		},

		indicator: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			transition: "transform {durations.fast} {easings.easeInOut}",

			_open: {
				transform: "rotate(180deg)",
			},
		},

		clearTrigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			cursor: "pointer",
			color: "{colors.foreground.secondary}",

			_hover: {
				color: "{colors.foreground.DEFAULT}",
			},
		},

		positioner: {
			position: "absolute",
			zIndex: "{zIndex.dropdown}",
		},

		content: {
			display: "flex",
			flexDirection: "column",
			bg: "{colors.surface.elevated}",
			borderRadius: "{radii.md}",
			boxShadow: "{colors.shadow.lg}",
			border: "1px solid {colors.border.DEFAULT}",
			minWidth: "var(--reference-width)",
			maxHeight: "20rem",
			overflow: "auto",
			padding: "{spacing.xs}",
			
			_open: {
				animation: "fadeIn {durations.fast} {easings.easeOut}",
			},
			
			_closed: {
				animation: "fadeOut {durations.fast} {easings.easeIn}",
			},
		},

		item: {
			display: "flex",
			alignItems: "center",
			gap: "{spacing.sm}",
			padding: "{spacing.sm} {spacing.md}",
			borderRadius: "{radii.sm}",
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground.DEFAULT}",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.fast} {easings.easeInOut}",

			_highlighted: {
				bg: "{colors.surface.subtle}",
			},

			_checked: {
				bg: "{colors.accent.light.3}",
				color: "{colors.accent.light.11}",
				_dark: {
					bg: "{colors.accent.dark.3}",
					color: "{colors.accent.dark.11}",
				},
			},

			_disabled: {
				opacity: "0.5",
				cursor: "not-allowed",
			},
		},

		itemText: {
			flex: "1",
		},

		itemIndicator: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "{sizes.sm}",
			height: "{sizes.sm}",
		},

		itemGroup: {
			display: "flex",
			flexDirection: "column",
		},

		itemGroupLabel: {
			padding: "{spacing.sm} {spacing.md}",
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.semibold}",
			color: "{colors.foreground.tertiary}",
			textTransform: "uppercase",
			letterSpacing: "{letterSpacing.wide}",
		},
	},
	variants: {
		size: {
			sm: {
				trigger: {
					fontSize: "{fontSizes.xs}",
					padding: "{spacing.xs} {spacing.sm}",
					height: "{sizes.sm}",
				},
			},
			md: {
				trigger: {
					height: "{sizes.md}",
				},
			},
			lg: {
				trigger: {
					fontSize: "{fontSizes.md}",
					padding: "{spacing.md} {spacing.lg}",
					height: "{sizes.lg}",
				},
			},
		},
	},
	defaultVariants: {
		size: "md",
	},
});


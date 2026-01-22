import { defineSlotRecipe } from "@pandacss/dev";

export const popoverRecipe = defineSlotRecipe({
	className: "popover",
	description: "Popover recipe for floating content",
	slots: ["trigger", "positioner", "content", "title", "description", "closeTrigger", "arrow"],
	base: {
		trigger: {
			cursor: "pointer",
			outline: "none",

			_focusVisible: {
				ring: "2px solid",
				ringColor: "{colors.focus.ring}",
				ringOffset: "{colors.focus.ringOffset}",
			},
		},

		positioner: {
			position: "absolute",
			zIndex: "{zIndex.popover}",
		},

		content: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			bg: "{colors.surface.elevated}",
			borderRadius: "{radii.md}",
			boxShadow: "{colors.shadow.lg}",
			border: "1px solid {colors.border.DEFAULT}",
			minWidth: "12rem",
			maxWidth: "24rem",
			padding: "{spacing.md}",
			
			_open: {
				animation: "fadeIn {durations.fast} {easings.easeOut}",
			},
			
			_closed: {
				animation: "fadeOut {durations.fast} {easings.easeIn}",
			},
		},

		title: {
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.semibold}",
			color: "{colors.foreground.DEFAULT}",
			marginBottom: "{spacing.xs}",
		},

		description: {
			fontSize: "{fontSizes.xs}",
			color: "{colors.foreground.secondary}",
		},

		closeTrigger: {
			position: "absolute",
			top: "{spacing.sm}",
			right: "{spacing.sm}",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "{sizes.sm}",
			height: "{sizes.sm}",
			borderRadius: "{radii.xs}",
			color: "{colors.foreground.secondary}",
			cursor: "pointer",
			transition: "all {durations.fast} {easings.easeInOut}",

			_hover: {
				bg: "{colors.surface.muted}",
				color: "{colors.foreground.DEFAULT}",
			},

			_focusVisible: {
				ring: "2px solid",
				ringColor: "{colors.focus.ring}",
				ringOffset: "{colors.focus.ringOffset}",
			},
		},

		arrow: {
			"--arrow-size": "{spacing.md}",
			"--arrow-background": "{colors.surface.elevated}",
		},
	},
	variants: {
		variant: {
			default: {},
			accent: {
				content: {
					bg: "{colors.accent.light.3}",
					borderColor: "{colors.accent.light.6}",
					_dark: {
						bg: "{colors.accent.dark.3}",
						borderColor: "{colors.accent.dark.6}",
					},
				},
				arrow: {
					"--arrow-background": "{colors.accent.light.3}",
				},
			},
		},
	},
	defaultVariants: {
		variant: "default",
	},
});


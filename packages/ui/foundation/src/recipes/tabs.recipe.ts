import { defineSlotRecipe } from "@pandacss/dev";

export const tabsRecipe = defineSlotRecipe({
	className: "tabs",
	description: "Tabs recipe for tabbed interfaces",
	slots: ["root", "list", "trigger", "content", "indicator"],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			width: "100%",
		},

		list: {
			display: "flex",
			position: "relative",
			borderBottom: "1px solid {colors.border.DEFAULT}",
		},

		trigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "{spacing.md} {spacing.lg}",
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.secondary}",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.fast} {easings.easeInOut}",
			borderBottom: "2px solid transparent",
			marginBottom: "-1px",

			_hover: {
				color: "{colors.foreground.DEFAULT}",
				bg: "{colors.surface.subtle}",
			},

			_selected: {
				color: "{colors.interactive.base}",
				borderBottomColor: "{colors.interactive.base}",
			},

			_disabled: {
				opacity: "0.5",
				cursor: "not-allowed",
			},

			_focusVisible: {
				ring: "2px solid",
				ringColor: "{colors.focus.ring}",
				ringOffset: "{colors.focus.ringOffset}",
			},
		},

		content: {
			padding: "{spacing.lg} 0",
			outline: "none",

			_focusVisible: {
				ring: "2px solid",
				ringColor: "{colors.focus.ring}",
				ringOffset: "{colors.focus.ringOffset}",
			},
		},

		indicator: {
			position: "absolute",
			bottom: "0",
			height: "2px",
			bg: "{colors.interactive.base}",
			transition: "all {durations.fast} {easings.easeInOut}",
		},
	},
	variants: {
		variant: {
			line: {},
			enclosed: {
				list: {
					borderBottom: "none",
					gap: "{spacing.xs}",
				},
				trigger: {
					border: "1px solid {colors.border.DEFAULT}",
					borderBottom: "none",
					borderTopRadius: "{radii.md}",
					marginBottom: "0",

					_selected: {
						bg: "{colors.surface.base}",
						borderBottomColor: "{colors.surface.base}",
						zIndex: "1",
					},
				},
				content: {
					border: "1px solid {colors.border.DEFAULT}",
					borderRadius: "{radii.md}",
					borderTopLeftRadius: "0",
					padding: "{spacing.lg}",
				},
			},
			unstyled: {
				list: {
					border: "none",
				},
				trigger: {
					border: "none",
					marginBottom: "0",
				},
			},
		},
		size: {
			sm: {
				trigger: {
					fontSize: "{fontSizes.xs}",
					padding: "{spacing.sm} {spacing.md}",
				},
			},
			md: {},
			lg: {
				trigger: {
					fontSize: "{fontSizes.md}",
					padding: "{spacing.lg} {spacing.xl}",
				},
			},
		},
	},
	defaultVariants: {
		variant: "line",
		size: "md",
	},
});


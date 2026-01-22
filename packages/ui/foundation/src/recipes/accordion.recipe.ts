import { defineSlotRecipe } from "@pandacss/dev";

export const accordionRecipe = defineSlotRecipe({
	className: "accordion",
	description: "Accordion recipe for disclosure components",
	slots: ["root", "item", "trigger", "indicator", "content"],
	base: {
		root: {},

		item: {
			borderBottom: "1px solid {colors.border.DEFAULT}",

			_last: {
				borderBottom: "none",
			},
		},

		trigger: {
			display: "flex",

			flex: 1,
			alignItems: "start",
			justifyContent: "space-between",
			gap: "{spacing.lg}",

			rounded: "{radii.md}",
			py: "{spacing.lg}",

			textAlign: "left",
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",

			transition: "all {durations.fast} {easings.easeInOut}",

			outline: "none",

			_hover: {
				textDecoration: "underline",
			},

			_focusVisible: {
				ring: "3px solid",
				ringColor: "{colors.focus.ring}",
				ringOffset: "{colors.focus.ringOffset}",
			},

			_disabled: {
				pointerEvents: "none",
				opacity: "0.5",
			},
		},

		indicator: {
			transition: "transform {durations.fast} {easings.linear}",
			
			color: "{colors.surface.muted}",
			pointerEvents: "none",

			w: "{sizes.md}",
			h: "{sizes.md}",

			flexShrink: 0,

			translate: "y(2px)",

			_open: {
				transform: "rotate(180deg)",
			},
		},

		content: {
			overflow: "hidden",
			fontSize: "{fontSizes.sm}",
			
			_closed: {
				animation: "slideOutToBottom {durations.fast} {easings.easeInOut}",
			},

			_open: {
				animation: "slideInFromBottom {durations.fast} {easings.easeInOut}",
			},
		},
	},
});
import { defineSlotRecipe } from "@pandacss/dev";

export const menuRecipe = defineSlotRecipe({
	className: "menu",
	description: "Menu recipe for dropdown menus",
	slots: [
		"trigger",
		"positioner",
		"content",
		"item",
		"itemText",
		"itemIndicator",
		"optionItem",
		"separator",
		"itemGroup",
		"itemGroupLabel",
	],
	base: {
		trigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
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
			zIndex: "{zIndex.dropdown}",
		},

		content: {
			display: "flex",
			flexDirection: "column",
			bg: "{colors.surface.elevated}",
			borderRadius: "{radii.md}",
			boxShadow: "{colors.shadow.lg}",
			border: "1px solid {colors.border.DEFAULT}",
			minWidth: "12rem",
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

		optionItem: {
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

			_disabled: {
				opacity: "0.5",
				cursor: "not-allowed",
			},
		},

		separator: {
			height: "1px",
			bg: "{colors.border.DEFAULT}",
			margin: "{spacing.xs} 0",
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
});


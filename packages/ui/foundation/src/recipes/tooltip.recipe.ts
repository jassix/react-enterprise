import { defineSlotRecipe } from "@pandacss/dev";

export const tooltipRecipe = defineSlotRecipe({
	className: "tooltip",
	description: "Tooltip recipe for contextual information",
	slots: ["trigger", "positioner", "content", "arrow"],
	base: {
		trigger: {
			cursor: "pointer",
		},

		positioner: {
			position: "absolute",
			zIndex: "{zIndex.tooltip}",
		},

		content: {
			position: "relative",
			bg: "{colors.neutral.light.12}",
			color: "white",
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			borderRadius: "{radii.sm}",
			padding: "{spacing.xs} {spacing.sm}",
			maxWidth: "20rem",
			boxShadow: "{colors.shadow.md}",
			
			_dark: {
				bg: "{colors.neutral.dark.12}",
			},
			
			_open: {
				animation: "fadeIn {durations.fast} {easings.easeOut}",
			},
			
			_closed: {
				animation: "fadeOut {durations.fast} {easings.easeIn}",
			},
		},

		arrow: {
			"--arrow-size": "{spacing.xs}",
			"--arrow-background": "{colors.neutral.light.12}",
		},
	},
});


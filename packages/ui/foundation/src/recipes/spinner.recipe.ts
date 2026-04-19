import { defineRecipe } from "@pandacss/dev";

/**
 * Spinner — luma signature: 2px circular ring; border tinted to muted with
 * top edge in the intent color so rotation reads as a spinner.
 */
export const spinnerRecipe = defineRecipe({
	className: "spinner",
	description: "Luma spinner — circular indeterminate loader",
	jsx: ["Spinner"],
	base: {
		display: "inline-block",
		flexShrink: 0,
		color: "currentColor",
	},
	variants: {
		variant: {
			circular: {
				borderRadius: "{radii.full}",
				border: "2px solid {colors.surface.muted}",
				borderTopColor: "currentColor",
				animation: "spin {durations.slower} {easings.linear} infinite",
			},
			dots: { animation: "pulse {durations.slower} {easings.easeInOut} infinite" },
			bars: { animation: "pulse {durations.slower} {easings.easeInOut} infinite" },
		},
		size: {
			xs: { width: "0.75rem", height: "0.75rem" }, // 12
			sm: { width: "1rem", height: "1rem" }, // 16
			md: { width: "1.25rem", height: "1.25rem" }, // 20
			lg: { width: "1.5rem", height: "1.5rem" }, // 24
			xl: { width: "2rem", height: "2rem" }, // 32
		},
		intent: {
			neutral: { color: "{colors.foreground.tertiary}" },
			primary: { color: "{colors.interactive.base}" },
			critical: { color: "{colors.critical.accent}" },
			positive: { color: "{colors.positive.accent}" },
			caution: { color: "{colors.caution.accent}" },
			info: { color: "{colors.info.accent}" },
		},
	},
	defaultVariants: { variant: "circular", size: "md", intent: "primary" },
	compoundVariants: [
		{ variant: "circular", size: "xs", css: { borderWidth: "1px" } },
		{ variant: "circular", size: "xl", css: { borderWidth: "3px" } },
	],
});

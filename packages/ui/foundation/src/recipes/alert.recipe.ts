import { defineRecipe } from "@pandacss/dev";

export const alertRecipe = defineRecipe({
	className: "alert",
	description: "Alert recipe for notifications and messages",
	base: {
		display: "flex",
		alignItems: "flex-start",
		gap: "{spacing.md}",
		padding: "{spacing.lg}",
		borderRadius: "{radii.md}",
		borderLeft: "4px solid",
	},
	variants: {
		status: {
			info: {
				bg: "{colors.info.bg}",
				borderLeftColor: "{colors.info.DEFAULT}",
				color: "{colors.info.text}",
			},
			positive: {
				bg: "{colors.positive.bg}",
				borderLeftColor: "{colors.positive.DEFAULT}",
				color: "{colors.positive.text}",
			},
			caution: {
				bg: "{colors.caution.bg}",
				borderLeftColor: "{colors.caution.DEFAULT}",
				color: "{colors.caution.text}",
			},
			critical: {
				bg: "{colors.critical.bg}",
				borderLeftColor: "{colors.critical.DEFAULT}",
				color: "{colors.critical.text}",
			},
		},
		variant: {
			subtle: {},
			solid: {
				borderLeft: "none",
			},
			outline: {
				bg: "transparent",
				border: "1px solid",
				borderLeft: "4px solid",
			},
		},
	},
	defaultVariants: {
		status: "info",
		variant: "subtle",
	},
	compoundVariants: [
		{
			variant: "solid",
			status: "info",
			css: {
				bg: "{colors.info.DEFAULT}",
				color: "white",
			},
		},
		{
			variant: "solid",
			status: "positive",
			css: {
				bg: "{colors.positive.DEFAULT}",
				color: "white",
			},
		},
		{
			variant: "solid",
			status: "caution",
			css: {
				bg: "{colors.caution.DEFAULT}",
				color: "{colors.caution.text}",
			},
		},
		{
			variant: "solid",
			status: "critical",
			css: {
				bg: "{colors.critical.DEFAULT}",
				color: "white",
			},
		},
	],
});


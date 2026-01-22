import { defineRecipe } from "@pandacss/dev";

export const switchRecipe = defineRecipe({
	className: "switch",
	description: "Switch toggle recipe for form controls",
	base: {
		display: "inline-flex",
		alignItems: "center",
		position: "relative",
		cursor: "pointer",
		bg: "{colors.surface.muted}",
		borderRadius: "{radii.full}",
		transition: "all {durations.fast} {easings.easeInOut}",

		_checked: {
			bg: "{colors.interactive.base}",
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
				width: "32px",
				height: "18px",
			},
			md: {
				width: "44px",
				height: "24px",
			},
			lg: {
				width: "56px",
				height: "32px",
			},
		},
		intent: {
			primary: {},
			critical: {
				_checked: {
					bg: "{colors.critical.DEFAULT}",
				},
			},
			positive: {
				_checked: {
					bg: "{colors.positive.DEFAULT}",
				},
			},
		},
	},
	defaultVariants: {
		size: "md",
		intent: "primary",
	},
});


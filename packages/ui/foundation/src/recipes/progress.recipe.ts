import { defineSlotRecipe } from "@pandacss/dev";

export const progressRecipe = defineSlotRecipe({
	className: "progress",
	description: "Progress recipe for progress indicators",
	slots: ["root", "label", "track", "range", "valueText"],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.sm}",
			width: "100%",
		},

		label: {
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.DEFAULT}",
		},

		track: {
			position: "relative",
			width: "100%",
			height: "{spacing.sm}",
			bg: "{colors.surface.muted}",
			borderRadius: "{radii.full}",
			overflow: "hidden",
		},

		range: {
			height: "100%",
			bg: "{colors.interactive.base}",
			borderRadius: "{radii.full}",
			transition: "width {durations.normal} {easings.easeInOut}",

			"&[data-state='indeterminate']": {
				animation: "progressAnimation 1.5s {easings.easeInOut} infinite",
			},
		},

		valueText: {
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.secondary}",
			textAlign: "right",
		},
	},
	variants: {
		size: {
			xs: {
				track: {
					height: "2px",
				},
			},
			sm: {
				track: {
					height: "{spacing.xs}",
				},
			},
			md: {},
			lg: {
				track: {
					height: "{spacing.md}",
				},
			},
		},
		intent: {
			primary: {},
			critical: {
				range: {
					bg: "{colors.critical.DEFAULT}",
				},
			},
			positive: {
				range: {
					bg: "{colors.positive.DEFAULT}",
				},
			},
			caution: {
				range: {
					bg: "{colors.caution.DEFAULT}",
				},
			},
			info: {
				range: {
					bg: "{colors.info.DEFAULT}",
				},
			},
		},
		variant: {
			linear: {},
			striped: {
				range: {
					backgroundImage:
						"linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)",
					backgroundSize: "1rem 1rem",
				},
			},
		},
	},
	defaultVariants: {
		size: "md",
		intent: "primary",
		variant: "linear",
	},
});


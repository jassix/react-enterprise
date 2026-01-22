import { defineSlotRecipe } from "@pandacss/dev";

export const sliderRecipe = defineSlotRecipe({
	className: "slider",
	description: "Slider recipe for range inputs",
	slots: ["root", "label", "control", "track", "range", "thumb", "valueText", "markerGroup", "marker"],
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

		control: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			width: "100%",
			padding: "{spacing.sm} 0",
			cursor: "pointer",

			_disabled: {
				opacity: "0.5",
				cursor: "not-allowed",
			},
		},

		track: {
			position: "relative",
			flex: "1",
			height: "{spacing.xs}",
			bg: "{colors.surface.muted}",
			borderRadius: "{radii.full}",
			overflow: "hidden",
		},

		range: {
			position: "absolute",
			height: "100%",
			bg: "{colors.interactive.base}",
			borderRadius: "{radii.full}",
			
			_disabled: {
				bg: "{colors.surface.subtle}",
			},
		},

		thumb: {
			position: "absolute",
			width: "{sizes.sm}",
			height: "{sizes.sm}",
			bg: "{colors.interactive.base}",
			border: "2px solid white",
			borderRadius: "{radii.full}",
			boxShadow: "{colors.shadow.md}",
			cursor: "grab",
			transition: "box-shadow {durations.fast} {easings.easeInOut}",
			outline: "none",

			_hover: {
				boxShadow: "{colors.shadow.lg}",
			},

			_dragging: {
				cursor: "grabbing",
				boxShadow: "{colors.shadow.xl}",
			},

			_focus: {
				ring: "2px solid",
				ringColor: "{colors.focus.ring}",
				ringOffset: "{colors.focus.ringOffset}",
			},

			_disabled: {
				bg: "{colors.surface.subtle}",
				cursor: "not-allowed",
			},
		},

		valueText: {
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.secondary}",
		},

		markerGroup: {
			display: "flex",
			justifyContent: "space-between",
			marginTop: "{spacing.xs}",
		},

		marker: {
			fontSize: "{fontSizes.xs}",
			color: "{colors.foreground.tertiary}",
		},
	},
	variants: {
		size: {
			sm: {
				track: {
					height: "2px",
				},
				thumb: {
					width: "{sizes.xs}",
					height: "{sizes.xs}",
				},
			},
			md: {},
			lg: {
				track: {
					height: "{spacing.sm}",
				},
				thumb: {
					width: "{sizes.md}",
					height: "{sizes.md}",
				},
			},
		},
		intent: {
			primary: {},
			critical: {
				range: {
					bg: "{colors.critical.DEFAULT}",
				},
				thumb: {
					bg: "{colors.critical.DEFAULT}",
				},
			},
			positive: {
				range: {
					bg: "{colors.positive.DEFAULT}",
				},
				thumb: {
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


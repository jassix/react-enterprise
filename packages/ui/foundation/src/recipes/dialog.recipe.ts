import { defineSlotRecipe } from "@pandacss/dev";

export const dialogRecipe = defineSlotRecipe({
	className: "dialog",
	description: "Dialog recipe for modal overlays",
	slots: ["backdrop", "positioner", "content", "title", "description", "closeTrigger"],
	base: {
		backdrop: {
			position: "fixed",
			inset: "0",
			zIndex: "{zIndex.overlay}",
			bg: "rgba(0, 0, 0, 0.5)",
			backdropFilter: "blur(4px)",
			
			_open: {
				animation: "fadeIn {durations.normal} {easings.easeOut}",
			},
			
			_closed: {
				animation: "fadeOut {durations.normal} {easings.easeIn}",
			},
		},

		positioner: {
			position: "fixed",
			inset: "0",
			zIndex: "{zIndex.modal}",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "{spacing.lg}",
			overflow: "auto",
		},

		content: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			bg: "{colors.surface.elevated}",
			borderRadius: "{radii.lg}",
			boxShadow: "{colors.shadow.xl}",
			maxWidth: "90vw",
			maxHeight: "90vh",
			
			_open: {
				animation: "slideInFromBottom {durations.normal} {easings.easeOut}",
			},
			
			_closed: {
				animation: "slideOutToBottom {durations.normal} {easings.easeIn}",
			},
		},

		title: {
			fontSize: "{fontSizes.xl}",
			fontWeight: "{fontWeights.semibold}",
			color: "{colors.foreground.DEFAULT}",
			padding: "{spacing.xl}",
			paddingBottom: "{spacing.md}",
		},

		description: {
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground.secondary}",
			padding: "0 {spacing.xl}",
			paddingBottom: "{spacing.lg}",
		},

		closeTrigger: {
			position: "absolute",
			top: "{spacing.lg}",
			right: "{spacing.lg}",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "{sizes.md}",
			height: "{sizes.md}",
			borderRadius: "{radii.sm}",
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
	},
	variants: {
		size: {
			xs: {
				content: {
					width: "20rem",
				},
			},
			sm: {
				content: {
					width: "24rem",
				},
			},
			md: {
				content: {
					width: "32rem",
				},
			},
			lg: {
				content: {
					width: "48rem",
				},
			},
			xl: {
				content: {
					width: "64rem",
				},
			},
			full: {
				content: {
					width: "100%",
					maxWidth: "calc(100vw - 2 * {spacing.lg})",
				},
			},
		},
		centered: {
			true: {
				positioner: {
					alignItems: "center",
				},
			},
			false: {
				positioner: {
					alignItems: "flex-start",
					paddingTop: "{spacing.4xl}",
				},
			},
		},
	},
	defaultVariants: {
		size: "md",
		centered: true,
	},
});


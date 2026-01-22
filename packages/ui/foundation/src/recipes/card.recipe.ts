import { defineRecipe } from "@pandacss/dev";

export const cardRecipe = defineRecipe({
	className: "card",
	description: "Card container recipe with elevation variants",
	base: {
		display: "flex",
		flexDirection: "column",
		position: "relative",
		borderRadius: "{radii.lg}",
		transition: "all {durations.fast} {easings.easeInOut}",
	},
	variants: {
		variant: {
			elevated: {
				bg: "{colors.surface.elevated}",
				boxShadow: "{colors.shadow.md}",

				_hover: {
					boxShadow: "{colors.shadow.lg}",
				},
			},
			outline: {
				bg: "{colors.surface.base}",
				border: "1px solid {colors.border.DEFAULT}",

				_hover: {
					borderColor: "{colors.border.emphasis}",
				},
			},
			filled: {
				bg: "{colors.surface.subtle}",
			},
			ghost: {
				bg: "transparent",
			},
		},
		size: {
			sm: {
				padding: "{spacing.md}",
				gap: "{spacing.sm}",
			},
			md: {
				padding: "{spacing.lg}",
				gap: "{spacing.md}",
			},
			lg: {
				padding: "{spacing.xl}",
				gap: "{spacing.lg}",
			},
			xl: {
				padding: "{spacing.2xl}",
				gap: "{spacing.xl}",
			},
		},
		interactive: {
			true: {
				cursor: "pointer",

				_hover: {
					transform: "translateY(-2px)",
				},

				_active: {
					transform: "translateY(0)",
				},
			},
		},
	},
	defaultVariants: {
		variant: "elevated",
		size: "md",
	},
});


import { defineRecipe } from "@pandacss/dev";

export const avatarRecipe = defineRecipe({
	className: "avatar",
	description: "Avatar recipe for user profile images",
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: "0",
		overflow: "hidden",
		position: "relative",
		verticalAlign: "middle",
		bg: "{colors.surface.muted}",
		color: "{colors.foreground.secondary}",
		fontWeight: "{fontWeights.medium}",

		"& img": {
			width: "100%",
			height: "100%",
			objectFit: "cover",
		},
	},
	variants: {
		size: {
			xs: {
				width: "{sizes.xs}",
				height: "{sizes.xs}",
				fontSize: "{fontSizes.xs}",
			},
			sm: {
				width: "{sizes.sm}",
				height: "{sizes.sm}",
				fontSize: "{fontSizes.sm}",
			},
			md: {
				width: "{sizes.md}",
				height: "{sizes.md}",
				fontSize: "{fontSizes.md}",
			},
			lg: {
				width: "{sizes.lg}",
				height: "{sizes.lg}",
				fontSize: "{fontSizes.lg}",
			},
			xl: {
				width: "{sizes.xl}",
				height: "{sizes.xl}",
				fontSize: "{fontSizes.xl}",
			},
			"2xl": {
				width: "{sizes.2xl}",
				height: "{sizes.2xl}",
				fontSize: "{fontSizes.2xl}",
			},
		},
		shape: {
			circle: {
				borderRadius: "{radii.full}",
			},
			square: {
				borderRadius: "0",
			},
			rounded: {
				borderRadius: "{radii.md}",
			},
		},
	},
	defaultVariants: {
		size: "md",
		shape: "circle",
	},
});


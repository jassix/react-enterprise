import { defineRecipe } from "@pandacss/dev";

/**
 * Avatar — luma signature: circular by default with a muted neutral fallback
 * surface. Sizes snap to the /4 grid (24/32/40/48/56/64). Image fills cover.
 */
export const avatarRecipe = defineRecipe({
	className: "avatar",
	description: "Luma avatar — circular profile container",
	jsx: ["Avatar"],
	base: {
		display: "flex",
		position: "relative",
		flexShrink: 0,
		alignItems: "center",
		justifyContent: "center",
		verticalAlign: "middle",
		bg: "{colors.surface.muted}",
		color: "{colors.foreground.tertiary}",
		fontFamily: "{fonts.body}",
		fontSize: "{fontSizes.sm}",
		fontWeight: "{fontWeights.medium}",
		userSelect: "none",
		overflow: "hidden",

		// Luma `after:border-border after:mix-blend-darken` hairline — softens
		// the edge against the avatar fill. Dark mode flips to `lighten`;
		// using explicit ancestor selectors here avoids Panda's default `_dark`
		// expansion which would emit an invalid `.avatar::after.dark` selector
		// (pseudo-elements can't be followed by class selectors).
		_after: {
			content: "''",
			position: "absolute",
			inset: "0",
			borderRadius: "inherit",
			border: "1px solid {colors.border}",
			mixBlendMode: "darken",
			pointerEvents: "none",
		},
		".dark &::after": { mixBlendMode: "lighten" },
		"[data-theme='dark'] &::after": { mixBlendMode: "lighten" },

		"& img": {
			width: "100%",
			height: "100%",
			objectFit: "cover",
			aspectRatio: "1",
			borderRadius: "inherit",
		},
	},
	variants: {
		size: {
			xs: { width: "1.25rem", height: "1.25rem", fontSize: "{fontSizes.xs}" }, // 20
			sm: { width: "1.5rem", height: "1.5rem", fontSize: "{fontSizes.xs}" }, // 24 — luma `sm` size-6
			md: { width: "2rem", height: "2rem", fontSize: "{fontSizes.sm}" }, // 32 — luma default size-8
			lg: { width: "2.5rem", height: "2.5rem", fontSize: "{fontSizes.md}" }, // 40 — luma `lg` size-10
			xl: { width: "3rem", height: "3rem", fontSize: "{fontSizes.lg}" }, // 48
			"2xl": { width: "4rem", height: "4rem", fontSize: "{fontSizes.xl}" }, // 64
		},
		shape: {
			circle: { borderRadius: "{radii.full}" },
			square: { borderRadius: "0" },
			rounded: { borderRadius: "{radii.lg}" },
		},
	},
	defaultVariants: { size: "md", shape: "circle" },
});

import { defineRecipe } from "@pandacss/dev";

export const skeletonRecipe = defineRecipe({
	className: "skeleton",
	description: "Skeleton loader for loading states",
	base: {
		bg: "{colors.surface.muted}",
		borderRadius: "{radii.md}",
		position: "relative",
		overflow: "hidden",

		_before: {
			content: '""',
			position: "absolute",
			inset: "0",
			transform: "translateX(-100%)",
			bg: "linear-gradient(90deg, transparent, {colors.surface.subtle}, transparent)",
			animation: "skeleton-pulse 1.5s ease-in-out infinite",
		},

		_motionReduce: {
			_before: {
				animation: "none",
			},
		},
	},
	variants: {
		variant: {
			text: {
				height: "1em",
				borderRadius: "{radii.sm}",
			},
			circle: {
				borderRadius: "{radii.full}",
			},
			rect: {},
		},
		speed: {
			slow: {
				_before: {
					animationDuration: "2s",
				},
			},
			normal: {},
			fast: {
				_before: {
					animationDuration: "1s",
				},
			},
		},
	},
	defaultVariants: {
		variant: "rect",
		speed: "normal",
	},
});


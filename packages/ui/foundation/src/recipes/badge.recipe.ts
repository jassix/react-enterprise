import { defineRecipe } from "@pandacss/dev";

export const badgeRecipe = defineRecipe({
	className: "badge",
	description: "Badge recipe for status indicators and labels",
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontFamily: "{fonts.body}",
		fontWeight: "{fontWeights.medium}",
		lineHeight: "{lineHeight.tight}",
		borderRadius: "{radii.md}",
		whiteSpace: "nowrap",
		verticalAlign: "middle",
	},
	variants: {
		variant: {
			solid: {
				bg: "{colors.neutral.light.9}",
				color: "white",
				_dark: {
					bg: "{colors.neutral.dark.9}",
				},
			},
			subtle: {
				bg: "{colors.neutral.light.3}",
				color: "{colors.neutral.light.11}",
				_dark: {
					bg: "{colors.neutral.dark.3}",
					color: "{colors.neutral.dark.11}",
				},
			},
			outline: {
				bg: "transparent",
				color: "{colors.neutral.light.11}",
				border: "1px solid {colors.border.DEFAULT}",
				_dark: {
					color: "{colors.neutral.dark.11}",
				},
			},
		},
		intent: {
			neutral: {},
			accent: {
				bg: "{colors.accent.light.9}",
				color: "white",
				_dark: { bg: "{colors.accent.dark.9}" },
			},
			critical: {
				bg: "{colors.red.light.9}",
				color: "white",
				_dark: { bg: "{colors.red.dark.9}" },
			},
			positive: {
				bg: "{colors.green.light.9}",
				color: "white",
				_dark: { bg: "{colors.green.dark.9}" },
			},
			caution: {
				bg: "{colors.amber.light.9}",
				color: "{colors.amber.light.12}",
				_dark: { bg: "{colors.amber.dark.9}", color: "{colors.amber.dark.12}" },
			},
			info: {
				bg: "{colors.blue.light.9}",
				color: "white",
				_dark: { bg: "{colors.blue.dark.9}" },
			},
		},
		size: {
			sm: {
				fontSize: "{fontSizes.xs}",
				paddingX: "{spacing.xs}",
				height: "{sizes.xs}",
				minHeight: "{sizes.xs}",
			},
			md: {
				fontSize: "{fontSizes.sm}",
				paddingX: "{spacing.sm}",
				height: "{sizes.sm}",
				minHeight: "{sizes.sm}",
			},
			lg: {
				fontSize: "{fontSizes.md}",
				paddingX: "{spacing.md}",
				height: "{sizes.md}",
				minHeight: "{sizes.md}",
			},
		},
	},
	defaultVariants: {
		variant: "subtle",
		intent: "neutral",
		size: "md",
	},
	compoundVariants: [
		{
			variant: "subtle",
			intent: "accent",
			css: {
				bg: "{colors.accent.light.3}",
				color: "{colors.accent.light.11}",
				_dark: {
					bg: "{colors.accent.dark.3}",
					color: "{colors.accent.dark.11}",
				},
			},
		},
		{
			variant: "subtle",
			intent: "critical",
			css: {
				bg: "{colors.red.light.3}",
				color: "{colors.red.light.11}",
				_dark: {
					bg: "{colors.red.dark.3}",
					color: "{colors.red.dark.11}",
				},
			},
		},
		{
			variant: "subtle",
			intent: "positive",
			css: {
				bg: "{colors.green.light.3}",
				color: "{colors.green.light.11}",
				_dark: {
					bg: "{colors.green.dark.3}",
					color: "{colors.green.dark.11}",
				},
			},
		},
		{
			variant: "subtle",
			intent: "caution",
			css: {
				bg: "{colors.amber.light.3}",
				color: "{colors.amber.light.11}",
				_dark: {
					bg: "{colors.amber.dark.3}",
					color: "{colors.amber.dark.11}",
				},
			},
		},
		{
			variant: "subtle",
			intent: "info",
			css: {
				bg: "{colors.blue.light.3}",
				color: "{colors.blue.light.11}",
				_dark: {
					bg: "{colors.blue.dark.3}",
					color: "{colors.blue.dark.11}",
				},
			},
		},
	],
});


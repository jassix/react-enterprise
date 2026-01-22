import { defineRecipe } from "@pandacss/dev";

export const buttonRecipe = defineRecipe({
	className: "button",
	description: "Button recipe with multiple variants and sizes",
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		gap: "{spacing.sm}",
		fontFamily: "{fonts.body}",
		fontWeight: "{fontWeights.medium}",
		lineHeight: "{lineHeight.tight}",
		borderRadius: "{radii.md}",
		outline: "none",
		cursor: "pointer",
		transition: "all {durations.fast} {easings.easeInOut}",
		userSelect: "none",
		whiteSpace: "nowrap",

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
		variant: {
			solid: {
				bg: "{colors.interactive.base}",
				color: "white",
				border: "none",

				_hover: {
					bg: "{colors.interactive.hover}",
				},

				_active: {
					bg: "{colors.interactive.active}",
				},
			},
			outline: {
				bg: "transparent",
				color: "{colors.interactive.base}",
				border: "1px solid {colors.border.DEFAULT}",

				_hover: {
					bg: "{colors.surface.subtle}",
					borderColor: "{colors.interactive.hover}",
				},

				_active: {
					bg: "{colors.surface.muted}",
				},
			},
			ghost: {
				bg: "transparent",
				color: "{colors.interactive.base}",
				border: "none",

				_hover: {
					bg: "{colors.surface.subtle}",
				},

				_active: {
					bg: "{colors.surface.muted}",
				},
			},
			link: {
				bg: "transparent",
				color: "{colors.interactive.link}",
				border: "none",
				padding: "0",
				height: "auto",
				minHeight: "auto",

				_hover: {
					textDecoration: "underline",
					color: "{colors.interactive.linkHover}",
				},
			},
		},
		intent: {
			primary: {},
			critical: {
				bg: "{colors.critical.DEFAULT}",
				_hover: { bg: "{colors.critical.emphasis}" },
			},
			positive: {
				bg: "{colors.positive.DEFAULT}",
				_hover: { bg: "{colors.positive.emphasis}" },
			},
			caution: {
				bg: "{colors.caution.DEFAULT}",
				_hover: { bg: "{colors.caution.emphasis}" },
			},
			info: {
				bg: "{colors.info.DEFAULT}",
				_hover: { bg: "{colors.info.emphasis}" },
			},
		},
		size: {
			xs: {
				height: "{sizes.xs}",
				minHeight: "{sizes.xs}",
				fontSize: "{fontSizes.xs}",
				paddingX: "{spacing.sm}",
			},
			sm: {
				height: "{sizes.sm}",
				minHeight: "{sizes.sm}",
				fontSize: "{fontSizes.sm}",
				paddingX: "{spacing.md}",
			},
			md: {
				height: "{sizes.md}",
				minHeight: "{sizes.md}",
				fontSize: "{fontSizes.md}",
				paddingX: "{spacing.lg}",
			},
			lg: {
				height: "{sizes.lg}",
				minHeight: "{sizes.lg}",
				fontSize: "{fontSizes.lg}",
				paddingX: "{spacing.xl}",
			},
			xl: {
				height: "{sizes.xl}",
				minHeight: "{sizes.xl}",
				fontSize: "{fontSizes.xl}",
				paddingX: "{spacing.2xl}",
			},
		},
		stretched: {
			true: {
				width: "100%",
			},
		},
		icon: {
			true: {
				padding: "0",
				aspectRatio: 1
			}
		}
	},
	defaultVariants: {
		variant: "solid",
		intent: "primary",
		size: "md",
	},
	compoundVariants: [
		{
			variant: "outline",
			intent: "critical",
			css: {
				color: "{colors.critical.text}",
				borderColor: "{colors.border.critical}",
				_hover: { borderColor: "{colors.critical.emphasis}" },
			},
		},
		{
			variant: "outline",
			intent: "positive",
			css: {
				color: "{colors.positive.text}",
				borderColor: "{colors.border.positive}",
				_hover: { borderColor: "{colors.positive.emphasis}" },
			},
		},
		{
			variant: "outline",
			intent: "caution",
			css: {
				color: "{colors.caution.text}",
				borderColor: "{colors.border.caution}",
				_hover: { borderColor: "{colors.caution.emphasis}" },
			},
		},
		{
			variant: "outline",
			intent: "info",
			css: {
				color: "{colors.info.text}",
				borderColor: "{colors.border.info}",
				_hover: { borderColor: "{colors.info.emphasis}" },
			},
		},
	],
});


import { defineRecipe } from "@pandacss/dev";

/**
 * Badge — luma signature: 20px (`h-5`) rounded-3xl chip with py-0.5/px-2
 * padding, 12px svg, transparent border that lights up on `focus-visible` and
 * adopts the critical halo on `aria-invalid`. `default` variant uses the blue
 * primary fill to match luma — secondary / outline / ghost / destructive /
 * link mirror Button's variants but at the tighter scale.
 */
export const badgeRecipe = defineRecipe({
	className: "badge",
	description: "Luma badge — 20px chip following Button's variant + intent system",
	jsx: ["Badge"],
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		gap: "{spacing.xs}", // 4
		width: "fit-content",
		fontFamily: "{fonts.body}",
		fontSize: "{fontSizes.xs}", // 12
		fontWeight: "{fontWeights.medium}",
		lineHeight: "1",
		whiteSpace: "nowrap",
		verticalAlign: "middle",
		overflow: "hidden",
		border: "1px solid transparent",
		borderRadius: "{radii.3xl}",
		backgroundClip: "padding-box",
		paddingInline: "{spacing.sm}", // 8 — luma `px-2`
		paddingBlock: "0.125rem", // 2 — luma `py-0.5`
		height: "1.25rem", // 20 — luma `h-5`
		minHeight: "1.25rem",
		transition: "all {durations.press} {easings.easeOut}",

		"& > svg": {
			width: "0.75rem", // 12 — luma `size-3`
			height: "0.75rem",
			pointerEvents: "none",
			flexShrink: 0,
		},

		// Inline icon padding adjustments — mirrors luma's `has-data-[icon=…]:pr-1.5 / pl-1.5`.
		"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.xs}" }, // 4 ~ 1.5 × 4
		"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.xs}" },

		_focusVisible: {
			borderColor: "{colors.focus.ring}",
			boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 50%, transparent)",
		},

		"&[aria-invalid='true']": {
			borderColor: "{colors.critical}",
			boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
			_dark: {
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
			},
		},
	},
	variants: {
		variant: {
			default: {
				bg: "{colors.interactive.base}",
				color: "{colors.foreground.inverse}",
				"& a:hover, a&:hover": {
					bg: "color-mix(in oklab, {colors.interactive.base} 80%, transparent)",
				},
			},
			secondary: {
				bg: "{colors.interactive.secondary}",
				color: "{colors.foreground.secondary}",
				"& a:hover, a&:hover": {
					bg: "color-mix(in oklab, {colors.interactive.secondary} 80%, transparent)",
				},
			},
			destructive: {
				bg: "color-mix(in oklab, {colors.critical} 10%, transparent)",
				color: "{colors.critical.text}",
				"& a:hover, a&:hover": {
					bg: "color-mix(in oklab, {colors.critical} 20%, transparent)",
				},
				_focusVisible: {
					boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
				},
				_dark: {
					bg: "color-mix(in oklab, {colors.critical} 20%, transparent)",
					_focusVisible: {
						boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
					},
				},
			},
			outline: {
				bg: "color-mix(in oklab, {colors.interactive.base} 10%, transparent)",
				color: "{colors.foreground}",
				borderColor: "{colors.border}",
				"& a:hover, a&:hover": {
					bg: "color-mix(in oklab, {colors.interactive.base} 20%, transparent)",
					color: "{colors.foreground.tertiary}",
				},
				_dark: {
					bg: "color-mix(in oklab, {colors.interactive.base} 20%, transparent)",
				},
			},
			ghost: {
				bg: "transparent",
				color: "{colors.foreground}",
				_hover: {
					bg: "{colors.surface.muted}",
					color: "{colors.foreground.tertiary}",
				},
				_dark: {
					_hover: {
						bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)",
					},
				},
			},
			link: {
				bg: "transparent",
				color: "{colors.interactive.link}",
				textUnderlineOffset: "4px",
				_hover: { textDecoration: "underline" },
			},
		},
		intent: {
			primary: {},
			critical: {},
			positive: {},
			caution: {},
			info: {},
		},
		size: {
			sm: {
				height: "1.125rem", // 18
				minHeight: "1.125rem",
				paddingInline: "{spacing.xs}",
				fontSize: "0.6875rem",
			},
			md: {
				height: "1.25rem", // 20 — luma `h-5`
				minHeight: "1.25rem",
				paddingInline: "{spacing.sm}",
			},
			lg: {
				height: "1.5rem", // 24
				minHeight: "1.5rem",
				paddingInline: "{spacing.md}",
				fontSize: "{fontSizes.sm}",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
	compoundVariants: [
		// default × intent: swap fill
		{
			variant: "default",
			intent: "critical",
			css: { bg: "{colors.critical.accent}", color: "{colors.foreground.inverse}" },
		},
		{
			variant: "default",
			intent: "positive",
			css: { bg: "{colors.positive.accent}", color: "{colors.foreground.inverse}" },
		},
		{
			variant: "default",
			intent: "caution",
			css: { bg: "{colors.caution.accent}", color: "{colors.foreground}" },
		},
		{
			variant: "default",
			intent: "info",
			css: { bg: "{colors.info.accent}", color: "{colors.foreground.inverse}" },
		},
		// outline × intent: tint bg + border + text
		{
			variant: "outline",
			intent: "critical",
			css: {
				bg: "color-mix(in oklab, {colors.critical} 10%, transparent)",
				color: "{colors.critical.text}",
				borderColor: "{colors.border.critical}",
				_dark: { bg: "color-mix(in oklab, {colors.critical} 20%, transparent)" },
			},
		},
		{
			variant: "outline",
			intent: "positive",
			css: {
				bg: "color-mix(in oklab, {colors.positive} 10%, transparent)",
				color: "{colors.positive.text}",
				borderColor: "{colors.border.positive}",
				_dark: { bg: "color-mix(in oklab, {colors.positive} 20%, transparent)" },
			},
		},
		{
			variant: "outline",
			intent: "caution",
			css: {
				bg: "color-mix(in oklab, {colors.caution} 10%, transparent)",
				color: "{colors.caution.text}",
				borderColor: "{colors.border.caution}",
				_dark: { bg: "color-mix(in oklab, {colors.caution} 20%, transparent)" },
			},
		},
		{
			variant: "outline",
			intent: "info",
			css: {
				bg: "color-mix(in oklab, {colors.info} 10%, transparent)",
				color: "{colors.info.text}",
				borderColor: "{colors.border.info}",
				_dark: { bg: "color-mix(in oklab, {colors.info} 20%, transparent)" },
			},
		},
		// ghost × intent: tint text
		{ variant: "ghost", intent: "critical", css: { color: "{colors.critical.text}" } },
		{ variant: "ghost", intent: "positive", css: { color: "{colors.positive.text}" } },
		{ variant: "ghost", intent: "caution", css: { color: "{colors.caution.text}" } },
		{ variant: "ghost", intent: "info", css: { color: "{colors.info.text}" } },
		// link × intent: tint text
		{ variant: "link", intent: "critical", css: { color: "{colors.critical.text}" } },
		{ variant: "link", intent: "positive", css: { color: "{colors.positive.text}" } },
		{ variant: "link", intent: "caution", css: { color: "{colors.caution.text}" } },
		{ variant: "link", intent: "info", css: { color: "{colors.info.text}" } },
	],
});

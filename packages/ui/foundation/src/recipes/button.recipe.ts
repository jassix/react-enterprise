import { defineRecipe } from "@pandacss/dev";

/**
 * Button — luma/shadcn signature: rounded-4xl chip, 1px transparent border
 * that lights up to the focus ring on `:focus-visible`, press translates Y by
 * 1px (skipped on `[aria-haspopup]` triggers so menus don't jitter),
 * `aria-invalid` adopts the critical halo, semi-transparent destructive fill.
 *
 * Every spatial value is on the 4px grid: heights and paddings are 4/8/12/16/24
 * px, gaps are 4 or 8 px, radius pulls from the /4-aligned `radii.*` scale.
 */
export const buttonRecipe = defineRecipe({
	className: "button",
	description: "Luma button — variants: default/secondary/outline/ghost/destructive/link",
	jsx: ["Button"],
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		gap: "{spacing.xs}", // 4px — luma `gap-1`/`gap-1.5` average; round down to /4
		fontFamily: "{fonts.body}",
		fontSize: "{fontSizes.sm}", // 14px — luma `text-sm`
		fontWeight: "{fontWeights.medium}",
		lineHeight: "{lineHeight.tight}",
		whiteSpace: "nowrap",
		userSelect: "none",
		cursor: "pointer",
		outline: "none",
		border: "1px solid transparent",
		borderRadius: "{radii.4xl}", // 28px — luma `rounded-4xl` snapped to /4
		backgroundClip: "padding-box",
		// Luma uses `transition-all` on buttons — broad transition keeps every
		// state change (bg, border, shadow, transform) on the same press tempo.
		transition: "all {durations.press} {easings.easeOut}",

		"& svg": {
			pointerEvents: "none",
			flexShrink: 0,
		},
		"& svg:not([class*='size-'])": {
			width: "1rem",
			height: "1rem",
		},

		"&:not([aria-haspopup]):active": {
			transform: "translateY(1px)",
		},

		_disabled: {
			pointerEvents: "none",
			opacity: "0.5",
		},

		_focusVisible: {
			borderColor: "{colors.focus.ring}",
			boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
		},

		"&[aria-invalid='true']": {
			borderColor: "{colors.critical}",
			boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
			_dark: {
				borderColor: "color-mix(in oklab, {colors.critical} 50%, transparent)",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
			},
		},

		"@media (prefers-reduced-motion: reduce)": {
			"&:not([aria-haspopup]):active": { transform: "none" },
		},
	},
	variants: {
		variant: {
			default: {
				bg: "{colors.interactive.base}",
				color: "{colors.foreground.inverse}",
				_hover: {
					bg: "color-mix(in oklab, {colors.interactive.base} 80%, transparent)",
				},
			},
			secondary: {
				bg: "{colors.interactive.secondary}",
				color: "{colors.foreground.secondary}",
				_hover: {
					bg: "color-mix(in oklab, {colors.interactive.secondary} 80%, transparent)",
				},
				"&[aria-expanded='true']": {
					bg: "{colors.interactive.secondary}",
					color: "{colors.foreground.secondary}",
				},
			},
			outline: {
				bg: "{colors.background}",
				color: "{colors.foreground}",
				borderColor: "{colors.border}",
				_hover: {
					bg: "{colors.surface.muted}",
					color: "{colors.foreground}",
				},
				"&[aria-expanded='true']": {
					bg: "{colors.surface.muted}",
					color: "{colors.foreground}",
				},
				_dark: {
					bg: "transparent",
					_hover: {
						bg: "color-mix(in oklab, {colors.border} 30%, transparent)",
					},
				},
			},
			ghost: {
				bg: "transparent",
				color: "{colors.foreground}",
				_hover: {
					bg: "{colors.surface.muted}",
					color: "{colors.foreground}",
				},
				"&[aria-expanded='true']": {
					bg: "{colors.surface.muted}",
					color: "{colors.foreground}",
				},
				_dark: {
					_hover: {
						bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)",
					},
				},
			},
			destructive: {
				bg: "color-mix(in oklab, {colors.critical} 10%, transparent)",
				color: "{colors.critical.text}",
				_hover: {
					bg: "color-mix(in oklab, {colors.critical} 20%, transparent)",
				},
				_focusVisible: {
					borderColor: "color-mix(in oklab, {colors.critical} 40%, transparent)",
					boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
				},
				_dark: {
					bg: "color-mix(in oklab, {colors.critical} 20%, transparent)",
					_hover: {
						bg: "color-mix(in oklab, {colors.critical} 30%, transparent)",
					},
					_focusVisible: {
						boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
					},
				},
			},
			link: {
				bg: "transparent",
				color: "{colors.interactive.link}",
				height: "auto",
				minHeight: "auto",
				padding: "0",
				border: "none",
				textUnderlineOffset: "4px",
				_hover: {
					textDecoration: "underline",
					color: "{colors.interactive.linkHover}",
				},
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
			xs: {
				height: "1.5rem", // 24px
				minHeight: "1.5rem",
				paddingInline: "{spacing.md}", // 12px (luma px-2.5 → /4 = 12)
				fontSize: "{fontSizes.xs}",
				gap: "{spacing.xs}", // 4px
				"& svg:not([class*='size-'])": {
					width: "0.75rem",
					height: "0.75rem",
				},
				"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.sm}" }, // 8
				"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.sm}" },
			},
			sm: {
				height: "2rem", // 32px
				minHeight: "2rem",
				paddingInline: "{spacing.md}", // 12
				gap: "{spacing.xs}", // 4
				"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.sm}" }, // 8
				"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.sm}" },
			},
			md: {
				height: "2.25rem", // 36px — luma h-9
				minHeight: "2.25rem",
				paddingInline: "{spacing.md}", // 12
				"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.md}" }, // 12 (luma 10 → /4 = 12)
				"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.md}" },
			},
			lg: {
				height: "2.5rem", // 40px — luma h-10
				minHeight: "2.5rem",
				paddingInline: "{spacing.lg}", // 16
				"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.md}" }, // 12
				"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.md}" },
			},
			xl: {
				height: "2.75rem", // 44px
				minHeight: "2.75rem",
				paddingInline: "{spacing.xl}", // 24
				fontSize: "{fontSizes.md}",
			},
		},
		// Boolean: makes the button square (width follows height via aspect-ratio)
		// and drops inline padding. Combine with any `size` to get the matching
		// luma icon-button heights — `<Button icon size="sm" />` ≈ luma `icon-sm`.
		icon: {
			true: {
				paddingInline: "0",
				aspectRatio: "1",
				// Cancel the `has(data-icon)` paddings the size variants add for
				// inline icon slots — irrelevant on a square icon-only button.
				"&:has([data-icon='inline-end'])": { paddingInlineEnd: "0" },
				"&:has([data-icon='inline-start'])": { paddingInlineStart: "0" },
			},
		},
		stretched: {
			true: {
				width: "100%",
			},
		},
	},
	defaultVariants: {
		variant: "default",
		size: "md",
	},
	compoundVariants: [
		// ─── default (filled) × intent ─────────────────────────────────────────
		// Swap the fill to the semantic accent. Caution keeps dark text because
		// its base luminance (oklch ~0.78L) is too light for foreground.inverse.
		{
			variant: "default",
			intent: "critical",
			css: {
				bg: "{colors.critical.accent}",
				color: "{colors.foreground.inverse}",
				_hover: { bg: "{colors.critical.emphasis}" },
			},
		},
		{
			variant: "default",
			intent: "positive",
			css: {
				bg: "{colors.positive.accent}",
				color: "{colors.foreground.inverse}",
				_hover: { bg: "{colors.positive.emphasis}" },
			},
		},
		{
			variant: "default",
			intent: "caution",
			css: {
				bg: "{colors.caution.accent}",
				color: "{colors.foreground}",
				_hover: { bg: "{colors.caution.emphasis}" },
			},
		},
		{
			variant: "default",
			intent: "info",
			css: {
				bg: "{colors.info.accent}",
				color: "{colors.foreground.inverse}",
				_hover: { bg: "{colors.info.emphasis}" },
			},
		},

		// ─── outline × intent ───── tint border + text ──────────────────────────
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

		// ─── ghost × intent ───── tint text + a soft hover wash ────────────────
		{
			variant: "ghost",
			intent: "critical",
			css: {
				color: "{colors.critical.text}",
				_hover: {
					bg: "color-mix(in oklab, {colors.critical} 10%, transparent)",
					color: "{colors.critical.text}",
				},
			},
		},
		{
			variant: "ghost",
			intent: "positive",
			css: {
				color: "{colors.positive.text}",
				_hover: {
					bg: "color-mix(in oklab, {colors.positive} 10%, transparent)",
					color: "{colors.positive.text}",
				},
			},
		},
		{
			variant: "ghost",
			intent: "caution",
			css: {
				color: "{colors.caution.text}",
				_hover: {
					bg: "color-mix(in oklab, {colors.caution} 10%, transparent)",
					color: "{colors.caution.text}",
				},
			},
		},
		{
			variant: "ghost",
			intent: "info",
			css: {
				color: "{colors.info.text}",
				_hover: {
					bg: "color-mix(in oklab, {colors.info} 10%, transparent)",
					color: "{colors.info.text}",
				},
			},
		},

		// ─── link × intent ───── tint text only ────────────────────────────────
		{
			variant: "link",
			intent: "critical",
			css: {
				color: "{colors.critical.text}",
				_hover: { color: "{colors.critical.emphasis}" },
			},
		},
		{
			variant: "link",
			intent: "positive",
			css: {
				color: "{colors.positive.text}",
				_hover: { color: "{colors.positive.emphasis}" },
			},
		},
		{
			variant: "link",
			intent: "caution",
			css: {
				color: "{colors.caution.text}",
				_hover: { color: "{colors.caution.emphasis}" },
			},
		},
		{
			variant: "link",
			intent: "info",
			css: {
				color: "{colors.info.text}",
				_hover: { color: "{colors.info.emphasis}" },
			},
		},
	],
});

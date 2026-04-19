import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Toggle — luma signature: ghost-button shape that swaps to a muted bg + bolder
 * text when pressed (`data-state=on` / `aria-pressed=true`). Sizes match Button.
 *
 * **Fluid transition**: the root crossfades bg/color over `durations.normal`
 * with ease-out — slower than the press snap so the state change reads as a
 * smooth wash, not a flicker. The press itself stays snappy via `translateY(1px)`.
 *
 * **Force-mounted indicator**: the consumer renders `<Toggle.Indicator>` once
 * and we control its appearance entirely via CSS — fade + scale on the parent's
 * `data-state="on"`. The element is always in the DOM (Ark's `forceMount`
 * prop), so both fill-in and fill-out animations play. Never `display: none`.
 */
export const toggleRecipe = defineSlotRecipe({
	className: "toggle",
	description: "Luma toggle — pressable ghost-button with fluid indicator",
	jsx: ["Toggle"],
	slots: ["root", "indicator"],
	base: {
		root: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "{spacing.sm}",
			fontFamily: "{fonts.body}",
			fontWeight: "{fontWeights.medium}",
			lineHeight: "{lineHeight.tight}",
			borderRadius: "{radii.3xl}", // 24 — luma `rounded-3xl`
			bg: "transparent",
			color: "{colors.foreground}",
			border: "1px solid transparent",
			cursor: "pointer",
			outline: "none",
			userSelect: "none",
			whiteSpace: "nowrap",
			backgroundClip: "padding-box",
			// Fluid wash for color/bg/border, snappy for transform — different
			// curves so the state change reads as smooth without sluggish presses.
			transition: "background-color {durations.normal} {easings.easeOut}, color {durations.normal} {easings.easeOut}, border-color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}, transform {durations.press} {easings.easeOut}",

			"& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },

			_hover: { bg: "{colors.surface.muted}" },

			"&:not([aria-haspopup]):active": { transform: "translateY(1px)" },

			_disabled: { pointerEvents: "none", cursor: "not-allowed", opacity: "0.5" },

			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},

			'&[data-state="on"], &[data-pressed="true"], &[aria-pressed="true"]': {
				bg: "{colors.interactive.secondary}",
				color: "{colors.foreground}",
			},

			"@media (prefers-reduced-motion: reduce)": {
				transition: "background-color {durations.fast} {easings.easeOut}, color {durations.fast} {easings.easeOut}, border-color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}",
				"&:not([aria-haspopup]):active": { transform: "none" },
			},
		},

		// Always rendered. Visibility comes from the parent's pressed state via
		// opacity + scale — never display:none, so the exit animation can play.
		// **Layout collapse**: when off, width and the inline-start margin both
		// shrink to 0 (the negative margin eats the parent's flex `gap`), so the
		// toggle's overall width contracts around its text. When on, width
		// expands back to `1rem` (the inline svg size) and margin returns to 0,
		// re-introducing the gap. Spring easing on the transform gives the
		// fill-in a subtle bounce; everything else uses ease-out for a clean
		// dismissal.
		indicator: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: 0,
			width: "0",
			marginInlineStart: "calc({spacing.sm} * -1)",
			overflow: "hidden",
			opacity: "0",
			transform: "scale(0.85)",
			transformOrigin: "center",
			willChange: "opacity, transform, width, margin",
			transition: "width {durations.normal} {easings.easeOut}, margin-inline-start {durations.normal} {easings.easeOut}, opacity {durations.normal} {easings.easeOut}, transform {durations.normal} {easings.spring}",

			"& svg:not([class*='size-'])": { width: "1rem", height: "1rem", flexShrink: 0 },

			// Parent-state activation. `:where()` keeps specificity low so consumers
			// can override per-instance with `css={{ opacity: 0.5 }}` if needed.
			':where([data-state="on"], [data-pressed="true"], [aria-pressed="true"]) &': {
				width: "1rem",
				marginInlineStart: "0",
				opacity: "1",
				transform: "scale(1)",
			},

			"@media (prefers-reduced-motion: reduce)": {
				transition: "width {durations.fast} {easings.easeOut}, margin-inline-start {durations.fast} {easings.easeOut}, opacity {durations.fast} {easings.easeOut}",
				transform: "none",
				':where([data-state="on"], [data-pressed="true"], [aria-pressed="true"]) &': {
					transform: "none",
				},
			},
		},
	},
	variants: {
		variant: {
			default: {},
			outline: {
				root: {
					borderColor: "{colors.border}",
					_hover: { bg: "{colors.surface.muted}" },
				},
			},
		},
		// Recolors the pressed state. `primary` keeps the base neutral chip; the
		// other intents shift to a 10%-alpha intent fill + intent text. The
		// indicator inherits its color from the parent so the icon recolors too.
		intent: {
			primary: {},
			critical: {
				root: {
					'&[data-state="on"], &[data-pressed="true"], &[aria-pressed="true"]': {
						bg: "color-mix(in oklab, {colors.critical} 10%, transparent)",
						color: "{colors.critical.text}",
					},
				},
			},
			positive: {
				root: {
					'&[data-state="on"], &[data-pressed="true"], &[aria-pressed="true"]': {
						bg: "color-mix(in oklab, {colors.positive} 10%, transparent)",
						color: "{colors.positive.text}",
					},
				},
			},
			caution: {
				root: {
					'&[data-state="on"], &[data-pressed="true"], &[aria-pressed="true"]': {
						bg: "color-mix(in oklab, {colors.caution} 10%, transparent)",
						color: "{colors.caution.text}",
					},
				},
			},
			info: {
				root: {
					'&[data-state="on"], &[data-pressed="true"], &[aria-pressed="true"]': {
						bg: "color-mix(in oklab, {colors.info} 10%, transparent)",
						color: "{colors.info.text}",
					},
				},
			},
		},
		size: {
			xs: { root: { height: "1.5rem", minWidth: "1.5rem", paddingInline: "{spacing.md}", fontSize: "{fontSizes.xs}" } },
			sm: { root: { height: "2rem", minWidth: "2rem", paddingInline: "{spacing.md}", fontSize: "{fontSizes.sm}" } },
			md: { root: { height: "2.25rem", minWidth: "2.25rem", paddingInline: "{spacing.md}", fontSize: "{fontSizes.sm}" } },
			lg: { root: { height: "2.5rem", minWidth: "2.5rem", paddingInline: "{spacing.lg}", fontSize: "{fontSizes.sm}" } },
		},
		icon: {
			true: { root: { paddingInline: "0", aspectRatio: "1" } },
		},
	},
	defaultVariants: { variant: "default", intent: "primary", size: "md" },
});

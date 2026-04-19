import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Slider — luma signature: short pill track in muted surface, filled range
 * in `interactive.base`, circular thumb with the standard focus ring.
 * Intent compounds re-color the range + thumb.
 */
export const sliderRecipe = defineSlotRecipe({
	className: "slider",
	description: "Luma slider — pill track + circular thumb with intent",
	jsx: ["Slider"],
	slots: [
		"root",
		"label",
		"control",
		"track",
		"range",
		"thumb",
		"valueText",
		"markerGroup",
		"marker",
	],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.sm}",
			width: "100%",
		},

		label: {
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground}",
		},

		control: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			width: "100%",
			padding: "{spacing.sm} 0",
			cursor: "pointer",

			_disabled: { opacity: "0.5", cursor: "not-allowed" },
		},

		track: {
			position: "relative",
			flex: "1",
			borderRadius: "{radii.full}",
			bg: "color-mix(in oklab, {colors.border} 90%, transparent)", // luma `bg-input/90`
			overflow: "hidden",
			userSelect: "none",

			"&[data-orientation='horizontal'], [data-orientation='horizontal'] &": {
				height: "0.5rem", // 8 — luma `h-2`
				width: "100%",
			},
			"&[data-orientation='vertical'], [data-orientation='vertical'] &": {
				width: "0.5rem",
				height: "100%",
			},
		},

		range: {
			position: "absolute",
			bg: "{colors.interactive.base}",
			borderRadius: "{radii.full}",
			userSelect: "none",

			"[data-orientation='horizontal'] &": { height: "100%" },
			"[data-orientation='vertical'] &": { width: "100%" },

			_disabled: { bg: "{colors.surface.subtle}" },
		},

		// Luma thumb: 16×24 rounded-full pill (wider than tall) in white with a
		// 1px black/10 ring and `shadow-md`; hover/focus expands ring to 4px of
		// focus/30.
		thumb: {
			display: "block",
			flexShrink: 0,
			borderRadius: "{radii.full}",
			bg: "white",
			boxShadow: "0 1px 2px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 0 0 1px rgb(0 0 0 / 0.1)",
			cursor: "grab",
			outline: "none",
			userSelect: "none",
			transition: "all {durations.press} {easings.easeOut}",
			backgroundClip: "padding-box",

			"&[data-orientation='horizontal'], [data-orientation='horizontal'] &": {
				height: "1rem", // 16 — luma `h-4`
				width: "1.5rem", // 24 — luma `w-6`
			},
			"&[data-orientation='vertical'], [data-orientation='vertical'] &": {
				height: "1.5rem",
				width: "1rem",
			},

			_hover: {
				boxShadow:
					"0 1px 2px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 0 0 1px rgb(0 0 0 / 0.1), 0 0 0 4px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},

			_focusVisible: {
				boxShadow:
					"0 1px 2px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1), 0 0 0 1px rgb(0 0 0 / 0.1), 0 0 0 4px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},

			_dragging: { cursor: "grabbing" },

			_disabled: { cursor: "not-allowed", pointerEvents: "none" },
		},

		valueText: {
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.tertiary}",
		},

		markerGroup: {
			display: "flex",
			justifyContent: "space-between",
			marginTop: "{spacing.xs}",
		},

		marker: {
			fontSize: "{fontSizes.xs}",
			color: "{colors.foreground.tertiary}",
		},
	},
	variants: {
		size: {
			sm: {
				track: { height: "0.25rem" }, // 4
				thumb: { width: "0.75rem", height: "0.75rem" },
			},
			md: {},
			lg: {
				track: { height: "0.75rem" }, // 12
				thumb: { width: "1.25rem", height: "1.25rem" },
			},
		},
		intent: {
			primary: {},
			critical: {},
			positive: {},
			caution: {},
			info: {},
		},
	},
	defaultVariants: {
		size: "md",
		intent: "primary",
	},
	compoundVariants: [
		{
			intent: "critical",
			css: { range: { bg: "{colors.critical.accent}" }, thumb: { borderColor: "{colors.critical.accent}" } },
		},
		{
			intent: "positive",
			css: { range: { bg: "{colors.positive.accent}" }, thumb: { borderColor: "{colors.positive.accent}" } },
		},
		{
			intent: "caution",
			css: { range: { bg: "{colors.caution.accent}" }, thumb: { borderColor: "{colors.caution.accent}" } },
		},
		{
			intent: "info",
			css: { range: { bg: "{colors.info.accent}" }, thumb: { borderColor: "{colors.info.accent}" } },
		},
	],
});

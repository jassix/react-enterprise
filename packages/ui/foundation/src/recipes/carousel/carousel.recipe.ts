import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Carousel — luma signature: overflow-hidden viewport holds a flex track
 * (`-ml-4` / `-mt-4` to cancel item padding). Items `shrink-0 basis-full`
 * with `pl-4` / `pt-4` per-item padding — the negative-margin + per-item-
 * padding idiom produces visual gaps without breaking sibling flex-basis
 * math. Prev / next triggers are positioned OUTSIDE the carousel bounds
 * (`-left-12` / `-right-12`) and mirror the button outline-icon-sm chip.
 */
export const carouselRecipe = defineSlotRecipe({
	className: "carousel",
	description: "Luma carousel — embla viewport with outside prev / next triggers",
	jsx: ["Carousel"],
	slots: [
		"root",
		"viewport",
		"itemGroup",
		"item",
		"prevTrigger",
		"nextTrigger",
		"indicatorGroup",
		"indicator",
	],
	base: {
		root: {
			position: "relative",
			width: "100%",
		},

		viewport: {
			overflow: "hidden",
			width: "100%",
		},

		itemGroup: {
			display: "flex",
			transition: "transform {durations.normal} {easings.easeOut}",
		},

		item: {
			minWidth: "0",
			flexShrink: 0,
			flexGrow: 0,
			flexBasis: "100%",
			position: "relative",
		},

		// Prev / next mirror `<Button variant="outline" size="icon-sm">` positioned
		// outside the viewport.
		prevTrigger: {
			position: "absolute",
			top: "50%",
			insetInlineStart: "-3rem", // -48 — luma `-left-12`
			transform: "translateY(-50%)",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "2rem", // 32 — luma icon-sm
			height: "2rem",
			borderRadius: "{radii.full}",
			bg: "{colors.background}",
			color: "{colors.foreground}",
			border: "1px solid {colors.border}",
			cursor: "pointer",
			outline: "none",
			touchAction: "manipulation",
			transition: "all {durations.press} {easings.easeOut}",
			zIndex: "1",

			"& svg": { width: "1rem", height: "1rem", pointerEvents: "none" },

			_hover: { bg: "{colors.surface.muted}" },
			_disabled: { opacity: "0.5", cursor: "not-allowed" },

			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},

			_dark: { bg: "transparent" },
		},

		nextTrigger: {
			position: "absolute",
			top: "50%",
			insetInlineEnd: "-3rem", // -48 — luma `-right-12`
			transform: "translateY(-50%)",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "2rem",
			height: "2rem",
			borderRadius: "{radii.full}",
			bg: "{colors.background}",
			color: "{colors.foreground}",
			border: "1px solid {colors.border}",
			cursor: "pointer",
			outline: "none",
			touchAction: "manipulation",
			transition: "all {durations.press} {easings.easeOut}",
			zIndex: "1",

			"& svg": { width: "1rem", height: "1rem", pointerEvents: "none" },

			_hover: { bg: "{colors.surface.muted}" },
			_disabled: { opacity: "0.5", cursor: "not-allowed" },

			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},

			_dark: { bg: "transparent" },
		},

		indicatorGroup: {
			position: "absolute",
			bottom: "{spacing.md}",
			insetInlineStart: "50%",
			transform: "translateX(-50%)",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "{spacing.xs}",
			padding: "{spacing.xs}",
			borderRadius: "{radii.full}",
			bg: "rgba(0, 0, 0, 0.3)",
			backdropFilter: "blur(4px)",
		},

		indicator: {
			width: "0.5rem", // 8
			height: "0.5rem",
			borderRadius: "{radii.full}",
			bg: "rgba(255, 255, 255, 0.5)",
			cursor: "pointer",
			border: "none",
			transition: "all {durations.press} {easings.easeOut}",

			_hover: { bg: "rgba(255, 255, 255, 0.8)" },

			"&[data-selected='true'], &[aria-current='true']": {
				bg: "white",
				width: "1rem", // 16 — widen on active for visual rhythm
			},

			_focusVisible: {
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},
		},
	},
	variants: {
		orientation: {
			horizontal: {
				itemGroup: { marginInlineStart: "calc(-1 * {spacing.lg})" }, // luma `-ml-4`
				item: { paddingInlineStart: "{spacing.lg}" }, // luma `pl-4`
			},
			vertical: {
				viewport: { height: "24rem" },
				itemGroup: {
					flexDirection: "column",
					height: "100%",
					marginBlockStart: "calc(-1 * {spacing.lg})",
				},
				item: { paddingBlockStart: "{spacing.lg}" },
				prevTrigger: {
					top: "-3rem",
					insetInlineStart: "50%",
					transform: "translateX(-50%) rotate(90deg)",
				},
				nextTrigger: {
					top: "auto",
					insetInlineEnd: "auto",
					bottom: "-3rem",
					insetInlineStart: "50%",
					transform: "translateX(-50%) rotate(90deg)",
				},
			},
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

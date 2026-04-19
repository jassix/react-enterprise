import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Menubar — luma signature: bare row of ghost-button triggers; opened content
 * mirrors menu surfaces. Triggers swap to the secondary chip when their menu is
 * open. Shortcut text is mono and right-aligned.
 */
export const menubarRecipe = defineSlotRecipe({
	className: "menubar",
	description: "Luma menubar — top bar of triggers + popover surfaces",
	jsx: ["Menubar"],
	slots: [
		"root",
		"trigger",
		"positioner",
		"content",
		"item",
		"itemText",
		"itemIndicator",
		"separator",
		"itemGroup",
		"itemGroupLabel",
		"shortcut",
	],
	base: {
		root: {
			display: "flex",
			alignItems: "center",
			height: "2.25rem", // 36 — luma `h-9`
			padding: "{spacing.xs}", // 4 — luma `p-1`
			border: "1px solid {colors.border}",
			borderRadius: "{radii.3xl}", // 24 — luma `rounded-3xl`
		},

		trigger: {
			display: "flex",
			alignItems: "center",
			paddingInline: "{spacing.sm}", // 8 — luma `px-2`
			paddingBlock: "0.1875rem", // 3 — luma `py-0.75`
			borderRadius: "{radii.2xl}", // 20 — luma `rounded-2xl`
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground}",
			bg: "transparent",
			border: "1px solid transparent",
			cursor: "pointer",
			outline: "none",
			userSelect: "none",
			transition:
				"background-color {durations.press} {easings.easeOut}, color {durations.press} {easings.easeOut}",

			_hover: { bg: "{colors.surface.muted}" },

			"&[data-popup-open], &[data-state='open'], &[aria-expanded='true']": {
				bg: "{colors.surface.muted}",
			},

			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},
		},

		positioner: { position: "absolute", zIndex: "{zIndex.dropdown}" },

		content: {
			display: "flex",
			flexDirection: "column",
			minWidth: "12rem",
			padding: "0.375rem", // 6 — luma `p-1.5`
			bg: "{colors.background.popover}",
			color: "{colors.foreground}",
			borderRadius: "{radii.3xl}",
			boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
			outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
			outlineOffset: "-1px",
			transformOrigin: "var(--transform-origin)",
			willChange: "transform, opacity",
			_dark: { outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)" },

			_open: { animation: "scaleIn {durations.surface} {easings.easeOut}" },
			_closed: { animation: "scaleOut {durations.normal} {easings.easeOut}" },

			"@media (prefers-reduced-motion: reduce)": {
				_open: { animation: "fadeIn {durations.normal} {easings.easeOut}" },
				_closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
			},
		},

		item: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			gap: "0.625rem", // 10 — luma `gap-2.5`
			paddingInline: "{spacing.md}", // 12 — luma `px-3`
			paddingBlock: "{spacing.sm}", // 8 — luma `py-2`
			borderRadius: "{radii.2xl}",
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground}",
			cursor: "default",
			outline: "none",
			userSelect: "none",
			transition:
				"background-color {durations.press} {easings.easeOut}, color {durations.press} {easings.easeOut}",

			_highlighted: { bg: "{colors.surface.muted}", color: "{colors.foreground.secondary}" },
			_disabled: { pointerEvents: "none", opacity: "0.5" },

			"& svg": { pointerEvents: "none", flexShrink: 0 },
			"& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
		},

		itemText: { flex: "1" },

		itemIndicator: {
			position: "absolute",
			insetInlineEnd: "{spacing.sm}",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "1rem",
			height: "1rem",
			color: "{colors.interactive.base}",
		},

		separator: {
			height: "1px",
			bg: "color-mix(in oklab, {colors.border} 50%, transparent)",
			marginInline: "-0.375rem", // -6 — luma `-mx-1.5`
			marginBlock: "0.375rem", // 6 — luma `my-1.5`
		},

		itemGroup: { display: "flex", flexDirection: "column" },

		itemGroupLabel: {
			paddingInline: "{spacing.md}",
			paddingBlock: "{spacing.sm}",
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.tertiary}",
		},

		shortcut: {
			marginInlineStart: "auto",
			fontSize: "{fontSizes.xs}",
			letterSpacing: "0.1em", // luma `tracking-widest`
			color: "{colors.foreground.tertiary}",
		},
	},
	variants: {
		size: {
			sm: { trigger: { fontSize: "{fontSizes.xs}", paddingInline: "{spacing.sm}" } },
			md: {},
			lg: { trigger: { fontSize: "{fontSizes.md}", paddingInline: "{spacing.lg}" } },
		},
	},
	defaultVariants: { size: "md" },
});

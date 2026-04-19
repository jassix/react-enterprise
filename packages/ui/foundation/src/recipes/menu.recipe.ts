import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Menu — luma signature: popover-content surface (rounded-3xl, `bg-popover`,
 * `shadow-lg` + 5%-alpha ring). Items use the item-row bundle: rounded-2xl,
 * `gap-2.5`, `px-3 py-2`, `font-medium`, highlighted swaps to `bg-accent`
 * (`surface.muted`) with `foreground.secondary` text. Destructive items use
 * critical-text + a tinted critical-10 highlight. Separator bleeds to the
 * padded edges via negative inline margins.
 */
export const menuRecipe = defineSlotRecipe({
	className: "menu",
	description: "Luma menu — dropdown with item / optionItem / shortcut / separator",
	jsx: ["Menu"],
	slots: [
		"trigger",
		"positioner",
		"content",
		"item",
		"itemText",
		"itemIndicator",
		"optionItem",
		"separator",
		"itemGroup",
		"itemGroupLabel",
		"shortcut",
	],
	base: {
		trigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			cursor: "pointer",
			outline: "none",
			_focusVisible: {
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},
		},

		positioner: {
			position: "absolute",
			zIndex: "{zIndex.dropdown}",
		},

		content: {
			display: "flex",
			flexDirection: "column",
			minWidth: "12rem", // 192 — luma `min-w-48`
			maxHeight: "var(--available-height)",
			padding: "0.375rem", // 6 — luma `p-1.5`
			bg: "{colors.background.popover}",
			color: "{colors.foreground}",
			borderRadius: "{radii.3xl}",
			boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
			outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
			outlineOffset: "-1px",
			overflow: "auto",
			overflowX: "hidden",
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

			"&[data-inset='true']": { paddingInlineStart: "2.375rem" /* 38 — luma `pl-9.5` */ },

			_highlighted: { bg: "{colors.surface.muted}", color: "{colors.foreground.secondary}" },
			_disabled: { pointerEvents: "none", opacity: "0.5" },

			"& svg": { pointerEvents: "none", flexShrink: 0 },
			"& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },

			"&[data-variant='destructive']": {
				color: "{colors.critical.text}",
				_highlighted: {
					bg: "color-mix(in oklab, {colors.critical} 10%, transparent)",
					color: "{colors.critical.text}",
					_dark: { bg: "color-mix(in oklab, {colors.critical} 20%, transparent)" },
				},
				"& svg": { color: "{colors.critical.text}" },
			},
		},

		itemText: { flex: "1" },

		itemIndicator: {
			position: "absolute",
			insetInlineEnd: "{spacing.sm}", // 8 — luma `right-2`
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "1rem",
			height: "1rem",
			pointerEvents: "none",
			color: "currentColor",
		},

		optionItem: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			gap: "0.625rem",
			paddingInlineStart: "{spacing.md}",
			paddingInlineEnd: "{spacing.2xl}", // 32 — luma `pr-8`
			paddingBlock: "{spacing.sm}",
			borderRadius: "{radii.2xl}",
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground}",
			cursor: "default",
			outline: "none",
			userSelect: "none",
			transition: "background-color {durations.press} {easings.easeOut}",

			_highlighted: { bg: "{colors.surface.muted}", color: "{colors.foreground.secondary}" },
			_disabled: { pointerEvents: "none", opacity: "0.5" },

			"& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
		},

		separator: {
			height: "1px",
			bg: "color-mix(in oklab, {colors.border} 50%, transparent)", // luma `bg-border/50`
			pointerEvents: "none",
			marginInline: "-0.375rem", // -6 — luma `-mx-1.5`
			marginBlock: "0.375rem", // 6 — luma `my-1.5`
		},

		itemGroup: { display: "flex", flexDirection: "column" },

		itemGroupLabel: {
			paddingInline: "{spacing.md}", // 12 — luma `px-3`
			paddingBlock: "0.625rem", // 10 — luma `py-2.5`
			fontSize: "{fontSizes.xs}",
			color: "{colors.foreground.tertiary}",
		},

		shortcut: {
			marginInlineStart: "auto",
			fontSize: "{fontSizes.xs}",
			letterSpacing: "0.1em", // luma `tracking-widest`
			color: "{colors.foreground.tertiary}",
		},
	},
});

import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Navigation menu — luma signature: row of `rounded-3xl h-9 px-4.5 py-2.5`
 * triggers that wash to `bg-muted` on hover / open. Content surface mirrors
 * the popover bundle (`rounded-3xl bg-popover shadow-lg` + 5%-alpha ring).
 * Link wears the same row styling as the menu item-bundle so flyout items
 * feel consistent with dropdown menus.
 */
export const navigationMenuRecipe = defineSlotRecipe({
	className: "navigation-menu",
	description: "Luma navigation menu — row of triggers with flyout content",
	jsx: ["NavigationMenu"],
	slots: ["root", "list", "item", "trigger", "link", "content", "indicator", "viewport"],
	base: {
		root: {
			position: "relative",
			display: "flex",
			flex: "1",
			maxWidth: "max-content",
			alignItems: "center",
			justifyContent: "center",
		},

		list: {
			display: "flex",
			flex: "1",
			alignItems: "center",
			justifyContent: "center",
			gap: "0",
			listStyle: "none",
			padding: "0",
			margin: "0",
		},

		item: { position: "relative" },

		trigger: {
			display: "inline-flex",
			width: "max-content",
			alignItems: "center",
			justifyContent: "center",
			gap: "{spacing.xs}",
			height: "2.25rem", // 36 — luma `h-9`
			paddingInline: "1.125rem", // 18 — luma `px-4.5`
			paddingBlock: "0.625rem", // 10 — luma `py-2.5`
			borderRadius: "{radii.3xl}", // 24 — luma `rounded-3xl`
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground}",
			bg: "transparent",
			border: "none",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",

			_hover: { bg: "{colors.surface.muted}" },
			_focus: { bg: "{colors.surface.muted}" },

			"&[data-popup-open], &[data-state='open'], &[aria-expanded='true']": {
				bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)",
				_hover: { bg: "{colors.surface.muted}" },
			},

			_disabled: { pointerEvents: "none", opacity: "0.5" },

			_focusVisible: {
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
				outline: "1px solid {colors.focus.ring}",
			},
		},

		link: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.xs}",
			padding: "{spacing.md}",
			borderRadius: "{radii.2xl}",
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground}",
			textDecoration: "none",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",

			_hover: { bg: "{colors.surface.muted}", color: "{colors.foreground.secondary}" },
			_focus: { bg: "{colors.surface.muted}" },

			"&[data-active='true'], &[aria-current='page']": {
				bg: "{colors.surface.muted}",
				color: "{colors.foreground.secondary}",
				fontWeight: "{fontWeights.medium}",
			},
		},

		content: {
			padding: "0.625rem", // 10 — luma `p-2.5`
			paddingInlineEnd: "{spacing.md}",
			bg: "{colors.background.popover}",
			color: "{colors.foreground}",
			borderRadius: "{radii.3xl}",
			boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
			outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
			outlineOffset: "-1px",
			transformOrigin: "var(--transform-origin)",
			willChange: "transform, opacity",
			_dark: { outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)" },

			_open: { animation: "scaleIn {durations.normal} {easings.easeOut}" },
			_closed: { animation: "scaleOut {durations.press} {easings.easeOut}" },

			"@media (prefers-reduced-motion: reduce)": {
				_open: { animation: "fadeIn {durations.fast} {easings.easeOut}" },
				_closed: { animation: "fadeOut {durations.press} {easings.easeOut}" },
			},
		},

		indicator: {
			position: "absolute",
			bottom: "0",
			height: "2px",
			bg: "{colors.interactive.base}",
			borderRadius: "{radii.full}",
			transition:
				"transform {durations.normal} {easings.easeOut}, width {durations.normal} {easings.easeOut}",
		},

		viewport: {
			position: "relative",
			display: "flex",
			overflow: "hidden",
			width: "100%",
			height: "var(--viewport-height)",
			borderRadius: "{radii.3xl}",
			bg: "{colors.background.popover}",
			boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
			transition: "height {durations.normal} {easings.easeOut}",
		},
	},
	variants: {
		orientation: {
			horizontal: {
				list: { flexDirection: "row" },
			},
			vertical: {
				list: { flexDirection: "column", alignItems: "stretch" },
				content: { position: "static", boxShadow: "none", border: "none" },
				indicator: { bottom: "auto", left: "0", width: "2px", height: "auto" },
			},
		},
	},
	defaultVariants: {
		orientation: "horizontal",
	},
});

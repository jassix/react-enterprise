import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Tabs — luma signature: `rounded-full` pill list (`h-9`, `p-1`, `bg-muted`)
 * with rounded-full triggers that swap to `bg-background` on active. `line`
 * variant strips the pill rail and uses an underline accent instead.
 * Horizontal/vertical orientation is driven by the root's `data-orientation`
 * — the list flips to a vertical stack on `data-vertical`.
 */
export const tabsRecipe = defineSlotRecipe({
	className: "tabs",
	description: "Luma tabs — rounded-full pill rail with background-chip active",
	jsx: ["Tabs"],
	slots: ["root", "list", "trigger", "content", "indicator"],
	base: {
		root: {
			display: "flex",
			gap: "{spacing.sm}", // 8 — luma `gap-2`
			width: "100%",

			"&[data-orientation='horizontal']": { flexDirection: "column" },
			"&[data-orientation='vertical']": { flexDirection: "row" },
		},

		list: {
			display: "inline-flex",
			width: "fit-content",
			alignItems: "center",
			justifyContent: "center",
			padding: "{spacing.xs}", // 4 — luma `p-1`
			borderRadius: "{radii.full}", // luma `rounded-full`
			color: "{colors.foreground.tertiary}",

			"[data-orientation='horizontal'] &": {
				height: "2.25rem", // 36 — luma `h-9`
			},

			"[data-orientation='vertical'] &": {
				height: "fit-content",
				flexDirection: "column",
				borderRadius: "{radii.2xl}", // luma `rounded-2xl`
			},
		},

		trigger: {
			position: "relative",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "{spacing.sm}", // 8 — luma `gap-2`
			flex: "1",
			height: "calc(100% - 1px)",
			paddingInline: "{spacing.md}", // 12 — luma `px-3`
			paddingBlock: "{spacing.xs}", // 4 — luma `py-1`
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			whiteSpace: "nowrap",
			color: "color-mix(in oklab, {colors.foreground} 60%, transparent)",
			bg: "transparent",
			borderRadius: "{radii.full}",
			border: "1px solid transparent !important",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",

			"& svg": { pointerEvents: "none", flexShrink: 0 },
			"& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },

			"[data-orientation='vertical'] &": {
				width: "100%",
				justifyContent: "flex-start",
				borderRadius: "{radii.2xl}",
				paddingInline: "{spacing.md}",
				paddingBlock: "0.375rem", // 6 — luma `py-1.5`
			},

			"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.sm}" },
			"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.sm}" },

			_hover: { color: "{colors.foreground}" },

			_selected: {
				bg: "{colors.background}",
				color: "{colors.foreground}",
				_dark: {
					borderColor: "{colors.border} !important",
					bg: "color-mix(in oklab, {colors.border} 30%, transparent)",
				},
			},

			_disabled: { pointerEvents: "none", opacity: "0.5" },

			"&[aria-disabled='true']": { pointerEvents: "none", opacity: "0.5" },

			_dark: {
				color: "{colors.foreground.tertiary}",
				_hover: { color: "{colors.foreground}" },
			},

			_focusVisible: {
				borderColor: "{colors.focus.ring} !important",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 50%, transparent)",
				outline: "1px solid {colors.focus.ring}",
			},

			// Underline accent used by the `line` variant — driven through a
			// `_selected` pseudo-after below, but the absolute position is set
			// here so it doesn't need to be repeated per-orientation.
			_after: {
				content: "''",
				position: "absolute",
				bg: "{colors.foreground}",
				opacity: "0",
				transition: "opacity {durations.press} {easings.easeOut}",
			},
			"[data-orientation='horizontal'] &::after": {
				insetInline: "0",
				bottom: "-5px",
				height: "2px",
			},
			"[data-orientation='vertical'] &::after": {
				insetBlock: "0",
				right: "-4px",
				width: "2px",
			},
		},

		content: {
			flex: "1",
			fontSize: "{fontSizes.sm}",
			outline: "none",
		},

		indicator: { display: "none" },
	},
	variants: {
		variant: {
			pill: {
				list: {
					bg: "{colors.surface.muted}",
				},
			},
			line: {
				list: {
					bg: "transparent",
					gap: "{spacing.xs}",
					borderRadius: "0",
				},
				trigger: {
					bg: "transparent",
					_selected: {
						bg: "transparent",
						boxShadow: "none",
						_after: { opacity: "1" },
						_dark: { bg: "transparent", borderColor: "transparent !important" },
					},
				},
			},
			unstyled: {
				list: { bg: "transparent", padding: "0", borderRadius: "0" },
				trigger: { borderRadius: "0" },
			},
		},
		size: {
			sm: { trigger: { height: "1.75rem", fontSize: "{fontSizes.xs}" } },
			md: {},
			lg: {
				trigger: { height: "2.25rem", fontSize: "{fontSizes.md}", paddingInline: "{spacing.lg}" },
			},
		},
	},
	defaultVariants: { variant: "pill", size: "md" },
});

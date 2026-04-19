import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Sidebar — luma signature: 16rem expanded / 3rem collapsed side nav with
 * its own `sidebar.*` color bundle. Slots mirror luma's composition:
 * provider wrapper → sidebar (fixed rail) → header / content / footer →
 * group → group-label / group-content → menu → menu-item → menu-button.
 *
 * `data-collapsible="icon"` shrinks the rail to the icon-width and hides
 * labels; `data-variant="floating"` wraps it in a rounded 2xl card with a
 * subtle ring; `data-variant="inset"` leaves room for the main pane to float
 * inside a rounded surface.
 *
 * Keeps /4 spacing and inherits Button / Input / Separator / Tooltip styling
 * for trigger / input / separator / tooltip slots.
 */
export const sidebarRecipe = defineSlotRecipe({
	className: "sidebar",
	description: "Luma sidebar — collapsible side navigation with menu / groups / footer",
	jsx: ["Sidebar"],
	slots: [
		"provider",
		"wrapper",
		"root",
		"gap",
		"container",
		"inner",
		"trigger",
		"rail",
		"inset",
		"input",
		"header",
		"footer",
		"separator",
		"content",
		"group",
		"groupLabel",
		"groupAction",
		"groupContent",
		"menu",
		"menuItem",
		"menuButton",
		"menuAction",
		"menuBadge",
		"menuSkeleton",
		"menuSub",
		"menuSubItem",
		"menuSubButton",
	],
	base: {
		provider: { display: "contents" },

		wrapper: {
			display: "flex",
			width: "100%",
			minHeight: "100svh",
			"--sidebar-width": "16rem",
			"--sidebar-width-icon": "3rem",
		},

		// `root` is the `data-state` / `data-side` / `data-variant` host. Peer
		// classes on siblings (like `SidebarInset`) key off this element.
		root: {
			color: "{colors.sidebar.foreground}",
			display: "none",

			"@media (min-width: 768px)": {
				display: "block",
			},
		},

		// Layout spacer that reserves room for the fixed container. Matches
		// luma's `sidebar-gap` — transitions width when collapsing.
		gap: {
			position: "relative",
			width: "var(--sidebar-width)",
			bg: "transparent",
			transition: "width {durations.normal} {easings.easeOut}",

			'[data-collapsible="offcanvas"] &': { width: "0" },
			'[data-collapsible="icon"] &': { width: "var(--sidebar-width-icon)" },
			'[data-side="right"] &': { transform: "rotate(180deg)" },
		},

		// Fixed positioned actual nav rail.
		container: {
			position: "fixed",
			insetBlock: "0",
			zIndex: "10",
			display: "none",
			height: "100svh",
			width: "var(--sidebar-width)",
			transition: "left {durations.normal} {easings.easeOut}, right {durations.normal} {easings.easeOut}, width {durations.normal} {easings.easeOut}",

			"@media (min-width: 768px)": { display: "flex" },

			'[data-side="left"] &': {
				left: "0",
				borderInlineEnd: "1px solid {colors.sidebar.border}",
			},
			'[data-side="right"] &': {
				right: "0",
				borderInlineStart: "1px solid {colors.sidebar.border}",
			},

			'[data-side="left"][data-collapsible="offcanvas"] &': {
				left: "calc(var(--sidebar-width) * -1)",
			},
			'[data-side="right"][data-collapsible="offcanvas"] &': {
				right: "calc(var(--sidebar-width) * -1)",
			},

			'[data-collapsible="icon"] &': { width: "var(--sidebar-width-icon)" },
		},

		inner: {
			display: "flex",
			height: "100%",
			width: "100%",
			flexDirection: "column",
			bg: "{colors.sidebar}",

			'[data-variant="floating"] &': {
				borderRadius: "{radii.2xl}",
				boxShadow: "0 1px 2px rgb(0 0 0 / 0.06)",
				outline: "1px solid {colors.sidebar.border}",
				outlineOffset: "-1px",
			},
		},

		trigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "2rem",
			height: "2rem",
			borderRadius: "{radii.4xl}",
			bg: "transparent",
			color: "{colors.foreground}",
			cursor: "pointer",
			border: "1px solid transparent",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",
			_hover: { bg: "{colors.surface.muted}" },
			"& svg": { width: "1rem", height: "1rem" },
			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},
		},

		// Narrow drag rail on the inside edge — clickable to toggle collapse.
		rail: {
			position: "absolute",
			insetBlock: "0",
			zIndex: "20",
			display: "none",
			width: "1rem",
			bg: "transparent",
			border: "none",
			cursor: "col-resize",
			transition: "all {durations.normal} {easings.easeOut}",

			_after: {
				content: "''",
				position: "absolute",
				insetBlock: "0",
				insetInlineStart: "50%",
				width: "2px",
				transform: "translateX(-50%)",
			},
			"&:hover::after": { bg: "{colors.sidebar.border}" },

			'[data-side="left"] &': { insetInlineEnd: "-1rem" },
			'[data-side="right"] &': { insetInlineStart: "0" },

			"@media (min-width: 640px)": { display: "flex" },
		},

		inset: {
			position: "relative",
			display: "flex",
			flex: "1",
			flexDirection: "column",
			width: "100%",
			bg: "{colors.background}",

			'[data-variant="inset"] ~ &, [data-variant="inset"] + &': {
				"@media (min-width: 768px)": {
					margin: "{spacing.sm}",
					marginInlineStart: "0",
					borderRadius: "{radii.2xl}",
					boxShadow: "0 1px 2px rgb(0 0 0 / 0.06)",
				},
			},
		},

		input: {
			height: "2rem", // 32 — luma `h-8`
			width: "100%",
			bg: "color-mix(in oklab, {colors.border} 50%, transparent)",
			boxShadow: "none",
		},

		header: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.sm}", // 8 — luma `gap-2`
			padding: "{spacing.sm}", // 8 — luma `p-2`
		},

		footer: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.sm}",
			padding: "{spacing.sm}",
		},

		separator: {
			marginInline: "{spacing.sm}", // 8 — luma `mx-2`
			width: "auto",
			bg: "{colors.sidebar.border}",
		},

		content: {
			display: "flex",
			flex: "1",
			minHeight: "0",
			flexDirection: "column",
			gap: "{spacing.sm}",
			overflow: "auto",

			// Hide scrollbar for luma parity (`no-scrollbar`).
			"&::-webkit-scrollbar": { display: "none" },
			scrollbarWidth: "none",

			'[data-collapsible="icon"] &': { overflow: "hidden" },
		},

		group: {
			position: "relative",
			display: "flex",
			width: "100%",
			minWidth: "0",
			flexDirection: "column",
			padding: "{spacing.sm}",
		},

		groupLabel: {
			display: "flex",
			height: "2rem",
			flexShrink: "0",
			alignItems: "center",
			borderRadius: "{radii.xl}",
			paddingInline: "{spacing.md}", // 12 — luma `px-3`
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			color: "color-mix(in oklab, {colors.sidebar.foreground} 70%, transparent)",
			outline: "none",
			transition: "margin {durations.normal} {easings.easeOut}, opacity {durations.normal} {easings.easeOut}",

			"& > svg": { width: "1rem", height: "1rem", flexShrink: 0 },

			'[data-collapsible="icon"] &': {
				marginTop: "-2rem",
				opacity: "0",
			},
		},

		groupAction: {
			position: "absolute",
			top: "0.875rem", // 14 — luma `top-3.5`
			insetInlineEnd: "{spacing.md}",
			display: "flex",
			aspectRatio: "1",
			width: "1.25rem",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: "{radii.xl}",
			padding: "0",
			color: "{colors.sidebar.foreground}",
			border: "none",
			bg: "transparent",
			cursor: "pointer",
			outline: "none",
			transition: "transform {durations.press} {easings.easeOut}",

			_hover: {
				bg: "{colors.sidebar.accent}",
				color: "{colors.sidebar.accentForeground}",
			},
			_focusVisible: {
				boxShadow: "0 0 0 2px {colors.sidebar.ring}",
			},

			"& > svg": { width: "1rem", height: "1rem", flexShrink: 0 },

			'[data-collapsible="icon"] &': { display: "none" },
		},

		groupContent: {
			width: "100%",
			fontSize: "{fontSizes.sm}",
		},

		menu: {
			display: "flex",
			width: "100%",
			minWidth: "0",
			flexDirection: "column",
			gap: "0.125rem", // 2 — luma `gap-0.5`
			listStyle: "none",
			padding: "0",
			margin: "0",
		},

		menuItem: {
			position: "relative",
		},

		menuButton: {
			display: "flex",
			width: "100%",
			alignItems: "center",
			gap: "{spacing.sm}", // 8 — luma `gap-2`
			overflow: "hidden",
			borderRadius: "{radii.xl}",
			paddingInline: "{spacing.md}", // 12 — luma `px-3`
			paddingBlock: "{spacing.sm}", // 8 — luma `py-2`
			textAlign: "start",
			fontSize: "{fontSizes.sm}",
			color: "{colors.sidebar.foreground}",
			bg: "transparent",
			border: "none",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",

			"& > svg": { width: "1rem", height: "1rem", flexShrink: 0 },
			"& > span:last-child": {
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			},

			_hover: {
				bg: "{colors.sidebar.accent}",
				color: "{colors.sidebar.accentForeground}",
			},
			_active: {
				bg: "{colors.sidebar.accent}",
				color: "{colors.sidebar.accentForeground}",
			},

			"&[data-active='true'], &[aria-current='page']": {
				bg: "{colors.sidebar.accent}",
				color: "{colors.sidebar.accentForeground}",
				fontWeight: "{fontWeights.medium}",
			},

			_disabled: { pointerEvents: "none", opacity: "0.5" },
			"&[aria-disabled='true']": { pointerEvents: "none", opacity: "0.5" },

			_focusVisible: {
				boxShadow: "0 0 0 2px {colors.sidebar.ring}",
			},

			'[data-collapsible="icon"] &': {
				width: "2rem !important",
				height: "2rem !important",
				padding: "{spacing.sm} !important",
			},

			'[data-sidebar="menu-action"] ~ &, :has(~ [data-sidebar="menu-action"])': {
				paddingInlineEnd: "{spacing.2xl}",
			},
		},

		menuAction: {
			position: "absolute",
			top: "0.375rem", // 6
			insetInlineEnd: "{spacing.xs}",
			display: "flex",
			aspectRatio: "1",
			width: "1.25rem",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: "{radii.md}",
			color: "{colors.sidebar.foreground}",
			bg: "transparent",
			border: "none",
			padding: "0",
			cursor: "pointer",
			outline: "none",
			transition: "transform {durations.press} {easings.easeOut}",

			_hover: {
				bg: "{colors.sidebar.accent}",
				color: "{colors.sidebar.accentForeground}",
			},
			_focusVisible: {
				boxShadow: "0 0 0 2px {colors.sidebar.ring}",
			},

			"& > svg": { width: "1rem", height: "1rem", flexShrink: 0 },

			'[data-collapsible="icon"] &': { display: "none" },
		},

		menuBadge: {
			position: "absolute",
			top: "0.375rem",
			insetInlineEnd: "{spacing.sm}",
			pointerEvents: "none",
			display: "flex",
			height: "1.25rem",
			minWidth: "1.25rem",
			alignItems: "center",
			justifyContent: "center",
			borderRadius: "{radii.md}",
			paddingInline: "{spacing.xs}",
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.sidebar.foreground}",

			'[data-collapsible="icon"] &': { display: "none" },
		},

		menuSkeleton: {
			display: "flex",
			height: "2rem",
			alignItems: "center",
			gap: "{spacing.sm}",
			borderRadius: "{radii.md}",
			paddingInline: "{spacing.sm}",
		},

		menuSub: {
			display: "flex",
			minWidth: "0",
			marginInlineStart: "0.875rem", // 14
			marginInline: "0.875rem",
			translate: "0 1px",
			flexDirection: "column",
			gap: "0.125rem",
			borderInlineStart: "1px solid {colors.sidebar.border}",
			paddingInline: "{spacing.sm}",
			paddingBlock: "0.125rem",
			listStyle: "none",

			'[data-collapsible="icon"] &': { display: "none" },
		},

		menuSubItem: { position: "relative" },

		menuSubButton: {
			display: "flex",
			height: "1.75rem",
			minWidth: "0",
			alignItems: "center",
			gap: "{spacing.sm}",
			overflow: "hidden",
			borderRadius: "{radii.md}",
			paddingInline: "{spacing.sm}",
			color: "{colors.sidebar.foreground}",
			bg: "transparent",
			border: "none",
			cursor: "pointer",
			outline: "none",
			fontSize: "{fontSizes.sm}",

			_hover: {
				bg: "{colors.sidebar.accent}",
				color: "{colors.sidebar.accentForeground}",
			},

			"&[data-active='true']": {
				bg: "{colors.sidebar.accent}",
				color: "{colors.sidebar.accentForeground}",
			},
		},
	},
});

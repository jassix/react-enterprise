import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Command — luma signature: large surface using the popover-content bundle
 * (rounded-4xl since it's a top-level command palette, not a popover); search
 * input bordered only at bottom; items use the item-row bundle.
 */
export const commandRecipe = defineSlotRecipe({
	className: "command",
	description: "Luma command palette — searchable action list",
	jsx: ["Command"],
	slots: [
		"root",
		"inputWrapper",
		"input",
		"list",
		"empty",
		"group",
		"groupLabel",
		"item",
		"itemIndicator",
		"shortcut",
		"separator",
	],
	base: {
		root: {
			display: "flex",
			width: "100%",
			height: "100%",
			flexDirection: "column",
			padding: "{spacing.xs}", // 4 — luma `p-1`
			bg: "{colors.background.popover}",
			color: "{colors.foreground}",
			borderRadius: "{radii.4xl}", // 28 — luma `rounded-4xl`
			overflow: "hidden",
		},

		inputWrapper: {
			display: "flex",
			alignItems: "center",
			gap: "{spacing.sm}",
			paddingInline: "{spacing.lg}",
			borderBottom: "1px solid {colors.border.hairline}",
			color: "{colors.foreground.tertiary}",
			"& svg": { width: "1rem", height: "1rem" },
		},

		input: {
			flex: "1",
			height: "2.75rem", // 44
			bg: "transparent",
			border: "none",
			outline: "none",
			fontFamily: "{fonts.body}",
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground}",
			_placeholder: { color: "{colors.foreground.tertiary}" },
			_disabled: { opacity: "0.5", cursor: "not-allowed" },
		},

		list: {
			display: "flex",
			flexDirection: "column",
			maxHeight: "24rem",
			overflowY: "auto",
			padding: "{spacing.xs}",
		},

		empty: {
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "{spacing.xl}",
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground.tertiary}",
			textAlign: "center",
		},

		group: { display: "flex", flexDirection: "column", paddingBlock: "{spacing.xs}" },

		groupLabel: {
			paddingInline: "{spacing.md}",
			paddingBlock: "{spacing.sm}",
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.tertiary}",
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
			transition: "background-color {durations.press} {easings.easeOut}",

			"&[data-highlighted='true'], &[aria-selected='true'], &[data-selected='true']": {
				bg: "{colors.surface.muted}",
				color: "{colors.foreground.secondary}",
			},

			_disabled: { pointerEvents: "none", opacity: "0.5" },

			"& svg": { pointerEvents: "none", flexShrink: 0 },
			"& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
		},

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

		shortcut: {
			marginInlineStart: "auto",
			fontSize: "{fontSizes.xs}",
			letterSpacing: "0.1em",
			color: "{colors.foreground.tertiary}",
		},

		separator: {
			height: "1px",
			bg: "color-mix(in oklab, {colors.border} 50%, transparent)",
			marginBlock: "{spacing.xs}",
		},
	},
	variants: {
		size: {
			sm: { input: { height: "2.25rem" }, item: { fontSize: "{fontSizes.xs}" }, list: { maxHeight: "16rem" } },
			md: {},
			lg: { input: { height: "3.25rem" }, item: { fontSize: "{fontSizes.md}" }, list: { maxHeight: "32rem" } },
		},
	},
	defaultVariants: { size: "md" },
});

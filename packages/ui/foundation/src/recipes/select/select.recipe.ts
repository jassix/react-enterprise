import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Select — luma signature: trigger uses the form-field bundle (rounded-3xl,
 * translucent border bg, transparent border lighting up to focus ring); content
 * uses the popover-content bundle (rounded-3xl, bg.popover, shadow + 5%-alpha
 * outline); items use the item-row bundle (rounded-2xl, muted hover wash).
 */
export const selectRecipe = defineSlotRecipe({
	className: "select",
	description: "Luma select — form-field trigger + popover content + item rows",
	jsx: ["Select"],
	slots: [
		"root",
		"label",
		"control",
		"trigger",
		"valueText",
		"indicator",
		"clearTrigger",
		"positioner",
		"content",
		"item",
		"itemText",
		"itemIndicator",
		"itemGroup",
		"itemGroupLabel",
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

		control: { display: "flex", alignItems: "center", position: "relative" },

		// Trigger = form-field bundle. Luma defaults to `w-fit` (hugs
		// content); consumers can override to `100%` via `css={{ width: ... }}`
		// when the design needs a full-width field.
		trigger: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			width: "fit-content",
			gap: "calc({spacing.sm} - 2px)", // 6 — luma `gap-1.5`
			height: "{sizes.md}", // 36 — luma `h-9`
			paddingInline: "{spacing.md}", // 12 — luma `px-3`
			paddingBlock: "{spacing.sm}", // 8 — luma `py-2`
			fontFamily: "{fonts.body}",
			fontSize: "{fontSizes.sm}",
			whiteSpace: "nowrap",
			color: "{colors.foreground}",
			cursor: "pointer",
			outline: "none",
			border: "1px solid transparent",
			borderRadius: "{radii.3xl}",
			bg: "color-mix(in oklab, {colors.border} 50%, transparent)", // luma `bg-input/50`
			transition:
				"color {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}, border-color {durations.press} {easings.easeOut}",

			// Luma: placeholder state uses muted-foreground.
			"&[data-placeholder]": { color: "{colors.foreground.tertiary}" },

			// Luma: `*:data-[slot=select-value]:line-clamp-1` — clamp value text.
			"& [data-slot='select-value']": {
				display: "flex",
				alignItems: "center",
				gap: "calc({spacing.sm} - 2px)", // 6 — luma `gap-1.5`
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			},

			_disabled: { pointerEvents: "none", cursor: "not-allowed", opacity: "0.5" },

			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},

			"&[aria-invalid='true'], &[data-invalid='true']": {
				borderColor: "{colors.critical}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
				_dark: {
					borderColor: "color-mix(in oklab, {colors.critical} 50%, transparent)",
					boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
				},
			},
		},

		valueText: { flex: "1", textAlign: "start" },

		indicator: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			color: "{colors.foreground.tertiary}",
			transition: "transform {durations.press} {easings.easeOut}",
			_open: { transform: "rotate(180deg)" },
		},

		clearTrigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			cursor: "pointer",
			color: "{colors.foreground.tertiary}",
			_hover: { color: "{colors.foreground}" },
		},

		positioner: { position: "absolute", zIndex: "{zIndex.dropdown}" },

		// Content = popover-content bundle. Luma: `max-h-(--available-height)
		// w-(--anchor-width) min-w-36 p-0 rounded-3xl bg-popover shadow-lg
		// ring-1 ring-foreground/5` — width follows trigger, height caps at
		// whatever the positioner can offer.
		content: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			minWidth: "calc({sizes.md} * 4)", // 144 — luma `min-w-36`
			width: "var(--reference-width)",
			maxHeight: "var(--available-height)",
			overflow: "auto",
			overflowX: "hidden",
			padding: "calc({spacing.sm} - 2px)", // 6 — luma `p-1.5`
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

		// Item = item-row bundle.
		item: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			gap: "0.625rem", // 10 — luma `gap-2.5`
			width: "100%",
			paddingInlineStart: "{spacing.md}", // 12 — luma `pl-3`
			paddingInlineEnd: "{spacing.2xl}", // 32 — luma `pr-8` (room for indicator)
			paddingBlock: "{spacing.sm}", // 8 — luma `py-2`
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

		itemGroup: { display: "flex", flexDirection: "column" },

		itemGroupLabel: {
			paddingInline: "{spacing.md}", // 12 — luma `px-3`
			paddingBlock: "0.625rem", // 10 — luma `py-2.5`
			fontSize: "{fontSizes.xs}",
			color: "{colors.foreground.tertiary}",
		},
	},
	variants: {
		size: {
			sm: { trigger: { height: "2rem", fontSize: "{fontSizes.xs}" } },
			md: { trigger: { height: "2.25rem" } },
			lg: { trigger: { height: "2.5rem", fontSize: "{fontSizes.md}", paddingInline: "{spacing.lg}" } },
		},
	},
	defaultVariants: { size: "md" },
});

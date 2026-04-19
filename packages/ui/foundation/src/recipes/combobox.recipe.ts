import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Combobox — luma signature: control wrapper holds an embedded input + chevron
 * trigger on the right; the wrapper itself wears the form-field bundle so the
 * focus ring lights up when the inner input focuses. Content + items use the
 * popover-content + item-row bundles like Select.
 */
export const comboboxRecipe = defineSlotRecipe({
	className: "combobox",
	description: "Luma combobox — searchable picker",
	jsx: ["Combobox"],
	slots: [
		"root",
		"label",
		"control",
		"input",
		"trigger",
		"clearTrigger",
		"positioner",
		"content",
		"item",
		"itemText",
		"itemIndicator",
		"itemGroup",
		"itemGroupLabel",
		"empty",
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

		// Control = form-field bundle. Lights up when the inner input focuses.
		control: {
			position: "relative",
			display: "flex",
			alignItems: "stretch",
			width: "100%",
			height: "2.25rem", // 36
			border: "1px solid transparent",
			borderRadius: "{radii.3xl}",
			bg: "color-mix(in oklab, {colors.border} 50%, transparent)",
			transition: "color {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}, border-color {durations.press} {easings.easeOut}",
			overflow: "hidden",

			"&:has(input:focus-visible)": {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},

			"&[data-invalid='true'], &:has(input[aria-invalid='true'])": {
				borderColor: "{colors.critical}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
				_dark: {
					borderColor: "color-mix(in oklab, {colors.critical} 50%, transparent)",
					boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
				},
			},

			"&[data-disabled='true']": { opacity: "0.5", cursor: "not-allowed" },
		},

		input: {
			flex: "1",
			minWidth: "0",
			bg: "transparent",
			border: "none",
			outline: "none",
			paddingInline: "{spacing.md}",
			fontFamily: "{fonts.body}",
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground}",
			_placeholder: { color: "{colors.foreground.tertiary}" },
			_disabled: { cursor: "not-allowed" },
		},

		trigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			paddingInline: "{spacing.md}",
			bg: "transparent",
			border: "none",
			color: "{colors.foreground.tertiary}",
			cursor: "pointer",
			outline: "none",
			transition: "color {durations.press} {easings.easeOut}",
			_hover: { color: "{colors.foreground}" },
		},

		clearTrigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			paddingInline: "{spacing.sm}",
			bg: "transparent",
			border: "none",
			color: "{colors.foreground.tertiary}",
			cursor: "pointer",
			outline: "none",
			_hover: { color: "{colors.foreground}" },
		},

		positioner: {
			position: "absolute",
			zIndex: "{zIndex.dropdown}",
			width: "var(--reference-width)",
		},

		// Content = popover-content bundle. Luma anchors the popup to the
		// input, reserves extra inline space (`--anchor-width + 28px`) so
		// long option text has breathing room, and caps max-height to
		// `--available-height`. Padding on the positioner is `p-1.5` with
		// `overflow-hidden` so the scrollbar rounds into the radius.
		content: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			width: "var(--reference-width)",
			minWidth: "calc(var(--reference-width) + {sizes.sm})", // +28 — luma `--anchor-width + 7`
			maxWidth: "var(--available-width)",
			maxHeight: "var(--available-height)",
			overflow: "hidden",
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

		// Item = item-row bundle matching luma menu/dropdown rows.
		item: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			gap: "0.625rem", // 10 — luma `gap-2.5`
			paddingInlineStart: "{spacing.md}", // 12 — luma `pl-3`
			paddingInlineEnd: "{spacing.2xl}", // 32 — luma `pr-8`
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

			"& svg": { pointerEvents: "none", flexShrink: 0 },
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

		empty: {
			padding: "{spacing.lg}",
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground.tertiary}",
			textAlign: "center",
		},
	},
	variants: {
		size: {
			sm: { control: { height: "2rem" }, input: { fontSize: "{fontSizes.xs}" } },
			md: { control: { height: "2.25rem" } },
			lg: { control: { height: "2.5rem" }, input: { fontSize: "{fontSizes.md}" } },
		},
	},
	defaultVariants: { size: "md" },
});

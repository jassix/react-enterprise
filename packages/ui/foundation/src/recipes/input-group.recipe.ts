import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Input Group — luma signature: a single form-field-bundle wrapper that
 * contains the input plus optional addon/element slots. Addons are flat
 * (no own border) and inherit the wrapper's translucent fill.
 */
export const inputGroupRecipe = defineSlotRecipe({
	className: "input-group",
	description: "Luma input group — input + prefix/suffix addons",
	jsx: ["InputGroup"],
	slots: ["root", "input", "startAddon", "endAddon", "startElement", "endElement"],
	base: {
		root: {
			position: "relative",
			display: "flex",
			alignItems: "center",
			width: "100%",
			minWidth: "0",
			height: "2.25rem", // 36 — luma `h-9`
			border: "1px solid transparent",
			borderRadius: "{radii.4xl}", // 28 — luma `rounded-4xl`
			bg: "color-mix(in oklab, {colors.border} 50%, transparent)", // luma `bg-input/50`
			outline: "none",
			transition:
				"color {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}, border-color {durations.press} {easings.easeOut}",

			// block-end / block-start addons turn the group into a 2-row stack
			// with a rounded-3xl surface.
			"&:has(> [data-align='block-end']), &:has(> [data-align='block-start'])": {
				flexDirection: "column",
				height: "auto",
				borderRadius: "{radii.3xl}",
			},

			// Textareas drop the row-height constraint and soften the corners.
			"&:has(textarea)": {
				height: "auto",
				borderRadius: "{radii.2xl}",
			},

			"&:has([data-slot='input-group-control']:focus-visible)": {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},

			"&:has([data-slot][aria-invalid='true'])": {
				borderColor: "{colors.critical}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
				_dark: {
					boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
				},
			},
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
			fontWeight: "{fontWeights.regular}",
			lineHeight: "{lineHeight.normal}",
			color: "{colors.foreground}",
			_placeholder: { color: "{colors.foreground.tertiary}" },
			_disabled: { cursor: "not-allowed", opacity: "0.5" },
		},

		startAddon: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			paddingInline: "{spacing.md}",
			color: "{colors.foreground.tertiary}",
			fontSize: "{fontSizes.sm}",
			whiteSpace: "nowrap",
		},

		endAddon: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			paddingInline: "{spacing.md}",
			color: "{colors.foreground.tertiary}",
			fontSize: "{fontSizes.sm}",
			whiteSpace: "nowrap",
		},

		startElement: {
			position: "absolute",
			insetInlineStart: "0",
			top: "0",
			bottom: "0",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			paddingInline: "{spacing.md}",
			color: "{colors.foreground.tertiary}",
			pointerEvents: "none",
		},

		endElement: {
			position: "absolute",
			insetInlineEnd: "0",
			top: "0",
			bottom: "0",
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			paddingInline: "{spacing.md}",
			color: "{colors.foreground.tertiary}",
		},
	},
	variants: {
		variant: {
			outline: {},
			filled: {
				root: {
					bg: "{colors.surface.muted}",
					"&:has(input:focus-visible)": { bg: "{colors.surface.base}" },
				},
			},
			flushed: {
				root: {
					bg: "transparent",
					border: "none",
					borderBottom: "1px solid {colors.border}",
					borderRadius: "0",
					"&:has(input:focus-visible)": { borderBottomColor: "{colors.focus.ring}", boxShadow: "none" },
				},
				input: { paddingInline: "0" },
				startAddon: { paddingInline: "0", paddingInlineEnd: "{spacing.sm}" },
				endAddon: { paddingInline: "0", paddingInlineStart: "{spacing.sm}" },
			},
		},
		size: {
			sm: { root: { height: "2rem" }, input: { fontSize: "{fontSizes.xs}" } },
			md: { root: { height: "2.25rem" } },
			lg: { root: { height: "2.5rem" }, input: { fontSize: "{fontSizes.md}" } },
		},
	},
	defaultVariants: { variant: "outline", size: "md" },
});

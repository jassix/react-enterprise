import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Calendar — luma signature: tight grid of icon-button-sized cells.
 * `today` shows a focus-ring-style border, `selected` fills with `interactive.base`
 * + inverse text. Range selection uses muted bg between endpoints.
 */
export const calendarRecipe = defineSlotRecipe({
	className: "calendar",
	description: "Luma calendar — month grid for date pickers",
	jsx: ["Calendar"],
	slots: [
		"root",
		"header",
		"heading",
		"prevTrigger",
		"nextTrigger",
		"viewTrigger",
		"grid",
		"rowHeader",
		"row",
		"cell",
		"cellTrigger",
	],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.md}",
			padding: "{spacing.md}",
			color: "{colors.foreground}",
		},

		header: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			gap: "{spacing.sm}",
		},

		heading: {
			flex: "1",
			textAlign: "center",
			fontFamily: "{fonts.heading}",
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground}",
		},

		prevTrigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "2rem",
			height: "2rem",
			borderRadius: "{radii.full}",
			bg: "transparent",
			color: "{colors.foreground.tertiary}",
			border: "1px solid transparent",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",

			_hover: { bg: "{colors.surface.muted}", color: "{colors.foreground}" },
			_disabled: { opacity: "0.5", cursor: "not-allowed" },
			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},
		},

		nextTrigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "2rem",
			height: "2rem",
			borderRadius: "{radii.full}",
			bg: "transparent",
			color: "{colors.foreground.tertiary}",
			border: "1px solid transparent",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",

			_hover: { bg: "{colors.surface.muted}", color: "{colors.foreground}" },
			_disabled: { opacity: "0.5", cursor: "not-allowed" },
			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},
		},

		viewTrigger: {
			display: "inline-flex",
			alignItems: "center",
			gap: "{spacing.xs}",
			paddingInline: "{spacing.sm}",
			height: "2rem",
			bg: "transparent",
			color: "{colors.foreground}",
			border: "1px solid transparent",
			borderRadius: "{radii.2xl}",
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",

			_hover: { bg: "{colors.surface.muted}" },
		},

		grid: {
			borderCollapse: "separate",
			borderSpacing: "0",
			width: "100%",
		},

		rowHeader: {
			padding: "{spacing.xs}",
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			color: "{colors.foreground.tertiary}",
			textAlign: "center",
		},

		row: {},

		cell: { padding: "1px", textAlign: "center" },

		cellTrigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			width: "2rem",
			height: "2rem",
			borderRadius: "{radii.full}",
			bg: "transparent",
			color: "{colors.foreground}",
			border: "1px solid transparent",
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.regular}",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",

			_hover: { bg: "{colors.surface.muted}" },

			"&[data-today='true']": {
				borderColor: "{colors.interactive.base}",
			},

			"&[data-selected='true']": {
				bg: "{colors.interactive.base}",
				color: "{colors.foreground.inverse}",
				borderColor: "{colors.interactive.base}",
				_hover: { bg: "color-mix(in oklab, {colors.interactive.base} 80%, transparent)" },
			},

			"&[data-in-range='true']": {
				bg: "color-mix(in oklab, {colors.interactive.base} 10%, transparent)",
				borderRadius: "0",
			},

			"&[data-range-start='true']": {
				bg: "{colors.interactive.base}",
				color: "{colors.foreground.inverse}",
				borderStartStartRadius: "{radii.full}",
				borderEndStartRadius: "{radii.full}",
			},

			"&[data-range-end='true']": {
				bg: "{colors.interactive.base}",
				color: "{colors.foreground.inverse}",
				borderStartEndRadius: "{radii.full}",
				borderEndEndRadius: "{radii.full}",
			},

			"&[data-outside-range='true'], &[data-outside-month='true']": {
				color: "{colors.foreground.tertiary}",
			},

			_disabled: {
				opacity: "0.3",
				cursor: "not-allowed",
				textDecoration: "line-through",
			},

			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},
		},
	},
	variants: {
		size: {
			sm: {
				root: { padding: "{spacing.sm}" },
				cellTrigger: { width: "1.75rem", height: "1.75rem", fontSize: "{fontSizes.xs}" },
			},
			md: {},
			lg: {
				root: { padding: "{spacing.lg}" },
				cellTrigger: { width: "2.5rem", height: "2.5rem", fontSize: "{fontSizes.md}" },
			},
		},
		variant: {
			default: {},
			bordered: {
				root: { border: "1px solid {colors.border.hairline}", borderRadius: "{radii.3xl}" },
			},
		},
	},
	defaultVariants: { size: "md", variant: "default" },
});

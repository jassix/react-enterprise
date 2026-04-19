import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Alert dialog — luma signature: identical to Dialog (rounded-4xl content,
 * lighter backdrop with `@supports`-gated blur). Adds explicit cancel/confirm
 * trigger slots styled like outline / destructive button chips, but each
 * primitive can also pass any styled `Button` via `asChild`.
 */
export const alertDialogRecipe = defineSlotRecipe({
	className: "alert-dialog",
	description: "Luma alert dialog — modal with cancel/confirm actions",
	jsx: ["AlertDialog"],
	slots: [
		"backdrop",
		"positioner",
		"content",
		"header",
		"media",
		"title",
		"description",
		"body",
		"footer",
		"cancelTrigger",
		"confirmTrigger",
	],
	base: {
		backdrop: {
			position: "fixed",
			inset: "0",
			zIndex: "{zIndex.overlay}",
			bg: "rgba(0, 0, 0, 0.3)",
			willChange: "opacity",

			"@supports (backdrop-filter: blur(0))": { backdropFilter: "blur(4px)" },

			_open: { animation: "fadeIn {durations.surface} {easings.easeOut}" },
			_closed: { animation: "fadeOut {durations.normal} {easings.easeOut}" },
		},

		positioner: {
			position: "fixed",
			inset: "0",
			zIndex: "{zIndex.modal}",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: "{spacing.lg}",
			overflow: "auto",
		},

		content: {
			position: "relative",
			display: "flex",
			flexDirection: "column",
			gap: "{spacing.xl}",
			bg: "{colors.background.popover}",
			borderRadius: "{radii.4xl}",
			padding: "{spacing.xl}",
			boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
			outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
			outlineOffset: "-1px",
			color: "{colors.foreground}",
			fontSize: "{fontSizes.sm}",
			maxWidth: "calc(100% - {spacing.xl})",
			maxHeight: "calc(100% - {spacing.xl})",
			transformOrigin: "center",
			willChange: "transform, opacity",
			_dark: { outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)" },

			_open: { animation: "scaleIn {durations.surface} {easings.easeOut}" },
			_closed: { animation: "scaleOut {durations.normal} {easings.easeOut}" },

			"@media (prefers-reduced-motion: reduce)": {
				_open: { animation: "fadeIn {durations.normal} {easings.easeOut}" },
				_closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
			},
		},

		header: {
			display: "grid",
			gridTemplateRows: "auto 1fr",
			placeItems: "center",
			gap: "0.375rem", // 6 — luma `gap-1.5`
			textAlign: "center",

			// When a media chip is present, reserve a column for it.
			"&:has([data-slot='alert-dialog-media'])": {
				gridTemplateRows: "auto auto 1fr",
				columnGap: "{spacing.xl}",
			},

			// sm: size="default" flips to left-aligned two-column layout.
			"@media (min-width: 640px)": {
				"[data-size='default'] &": {
					placeItems: "start",
					textAlign: "start",
				},
				"[data-size='default'] &:has([data-slot='alert-dialog-media'])": {
					gridTemplateRows: "auto 1fr",
				},
			},
		},

		// Circular icon chip — luma `mb-2 inline-flex size-16 rounded-full bg-muted`.
		media: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			flexShrink: "0",
			width: "4rem", // 64 — luma `size-16`
			height: "4rem",
			marginBottom: "{spacing.sm}",
			borderRadius: "{radii.full}",
			bg: "{colors.surface.muted}",
			color: "{colors.foreground}",

			"& svg": { pointerEvents: "none" },
			"& svg:not([class*='size-'])": { width: "2rem", height: "2rem" }, // luma `size-8`

			"@media (min-width: 640px)": {
				"[data-size='default'] &": { gridRow: "span 2 / span 2" },
			},
		},

		title: {
			fontFamily: "{fonts.heading}",
			fontSize: "{fontSizes.lg}", // 18 — luma `text-lg`
			fontWeight: "{fontWeights.medium}",
			lineHeight: "1",
			color: "{colors.foreground}",

			"@media (min-width: 640px)": {
				"[data-size='default']:has([data-slot='alert-dialog-media']) &": {
					gridColumnStart: "2",
				},
			},
		},

		description: {
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground.tertiary}",
			lineHeight: "{lineHeight.normal}",
			textWrap: "balance",

			"@media (min-width: 768px)": { textWrap: "pretty" },

			"& > a": {
				textDecoration: "underline",
				textUnderlineOffset: "3px",
				_hover: { color: "{colors.foreground}" },
			},
		},

		body: { color: "{colors.foreground}" },

		footer: {
			display: "flex",
			flexDirection: "column-reverse",
			gap: "{spacing.sm}",

			// sm size keeps the footer as a 2-col grid to split cancel/confirm.
			"[data-size='sm'] &": {
				display: "grid",
				gridTemplateColumns: "1fr 1fr",
			},

			"@media (min-width: 640px)": {
				flexDirection: "row",
				justifyContent: "flex-end",
			},
		},

		// Default-styled trigger chips. Consumers will usually pass `<Button asChild>`.
		cancelTrigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			height: "2.25rem",
			paddingInline: "{spacing.md}",
			fontFamily: "{fonts.body}",
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			borderRadius: "{radii.4xl}",
			border: "1px solid {colors.border}",
			bg: "{colors.background}",
			color: "{colors.foreground}",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",
			_hover: { bg: "{colors.surface.muted}" },
			"&:not([aria-haspopup]):active": { transform: "translateY(1px)" },
			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
			},
		},

		confirmTrigger: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			height: "2.25rem",
			paddingInline: "{spacing.md}",
			fontFamily: "{fonts.body}",
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.medium}",
			borderRadius: "{radii.4xl}",
			border: "1px solid transparent",
			bg: "color-mix(in oklab, {colors.critical} 10%, transparent)",
			color: "{colors.critical.text}",
			cursor: "pointer",
			outline: "none",
			transition: "all {durations.press} {easings.easeOut}",
			_hover: { bg: "color-mix(in oklab, {colors.critical} 20%, transparent)" },
			"&:not([aria-haspopup]):active": { transform: "translateY(1px)" },
			_focusVisible: {
				borderColor: "color-mix(in oklab, {colors.critical} 40%, transparent)",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
			},
		},
	},
	variants: {
		intent: {
			critical: {},
			caution: {
				confirmTrigger: {
					bg: "color-mix(in oklab, {colors.caution} 15%, transparent)",
					color: "{colors.caution.text}",
					_hover: { bg: "color-mix(in oklab, {colors.caution} 25%, transparent)" },
				},
			},
			primary: {
				confirmTrigger: {
					bg: "{colors.interactive.base}",
					color: "{colors.foreground.inverse}",
					_hover: { bg: "color-mix(in oklab, {colors.interactive.base} 80%, transparent)" },
				},
			},
		},
		size: {
			sm: { content: { width: "24rem" } },
			md: { content: { width: "28rem" } },
			lg: { content: { width: "36rem" } },
		},
	},
	defaultVariants: { intent: "critical", size: "md" },
});

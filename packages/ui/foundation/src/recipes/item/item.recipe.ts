import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Item — luma signature: `rounded-2xl` row with media / content / actions
 * slots. Spacing comes from `size` (xs / sm / default / lg); default uses
 * `gap-3.5 px-4 py-3.5`. `variant="muted"` fills with 50%-muted surface;
 * `outline` keeps a 1px border; `default` is a bare row (transparent border).
 * Media has its own variants — bare / icon (size-4 svg) / image (size-10
 * `rounded-xl`, shrinks to size-8 on sm and size-6 on xs).
 */
export const itemRecipe = defineSlotRecipe({
	className: "item",
	description: "Luma item — row with media / content (title + description) / actions",
	jsx: ["Item"],
	slots: [
		"root",
		"group",
		"header",
		"footer",
		"media",
		"content",
		"title",
		"description",
		"actions",
		"separator",
	],
	base: {
		root: {
			display: "flex",
			flexWrap: "wrap",
			alignItems: "center",
			width: "100%",
			borderRadius: "{radii.2xl}",
			border: "1px solid transparent",
			fontSize: "{fontSizes.sm}",
			outline: "none",
			color: "{colors.foreground}",
			textAlign: "start",
			transition:
				"background-color {durations.press} {easings.easeOut}, border-color {durations.press} {easings.easeOut}, color {durations.press} {easings.easeOut}",

			"& a": {
				transition: "background-color {durations.press} {easings.easeOut}",
				_hover: { bg: "{colors.surface.muted}" },
			},

			_focusVisible: {
				borderColor: "{colors.focus.ring}",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 50%, transparent)",
			},
		},

		group: {
			display: "flex",
			width: "100%",
			flexDirection: "column",
			gap: "{spacing.lg}", // 16 — luma `gap-4`
		},

		header: {
			display: "flex",
			flexBasis: "100%",
			alignItems: "center",
			justifyContent: "space-between",
			gap: "{spacing.sm}",
		},

		footer: {
			display: "flex",
			flexBasis: "100%",
			alignItems: "center",
			justifyContent: "space-between",
			gap: "{spacing.sm}",
		},

		media: {
			display: "flex",
			flexShrink: 0,
			alignItems: "center",
			justifyContent: "center",
			gap: "{spacing.sm}",

			// When the item has a description, nudge the media down 2px and top-
			// align — luma pattern to keep the icon visually centered on the title.
			"[data-slot='item']:has([data-slot='item-description']) &": {
				alignSelf: "start",
				transform: "translateY(2px)",
			},

			"& svg": { pointerEvents: "none" },
		},

		content: {
			display: "flex",
			flex: "1",
			flexDirection: "column",
			gap: "{spacing.xs}",
			minWidth: "0",

			// Stacked content rows — the second one drops the flex-grow so it
			// hugs to its content (luma `+[data-slot=item-content]:flex-none`).
			"& + &": { flex: "none" },
		},

		title: {
			display: "flex",
			width: "fit-content",
			alignItems: "center",
			gap: "{spacing.sm}",
			fontSize: "{fontSizes.sm}",
			lineHeight: "1.375", // luma `leading-snug`
			fontWeight: "{fontWeights.medium}",
			textUnderlineOffset: "4px",
			overflow: "hidden",
			display: "-webkit-box",
			WebkitLineClamp: "1",
			WebkitBoxOrient: "vertical",
		},

		description: {
			fontSize: "{fontSizes.sm}",
			fontWeight: "{fontWeights.regular}",
			textAlign: "start",
			color: "{colors.foreground.tertiary}",
			overflow: "hidden",
			display: "-webkit-box",
			WebkitLineClamp: "2",
			WebkitBoxOrient: "vertical",

			"& > a": {
				textDecoration: "underline",
				textUnderlineOffset: "4px",
				_hover: { color: "{colors.interactive.base}" },
			},
		},

		actions: {
			display: "flex",
			alignItems: "center",
			gap: "{spacing.sm}",
		},

		separator: {
			marginBlock: "{spacing.sm}", // 8 — luma `my-2`
			height: "1px",
			width: "100%",
			bg: "{colors.border}",
		},
	},
	variants: {
		size: {
			xs: {
				root: {
					gap: "0.625rem", // 10 — luma `gap-2.5`
					paddingInline: "{spacing.md}", // 12 — luma `px-3`
					paddingBlock: "0.625rem", // 10 — luma `py-2.5`
				},
				content: { gap: "0.125rem" }, // luma `gap-0.5`
			},
			sm: {
				root: {
					gap: "0.875rem", // 14 — luma `gap-3.5`
					paddingInline: "0.875rem", // 14 — luma `px-3.5`
					paddingBlock: "{spacing.md}", // 12 — luma `py-3`
				},
			},
			md: {
				root: {
					gap: "0.875rem", // 14 — luma default `gap-3.5`
					paddingInline: "{spacing.lg}", // 16 — luma `px-4`
					paddingBlock: "0.875rem", // 14 — luma `py-3.5`
				},
			},
			lg: {
				root: {
					gap: "{spacing.lg}",
					paddingInline: "{spacing.xl}",
					paddingBlock: "{spacing.lg}",
				},
				title: { fontSize: "{fontSizes.md}" },
			},
		},
		variant: {
			default: {},
			muted: {
				root: { bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)" },
			},
			outline: {
				root: { borderColor: "{colors.border}" },
			},
		},
		interactive: {
			true: {
				root: {
					cursor: "pointer",
					_hover: { bg: "{colors.surface.muted}" },
				},
			},
		},
	},
	defaultVariants: {
		size: "md",
		variant: "default",
	},
});

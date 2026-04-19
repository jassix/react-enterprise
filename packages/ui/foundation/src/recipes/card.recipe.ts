import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Card — luma signature: `rounded-4xl` elevated surface (`bg-card`), subtle
 * `shadow-md` + `ring-1 ring-foreground/5` outline (10% in dark), vertical-only
 * padding on the root with horizontal padding handled by the Header / Content
 * / Footer slots. Images used as first/last children clip to the 4xl radius on
 * the corresponding edge and drop adjacent padding — matches luma's
 * `has-[>img:first-child]:pt-0` / `*:[img:first-child]:rounded-t-4xl` pattern.
 *
 * Size is a single `sm | md` knob that scales the vertical rhythm (py and gap)
 * and the horizontal padding of the slots — mirrors luma's `data-size`.
 */
export const cardRecipe = defineSlotRecipe({
	className: "card",
	description: "Luma card — rounded-4xl elevated surface with composable slots",
	jsx: ["Card"],
	slots: ["root", "header", "title", "description", "action", "content", "footer"],
	base: {
		root: {
			display: "flex",
			flexDirection: "column",
			overflow: "hidden",
			position: "relative",
			bg: "{colors.background.popover}",
			color: "{colors.foreground}",
			borderRadius: "{radii.4xl}", // 28 — luma `rounded-4xl`
			fontSize: "{fontSizes.sm}",
			// `shadow-md` + `ring-1 ring-foreground/5` — quiet lift above the page
			// with a 1px outline (inward, via outlineOffset: -1px) so it doesn't
			// extend the bounding box.
			boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.07), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
			outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
			outlineOffset: "-1px",
			transition:
				"transform {durations.normal} {easings.easeOut}, box-shadow {durations.normal} {easings.easeOut}, border-color {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}",

			_dark: {
				outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)",
			},

			// Leading / trailing images: clip to the card's rounded corners and
			// drop the adjacent vertical padding so the image becomes the edge.
			"& > img:first-child": {
				borderTopLeftRadius: "{radii.4xl}",
				borderTopRightRadius: "{radii.4xl}",
			},
			"& > img:last-child": {
				borderBottomLeftRadius: "{radii.4xl}",
				borderBottomRightRadius: "{radii.4xl}",
			},
			"&:has(> img:first-child)": {
				paddingTop: "0",
			},
			"&:has(> img:last-child)": {
				paddingBottom: "0",
			},

			"@media (prefers-reduced-motion: reduce)": {
				transition:
					"box-shadow {durations.normal} {easings.easeOut}, border-color {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}",
			},
		},

		// Header is a grid so an Action slot can occupy the right column while
		// Title + Description stack in the left column. Matches luma exactly.
		header: {
			display: "grid",
			gridAutoRows: "min-content",
			alignItems: "start",
			gap: "{spacing.xs}", // 4 — luma `gap-1.5` rounded to /4
			"&:has([data-slot='card-action'])": {
				gridTemplateColumns: "1fr auto",
			},
			"&:has([data-slot='card-description'])": {
				gridTemplateRows: "auto auto",
			},
		},

		title: {
			fontFamily: "{fonts.heading}",
			fontSize: "{fontSizes.md}", // 16 — luma `text-base`
			fontWeight: "{fontWeights.medium}",
			lineHeight: "{lineHeight.tight}",
			color: "{colors.foreground}",
		},

		description: {
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground.tertiary}",
			lineHeight: "{lineHeight.normal}",
		},

		action: {
			gridColumnStart: "2",
			gridRow: "1 / span 2",
			alignSelf: "start",
			justifySelf: "end",
		},

		content: {
			// Padding is applied per-size via variants below.
		},

		footer: {
			display: "flex",
			alignItems: "center",
		},
	},
	variants: {
		size: {
			sm: {
				root: {
					gap: "{spacing.lg}", // 16 — luma `gap-4`
					paddingBlock: "{spacing.lg}", // 16 — luma `py-4`
				},
				header: { paddingInline: "{spacing.lg}" }, // 16 — luma `px-4`
				content: { paddingInline: "{spacing.lg}" },
				footer: { paddingInline: "{spacing.lg}" },
			},
			md: {
				root: {
					gap: "{spacing.xl}", // 24 — luma `gap-6`
					paddingBlock: "{spacing.xl}", // 24 — luma `py-6`
				},
				header: { paddingInline: "{spacing.xl}" }, // 24 — luma `px-6`
				content: { paddingInline: "{spacing.xl}" },
				footer: { paddingInline: "{spacing.xl}" },
			},
		},
		interactive: {
			true: {
				root: {
					cursor: "pointer",
					_hover: {
						transform: "translateY(-2px)",
						boxShadow:
							"0 10px 15px -3px rgb(0 0 0 / 0.08), 0 4px 6px -4px rgb(0 0 0 / 0.08)",
					},
					"&:not([aria-haspopup]):active": { transform: "translateY(0)" },

					"@media (prefers-reduced-motion: reduce)": {
						_hover: { transform: "none" },
						_active: { transform: "none" },
					},
				},
			},
		},
	},
	defaultVariants: { size: "md" },
});

import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Alert — luma signature: `rounded-2xl` surface with a 4px vertical gap
 * (`gap-0.5`). The icon column is conditional — grid switches to `auto 1fr`
 * only when an svg is present (`has-[>svg]`), otherwise title / description
 * stack full-width. `data-slot='alert-action'` reserves a corner for a close
 * chip (absolute `top-2.5 right-3`, with `pr-18` on the root to keep text
 * clear of it).
 *
 * `variant`: `default` (bg-card) is the luma shadcn signature; `subtle` /
 * `solid` / `outline` layer in the shared status-tint system for info /
 * positive / caution / critical.
 */
export const alertRecipe = defineSlotRecipe({
	className: "alert",
	description: "Luma alert — rounded-2xl surface with icon / title / description / action slots",
	jsx: ["Alert"],
	slots: ["root", "title", "description", "action"],
	base: {
		root: {
			position: "relative",
			display: "grid",
			width: "100%",
			textAlign: "left",
			gap: "0.125rem", // 2 — luma `gap-0.5`
			paddingInline: "{spacing.lg}", // 16 — luma `px-4`
			paddingBlock: "{spacing.md}", // 12 — luma `py-3`
			borderRadius: "{radii.2xl}", // 20 — luma `rounded-2xl`
			fontSize: "{fontSizes.sm}",
			lineHeight: "{lineHeight.normal}",

			// Icon column appears only when the alert actually has a leading svg.
			"&:has(> svg)": {
				gridTemplateColumns: "auto 1fr",
				columnGap: "0.625rem", // 10 — luma `gap-x-2.5`
			},

			// Icon spans both rows (title / description) and lifts by 2px to
			// optically center with the title.
			"& > svg": {
				gridRow: "span 2 / span 2",
				transform: "translateY(2px)",
				color: "currentColor",
			},
			"& > svg:not([class*='size-'])": {
				width: "1rem", // 16
				height: "1rem",
			},

			// When an action slot is present, reserve room on the right and
			// position the action absolute top-2.5 right-3.
			"&:has([data-slot='alert-action'])": {
				paddingInlineEnd: "4.5rem", // 72 — luma `pr-18`
			},
		},

		title: {
			fontWeight: "{fontWeights.medium}",
			lineHeight: "{lineHeight.tight}",
			// Only shift the title into the icon column when the alert actually
			// has a leading svg.
			"[data-slot='alert']:has(> svg) &": { gridColumnStart: "2" },
			"& a": {
				textDecoration: "underline",
				textUnderlineOffset: "3px",
				_hover: { color: "{colors.foreground}" },
			},
		},

		description: {
			fontSize: "{fontSizes.sm}",
			color: "{colors.foreground.tertiary}",
			textWrap: "balance",

			"@media (min-width: 768px)": {
				textWrap: "pretty",
			},

			"& a": {
				textDecoration: "underline",
				textUnderlineOffset: "3px",
				_hover: { color: "{colors.foreground}" },
			},
			"& p:not(:last-child)": { marginBottom: "{spacing.lg}" },
		},

		action: {
			position: "absolute",
			top: "0.625rem", // 10 — luma `top-2.5`
			right: "{spacing.md}", // 12 — luma `right-3`
		},
	},
	variants: {
		variant: {
			default: {
				root: {
					bg: "{colors.background.popover}",
					color: "{colors.foreground}",
					border: "1px solid {colors.border.hairline}",
				},
			},
			destructive: {
				root: {
					bg: "{colors.background.popover}",
					color: "{colors.critical.text}",
					border: "1px solid {colors.border.critical}",
				},
				description: {
					color: "color-mix(in oklab, {colors.critical.text} 90%, transparent)",
				},
			},
			subtle: {
				root: { border: "1px solid transparent" },
			},
			solid: {},
			outline: {
				root: {
					bg: "transparent",
					border: "1px solid",
				},
			},
		},
		status: {
			info: {},
			positive: {},
			caution: {},
			critical: {},
		},
	},
	defaultVariants: { variant: "default" },
	compoundVariants: [
		// subtle × status — tinted fill keyed off the status accent
		{
			variant: "subtle",
			status: "info",
			css: { root: { bg: "{colors.info.bg}", color: "{colors.info.text}" } },
		},
		{
			variant: "subtle",
			status: "positive",
			css: { root: { bg: "{colors.positive.bg}", color: "{colors.positive.text}" } },
		},
		{
			variant: "subtle",
			status: "caution",
			css: { root: { bg: "{colors.caution.bg}", color: "{colors.caution.text}" } },
		},
		{
			variant: "subtle",
			status: "critical",
			css: { root: { bg: "{colors.critical.bg}", color: "{colors.critical.text}" } },
		},
		// solid × status — accent fill + inverse text
		{
			variant: "solid",
			status: "info",
			css: { root: { bg: "{colors.info.accent}", color: "{colors.foreground.inverse}" } },
		},
		{
			variant: "solid",
			status: "positive",
			css: { root: { bg: "{colors.positive.accent}", color: "{colors.foreground.inverse}" } },
		},
		{
			variant: "solid",
			status: "caution",
			css: { root: { bg: "{colors.caution.accent}", color: "{colors.foreground}" } },
		},
		{
			variant: "solid",
			status: "critical",
			css: { root: { bg: "{colors.critical.accent}", color: "{colors.foreground.inverse}" } },
		},
		// outline × status — colored border, status-tinted text
		{
			variant: "outline",
			status: "info",
			css: { root: { borderColor: "{colors.border.info}", color: "{colors.info.text}" } },
		},
		{
			variant: "outline",
			status: "positive",
			css: {
				root: { borderColor: "{colors.border.positive}", color: "{colors.positive.text}" },
			},
		},
		{
			variant: "outline",
			status: "caution",
			css: { root: { borderColor: "{colors.border.caution}", color: "{colors.caution.text}" } },
		},
		{
			variant: "outline",
			status: "critical",
			css: {
				root: { borderColor: "{colors.border.critical}", color: "{colors.critical.text}" },
			},
		},
	],
});

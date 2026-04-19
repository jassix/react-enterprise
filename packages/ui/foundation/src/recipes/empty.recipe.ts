import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Empty — luma signature: centered `rounded-2xl` column with `p-12` padding
 * and `gap-4` rhythm. Header caps at `max-w-sm` with `gap-2`; icon sits in a
 * `size-10` rounded-xl muted chip (default is bare, `variant="icon"` adds the
 * chip). Title uses heading-cased text-lg, description is balanced muted body.
 */
export const emptyRecipe = defineSlotRecipe({
	className: "empty",
	description: "Luma empty — zero-state placeholder with header / content slots",
	jsx: ["Empty"],
	slots: ["root", "header", "icon", "title", "description", "content", "actions"],
	base: {
		root: {
			display: "flex",
			flex: "1",
			width: "100%",
			minWidth: "0",
			flexDirection: "column",
			alignItems: "center",
			justifyContent: "center",
			gap: "{spacing.lg}", // 16 — luma `gap-4`
			padding: "3rem", // 48 — luma `p-12`
			borderRadius: "{radii.2xl}",
			textAlign: "center",
			textWrap: "balance",
			borderStyle: "dashed",
			color: "{colors.foreground.tertiary}",
		},

		header: {
			display: "flex",
			flexDirection: "column",
			alignItems: "center",
			gap: "{spacing.sm}", // 8 — luma `gap-2`
			maxWidth: "24rem", // luma `max-w-sm`
		},

		icon: {
			display: "flex",
			flexShrink: 0,
			alignItems: "center",
			justifyContent: "center",
			marginBottom: "{spacing.sm}",

			"& svg": { pointerEvents: "none", flexShrink: 0 },
		},

		title: {
			fontFamily: "{fonts.heading}",
			fontSize: "{fontSizes.lg}", // 18 — luma `text-lg`
			fontWeight: "{fontWeights.medium}",
			letterSpacing: "-0.01em", // luma `tracking-tight`
			color: "{colors.foreground}",
		},

		description: {
			fontSize: "{fontSizes.sm}",
			lineHeight: "1.625", // luma `text-sm/relaxed`
			color: "{colors.foreground.tertiary}",

			"& > a": {
				textDecoration: "underline",
				textUnderlineOffset: "4px",
				_hover: { color: "{colors.interactive.base}" },
			},
		},

		content: {
			display: "flex",
			width: "100%",
			maxWidth: "24rem",
			minWidth: "0",
			flexDirection: "column",
			alignItems: "center",
			gap: "{spacing.lg}", // 16 — luma `gap-4`
			fontSize: "{fontSizes.sm}",
			textWrap: "balance",
		},

		actions: {
			display: "inline-flex",
			alignItems: "center",
			justifyContent: "center",
			gap: "{spacing.sm}",
			marginTop: "{spacing.sm}",
			flexWrap: "wrap",
		},
	},
	variants: {
		size: {
			sm: { root: { padding: "{spacing.2xl}" } },
			md: {},
			lg: { root: { padding: "4rem" } },
		},
		variant: {
			default: {},
			// Icon variant adds the `size-10 rounded-xl bg-muted` chip around
			// the icon slot — matches luma's `EmptyMedia variant="icon"`.
			icon: {
				icon: {
					width: "2.5rem", // 40 — luma `size-10`
					height: "2.5rem",
					borderRadius: "{radii.xl}",
					bg: "{colors.surface.muted}",
					color: "{colors.foreground}",
					"& svg:not([class*='size-'])": { width: "1.25rem", height: "1.25rem" }, // 20 — luma `size-5`
				},
			},
			muted: { root: { bg: "{colors.surface.subtle}", borderStyle: "solid" } },
			dashed: {
				root: {
					border: "2px dashed {colors.border}",
					borderRadius: "{radii.3xl}",
				},
			},
		},
	},
	defaultVariants: { size: "md", variant: "default" },
});

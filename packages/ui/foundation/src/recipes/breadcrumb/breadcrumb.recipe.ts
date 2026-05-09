import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Breadcrumb — luma signature: wrapping `<nav>` → `<ol>` with `gap-1.5`
 * (sm:gap-2.5), text-sm, muted-foreground for inactive links, foreground for
 * the active page. Separator is an inline `<li>` with `size-3.5` svg.
 */
export const breadcrumbRecipe = defineSlotRecipe({
	className: "breadcrumb",
	description: "Luma breadcrumb — nav/list/item/link/page/separator/ellipsis",
	jsx: ["Breadcrumb"],
	slots: ["root", "list", "item", "link", "page", "separator", "ellipsis"],
	base: {
		root: {
			// bare `<nav>` — Luma keeps this slot styleless.
		},
		list: {
			display: "flex",
			flexWrap: "wrap",
			alignItems: "center",
			gap: "0.375rem", // 6 — luma `gap-1.5`
			fontSize: "{fontSizes.sm}",
			wordBreak: "break-word",
			color: "{colors.foreground.tertiary}",

			"@media (min-width: 640px)": {
				gap: "0.625rem", // 10 — luma `sm:gap-2.5`
			},
		},
		item: {
			display: "inline-flex",
			alignItems: "center",
			gap: "0.375rem",
		},
		link: {
			cursor: "pointer",
			transition: "color {durations.press} {easings.easeOut}",
			color: "inherit",
			_hover: { color: "{colors.foreground}" },
		},
		page: {
			fontWeight: "{fontWeights.regular}",
			color: "{colors.foreground}",
		},
		separator: {
			display: "inline-flex",
			alignItems: "center",
			"& > svg": { width: "0.875rem", height: "0.875rem" }, // 14 — luma `size-3.5`
		},
		ellipsis: {
			display: "flex",
			width: "1.25rem", // 20 — luma `size-5`
			height: "1.25rem",
			alignItems: "center",
			justifyContent: "center",
			"& > svg": { width: "1rem", height: "1rem" }, // 16 — luma `size-4`
		},
	},
});

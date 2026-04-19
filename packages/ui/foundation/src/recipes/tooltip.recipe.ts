import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Tooltip — luma signature: small inverted chip (bg = foreground, text =
 * background). `text-xs`, tight padding, `rounded-lg`. Subsequent tooltips
 * with `data-instant` skip the animation — keeps tooltip-dense toolbars snappy.
 */
export const tooltipRecipe = defineSlotRecipe({
	className: "tooltip",
	description: "Luma tooltip — inverted chip for contextual hints",
	jsx: ["Tooltip"],
	slots: ["trigger", "positioner", "content", "arrow"],
	base: {
		trigger: { cursor: "pointer" },

		positioner: {
			position: "absolute",
			zIndex: "{zIndex.tooltip}",
		},

		content: {
			position: "relative",
			display: "inline-flex",
			alignItems: "center",
			gap: "0.375rem", // 6 — luma `gap-1.5`
			bg: "{colors.foreground}",
			color: "{colors.background}",
			fontSize: "{fontSizes.xs}",
			fontWeight: "{fontWeights.medium}",
			borderRadius: "{radii.xl}", // 16 — luma `rounded-xl`
			paddingInline: "{spacing.md}", // 12 — luma `px-3`
			paddingBlock: "0.375rem", // 6 — luma `py-1.5`
			width: "fit-content",
			maxWidth: "20rem",
			"&:has([data-slot='kbd'])": { paddingInlineEnd: "0.375rem" },
			boxShadow: "0 4px 8px -2px rgb(0 0 0 / 0.1)",
			transformOrigin: "var(--transform-origin)",
			willChange: "transform, opacity",

			_open: { animation: "scaleIn {durations.tooltip} {easings.easeOut}" },
			_closed: { animation: "scaleOut {durations.tooltip} {easings.easeOut}" },

			// Subsequent tooltips skip the animation — Emil's toolbar trick.
			"&[data-instant]": { animation: "none !important" },

			"@media (prefers-reduced-motion: reduce)": {
				_open: { animation: "fadeIn {durations.tooltip} {easings.easeOut}" },
				_closed: { animation: "fadeOut {durations.tooltip} {easings.easeOut}" },
			},
		},

		arrow: {
			"--arrow-size": "{spacing.xs}",
			"--arrow-background": "{colors.foreground}",
		},
	},
});

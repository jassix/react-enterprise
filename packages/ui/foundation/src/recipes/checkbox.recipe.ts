import { defineRecipe } from "@pandacss/dev";

/**
 * Checkbox — luma signature: rounded-xs (4px) chip, translucent input fill,
 * 1px transparent border that lights up to focus ring, checked state swaps to
 * `interactive.base` with `foreground.inverse` text. Indicator (the tick) is
 * a descendant slot the consumer renders an icon into; sized via this recipe.
 */
export const checkboxRecipe = defineRecipe({
	className: "checkbox",
	description: "Luma checkbox — control chip with intent-driven checked state",
	jsx: ["CheckboxControl"],
	base: {
		position: "relative",
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flexShrink: 0,
		width: "1rem", // 16 — luma `size-4`
		height: "1rem",
		borderRadius: "0.3125rem", // 5 — luma `rounded-[5px]`
		border: "1px solid transparent",
		bg: "color-mix(in oklab, {colors.border} 90%, transparent)", // luma `bg-input/90`
		color: "{colors.foreground.inverse}",
		cursor: "pointer",
		outline: "none",
		transition: "box-shadow {durations.press} {easings.easeOut}",

		// Extend the click target outward — luma's `after:-inset-x-3 -inset-y-2`.
		_after: {
			content: "''",
			position: "absolute",
			top: "-0.5rem",
			right: "-0.75rem",
			bottom: "-0.5rem",
			left: "-0.75rem",
		},

		"& [data-slot='checkbox-indicator']": {
			display: "grid",
			placeContent: "center",
			color: "currentColor",
		},
		"& [data-slot='checkbox-indicator'] svg": {
			width: "0.875rem",
			height: "0.875rem",
		},

		_disabled: {
			cursor: "not-allowed",
			opacity: "0.5",
		},

		_focusVisible: {
			borderColor: "{colors.focus.ring}",
			boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
		},

		"&[aria-invalid='true']": {
			borderColor: "{colors.critical}",
			boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
			_dark: {
				borderColor: "color-mix(in oklab, {colors.critical} 50%, transparent)",
				boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
			},
		},

		// Invalid + checked — border flips to primary (luma pattern so that a
		// ticked-but-invalid checkbox doesn't read as erroring).
		"&[aria-invalid='true'][aria-checked='true'], &[aria-invalid='true'][data-state='checked']": {
			borderColor: "{colors.interactive.base}",
		},

		_checked: {
			bg: "{colors.interactive.base}",
			borderColor: "{colors.interactive.base}",
			_dark: { bg: "{colors.interactive.base}" },
		},

		// Group-disabled support — luma's `group-has-disabled/field:opacity-50`.
		"[data-disabled='true'] &": { opacity: "0.5", cursor: "not-allowed" },
	},
	variants: {
		size: {
			sm: {
				width: "0.875rem", // 14px
				height: "0.875rem",
				"& [data-slot='checkbox-indicator'] svg": {
					width: "0.75rem",
					height: "0.75rem",
				},
			},
			md: {
				width: "1rem", // 16px
				height: "1rem",
			},
			lg: {
				width: "1.25rem", // 20px
				height: "1.25rem",
				borderRadius: "{radii.sm}", // 8px
				"& [data-slot='checkbox-indicator'] svg": {
					width: "1rem",
					height: "1rem",
				},
			},
		},
		intent: {
			primary: {},
			critical: {},
			positive: {},
			caution: {},
			info: {},
		},
	},
	defaultVariants: {
		size: "md",
		intent: "primary",
	},
	compoundVariants: [
		{
			intent: "critical",
			css: {
				_checked: {
					bg: "{colors.critical.accent}",
					borderColor: "{colors.critical.accent}",
				},
			},
		},
		{
			intent: "positive",
			css: {
				_checked: {
					bg: "{colors.positive.accent}",
					borderColor: "{colors.positive.accent}",
				},
			},
		},
		{
			intent: "caution",
			css: {
				_checked: {
					bg: "{colors.caution.accent}",
					borderColor: "{colors.caution.accent}",
					color: "{colors.foreground}",
				},
			},
		},
		{
			intent: "info",
			css: {
				_checked: {
					bg: "{colors.info.accent}",
					borderColor: "{colors.info.accent}",
				},
			},
		},
	],
});

import { defineRecipe } from "@pandacss/dev";

/**
 * Switch — luma signature: pill track with translucent input fill (unchecked)
 * → `interactive.base` (checked); thumb is a circle that translates X by the
 * track width minus thumb diameter. Track grows the click target outward via
 * `_after`. Intent compounds re-color the checked track.
 */
export const switchRecipe = defineRecipe({
	className: "toggle-switch",
	description: "Luma switch — pill track with intent-driven checked state",
	jsx: ["SwitchControl"],
	base: {
		position: "relative",
		display: "inline-flex",
		alignItems: "center",
		flexShrink: 0,
		borderRadius: "{radii.full}",
		border: "2px solid transparent",
		bg: "color-mix(in oklab, {colors.border} 90%, transparent)", // luma `bg-input/90`
		cursor: "pointer",
		outline: "none",
		transition: "all {durations.press} {easings.easeOut}",

		_after: {
			content: "''",
			position: "absolute",
			top: "-0.5rem",
			right: "-0.75rem",
			bottom: "-0.5rem",
			left: "-0.75rem",
		},

		"& [data-slot='switch-thumb']": {
			pointerEvents: "none",
			display: "block",
			borderRadius: "{radii.full}",
			bg: "{colors.background}",
			boxShadow: "0 1px 2px rgb(0 0 0 / 0.06)", // luma `shadow-sm`
			transition: "transform {durations.press} {easings.easeOut}",
			backgroundClip: "padding-box",

			// Dark-mode thumb colors flip by state — unchecked uses foreground,
			// checked uses primary-foreground.
			_dark: {
				"&[data-state='unchecked'], &[data-unchecked]": { bg: "{colors.foreground}" },
				"&[data-state='checked'], &[data-checked]": { bg: "{colors.foreground.inverse}" },
			},
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

		_checked: {
			bg: "{colors.interactive.base}",
			borderColor: "{colors.interactive.base}",
		},
	},
	variants: {
		size: {
			sm: {
				width: "1.75rem", // 28 — luma `data-[size=sm]:w-7`
				height: "1rem", // 16 — luma `data-[size=sm]:h-4`
				"& [data-slot='switch-thumb']": {
					width: "1rem", // 16 — luma `group-data-[size=sm]/switch:w-4`
					height: "0.75rem", // 12 — luma `group-data-[size=sm]/switch:h-3`
					// 28 - 2*(2 border) - 16 thumb = 8; luma uses calc(100% - 8px)
					_checked: { transform: "translateX(calc(100% - 8px))" },
				},
			},
			md: {
				width: "2.75rem", // 44 — luma `data-[size=default]:w-11`
				height: "1.25rem", // 20 — luma `data-[size=default]:h-5`
				"& [data-slot='switch-thumb']": {
					width: "1.5rem", // 24 — luma `group-data-[size=default]/switch:w-6`
					height: "1rem", // 16 — luma `group-data-[size=default]/switch:h-4`
					_checked: { transform: "translateX(calc(100% - 8px))" },
				},
			},
			lg: {
				width: "3.25rem", // 52
				height: "1.5rem", // 24
				"& [data-slot='switch-thumb']": {
					width: "1.75rem", // 28
					height: "1.25rem", // 20
					_checked: { transform: "translateX(calc(100% - 8px))" },
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
			css: { _checked: { bg: "{colors.critical.accent}", borderColor: "{colors.critical.accent}" } },
		},
		{
			intent: "positive",
			css: { _checked: { bg: "{colors.positive.accent}", borderColor: "{colors.positive.accent}" } },
		},
		{
			intent: "caution",
			css: { _checked: { bg: "{colors.caution.accent}", borderColor: "{colors.caution.accent}" } },
		},
		{
			intent: "info",
			css: { _checked: { bg: "{colors.info.accent}", borderColor: "{colors.info.accent}" } },
		},
	],
});

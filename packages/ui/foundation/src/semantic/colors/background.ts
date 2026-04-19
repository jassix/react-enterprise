/**
 * Pure neutral palette — matches luma/shadcn (`--background`, `--card`,
 * `--popover`). No chroma so the design reads as "color-agnostic" until the
 * primary accent shows up.
 */
export const background = {
	DEFAULT: {
		value: "oklch(1 0 0)",
		_dark: "oklch(0.145 0 0)",
	},
	muted: {
		value: "oklch(0.97 0 0)",
		_dark: "oklch(0.269 0 0)",
	},
	/** Floating-surface bg for popovers/menus/dialogs. Luma's `--popover`. */
	popover: {
		value: "oklch(1 0 0)",
		_dark: "oklch(0.205 0 0)",
	},
} as const;

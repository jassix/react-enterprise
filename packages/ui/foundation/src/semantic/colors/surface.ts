/**
 * Surface taxonomy mapped onto luma's flat-card system. Luma uses one card
 * color (`--card`) and one popover color (`--popover`) — both pure neutral.
 * Our `canvas < subtle < base < raised < elevated` ladder collapses to the
 * same value in light mode; dark mode lifts each tier slightly.
 */
export const surface = {
	canvas: {
		value: "oklch(1 0 0)",
		_dark: "oklch(0.145 0 0)",
	},
	subtle: {
		value: "oklch(0.97 0 0)",
		_dark: "oklch(0.18 0 0)",
	},
	base: {
		value: "oklch(1 0 0)",
		_dark: "oklch(0.205 0 0)",
	},
	raised: {
		value: "oklch(1 0 0)",
		_dark: "oklch(0.205 0 0)",
	},
	elevated: {
		value: "oklch(1 0 0)",
		_dark: "oklch(0.205 0 0)",
	},
	/** `--muted` / `--accent` — both map here. */
	muted: {
		value: "oklch(0.97 0 0)",
		_dark: "oklch(0.269 0 0)",
	},
	panel: {
		value: "oklch(0.97 0 0)",
		_dark: "oklch(0.205 0 0)",
	},
	overlay: {
		value: "rgba(0, 0, 0, 0.3)",
		_dark: "rgba(0, 0, 0, 0.5)",
	},
} as const;

/**
 * Luma's `--ring` is neutral — the focus ring matches the border family rather
 * than the primary accent. Keeps the look consistent across light/dark and lets
 * any primary color drop in without recoloring chrome.
 */
export const focus = {
	ring: {
		value: "oklch(0.708 0 0)",
		_dark: "oklch(0.556 0 0)",
	},
	ringOffset: {
		value: "oklch(1 0 0)",
		_dark: "oklch(0.145 0 0)",
	},
	ringWidth: { value: "3px" },
	ringOffsetWidth: { value: "0px" },
	skipLink: {
		value: "oklch(0.488 0.243 264.376)",
		_dark: "oklch(0.488 0.243 264.376)",
	},
} as const;

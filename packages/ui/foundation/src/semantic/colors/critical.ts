/**
 * Critical / destructive — luma's `--destructive` (red ≈ hue 27). The
 * destructive button uses a 10–20% alpha mix on this base, so `text` keeps the
 * full saturation for readable foreground.
 */
export const critical = {
	DEFAULT: {
		value: "oklch(0.577 0.245 27.325)",
		_dark: "oklch(0.704 0.191 22.216)",
	},
	emphasis: {
		value: "oklch(0.527 0.245 27.325)",
		_dark: "oklch(0.654 0.191 22.216)",
	},
	accent: {
		value: "oklch(0.577 0.245 27.325)",
		_dark: "oklch(0.704 0.191 22.216)",
	},
	text: {
		value: "oklch(0.577 0.245 27.325)",
		_dark: "oklch(0.704 0.191 22.216)",
	},
	bg: {
		value: "oklch(0.97 0.02 27)",
		_dark: "oklch(0.25 0.08 27)",
	},
	muted: {
		value: "oklch(0.94 0.04 27)",
		_dark: "oklch(0.3 0.1 27)",
	},
	background: {
		value: "oklch(0.97 0.02 27)",
		_dark: "oklch(0.25 0.08 27)",
	},
	surface: {
		value: "oklch(0.92 0.06 27)",
		_dark: "oklch(0.35 0.12 27)",
	},
	foreground: {
		value: "oklch(0.42 0.2 27)",
		_dark: "oklch(0.88 0.13 27)",
	},
} as const;

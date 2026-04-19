/**
 * Pure neutral borders — matches luma `--border` (light: oklch(0.922 0 0)) and
 * the translucent dark-mode treatment (`oklch(1 0 0 / 10%)`). Hairline / muted
 * are subtle steps below DEFAULT for divider work; emphasis / strong sit above.
 *
 * Intent borders (focus, critical, …) keep the semantic accent so outline-style
 * components can communicate state via border color.
 */
export const border = {
	hairline: {
		value: "oklch(0.95 0 0)",
		_dark: "oklch(1 0 0 / 6%)",
	},
	DEFAULT: {
		value: "oklch(0.922 0 0)",
		_dark: "oklch(1 0 0 / 10%)",
	},
	muted: {
		value: "oklch(0.95 0 0)",
		_dark: "oklch(1 0 0 / 6%)",
	},
	emphasis: {
		value: "oklch(0.85 0 0)",
		_dark: "oklch(1 0 0 / 16%)",
	},
	strong: {
		value: "oklch(0.708 0 0)",
		_dark: "oklch(0.556 0 0)",
	},
	focus: {
		value: "oklch(0.708 0 0)",
		_dark: "oklch(0.556 0 0)",
	},
	critical: {
		value: "oklch(0.577 0.245 27.325)",
		_dark: "oklch(0.704 0.191 22.216)",
	},
	positive: {
		value: "oklch(0.62 0.17 150)",
		_dark: "oklch(0.68 0.15 150)",
	},
	caution: {
		value: "oklch(0.72 0.17 75)",
		_dark: "oklch(0.78 0.15 75)",
	},
	info: {
		value: "oklch(0.62 0.17 240)",
		_dark: "oklch(0.72 0.15 240)",
	},
} as const;

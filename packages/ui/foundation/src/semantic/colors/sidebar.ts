/**
 * Sidebar — luma's dedicated side-nav palette (`--sidebar`, `--sidebar-*`).
 * Kept separate from the core `background` / `foreground` scales so hosting
 * apps can recolor the nav surface without affecting the rest of the chrome.
 */
export const sidebar = {
	DEFAULT: {
		value: "oklch(0.985 0 0)",
		_dark: "oklch(0.205 0 0)",
	},
	foreground: {
		value: "oklch(0.145 0 0)",
		_dark: "oklch(0.985 0 0)",
	},
	primary: {
		value: "oklch(0.546 0.245 262.881)",
		_dark: "oklch(0.623 0.214 259.815)",
	},
	primaryForeground: {
		value: "oklch(0.97 0.014 254.604)",
		_dark: "oklch(0.97 0.014 254.604)",
	},
	accent: {
		value: "oklch(0.97 0 0)",
		_dark: "oklch(0.269 0 0)",
	},
	accentForeground: {
		value: "oklch(0.205 0 0)",
		_dark: "oklch(0.985 0 0)",
	},
	border: {
		value: "oklch(0.922 0 0)",
		_dark: "oklch(1 0 0 / 10%)",
	},
	ring: {
		value: "oklch(0.708 0 0)",
		_dark: "oklch(0.556 0 0)",
	},
} as const;

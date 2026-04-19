/**
 * Pure neutral text scale — matches luma/shadcn `--foreground`,
 * `--muted-foreground`, `--accent-foreground`. `inverse` is the off-white used
 * on top of the blue primary fill (`--primary-foreground`).
 */
export const foreground = {
	DEFAULT: {
		value: "oklch(0.145 0 0)",
		_dark: "oklch(0.985 0 0)",
	},
	/** `--accent-foreground` — the contrast color on muted/accent surfaces. */
	secondary: {
		value: "oklch(0.205 0 0)",
		_dark: "oklch(0.985 0 0)",
	},
	/** `--muted-foreground` — placeholders, captions, subdued meta. */
	tertiary: {
		value: "oklch(0.556 0 0)",
		_dark: "oklch(0.708 0 0)",
	},
	disabled: {
		value: "oklch(0.708 0 0)",
		_dark: "oklch(0.42 0 0)",
	},
	link: {
		value: "oklch(0.488 0.243 264.376)",
		_dark: "oklch(0.488 0.243 264.376)",
	},
	/** `--primary-foreground` — text on the blue primary fill. */
	inverse: {
		value: "oklch(0.97 0.014 254.604)",
		_dark: "oklch(0.97 0.014 254.604)",
	},
} as const;

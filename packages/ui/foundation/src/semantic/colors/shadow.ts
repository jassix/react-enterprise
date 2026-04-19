/**
 * Tahoe multi-layer shadows. Every elevation stacks:
 *   1. A 1px hairline ring for crisp edge definition.
 *   2. A tight ~1-2px shadow for the "sitting on surface" feel.
 *   3. A soft longer shadow for depth.
 *
 * Dark mode doesn't just bump opacity — it inverts the baseline because dark
 * surfaces absorb light, so drop shadows need to be darker and tighter.
 */
export const shadow = {
	sm: {
		value:
			"0 0 0 1px oklch(0.92 0.004 286), 0 1px 2px -1px rgb(0 0 0 / 0.08)",
		_dark:
			"0 0 0 1px oklch(0.3 0.008 286), 0 1px 2px -1px rgb(0 0 0 / 0.5)",
	},
	md: {
		value:
			"0 0 0 1px oklch(0.92 0.004 286), 0 1px 2px -1px rgb(0 0 0 / 0.06), 0 8px 16px -8px rgb(0 0 0 / 0.12)",
		_dark:
			"0 0 0 1px oklch(0.3 0.008 286), 0 1px 2px -1px rgb(0 0 0 / 0.6), 0 8px 16px -8px rgb(0 0 0 / 0.5)",
	},
	lg: {
		value:
			"0 0 0 1px oklch(0.92 0.004 286), 0 1px 2px -1px rgb(0 0 0 / 0.06), 0 8px 16px -8px rgb(0 0 0 / 0.12), 0 24px 48px -16px rgb(0 0 0 / 0.16)",
		_dark:
			"0 0 0 1px oklch(0.3 0.008 286), 0 1px 2px -1px rgb(0 0 0 / 0.6), 0 8px 16px -8px rgb(0 0 0 / 0.5), 0 24px 48px -16px rgb(0 0 0 / 0.6)",
	},
	xl: {
		value:
			"0 0 0 1px oklch(0.92 0.004 286), 0 2px 4px -2px rgb(0 0 0 / 0.08), 0 12px 24px -8px rgb(0 0 0 / 0.14), 0 32px 64px -16px rgb(0 0 0 / 0.2)",
		_dark:
			"0 0 0 1px oklch(0.3 0.008 286), 0 2px 4px -2px rgb(0 0 0 / 0.6), 0 12px 24px -8px rgb(0 0 0 / 0.55), 0 32px 64px -16px rgb(0 0 0 / 0.65)",
	},
	"2xl": {
		value:
			"0 0 0 1px oklch(0.92 0.004 286), 0 4px 8px -2px rgb(0 0 0 / 0.1), 0 20px 40px -12px rgb(0 0 0 / 0.22), 0 48px 96px -24px rgb(0 0 0 / 0.28)",
		_dark:
			"0 0 0 1px oklch(0.3 0.008 286), 0 4px 8px -2px rgb(0 0 0 / 0.6), 0 20px 40px -12px rgb(0 0 0 / 0.6), 0 48px 96px -24px rgb(0 0 0 / 0.7)",
	},
	inner: {
		value: "inset 0 1px 2px 0 rgb(0 0 0 / 0.06)",
		_dark: "inset 0 1px 2px 0 rgb(0 0 0 / 0.35)",
	},
	// Tahoe-style focus ring — semi-transparent accent glow around the control.
	focus: {
		value: "0 0 0 3px oklch(0.62 0.19 275 / 0.2)",
		_dark: "0 0 0 3px oklch(0.72 0.17 275 / 0.35)",
	},
} as const;

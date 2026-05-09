/**
 * Component-scoped size variants for `dialogRecipe`.
 *
 * Dialog sizes are widths (not heights). `full` consumes viewport width
 * minus page-edge gutters derived from the semantic `spacing.lg` token.
 */
export const dialogSize = {
	xs: { content: { width: "{sizes.80}" } }, // 320px
	sm: { content: { width: "{sizes.96}" } }, // 384px
	md: { content: { width: "{sizes.112}" } }, // 448px — luma `sm:max-w-md`
	lg: { content: { width: "{sizes.128}" } }, // 512px
	xl: { content: { width: "{sizes.192}" } }, // 768px
	full: {
		content: {
			width: "100%",
			maxWidth: "calc(100vw - 2 * {spacing.4})", // 16px gutter each side
		},
	},
} as const;

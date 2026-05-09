/**
 * Component-scoped size variants for `buttonRecipe`.
 *
 * Heights/paddings reference numeric primitives (`{sizes.N}`, `{spacing.N}`)
 * rather than hardcoded rems, so changing the underlying grid step updates
 * every size uniformly. These T-shirt keys are **local** to button — button's
 * `md` (36px) intentionally differs from avatar's `md` (32px).
 */
export const buttonSize = {
	xs: {
		height: "{sizes.6}", // 24px
		minHeight: "{sizes.6}",
		paddingInline: "{spacing.3}", // 12px
		fontSize: "{fontSizes.xs}",
		gap: "{spacing.1}", // 4px
		"& svg:not([class*='size-'])": {
			width: "{sizes.3}", // 12px
			height: "{sizes.3}",
		},
		"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.2}" }, // 8px
		"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.2}" },
	},
	sm: {
		height: "{sizes.8}", // 32px
		minHeight: "{sizes.8}",
		paddingInline: "{spacing.3}", // 12px
		gap: "{spacing.1}", // 4px
		"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.2}" }, // 8px
		"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.2}" },
	},
	md: {
		height: "{sizes.9}", // 36px — luma h-9
		minHeight: "{sizes.9}",
		paddingInline: "{spacing.3}", // 12px
		"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.3}" },
		"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.3}" },
	},
	lg: {
		height: "{sizes.10}", // 40px — luma h-10
		minHeight: "{sizes.10}",
		paddingInline: "{spacing.4}", // 16px
		"&:has([data-icon='inline-end'])": { paddingInlineEnd: "{spacing.3}" }, // 12px
		"&:has([data-icon='inline-start'])": { paddingInlineStart: "{spacing.3}" },
	},
	xl: {
		height: "{sizes.11}", // 44px
		minHeight: "{sizes.11}",
		paddingInline: "{spacing.6}", // 24px
		fontSize: "{fontSizes.md}",
	},
} as const;

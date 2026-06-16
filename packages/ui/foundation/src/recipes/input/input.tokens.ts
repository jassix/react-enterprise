/**
 * Component-scoped size variants for `inputRecipe`.
 *
 * Heights track the control-height ramp in `sizes.*`: md is 36px to match
 * button's md. Paddings use numeric spacing tokens.
 */
export const inputSize = {
  sm: {
    height: "{sizes.8}", // 32px
    minHeight: "{sizes.8}",
    fontSize: "{fontSizes.sm}",
    paddingInline: "{spacing.3}", // 12px
    paddingBlock: "{spacing.1}", // 4px
  },
  md: {
    height: "{sizes.9}", // 36px — luma h-9
    minHeight: "{sizes.9}",
    fontSize: "{fontSizes.sm}",
    paddingInline: "{spacing.3}", // 12px — luma px-3
    paddingBlock: "{spacing.1}", // 4px — luma py-1
  },
  lg: {
    height: "{sizes.10}", // 40px
    minHeight: "{sizes.10}",
    fontSize: "{fontSizes.md}",
    paddingInline: "{spacing.4}", // 16px
    paddingBlock: "{spacing.1}",
  },
  xl: {
    height: "{sizes.11}", // 44px
    minHeight: "{sizes.11}",
    fontSize: "{fontSizes.md}",
    paddingInline: "{spacing.6}", // 24px
    paddingBlock: "{spacing.2}", // 8px
  },
} as const;

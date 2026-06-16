/**
 * Component-scoped size variants for `avatarRecipe`.
 *
 * Widths/heights reference numeric primitives. Avatar's `md` is 32px —
 * distinct from button's `md` (36px), which is the point of keeping these
 * tokens local to the recipe rather than in a global sizes scale.
 */
export const avatarSize = {
  xs: {
    width: "{sizes.5}", // 20px
    height: "{sizes.5}",
    fontSize: "{fontSizes.xs}",
  },
  sm: {
    width: "{sizes.6}", // 24px — luma size-6
    height: "{sizes.6}",
    fontSize: "{fontSizes.xs}",
  },
  md: {
    width: "{sizes.8}", // 32px — luma default size-8
    height: "{sizes.8}",
    fontSize: "{fontSizes.sm}",
  },
  lg: {
    width: "{sizes.10}", // 40px — luma size-10
    height: "{sizes.10}",
    fontSize: "{fontSizes.md}",
  },
  xl: {
    width: "{sizes.12}", // 48px
    height: "{sizes.12}",
    fontSize: "{fontSizes.lg}",
  },
  "2xl": {
    width: "{sizes.16}", // 64px
    height: "{sizes.16}",
    fontSize: "{fontSizes.xl}",
  },
} as const;

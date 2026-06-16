/**
 * Semantic T-shirt aliases over the numeric spacing/sizes primitives.
 *
 * Recipes and app code can write either form and they resolve to the same
 * CSS variable:
 *   {spacing.md}  === {spacing.3}   → 12px
 *   {spacing.lg}  === {spacing.4}   → 16px
 *   {sizes.md}    === {sizes.9}     → 36px (canonical control height)
 *
 * These aliases encode the design-system's opinion about "common steps" —
 * use them for the first-choice values. Reach for numeric primitives only
 * when you need an off-alias step (10px, 14px, 18px).
 */

export const spacing = {
  xs: { value: "{spacing.1}" }, // 4px
  sm: { value: "{spacing.2}" }, // 8px
  md: { value: "{spacing.3}" }, // 12px
  lg: { value: "{spacing.4}" }, // 16px
  xl: { value: "{spacing.6}" }, // 24px
  "2xl": { value: "{spacing.8}" }, // 32px
} as const;

export const sizes = {
  xs: { value: "{sizes.5}" }, // 20px
  sm: { value: "{sizes.7}" }, // 28px
  md: { value: "{sizes.9}" }, // 36px — canonical control height
  lg: { value: "{sizes.11}" }, // 44px
  xl: { value: "{sizes.14}" }, // 56px
  "2xl": { value: "{sizes.16}" }, // 64px
  "3xl": { value: "{sizes.20}" }, // 80px
  "4xl": { value: "{sizes.24}" }, // 96px
  "5xl": { value: "{sizes.28}" }, // 112px
  "6xl": { value: "{sizes.32}" }, // 128px
} as const;

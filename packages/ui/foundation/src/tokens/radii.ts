/**
 * All radii align to the 4px grid. Names follow the conventional shadcn-ish
 * scale; values track luma's intent (rounded chips at the high end) but snap
 * to /4 so they compose cleanly with spacing/sizes.
 */
export const radii = {
  none: { value: "0" },
  xs: { value: "0.25rem" }, // 4px
  sm: { value: "0.5rem" }, // 8px
  md: { value: "0.5rem" }, // 8px — same as sm; use sm/md interchangeably for compact controls
  lg: { value: "0.75rem" }, // 12px — luma's `--radius` rounded up
  xl: { value: "1rem" }, // 16px
  "2xl": { value: "1.25rem" }, // 20px
  "3xl": { value: "1.5rem" }, // 24px — input/textarea (was 22px)
  "4xl": { value: "1.75rem" }, // 28px — button/dialog (luma 26 → /4)
  full: { value: "9999px" },
} as const;

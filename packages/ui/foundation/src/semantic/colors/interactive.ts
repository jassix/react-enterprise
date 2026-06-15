/**
 * Luma's blue primary (`--primary` ≈ oklch(0.488 0.243 264)). Hover/active
 * shift lightness up/down by ~0.04L. `secondary` is the filled neutral chip
 * (`--secondary`); `link` reuses the primary blue.
 */
export const interactive = {
  base: {
    value: "oklch(0.488 0.243 264.376)",
    _dark: "oklch(0.424 0.199 265.638)",
  },
  hover: {
    value: "oklch(0.448 0.243 264.376)",
    _dark: "oklch(0.464 0.199 265.638)",
  },
  active: {
    value: "oklch(0.408 0.243 264.376)",
    _dark: "oklch(0.504 0.199 265.638)",
  },
  selected: {
    value: "oklch(0.94 0.04 264)",
    _dark: "oklch(0.3 0.1 264)",
  },
  /** `--secondary` — filled neutral chip. */
  secondary: {
    value: "oklch(0.967 0.001 286)",
    _dark: "oklch(0.274 0.006 286)",
  },
  secondaryHover: {
    value: "oklch(0.93 0.001 286)",
    _dark: "oklch(0.31 0.006 286)",
  },
  disabled: {
    value: "oklch(0.85 0 0)",
    _dark: "oklch(0.32 0 0)",
  },
  link: {
    value: "oklch(0.488 0.243 264.376)",
    _dark: "oklch(0.488 0.243 264.376)",
  },
  linkHover: {
    value: "oklch(0.448 0.243 264.376)",
    _dark: "oklch(0.448 0.243 264.376)",
  },
} as const;

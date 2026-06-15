/**
 * Icon / glyph / indicator dimensions. Separate from the `sizes` scale — which
 * is control heights — because icon-sized fills (checkbox, spinner, close
 * glyph, list-item indicators) need much smaller footprints than buttons.
 */
export const icons = {
  xs: { value: "12px" },
  sm: { value: "14px" },
  md: { value: "16px" },
  lg: { value: "20px" },
  xl: { value: "24px" },
  "2xl": { value: "32px" },
} as const;

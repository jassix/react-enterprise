/**
 * Primitive size scale — numeric keys unified with `spacing.*` plus a few
 * control-height rungs (7=28px, 9=36px, 11=44px) for buttons/inputs.
 *
 * Component-scoped T-shirt sizes (button.size.md, avatar.size.md …) live
 * co-located with each recipe in `recipes/<name>.tokens.ts` and map into
 * this scale. Use numeric keys directly for ad-hoc widths/heights in app code;
 * use component size variants (`<Button size="md" />`) in the common path.
 */
export const sizes = {
  "0": { value: "0" },
  "0.5": { value: "0.125rem" }, // 2px
  "1": { value: "0.25rem" }, // 4px
  "1.5": { value: "0.375rem" }, // 6px
  "2": { value: "0.5rem" }, // 8px
  "2.5": { value: "0.625rem" }, // 10px
  "3": { value: "0.75rem" }, // 12px
  "3.5": { value: "0.875rem" }, // 14px
  "4": { value: "1rem" }, // 16px
  "5": { value: "1.25rem" }, // 20px — avatar xs
  "6": { value: "1.5rem" }, // 24px — button xs / avatar sm
  "7": { value: "1.75rem" }, // 28px — control height
  "8": { value: "2rem" }, // 32px — input sm / avatar md
  "9": { value: "2.25rem" }, // 36px — button/input md (luma h-9)
  "10": { value: "2.5rem" }, // 40px — button/input lg / avatar lg
  "11": { value: "2.75rem" }, // 44px — button/input xl
  "12": { value: "3rem" }, // 48px — avatar xl
  "14": { value: "3.5rem" }, // 56px
  "16": { value: "4rem" }, // 64px — avatar 2xl
  "20": { value: "5rem" }, // 80px
  "24": { value: "6rem" }, // 96px
  "28": { value: "7rem" }, // 112px
  "32": { value: "8rem" }, // 128px
  "40": { value: "10rem" }, // 160px
  "48": { value: "12rem" }, // 192px
  "64": { value: "16rem" }, // 256px — dialog xs
  "80": { value: "20rem" }, // 320px — dialog sm
  "96": { value: "24rem" }, // 384px — dialog md
  "112": { value: "28rem" }, // 448px
  "128": { value: "32rem" }, // 512px — dialog lg
  "192": { value: "48rem" }, // 768px — dialog xl
} as const;

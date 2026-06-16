import { defineRecipe } from "@pandacss/dev";

/**
 * Label — luma signature: small medium-weight text with `leading-none`,
 * dims when its associated control is disabled (via `peer` / `group-data`
 * patterns). The required asterisk is opt-in via the `required` boolean.
 */
export const labelRecipe = defineRecipe({
  className: "label",
  description: "Luma form label",
  jsx: ["Label"],
  base: {
    display: "flex",
    alignItems: "center",
    gap: "{spacing.sm}", // 8 — luma `gap-2`
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.sm}",
    fontWeight: "{fontWeights.medium}",
    lineHeight: "1", // luma `leading-none`
    color: "{colors.foreground}",
    userSelect: "none",

    // Luma's `group-data-[disabled=true]:pointer-events-none
    // group-data-[disabled=true]:opacity-50` — field-scoped disabled.
    "[data-disabled='true'] &": {
      pointerEvents: "none",
      opacity: "0.5",
    },

    // Luma's `peer-disabled:cursor-not-allowed peer-disabled:opacity-50` —
    // label dims when its adjacent peer input is disabled.
    "&:has(~ :is(input, textarea, select):disabled)": {
      cursor: "not-allowed",
      opacity: "0.5",
    },
  },
  variants: {
    size: {
      sm: { fontSize: "{fontSizes.xs}" },
      md: { fontSize: "{fontSizes.sm}" },
      lg: { fontSize: "{fontSizes.md}" },
    },
    required: {
      true: {
        _after: {
          content: "'*'",
          color: "{colors.critical.text}",
          marginInlineStart: "{spacing.xs}",
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

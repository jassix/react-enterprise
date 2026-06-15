import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Button group — luma signature: children are attached by default, sharing a
 * single rounded-4xl pill (first / last children carry the outer corner
 * rounding; middle children drop the radius and collapse the inline-start
 * border). Unattached mode falls back to an 8px gap. Text slot renders a
 * rounded chip (`rounded-4xl border bg-muted px-2.5`) for labels / indicators.
 */
export const buttonGroupRecipe = defineSlotRecipe({
  className: "button-group",
  description: "Luma button group — attached or gapped cluster of buttons / inputs",
  jsx: ["ButtonGroup"],
  slots: ["root", "text", "separator"],
  base: {
    root: {
      display: "flex",
      width: "fit-content",
      alignItems: "stretch",

      "& > *:focus-visible": { position: "relative", zIndex: "10" },
      "& > input": { flex: "1" },

      // Nested button-groups get a breathing gap.
      "&:has(> [data-slot='button-group'])": { gap: "{spacing.sm}" },
    },

    text: {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.sm}", // 8 — luma `gap-2`
      paddingInline: "0.625rem", // 10 — luma `px-2.5`
      borderRadius: "{radii.4xl}",
      border: "1px solid {colors.border}",
      bg: "{colors.surface.muted}",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",

      "& svg": { pointerEvents: "none" },
      "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
    },

    separator: {
      position: "relative",
      alignSelf: "stretch",
      flexShrink: 0,
      bg: "color-mix(in oklab, {colors.border} 50%, transparent)",
    },
  },
  variants: {
    orientation: {
      horizontal: {
        root: {
          flexDirection: "row",

          // Attached look — every child collapses its right radius, and
          // every non-last child also collapses its right border so
          // neighbors share one hairline.
          "& > [data-slot]": { borderTopRightRadius: "0", borderBottomRightRadius: "0" },
          "& > [data-slot]:not(:has(~ [data-slot]))": {
            borderTopRightRadius: "{radii.4xl} !important",
            borderBottomRightRadius: "{radii.4xl} !important",
          },
          "& > [data-slot] ~ [data-slot]": {
            borderTopLeftRadius: "0",
            borderBottomLeftRadius: "0",
            borderInlineStartWidth: "0",
          },
        },
        separator: { width: "1px", marginInline: "1px" },
      },
      vertical: {
        root: {
          flexDirection: "column",

          "& > [data-slot]": { borderBottomLeftRadius: "0", borderBottomRightRadius: "0" },
          "& > [data-slot]:not(:has(~ [data-slot]))": {
            borderBottomLeftRadius: "{radii.4xl} !important",
            borderBottomRightRadius: "{radii.4xl} !important",
          },
          "& > [data-slot] ~ [data-slot]": {
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderBlockStartWidth: "0",
          },
        },
        separator: { height: "1px", marginBlock: "1px" },
      },
    },
  },
  defaultVariants: { orientation: "horizontal" },
});

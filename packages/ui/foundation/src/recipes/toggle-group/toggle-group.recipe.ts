import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Toggle group — luma signature: row (or column) of Toggle items that can be
 * visually fused into a single pill ("attached") or laid out as independent
 * pills separated by a spacing gap.
 *
 * **Delegation**: sizing, color, pressed-state wash, and focus ring come from
 * `toggleRecipe`. This recipe only owns group concerns — orientation, gap,
 * outer corner rounding, and border merging for the outline variant so
 * touching neighbors share one hairline instead of stacking two.
 *
 * **Focus elevation**: attached items overlap on their shared edge; without
 * `z-index` bumps the ring gets clipped by the next sibling. `z-index: 1` on
 * `:focus` / `:focus-visible` lifts the active item above its neighbors.
 */
export const toggleGroupRecipe = defineSlotRecipe({
  className: "toggle-group",
  description: "Luma toggle group — horizontal/vertical cluster of Toggle items",
  jsx: ["ToggleGroup"],
  slots: ["root", "item"],
  base: {
    root: {
      display: "inline-flex",
      width: "fit-content",
    },

    item: {
      flexShrink: 0,
      _focus: { zIndex: 1 },
      _focusVisible: { zIndex: 1 },
    },
  },
  variants: {
    orientation: {
      horizontal: { root: { flexDirection: "row", alignItems: "center" } },
      vertical: { root: { flexDirection: "column", alignItems: "stretch" } },
    },
    variant: {
      default: {},
      outline: {},
    },
    attached: {
      true: {
        root: { gap: "0" },
        item: {
          borderRadius: "0",
          boxShadow: "none",
        },
      },
      false: {
        // Independent pill toggles — gap matches the Toggle's focus-ring
        // breathing room so pressed/focused siblings don't visually merge.
        root: { gap: "{spacing.xs}" },
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "default",
    attached: true,
  },
  compoundVariants: [
    // Attached + horizontal: first/last items carry the outer corner rounding.
    {
      orientation: "horizontal",
      attached: true,
      css: {
        item: {
          "&:first-child": {
            borderTopLeftRadius: "{radii.3xl}",
            borderBottomLeftRadius: "{radii.3xl}",
          },
          "&:last-child": {
            borderTopRightRadius: "{radii.3xl}",
            borderBottomRightRadius: "{radii.3xl}",
          },
        },
      },
    },
    // Attached + vertical: same idea on the block axis.
    {
      orientation: "vertical",
      attached: true,
      css: {
        item: {
          "&:first-child": {
            borderTopLeftRadius: "{radii.3xl}",
            borderTopRightRadius: "{radii.3xl}",
          },
          "&:last-child": {
            borderBottomLeftRadius: "{radii.3xl}",
            borderBottomRightRadius: "{radii.3xl}",
          },
        },
      },
    },
    // Outline + attached + horizontal: collapse the inline-start border on
    // every item except the first so neighbors share one hairline.
    {
      variant: "outline",
      attached: true,
      orientation: "horizontal",
      css: {
        item: {
          borderInlineStartWidth: "0",
          "&:first-child": { borderInlineStartWidth: "1px" },
        },
      },
    },
    // Outline + attached + vertical: same collapse on the block-start edge.
    {
      variant: "outline",
      attached: true,
      orientation: "vertical",
      css: {
        item: {
          borderBlockStartWidth: "0",
          "&:first-child": { borderBlockStartWidth: "1px" },
        },
      },
    },
  ],
});

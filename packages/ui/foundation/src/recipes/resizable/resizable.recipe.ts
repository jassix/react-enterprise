import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Resizable — luma signature: 1px `bg-border` divider with an enlarged
 * invisible hit area (`inset: -4px`). `variant="handle"` paints a visible
 * grip pill in the middle (`h-6 w-1 rounded-lg bg-border`). Focus-visible
 * lights a 1px outline + 2px offset — consistent with other control rings.
 */
export const resizableRecipe = defineSlotRecipe({
  className: "resizable",
  description: "Luma resizable — hairline divider with optional grip pill",
  jsx: ["Resizable"],
  slots: ["root", "panel", "resizeTrigger"],
  base: {
    root: {
      display: "flex",
      height: "100%",
      width: "100%",
    },

    panel: {
      position: "relative",
      overflow: "hidden",
    },

    resizeTrigger: {
      position: "relative",
      flexShrink: "0",
      bg: "{colors.border}",
      outline: "none",
      transition: "background-color {durations.press} {easings.easeOut}",

      _focusVisible: {
        outline: "1px solid {colors.focus.ring}",
        outlineOffset: "2px",
      },

      // Hit area extends 4px outward so dragging doesn't demand
      // pixel-perfect aim — matches luma's `after:inset-y-0 after:w-1`.
      _after: {
        content: "''",
        position: "absolute",
        inset: "-4px",
        cursor: "inherit",
      },
    },
  },
  variants: {
    orientation: {
      horizontal: {
        root: { flexDirection: "row" },
        resizeTrigger: {
          width: "1px",
          cursor: "col-resize",
        },
      },
      vertical: {
        root: { flexDirection: "column" },
        resizeTrigger: {
          height: "1px",
          cursor: "row-resize",
        },
      },
    },
    variant: {
      bar: {},
      handle: {
        resizeTrigger: {
          // Visible grip — luma uses `h-6 w-1 rounded-lg bg-border`.
          _before: {
            content: "''",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "0.25rem", // 4 — luma `w-1`
            height: "1.5rem", // 24 — luma `h-6`
            bg: "{colors.border}",
            borderRadius: "{radii.lg}",
          },
        },
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "bar",
  },
  compoundVariants: [
    {
      orientation: "vertical",
      variant: "handle",
      css: {
        resizeTrigger: {
          // Swap axes for vertical grip.
          _before: {
            width: "1.5rem",
            height: "0.25rem",
          },
        },
      },
    },
  ],
});

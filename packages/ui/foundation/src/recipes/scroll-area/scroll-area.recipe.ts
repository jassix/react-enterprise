import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Scroll area — luma signature: viewport hides native scrollbars and layers a
 * custom scrollbar on top (10×10 with 1px padding and a transparent edge
 * border). Thumb is a `bg-border` rounded pill; hover/active keep the same
 * color — scrollbar restraint is part of the luma feel.
 */
export const scrollAreaRecipe = defineSlotRecipe({
  className: "scroll-area",
  description: "Luma scroll area — custom scrollbar overlay on a scrollable viewport",
  jsx: ["ScrollArea"],
  slots: ["root", "viewport", "scrollbar", "thumb", "corner"],
  base: {
    root: {
      position: "relative",
    },

    viewport: {
      width: "100%",
      height: "100%",
      overflow: "auto",
      borderRadius: "inherit",
      outline: "none",
      transition:
        "color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}",
      scrollbarWidth: "none",
      "&::-webkit-scrollbar": { display: "none" },

      _focusVisible: {
        outline: "1px solid {colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 50%, transparent)",
      },
    },

    scrollbar: {
      display: "flex",
      touchAction: "none",
      userSelect: "none",
      padding: "1px", // luma `p-px`
      transition: "background-color {durations.press} {easings.easeOut}",

      "&[data-orientation='vertical']": {
        height: "100%",
        width: "0.625rem", // 10 — luma `w-2.5`
        borderInlineStart: "1px solid transparent",
      },
      "&[data-orientation='horizontal']": {
        height: "0.625rem", // 10 — luma `h-2.5`
        flexDirection: "column",
        borderBlockStart: "1px solid transparent",
      },
    },

    thumb: {
      position: "relative",
      flex: "1",
      bg: "{colors.border}",
      borderRadius: "{radii.full}",

      // 44×44 touch target overlay (invisible) — keeps the thumb usable on
      // pointer-coarse devices without growing the visible thumb.
      _before: {
        content: "''",
        position: "absolute",
        top: "50%",
        left: "50%",
        minWidth: "44px",
        minHeight: "44px",
        transform: "translate(-50%, -50%)",
      },
    },

    corner: {
      bg: "transparent",
    },
  },
  variants: {
    size: {
      thin: {
        scrollbar: {
          "&[data-orientation='vertical']": { width: "0.375rem" },
          "&[data-orientation='horizontal']": { height: "0.375rem", flexDirection: "column" },
        },
      },
      md: {},
      thick: {
        scrollbar: {
          "&[data-orientation='vertical']": { width: "0.875rem" },
          "&[data-orientation='horizontal']": { height: "0.875rem", flexDirection: "column" },
        },
      },
    },
  },
  defaultVariants: { size: "md" },
});

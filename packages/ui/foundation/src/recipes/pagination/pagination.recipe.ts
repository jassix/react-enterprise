import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Pagination — luma signature: centered `<nav>` with `flex items-center gap-1`
 * list of Button-styled items. Active item renders as a `button outline` chip,
 * inactive as `button ghost`. Ellipsis is a 36×36 cell with `size-4` svg
 * matching luma.
 */
export const paginationRecipe = defineSlotRecipe({
  className: "pagination",
  description: "Luma pagination — nav bar of button-styled items",
  jsx: ["Pagination"],
  slots: ["root", "list", "item", "prevTrigger", "nextTrigger", "ellipsis"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      marginInline: "auto",
    },

    list: {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.xs}", // 4 — luma `gap-1`
    },

    // Items inherit button-chip styling — rounded-4xl, 1px transparent border
    // that lights up to focus ring, transition-all, press translate.
    item: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "{spacing.xs}",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      lineHeight: "{lineHeight.tight}",
      color: "{colors.foreground}",
      bg: "transparent",
      border: "1px solid transparent",
      borderRadius: "{radii.4xl}",
      cursor: "pointer",
      outline: "none",
      backgroundClip: "padding-box",
      transition: "all {durations.press} {easings.easeOut}",

      _hover: { bg: "{colors.surface.muted}", color: "{colors.foreground}" },

      "&:not([aria-haspopup]):active": { transform: "translateY(1px)" },

      "&[data-selected='true'], &[aria-current='page'], &[data-active='true']": {
        borderColor: "{colors.border}",
        bg: "{colors.background}",
        color: "{colors.foreground}",
        _dark: {
          bg: "transparent",
          borderColor: "{colors.border}",
        },
      },

      _disabled: { cursor: "not-allowed", opacity: "0.5" },

      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },

      "& svg": { pointerEvents: "none", flexShrink: 0 },
      "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
    },

    // Prev / next share the same chip styling; text label hides on small
    // screens mirroring luma's `hidden sm:block` pattern.
    prevTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "{spacing.xs}",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
      bg: "transparent",
      border: "1px solid transparent",
      borderRadius: "{radii.4xl}",
      cursor: "pointer",
      outline: "none",
      transition: "all {durations.press} {easings.easeOut}",

      _hover: { bg: "{colors.surface.muted}" },
      "&:not([aria-haspopup]):active": { transform: "translateY(1px)" },
      _disabled: { cursor: "not-allowed", opacity: "0.5" },
      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },

    nextTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "{spacing.xs}",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
      bg: "transparent",
      border: "1px solid transparent",
      borderRadius: "{radii.4xl}",
      cursor: "pointer",
      outline: "none",
      transition: "all {durations.press} {easings.easeOut}",

      _hover: { bg: "{colors.surface.muted}" },
      "&:not([aria-haspopup]):active": { transform: "translateY(1px)" },
      _disabled: { cursor: "not-allowed", opacity: "0.5" },
      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },

    ellipsis: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2.25rem", // 36 — luma `size-9`
      height: "2.25rem",
      color: "{colors.foreground.tertiary}",

      "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
    },
  },
  variants: {
    size: {
      sm: {
        item: {
          height: "2rem",
          minWidth: "2rem",
          paddingInline: "{spacing.md}",
          fontSize: "{fontSizes.xs}",
        },
        prevTrigger: { height: "2rem", paddingInline: "{spacing.md}", fontSize: "{fontSizes.xs}" },
        nextTrigger: { height: "2rem", paddingInline: "{spacing.md}", fontSize: "{fontSizes.xs}" },
        ellipsis: { width: "2rem", height: "2rem" },
      },
      md: {
        item: { height: "2.25rem", minWidth: "2.25rem", paddingInline: "{spacing.md}" }, // 36 — luma `h-9`
        prevTrigger: { height: "2.25rem", paddingInline: "{spacing.md}" },
        nextTrigger: { height: "2.25rem", paddingInline: "{spacing.md}" },
      },
      lg: {
        item: {
          height: "2.5rem",
          minWidth: "2.5rem",
          paddingInline: "{spacing.lg}",
          fontSize: "{fontSizes.md}",
        },
        prevTrigger: {
          height: "2.5rem",
          paddingInline: "{spacing.lg}",
          fontSize: "{fontSizes.md}",
        },
        nextTrigger: {
          height: "2.5rem",
          paddingInline: "{spacing.lg}",
          fontSize: "{fontSizes.md}",
        },
        ellipsis: { width: "2.5rem", height: "2.5rem" },
      },
    },
  },
  defaultVariants: {
    size: "md",
  },
});

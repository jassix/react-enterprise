import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Hover card — luma signature: popover-content bundle (rich preview surface).
 * Slightly more padding than menus, used for richer non-modal previews.
 */
export const hoverCardRecipe = defineSlotRecipe({
  className: "hover-card",
  description: "Luma hover card — rich tooltip preview",
  jsx: ["HoverCard"],
  slots: ["trigger", "positioner", "content", "arrow"],
  base: {
    trigger: {
      cursor: "pointer",
      outline: "none",
      _focusVisible: {
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },

    positioner: {
      position: "absolute",
      zIndex: "{zIndex.popover}",
    },

    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "{spacing.sm}",
      padding: "{spacing.lg}", // 16 — luma `p-4`
      bg: "{colors.background.popover}",
      color: "{colors.foreground}",
      borderRadius: "{radii.3xl}",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
      outlineOffset: "-1px",
      fontSize: "{fontSizes.sm}",
      lineHeight: "{lineHeight.normal}",
      transformOrigin: "var(--transform-origin)",
      willChange: "transform, opacity",
      _dark: { outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)" },

      _open: { animation: "scaleIn {durations.surface} {easings.easeOut}" },
      _closed: { animation: "scaleOut {durations.normal} {easings.easeOut}" },

      "@media (prefers-reduced-motion: reduce)": {
        _open: { animation: "fadeIn {durations.normal} {easings.easeOut}" },
        _closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
      },
    },

    arrow: {
      "--arrow-size": "{spacing.sm}",
      "--arrow-background": "{colors.background.popover}",
    },
  },
  variants: {
    size: {
      sm: { content: { width: "16rem", padding: "{spacing.md}", fontSize: "{fontSizes.xs}" } },
      md: { content: { width: "18rem" /* 288 — luma `w-72` */ } },
      lg: { content: { width: "28rem", padding: "{spacing.xl}", fontSize: "{fontSizes.md}" } },
    },
  },
  defaultVariants: { size: "md" },
});

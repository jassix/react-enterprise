import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Popover — luma signature: popover-content bundle (rounded-3xl, bg.popover,
 * shadow + 5%-alpha foreground outline). Title uses heading font, description
 * tertiary text. Close trigger styled like a small ghost-button chip.
 */
export const popoverRecipe = defineSlotRecipe({
  className: "popover",
  description: "Luma popover — floating contextual surface",
  jsx: ["Popover"],
  slots: ["trigger", "positioner", "content", "title", "description", "closeTrigger", "arrow"],
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
      gap: "{spacing.lg}", // 16 — luma `gap-4`
      width: "18rem", // 288 — luma `w-72`
      maxWidth: "calc(100vw - 2rem)",
      padding: "{spacing.lg}",
      bg: "{colors.background.popover}",
      color: "{colors.foreground}",
      borderRadius: "{radii.3xl}",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
      outlineOffset: "-1px",
      fontSize: "{fontSizes.sm}",
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

    title: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.md}",
      fontWeight: "{fontWeights.medium}",
      lineHeight: "1",
      color: "{colors.foreground}",
      marginBottom: "{spacing.sm}",
    },

    description: {
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground.tertiary}",
    },

    closeTrigger: {
      position: "absolute",
      top: "{spacing.sm}",
      insetInlineEnd: "{spacing.sm}",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1.5rem",
      height: "1.5rem",
      borderRadius: "{radii.full}",
      border: "1px solid transparent",
      bg: "transparent",
      color: "{colors.foreground.tertiary}",
      cursor: "pointer",
      outline: "none",
      transition: "all {durations.press} {easings.easeOut}",

      "& svg": { width: "0.875rem", height: "0.875rem" },

      _hover: {
        bg: "{colors.surface.muted}",
        color: "{colors.foreground}",
      },

      "&:not([aria-haspopup]):active": { transform: "translateY(1px)" },

      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },

    arrow: {
      "--arrow-size": "{spacing.md}",
      "--arrow-background": "{colors.background.popover}",
    },
  },
});

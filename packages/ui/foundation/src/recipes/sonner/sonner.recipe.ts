import { defineSlotRecipe } from "@pandacss/dev";

export const sonnerRecipe = defineSlotRecipe({
  className: "sonner",
  description: "Sonner recipe for stacked toast viewport with status variants",
  slots: [
    "viewport",
    "toast",
    "icon",
    "title",
    "description",
    "actionButton",
    "cancelButton",
    "closeButton",
  ],
  base: {
    viewport: {
      position: "fixed",
      display: "flex",
      flexDirection: "column",
      gap: "{spacing.sm}",
      padding: "{spacing.lg}",
      zIndex: "{zIndex.tooltip}",
      pointerEvents: "none",

      "& > *": { pointerEvents: "auto" },
    },

    toast: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "start",
      gap: "{spacing.xs} {spacing.md}",
      padding: "{spacing.md}",
      bg: "{colors.background.popover}", // luma `--normal-bg: var(--popover)`
      color: "{colors.foreground}", // luma `--normal-text: var(--popover-foreground)`
      borderRadius: "{radii.lg}", // 12 — luma `--border-radius: var(--radius)` ≈ 10
      border: "1px solid {colors.border}", // luma `--normal-border: var(--border)`
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      minWidth: "18rem",
      maxWidth: "22rem",
      willChange: "transform, opacity",
      transition:
        "transform {durations.slow} {easings.easeOut}, opacity {durations.normal} {easings.easeOut}",

      _open: { animation: "slideInFromRight {durations.slow} {easings.easeOut}" },
      _closed: { animation: "slideOutToRight {durations.normal} {easings.easeOut}" },

      "@media (prefers-reduced-motion: reduce)": {
        _open: { animation: "fadeIn {durations.normal} {easings.easeOut}" },
        _closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
      },
    },

    icon: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "{sizes.sm}",
      height: "{sizes.sm}",
      flexShrink: "0",
      color: "currentColor",
      gridRow: "1 / 3",
    },

    title: {
      gridColumn: "2 / 3",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      lineHeight: "{lineHeight.tight}",
      color: "{colors.foreground}",
    },

    description: {
      gridColumn: "2 / 3",
      fontSize: "{fontSizes.xs}",
      lineHeight: "{lineHeight.normal}",
      color: "{colors.foreground.secondary}",
    },

    actionButton: {
      gridColumn: "3 / 4",
      gridRow: "1 / 3",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      paddingX: "{spacing.sm}",
      height: "{sizes.sm}",
      bg: "{colors.interactive.base}",
      color: "white",
      border: "none",
      borderRadius: "{radii.sm}",
      fontSize: "{fontSizes.xs}",
      fontWeight: "{fontWeights.medium}",
      cursor: "pointer",
      outline: "none",
      transition:
        "transform {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, color {durations.press} {easings.easeOut}",

      _hover: { bg: "{colors.interactive.hover}" },
      _active: { transform: "scale(0.97)" },
      _focusVisible: {
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },

    cancelButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      paddingX: "{spacing.sm}",
      height: "{sizes.sm}",
      bg: "transparent",
      color: "{colors.foreground.secondary}",
      border: "1px solid {colors.border}",
      borderRadius: "{radii.sm}",
      fontSize: "{fontSizes.xs}",
      fontWeight: "{fontWeights.medium}",
      cursor: "pointer",
      outline: "none",
      transition:
        "transform {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, color {durations.press} {easings.easeOut}",

      _hover: { bg: "{colors.surface.subtle}" },
      _active: { transform: "scale(0.97)" },
    },

    closeButton: {
      position: "absolute",
      top: "{spacing.xs}",
      right: "{spacing.xs}",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "{sizes.sm}",
      height: "{sizes.sm}",
      borderRadius: "{radii.sm}",
      bg: "transparent",
      border: "none",
      color: "{colors.foreground.tertiary}",
      cursor: "pointer",
      outline: "none",
      transition:
        "transform {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, color {durations.press} {easings.easeOut}",

      _hover: { bg: "{colors.surface.subtle}", color: "{colors.foreground}" },
      _active: { transform: "scale(0.95)" },
      _focusVisible: {
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },
  },
  variants: {
    status: {
      neutral: {},
      info: {
        icon: { color: "{colors.info}" },
      },
      positive: {
        icon: { color: "{colors.positive}" },
      },
      caution: {
        icon: { color: "{colors.caution}" },
      },
      critical: {
        icon: { color: "{colors.critical}" },
      },
      loading: {
        icon: { color: "{colors.interactive.base}" },
      },
    },
    placement: {
      "top-left": { viewport: { top: "0", left: "0" } },
      "top-center": { viewport: { top: "0", left: "50%", transform: "translateX(-50%)" } },
      "top-right": { viewport: { top: "0", right: "0" } },
      "bottom-left": { viewport: { bottom: "0", left: "0", flexDirection: "column-reverse" } },
      "bottom-center": {
        viewport: {
          bottom: "0",
          left: "50%",
          transform: "translateX(-50%)",
          flexDirection: "column-reverse",
        },
      },
      "bottom-right": { viewport: { bottom: "0", right: "0", flexDirection: "column-reverse" } },
    },
  },
  defaultVariants: {
    status: "neutral",
    placement: "bottom-right",
  },
});

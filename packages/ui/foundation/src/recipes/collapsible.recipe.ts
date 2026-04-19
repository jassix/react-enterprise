import { defineSlotRecipe } from "@pandacss/dev";

export const collapsibleRecipe = defineSlotRecipe({
  className: "collapsible",
  description: "Collapsible recipe for simple show/hide disclosure without chrome",
  slots: ["root", "trigger", "content", "indicator"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      width: "100%",
    },

    trigger: {
      display: "inline-flex",
      alignItems: "center",
      gap: "{spacing.sm}",
      fontFamily: "{fonts.body}",
      fontWeight: "{fontWeights.medium}",
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground}",
      bg: "transparent",
      border: "none",
      cursor: "pointer",
      outline: "none",
      padding: "{spacing.xs} 0",
      transition: "color {durations.press} {easings.easeOut}",

      _hover: { color: "{colors.interactive.base}" },

      _disabled: { cursor: "not-allowed", opacity: "0.5" },

      _focusVisible: {
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
        borderRadius: "{radii.sm}",
      },
    },

    indicator: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "{icons.sm}",
      height: "{icons.sm}",
      color: "currentColor",
      transition: "transform {durations.normal} {easings.easeOut}",

      _open: { transform: "rotate(180deg)" },
    },

    content: {
      overflow: "hidden",
      willChange: "height, opacity",

      _open: { animation: "collapsibleDown {durations.normal} {easings.easeOut}" },
      _closed: { animation: "collapsibleUp {durations.normal} {easings.easeOut}" },

      "@media (prefers-reduced-motion: reduce)": {
        _open: { animation: "fadeIn {durations.fast} {easings.easeOut}" },
        _closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
      },
    },
  },
});

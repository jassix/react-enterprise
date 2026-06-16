import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Progress — luma signature: pill track in surface.muted; range fills with
 * `interactive.base`. Intent compounds re-color the range with `.accent`.
 */
export const progressRecipe = defineSlotRecipe({
  className: "progress",
  description: "Luma progress — pill track + filled range with intent",
  jsx: ["Progress"],
  slots: ["root", "label", "track", "range", "valueText"],
  base: {
    root: {
      display: "flex",
      flexWrap: "wrap",
      gap: "{spacing.md}", // 12 — luma `gap-3`
      width: "100%",
    },

    label: {
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
    },

    track: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
      height: "0.75rem", // 12 — luma `h-3`
      bg: "{colors.surface.muted}",
      borderRadius: "{radii.full}",
      overflowX: "hidden",
    },

    range: {
      height: "100%",
      bg: "{colors.interactive.base}",
      borderRadius: "{radii.full}",
      transition: "width {durations.normal} {easings.easeOut}",

      "&[data-state='indeterminate']": {
        animation: "skeleton-pulse 1.5s ease-in-out infinite",
      },
    },

    valueText: {
      marginInlineStart: "auto", // luma `ml-auto`
      fontSize: "{fontSizes.sm}",
      fontVariantNumeric: "tabular-nums", // luma `tabular-nums`
      color: "{colors.foreground.tertiary}",
      textAlign: "end",
    },
  },
  variants: {
    size: {
      xs: { track: { height: "0.25rem" } }, // 4
      sm: { track: { height: "0.5rem" } }, // 8
      md: {}, // 12 — luma default `h-3`
      lg: { track: { height: "1rem" } }, // 16
    },
    intent: {
      primary: {},
      critical: {},
      positive: {},
      caution: {},
      info: {},
    },
    variant: {
      linear: {},
      striped: {
        range: {
          backgroundImage:
            "linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)",
          backgroundSize: "1rem 1rem",
        },
      },
    },
  },
  defaultVariants: { size: "md", intent: "primary", variant: "linear" },
  compoundVariants: [
    { intent: "critical", css: { range: { bg: "{colors.critical.accent}" } } },
    { intent: "positive", css: { range: { bg: "{colors.positive.accent}" } } },
    { intent: "caution", css: { range: { bg: "{colors.caution.accent}" } } },
    { intent: "info", css: { range: { bg: "{colors.info.accent}" } } },
  ],
});

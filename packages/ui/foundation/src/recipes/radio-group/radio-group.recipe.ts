import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Radio Group — luma signature: each itemControl is a circular pill with the
 * same translucent input fill + focus-ring treatment as checkbox; checked
 * fills with `interactive.base` and reveals an inner dot. Intent compounds
 * re-color the checked fill.
 */
export const radioGroupRecipe = defineSlotRecipe({
  className: "radio-group",
  description: "Luma radio group — circular controls with intent-driven checked state",
  jsx: ["RadioGroup"],
  slots: ["root", "label", "item", "itemText", "itemControl", "indicator"],
  base: {
    root: {
      display: "grid",
      width: "100%",
      gap: "{spacing.md}",
    },

    label: {
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
    },

    item: {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.sm}",
      cursor: "pointer",

      _disabled: {
        opacity: "0.5",
        cursor: "not-allowed",
      },
    },

    itemText: {
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground}",
    },

    itemControl: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
      width: "1rem", // 16px
      height: "1rem",
      borderRadius: "{radii.full}",
      border: "1px solid transparent",
      bg: "color-mix(in oklab, {colors.border} 90%, transparent)", // luma `bg-input/90`
      color: "{colors.foreground.inverse}",
      outline: "none",
      transition: "all {durations.press} {easings.easeOut}",

      _after: {
        content: "''",
        position: "absolute",
        top: "-0.5rem",
        right: "-0.75rem",
        bottom: "-0.5rem",
        left: "-0.75rem",
      },

      _disabled: {
        cursor: "not-allowed",
        opacity: "0.5",
      },

      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },

      "&[aria-invalid='true']": {
        borderColor: "{colors.critical}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
        _dark: {
          borderColor: "color-mix(in oklab, {colors.critical} 50%, transparent)",
          boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
        },
      },

      _checked: {
        bg: "{colors.interactive.base}",
        borderColor: "{colors.interactive.base}",
      },
    },

    indicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",

      // Inner dot: 8px light / 10px dark (luma `size-2 dark:size-2.5`).
      _after: {
        content: "''",
        width: "{spacing.sm}", // 8 — luma `size-2`
        height: "{spacing.sm}",
        borderRadius: "{radii.full}",
        bg: "{colors.foreground.inverse}",
      },
      ".dark &::after, [data-theme='dark'] &::after": {
        width: "calc({spacing.sm} + 2px)", // 10 — luma `dark:size-2.5`
        height: "calc({spacing.sm} + 2px)",
      },
    },
  },
  variants: {
    size: {
      sm: {
        itemControl: { width: "0.875rem", height: "0.875rem" },
        indicator: { _after: { width: "0.375rem", height: "0.375rem" } },
        itemText: { fontSize: "{fontSizes.xs}" },
      },
      md: {},
      lg: {
        itemControl: { width: "1.25rem", height: "1.25rem" },
        indicator: { _after: { width: "0.625rem", height: "0.625rem" } },
        itemText: { fontSize: "{fontSizes.md}" },
      },
    },
    intent: {
      primary: {},
      critical: {},
      positive: {},
      caution: {},
      info: {},
    },
  },
  defaultVariants: {
    size: "md",
    intent: "primary",
  },
  compoundVariants: [
    {
      intent: "critical",
      css: {
        itemControl: {
          _checked: { bg: "{colors.critical.accent}", borderColor: "{colors.critical.accent}" },
        },
      },
    },
    {
      intent: "positive",
      css: {
        itemControl: {
          _checked: { bg: "{colors.positive.accent}", borderColor: "{colors.positive.accent}" },
        },
      },
    },
    {
      intent: "caution",
      css: {
        itemControl: {
          _checked: { bg: "{colors.caution.accent}", borderColor: "{colors.caution.accent}" },
        },
      },
    },
    {
      intent: "info",
      css: {
        itemControl: {
          _checked: { bg: "{colors.info.accent}", borderColor: "{colors.info.accent}" },
        },
      },
    },
  ],
});

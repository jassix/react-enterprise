import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Accordion — luma signature: items separated by hairline border (no border on
 * last). Trigger is a row of text + rotating chevron (icon rendered by primitive).
 * Content uses `collapsibleDown / Up` keyframes for smooth height transitions.
 */
export const accordionRecipe = defineSlotRecipe({
  className: "accordion",
  description: "Luma accordion — disclosure with rotating chevron",
  jsx: ["Accordion"],
  slots: ["root", "item", "trigger", "indicator", "content"],
  base: {
    root: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      overflow: "hidden",
      borderRadius: "{radii.2xl}", // 20 — luma `rounded-2xl`
      border: "1px solid {colors.border}",
    },

    item: {
      "&:not(:last-child)": {
        borderBottom: "1px solid {colors.border}",
      },
      '&[data-state="open"], &[data-open]': {
        bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)",
      },
    },

    trigger: {
      position: "relative",
      display: "flex",
      flex: "1",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "{spacing.xl}", // 24 — luma `gap-6`
      width: "100%",
      padding: "{spacing.lg}", // 16 — luma `p-4`
      textAlign: "start",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
      bg: "transparent",
      border: "1px solid transparent",
      cursor: "pointer",
      outline: "none",
      transition: "all {durations.press} {easings.easeOut}",

      _hover: { textDecoration: "underline" },

      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },

      _disabled: { pointerEvents: "none", opacity: "0.5" },
      "&[aria-disabled='true']": { pointerEvents: "none", opacity: "0.5" },
    },

    indicator: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1rem",
      height: "1rem",
      color: "{colors.foreground.tertiary}",
      flexShrink: 0,
      pointerEvents: "none",
      transition: "transform {durations.normal} {easings.easeOut}",

      _open: { transform: "rotate(180deg)" },
    },

    content: {
      overflow: "hidden",
      paddingInline: "{spacing.lg}", // 16 — luma `px-4`
      paddingBottom: "{spacing.lg}", // 16 — luma `pb-4`
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground.tertiary}",
      willChange: "height, opacity",

      "& a": {
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        _hover: { color: "{colors.foreground}" },
      },
      "& p:not(:last-child)": { marginBottom: "{spacing.lg}" },

      _open: { animation: "collapsibleDown {durations.normal} {easings.easeOut}" },
      _closed: { animation: "collapsibleUp {durations.normal} {easings.easeOut}" },

      "@media (prefers-reduced-motion: reduce)": {
        _open: { animation: "fadeIn {durations.fast} {easings.easeOut}" },
        _closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
      },
    },
  },
});

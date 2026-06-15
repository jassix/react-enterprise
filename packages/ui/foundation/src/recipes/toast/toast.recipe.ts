import { defineSlotRecipe } from "@pandacss/dev";

export const toastRecipe = defineSlotRecipe({
  className: "toast",
  description: "Toast recipe for transient notifications",
  slots: ["root", "title", "description", "actionTrigger", "closeTrigger"],
  base: {
    root: {
      position: "relative",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      alignItems: "start",
      gap: "{spacing.sm} {spacing.md}",
      padding: "{spacing.md} {spacing.lg}",
      bg: "{colors.background.popover}",
      color: "{colors.foreground}",
      borderRadius: "{radii.lg}",
      border: "1px solid {colors.border}",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      minWidth: "18rem",
      maxWidth: "30rem",
      pointerEvents: "auto",
      // Ark's toast group writes `--y` / `--x` / `--scale` / `--opacity` on
      // the toast root every time the stack changes. Reading them through
      // `translate` / `scale` (not `transform`) lets those updates compose
      // cleanly with the `_open` / `_closed` keyframes — animating
      // `transform` here would fight the machine and, combined with
      // `overlap: true`, causes a render storm / memory pressure as every
      // new toast re-positions every existing toast.
      translate: "var(--x, 0) var(--y, 0)",
      scale: "var(--scale, 1)",
      opacity: "var(--opacity, 1)",
      transition:
        "translate {durations.normal} {easings.easeOut}, scale {durations.normal} {easings.easeOut}, opacity {durations.press} {easings.easeOut}",

      _open: { animation: "fadeIn {durations.normal} {easings.easeOut}" },
      _closed: { animation: "fadeOut {durations.press} {easings.easeOut}" },

      "@media (prefers-reduced-motion: reduce)": {
        transition: "opacity {durations.fast} {easings.easeOut}",
        _open: { animation: "fadeIn {durations.fast} {easings.easeOut}" },
        _closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
      },
    },

    title: {
      gridColumn: "2 / 3",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.semibold}",
      color: "{colors.foreground}",
      lineHeight: "{lineHeight.tight}",
    },

    description: {
      gridColumn: "2 / 3",
      fontSize: "{fontSizes.xs}",
      color: "{colors.foreground.secondary}",
      lineHeight: "{lineHeight.normal}",
    },

    actionTrigger: {
      gridColumn: "3 / 4",
      gridRow: "1 / 3",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      height: "{sizes.sm}",
      paddingX: "{spacing.sm}",
      bg: "transparent",
      color: "{colors.interactive.base}",
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
      _focusVisible: {
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },

    closeTrigger: {
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
      opacity: "0",
      transition:
        "opacity {durations.press} {easings.easeOut}, transform {durations.press} {easings.easeOut}, color {durations.press} {easings.easeOut}",

      "&:hover, [role='status']:hover &, [data-scope='toast']:hover &": {
        opacity: "1",
      },

      _active: { transform: "scale(0.95)" },

      _focusVisible: {
        opacity: "1",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },
  },
  variants: {
    status: {
      neutral: {},
      info: {
        root: {
          bg: "{colors.info.bg}",
          borderColor: "{colors.info}",
        },
        title: { color: "{colors.info.text}" },
      },
      positive: {
        root: {
          bg: "{colors.positive.bg}",
          borderColor: "{colors.positive}",
        },
        title: { color: "{colors.positive.text}" },
      },
      caution: {
        root: {
          bg: "{colors.caution.bg}",
          borderColor: "{colors.caution}",
        },
        title: { color: "{colors.caution.text}" },
      },
      critical: {
        root: {
          bg: "{colors.critical.bg}",
          borderColor: "{colors.critical}",
        },
        title: { color: "{colors.critical.text}" },
      },
    },
    variant: {
      subtle: {},
      solid: {
        root: {
          bg: "{colors.neutral.light.12}",
          color: "white",
          borderColor: "{colors.neutral.light.12}",
          _dark: {
            bg: "{colors.neutral.dark.12}",
            borderColor: "{colors.neutral.dark.12}",
            color: "{colors.neutral.dark.1}",
          },
        },
        title: { color: "inherit" },
        description: { color: "inherit", opacity: "0.9" },
        closeTrigger: { color: "inherit" },
      },
      outline: {
        root: { bg: "transparent" },
      },
    },
  },
  defaultVariants: {
    status: "neutral",
    variant: "subtle",
  },
  compoundVariants: [
    {
      variant: "solid",
      status: "info",
      css: {
        root: { bg: "{colors.info}", color: "white", borderColor: "{colors.info}" },
      },
    },
    {
      variant: "solid",
      status: "positive",
      css: {
        root: {
          bg: "{colors.positive}",
          color: "white",
          borderColor: "{colors.positive}",
        },
      },
    },
    {
      variant: "solid",
      status: "caution",
      css: {
        root: {
          bg: "{colors.caution}",
          color: "{colors.caution.text}",
          borderColor: "{colors.caution}",
        },
      },
    },
    {
      variant: "solid",
      status: "critical",
      css: {
        root: {
          bg: "{colors.critical}",
          color: "white",
          borderColor: "{colors.critical}",
        },
      },
    },
  ],
});

import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Sheet — luma signature: backdrop bundle + slide-in content per side.
 * Content rounded only on the corners away from the edge it slides from.
 * Header/footer use small gaps; close trigger is a ghost icon-button chip.
 */
export const sheetRecipe = defineSlotRecipe({
  className: "sheet",
  description: "Luma sheet — edge-anchored slide-in panel",
  jsx: ["Sheet"],
  slots: [
    "backdrop",
    "positioner",
    "content",
    "header",
    "title",
    "description",
    "body",
    "footer",
    "closeTrigger",
  ],
  base: {
    backdrop: {
      position: "fixed",
      inset: "0",
      zIndex: "{zIndex.overlay}",
      bg: "rgba(0, 0, 0, 0.3)",
      willChange: "opacity",

      "@supports (backdrop-filter: blur(0))": { backdropFilter: "blur(4px)" },

      _open: { animation: "fadeIn {durations.surface} {easings.easeOut}" },
      _closed: { animation: "fadeOut {durations.normal} {easings.easeOut}" },
    },

    positioner: {
      position: "fixed",
      inset: "0",
      zIndex: "{zIndex.modal}",
      display: "flex",
      pointerEvents: "none",
    },

    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      bg: "{colors.background.popover}",
      color: "{colors.foreground}",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
      outlineOffset: "-1px",
      pointerEvents: "auto",
      overflow: "hidden",
      _dark: { outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)" },
    },

    header: {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem", // 6 — luma `gap-1.5`
      padding: "{spacing.xl}", // 24 — luma `p-6`
    },

    title: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.md}",
      fontWeight: "{fontWeights.medium}",
      lineHeight: "1",
      color: "{colors.foreground}",
    },

    description: {
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground.tertiary}",
    },

    body: {
      flex: "1",
      overflowY: "auto",
      padding: "{spacing.xl}",
      color: "{colors.foreground}",
      fontSize: "{fontSizes.sm}",
    },

    footer: {
      display: "flex",
      flexDirection: "column",
      marginTop: "auto", // luma `mt-auto`
      gap: "{spacing.sm}", // 8 — luma `gap-2`
      padding: "{spacing.xl}", // 24 — luma `p-6`
    },

    closeTrigger: {
      position: "absolute",
      top: "{spacing.lg}",
      insetInlineEnd: "{spacing.lg}",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2rem",
      height: "2rem",
      borderRadius: "{radii.full}",
      border: "1px solid transparent",
      bg: "{colors.interactive.secondary}",
      color: "{colors.foreground.tertiary}",
      cursor: "pointer",
      outline: "none",
      transition: "all {durations.press} {easings.easeOut}",

      "& svg": { width: "1rem", height: "1rem", pointerEvents: "none" },

      _hover: {
        bg: "color-mix(in oklab, {colors.interactive.secondary} 80%, transparent)",
        color: "{colors.foreground}",
      },

      "&:not([aria-haspopup]):active": { transform: "translateY(1px)" },

      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },
  },
  variants: {
    side: {
      left: {
        positioner: { alignItems: "stretch", justifyContent: "flex-start" },
        content: {
          height: "100%",
          borderStartEndRadius: "{radii.4xl}",
          borderEndEndRadius: "{radii.4xl}",
          _open: { animation: "slideInFromLeft {durations.surface} {easings.easeOut}" },
          _closed: { animation: "slideOutToLeft {durations.normal} {easings.easeOut}" },
        },
      },
      right: {
        positioner: { alignItems: "stretch", justifyContent: "flex-end" },
        content: {
          height: "100%",
          borderStartStartRadius: "{radii.4xl}",
          borderEndStartRadius: "{radii.4xl}",
          _open: { animation: "slideInFromRight {durations.surface} {easings.easeOut}" },
          _closed: { animation: "slideOutToRight {durations.normal} {easings.easeOut}" },
        },
      },
      top: {
        positioner: { alignItems: "flex-start", justifyContent: "stretch" },
        content: {
          width: "100%",
          borderEndStartRadius: "{radii.4xl}",
          borderEndEndRadius: "{radii.4xl}",
          _open: { animation: "slideInFromTop {durations.surface} {easings.easeOut}" },
          _closed: { animation: "slideOutToTop {durations.normal} {easings.easeOut}" },
        },
      },
      bottom: {
        positioner: { alignItems: "flex-end", justifyContent: "stretch" },
        content: {
          width: "100%",
          borderStartStartRadius: "{radii.4xl}",
          borderStartEndRadius: "{radii.4xl}",
          _open: { animation: "slideInFromBottom {durations.surface} {easings.easeOut}" },
          _closed: { animation: "slideOutToBottom {durations.normal} {easings.easeOut}" },
        },
      },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
      xl: {},
      full: { content: { width: "100%", height: "100%", maxWidth: "100vw", maxHeight: "100vh" } },
    },
  },
  defaultVariants: { side: "right", size: "md" },
  compoundVariants: [
    { side: "left", size: "sm", css: { content: { width: "20rem" } } },
    { side: "left", size: "md", css: { content: { width: "24rem" } } },
    { side: "left", size: "lg", css: { content: { width: "32rem" } } },
    { side: "left", size: "xl", css: { content: { width: "40rem" } } },
    { side: "right", size: "sm", css: { content: { width: "20rem" } } },
    { side: "right", size: "md", css: { content: { width: "24rem" } } },
    { side: "right", size: "lg", css: { content: { width: "32rem" } } },
    { side: "right", size: "xl", css: { content: { width: "40rem" } } },
    { side: "top", size: "sm", css: { content: { height: "20vh" } } },
    { side: "top", size: "md", css: { content: { height: "40vh" } } },
    { side: "top", size: "lg", css: { content: { height: "60vh" } } },
    { side: "top", size: "xl", css: { content: { height: "80vh" } } },
    { side: "bottom", size: "sm", css: { content: { height: "20vh" } } },
    { side: "bottom", size: "md", css: { content: { height: "40vh" } } },
    { side: "bottom", size: "lg", css: { content: { height: "60vh" } } },
    { side: "bottom", size: "xl", css: { content: { height: "80vh" } } },
  ],
});

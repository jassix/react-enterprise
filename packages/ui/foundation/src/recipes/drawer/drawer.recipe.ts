import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Drawer — luma signature: same backdrop bundle as Sheet; bottom variant has
 * a top grab handle and rounded-4xl top corners. Slide animations match Sheet
 * but use the drawer easing curve for the rubber-band feel.
 */
export const drawerRecipe = defineSlotRecipe({
  className: "drawer",
  description: "Luma drawer — bottom-sheet-style draggable panel",
  jsx: ["Drawer"],
  slots: [
    "backdrop",
    "positioner",
    "content",
    "handle",
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

      _open: { animation: "fadeIn {durations.surface} {easings.drawer}" },
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

    handle: {
      position: "relative",
      width: "6.25rem", // 100 — luma `w-[100px]`
      height: "0.375rem", // 6 — luma `h-1.5`
      marginInline: "auto",
      marginTop: "{spacing.lg}", // 16 — luma `mt-4`
      borderRadius: "{radii.full}",
      bg: "{colors.surface.muted}", // luma `bg-muted`
      cursor: "grab",
      flexShrink: 0,
    },

    header: {
      display: "flex",
      flexDirection: "column",
      gap: "0.125rem", // 2 — luma `gap-0.5`
      padding: "{spacing.lg}", // 16 — luma `p-4`

      // Top / bottom drawers center the header text; left / right keep it
      // start-aligned (luma applies `md:text-left`).
      '[data-side="top"] &, [data-side="bottom"] &': { textAlign: "center" },

      "@media (min-width: 768px)": {
        gap: "0.375rem", // 6 — luma `md:gap-1.5`
        textAlign: "start",
      },
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
      paddingInline: "{spacing.xl}",
      paddingBlock: "{spacing.md}",
      color: "{colors.foreground}",
      fontSize: "{fontSizes.sm}",
    },

    footer: {
      display: "flex",
      flexDirection: "column",
      marginTop: "auto",
      gap: "{spacing.sm}", // 8 — luma `gap-2`
      padding: "{spacing.lg}", // 16 — luma `p-4`
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

      "& svg": { width: "1rem", height: "1rem" },

      _hover: {
        bg: "color-mix(in oklab, {colors.interactive.secondary} 80%, transparent)",
        color: "{colors.foreground}",
      },

      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },
  },
  variants: {
    side: {
      bottom: {
        positioner: { alignItems: "flex-end", justifyContent: "stretch" },
        content: {
          width: "100%",
          maxHeight: "90vh",
          borderStartStartRadius: "{radii.4xl}",
          borderStartEndRadius: "{radii.4xl}",
          _open: { animation: "slideInFromBottom {durations.surface} {easings.drawer}" },
          _closed: { animation: "slideOutToBottom {durations.normal} {easings.easeOut}" },
        },
      },
      top: {
        positioner: { alignItems: "flex-start", justifyContent: "stretch" },
        content: {
          width: "100%",
          maxHeight: "90vh",
          borderEndStartRadius: "{radii.4xl}",
          borderEndEndRadius: "{radii.4xl}",
          _open: { animation: "slideInFromTop {durations.surface} {easings.drawer}" },
          _closed: { animation: "slideOutToTop {durations.normal} {easings.easeOut}" },
        },
        handle: { order: 99 },
      },
      left: {
        positioner: { alignItems: "stretch", justifyContent: "flex-start" },
        content: {
          height: "100%",
          maxWidth: "90vw",
          borderStartEndRadius: "{radii.4xl}",
          borderEndEndRadius: "{radii.4xl}",
          _open: { animation: "slideInFromLeft {durations.surface} {easings.drawer}" },
          _closed: { animation: "slideOutToLeft {durations.normal} {easings.easeOut}" },
        },
        handle: { display: "none" },
      },
      right: {
        positioner: { alignItems: "stretch", justifyContent: "flex-end" },
        content: {
          height: "100%",
          maxWidth: "90vw",
          borderStartStartRadius: "{radii.4xl}",
          borderEndStartRadius: "{radii.4xl}",
          _open: { animation: "slideInFromRight {durations.surface} {easings.drawer}" },
          _closed: { animation: "slideOutToRight {durations.normal} {easings.easeOut}" },
        },
        handle: { display: "none" },
      },
    },
    size: {
      sm: {},
      md: {},
      lg: {},
      full: {
        content: {
          width: "100%",
          height: "100%",
          maxWidth: "100vw",
          maxHeight: "100vh",
          borderRadius: "0",
        },
      },
    },
  },
  defaultVariants: { side: "bottom", size: "md" },
  compoundVariants: [
    { side: "bottom", size: "sm", css: { content: { maxHeight: "40vh" } } },
    { side: "bottom", size: "md", css: { content: { maxHeight: "60vh" } } },
    { side: "bottom", size: "lg", css: { content: { maxHeight: "85vh" } } },
    { side: "left", size: "sm", css: { content: { width: "20rem" } } },
    { side: "left", size: "md", css: { content: { width: "24rem" } } },
    { side: "left", size: "lg", css: { content: { width: "32rem" } } },
    { side: "right", size: "sm", css: { content: { width: "20rem" } } },
    { side: "right", size: "md", css: { content: { width: "24rem" } } },
    { side: "right", size: "lg", css: { content: { width: "32rem" } } },
  ],
});

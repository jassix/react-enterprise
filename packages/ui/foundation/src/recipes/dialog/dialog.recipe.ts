import { defineSlotRecipe } from "@pandacss/dev";
import { dialogSize } from "./dialog.tokens";

/**
 * Dialog — luma signature: rounded-4xl elevated surface (`bg-popover`), subtle
 * `ring-1 ring-foreground/5` outline (10% in dark), lighter backdrop with
 * `@supports`-gated blur. Title uses the heading font at 1rem with
 * `leading-none`. Header/footer are styled wrappers (luma exposes them as
 * composable slots, not Ark primitives).
 *
 * All spatial values snap to /4: padding 24, gaps 4/8/24, close-trigger 32×32
 * positioned 16 from edges.
 */
export const dialogRecipe = defineSlotRecipe({
  className: "dialog",
  description: "Luma dialog — modal overlay with header / footer slots",
  jsx: ["Dialog"],
  slots: [
    "backdrop",
    "positioner",
    "content",
    "header",
    "footer",
    "title",
    "description",
    "closeTrigger",
  ],
  base: {
    backdrop: {
      position: "fixed",
      inset: "0",
      zIndex: "{zIndex.overlay}",
      bg: "rgba(0, 0, 0, 0.3)", // luma `bg-black/30`
      willChange: "opacity",

      "@supports (backdrop-filter: blur(0))": {
        backdropFilter: "blur(4px)", // luma `supports-backdrop-filter:backdrop-blur-sm`
      },

      _open: {
        animation: "fadeIn {durations.surface} {easings.easeOut}",
      },

      _closed: {
        animation: "fadeOut {durations.normal} {easings.easeOut}",
      },
    },

    positioner: {
      position: "fixed",
      inset: "0",
      zIndex: "{zIndex.modal}",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "{spacing.lg}", // 16
      overflow: "auto",
    },

    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      gap: "{spacing.xl}", // 24 — luma `gap-6`
      bg: "{colors.background.popover}",
      borderRadius: "{radii.4xl}", // 28
      padding: "{spacing.xl}", // 24 — luma `p-6`
      // Tailwind `shadow-xl` — keep our recipe self-contained, no token coupling.
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      // `ring-1 ring-foreground/5` — quiet edge to lift the surface from the backdrop.
      outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
      outlineOffset: "-1px",
      color: "{colors.foreground}",
      fontSize: "{fontSizes.sm}",
      maxWidth: "calc(100% - {spacing.xl})",
      maxHeight: "calc(100% - {spacing.xl})",
      transformOrigin: "center",
      willChange: "transform, opacity",

      _dark: {
        outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)",
      },

      _open: {
        animation: "scaleIn {durations.surface} {easings.easeOut}",
      },

      _closed: {
        animation: "scaleOut {durations.normal} {easings.easeOut}",
      },

      "@media (prefers-reduced-motion: reduce)": {
        _open: { animation: "fadeIn {durations.normal} {easings.easeOut}" },
        _closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
      },
    },

    header: {
      display: "flex",
      flexDirection: "column",
      gap: "0.375rem", // 6 — luma `gap-1.5`
    },

    footer: {
      display: "flex",
      flexDirection: "column-reverse",
      gap: "{spacing.sm}", // 8 — luma `gap-2`

      "@media (min-width: 640px)": {
        flexDirection: "row",
        justifyContent: "flex-end",
      },
    },

    title: {
      fontFamily: "{fonts.heading}",
      fontSize: "{fontSizes.md}", // 16 — luma `text-base`
      fontWeight: "{fontWeights.medium}",
      lineHeight: "1",
      color: "{colors.foreground}",
    },

    description: {
      fontSize: "{fontSizes.sm}", // 14 — luma `text-sm`
      color: "{colors.foreground.tertiary}", // `text-muted-foreground`

      "& a": {
        textDecoration: "underline",
        textUnderlineOffset: "3px",
        _hover: { color: "{colors.foreground}" },
      },
    },

    // Bare close button styling — primitive renders an Ark `CloseTrigger`
    // directly. The visual mirrors a `<Button variant="ghost" icon size="sm">`
    // chip with a `bg-secondary` resting fill (luma's pattern).
    closeTrigger: {
      position: "absolute",
      top: "{spacing.lg}", // 16 — luma `top-4`
      right: "{spacing.lg}", // 16 — luma `right-4`
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "{sizes.8}", // 32 — luma `size-8` icon-sm
      height: "{sizes.8}",
      borderRadius: "{radii.4xl}",
      border: "1px solid transparent",
      bg: "{colors.interactive.secondary}", // luma `bg-secondary`
      color: "{colors.foreground.tertiary}",
      cursor: "pointer",
      outline: "none",
      transition: "all {durations.press} {easings.easeOut}",

      "& svg": {
        width: "{sizes.4}", // 16px
        height: "{sizes.4}",
        pointerEvents: "none",
      },

      _hover: {
        color: "{colors.foreground}",
        bg: "color-mix(in oklab, {colors.interactive.secondary} 80%, transparent)",
      },

      "&:not([aria-haspopup]):active": { transform: "translateY(1px)" },

      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },
  },
  variants: {
    size: dialogSize,
    centered: {
      true: {
        positioner: { alignItems: "center" },
      },
      false: {
        positioner: {
          alignItems: "flex-start",
          paddingTop: "{spacing.16}", // 64px
        },
      },
    },
  },
  defaultVariants: {
    size: "md",
    centered: true,
  },
});

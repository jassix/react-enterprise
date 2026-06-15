import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Input OTP — luma signature: one contiguous chip per digit with
 * `bg-input/50`, `border-y` + `border-r` shared edges, `border-l` only on the
 * first cell; first cell rounds the left corners (`rounded-l-3xl`), last
 * cell rounds the right (`rounded-r-3xl`). Active cell elevates via z-index +
 * focus ring, invalid cells inherit the critical halo from the group wrapper.
 */
export const inputOtpRecipe = defineSlotRecipe({
  className: "input-otp",
  description: "Luma input-otp — connected per-digit cells",
  jsx: ["InputOtp"],
  slots: ["root", "input", "control", "slot", "separator"],
  base: {
    root: {
      display: "inline-flex",
      alignItems: "center",
      gap: "{spacing.sm}",
      "&:has([disabled])": { opacity: "0.5" },
    },

    // Control = the group `<div>` wrapping the connected cells. Luma wires
    // the critical halo to this wrapper so `aria-invalid` lands on the
    // whole rail.
    control: {
      display: "inline-flex",
      alignItems: "center",
      borderRadius: "{radii.3xl}",

      "&:has([aria-invalid='true'])": {
        borderColor: "{colors.critical}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
        _dark: {
          boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
        },
      },
    },

    input: {
      position: "absolute",
      width: "1px",
      height: "1px",
      padding: "0",
      margin: "-1px",
      overflow: "hidden",
      clip: "rect(0, 0, 0, 0)",
      whiteSpace: "nowrap",
      border: "0",
    },

    slot: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "2.25rem", // 36 — luma `size-9`
      height: "2.25rem",
      fontSize: "{fontSizes.sm}",
      fontFamily: "{fonts.mono}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
      bg: "color-mix(in oklab, {colors.border} 50%, transparent)", // luma `bg-input/50`
      // Shared edges — top + bottom + right; first cell paints its own left.
      borderTop: "1px solid {colors.border}",
      borderBottom: "1px solid {colors.border}",
      borderRight: "1px solid {colors.border}",
      borderLeft: "1px solid transparent",
      transition: "all {durations.press} {easings.easeOut}",
      outline: "none",

      _first: {
        borderLeft: "1px solid {colors.border}",
        borderStartStartRadius: "{radii.3xl}",
        borderEndStartRadius: "{radii.3xl}",
      },
      _last: {
        borderStartEndRadius: "{radii.3xl}",
        borderEndEndRadius: "{radii.3xl}",
      },

      "&[data-active='true'], &[data-focus='true']": {
        zIndex: "10",
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },

      // Ark's PinInput renders the slot as a real `<input>`, so native
      // `:focus-visible` is the authoritative signal when a cell is active.
      _focusVisible: {
        zIndex: "10",
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },

      "&[aria-invalid='true']": {
        borderColor: "{colors.critical}",
      },

      _disabled: { opacity: "0.5", cursor: "not-allowed" },
    },

    separator: {
      display: "inline-flex",
      alignItems: "center",
      color: "{colors.foreground.tertiary}",
      userSelect: "none",
      "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
    },
  },
  variants: {
    size: {
      sm: { slot: { width: "2rem", height: "2rem", fontSize: "{fontSizes.xs}" } },
      md: { slot: { width: "2.25rem", height: "2.25rem" } },
      lg: { slot: { width: "2.5rem", height: "2.5rem", fontSize: "{fontSizes.md}" } },
      xl: { slot: { width: "3rem", height: "3rem", fontSize: "{fontSizes.lg}" } },
    },
  },
  defaultVariants: { size: "md" },
});

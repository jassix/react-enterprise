import { defineRecipe } from "@pandacss/dev";
import { inputSize } from "./input.tokens";

/**
 * Input — luma signature: rounded-3xl, translucent border-color fill
 * (`bg-input/50` ≈ 50% alpha on the border token), transparent border that
 * lights up to the focus ring on `:focus-visible`, `aria-invalid` adopts the
 * critical halo. `filled` / `flushed` stay as coherent alternatives.
 *
 * All values snap to /4: heights are 32/36/40/44, padding-x is 12/16/24,
 * padding-y is 4/8.
 */
export const inputRecipe = defineRecipe({
  className: "input",
  description: "Luma input — variants: outline (default) / filled / flushed",
  jsx: ["Input"],
  base: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    minWidth: "0",
    fontFamily: "{fonts.body}",
    fontWeight: "{fontWeights.regular}",
    lineHeight: "{lineHeight.normal}",
    color: "{colors.foreground}",
    outline: "none",
    border: "1px solid transparent",
    // Luma narrows the transition list: only color/box-shadow/bg animate.
    transition:
      "color {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}, border-color {durations.press} {easings.easeOut}",

    _placeholder: {
      color: "{colors.foreground.tertiary}",
    },

    _disabled: {
      pointerEvents: "none",
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

    // Native file input chip — match luma's `file:` styling.
    "&[type='file']": {
      "&::file-selector-button": {
        display: "inline-flex",
        height: "1.75rem", // 28px
        padding: "0",
        marginInlineEnd: "{spacing.sm}", // 8
        border: "0",
        background: "transparent",
        fontSize: "{fontSizes.sm}",
        fontWeight: "{fontWeights.medium}",
        color: "{colors.foreground}",
        cursor: "pointer",
      },
    },
  },
  variants: {
    variant: {
      outline: {
        bg: "color-mix(in oklab, {colors.border} 50%, transparent)",
        borderRadius: "{radii.3xl}", // 24px
      },
      filled: {
        bg: "{colors.surface.muted}",
        borderRadius: "{radii.3xl}",
        _hover: {
          bg: "{colors.surface.subtle}",
        },
        _focusVisible: {
          bg: "{colors.surface.base}",
        },
      },
      flushed: {
        bg: "transparent",
        border: "none",
        borderBottom: "1px solid {colors.border}",
        borderRadius: "0",
        paddingInline: "0",
        _focusVisible: {
          borderBottomColor: "{colors.focus.ring}",
          boxShadow: "0 1px 0 0 {colors.focus.ring}",
        },
        "&[aria-invalid='true']": {
          borderBottomColor: "{colors.critical}",
          boxShadow: "0 1px 0 0 {colors.critical}",
        },
      },
    },
    size: inputSize,
  },
  defaultVariants: {
    variant: "outline",
    size: "md",
  },
});

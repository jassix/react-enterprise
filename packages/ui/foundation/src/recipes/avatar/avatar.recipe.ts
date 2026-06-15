import { defineRecipe } from "@pandacss/dev";
import { avatarSize } from "./avatar.tokens";

/**
 * Avatar — luma signature: circular by default with a muted neutral fallback
 * surface. Sizes snap to the /4 grid (24/32/40/48/56/64). Image fills cover.
 */
export const avatarRecipe = defineRecipe({
  className: "avatar",
  description: "Luma avatar — circular profile container",
  jsx: ["Avatar"],
  base: {
    display: "flex",
    position: "relative",
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    verticalAlign: "middle",
    bg: "{colors.surface.muted}",
    color: "{colors.foreground.tertiary}",
    fontFamily: "{fonts.body}",
    fontSize: "{fontSizes.sm}",
    fontWeight: "{fontWeights.medium}",
    userSelect: "none",
    overflow: "hidden",

    // Luma `after:border-border after:mix-blend-darken` hairline — softens
    // the edge against the avatar fill. Dark mode flips to `lighten`;
    // using explicit ancestor selectors here avoids Panda's default `_dark`
    // expansion which would emit an invalid `.avatar::after.dark` selector
    // (pseudo-elements can't be followed by class selectors).
    _after: {
      content: "''",
      position: "absolute",
      inset: "0",
      borderRadius: "inherit",
      border: "1px solid {colors.border}",
      mixBlendMode: "darken",
      pointerEvents: "none",
    },
    ".dark &::after": { mixBlendMode: "lighten" },
    "[data-theme='dark'] &::after": { mixBlendMode: "lighten" },

    "& img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      aspectRatio: "1",
      borderRadius: "inherit",
    },
  },
  variants: {
    size: avatarSize,
    shape: {
      circle: { borderRadius: "{radii.full}" },
      square: { borderRadius: "0" },
      rounded: { borderRadius: "{radii.lg}" },
    },
  },
  defaultVariants: { size: "md", shape: "circle" },
});

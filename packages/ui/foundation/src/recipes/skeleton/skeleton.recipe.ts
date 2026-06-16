import { defineRecipe } from "@pandacss/dev";

/**
 * Skeleton — luma signature: rounded surface.muted block with a subtle
 * shimmer pseudo-element animating from -100% to 100% translateX.
 */
export const skeletonRecipe = defineRecipe({
  className: "skeleton",
  description: "Luma skeleton — loading shimmer placeholder",
  jsx: ["Skeleton"],
  base: {
    bg: "{colors.surface.muted}",
    borderRadius: "{radii.2xl}", // 20 — luma `rounded-2xl`
    position: "relative",
    overflow: "hidden",

    _before: {
      content: '""',
      position: "absolute",
      inset: "0",
      transform: "translateX(-100%)",
      bg: "linear-gradient(90deg, transparent, color-mix(in oklab, {colors.surface.subtle} 70%, transparent), transparent)",
      animation: "skeleton-pulse 1.5s ease-in-out infinite",
    },

    "@media (prefers-reduced-motion: reduce)": {
      _before: { animation: "none" },
    },
  },
  variants: {
    variant: {
      text: { height: "1em", borderRadius: "{radii.sm}" },
      circle: { borderRadius: "{radii.full}" },
      rect: {},
    },
    speed: {
      slow: { _before: { animationDuration: "2s" } },
      normal: {},
      fast: { _before: { animationDuration: "1s" } },
    },
  },
  defaultVariants: { variant: "rect", speed: "normal" },
});

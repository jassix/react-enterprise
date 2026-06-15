import { defineRecipe } from "@pandacss/dev";

/**
 * Separator — luma signature: 1px `bg-border` line. Orientation drives which
 * axis collapses to 1px (`data-horizontal:h-px w-full` vs
 * `data-vertical:w-px self-stretch`). `variant` keeps solid / dashed / dotted
 * as ergonomic extensions; `emphasis` lets consumers dial the contrast up or
 * down without dropping to ad-hoc CSS.
 */
export const separatorRecipe = defineRecipe({
  className: "separator",
  description: "Luma separator — 1px border divider",
  jsx: ["Separator"],
  base: {
    flexShrink: "0",
    bg: "{colors.border}",
    border: "none",

    "&[data-orientation='horizontal']": {
      height: "1px",
      width: "100%",
    },
    "&[data-orientation='vertical']": {
      width: "1px",
      height: "100%",
      alignSelf: "stretch",
    },
  },
  variants: {
    orientation: {
      horizontal: {
        width: "100%",
        height: "1px",
      },
      vertical: {
        width: "1px",
        height: "100%",
        alignSelf: "stretch",
      },
    },
    variant: {
      solid: {},
      dashed: {
        bg: "transparent",
        borderTop: "1px dashed {colors.border}",
      },
      dotted: {
        bg: "transparent",
        borderTop: "1px dotted {colors.border}",
      },
    },
    emphasis: {
      subtle: { bg: "{colors.border.hairline}" },
      DEFAULT: {},
      strong: { bg: "{colors.border.emphasis}" },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
    variant: "solid",
    emphasis: "DEFAULT",
  },
  compoundVariants: [
    {
      orientation: "vertical",
      variant: "dashed",
      css: {
        bg: "transparent",
        borderTop: "none",
        borderLeft: "1px dashed {colors.border}",
      },
    },
    {
      orientation: "vertical",
      variant: "dotted",
      css: {
        bg: "transparent",
        borderTop: "none",
        borderLeft: "1px dotted {colors.border}",
      },
    },
  ],
});

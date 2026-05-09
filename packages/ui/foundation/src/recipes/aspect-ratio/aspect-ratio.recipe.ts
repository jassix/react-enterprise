import { defineRecipe } from "@pandacss/dev";

export const aspectRatioRecipe = defineRecipe({
  className: "aspect",
  description: "Aspect ratio container for responsive media",
  base: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
    borderRadius: "{radii.lg}",

    "& > img, & > video, & > iframe": {
      position: "absolute",
      inset: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
    },
  },
  variants: {
    ratio: {
      square: { aspectRatio: "1 / 1" },
      video: { aspectRatio: "16 / 9" },
      wide: { aspectRatio: "21 / 9" },
      portrait: { aspectRatio: "3 / 4" },
      classic: { aspectRatio: "4 / 3" },
      golden: { aspectRatio: "1.618 / 1" },
    },
  },
  defaultVariants: {
    ratio: "video",
  },
});

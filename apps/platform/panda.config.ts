import { defineConfig } from "@pandacss/dev";
import { lumePreset } from "@lume/foundation/preset";

export default defineConfig({
  preflight: true,
  presets: [lumePreset],
  include: ["./src/**/*.{ts,tsx}", "../../packages/ui/primitives/src/**/*.{ts,tsx}"],
  exclude: [],
  outdir: "styled-system",
  jsxFramework: "react",

  globalCss: {
    "html, body": {
      minHeight: "100%",
      fontFamily: "{fonts.body}",
      WebkitFontSmoothing: "antialiased",
      MozOsxFontSmoothing: "grayscale",
      margin: "0",
    },
    body: {
      background: "{colors.background}",
      color: "{colors.foreground}",
    },
  },

  conditions: {
    extend: {
      dark: ".dark &, &.dark, [data-theme='dark'] &",
      light: ".light &, &.light, [data-theme='light'] &",
      highContrast: "@media (prefers-contrast: high)",
      lessContrast: "@media (prefers-contrast: less)",
      moreContrast: "@media (prefers-contrast: more)",
    },
  },
});

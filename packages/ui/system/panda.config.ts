import { defineConfig } from "@pandacss/dev";
import { lumePreset } from "@lume/foundation/preset";

export default defineConfig({
	preflight: true,
	presets: [lumePreset],
	include: [
		"./.storybook/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx,mdx}",
		"../primitives/src/**/*.{ts,tsx}",
		"../blocks/src/**/*.{ts,tsx}",
	],
	exclude: [],
	outdir: "styled-system",
	jsxFramework: "react",

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

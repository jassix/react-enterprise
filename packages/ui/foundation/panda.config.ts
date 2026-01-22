import { defineConfig } from "@pandacss/dev";
import { lumePreset } from "~/preset";

export default defineConfig({
	preflight: true,
	presets: [lumePreset],
	include: ["./src/**/*.{ts,tsx,js,jsx}"],
	exclude: [],
	outdir: "styled-system",

	jsxFramework: "react",

	conditions: {
		extend: {
			highContrast: "@media (prefers-contrast: high)",
			lessContrast: "@media (prefers-contrast: less)",
			moreContrast: "@media (prefers-contrast: more)",
		},
	},

	utilities: {
		extend: {
			focusRing: {
				className: "focus-ring",
				values: { type: "boolean" },
				transform(value) {
					if (!value) return {};
					return {
						"&:focus-visible": {
							outline: "2px solid",
							outlineColor: "{colors.focus.ring}",
							outlineOffset: "{colors.focus.ringOffset}",
						},
					};
				},
			},
			truncate: {
				className: "truncate",
				values: { type: "boolean" },
				transform(value) {
					if (!value) return {};
					return {
						overflow: "hidden",
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
					};
				},
			},
			lineClamp: {
				className: "line-clamp",
				values: { type: "number" },
				transform(value) {
					return {
						display: "-webkit-box",
						WebkitLineClamp: value,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
					};
				},
			},
			srOnly: {
				className: "sr-only",
				values: { type: "boolean" },
				transform(value) {
					if (!value) return {};
					return {
						position: "absolute",
						width: "1px",
						height: "1px",
						padding: "0",
						margin: "-1px",
						overflow: "hidden",
						clip: "rect(0, 0, 0, 0)",
						whiteSpace: "nowrap",
						borderWidth: "0",
					};
				},
			},
		},
	},

	theme: {
		extend: {
			keyframes: {
				"skeleton-pulse": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
			},
		},
	},
});

/**
 * Control heights — buttons, inputs, select triggers, toggle items, menu triggers.
 * Tahoe-proportioned: xs hits compact dense controls, md is the default 36px,
 * lg/xl give touch-friendly targets. Larger sizes are reserved for avatars and
 * other container surfaces.
 *
 * Raw glyph/fill sizes (checkbox controls, spinner diameters, close-glyph frames)
 * are defined per-recipe in px — do not use this scale for anything smaller than
 * 20px or you'll get invisible controls.
 */
export const sizes = {
	xs: { value: "20px" },
	sm: { value: "28px" },
	md: { value: "36px" },
	lg: { value: "44px" },
	xl: { value: "56px" },
	"2xl": { value: "64px" },
	"3xl": { value: "80px" },
	"4xl": { value: "96px" },
	"5xl": { value: "112px" },
	"6xl": { value: "128px" },
} as const;

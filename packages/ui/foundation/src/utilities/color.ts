export function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: Number.parseInt(result[1], 16),
				g: Number.parseInt(result[2], 16),
				b: Number.parseInt(result[3], 16),
			}
		: null;
}

export function rgbToHsl(
	r: number,
	g: number,
	b: number,
): { h: number; s: number; l: number } {
	r /= 255;
	g /= 255;
	b /= 255;

	const max = Math.max(r, g, b);
	const min = Math.min(r, g, b);
	let h = 0;
	let s = 0;
	const l = (max + min) / 2;

	if (max !== min) {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

		switch (max) {
			case r:
				h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
				break;
			case g:
				h = ((b - r) / d + 2) / 6;
				break;
			case b:
				h = ((r - g) / d + 4) / 6;
				break;
		}
	}

	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100),
	};
}

export function getRelativeLuminance(r: number, g: number, b: number): number {
	const rsRGB = r / 255;
	const gsRGB = g / 255;
	const bsRGB = b / 255;

	const r2 =
		rsRGB <= 0.03928 ? rsRGB / 12.92 : ((rsRGB + 0.055) / 1.055) ** 2.4;
	const g2 =
		gsRGB <= 0.03928 ? gsRGB / 12.92 : ((gsRGB + 0.055) / 1.055) ** 2.4;
	const b2 =
		bsRGB <= 0.03928 ? bsRGB / 12.92 : ((bsRGB + 0.055) / 1.055) ** 2.4;

	return 0.2126 * r2 + 0.7152 * g2 + 0.0722 * b2;
}

export function getContrastRatio(
	color1: { r: number; g: number; b: number },
	color2: { r: number; g: number; b: number },
): number {
	const l1 = getRelativeLuminance(color1.r, color1.g, color1.b);
	const l2 = getRelativeLuminance(color2.r, color2.g, color2.b);

	const lighter = Math.max(l1, l2);
	const darker = Math.min(l1, l2);

	return (lighter + 0.05) / (darker + 0.05);
}

export function meetsWCAGAAA(contrastRatio: number): boolean {
	return contrastRatio >= 7;
}

export function meetsWCAGAA(contrastRatio: number): boolean {
	return contrastRatio >= 4.5;
}

export function meetsWCAGAALarge(contrastRatio: number): boolean {
	return contrastRatio >= 3;
}

export function isAccessibleColorPair(
	foreground: string,
	background: string,
	level: "AA" | "AAA" | "AA-Large" = "AA",
): boolean {
	const fgRgb = hexToRgb(foreground);
	const bgRgb = hexToRgb(background);

	if (!fgRgb || !bgRgb) return false;

	const ratio = getContrastRatio(fgRgb, bgRgb);

	switch (level) {
		case "AAA":
			return meetsWCAGAAA(ratio);
		case "AA":
			return meetsWCAGAA(ratio);
		case "AA-Large":
			return meetsWCAGAALarge(ratio);
		default:
			return false;
	}
}


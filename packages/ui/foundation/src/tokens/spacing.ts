/**
 * Primitive spacing scale — numeric keys on the 4px grid (Tailwind convention).
 * T-shirt aliases (xs/sm/md/lg/xl/2xl) live in `semantic/sizing.ts` and resolve
 * to the keys below: e.g. `{spacing.md}` → `{spacing.3}` → 12px.
 *
 * Prefer semantic names for common spacing in recipes (gap/padding of controls);
 * reach for numeric keys when you need an off-scale value (10px, 18px, 40px).
 */
export const spacing = {
	"0": { value: "0" },
	"0.5": { value: "0.125rem" }, // 2px — hairline offsets only
	"1": { value: "0.25rem" }, // 4px
	"1.5": { value: "0.375rem" }, // 6px
	"2": { value: "0.5rem" }, // 8px
	"2.5": { value: "0.625rem" }, // 10px
	"3": { value: "0.75rem" }, // 12px
	"3.5": { value: "0.875rem" }, // 14px
	"4": { value: "1rem" }, // 16px
	"5": { value: "1.25rem" }, // 20px
	"6": { value: "1.5rem" }, // 24px
	"7": { value: "1.75rem" }, // 28px
	"8": { value: "2rem" }, // 32px
	"10": { value: "2.5rem" }, // 40px
	"12": { value: "3rem" }, // 48px
	"14": { value: "3.5rem" }, // 56px
	"16": { value: "4rem" }, // 64px
	"20": { value: "5rem" }, // 80px
	"24": { value: "6rem" }, // 96px
} as const;

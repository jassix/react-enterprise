export const breakpointValues = {
	xs: 320,
	sm: 640,
	md: 768,
	lg: 1024,
	xl: 1280,
	"2xl": 1536,
} as const;

export type Breakpoint = keyof typeof breakpointValues;

export function isBreakpoint(value: string): value is Breakpoint {
	return value in breakpointValues;
}

export function getBreakpointValue(breakpoint: Breakpoint): number {
	return breakpointValues[breakpoint];
}

export function createMediaQuery(breakpoint: Breakpoint, min = true): string {
	const value = getBreakpointValue(breakpoint);
	return min
		? `@media (min-width: ${value}px)`
		: `@media (max-width: ${value - 1}px)`;
}

export function between(minBp: Breakpoint, maxBp: Breakpoint): string {
	const minValue = getBreakpointValue(minBp);
	const maxValue = getBreakpointValue(maxBp);
	return `@media (min-width: ${minValue}px) and (max-width: ${maxValue - 1}px)`;
}

export function only(breakpoint: Breakpoint): string {
	const breakpoints = Object.keys(breakpointValues) as Breakpoint[];
	const index = breakpoints.indexOf(breakpoint);

	if (index === -1) return "";
	if (index === breakpoints.length - 1) {
		return createMediaQuery(breakpoint, true);
	}

	const nextBreakpoint = breakpoints[index + 1];
	return between(breakpoint, nextBreakpoint);
}


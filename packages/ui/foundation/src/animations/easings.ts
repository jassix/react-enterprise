export const easings = {
	linear: { value: "linear" },
	easeIn: { value: "cubic-bezier(0.4, 0, 1, 1)" },
	// Strong ease-out for entrances and responsive UI interactions
	easeOut: { value: "cubic-bezier(0.23, 1, 0.32, 1)" },
	// Strong ease-in-out for on-screen movement
	easeInOut: { value: "cubic-bezier(0.77, 0, 0.175, 1)" },
	// iOS-like curve for drawers, sheets, and large surface transitions
	drawer: { value: "cubic-bezier(0.32, 0.72, 0, 1)" },
	// Subtle spring for playful micro-interactions — keep bounce under 0.3 range
	spring: { value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
	bounce: { value: "cubic-bezier(0.34, 1.56, 0.64, 1)" },
	emphasized: { value: "cubic-bezier(0.3, 0, 0, 1)" },
	decelerated: { value: "cubic-bezier(0.23, 1, 0.32, 1)" },
	accelerated: { value: "cubic-bezier(0.4, 0, 1, 1)" },
} as const;

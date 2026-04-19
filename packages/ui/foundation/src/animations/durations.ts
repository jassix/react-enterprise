export const durations = {
	instant: { value: "75ms" },
	// Button press / :active feedback — must be imperceptibly fast
	press: { value: "160ms" },
	// Tooltips and small popovers
	tooltip: { value: "125ms" },
	fast: { value: "150ms" },
	normal: { value: "200ms" },
	// Modal / dialog / drawer scale
	surface: { value: "250ms" },
	slow: { value: "400ms" },
	slower: { value: "700ms" },
} as const;

export const keyframes = {
	fadeIn: {
		value: {
			"0%": { opacity: "0" },
			"100%": { opacity: "1" },
		},
	},
	fadeOut: {
		value: {
			"0%": { opacity: "1" },
			"100%": { opacity: "0" },
		},
	},
	slideInFromTop: {
		value: {
			"0%": { transform: "translateY(-100%)" },
			"100%": { transform: "translateY(0)" },
		},
	},
	slideInFromBottom: {
		value: {
			"0%": { transform: "translateY(100%)" },
			"100%": { transform: "translateY(0)" },
		},
	},
	slideInFromLeft: {
		value: {
			"0%": { transform: "translateX(-100%)" },
			"100%": { transform: "translateX(0)" },
		},
	},
	slideInFromRight: {
		value: {
			"0%": { transform: "translateX(100%)" },
			"100%": { transform: "translateX(0)" },
		},
	},
	slideOutToTop: {
		value: {
			"0%": { transform: "translateY(0)" },
			"100%": { transform: "translateY(-100%)" },
		},
	},
	slideOutToBottom: {
		value: {
			"0%": { transform: "translateY(0)" },
			"100%": { transform: "translateY(100%)" },
		},
	},
	slideOutToLeft: {
		value: {
			"0%": { transform: "translateX(0)" },
			"100%": { transform: "translateX(-100%)" },
		},
	},
	slideOutToRight: {
		value: {
			"0%": { transform: "translateX(0)" },
			"100%": { transform: "translateX(100%)" },
		},
	},
	scaleIn: {
		value: {
			"0%": { transform: "scale(0.95)", opacity: "0" },
			"100%": { transform: "scale(1)", opacity: "1" },
		},
	},
	scaleOut: {
		value: {
			"0%": { transform: "scale(1)", opacity: "1" },
			"100%": { transform: "scale(0.95)", opacity: "0" },
		},
	},
	spin: {
		value: {
			"0%": { transform: "rotate(0deg)" },
			"100%": { transform: "rotate(360deg)" },
		},
	},
	pulse: {
		value: {
			"0%, 100%": { opacity: "1" },
			"50%": { opacity: "0.5" },
		},
	},
	ping: {
		value: {
			"0%": { transform: "scale(1)", opacity: "1" },
			"75%, 100%": { transform: "scale(2)", opacity: "0" },
		},
	},
	bounce: {
		value: {
			"0%, 100%": {
				transform: "translateY(-25%)",
				animationTimingFunction: "cubic-bezier(0.8, 0, 1, 1)",
			},
			"50%": {
				transform: "translateY(0)",
				animationTimingFunction: "cubic-bezier(0, 0, 0.2, 1)",
			},
		},
	},
	shake: {
		value: {
			"0%, 100%": { transform: "translateX(0)" },
			"10%, 30%, 50%, 70%, 90%": { transform: "translateX(-10px)" },
			"20%, 40%, 60%, 80%": { transform: "translateX(10px)" },
		},
	},
	wiggle: {
		value: {
			"0%, 100%": { transform: "rotate(0deg)" },
			"25%": { transform: "rotate(-3deg)" },
			"75%": { transform: "rotate(3deg)" },
		},
	},
} as const;


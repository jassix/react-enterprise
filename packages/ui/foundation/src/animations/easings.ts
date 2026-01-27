export const easings = {
  linear: { value: "linear" },
  easeIn: { value: "cubic-bezier(0.4, 0, 1, 1)" },
  easeOut: { value: "cubic-bezier(0, 0, 0.2, 1)" },
  easeInOut: { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
  spring: { value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
  bounce: { value: "cubic-bezier(0.68, -0.55, 0.265, 1.55)" },
  emphasized: { value: "cubic-bezier(0.4, 0, 0.6, 1)" },
  decelerated: { value: "cubic-bezier(0, 0, 0.2, 1)" },
  accelerated: { value: "cubic-bezier(0.4, 0, 1, 1)" },
} as const;

/**
 * Component-scoped size variants for `cardRecipe`.
 *
 * Card size is a single knob that scales vertical rhythm (root gap/py) and
 * horizontal padding of the header/content/footer slots. Values reference
 * the numeric spacing scale.
 */
export const cardSize = {
  sm: {
    root: {
      gap: "{spacing.4}", // 16px — luma `gap-4`
      paddingBlock: "{spacing.4}", // 16px — luma `py-4`
    },
    header: { paddingInline: "{spacing.4}" }, // 16px — luma `px-4`
    content: { paddingInline: "{spacing.4}" },
    footer: { paddingInline: "{spacing.4}" },
  },
  md: {
    root: {
      gap: "{spacing.6}", // 24px — luma `gap-6`
      paddingBlock: "{spacing.6}", // 24px — luma `py-6`
    },
    header: { paddingInline: "{spacing.6}" }, // 24px — luma `px-6`
    content: { paddingInline: "{spacing.6}" },
    footer: { paddingInline: "{spacing.6}" },
  },
} as const;

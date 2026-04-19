import { defineSlotRecipe } from "@pandacss/dev";

export const dataTableRecipe = defineSlotRecipe({
  className: "data-table",
  description: "Data table recipe for opinionated tables with toolbar, filters, and pagination",
  slots: [
    "root",
    "toolbar",
    "toolbarStart",
    "toolbarEnd",
    "tableWrapper",
    "table",
    "head",
    "headerRow",
    "header",
    "headerSort",
    "body",
    "row",
    "cell",
    "footer",
    "pagination",
    "empty",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "{spacing.md}",
      width: "100%",
      bg: "{colors.background.popover}",
      border: "1px solid {colors.border.hairline}",
      borderRadius: "{radii.3xl}",
      overflow: "hidden",
    },

    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "{spacing.md}",
      padding: "{spacing.md} {spacing.lg}",
      borderBottom: "1px solid {colors.border}",
    },

    toolbarStart: {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.sm}",
      flex: "1",
    },

    toolbarEnd: {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.sm}",
    },

    tableWrapper: {
      overflowX: "auto",
    },

    table: {
      width: "100%",
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.sm}",
      borderCollapse: "collapse",
    },

    head: {
      bg: "{colors.surface.subtle}",
      borderBottom: "1px solid {colors.border}",
    },

    headerRow: {},

    header: {
      textAlign: "left",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground.secondary}",
      padding: "{spacing.md} {spacing.lg}",
      whiteSpace: "nowrap",
      userSelect: "none",
    },

    headerSort: {
      display: "inline-flex",
      alignItems: "center",
      gap: "{spacing.xs}",
      cursor: "pointer",

      _hover: { color: "{colors.foreground}" },
    },

    body: {
      "& tr": {
        borderBottom: "1px solid {colors.border}",
        _last: { borderBottom: "none" },
      },
    },

    row: {
      transition: "background-color {durations.press} {easings.easeOut}",

      _hover: { bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)" },

      "&:has([aria-expanded='true'])": {
        bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)",
      },

      "&[data-selected='true'], &[data-state='selected']": { bg: "{colors.surface.muted}" },
    },

    cell: {
      padding: "{spacing.md} {spacing.lg}",
      verticalAlign: "middle",
      color: "{colors.foreground}",
    },

    footer: {
      padding: "{spacing.md} {spacing.lg}",
      borderTop: "1px solid {colors.border}",
      bg: "{colors.surface.subtle}",
    },

    pagination: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "{spacing.md}",
      padding: "{spacing.md} {spacing.lg}",
      borderTop: "1px solid {colors.border}",
      fontSize: "{fontSizes.xs}",
      color: "{colors.foreground.secondary}",
    },

    empty: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "{spacing.sm}",
      padding: "4rem {spacing.lg}",
      color: "{colors.foreground.tertiary}",
      fontSize: "{fontSizes.sm}",
      textAlign: "center",
    },
  },
  variants: {
    density: {
      compact: {
        header: { padding: "{spacing.sm} {spacing.md}", fontSize: "{fontSizes.xs}" },
        cell: { padding: "{spacing.sm} {spacing.md}" },
      },
      comfortable: {},
      spacious: {
        header: { padding: "{spacing.lg} {spacing.xl}" },
        cell: { padding: "{spacing.lg} {spacing.xl}" },
      },
    },
    striped: {
      true: {
        body: {
          "& tr:nth-child(even)": { bg: "{colors.surface.subtle}" },
        },
      },
    },
  },
  defaultVariants: {
    density: "comfortable",
  },
});

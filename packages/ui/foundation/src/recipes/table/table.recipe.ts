import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Table — luma signature: bare table (`border-collapse`, `text-sm`) with
 * `thead`/`tbody`/`tfoot`/rows separated by bottom borders, the `tfoot` wearing
 * a `bg-muted/50` fill. Rows brighten on hover to `bg-muted/50` and lock to
 * `bg-muted` when `data-state='selected'`. Cells use a 12px padding rhythm
 * (`p-3` / `h-12` head). The `root` slot wraps the `<table>` in a horizontally
 * scrollable container — matches luma's `relative w-full overflow-x-auto`.
 */
export const tableRecipe = defineSlotRecipe({
  className: "table",
  description: "Luma table — overflow wrapper, muted footer, hover/selected rows",
  jsx: ["Table"],
  slots: ["root", "table", "caption", "head", "body", "footer", "row", "header", "cell"],
  base: {
    root: {
      position: "relative",
      width: "100%",
      overflowX: "auto",
    },

    table: {
      width: "100%",
      captionSide: "bottom",
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground}",
      borderCollapse: "collapse",
    },

    caption: {
      marginTop: "{spacing.lg}", // 16 — luma `mt-4`
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground.tertiary}",
    },

    head: {
      "& tr": {
        borderBottom: "1px solid {colors.border}",
      },
    },

    body: {
      "& tr:last-child": {
        borderBottom: "0",
      },
    },

    footer: {
      bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)",
      borderTop: "1px solid {colors.border}",
      fontWeight: "{fontWeights.medium}",
      "& > tr:last-child": {
        borderBottom: "0",
      },
    },

    row: {
      borderBottom: "1px solid {colors.border}",
      transition: "background-color {durations.press} {easings.easeOut}",

      _hover: {
        bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)",
      },

      "&:has([aria-expanded='true'])": {
        bg: "color-mix(in oklab, {colors.surface.muted} 50%, transparent)",
      },

      "&[data-state='selected']": {
        bg: "{colors.surface.muted}",
      },
    },

    header: {
      height: "3rem", // 48 — luma `h-12`
      paddingInline: "{spacing.md}", // 12 — luma `px-3`
      textAlign: "left",
      verticalAlign: "middle",
      fontWeight: "{fontWeights.medium}",
      whiteSpace: "nowrap",
      color: "{colors.foreground}",

      "&:has([role='checkbox'])": {
        paddingInlineEnd: "0",
      },
    },

    cell: {
      padding: "{spacing.md}", // 12 — luma `p-3`
      verticalAlign: "middle",
      whiteSpace: "nowrap",
      color: "{colors.foreground}",

      "&:has([role='checkbox'])": {
        paddingInlineEnd: "0",
      },
    },
  },
  variants: {
    density: {
      compact: {
        header: { height: "2.25rem", paddingInline: "{spacing.sm}", fontSize: "{fontSizes.xs}" },
        cell: { padding: "{spacing.sm}" },
      },
      comfortable: {},
      spacious: {
        header: { height: "3.5rem", paddingInline: "{spacing.lg}" },
        cell: { padding: "{spacing.lg}" },
      },
    },
    striped: {
      true: {
        body: {
          "& tr:nth-child(even)": {
            bg: "color-mix(in oklab, {colors.surface.muted} 40%, transparent)",
          },
        },
      },
    },
    bordered: {
      true: {
        table: { border: "1px solid {colors.border}", borderRadius: "{radii.md}" },
        header: {
          borderRight: "1px solid {colors.border}",
          _last: { borderRight: "none" },
        },
        cell: { borderRight: "1px solid {colors.border}", _last: { borderRight: "none" } },
      },
    },
  },
  defaultVariants: {
    density: "comfortable",
  },
});

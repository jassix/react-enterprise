import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Date picker — luma signature: same control wrapper as Combobox (form-field
 * bundle, embedded input + trigger), calendar surface uses the popover-content
 * bundle. The calendar grid itself uses `--cell-size` (32px) and
 * `--cell-radius` (4xl / 28px) CSS vars so every cell, day button, and
 * weekday header snaps to the same rhythm. Selected/today/range/outside
 * states mirror luma 1:1.
 */
export const datePickerRecipe = defineSlotRecipe({
  className: "date-picker",
  description: "Luma date picker — input + calendar popover",
  jsx: ["DatePicker"],
  slots: [
    "root",
    "label",
    "control",
    "input",
    "trigger",
    "clearTrigger",
    "positioner",
    "content",
    "presetTrigger",
    "view",
    "viewControl",
    "viewTrigger",
    "prevTrigger",
    "nextTrigger",
    "rangeText",
    "table",
    "tableHead",
    "tableHeader",
    "tableBody",
    "tableRow",
    "tableCell",
    "tableCellTrigger",
  ],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
      gap: "{spacing.sm}",
      width: "100%",
    },

    label: {
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
    },

    control: {
      position: "relative",
      display: "flex",
      alignItems: "stretch",
      width: "100%",
      height: "2.25rem",
      border: "1px solid transparent",
      borderRadius: "{radii.3xl}",
      bg: "color-mix(in oklab, {colors.border} 50%, transparent)",
      transition: "all {durations.press} {easings.easeOut}",
      overflow: "hidden",

      "&:has(input:focus-visible), &:has(button[data-state='open'])": {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },

      "&[data-invalid='true']": {
        borderColor: "{colors.critical}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
        _dark: {
          borderColor: "color-mix(in oklab, {colors.critical} 50%, transparent)",
          boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
        },
      },
    },

    input: {
      flex: "1",
      minWidth: "0",
      bg: "transparent",
      border: "none",
      outline: "none",
      paddingInline: "{spacing.md}",
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground}",
      _placeholder: { color: "{colors.foreground.tertiary}" },
      _disabled: { opacity: "0.5", cursor: "not-allowed" },
    },

    trigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      paddingInline: "{spacing.md}",
      bg: "transparent",
      border: "none",
      color: "{colors.foreground.tertiary}",
      cursor: "pointer",
      outline: "none",
      transition: "color {durations.press} {easings.easeOut}",
      _hover: { color: "{colors.foreground}" },
      _disabled: { opacity: "0.5", cursor: "not-allowed" },
    },

    clearTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      paddingInline: "{spacing.sm}",
      bg: "transparent",
      border: "none",
      color: "{colors.foreground.tertiary}",
      cursor: "pointer",
      outline: "none",
      _hover: { color: "{colors.foreground}" },
    },

    positioner: { position: "absolute", zIndex: "{zIndex.popover}" },

    // Popover content — luma `p-3`, rounded-3xl, shadow-lg, subtle outline.
    // Define the `--cell-size` (32px) and `--cell-radius` (4xl) vars here so
    // every descendant slot can snap to the same rhythm.
    content: {
      display: "flex",
      flexDirection: "column",
      gap: "{spacing.lg}",
      minWidth: "18rem",
      padding: "{spacing.md}", // 12 — luma `p-3`
      bg: "{colors.background.popover}",
      color: "{colors.foreground}",
      borderRadius: "{radii.3xl}",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
      outlineOffset: "-1px",
      transformOrigin: "var(--transform-origin)",
      willChange: "transform, opacity",
      // Luma `[--cell-size:--spacing(8)] [--cell-radius:var(--radius-4xl)]`.
      "--cell-size": "2rem", // 32
      "--cell-radius": "{radii.4xl}", // 28
      _dark: { outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)" },

      _open: { animation: "scaleIn {durations.surface} {easings.easeOut}" },
      _closed: { animation: "scaleOut {durations.normal} {easings.easeOut}" },

      "@media (prefers-reduced-motion: reduce)": {
        _open: { animation: "fadeIn {durations.normal} {easings.easeOut}" },
        _closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
      },
    },

    presetTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "flex-start",
      paddingInline: "{spacing.md}",
      paddingBlock: "{spacing.xs}",
      bg: "transparent",
      border: "none",
      borderRadius: "{radii.2xl}",
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground}",
      cursor: "pointer",
      outline: "none",
      transition: "background-color {durations.press} {easings.easeOut}",
      _hover: { bg: "{colors.surface.muted}" },
      _focusVisible: {
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },

    // View = one month pane. Luma `flex w-full flex-col gap-4`.
    view: {
      display: "flex",
      flexDirection: "column",
      gap: "{spacing.md}",
      width: "100%",
    },

    // ViewControl = the nav row (prev / month-year / next). Luma absolute
    // positions this over the month; here we use flex for simplicity. A
    // full-parity implementation could absolute-position, but luma's
    // absolute is a day-picker library quirk.
    viewControl: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "{spacing.xs}",
      width: "100%",
      height: "var(--cell-size)",
    },

    // ViewTrigger = the "May 2026" caption button. Luma: font-medium
    // text-sm, ghost (no bg), rounded-(--cell-radius).
    viewTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "calc({spacing.sm} - 2px)", // 6 — luma `gap-1.5`
      height: "var(--cell-size)",
      paddingInline: "{spacing.md}",
      bg: "transparent",
      border: "none",
      borderRadius: "var(--cell-radius)",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
      cursor: "pointer",
      outline: "none",
      userSelect: "none",
      transition: "background-color {durations.press} {easings.easeOut}",
      _hover: { bg: "{colors.surface.muted}" },
      _focusVisible: {
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
    },

    // Prev / Next triggers — luma ghost icon button sized to `--cell-size`.
    prevTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "var(--cell-size)",
      height: "var(--cell-size)",
      padding: "0",
      bg: "transparent",
      border: "none",
      borderRadius: "var(--cell-radius)",
      color: "{colors.foreground}",
      cursor: "pointer",
      outline: "none",
      userSelect: "none",
      transition: "background-color {durations.press} {easings.easeOut}",
      _hover: { bg: "{colors.surface.muted}" },
      _focusVisible: {
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
      "&[aria-disabled='true'], &:disabled": {
        opacity: "0.5",
        pointerEvents: "none",
      },
      "& svg": { width: "1rem", height: "1rem" },
    },

    nextTrigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "var(--cell-size)",
      height: "var(--cell-size)",
      padding: "0",
      bg: "transparent",
      border: "none",
      borderRadius: "var(--cell-radius)",
      color: "{colors.foreground}",
      cursor: "pointer",
      outline: "none",
      userSelect: "none",
      transition: "background-color {durations.press} {easings.easeOut}",
      _hover: { bg: "{colors.surface.muted}" },
      _focusVisible: {
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },
      "&[aria-disabled='true'], &:disabled": {
        opacity: "0.5",
        pointerEvents: "none",
      },
      "& svg": { width: "1rem", height: "1rem" },
    },

    rangeText: {
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
      userSelect: "none",
    },

    // Table = calendar grid. Luma `w-full border-collapse`.
    table: {
      width: "100%",
      borderCollapse: "collapse",
    },

    tableHead: {
      // Ark wraps with <thead> implicitly; style the group container.
    },

    // TableHeader = weekday column header. Luma: flex-1 text-[0.8rem]
    // font-normal text-muted-foreground select-none.
    tableHeader: {
      flex: "1",
      borderRadius: "var(--cell-radius)",
      fontSize: "0.8rem",
      fontWeight: "{fontWeights.regular}",
      color: "{colors.foreground.tertiary}",
      userSelect: "none",
      textAlign: "center",
      paddingBlock: "{spacing.xs}",
    },

    tableBody: {
      // Rows sit below this.
    },

    // TableRow — luma `mt-2 flex w-full`.
    tableRow: {
      display: "flex",
      width: "100%",
      marginTop: "{spacing.sm}",
    },

    // TableCell = the day container. Luma `aspect-square h-full w-full
    // rounded-(--cell-radius)` — flex-1 so all 7 columns share width.
    tableCell: {
      position: "relative",
      flex: "1",
      aspectRatio: "1 / 1",
      padding: "0",
      borderRadius: "var(--cell-radius)",
      textAlign: "center",
      userSelect: "none",

      // Range selection: extend the ends' rounding to the containing
      // cell so the muted band visually butts up to the selected chip.
      "&[data-range-start='true']": {
        borderStartStartRadius: "var(--cell-radius)",
        borderEndStartRadius: "var(--cell-radius)",
      },
      "&[data-range-end='true']": {
        borderStartEndRadius: "var(--cell-radius)",
        borderEndEndRadius: "var(--cell-radius)",
      },
      "&[data-in-range='true']": { borderRadius: "0" },
    },

    // TableCellTrigger = the actual day button. All visual state lives on
    // this element.
    tableCellTrigger: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      minWidth: "var(--cell-size)",
      minHeight: "var(--cell-size)",
      padding: "0",
      bg: "transparent",
      border: "0",
      borderRadius: "var(--cell-radius)",
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.regular}",
      lineHeight: "1",
      color: "{colors.foreground}",
      cursor: "pointer",
      outline: "none",
      userSelect: "none",
      transition:
        "background-color {durations.press} {easings.easeOut}, color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}",

      _hover: { bg: "{colors.surface.muted}" },

      _focusVisible: {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 50%, transparent)",
      },

      // Today — muted bg, foreground text. Luma: `bg-muted text-foreground`.
      "&[data-today='true']": {
        bg: "{colors.surface.muted}",
        color: "{colors.foreground}",
      },

      // Selected single day — primary pill. Luma `bg-primary text-primary-foreground`.
      "&[data-selected='true']": {
        bg: "{colors.interactive.base}",
        color: "{colors.foreground.inverse}",
        _hover: { bg: "{colors.interactive.hover}" },
      },

      // Range endpoints — primary pill like single selection.
      "&[data-range-start='true'], &[data-range-end='true']": {
        bg: "{colors.interactive.base}",
        color: "{colors.foreground.inverse}",
        _hover: { bg: "{colors.interactive.hover}" },
      },

      // Range middle — muted band, plain foreground text, no rounding.
      "&[data-in-range='true']:not([data-range-start='true']):not([data-range-end='true'])": {
        bg: "{colors.surface.muted}",
        color: "{colors.foreground}",
        borderRadius: "0",
        _hover: { bg: "{colors.surface.muted}" },
      },

      // Outside current month — muted text. Luma `text-muted-foreground`.
      "&[data-outside-range='true']": {
        color: "{colors.foreground.tertiary}",
      },

      // Disabled day — 50% opacity, no pointer events. Luma
      // `text-muted-foreground opacity-50`.
      "&[data-disabled='true'], &:disabled": {
        opacity: "0.5",
        pointerEvents: "none",
        color: "{colors.foreground.tertiary}",
      },

      // Unavailable (marked via calendar config) — treat like disabled.
      "&[data-unavailable='true']": {
        opacity: "0.5",
        pointerEvents: "none",
        textDecoration: "line-through",
      },
    },
  },
  variants: {
    size: {
      sm: { control: { height: "2rem" }, input: { fontSize: "{fontSizes.xs}" } },
      md: { control: { height: "2.25rem" } },
      lg: { control: { height: "2.5rem" }, input: { fontSize: "{fontSizes.md}" } },
    },
  },
  defaultVariants: { size: "md" },
});

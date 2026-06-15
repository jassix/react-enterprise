import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Combobox — luma signature: control wears the InputGroup bundle (rounded-4xl,
 * translucent border bg, focus ring when the inner input focuses); content uses
 * the popover-content bundle (rounded-3xl, p-1.5, bg.popover, shadow + 5%-alpha
 * outline); items use the item-row bundle (rounded-2xl, muted hover wash,
 * pr-8 with an absolute indicator pinned to right-2).
 */
export const comboboxRecipe = defineSlotRecipe({
  className: "combobox",
  description: "Luma combobox — searchable picker",
  jsx: ["Combobox"],
  slots: [
    "root",
    "label",
    "control",
    "input",
    "trigger",
    "clearTrigger",
    "positioner",
    "content",
    "item",
    "itemText",
    "itemIndicator",
    "itemGroup",
    "itemGroupLabel",
    "empty",
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

    // Control = InputGroup bundle. Luma: `h-9 rounded-4xl bg-input/50`
    // translucent border lights up to the focus ring when the inner input
    // focuses, or to critical when aria-invalid is set.
    control: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      width: "100%",
      minWidth: "0",
      height: "{sizes.md}", // 36 — luma `h-9`
      border: "1px solid transparent",
      borderRadius: "{radii.4xl}", // 28 — luma `rounded-4xl`
      bg: "color-mix(in oklab, {colors.border} 50%, transparent)", // luma `bg-input/50`
      transition:
        "color {durations.press} {easings.easeOut}, background-color {durations.press} {easings.easeOut}, box-shadow {durations.press} {easings.easeOut}, border-color {durations.press} {easings.easeOut}",

      "&:has(input:focus-visible)": {
        borderColor: "{colors.focus.ring}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.focus.ring} 30%, transparent)",
      },

      "&[data-invalid='true'], &:has(input[aria-invalid='true'])": {
        borderColor: "{colors.critical}",
        boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 20%, transparent)",
        _dark: {
          borderColor: "color-mix(in oklab, {colors.critical} 50%, transparent)",
          boxShadow: "0 0 0 3px color-mix(in oklab, {colors.critical} 40%, transparent)",
        },
      },

      "&[data-disabled='true']": { opacity: "0.5", cursor: "not-allowed" },
    },

    // Input = luma InputGroupInput: flat, transparent, no border, inherits
    // the wrapper's focus treatment.
    input: {
      flex: "1",
      minWidth: "0",
      bg: "transparent",
      border: "none",
      outline: "none",
      paddingInline: "{spacing.md}", // 12 — luma `px-3`
      fontFamily: "{fonts.body}",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.regular}",
      lineHeight: "{lineHeight.normal}",
      color: "{colors.foreground}",
      _placeholder: { color: "{colors.foreground.tertiary}" },
      _disabled: { cursor: "not-allowed" },
    },

    // Trigger = compact ghost icon button in the end-addon slot.
    trigger: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      paddingInline: "{spacing.md}", // 12 — matches InputGroup addon padding
      bg: "transparent",
      border: "none",
      color: "{colors.foreground.tertiary}", // luma `text-muted-foreground`
      cursor: "pointer",
      outline: "none",
      transition: "color {durations.press} {easings.easeOut}",
      _hover: { color: "{colors.foreground}" },
      _disabled: { pointerEvents: "none", opacity: "0.5" },

      "& svg": { pointerEvents: "none", flexShrink: 0 },
      "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
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
      transition: "color {durations.press} {easings.easeOut}",
      _hover: { color: "{colors.foreground}" },
      _disabled: { pointerEvents: "none", opacity: "0.5" },

      "& svg": { pointerEvents: "none", flexShrink: 0 },
      "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
    },

    positioner: {
      position: "absolute",
      zIndex: "{zIndex.dropdown}",
      width: "var(--reference-width)",
    },

    // Content = popover-content bundle. Luma: `max-h-(--available-height)
    // w-(--anchor-width) min-w-[--anchor-width+spacing(7)] rounded-3xl
    // bg-popover shadow-lg ring-1 ring-foreground/5 p-1.5` — width follows
    // the input, min-width adds 28px so long option text breathes, list
    // scrolls inside the rounded envelope.
    content: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      width: "var(--reference-width)",
      minWidth: "calc(var(--reference-width) + {sizes.sm})", // +28 — luma `--anchor-width + spacing(7)`
      maxWidth: "var(--available-width)",
      maxHeight: "var(--available-height)",
      overflow: "auto",
      overflowX: "hidden",
      padding: "calc({spacing.sm} - 2px)", // 6 — luma `p-1.5`
      bg: "{colors.background.popover}",
      color: "{colors.foreground}",
      borderRadius: "{radii.3xl}",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
      outlineOffset: "-1px",
      transformOrigin: "var(--transform-origin)",
      willChange: "transform, opacity",
      _dark: { outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)" },

      _open: { animation: "scaleIn {durations.surface} {easings.easeOut}" },
      _closed: { animation: "scaleOut {durations.normal} {easings.easeOut}" },

      "@media (prefers-reduced-motion: reduce)": {
        _open: { animation: "fadeIn {durations.normal} {easings.easeOut}" },
        _closed: { animation: "fadeOut {durations.fast} {easings.easeOut}" },
      },
    },

    // Item = item-row bundle matching luma menu/dropdown rows.
    item: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "0.625rem", // 10 — luma `gap-2.5`
      width: "100%",
      paddingInlineStart: "{spacing.md}", // 12 — luma `pl-3`
      paddingInlineEnd: "{spacing.2xl}", // 32 — luma `pr-8` (room for indicator)
      paddingBlock: "{spacing.sm}", // 8 — luma `py-2`
      borderRadius: "{radii.2xl}",
      fontSize: "{fontSizes.sm}",
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
      cursor: "default",
      outline: "none",
      userSelect: "none",
      transition: "background-color {durations.press} {easings.easeOut}",

      _highlighted: { bg: "{colors.surface.muted}", color: "{colors.foreground.secondary}" },
      _disabled: { pointerEvents: "none", opacity: "0.5" },

      "& svg": { pointerEvents: "none", flexShrink: 0 },
      "& svg:not([class*='size-'])": { width: "1rem", height: "1rem" },
    },

    itemText: { flex: "1" },

    itemIndicator: {
      position: "absolute",
      insetInlineEnd: "{spacing.sm}", // 8 — luma `right-2`
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      width: "1rem",
      height: "1rem",
      pointerEvents: "none",
      color: "currentColor",
    },

    itemGroup: { display: "flex", flexDirection: "column" },

    itemGroupLabel: {
      paddingInline: "{spacing.md}", // 12 — luma `px-3`
      paddingBlock: "0.625rem", // 10 — luma `py-2.5`
      fontSize: "{fontSizes.xs}",
      color: "{colors.foreground.tertiary}",
    },

    // Empty = luma `hidden w-full justify-center py-2 text-center text-sm
    // text-muted-foreground` — Ark renders this conditionally so we can drop
    // the `hidden` / `group-data-empty:flex` toggle.
    empty: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      paddingBlock: "{spacing.sm}", // 8 — luma `py-2`
      fontSize: "{fontSizes.sm}",
      color: "{colors.foreground.tertiary}",
      textAlign: "center",
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

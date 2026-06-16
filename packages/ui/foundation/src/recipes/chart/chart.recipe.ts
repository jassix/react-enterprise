import { defineSlotRecipe } from "@pandacss/dev";

/**
 * Chart — luma signature: CSS-only styling for a Recharts / visx / D3 canvas.
 * No primitive is shipped (chart libraries are an external dep), but the
 * classes here recreate luma's Recharts tweaks so any consumer wrapper can
 * opt in: muted-foreground axis ticks, `bg-popover` tooltip with `ring-1
 * ring-foreground/5`, dot / line / dashed indicator variants, etc.
 *
 * Intended usage:
 *   <div className={chart().container} data-chart="my-id">
 *     <ResponsiveContainer>{…}</ResponsiveContainer>
 *   </div>
 *   <div className={chart().tooltip}>…custom tooltip content…</div>
 */
export const chartRecipe = defineSlotRecipe({
  className: "chart",
  description: "Luma chart — container + tooltip + legend styling for Recharts wrappers",
  jsx: ["Chart"],
  slots: [
    "container",
    "tooltip",
    "tooltipLabel",
    "tooltipRow",
    "indicator",
    "legend",
    "legendItem",
  ],
  base: {
    container: {
      display: "flex",
      aspectRatio: "16 / 9",
      justifyContent: "center",
      fontSize: "{fontSizes.xs}",

      // Recharts-specific overrides mirroring luma's selectors.
      "& .recharts-cartesian-axis-tick text": { fill: "{colors.foreground.tertiary}" },
      "& .recharts-cartesian-grid line[stroke='#ccc']": {
        stroke: "color-mix(in oklab, {colors.border} 50%, transparent)",
      },
      "& .recharts-curve.recharts-tooltip-cursor": { stroke: "{colors.border}" },
      "& .recharts-polar-grid [stroke='#ccc']": { stroke: "{colors.border}" },
      "& .recharts-radial-bar-background-sector": { fill: "{colors.surface.muted}" },
      "& .recharts-rectangle.recharts-tooltip-cursor": { fill: "{colors.surface.muted}" },
      "& .recharts-reference-line [stroke='#ccc']": { stroke: "{colors.border}" },
      "& .recharts-dot[stroke='#fff']": { stroke: "transparent" },
      "& .recharts-sector[stroke='#fff']": { stroke: "transparent" },
      "& .recharts-sector, & .recharts-surface, & .recharts-layer": { outline: "none" },
    },

    tooltip: {
      display: "grid",
      minWidth: "8rem", // 128 — luma `min-w-32`
      alignItems: "start",
      gap: "0.375rem", // 6 — luma `gap-1.5`
      paddingInline: "0.625rem", // 10 — luma `px-2.5`
      paddingBlock: "0.375rem", // 6 — luma `py-1.5`
      borderRadius: "{radii.xl}", // 16 — luma `rounded-xl`
      bg: "{colors.background.popover}",
      color: "{colors.foreground}",
      fontSize: "{fontSizes.xs}",
      boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      outline: "1px solid color-mix(in oklab, {colors.foreground} 5%, transparent)",
      outlineOffset: "-1px",
      _dark: { outline: "1px solid color-mix(in oklab, {colors.foreground} 10%, transparent)" },
    },

    tooltipLabel: {
      fontWeight: "{fontWeights.medium}",
      color: "{colors.foreground}",
    },

    tooltipRow: {
      display: "flex",
      width: "100%",
      flexWrap: "wrap",
      alignItems: "stretch",
      gap: "{spacing.sm}",

      "&[data-indicator='dot']": { alignItems: "center" },

      "& > svg": {
        width: "0.625rem", // 10 — luma `[&>svg]:w-2.5`
        height: "0.625rem",
        color: "{colors.foreground.tertiary}",
      },
    },

    indicator: {
      flexShrink: 0,

      "&[data-indicator='dot']": {
        width: "0.625rem",
        height: "0.625rem",
        borderRadius: "0.125rem", // 2 — luma `rounded-[2px]`
      },
      "&[data-indicator='line']": {
        width: "0.25rem",
        height: "auto",
        borderRadius: "0.125rem",
      },
      "&[data-indicator='dashed']": {
        width: "0",
        border: "1.5px dashed",
        bg: "transparent",
        borderRadius: "0.125rem",
      },
    },

    legend: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "{spacing.lg}",
      paddingTop: "{spacing.md}",
    },

    legendItem: {
      display: "flex",
      alignItems: "center",
      gap: "{spacing.sm}",
      fontSize: "{fontSizes.xs}",
      color: "{colors.foreground.tertiary}",

      "& > svg": {
        width: "0.75rem",
        height: "0.75rem",
      },
    },
  },
});

/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ChartVariant {
  
}

type ChartVariantMap = {
  [key in keyof ChartVariant]: Array<ChartVariant[key]>
}

type ChartSlot = "container" | "tooltip" | "tooltipLabel" | "tooltipRow" | "indicator" | "legend" | "legendItem" | "container" | "tooltip" | "tooltipLabel" | "tooltipRow" | "indicator" | "legend" | "legendItem"

export type ChartVariantProps = {
  [key in keyof ChartVariant]?: ConditionalValue<ChartVariant[key]> | undefined
}

export interface ChartRecipe {
  __slot: ChartSlot
  __type: ChartVariantProps
  (props?: ChartVariantProps): Pretty<Record<ChartSlot, string>>
  raw: (props?: ChartVariantProps) => ChartVariantProps
  variantMap: ChartVariantMap
  variantKeys: Array<keyof ChartVariant>
  splitVariantProps<Props extends ChartVariantProps>(props: Props): [ChartVariantProps, Pretty<DistributiveOmit<Props, keyof ChartVariantProps>>]
  getVariantProps: (props?: ChartVariantProps) => ChartVariantProps
}

/**
 * Luma chart — container + tooltip + legend styling for Recharts wrappers
 */
export declare const chart: ChartRecipe
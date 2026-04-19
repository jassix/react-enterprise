/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SliderVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
/**
 * @default "primary"
 */
intent: "primary" | "critical" | "positive" | "caution" | "info"
}

type SliderVariantMap = {
  [key in keyof SliderVariant]: Array<SliderVariant[key]>
}

type SliderSlot = "root" | "label" | "control" | "track" | "range" | "thumb" | "valueText" | "markerGroup" | "marker" | "root" | "label" | "control" | "track" | "range" | "thumb" | "valueText" | "markerGroup" | "marker"

export type SliderVariantProps = {
  [key in keyof SliderVariant]?: SliderVariant[key] | undefined
}

export interface SliderRecipe {
  __slot: SliderSlot
  __type: SliderVariantProps
  (props?: SliderVariantProps): Pretty<Record<SliderSlot, string>>
  raw: (props?: SliderVariantProps) => SliderVariantProps
  variantMap: SliderVariantMap
  variantKeys: Array<keyof SliderVariant>
  splitVariantProps<Props extends SliderVariantProps>(props: Props): [SliderVariantProps, Pretty<DistributiveOmit<Props, keyof SliderVariantProps>>]
  getVariantProps: (props?: SliderVariantProps) => SliderVariantProps
}

/**
 * Luma slider — pill track + circular thumb with intent
 */
export declare const slider: SliderRecipe
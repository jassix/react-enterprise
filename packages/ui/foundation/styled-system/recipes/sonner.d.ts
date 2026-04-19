/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SonnerVariant {
  /**
 * @default "neutral"
 */
status: "neutral" | "info" | "positive" | "caution" | "critical" | "loading"
/**
 * @default "bottom-right"
 */
placement: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"
}

type SonnerVariantMap = {
  [key in keyof SonnerVariant]: Array<SonnerVariant[key]>
}

type SonnerSlot = "viewport" | "toast" | "icon" | "title" | "description" | "actionButton" | "cancelButton" | "closeButton" | "viewport" | "toast" | "icon" | "title" | "description" | "actionButton" | "cancelButton" | "closeButton"

export type SonnerVariantProps = {
  [key in keyof SonnerVariant]?: ConditionalValue<SonnerVariant[key]> | undefined
}

export interface SonnerRecipe {
  __slot: SonnerSlot
  __type: SonnerVariantProps
  (props?: SonnerVariantProps): Pretty<Record<SonnerSlot, string>>
  raw: (props?: SonnerVariantProps) => SonnerVariantProps
  variantMap: SonnerVariantMap
  variantKeys: Array<keyof SonnerVariant>
  splitVariantProps<Props extends SonnerVariantProps>(props: Props): [SonnerVariantProps, Pretty<DistributiveOmit<Props, keyof SonnerVariantProps>>]
  getVariantProps: (props?: SonnerVariantProps) => SonnerVariantProps
}

/**
 * Sonner recipe for stacked toast viewport with status variants
 */
export declare const sonner: SonnerRecipe
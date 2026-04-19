/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface RadioGroupVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
/**
 * @default "primary"
 */
intent: "primary" | "critical" | "positive" | "caution" | "info"
}

type RadioGroupVariantMap = {
  [key in keyof RadioGroupVariant]: Array<RadioGroupVariant[key]>
}

type RadioGroupSlot = "root" | "label" | "item" | "itemText" | "itemControl" | "indicator" | "root" | "label" | "item" | "itemText" | "itemControl" | "indicator"

export type RadioGroupVariantProps = {
  [key in keyof RadioGroupVariant]?: RadioGroupVariant[key] | undefined
}

export interface RadioGroupRecipe {
  __slot: RadioGroupSlot
  __type: RadioGroupVariantProps
  (props?: RadioGroupVariantProps): Pretty<Record<RadioGroupSlot, string>>
  raw: (props?: RadioGroupVariantProps) => RadioGroupVariantProps
  variantMap: RadioGroupVariantMap
  variantKeys: Array<keyof RadioGroupVariant>
  splitVariantProps<Props extends RadioGroupVariantProps>(props: Props): [RadioGroupVariantProps, Pretty<DistributiveOmit<Props, keyof RadioGroupVariantProps>>]
  getVariantProps: (props?: RadioGroupVariantProps) => RadioGroupVariantProps
}

/**
 * Luma radio group — circular controls with intent-driven checked state
 */
export declare const radioGroup: RadioGroupRecipe
/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SpinnerVariant {
  /**
 * @default "circular"
 */
variant: "circular" | "dots" | "bars"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
/**
 * @default "primary"
 */
intent: "neutral" | "primary" | "critical" | "positive" | "caution" | "info"
}

type SpinnerVariantMap = {
  [key in keyof SpinnerVariant]: Array<SpinnerVariant[key]>
}



export type SpinnerVariantProps = {
  [key in keyof SpinnerVariant]?: SpinnerVariant[key] | undefined
}

export interface SpinnerRecipe {
  
  __type: SpinnerVariantProps
  (props?: SpinnerVariantProps): string
  raw: (props?: SpinnerVariantProps) => SpinnerVariantProps
  variantMap: SpinnerVariantMap
  variantKeys: Array<keyof SpinnerVariant>
  splitVariantProps<Props extends SpinnerVariantProps>(props: Props): [SpinnerVariantProps, Pretty<DistributiveOmit<Props, keyof SpinnerVariantProps>>]
  getVariantProps: (props?: SpinnerVariantProps) => SpinnerVariantProps
}

/**
 * Luma spinner — circular indeterminate loader
 */
export declare const spinner: SpinnerRecipe
/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ToggleSwitchVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
/**
 * @default "primary"
 */
intent: "primary" | "critical" | "positive" | "caution" | "info"
}

type ToggleSwitchVariantMap = {
  [key in keyof ToggleSwitchVariant]: Array<ToggleSwitchVariant[key]>
}



export type ToggleSwitchVariantProps = {
  [key in keyof ToggleSwitchVariant]?: ToggleSwitchVariant[key] | undefined
}

export interface ToggleSwitchRecipe {
  
  __type: ToggleSwitchVariantProps
  (props?: ToggleSwitchVariantProps): string
  raw: (props?: ToggleSwitchVariantProps) => ToggleSwitchVariantProps
  variantMap: ToggleSwitchVariantMap
  variantKeys: Array<keyof ToggleSwitchVariant>
  splitVariantProps<Props extends ToggleSwitchVariantProps>(props: Props): [ToggleSwitchVariantProps, Pretty<DistributiveOmit<Props, keyof ToggleSwitchVariantProps>>]
  getVariantProps: (props?: ToggleSwitchVariantProps) => ToggleSwitchVariantProps
}

/**
 * Luma switch — pill track with intent-driven checked state
 */
export declare const toggleSwitch: ToggleSwitchRecipe
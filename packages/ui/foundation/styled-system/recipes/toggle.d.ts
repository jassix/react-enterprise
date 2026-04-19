/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ToggleVariant {
  /**
 * @default "default"
 */
variant: "default" | "outline"
/**
 * @default "primary"
 */
intent: "primary" | "critical" | "positive" | "caution" | "info"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg"
icon: boolean
}

type ToggleVariantMap = {
  [key in keyof ToggleVariant]: Array<ToggleVariant[key]>
}

type ToggleSlot = "root" | "indicator" | "root" | "indicator"

export type ToggleVariantProps = {
  [key in keyof ToggleVariant]?: ConditionalValue<ToggleVariant[key]> | undefined
}

export interface ToggleRecipe {
  __slot: ToggleSlot
  __type: ToggleVariantProps
  (props?: ToggleVariantProps): Pretty<Record<ToggleSlot, string>>
  raw: (props?: ToggleVariantProps) => ToggleVariantProps
  variantMap: ToggleVariantMap
  variantKeys: Array<keyof ToggleVariant>
  splitVariantProps<Props extends ToggleVariantProps>(props: Props): [ToggleVariantProps, Pretty<DistributiveOmit<Props, keyof ToggleVariantProps>>]
  getVariantProps: (props?: ToggleVariantProps) => ToggleVariantProps
}

/**
 * Luma toggle — pressable ghost-button with fluid indicator
 */
export declare const toggle: ToggleRecipe
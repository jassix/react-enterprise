/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface PopoverVariant {
  /**
 * @default "default"
 */
variant: "default" | "accent"
}

type PopoverVariantMap = {
  [key in keyof PopoverVariant]: Array<PopoverVariant[key]>
}

type PopoverSlot = "trigger" | "positioner" | "content" | "title" | "description" | "closeTrigger" | "arrow" | "trigger" | "positioner" | "content" | "title" | "description" | "closeTrigger" | "arrow"

export type PopoverVariantProps = {
  [key in keyof PopoverVariant]?: ConditionalValue<PopoverVariant[key]> | undefined
}

export interface PopoverRecipe {
  __slot: PopoverSlot
  __type: PopoverVariantProps
  (props?: PopoverVariantProps): Pretty<Record<PopoverSlot, string>>
  raw: (props?: PopoverVariantProps) => PopoverVariantProps
  variantMap: PopoverVariantMap
  variantKeys: Array<keyof PopoverVariant>
  splitVariantProps<Props extends PopoverVariantProps>(props: Props): [PopoverVariantProps, Pretty<DistributiveOmit<Props, keyof PopoverVariantProps>>]
  getVariantProps: (props?: PopoverVariantProps) => PopoverVariantProps
}

/**
 * Popover recipe for floating content
 */
export declare const popover: PopoverRecipe
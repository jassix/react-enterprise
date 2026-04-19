/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ResizableVariant {
  /**
 * @default "horizontal"
 */
orientation: "horizontal" | "vertical"
/**
 * @default "bar"
 */
variant: "bar" | "handle"
}

type ResizableVariantMap = {
  [key in keyof ResizableVariant]: Array<ResizableVariant[key]>
}

type ResizableSlot = "root" | "panel" | "resizeTrigger" | "root" | "panel" | "resizeTrigger"

export type ResizableVariantProps = {
  [key in keyof ResizableVariant]?: ResizableVariant[key] | undefined
}

export interface ResizableRecipe {
  __slot: ResizableSlot
  __type: ResizableVariantProps
  (props?: ResizableVariantProps): Pretty<Record<ResizableSlot, string>>
  raw: (props?: ResizableVariantProps) => ResizableVariantProps
  variantMap: ResizableVariantMap
  variantKeys: Array<keyof ResizableVariant>
  splitVariantProps<Props extends ResizableVariantProps>(props: Props): [ResizableVariantProps, Pretty<DistributiveOmit<Props, keyof ResizableVariantProps>>]
  getVariantProps: (props?: ResizableVariantProps) => ResizableVariantProps
}

/**
 * Luma resizable — hairline divider with optional grip pill
 */
export declare const resizable: ResizableRecipe
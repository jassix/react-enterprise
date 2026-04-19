/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SheetVariant {
  /**
 * @default "right"
 */
side: "left" | "right" | "top" | "bottom"
/**
 * @default "md"
 */
size: "sm" | "md" | "lg" | "xl" | "full"
}

type SheetVariantMap = {
  [key in keyof SheetVariant]: Array<SheetVariant[key]>
}

type SheetSlot = "backdrop" | "positioner" | "content" | "header" | "title" | "description" | "body" | "footer" | "closeTrigger" | "backdrop" | "positioner" | "content" | "header" | "title" | "description" | "body" | "footer" | "closeTrigger"

export type SheetVariantProps = {
  [key in keyof SheetVariant]?: SheetVariant[key] | undefined
}

export interface SheetRecipe {
  __slot: SheetSlot
  __type: SheetVariantProps
  (props?: SheetVariantProps): Pretty<Record<SheetSlot, string>>
  raw: (props?: SheetVariantProps) => SheetVariantProps
  variantMap: SheetVariantMap
  variantKeys: Array<keyof SheetVariant>
  splitVariantProps<Props extends SheetVariantProps>(props: Props): [SheetVariantProps, Pretty<DistributiveOmit<Props, keyof SheetVariantProps>>]
  getVariantProps: (props?: SheetVariantProps) => SheetVariantProps
}

/**
 * Luma sheet — edge-anchored slide-in panel
 */
export declare const sheet: SheetRecipe
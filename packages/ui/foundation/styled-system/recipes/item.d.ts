/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ItemVariant {
  /**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg"
/**
 * @default "default"
 */
variant: "default" | "muted" | "outline"
interactive: boolean
}

type ItemVariantMap = {
  [key in keyof ItemVariant]: Array<ItemVariant[key]>
}

type ItemSlot = "root" | "group" | "header" | "footer" | "media" | "content" | "title" | "description" | "actions" | "separator" | "root" | "group" | "header" | "footer" | "media" | "content" | "title" | "description" | "actions" | "separator"

export type ItemVariantProps = {
  [key in keyof ItemVariant]?: ConditionalValue<ItemVariant[key]> | undefined
}

export interface ItemRecipe {
  __slot: ItemSlot
  __type: ItemVariantProps
  (props?: ItemVariantProps): Pretty<Record<ItemSlot, string>>
  raw: (props?: ItemVariantProps) => ItemVariantProps
  variantMap: ItemVariantMap
  variantKeys: Array<keyof ItemVariant>
  splitVariantProps<Props extends ItemVariantProps>(props: Props): [ItemVariantProps, Pretty<DistributiveOmit<Props, keyof ItemVariantProps>>]
  getVariantProps: (props?: ItemVariantProps) => ItemVariantProps
}

/**
 * Luma item — row with media / content (title + description) / actions
 */
export declare const item: ItemRecipe
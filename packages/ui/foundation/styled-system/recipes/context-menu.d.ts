/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ContextMenuVariant {
  
}

type ContextMenuVariantMap = {
  [key in keyof ContextMenuVariant]: Array<ContextMenuVariant[key]>
}

type ContextMenuSlot = "trigger" | "positioner" | "content" | "item" | "itemText" | "itemIndicator" | "optionItem" | "separator" | "itemGroup" | "itemGroupLabel" | "shortcut" | "trigger" | "positioner" | "content" | "item" | "itemText" | "itemIndicator" | "optionItem" | "separator" | "itemGroup" | "itemGroupLabel" | "shortcut"

export type ContextMenuVariantProps = {
  [key in keyof ContextMenuVariant]?: ConditionalValue<ContextMenuVariant[key]> | undefined
}

export interface ContextMenuRecipe {
  __slot: ContextMenuSlot
  __type: ContextMenuVariantProps
  (props?: ContextMenuVariantProps): Pretty<Record<ContextMenuSlot, string>>
  raw: (props?: ContextMenuVariantProps) => ContextMenuVariantProps
  variantMap: ContextMenuVariantMap
  variantKeys: Array<keyof ContextMenuVariant>
  splitVariantProps<Props extends ContextMenuVariantProps>(props: Props): [ContextMenuVariantProps, Pretty<DistributiveOmit<Props, keyof ContextMenuVariantProps>>]
  getVariantProps: (props?: ContextMenuVariantProps) => ContextMenuVariantProps
}

/**
 * Luma context menu — right-click actions with item rows
 */
export declare const contextMenu: ContextMenuRecipe
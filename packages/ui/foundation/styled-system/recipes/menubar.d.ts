/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface MenubarVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type MenubarVariantMap = {
  [key in keyof MenubarVariant]: Array<MenubarVariant[key]>
}

type MenubarSlot = "root" | "trigger" | "positioner" | "content" | "item" | "itemText" | "itemIndicator" | "separator" | "itemGroup" | "itemGroupLabel" | "shortcut" | "root" | "trigger" | "positioner" | "content" | "item" | "itemText" | "itemIndicator" | "separator" | "itemGroup" | "itemGroupLabel" | "shortcut"

export type MenubarVariantProps = {
  [key in keyof MenubarVariant]?: ConditionalValue<MenubarVariant[key]> | undefined
}

export interface MenubarRecipe {
  __slot: MenubarSlot
  __type: MenubarVariantProps
  (props?: MenubarVariantProps): Pretty<Record<MenubarSlot, string>>
  raw: (props?: MenubarVariantProps) => MenubarVariantProps
  variantMap: MenubarVariantMap
  variantKeys: Array<keyof MenubarVariant>
  splitVariantProps<Props extends MenubarVariantProps>(props: Props): [MenubarVariantProps, Pretty<DistributiveOmit<Props, keyof MenubarVariantProps>>]
  getVariantProps: (props?: MenubarVariantProps) => MenubarVariantProps
}

/**
 * Luma menubar — top bar of triggers + popover surfaces
 */
export declare const menubar: MenubarRecipe
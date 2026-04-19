/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface NavigationMenuVariant {
  /**
 * @default "horizontal"
 */
orientation: "horizontal" | "vertical"
}

type NavigationMenuVariantMap = {
  [key in keyof NavigationMenuVariant]: Array<NavigationMenuVariant[key]>
}

type NavigationMenuSlot = "root" | "list" | "item" | "trigger" | "link" | "content" | "indicator" | "viewport" | "root" | "list" | "item" | "trigger" | "link" | "content" | "indicator" | "viewport"

export type NavigationMenuVariantProps = {
  [key in keyof NavigationMenuVariant]?: ConditionalValue<NavigationMenuVariant[key]> | undefined
}

export interface NavigationMenuRecipe {
  __slot: NavigationMenuSlot
  __type: NavigationMenuVariantProps
  (props?: NavigationMenuVariantProps): Pretty<Record<NavigationMenuSlot, string>>
  raw: (props?: NavigationMenuVariantProps) => NavigationMenuVariantProps
  variantMap: NavigationMenuVariantMap
  variantKeys: Array<keyof NavigationMenuVariant>
  splitVariantProps<Props extends NavigationMenuVariantProps>(props: Props): [NavigationMenuVariantProps, Pretty<DistributiveOmit<Props, keyof NavigationMenuVariantProps>>]
  getVariantProps: (props?: NavigationMenuVariantProps) => NavigationMenuVariantProps
}

/**
 * Luma navigation menu — row of triggers with flyout content
 */
export declare const navigationMenu: NavigationMenuRecipe
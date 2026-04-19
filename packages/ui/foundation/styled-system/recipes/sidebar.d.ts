/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface SidebarVariant {
  
}

type SidebarVariantMap = {
  [key in keyof SidebarVariant]: Array<SidebarVariant[key]>
}

type SidebarSlot = "provider" | "wrapper" | "root" | "gap" | "container" | "inner" | "trigger" | "rail" | "inset" | "input" | "header" | "footer" | "separator" | "content" | "group" | "groupLabel" | "groupAction" | "groupContent" | "menu" | "menuItem" | "menuButton" | "menuAction" | "menuBadge" | "menuSkeleton" | "menuSub" | "menuSubItem" | "menuSubButton" | "provider" | "wrapper" | "root" | "gap" | "container" | "inner" | "trigger" | "rail" | "inset" | "input" | "header" | "footer" | "separator" | "content" | "group" | "groupLabel" | "groupAction" | "groupContent" | "menu" | "menuItem" | "menuButton" | "menuAction" | "menuBadge" | "menuSkeleton" | "menuSub" | "menuSubItem" | "menuSubButton"

export type SidebarVariantProps = {
  [key in keyof SidebarVariant]?: ConditionalValue<SidebarVariant[key]> | undefined
}

export interface SidebarRecipe {
  __slot: SidebarSlot
  __type: SidebarVariantProps
  (props?: SidebarVariantProps): Pretty<Record<SidebarSlot, string>>
  raw: (props?: SidebarVariantProps) => SidebarVariantProps
  variantMap: SidebarVariantMap
  variantKeys: Array<keyof SidebarVariant>
  splitVariantProps<Props extends SidebarVariantProps>(props: Props): [SidebarVariantProps, Pretty<DistributiveOmit<Props, keyof SidebarVariantProps>>]
  getVariantProps: (props?: SidebarVariantProps) => SidebarVariantProps
}

/**
 * Luma sidebar — collapsible side navigation with menu / groups / footer
 */
export declare const sidebar: SidebarRecipe
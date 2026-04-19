/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DrawerVariant {
  /**
 * @default "bottom"
 */
side: "bottom" | "top" | "left" | "right"
/**
 * @default "md"
 */
size: "sm" | "md" | "lg" | "full"
}

type DrawerVariantMap = {
  [key in keyof DrawerVariant]: Array<DrawerVariant[key]>
}

type DrawerSlot = "backdrop" | "positioner" | "content" | "handle" | "header" | "title" | "description" | "body" | "footer" | "closeTrigger" | "backdrop" | "positioner" | "content" | "handle" | "header" | "title" | "description" | "body" | "footer" | "closeTrigger"

export type DrawerVariantProps = {
  [key in keyof DrawerVariant]?: DrawerVariant[key] | undefined
}

export interface DrawerRecipe {
  __slot: DrawerSlot
  __type: DrawerVariantProps
  (props?: DrawerVariantProps): Pretty<Record<DrawerSlot, string>>
  raw: (props?: DrawerVariantProps) => DrawerVariantProps
  variantMap: DrawerVariantMap
  variantKeys: Array<keyof DrawerVariant>
  splitVariantProps<Props extends DrawerVariantProps>(props: Props): [DrawerVariantProps, Pretty<DistributiveOmit<Props, keyof DrawerVariantProps>>]
  getVariantProps: (props?: DrawerVariantProps) => DrawerVariantProps
}

/**
 * Luma drawer — bottom-sheet-style draggable panel
 */
export declare const drawer: DrawerRecipe
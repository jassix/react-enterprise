/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface EmptyVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
/**
 * @default "default"
 */
variant: "default" | "icon" | "muted" | "dashed"
}

type EmptyVariantMap = {
  [key in keyof EmptyVariant]: Array<EmptyVariant[key]>
}

type EmptySlot = "root" | "header" | "icon" | "title" | "description" | "content" | "actions" | "root" | "header" | "icon" | "title" | "description" | "content" | "actions"

export type EmptyVariantProps = {
  [key in keyof EmptyVariant]?: ConditionalValue<EmptyVariant[key]> | undefined
}

export interface EmptyRecipe {
  __slot: EmptySlot
  __type: EmptyVariantProps
  (props?: EmptyVariantProps): Pretty<Record<EmptySlot, string>>
  raw: (props?: EmptyVariantProps) => EmptyVariantProps
  variantMap: EmptyVariantMap
  variantKeys: Array<keyof EmptyVariant>
  splitVariantProps<Props extends EmptyVariantProps>(props: Props): [EmptyVariantProps, Pretty<DistributiveOmit<Props, keyof EmptyVariantProps>>]
  getVariantProps: (props?: EmptyVariantProps) => EmptyVariantProps
}

/**
 * Luma empty — zero-state placeholder with header / content slots
 */
export declare const empty: EmptyRecipe
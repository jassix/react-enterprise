/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface PaginationVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type PaginationVariantMap = {
  [key in keyof PaginationVariant]: Array<PaginationVariant[key]>
}

type PaginationSlot = "root" | "list" | "item" | "prevTrigger" | "nextTrigger" | "ellipsis" | "root" | "list" | "item" | "prevTrigger" | "nextTrigger" | "ellipsis"

export type PaginationVariantProps = {
  [key in keyof PaginationVariant]?: ConditionalValue<PaginationVariant[key]> | undefined
}

export interface PaginationRecipe {
  __slot: PaginationSlot
  __type: PaginationVariantProps
  (props?: PaginationVariantProps): Pretty<Record<PaginationSlot, string>>
  raw: (props?: PaginationVariantProps) => PaginationVariantProps
  variantMap: PaginationVariantMap
  variantKeys: Array<keyof PaginationVariant>
  splitVariantProps<Props extends PaginationVariantProps>(props: Props): [PaginationVariantProps, Pretty<DistributiveOmit<Props, keyof PaginationVariantProps>>]
  getVariantProps: (props?: PaginationVariantProps) => PaginationVariantProps
}

/**
 * Luma pagination — nav bar of button-styled items
 */
export declare const pagination: PaginationRecipe
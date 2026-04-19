/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface TableVariant {
  /**
 * @default "comfortable"
 */
density: "compact" | "comfortable" | "spacious"
striped: boolean
bordered: boolean
}

type TableVariantMap = {
  [key in keyof TableVariant]: Array<TableVariant[key]>
}

type TableSlot = "root" | "table" | "caption" | "head" | "body" | "footer" | "row" | "header" | "cell" | "root" | "table" | "caption" | "head" | "body" | "footer" | "row" | "header" | "cell"

export type TableVariantProps = {
  [key in keyof TableVariant]?: ConditionalValue<TableVariant[key]> | undefined
}

export interface TableRecipe {
  __slot: TableSlot
  __type: TableVariantProps
  (props?: TableVariantProps): Pretty<Record<TableSlot, string>>
  raw: (props?: TableVariantProps) => TableVariantProps
  variantMap: TableVariantMap
  variantKeys: Array<keyof TableVariant>
  splitVariantProps<Props extends TableVariantProps>(props: Props): [TableVariantProps, Pretty<DistributiveOmit<Props, keyof TableVariantProps>>]
  getVariantProps: (props?: TableVariantProps) => TableVariantProps
}

/**
 * Luma table — overflow wrapper, muted footer, hover/selected rows
 */
export declare const table: TableRecipe
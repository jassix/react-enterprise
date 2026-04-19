/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DataTableVariant {
  /**
 * @default "comfortable"
 */
density: "compact" | "comfortable" | "spacious"
striped: boolean
}

type DataTableVariantMap = {
  [key in keyof DataTableVariant]: Array<DataTableVariant[key]>
}

type DataTableSlot = "root" | "toolbar" | "toolbarStart" | "toolbarEnd" | "tableWrapper" | "table" | "head" | "headerRow" | "header" | "headerSort" | "body" | "row" | "cell" | "footer" | "pagination" | "empty" | "root" | "toolbar" | "toolbarStart" | "toolbarEnd" | "tableWrapper" | "table" | "head" | "headerRow" | "header" | "headerSort" | "body" | "row" | "cell" | "footer" | "pagination" | "empty"

export type DataTableVariantProps = {
  [key in keyof DataTableVariant]?: ConditionalValue<DataTableVariant[key]> | undefined
}

export interface DataTableRecipe {
  __slot: DataTableSlot
  __type: DataTableVariantProps
  (props?: DataTableVariantProps): Pretty<Record<DataTableSlot, string>>
  raw: (props?: DataTableVariantProps) => DataTableVariantProps
  variantMap: DataTableVariantMap
  variantKeys: Array<keyof DataTableVariant>
  splitVariantProps<Props extends DataTableVariantProps>(props: Props): [DataTableVariantProps, Pretty<DistributiveOmit<Props, keyof DataTableVariantProps>>]
  getVariantProps: (props?: DataTableVariantProps) => DataTableVariantProps
}

/**
 * Data table recipe for opinionated tables with toolbar, filters, and pagination
 */
export declare const dataTable: DataTableRecipe
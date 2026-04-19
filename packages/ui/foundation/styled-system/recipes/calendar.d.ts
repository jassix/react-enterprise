/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface CalendarVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
/**
 * @default "default"
 */
variant: "default" | "bordered"
}

type CalendarVariantMap = {
  [key in keyof CalendarVariant]: Array<CalendarVariant[key]>
}

type CalendarSlot = "root" | "header" | "heading" | "prevTrigger" | "nextTrigger" | "viewTrigger" | "grid" | "rowHeader" | "row" | "cell" | "cellTrigger" | "root" | "header" | "heading" | "prevTrigger" | "nextTrigger" | "viewTrigger" | "grid" | "rowHeader" | "row" | "cell" | "cellTrigger"

export type CalendarVariantProps = {
  [key in keyof CalendarVariant]?: ConditionalValue<CalendarVariant[key]> | undefined
}

export interface CalendarRecipe {
  __slot: CalendarSlot
  __type: CalendarVariantProps
  (props?: CalendarVariantProps): Pretty<Record<CalendarSlot, string>>
  raw: (props?: CalendarVariantProps) => CalendarVariantProps
  variantMap: CalendarVariantMap
  variantKeys: Array<keyof CalendarVariant>
  splitVariantProps<Props extends CalendarVariantProps>(props: Props): [CalendarVariantProps, Pretty<DistributiveOmit<Props, keyof CalendarVariantProps>>]
  getVariantProps: (props?: CalendarVariantProps) => CalendarVariantProps
}

/**
 * Luma calendar — month grid for date pickers
 */
export declare const calendar: CalendarRecipe
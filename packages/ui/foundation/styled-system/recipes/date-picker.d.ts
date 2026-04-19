/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface DatePickerVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type DatePickerVariantMap = {
  [key in keyof DatePickerVariant]: Array<DatePickerVariant[key]>
}

type DatePickerSlot = "root" | "label" | "control" | "input" | "trigger" | "clearTrigger" | "positioner" | "content" | "presetTrigger" | "view" | "viewControl" | "viewTrigger" | "prevTrigger" | "nextTrigger" | "rangeText" | "table" | "tableHead" | "tableHeader" | "tableBody" | "tableRow" | "tableCell" | "tableCellTrigger" | "root" | "label" | "control" | "input" | "trigger" | "clearTrigger" | "positioner" | "content" | "presetTrigger" | "view" | "viewControl" | "viewTrigger" | "prevTrigger" | "nextTrigger" | "rangeText" | "table" | "tableHead" | "tableHeader" | "tableBody" | "tableRow" | "tableCell" | "tableCellTrigger"

export type DatePickerVariantProps = {
  [key in keyof DatePickerVariant]?: ConditionalValue<DatePickerVariant[key]> | undefined
}

export interface DatePickerRecipe {
  __slot: DatePickerSlot
  __type: DatePickerVariantProps
  (props?: DatePickerVariantProps): Pretty<Record<DatePickerSlot, string>>
  raw: (props?: DatePickerVariantProps) => DatePickerVariantProps
  variantMap: DatePickerVariantMap
  variantKeys: Array<keyof DatePickerVariant>
  splitVariantProps<Props extends DatePickerVariantProps>(props: Props): [DatePickerVariantProps, Pretty<DistributiveOmit<Props, keyof DatePickerVariantProps>>]
  getVariantProps: (props?: DatePickerVariantProps) => DatePickerVariantProps
}

/**
 * Luma date picker — input + calendar popover
 */
export declare const datePicker: DatePickerRecipe
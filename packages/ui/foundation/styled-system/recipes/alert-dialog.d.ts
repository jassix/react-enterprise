/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface AlertDialogVariant {
  /**
 * @default "critical"
 */
intent: "critical" | "caution" | "primary"
/**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type AlertDialogVariantMap = {
  [key in keyof AlertDialogVariant]: Array<AlertDialogVariant[key]>
}

type AlertDialogSlot = "backdrop" | "positioner" | "content" | "header" | "media" | "title" | "description" | "body" | "footer" | "cancelTrigger" | "confirmTrigger" | "backdrop" | "positioner" | "content" | "header" | "media" | "title" | "description" | "body" | "footer" | "cancelTrigger" | "confirmTrigger"

export type AlertDialogVariantProps = {
  [key in keyof AlertDialogVariant]?: ConditionalValue<AlertDialogVariant[key]> | undefined
}

export interface AlertDialogRecipe {
  __slot: AlertDialogSlot
  __type: AlertDialogVariantProps
  (props?: AlertDialogVariantProps): Pretty<Record<AlertDialogSlot, string>>
  raw: (props?: AlertDialogVariantProps) => AlertDialogVariantProps
  variantMap: AlertDialogVariantMap
  variantKeys: Array<keyof AlertDialogVariant>
  splitVariantProps<Props extends AlertDialogVariantProps>(props: Props): [AlertDialogVariantProps, Pretty<DistributiveOmit<Props, keyof AlertDialogVariantProps>>]
  getVariantProps: (props?: AlertDialogVariantProps) => AlertDialogVariantProps
}

/**
 * Luma alert dialog — modal with cancel/confirm actions
 */
export declare const alertDialog: AlertDialogRecipe
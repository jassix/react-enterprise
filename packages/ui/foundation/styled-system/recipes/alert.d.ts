/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface AlertVariant {
  /**
 * @default "default"
 */
variant: "default" | "destructive" | "subtle" | "solid" | "outline"
status: "info" | "positive" | "caution" | "critical"
}

type AlertVariantMap = {
  [key in keyof AlertVariant]: Array<AlertVariant[key]>
}

type AlertSlot = "root" | "title" | "description" | "action" | "root" | "title" | "description" | "action"

export type AlertVariantProps = {
  [key in keyof AlertVariant]?: AlertVariant[key] | undefined
}

export interface AlertRecipe {
  __slot: AlertSlot
  __type: AlertVariantProps
  (props?: AlertVariantProps): Pretty<Record<AlertSlot, string>>
  raw: (props?: AlertVariantProps) => AlertVariantProps
  variantMap: AlertVariantMap
  variantKeys: Array<keyof AlertVariant>
  splitVariantProps<Props extends AlertVariantProps>(props: Props): [AlertVariantProps, Pretty<DistributiveOmit<Props, keyof AlertVariantProps>>]
  getVariantProps: (props?: AlertVariantProps) => AlertVariantProps
}

/**
 * Luma alert — rounded-2xl surface with icon / title / description / action slots
 */
export declare const alert: AlertRecipe
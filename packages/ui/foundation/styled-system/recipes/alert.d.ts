/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface AlertVariant {
  /**
 * @default "info"
 */
status: "info" | "positive" | "caution" | "critical"
/**
 * @default "subtle"
 */
variant: "subtle" | "solid" | "outline"
}

type AlertVariantMap = {
  [key in keyof AlertVariant]: Array<AlertVariant[key]>
}



export type AlertVariantProps = {
  [key in keyof AlertVariant]?: AlertVariant[key] | undefined
}

export interface AlertRecipe {
  
  __type: AlertVariantProps
  (props?: AlertVariantProps): string
  raw: (props?: AlertVariantProps) => AlertVariantProps
  variantMap: AlertVariantMap
  variantKeys: Array<keyof AlertVariant>
  splitVariantProps<Props extends AlertVariantProps>(props: Props): [AlertVariantProps, Pretty<DistributiveOmit<Props, keyof AlertVariantProps>>]
  getVariantProps: (props?: AlertVariantProps) => AlertVariantProps
}

/**
 * Alert recipe for notifications and messages
 */
export declare const alert: AlertRecipe
/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface BadgeVariant {
  /**
 * @default "default"
 */
variant: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
intent: "primary" | "critical" | "positive" | "caution" | "info"
/**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type BadgeVariantMap = {
  [key in keyof BadgeVariant]: Array<BadgeVariant[key]>
}



export type BadgeVariantProps = {
  [key in keyof BadgeVariant]?: BadgeVariant[key] | undefined
}

export interface BadgeRecipe {
  
  __type: BadgeVariantProps
  (props?: BadgeVariantProps): string
  raw: (props?: BadgeVariantProps) => BadgeVariantProps
  variantMap: BadgeVariantMap
  variantKeys: Array<keyof BadgeVariant>
  splitVariantProps<Props extends BadgeVariantProps>(props: Props): [BadgeVariantProps, Pretty<DistributiveOmit<Props, keyof BadgeVariantProps>>]
  getVariantProps: (props?: BadgeVariantProps) => BadgeVariantProps
}

/**
 * Luma badge — 20px chip following Button's variant + intent system
 */
export declare const badge: BadgeRecipe
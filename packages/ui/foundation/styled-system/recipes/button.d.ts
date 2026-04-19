/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ButtonVariant {
  /**
 * @default "default"
 */
variant: "default" | "secondary" | "outline" | "ghost" | "destructive" | "link"
intent: "primary" | "critical" | "positive" | "caution" | "info"
/**
 * @default "md"
 */
size: "xs" | "sm" | "md" | "lg" | "xl"
icon: boolean
stretched: boolean
}

type ButtonVariantMap = {
  [key in keyof ButtonVariant]: Array<ButtonVariant[key]>
}



export type ButtonVariantProps = {
  [key in keyof ButtonVariant]?: ButtonVariant[key] | undefined
}

export interface ButtonRecipe {
  
  __type: ButtonVariantProps
  (props?: ButtonVariantProps): string
  raw: (props?: ButtonVariantProps) => ButtonVariantProps
  variantMap: ButtonVariantMap
  variantKeys: Array<keyof ButtonVariant>
  splitVariantProps<Props extends ButtonVariantProps>(props: Props): [ButtonVariantProps, Pretty<DistributiveOmit<Props, keyof ButtonVariantProps>>]
  getVariantProps: (props?: ButtonVariantProps) => ButtonVariantProps
}

/**
 * Luma button — variants: default/secondary/outline/ghost/destructive/link
 */
export declare const button: ButtonRecipe
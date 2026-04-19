/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface ButtonGroupVariant {
  /**
 * @default "horizontal"
 */
orientation: "horizontal" | "vertical"
}

type ButtonGroupVariantMap = {
  [key in keyof ButtonGroupVariant]: Array<ButtonGroupVariant[key]>
}

type ButtonGroupSlot = "root" | "text" | "separator" | "root" | "text" | "separator"

export type ButtonGroupVariantProps = {
  [key in keyof ButtonGroupVariant]?: ConditionalValue<ButtonGroupVariant[key]> | undefined
}

export interface ButtonGroupRecipe {
  __slot: ButtonGroupSlot
  __type: ButtonGroupVariantProps
  (props?: ButtonGroupVariantProps): Pretty<Record<ButtonGroupSlot, string>>
  raw: (props?: ButtonGroupVariantProps) => ButtonGroupVariantProps
  variantMap: ButtonGroupVariantMap
  variantKeys: Array<keyof ButtonGroupVariant>
  splitVariantProps<Props extends ButtonGroupVariantProps>(props: Props): [ButtonGroupVariantProps, Pretty<DistributiveOmit<Props, keyof ButtonGroupVariantProps>>]
  getVariantProps: (props?: ButtonGroupVariantProps) => ButtonGroupVariantProps
}

/**
 * Luma button group — attached or gapped cluster of buttons / inputs
 */
export declare const buttonGroup: ButtonGroupRecipe
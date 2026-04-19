/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface InputGroupVariant {
  /**
 * @default "outline"
 */
variant: "outline" | "filled" | "flushed"
/**
 * @default "md"
 */
size: "sm" | "md" | "lg"
}

type InputGroupVariantMap = {
  [key in keyof InputGroupVariant]: Array<InputGroupVariant[key]>
}

type InputGroupSlot = "root" | "input" | "startAddon" | "endAddon" | "startElement" | "endElement" | "root" | "input" | "startAddon" | "endAddon" | "startElement" | "endElement"

export type InputGroupVariantProps = {
  [key in keyof InputGroupVariant]?: ConditionalValue<InputGroupVariant[key]> | undefined
}

export interface InputGroupRecipe {
  __slot: InputGroupSlot
  __type: InputGroupVariantProps
  (props?: InputGroupVariantProps): Pretty<Record<InputGroupSlot, string>>
  raw: (props?: InputGroupVariantProps) => InputGroupVariantProps
  variantMap: InputGroupVariantMap
  variantKeys: Array<keyof InputGroupVariant>
  splitVariantProps<Props extends InputGroupVariantProps>(props: Props): [InputGroupVariantProps, Pretty<DistributiveOmit<Props, keyof InputGroupVariantProps>>]
  getVariantProps: (props?: InputGroupVariantProps) => InputGroupVariantProps
}

/**
 * Luma input group — input + prefix/suffix addons
 */
export declare const inputGroup: InputGroupRecipe
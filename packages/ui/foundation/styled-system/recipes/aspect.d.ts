/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface AspectVariant {
  /**
 * @default "video"
 */
ratio: "square" | "video" | "wide" | "portrait" | "classic" | "golden"
}

type AspectVariantMap = {
  [key in keyof AspectVariant]: Array<AspectVariant[key]>
}



export type AspectVariantProps = {
  [key in keyof AspectVariant]?: ConditionalValue<AspectVariant[key]> | undefined
}

export interface AspectRecipe {
  
  __type: AspectVariantProps
  (props?: AspectVariantProps): string
  raw: (props?: AspectVariantProps) => AspectVariantProps
  variantMap: AspectVariantMap
  variantKeys: Array<keyof AspectVariant>
  splitVariantProps<Props extends AspectVariantProps>(props: Props): [AspectVariantProps, Pretty<DistributiveOmit<Props, keyof AspectVariantProps>>]
  getVariantProps: (props?: AspectVariantProps) => AspectVariantProps
}

/**
 * Aspect ratio container for responsive media
 */
export declare const aspect: AspectRecipe
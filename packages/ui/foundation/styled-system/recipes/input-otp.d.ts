/* eslint-disable */
import type { ConditionalValue } from '../types/index';
import type { DistributiveOmit, Pretty } from '../types/system-types';

interface InputOtpVariant {
  /**
 * @default "md"
 */
size: "sm" | "md" | "lg" | "xl"
}

type InputOtpVariantMap = {
  [key in keyof InputOtpVariant]: Array<InputOtpVariant[key]>
}

type InputOtpSlot = "root" | "input" | "control" | "slot" | "separator" | "root" | "input" | "control" | "slot" | "separator"

export type InputOtpVariantProps = {
  [key in keyof InputOtpVariant]?: ConditionalValue<InputOtpVariant[key]> | undefined
}

export interface InputOtpRecipe {
  __slot: InputOtpSlot
  __type: InputOtpVariantProps
  (props?: InputOtpVariantProps): Pretty<Record<InputOtpSlot, string>>
  raw: (props?: InputOtpVariantProps) => InputOtpVariantProps
  variantMap: InputOtpVariantMap
  variantKeys: Array<keyof InputOtpVariant>
  splitVariantProps<Props extends InputOtpVariantProps>(props: Props): [InputOtpVariantProps, Pretty<DistributiveOmit<Props, keyof InputOtpVariantProps>>]
  getVariantProps: (props?: InputOtpVariantProps) => InputOtpVariantProps
}

/**
 * Luma input-otp — connected per-digit cells
 */
export declare const inputOtp: InputOtpRecipe
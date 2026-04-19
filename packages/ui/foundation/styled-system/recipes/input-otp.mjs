import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const inputOtpDefaultVariants = {
  "size": "md"
}
const inputOtpCompoundVariants = []

const inputOtpSlotNames = [
  [
    "root",
    "input-otp__root"
  ],
  [
    "input",
    "input-otp__input"
  ],
  [
    "control",
    "input-otp__control"
  ],
  [
    "slot",
    "input-otp__slot"
  ],
  [
    "separator",
    "input-otp__separator"
  ],
  [
    "root",
    "input-otp__root"
  ],
  [
    "input",
    "input-otp__input"
  ],
  [
    "control",
    "input-otp__control"
  ],
  [
    "slot",
    "input-otp__slot"
  ],
  [
    "separator",
    "input-otp__separator"
  ]
]
const inputOtpSlotFns = /* @__PURE__ */ inputOtpSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, inputOtpDefaultVariants, getSlotCompoundVariant(inputOtpCompoundVariants, slotName))])

const inputOtpFn = memo((props = {}) => {
  return Object.fromEntries(inputOtpSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const inputOtpVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...inputOtpDefaultVariants, ...compact(variants) })

export const inputOtp = /* @__PURE__ */ Object.assign(inputOtpFn, {
  __recipe__: false,
  __name__: 'inputOtp',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: inputOtpVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg",
    "xl"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, inputOtpVariantKeys)
  },
  getVariantProps
})
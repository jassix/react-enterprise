import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const buttonGroupDefaultVariants = {
  "orientation": "horizontal"
}
const buttonGroupCompoundVariants = []

const buttonGroupSlotNames = [
  [
    "root",
    "button-group__root"
  ],
  [
    "text",
    "button-group__text"
  ],
  [
    "separator",
    "button-group__separator"
  ],
  [
    "root",
    "button-group__root"
  ],
  [
    "text",
    "button-group__text"
  ],
  [
    "separator",
    "button-group__separator"
  ]
]
const buttonGroupSlotFns = /* @__PURE__ */ buttonGroupSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, buttonGroupDefaultVariants, getSlotCompoundVariant(buttonGroupCompoundVariants, slotName))])

const buttonGroupFn = memo((props = {}) => {
  return Object.fromEntries(buttonGroupSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const buttonGroupVariantKeys = [
  "orientation"
]
const getVariantProps = (variants) => ({ ...buttonGroupDefaultVariants, ...compact(variants) })

export const buttonGroup = /* @__PURE__ */ Object.assign(buttonGroupFn, {
  __recipe__: false,
  __name__: 'buttonGroup',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: buttonGroupVariantKeys,
  variantMap: {
  "orientation": [
    "horizontal",
    "vertical"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, buttonGroupVariantKeys)
  },
  getVariantProps
})
import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const toggleDefaultVariants = {
  "variant": "default",
  "intent": "primary",
  "size": "md"
}
const toggleCompoundVariants = []

const toggleSlotNames = [
  [
    "root",
    "toggle__root"
  ],
  [
    "indicator",
    "toggle__indicator"
  ],
  [
    "root",
    "toggle__root"
  ],
  [
    "indicator",
    "toggle__indicator"
  ]
]
const toggleSlotFns = /* @__PURE__ */ toggleSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, toggleDefaultVariants, getSlotCompoundVariant(toggleCompoundVariants, slotName))])

const toggleFn = memo((props = {}) => {
  return Object.fromEntries(toggleSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const toggleVariantKeys = [
  "variant",
  "intent",
  "size",
  "icon"
]
const getVariantProps = (variants) => ({ ...toggleDefaultVariants, ...compact(variants) })

export const toggle = /* @__PURE__ */ Object.assign(toggleFn, {
  __recipe__: false,
  __name__: 'toggle',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: toggleVariantKeys,
  variantMap: {
  "variant": [
    "default",
    "outline"
  ],
  "intent": [
    "primary",
    "critical",
    "positive",
    "caution",
    "info"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ],
  "icon": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, toggleVariantKeys)
  },
  getVariantProps
})
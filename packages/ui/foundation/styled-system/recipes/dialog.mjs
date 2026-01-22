import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const dialogDefaultVariants = {
  "size": "md",
  "centered": true
}
const dialogCompoundVariants = []

const dialogSlotNames = [
  [
    "backdrop",
    "dialog__backdrop"
  ],
  [
    "positioner",
    "dialog__positioner"
  ],
  [
    "content",
    "dialog__content"
  ],
  [
    "title",
    "dialog__title"
  ],
  [
    "description",
    "dialog__description"
  ],
  [
    "closeTrigger",
    "dialog__closeTrigger"
  ],
  [
    "backdrop",
    "dialog__backdrop"
  ],
  [
    "positioner",
    "dialog__positioner"
  ],
  [
    "content",
    "dialog__content"
  ],
  [
    "title",
    "dialog__title"
  ],
  [
    "description",
    "dialog__description"
  ],
  [
    "closeTrigger",
    "dialog__closeTrigger"
  ]
]
const dialogSlotFns = /* @__PURE__ */ dialogSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, dialogDefaultVariants, getSlotCompoundVariant(dialogCompoundVariants, slotName))])

const dialogFn = memo((props = {}) => {
  return Object.fromEntries(dialogSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const dialogVariantKeys = [
  "size",
  "centered"
]
const getVariantProps = (variants) => ({ ...dialogDefaultVariants, ...compact(variants) })

export const dialog = /* @__PURE__ */ Object.assign(dialogFn, {
  __recipe__: false,
  __name__: 'dialog',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: dialogVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "full"
  ],
  "centered": [
    "true",
    "false"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, dialogVariantKeys)
  },
  getVariantProps
})
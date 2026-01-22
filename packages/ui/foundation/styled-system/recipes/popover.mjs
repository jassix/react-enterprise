import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const popoverDefaultVariants = {
  "variant": "default"
}
const popoverCompoundVariants = []

const popoverSlotNames = [
  [
    "trigger",
    "popover__trigger"
  ],
  [
    "positioner",
    "popover__positioner"
  ],
  [
    "content",
    "popover__content"
  ],
  [
    "title",
    "popover__title"
  ],
  [
    "description",
    "popover__description"
  ],
  [
    "closeTrigger",
    "popover__closeTrigger"
  ],
  [
    "arrow",
    "popover__arrow"
  ],
  [
    "trigger",
    "popover__trigger"
  ],
  [
    "positioner",
    "popover__positioner"
  ],
  [
    "content",
    "popover__content"
  ],
  [
    "title",
    "popover__title"
  ],
  [
    "description",
    "popover__description"
  ],
  [
    "closeTrigger",
    "popover__closeTrigger"
  ],
  [
    "arrow",
    "popover__arrow"
  ]
]
const popoverSlotFns = /* @__PURE__ */ popoverSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, popoverDefaultVariants, getSlotCompoundVariant(popoverCompoundVariants, slotName))])

const popoverFn = memo((props = {}) => {
  return Object.fromEntries(popoverSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const popoverVariantKeys = [
  "variant"
]
const getVariantProps = (variants) => ({ ...popoverDefaultVariants, ...compact(variants) })

export const popover = /* @__PURE__ */ Object.assign(popoverFn, {
  __recipe__: false,
  __name__: 'popover',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: popoverVariantKeys,
  variantMap: {
  "variant": [
    "default",
    "accent"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, popoverVariantKeys)
  },
  getVariantProps
})
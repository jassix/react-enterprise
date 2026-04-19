import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const sonnerDefaultVariants = {
  "status": "neutral",
  "placement": "bottom-right"
}
const sonnerCompoundVariants = []

const sonnerSlotNames = [
  [
    "viewport",
    "sonner__viewport"
  ],
  [
    "toast",
    "sonner__toast"
  ],
  [
    "icon",
    "sonner__icon"
  ],
  [
    "title",
    "sonner__title"
  ],
  [
    "description",
    "sonner__description"
  ],
  [
    "actionButton",
    "sonner__actionButton"
  ],
  [
    "cancelButton",
    "sonner__cancelButton"
  ],
  [
    "closeButton",
    "sonner__closeButton"
  ],
  [
    "viewport",
    "sonner__viewport"
  ],
  [
    "toast",
    "sonner__toast"
  ],
  [
    "icon",
    "sonner__icon"
  ],
  [
    "title",
    "sonner__title"
  ],
  [
    "description",
    "sonner__description"
  ],
  [
    "actionButton",
    "sonner__actionButton"
  ],
  [
    "cancelButton",
    "sonner__cancelButton"
  ],
  [
    "closeButton",
    "sonner__closeButton"
  ]
]
const sonnerSlotFns = /* @__PURE__ */ sonnerSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, sonnerDefaultVariants, getSlotCompoundVariant(sonnerCompoundVariants, slotName))])

const sonnerFn = memo((props = {}) => {
  return Object.fromEntries(sonnerSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const sonnerVariantKeys = [
  "status",
  "placement"
]
const getVariantProps = (variants) => ({ ...sonnerDefaultVariants, ...compact(variants) })

export const sonner = /* @__PURE__ */ Object.assign(sonnerFn, {
  __recipe__: false,
  __name__: 'sonner',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: sonnerVariantKeys,
  variantMap: {
  "status": [
    "neutral",
    "info",
    "positive",
    "caution",
    "critical",
    "loading"
  ],
  "placement": [
    "top-left",
    "top-center",
    "top-right",
    "bottom-left",
    "bottom-center",
    "bottom-right"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, sonnerVariantKeys)
  },
  getVariantProps
})
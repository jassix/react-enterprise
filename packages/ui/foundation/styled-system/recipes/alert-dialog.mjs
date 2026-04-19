import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const alertDialogDefaultVariants = {
  "intent": "critical",
  "size": "md"
}
const alertDialogCompoundVariants = []

const alertDialogSlotNames = [
  [
    "backdrop",
    "alert-dialog__backdrop"
  ],
  [
    "positioner",
    "alert-dialog__positioner"
  ],
  [
    "content",
    "alert-dialog__content"
  ],
  [
    "header",
    "alert-dialog__header"
  ],
  [
    "media",
    "alert-dialog__media"
  ],
  [
    "title",
    "alert-dialog__title"
  ],
  [
    "description",
    "alert-dialog__description"
  ],
  [
    "body",
    "alert-dialog__body"
  ],
  [
    "footer",
    "alert-dialog__footer"
  ],
  [
    "cancelTrigger",
    "alert-dialog__cancelTrigger"
  ],
  [
    "confirmTrigger",
    "alert-dialog__confirmTrigger"
  ],
  [
    "backdrop",
    "alert-dialog__backdrop"
  ],
  [
    "positioner",
    "alert-dialog__positioner"
  ],
  [
    "content",
    "alert-dialog__content"
  ],
  [
    "header",
    "alert-dialog__header"
  ],
  [
    "media",
    "alert-dialog__media"
  ],
  [
    "title",
    "alert-dialog__title"
  ],
  [
    "description",
    "alert-dialog__description"
  ],
  [
    "body",
    "alert-dialog__body"
  ],
  [
    "footer",
    "alert-dialog__footer"
  ],
  [
    "cancelTrigger",
    "alert-dialog__cancelTrigger"
  ],
  [
    "confirmTrigger",
    "alert-dialog__confirmTrigger"
  ]
]
const alertDialogSlotFns = /* @__PURE__ */ alertDialogSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, alertDialogDefaultVariants, getSlotCompoundVariant(alertDialogCompoundVariants, slotName))])

const alertDialogFn = memo((props = {}) => {
  return Object.fromEntries(alertDialogSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const alertDialogVariantKeys = [
  "intent",
  "size"
]
const getVariantProps = (variants) => ({ ...alertDialogDefaultVariants, ...compact(variants) })

export const alertDialog = /* @__PURE__ */ Object.assign(alertDialogFn, {
  __recipe__: false,
  __name__: 'alertDialog',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: alertDialogVariantKeys,
  variantMap: {
  "intent": [
    "critical",
    "caution",
    "primary"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, alertDialogVariantKeys)
  },
  getVariantProps
})
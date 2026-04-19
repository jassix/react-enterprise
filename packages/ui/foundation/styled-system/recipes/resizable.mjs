import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const resizableDefaultVariants = {
  "orientation": "horizontal",
  "variant": "bar"
}
const resizableCompoundVariants = [
  {
    "orientation": "vertical",
    "variant": "handle",
    "css": {
      "resizeTrigger": {
        "_before": {
          "width": "1.5rem",
          "height": "0.25rem"
        }
      }
    }
  },
  {
    "orientation": "vertical",
    "variant": "handle",
    "css": {
      "resizeTrigger": {
        "_before": {
          "width": "1.5rem",
          "height": "0.25rem"
        }
      }
    }
  }
]

const resizableSlotNames = [
  [
    "root",
    "resizable__root"
  ],
  [
    "panel",
    "resizable__panel"
  ],
  [
    "resizeTrigger",
    "resizable__resizeTrigger"
  ],
  [
    "root",
    "resizable__root"
  ],
  [
    "panel",
    "resizable__panel"
  ],
  [
    "resizeTrigger",
    "resizable__resizeTrigger"
  ]
]
const resizableSlotFns = /* @__PURE__ */ resizableSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, resizableDefaultVariants, getSlotCompoundVariant(resizableCompoundVariants, slotName))])

const resizableFn = memo((props = {}) => {
  return Object.fromEntries(resizableSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const resizableVariantKeys = [
  "orientation",
  "variant"
]
const getVariantProps = (variants) => ({ ...resizableDefaultVariants, ...compact(variants) })

export const resizable = /* @__PURE__ */ Object.assign(resizableFn, {
  __recipe__: false,
  __name__: 'resizable',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: resizableVariantKeys,
  variantMap: {
  "orientation": [
    "horizontal",
    "vertical"
  ],
  "variant": [
    "bar",
    "handle"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, resizableVariantKeys)
  },
  getVariantProps
})
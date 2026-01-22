import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const selectDefaultVariants = {
  "size": "md"
}
const selectCompoundVariants = []

const selectSlotNames = [
  [
    "root",
    "select__root"
  ],
  [
    "label",
    "select__label"
  ],
  [
    "control",
    "select__control"
  ],
  [
    "trigger",
    "select__trigger"
  ],
  [
    "valueText",
    "select__valueText"
  ],
  [
    "indicator",
    "select__indicator"
  ],
  [
    "clearTrigger",
    "select__clearTrigger"
  ],
  [
    "positioner",
    "select__positioner"
  ],
  [
    "content",
    "select__content"
  ],
  [
    "item",
    "select__item"
  ],
  [
    "itemText",
    "select__itemText"
  ],
  [
    "itemIndicator",
    "select__itemIndicator"
  ],
  [
    "itemGroup",
    "select__itemGroup"
  ],
  [
    "itemGroupLabel",
    "select__itemGroupLabel"
  ],
  [
    "root",
    "select__root"
  ],
  [
    "label",
    "select__label"
  ],
  [
    "control",
    "select__control"
  ],
  [
    "trigger",
    "select__trigger"
  ],
  [
    "valueText",
    "select__valueText"
  ],
  [
    "indicator",
    "select__indicator"
  ],
  [
    "clearTrigger",
    "select__clearTrigger"
  ],
  [
    "positioner",
    "select__positioner"
  ],
  [
    "content",
    "select__content"
  ],
  [
    "item",
    "select__item"
  ],
  [
    "itemText",
    "select__itemText"
  ],
  [
    "itemIndicator",
    "select__itemIndicator"
  ],
  [
    "itemGroup",
    "select__itemGroup"
  ],
  [
    "itemGroupLabel",
    "select__itemGroupLabel"
  ]
]
const selectSlotFns = /* @__PURE__ */ selectSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, selectDefaultVariants, getSlotCompoundVariant(selectCompoundVariants, slotName))])

const selectFn = memo((props = {}) => {
  return Object.fromEntries(selectSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const selectVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...selectDefaultVariants, ...compact(variants) })

export const select = /* @__PURE__ */ Object.assign(selectFn, {
  __recipe__: false,
  __name__: 'select',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: selectVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, selectVariantKeys)
  },
  getVariantProps
})
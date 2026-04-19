import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const datePickerDefaultVariants = {
  "size": "md"
}
const datePickerCompoundVariants = []

const datePickerSlotNames = [
  [
    "root",
    "date-picker__root"
  ],
  [
    "label",
    "date-picker__label"
  ],
  [
    "control",
    "date-picker__control"
  ],
  [
    "input",
    "date-picker__input"
  ],
  [
    "trigger",
    "date-picker__trigger"
  ],
  [
    "clearTrigger",
    "date-picker__clearTrigger"
  ],
  [
    "positioner",
    "date-picker__positioner"
  ],
  [
    "content",
    "date-picker__content"
  ],
  [
    "presetTrigger",
    "date-picker__presetTrigger"
  ],
  [
    "view",
    "date-picker__view"
  ],
  [
    "viewControl",
    "date-picker__viewControl"
  ],
  [
    "viewTrigger",
    "date-picker__viewTrigger"
  ],
  [
    "prevTrigger",
    "date-picker__prevTrigger"
  ],
  [
    "nextTrigger",
    "date-picker__nextTrigger"
  ],
  [
    "rangeText",
    "date-picker__rangeText"
  ],
  [
    "table",
    "date-picker__table"
  ],
  [
    "tableHead",
    "date-picker__tableHead"
  ],
  [
    "tableHeader",
    "date-picker__tableHeader"
  ],
  [
    "tableBody",
    "date-picker__tableBody"
  ],
  [
    "tableRow",
    "date-picker__tableRow"
  ],
  [
    "tableCell",
    "date-picker__tableCell"
  ],
  [
    "tableCellTrigger",
    "date-picker__tableCellTrigger"
  ],
  [
    "root",
    "date-picker__root"
  ],
  [
    "label",
    "date-picker__label"
  ],
  [
    "control",
    "date-picker__control"
  ],
  [
    "input",
    "date-picker__input"
  ],
  [
    "trigger",
    "date-picker__trigger"
  ],
  [
    "clearTrigger",
    "date-picker__clearTrigger"
  ],
  [
    "positioner",
    "date-picker__positioner"
  ],
  [
    "content",
    "date-picker__content"
  ],
  [
    "presetTrigger",
    "date-picker__presetTrigger"
  ],
  [
    "view",
    "date-picker__view"
  ],
  [
    "viewControl",
    "date-picker__viewControl"
  ],
  [
    "viewTrigger",
    "date-picker__viewTrigger"
  ],
  [
    "prevTrigger",
    "date-picker__prevTrigger"
  ],
  [
    "nextTrigger",
    "date-picker__nextTrigger"
  ],
  [
    "rangeText",
    "date-picker__rangeText"
  ],
  [
    "table",
    "date-picker__table"
  ],
  [
    "tableHead",
    "date-picker__tableHead"
  ],
  [
    "tableHeader",
    "date-picker__tableHeader"
  ],
  [
    "tableBody",
    "date-picker__tableBody"
  ],
  [
    "tableRow",
    "date-picker__tableRow"
  ],
  [
    "tableCell",
    "date-picker__tableCell"
  ],
  [
    "tableCellTrigger",
    "date-picker__tableCellTrigger"
  ]
]
const datePickerSlotFns = /* @__PURE__ */ datePickerSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, datePickerDefaultVariants, getSlotCompoundVariant(datePickerCompoundVariants, slotName))])

const datePickerFn = memo((props = {}) => {
  return Object.fromEntries(datePickerSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const datePickerVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...datePickerDefaultVariants, ...compact(variants) })

export const datePicker = /* @__PURE__ */ Object.assign(datePickerFn, {
  __recipe__: false,
  __name__: 'datePicker',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: datePickerVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, datePickerVariantKeys)
  },
  getVariantProps
})
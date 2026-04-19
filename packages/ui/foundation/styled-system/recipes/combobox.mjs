import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const comboboxDefaultVariants = {
  "size": "md"
}
const comboboxCompoundVariants = []

const comboboxSlotNames = [
  [
    "root",
    "combobox__root"
  ],
  [
    "label",
    "combobox__label"
  ],
  [
    "control",
    "combobox__control"
  ],
  [
    "input",
    "combobox__input"
  ],
  [
    "trigger",
    "combobox__trigger"
  ],
  [
    "clearTrigger",
    "combobox__clearTrigger"
  ],
  [
    "positioner",
    "combobox__positioner"
  ],
  [
    "content",
    "combobox__content"
  ],
  [
    "item",
    "combobox__item"
  ],
  [
    "itemText",
    "combobox__itemText"
  ],
  [
    "itemIndicator",
    "combobox__itemIndicator"
  ],
  [
    "itemGroup",
    "combobox__itemGroup"
  ],
  [
    "itemGroupLabel",
    "combobox__itemGroupLabel"
  ],
  [
    "empty",
    "combobox__empty"
  ],
  [
    "root",
    "combobox__root"
  ],
  [
    "label",
    "combobox__label"
  ],
  [
    "control",
    "combobox__control"
  ],
  [
    "input",
    "combobox__input"
  ],
  [
    "trigger",
    "combobox__trigger"
  ],
  [
    "clearTrigger",
    "combobox__clearTrigger"
  ],
  [
    "positioner",
    "combobox__positioner"
  ],
  [
    "content",
    "combobox__content"
  ],
  [
    "item",
    "combobox__item"
  ],
  [
    "itemText",
    "combobox__itemText"
  ],
  [
    "itemIndicator",
    "combobox__itemIndicator"
  ],
  [
    "itemGroup",
    "combobox__itemGroup"
  ],
  [
    "itemGroupLabel",
    "combobox__itemGroupLabel"
  ],
  [
    "empty",
    "combobox__empty"
  ]
]
const comboboxSlotFns = /* @__PURE__ */ comboboxSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, comboboxDefaultVariants, getSlotCompoundVariant(comboboxCompoundVariants, slotName))])

const comboboxFn = memo((props = {}) => {
  return Object.fromEntries(comboboxSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const comboboxVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...comboboxDefaultVariants, ...compact(variants) })

export const combobox = /* @__PURE__ */ Object.assign(comboboxFn, {
  __recipe__: false,
  __name__: 'combobox',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: comboboxVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, comboboxVariantKeys)
  },
  getVariantProps
})
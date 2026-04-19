import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const menubarDefaultVariants = {
  "size": "md"
}
const menubarCompoundVariants = []

const menubarSlotNames = [
  [
    "root",
    "menubar__root"
  ],
  [
    "trigger",
    "menubar__trigger"
  ],
  [
    "positioner",
    "menubar__positioner"
  ],
  [
    "content",
    "menubar__content"
  ],
  [
    "item",
    "menubar__item"
  ],
  [
    "itemText",
    "menubar__itemText"
  ],
  [
    "itemIndicator",
    "menubar__itemIndicator"
  ],
  [
    "separator",
    "menubar__separator"
  ],
  [
    "itemGroup",
    "menubar__itemGroup"
  ],
  [
    "itemGroupLabel",
    "menubar__itemGroupLabel"
  ],
  [
    "shortcut",
    "menubar__shortcut"
  ],
  [
    "root",
    "menubar__root"
  ],
  [
    "trigger",
    "menubar__trigger"
  ],
  [
    "positioner",
    "menubar__positioner"
  ],
  [
    "content",
    "menubar__content"
  ],
  [
    "item",
    "menubar__item"
  ],
  [
    "itemText",
    "menubar__itemText"
  ],
  [
    "itemIndicator",
    "menubar__itemIndicator"
  ],
  [
    "separator",
    "menubar__separator"
  ],
  [
    "itemGroup",
    "menubar__itemGroup"
  ],
  [
    "itemGroupLabel",
    "menubar__itemGroupLabel"
  ],
  [
    "shortcut",
    "menubar__shortcut"
  ]
]
const menubarSlotFns = /* @__PURE__ */ menubarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, menubarDefaultVariants, getSlotCompoundVariant(menubarCompoundVariants, slotName))])

const menubarFn = memo((props = {}) => {
  return Object.fromEntries(menubarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const menubarVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...menubarDefaultVariants, ...compact(variants) })

export const menubar = /* @__PURE__ */ Object.assign(menubarFn, {
  __recipe__: false,
  __name__: 'menubar',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: menubarVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, menubarVariantKeys)
  },
  getVariantProps
})
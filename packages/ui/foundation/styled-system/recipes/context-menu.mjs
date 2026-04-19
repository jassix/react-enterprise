import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const contextMenuDefaultVariants = {}
const contextMenuCompoundVariants = []

const contextMenuSlotNames = [
  [
    "trigger",
    "context-menu__trigger"
  ],
  [
    "positioner",
    "context-menu__positioner"
  ],
  [
    "content",
    "context-menu__content"
  ],
  [
    "item",
    "context-menu__item"
  ],
  [
    "itemText",
    "context-menu__itemText"
  ],
  [
    "itemIndicator",
    "context-menu__itemIndicator"
  ],
  [
    "optionItem",
    "context-menu__optionItem"
  ],
  [
    "separator",
    "context-menu__separator"
  ],
  [
    "itemGroup",
    "context-menu__itemGroup"
  ],
  [
    "itemGroupLabel",
    "context-menu__itemGroupLabel"
  ],
  [
    "shortcut",
    "context-menu__shortcut"
  ],
  [
    "trigger",
    "context-menu__trigger"
  ],
  [
    "positioner",
    "context-menu__positioner"
  ],
  [
    "content",
    "context-menu__content"
  ],
  [
    "item",
    "context-menu__item"
  ],
  [
    "itemText",
    "context-menu__itemText"
  ],
  [
    "itemIndicator",
    "context-menu__itemIndicator"
  ],
  [
    "optionItem",
    "context-menu__optionItem"
  ],
  [
    "separator",
    "context-menu__separator"
  ],
  [
    "itemGroup",
    "context-menu__itemGroup"
  ],
  [
    "itemGroupLabel",
    "context-menu__itemGroupLabel"
  ],
  [
    "shortcut",
    "context-menu__shortcut"
  ]
]
const contextMenuSlotFns = /* @__PURE__ */ contextMenuSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, contextMenuDefaultVariants, getSlotCompoundVariant(contextMenuCompoundVariants, slotName))])

const contextMenuFn = memo((props = {}) => {
  return Object.fromEntries(contextMenuSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const contextMenuVariantKeys = []
const getVariantProps = (variants) => ({ ...contextMenuDefaultVariants, ...compact(variants) })

export const contextMenu = /* @__PURE__ */ Object.assign(contextMenuFn, {
  __recipe__: false,
  __name__: 'contextMenu',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: contextMenuVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, contextMenuVariantKeys)
  },
  getVariantProps
})
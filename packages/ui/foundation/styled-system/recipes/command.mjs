import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const commandDefaultVariants = {
  "size": "md"
}
const commandCompoundVariants = []

const commandSlotNames = [
  [
    "root",
    "command__root"
  ],
  [
    "inputWrapper",
    "command__inputWrapper"
  ],
  [
    "input",
    "command__input"
  ],
  [
    "list",
    "command__list"
  ],
  [
    "empty",
    "command__empty"
  ],
  [
    "group",
    "command__group"
  ],
  [
    "groupLabel",
    "command__groupLabel"
  ],
  [
    "item",
    "command__item"
  ],
  [
    "itemIndicator",
    "command__itemIndicator"
  ],
  [
    "shortcut",
    "command__shortcut"
  ],
  [
    "separator",
    "command__separator"
  ],
  [
    "root",
    "command__root"
  ],
  [
    "inputWrapper",
    "command__inputWrapper"
  ],
  [
    "input",
    "command__input"
  ],
  [
    "list",
    "command__list"
  ],
  [
    "empty",
    "command__empty"
  ],
  [
    "group",
    "command__group"
  ],
  [
    "groupLabel",
    "command__groupLabel"
  ],
  [
    "item",
    "command__item"
  ],
  [
    "itemIndicator",
    "command__itemIndicator"
  ],
  [
    "shortcut",
    "command__shortcut"
  ],
  [
    "separator",
    "command__separator"
  ]
]
const commandSlotFns = /* @__PURE__ */ commandSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, commandDefaultVariants, getSlotCompoundVariant(commandCompoundVariants, slotName))])

const commandFn = memo((props = {}) => {
  return Object.fromEntries(commandSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const commandVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...commandDefaultVariants, ...compact(variants) })

export const command = /* @__PURE__ */ Object.assign(commandFn, {
  __recipe__: false,
  __name__: 'command',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: commandVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, commandVariantKeys)
  },
  getVariantProps
})
import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const itemDefaultVariants = {
  "size": "md",
  "variant": "default"
}
const itemCompoundVariants = []

const itemSlotNames = [
  [
    "root",
    "item__root"
  ],
  [
    "group",
    "item__group"
  ],
  [
    "header",
    "item__header"
  ],
  [
    "footer",
    "item__footer"
  ],
  [
    "media",
    "item__media"
  ],
  [
    "content",
    "item__content"
  ],
  [
    "title",
    "item__title"
  ],
  [
    "description",
    "item__description"
  ],
  [
    "actions",
    "item__actions"
  ],
  [
    "separator",
    "item__separator"
  ],
  [
    "root",
    "item__root"
  ],
  [
    "group",
    "item__group"
  ],
  [
    "header",
    "item__header"
  ],
  [
    "footer",
    "item__footer"
  ],
  [
    "media",
    "item__media"
  ],
  [
    "content",
    "item__content"
  ],
  [
    "title",
    "item__title"
  ],
  [
    "description",
    "item__description"
  ],
  [
    "actions",
    "item__actions"
  ],
  [
    "separator",
    "item__separator"
  ]
]
const itemSlotFns = /* @__PURE__ */ itemSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, itemDefaultVariants, getSlotCompoundVariant(itemCompoundVariants, slotName))])

const itemFn = memo((props = {}) => {
  return Object.fromEntries(itemSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const itemVariantKeys = [
  "size",
  "variant",
  "interactive"
]
const getVariantProps = (variants) => ({ ...itemDefaultVariants, ...compact(variants) })

export const item = /* @__PURE__ */ Object.assign(itemFn, {
  __recipe__: false,
  __name__: 'item',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: itemVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "default",
    "muted",
    "outline"
  ],
  "interactive": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, itemVariantKeys)
  },
  getVariantProps
})
import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const emptyDefaultVariants = {
  "size": "md",
  "variant": "default"
}
const emptyCompoundVariants = []

const emptySlotNames = [
  [
    "root",
    "empty__root"
  ],
  [
    "header",
    "empty__header"
  ],
  [
    "icon",
    "empty__icon"
  ],
  [
    "title",
    "empty__title"
  ],
  [
    "description",
    "empty__description"
  ],
  [
    "content",
    "empty__content"
  ],
  [
    "actions",
    "empty__actions"
  ],
  [
    "root",
    "empty__root"
  ],
  [
    "header",
    "empty__header"
  ],
  [
    "icon",
    "empty__icon"
  ],
  [
    "title",
    "empty__title"
  ],
  [
    "description",
    "empty__description"
  ],
  [
    "content",
    "empty__content"
  ],
  [
    "actions",
    "empty__actions"
  ]
]
const emptySlotFns = /* @__PURE__ */ emptySlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, emptyDefaultVariants, getSlotCompoundVariant(emptyCompoundVariants, slotName))])

const emptyFn = memo((props = {}) => {
  return Object.fromEntries(emptySlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const emptyVariantKeys = [
  "size",
  "variant"
]
const getVariantProps = (variants) => ({ ...emptyDefaultVariants, ...compact(variants) })

export const empty = /* @__PURE__ */ Object.assign(emptyFn, {
  __recipe__: false,
  __name__: 'empty',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: emptyVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "default",
    "icon",
    "muted",
    "dashed"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, emptyVariantKeys)
  },
  getVariantProps
})
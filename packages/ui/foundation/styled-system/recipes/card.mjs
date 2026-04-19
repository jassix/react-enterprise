import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const cardDefaultVariants = {
  "size": "md"
}
const cardCompoundVariants = []

const cardSlotNames = [
  [
    "root",
    "card__root"
  ],
  [
    "header",
    "card__header"
  ],
  [
    "title",
    "card__title"
  ],
  [
    "description",
    "card__description"
  ],
  [
    "action",
    "card__action"
  ],
  [
    "content",
    "card__content"
  ],
  [
    "footer",
    "card__footer"
  ],
  [
    "root",
    "card__root"
  ],
  [
    "header",
    "card__header"
  ],
  [
    "title",
    "card__title"
  ],
  [
    "description",
    "card__description"
  ],
  [
    "action",
    "card__action"
  ],
  [
    "content",
    "card__content"
  ],
  [
    "footer",
    "card__footer"
  ]
]
const cardSlotFns = /* @__PURE__ */ cardSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, cardDefaultVariants, getSlotCompoundVariant(cardCompoundVariants, slotName))])

const cardFn = memo((props = {}) => {
  return Object.fromEntries(cardSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const cardVariantKeys = [
  "size",
  "interactive"
]
const getVariantProps = (variants) => ({ ...cardDefaultVariants, ...compact(variants) })

export const card = /* @__PURE__ */ Object.assign(cardFn, {
  __recipe__: false,
  __name__: 'card',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: cardVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md"
  ],
  "interactive": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, cardVariantKeys)
  },
  getVariantProps
})
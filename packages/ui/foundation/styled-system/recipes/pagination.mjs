import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const paginationDefaultVariants = {
  "size": "md"
}
const paginationCompoundVariants = []

const paginationSlotNames = [
  [
    "root",
    "pagination__root"
  ],
  [
    "list",
    "pagination__list"
  ],
  [
    "item",
    "pagination__item"
  ],
  [
    "prevTrigger",
    "pagination__prevTrigger"
  ],
  [
    "nextTrigger",
    "pagination__nextTrigger"
  ],
  [
    "ellipsis",
    "pagination__ellipsis"
  ],
  [
    "root",
    "pagination__root"
  ],
  [
    "list",
    "pagination__list"
  ],
  [
    "item",
    "pagination__item"
  ],
  [
    "prevTrigger",
    "pagination__prevTrigger"
  ],
  [
    "nextTrigger",
    "pagination__nextTrigger"
  ],
  [
    "ellipsis",
    "pagination__ellipsis"
  ]
]
const paginationSlotFns = /* @__PURE__ */ paginationSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, paginationDefaultVariants, getSlotCompoundVariant(paginationCompoundVariants, slotName))])

const paginationFn = memo((props = {}) => {
  return Object.fromEntries(paginationSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const paginationVariantKeys = [
  "size"
]
const getVariantProps = (variants) => ({ ...paginationDefaultVariants, ...compact(variants) })

export const pagination = /* @__PURE__ */ Object.assign(paginationFn, {
  __recipe__: false,
  __name__: 'pagination',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: paginationVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, paginationVariantKeys)
  },
  getVariantProps
})
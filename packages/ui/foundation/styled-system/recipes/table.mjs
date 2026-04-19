import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const tableDefaultVariants = {
  "density": "comfortable"
}
const tableCompoundVariants = []

const tableSlotNames = [
  [
    "root",
    "table__root"
  ],
  [
    "table",
    "table__table"
  ],
  [
    "caption",
    "table__caption"
  ],
  [
    "head",
    "table__head"
  ],
  [
    "body",
    "table__body"
  ],
  [
    "footer",
    "table__footer"
  ],
  [
    "row",
    "table__row"
  ],
  [
    "header",
    "table__header"
  ],
  [
    "cell",
    "table__cell"
  ],
  [
    "root",
    "table__root"
  ],
  [
    "table",
    "table__table"
  ],
  [
    "caption",
    "table__caption"
  ],
  [
    "head",
    "table__head"
  ],
  [
    "body",
    "table__body"
  ],
  [
    "footer",
    "table__footer"
  ],
  [
    "row",
    "table__row"
  ],
  [
    "header",
    "table__header"
  ],
  [
    "cell",
    "table__cell"
  ]
]
const tableSlotFns = /* @__PURE__ */ tableSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, tableDefaultVariants, getSlotCompoundVariant(tableCompoundVariants, slotName))])

const tableFn = memo((props = {}) => {
  return Object.fromEntries(tableSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const tableVariantKeys = [
  "density",
  "striped",
  "bordered"
]
const getVariantProps = (variants) => ({ ...tableDefaultVariants, ...compact(variants) })

export const table = /* @__PURE__ */ Object.assign(tableFn, {
  __recipe__: false,
  __name__: 'table',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: tableVariantKeys,
  variantMap: {
  "density": [
    "compact",
    "comfortable",
    "spacious"
  ],
  "striped": [
    "true"
  ],
  "bordered": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, tableVariantKeys)
  },
  getVariantProps
})
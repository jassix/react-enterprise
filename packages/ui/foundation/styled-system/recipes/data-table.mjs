import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const dataTableDefaultVariants = {
  "density": "comfortable"
}
const dataTableCompoundVariants = []

const dataTableSlotNames = [
  [
    "root",
    "data-table__root"
  ],
  [
    "toolbar",
    "data-table__toolbar"
  ],
  [
    "toolbarStart",
    "data-table__toolbarStart"
  ],
  [
    "toolbarEnd",
    "data-table__toolbarEnd"
  ],
  [
    "tableWrapper",
    "data-table__tableWrapper"
  ],
  [
    "table",
    "data-table__table"
  ],
  [
    "head",
    "data-table__head"
  ],
  [
    "headerRow",
    "data-table__headerRow"
  ],
  [
    "header",
    "data-table__header"
  ],
  [
    "headerSort",
    "data-table__headerSort"
  ],
  [
    "body",
    "data-table__body"
  ],
  [
    "row",
    "data-table__row"
  ],
  [
    "cell",
    "data-table__cell"
  ],
  [
    "footer",
    "data-table__footer"
  ],
  [
    "pagination",
    "data-table__pagination"
  ],
  [
    "empty",
    "data-table__empty"
  ],
  [
    "root",
    "data-table__root"
  ],
  [
    "toolbar",
    "data-table__toolbar"
  ],
  [
    "toolbarStart",
    "data-table__toolbarStart"
  ],
  [
    "toolbarEnd",
    "data-table__toolbarEnd"
  ],
  [
    "tableWrapper",
    "data-table__tableWrapper"
  ],
  [
    "table",
    "data-table__table"
  ],
  [
    "head",
    "data-table__head"
  ],
  [
    "headerRow",
    "data-table__headerRow"
  ],
  [
    "header",
    "data-table__header"
  ],
  [
    "headerSort",
    "data-table__headerSort"
  ],
  [
    "body",
    "data-table__body"
  ],
  [
    "row",
    "data-table__row"
  ],
  [
    "cell",
    "data-table__cell"
  ],
  [
    "footer",
    "data-table__footer"
  ],
  [
    "pagination",
    "data-table__pagination"
  ],
  [
    "empty",
    "data-table__empty"
  ]
]
const dataTableSlotFns = /* @__PURE__ */ dataTableSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, dataTableDefaultVariants, getSlotCompoundVariant(dataTableCompoundVariants, slotName))])

const dataTableFn = memo((props = {}) => {
  return Object.fromEntries(dataTableSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const dataTableVariantKeys = [
  "density",
  "striped"
]
const getVariantProps = (variants) => ({ ...dataTableDefaultVariants, ...compact(variants) })

export const dataTable = /* @__PURE__ */ Object.assign(dataTableFn, {
  __recipe__: false,
  __name__: 'dataTable',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: dataTableVariantKeys,
  variantMap: {
  "density": [
    "compact",
    "comfortable",
    "spacious"
  ],
  "striped": [
    "true"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, dataTableVariantKeys)
  },
  getVariantProps
})
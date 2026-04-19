import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const navigationMenuDefaultVariants = {
  "orientation": "horizontal"
}
const navigationMenuCompoundVariants = []

const navigationMenuSlotNames = [
  [
    "root",
    "navigation-menu__root"
  ],
  [
    "list",
    "navigation-menu__list"
  ],
  [
    "item",
    "navigation-menu__item"
  ],
  [
    "trigger",
    "navigation-menu__trigger"
  ],
  [
    "link",
    "navigation-menu__link"
  ],
  [
    "content",
    "navigation-menu__content"
  ],
  [
    "indicator",
    "navigation-menu__indicator"
  ],
  [
    "viewport",
    "navigation-menu__viewport"
  ],
  [
    "root",
    "navigation-menu__root"
  ],
  [
    "list",
    "navigation-menu__list"
  ],
  [
    "item",
    "navigation-menu__item"
  ],
  [
    "trigger",
    "navigation-menu__trigger"
  ],
  [
    "link",
    "navigation-menu__link"
  ],
  [
    "content",
    "navigation-menu__content"
  ],
  [
    "indicator",
    "navigation-menu__indicator"
  ],
  [
    "viewport",
    "navigation-menu__viewport"
  ]
]
const navigationMenuSlotFns = /* @__PURE__ */ navigationMenuSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, navigationMenuDefaultVariants, getSlotCompoundVariant(navigationMenuCompoundVariants, slotName))])

const navigationMenuFn = memo((props = {}) => {
  return Object.fromEntries(navigationMenuSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const navigationMenuVariantKeys = [
  "orientation"
]
const getVariantProps = (variants) => ({ ...navigationMenuDefaultVariants, ...compact(variants) })

export const navigationMenu = /* @__PURE__ */ Object.assign(navigationMenuFn, {
  __recipe__: false,
  __name__: 'navigationMenu',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: navigationMenuVariantKeys,
  variantMap: {
  "orientation": [
    "horizontal",
    "vertical"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, navigationMenuVariantKeys)
  },
  getVariantProps
})
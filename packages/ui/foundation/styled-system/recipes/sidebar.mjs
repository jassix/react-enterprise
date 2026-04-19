import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const sidebarDefaultVariants = {}
const sidebarCompoundVariants = []

const sidebarSlotNames = [
  [
    "provider",
    "sidebar__provider"
  ],
  [
    "wrapper",
    "sidebar__wrapper"
  ],
  [
    "root",
    "sidebar__root"
  ],
  [
    "gap",
    "sidebar__gap"
  ],
  [
    "container",
    "sidebar__container"
  ],
  [
    "inner",
    "sidebar__inner"
  ],
  [
    "trigger",
    "sidebar__trigger"
  ],
  [
    "rail",
    "sidebar__rail"
  ],
  [
    "inset",
    "sidebar__inset"
  ],
  [
    "input",
    "sidebar__input"
  ],
  [
    "header",
    "sidebar__header"
  ],
  [
    "footer",
    "sidebar__footer"
  ],
  [
    "separator",
    "sidebar__separator"
  ],
  [
    "content",
    "sidebar__content"
  ],
  [
    "group",
    "sidebar__group"
  ],
  [
    "groupLabel",
    "sidebar__groupLabel"
  ],
  [
    "groupAction",
    "sidebar__groupAction"
  ],
  [
    "groupContent",
    "sidebar__groupContent"
  ],
  [
    "menu",
    "sidebar__menu"
  ],
  [
    "menuItem",
    "sidebar__menuItem"
  ],
  [
    "menuButton",
    "sidebar__menuButton"
  ],
  [
    "menuAction",
    "sidebar__menuAction"
  ],
  [
    "menuBadge",
    "sidebar__menuBadge"
  ],
  [
    "menuSkeleton",
    "sidebar__menuSkeleton"
  ],
  [
    "menuSub",
    "sidebar__menuSub"
  ],
  [
    "menuSubItem",
    "sidebar__menuSubItem"
  ],
  [
    "menuSubButton",
    "sidebar__menuSubButton"
  ],
  [
    "provider",
    "sidebar__provider"
  ],
  [
    "wrapper",
    "sidebar__wrapper"
  ],
  [
    "root",
    "sidebar__root"
  ],
  [
    "gap",
    "sidebar__gap"
  ],
  [
    "container",
    "sidebar__container"
  ],
  [
    "inner",
    "sidebar__inner"
  ],
  [
    "trigger",
    "sidebar__trigger"
  ],
  [
    "rail",
    "sidebar__rail"
  ],
  [
    "inset",
    "sidebar__inset"
  ],
  [
    "input",
    "sidebar__input"
  ],
  [
    "header",
    "sidebar__header"
  ],
  [
    "footer",
    "sidebar__footer"
  ],
  [
    "separator",
    "sidebar__separator"
  ],
  [
    "content",
    "sidebar__content"
  ],
  [
    "group",
    "sidebar__group"
  ],
  [
    "groupLabel",
    "sidebar__groupLabel"
  ],
  [
    "groupAction",
    "sidebar__groupAction"
  ],
  [
    "groupContent",
    "sidebar__groupContent"
  ],
  [
    "menu",
    "sidebar__menu"
  ],
  [
    "menuItem",
    "sidebar__menuItem"
  ],
  [
    "menuButton",
    "sidebar__menuButton"
  ],
  [
    "menuAction",
    "sidebar__menuAction"
  ],
  [
    "menuBadge",
    "sidebar__menuBadge"
  ],
  [
    "menuSkeleton",
    "sidebar__menuSkeleton"
  ],
  [
    "menuSub",
    "sidebar__menuSub"
  ],
  [
    "menuSubItem",
    "sidebar__menuSubItem"
  ],
  [
    "menuSubButton",
    "sidebar__menuSubButton"
  ]
]
const sidebarSlotFns = /* @__PURE__ */ sidebarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, sidebarDefaultVariants, getSlotCompoundVariant(sidebarCompoundVariants, slotName))])

const sidebarFn = memo((props = {}) => {
  return Object.fromEntries(sidebarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const sidebarVariantKeys = []
const getVariantProps = (variants) => ({ ...sidebarDefaultVariants, ...compact(variants) })

export const sidebar = /* @__PURE__ */ Object.assign(sidebarFn, {
  __recipe__: false,
  __name__: 'sidebar',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: sidebarVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, sidebarVariantKeys)
  },
  getVariantProps
})
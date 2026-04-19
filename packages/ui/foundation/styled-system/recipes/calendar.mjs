import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const calendarDefaultVariants = {
  "size": "md",
  "variant": "default"
}
const calendarCompoundVariants = []

const calendarSlotNames = [
  [
    "root",
    "calendar__root"
  ],
  [
    "header",
    "calendar__header"
  ],
  [
    "heading",
    "calendar__heading"
  ],
  [
    "prevTrigger",
    "calendar__prevTrigger"
  ],
  [
    "nextTrigger",
    "calendar__nextTrigger"
  ],
  [
    "viewTrigger",
    "calendar__viewTrigger"
  ],
  [
    "grid",
    "calendar__grid"
  ],
  [
    "rowHeader",
    "calendar__rowHeader"
  ],
  [
    "row",
    "calendar__row"
  ],
  [
    "cell",
    "calendar__cell"
  ],
  [
    "cellTrigger",
    "calendar__cellTrigger"
  ],
  [
    "root",
    "calendar__root"
  ],
  [
    "header",
    "calendar__header"
  ],
  [
    "heading",
    "calendar__heading"
  ],
  [
    "prevTrigger",
    "calendar__prevTrigger"
  ],
  [
    "nextTrigger",
    "calendar__nextTrigger"
  ],
  [
    "viewTrigger",
    "calendar__viewTrigger"
  ],
  [
    "grid",
    "calendar__grid"
  ],
  [
    "rowHeader",
    "calendar__rowHeader"
  ],
  [
    "row",
    "calendar__row"
  ],
  [
    "cell",
    "calendar__cell"
  ],
  [
    "cellTrigger",
    "calendar__cellTrigger"
  ]
]
const calendarSlotFns = /* @__PURE__ */ calendarSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, calendarDefaultVariants, getSlotCompoundVariant(calendarCompoundVariants, slotName))])

const calendarFn = memo((props = {}) => {
  return Object.fromEntries(calendarSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const calendarVariantKeys = [
  "size",
  "variant"
]
const getVariantProps = (variants) => ({ ...calendarDefaultVariants, ...compact(variants) })

export const calendar = /* @__PURE__ */ Object.assign(calendarFn, {
  __recipe__: false,
  __name__: 'calendar',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: calendarVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "variant": [
    "default",
    "bordered"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, calendarVariantKeys)
  },
  getVariantProps
})
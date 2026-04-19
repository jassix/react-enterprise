import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const inputGroupDefaultVariants = {
  "variant": "outline",
  "size": "md"
}
const inputGroupCompoundVariants = []

const inputGroupSlotNames = [
  [
    "root",
    "input-group__root"
  ],
  [
    "input",
    "input-group__input"
  ],
  [
    "startAddon",
    "input-group__startAddon"
  ],
  [
    "endAddon",
    "input-group__endAddon"
  ],
  [
    "startElement",
    "input-group__startElement"
  ],
  [
    "endElement",
    "input-group__endElement"
  ],
  [
    "root",
    "input-group__root"
  ],
  [
    "input",
    "input-group__input"
  ],
  [
    "startAddon",
    "input-group__startAddon"
  ],
  [
    "endAddon",
    "input-group__endAddon"
  ],
  [
    "startElement",
    "input-group__startElement"
  ],
  [
    "endElement",
    "input-group__endElement"
  ]
]
const inputGroupSlotFns = /* @__PURE__ */ inputGroupSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, inputGroupDefaultVariants, getSlotCompoundVariant(inputGroupCompoundVariants, slotName))])

const inputGroupFn = memo((props = {}) => {
  return Object.fromEntries(inputGroupSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const inputGroupVariantKeys = [
  "variant",
  "size"
]
const getVariantProps = (variants) => ({ ...inputGroupDefaultVariants, ...compact(variants) })

export const inputGroup = /* @__PURE__ */ Object.assign(inputGroupFn, {
  __recipe__: false,
  __name__: 'inputGroup',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: inputGroupVariantKeys,
  variantMap: {
  "variant": [
    "outline",
    "filled",
    "flushed"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, inputGroupVariantKeys)
  },
  getVariantProps
})
import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const sliderDefaultVariants = {
  "size": "md",
  "intent": "primary"
}
const sliderCompoundVariants = []

const sliderSlotNames = [
  [
    "root",
    "slider__root"
  ],
  [
    "label",
    "slider__label"
  ],
  [
    "control",
    "slider__control"
  ],
  [
    "track",
    "slider__track"
  ],
  [
    "range",
    "slider__range"
  ],
  [
    "thumb",
    "slider__thumb"
  ],
  [
    "valueText",
    "slider__valueText"
  ],
  [
    "markerGroup",
    "slider__markerGroup"
  ],
  [
    "marker",
    "slider__marker"
  ],
  [
    "root",
    "slider__root"
  ],
  [
    "label",
    "slider__label"
  ],
  [
    "control",
    "slider__control"
  ],
  [
    "track",
    "slider__track"
  ],
  [
    "range",
    "slider__range"
  ],
  [
    "thumb",
    "slider__thumb"
  ],
  [
    "valueText",
    "slider__valueText"
  ],
  [
    "markerGroup",
    "slider__markerGroup"
  ],
  [
    "marker",
    "slider__marker"
  ]
]
const sliderSlotFns = /* @__PURE__ */ sliderSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, sliderDefaultVariants, getSlotCompoundVariant(sliderCompoundVariants, slotName))])

const sliderFn = memo((props = {}) => {
  return Object.fromEntries(sliderSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const sliderVariantKeys = [
  "size",
  "intent"
]
const getVariantProps = (variants) => ({ ...sliderDefaultVariants, ...compact(variants) })

export const slider = /* @__PURE__ */ Object.assign(sliderFn, {
  __recipe__: false,
  __name__: 'slider',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: sliderVariantKeys,
  variantMap: {
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "intent": [
    "primary",
    "critical",
    "positive"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, sliderVariantKeys)
  },
  getVariantProps
})
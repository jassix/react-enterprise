import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const chartDefaultVariants = {}
const chartCompoundVariants = []

const chartSlotNames = [
  [
    "container",
    "chart__container"
  ],
  [
    "tooltip",
    "chart__tooltip"
  ],
  [
    "tooltipLabel",
    "chart__tooltipLabel"
  ],
  [
    "tooltipRow",
    "chart__tooltipRow"
  ],
  [
    "indicator",
    "chart__indicator"
  ],
  [
    "legend",
    "chart__legend"
  ],
  [
    "legendItem",
    "chart__legendItem"
  ],
  [
    "container",
    "chart__container"
  ],
  [
    "tooltip",
    "chart__tooltip"
  ],
  [
    "tooltipLabel",
    "chart__tooltipLabel"
  ],
  [
    "tooltipRow",
    "chart__tooltipRow"
  ],
  [
    "indicator",
    "chart__indicator"
  ],
  [
    "legend",
    "chart__legend"
  ],
  [
    "legendItem",
    "chart__legendItem"
  ]
]
const chartSlotFns = /* @__PURE__ */ chartSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, chartDefaultVariants, getSlotCompoundVariant(chartCompoundVariants, slotName))])

const chartFn = memo((props = {}) => {
  return Object.fromEntries(chartSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const chartVariantKeys = []
const getVariantProps = (variants) => ({ ...chartDefaultVariants, ...compact(variants) })

export const chart = /* @__PURE__ */ Object.assign(chartFn, {
  __recipe__: false,
  __name__: 'chart',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: chartVariantKeys,
  variantMap: {},
  splitVariantProps(props) {
    return splitProps(props, chartVariantKeys)
  },
  getVariantProps
})
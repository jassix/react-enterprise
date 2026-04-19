import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const progressDefaultVariants = {
  "size": "md",
  "intent": "primary",
  "variant": "linear"
}
const progressCompoundVariants = [
  {
    "intent": "critical",
    "css": {
      "range": {
        "bg": "{colors.critical.accent}"
      }
    }
  },
  {
    "intent": "positive",
    "css": {
      "range": {
        "bg": "{colors.positive.accent}"
      }
    }
  },
  {
    "intent": "caution",
    "css": {
      "range": {
        "bg": "{colors.caution.accent}"
      }
    }
  },
  {
    "intent": "info",
    "css": {
      "range": {
        "bg": "{colors.info.accent}"
      }
    }
  },
  {
    "intent": "critical",
    "css": {
      "range": {
        "bg": "{colors.critical.accent}"
      }
    }
  },
  {
    "intent": "positive",
    "css": {
      "range": {
        "bg": "{colors.positive.accent}"
      }
    }
  },
  {
    "intent": "caution",
    "css": {
      "range": {
        "bg": "{colors.caution.accent}"
      }
    }
  },
  {
    "intent": "info",
    "css": {
      "range": {
        "bg": "{colors.info.accent}"
      }
    }
  }
]

const progressSlotNames = [
  [
    "root",
    "progress__root"
  ],
  [
    "label",
    "progress__label"
  ],
  [
    "track",
    "progress__track"
  ],
  [
    "range",
    "progress__range"
  ],
  [
    "valueText",
    "progress__valueText"
  ],
  [
    "root",
    "progress__root"
  ],
  [
    "label",
    "progress__label"
  ],
  [
    "track",
    "progress__track"
  ],
  [
    "range",
    "progress__range"
  ],
  [
    "valueText",
    "progress__valueText"
  ]
]
const progressSlotFns = /* @__PURE__ */ progressSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, progressDefaultVariants, getSlotCompoundVariant(progressCompoundVariants, slotName))])

const progressFn = memo((props = {}) => {
  return Object.fromEntries(progressSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const progressVariantKeys = [
  "size",
  "intent",
  "variant"
]
const getVariantProps = (variants) => ({ ...progressDefaultVariants, ...compact(variants) })

export const progress = /* @__PURE__ */ Object.assign(progressFn, {
  __recipe__: false,
  __name__: 'progress',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: progressVariantKeys,
  variantMap: {
  "size": [
    "xs",
    "sm",
    "md",
    "lg"
  ],
  "intent": [
    "primary",
    "critical",
    "positive",
    "caution",
    "info"
  ],
  "variant": [
    "linear",
    "striped"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, progressVariantKeys)
  },
  getVariantProps
})
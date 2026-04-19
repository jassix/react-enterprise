import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const radioGroupDefaultVariants = {
  "size": "md",
  "intent": "primary"
}
const radioGroupCompoundVariants = [
  {
    "intent": "critical",
    "css": {
      "itemControl": {
        "_checked": {
          "bg": "{colors.critical.accent}",
          "borderColor": "{colors.critical.accent}"
        }
      }
    }
  },
  {
    "intent": "positive",
    "css": {
      "itemControl": {
        "_checked": {
          "bg": "{colors.positive.accent}",
          "borderColor": "{colors.positive.accent}"
        }
      }
    }
  },
  {
    "intent": "caution",
    "css": {
      "itemControl": {
        "_checked": {
          "bg": "{colors.caution.accent}",
          "borderColor": "{colors.caution.accent}"
        }
      }
    }
  },
  {
    "intent": "info",
    "css": {
      "itemControl": {
        "_checked": {
          "bg": "{colors.info.accent}",
          "borderColor": "{colors.info.accent}"
        }
      }
    }
  },
  {
    "intent": "critical",
    "css": {
      "itemControl": {
        "_checked": {
          "bg": "{colors.critical.accent}",
          "borderColor": "{colors.critical.accent}"
        }
      }
    }
  },
  {
    "intent": "positive",
    "css": {
      "itemControl": {
        "_checked": {
          "bg": "{colors.positive.accent}",
          "borderColor": "{colors.positive.accent}"
        }
      }
    }
  },
  {
    "intent": "caution",
    "css": {
      "itemControl": {
        "_checked": {
          "bg": "{colors.caution.accent}",
          "borderColor": "{colors.caution.accent}"
        }
      }
    }
  },
  {
    "intent": "info",
    "css": {
      "itemControl": {
        "_checked": {
          "bg": "{colors.info.accent}",
          "borderColor": "{colors.info.accent}"
        }
      }
    }
  }
]

const radioGroupSlotNames = [
  [
    "root",
    "radio-group__root"
  ],
  [
    "label",
    "radio-group__label"
  ],
  [
    "item",
    "radio-group__item"
  ],
  [
    "itemText",
    "radio-group__itemText"
  ],
  [
    "itemControl",
    "radio-group__itemControl"
  ],
  [
    "indicator",
    "radio-group__indicator"
  ],
  [
    "root",
    "radio-group__root"
  ],
  [
    "label",
    "radio-group__label"
  ],
  [
    "item",
    "radio-group__item"
  ],
  [
    "itemText",
    "radio-group__itemText"
  ],
  [
    "itemControl",
    "radio-group__itemControl"
  ],
  [
    "indicator",
    "radio-group__indicator"
  ]
]
const radioGroupSlotFns = /* @__PURE__ */ radioGroupSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, radioGroupDefaultVariants, getSlotCompoundVariant(radioGroupCompoundVariants, slotName))])

const radioGroupFn = memo((props = {}) => {
  return Object.fromEntries(radioGroupSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const radioGroupVariantKeys = [
  "size",
  "intent"
]
const getVariantProps = (variants) => ({ ...radioGroupDefaultVariants, ...compact(variants) })

export const radioGroup = /* @__PURE__ */ Object.assign(radioGroupFn, {
  __recipe__: false,
  __name__: 'radioGroup',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: radioGroupVariantKeys,
  variantMap: {
  "size": [
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
  ]
},
  splitVariantProps(props) {
    return splitProps(props, radioGroupVariantKeys)
  },
  getVariantProps
})
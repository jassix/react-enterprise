import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const toastDefaultVariants = {
  "status": "neutral",
  "variant": "subtle"
}
const toastCompoundVariants = [
  {
    "variant": "solid",
    "status": "info",
    "css": {
      "root": {
        "bg": "{colors.info}",
        "color": "white",
        "borderColor": "{colors.info}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "positive",
    "css": {
      "root": {
        "bg": "{colors.positive}",
        "color": "white",
        "borderColor": "{colors.positive}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "caution",
    "css": {
      "root": {
        "bg": "{colors.caution}",
        "color": "{colors.caution.text}",
        "borderColor": "{colors.caution}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "critical",
    "css": {
      "root": {
        "bg": "{colors.critical}",
        "color": "white",
        "borderColor": "{colors.critical}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "info",
    "css": {
      "root": {
        "bg": "{colors.info}",
        "color": "white",
        "borderColor": "{colors.info}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "positive",
    "css": {
      "root": {
        "bg": "{colors.positive}",
        "color": "white",
        "borderColor": "{colors.positive}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "caution",
    "css": {
      "root": {
        "bg": "{colors.caution}",
        "color": "{colors.caution.text}",
        "borderColor": "{colors.caution}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "critical",
    "css": {
      "root": {
        "bg": "{colors.critical}",
        "color": "white",
        "borderColor": "{colors.critical}"
      }
    }
  }
]

const toastSlotNames = [
  [
    "root",
    "toast__root"
  ],
  [
    "title",
    "toast__title"
  ],
  [
    "description",
    "toast__description"
  ],
  [
    "actionTrigger",
    "toast__actionTrigger"
  ],
  [
    "closeTrigger",
    "toast__closeTrigger"
  ],
  [
    "root",
    "toast__root"
  ],
  [
    "title",
    "toast__title"
  ],
  [
    "description",
    "toast__description"
  ],
  [
    "actionTrigger",
    "toast__actionTrigger"
  ],
  [
    "closeTrigger",
    "toast__closeTrigger"
  ]
]
const toastSlotFns = /* @__PURE__ */ toastSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, toastDefaultVariants, getSlotCompoundVariant(toastCompoundVariants, slotName))])

const toastFn = memo((props = {}) => {
  return Object.fromEntries(toastSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const toastVariantKeys = [
  "status",
  "variant"
]
const getVariantProps = (variants) => ({ ...toastDefaultVariants, ...compact(variants) })

export const toast = /* @__PURE__ */ Object.assign(toastFn, {
  __recipe__: false,
  __name__: 'toast',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: toastVariantKeys,
  variantMap: {
  "status": [
    "neutral",
    "info",
    "positive",
    "caution",
    "critical"
  ],
  "variant": [
    "subtle",
    "solid",
    "outline"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, toastVariantKeys)
  },
  getVariantProps
})
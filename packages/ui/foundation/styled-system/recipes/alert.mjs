import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const alertDefaultVariants = {
  "variant": "default"
}
const alertCompoundVariants = [
  {
    "variant": "subtle",
    "status": "info",
    "css": {
      "root": {
        "bg": "{colors.info.bg}",
        "color": "{colors.info.text}"
      }
    }
  },
  {
    "variant": "subtle",
    "status": "positive",
    "css": {
      "root": {
        "bg": "{colors.positive.bg}",
        "color": "{colors.positive.text}"
      }
    }
  },
  {
    "variant": "subtle",
    "status": "caution",
    "css": {
      "root": {
        "bg": "{colors.caution.bg}",
        "color": "{colors.caution.text}"
      }
    }
  },
  {
    "variant": "subtle",
    "status": "critical",
    "css": {
      "root": {
        "bg": "{colors.critical.bg}",
        "color": "{colors.critical.text}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "info",
    "css": {
      "root": {
        "bg": "{colors.info.accent}",
        "color": "{colors.foreground.inverse}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "positive",
    "css": {
      "root": {
        "bg": "{colors.positive.accent}",
        "color": "{colors.foreground.inverse}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "caution",
    "css": {
      "root": {
        "bg": "{colors.caution.accent}",
        "color": "{colors.foreground}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "critical",
    "css": {
      "root": {
        "bg": "{colors.critical.accent}",
        "color": "{colors.foreground.inverse}"
      }
    }
  },
  {
    "variant": "outline",
    "status": "info",
    "css": {
      "root": {
        "borderColor": "{colors.border.info}",
        "color": "{colors.info.text}"
      }
    }
  },
  {
    "variant": "outline",
    "status": "positive",
    "css": {
      "root": {
        "borderColor": "{colors.border.positive}",
        "color": "{colors.positive.text}"
      }
    }
  },
  {
    "variant": "outline",
    "status": "caution",
    "css": {
      "root": {
        "borderColor": "{colors.border.caution}",
        "color": "{colors.caution.text}"
      }
    }
  },
  {
    "variant": "outline",
    "status": "critical",
    "css": {
      "root": {
        "borderColor": "{colors.border.critical}",
        "color": "{colors.critical.text}"
      }
    }
  },
  {
    "variant": "subtle",
    "status": "info",
    "css": {
      "root": {
        "bg": "{colors.info.bg}",
        "color": "{colors.info.text}"
      }
    }
  },
  {
    "variant": "subtle",
    "status": "positive",
    "css": {
      "root": {
        "bg": "{colors.positive.bg}",
        "color": "{colors.positive.text}"
      }
    }
  },
  {
    "variant": "subtle",
    "status": "caution",
    "css": {
      "root": {
        "bg": "{colors.caution.bg}",
        "color": "{colors.caution.text}"
      }
    }
  },
  {
    "variant": "subtle",
    "status": "critical",
    "css": {
      "root": {
        "bg": "{colors.critical.bg}",
        "color": "{colors.critical.text}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "info",
    "css": {
      "root": {
        "bg": "{colors.info.accent}",
        "color": "{colors.foreground.inverse}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "positive",
    "css": {
      "root": {
        "bg": "{colors.positive.accent}",
        "color": "{colors.foreground.inverse}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "caution",
    "css": {
      "root": {
        "bg": "{colors.caution.accent}",
        "color": "{colors.foreground}"
      }
    }
  },
  {
    "variant": "solid",
    "status": "critical",
    "css": {
      "root": {
        "bg": "{colors.critical.accent}",
        "color": "{colors.foreground.inverse}"
      }
    }
  },
  {
    "variant": "outline",
    "status": "info",
    "css": {
      "root": {
        "borderColor": "{colors.border.info}",
        "color": "{colors.info.text}"
      }
    }
  },
  {
    "variant": "outline",
    "status": "positive",
    "css": {
      "root": {
        "borderColor": "{colors.border.positive}",
        "color": "{colors.positive.text}"
      }
    }
  },
  {
    "variant": "outline",
    "status": "caution",
    "css": {
      "root": {
        "borderColor": "{colors.border.caution}",
        "color": "{colors.caution.text}"
      }
    }
  },
  {
    "variant": "outline",
    "status": "critical",
    "css": {
      "root": {
        "borderColor": "{colors.border.critical}",
        "color": "{colors.critical.text}"
      }
    }
  }
]

const alertSlotNames = [
  [
    "root",
    "alert__root"
  ],
  [
    "title",
    "alert__title"
  ],
  [
    "description",
    "alert__description"
  ],
  [
    "action",
    "alert__action"
  ],
  [
    "root",
    "alert__root"
  ],
  [
    "title",
    "alert__title"
  ],
  [
    "description",
    "alert__description"
  ],
  [
    "action",
    "alert__action"
  ]
]
const alertSlotFns = /* @__PURE__ */ alertSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, alertDefaultVariants, getSlotCompoundVariant(alertCompoundVariants, slotName))])

const alertFn = memo((props = {}) => {
  return Object.fromEntries(alertSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const alertVariantKeys = [
  "variant",
  "status"
]
const getVariantProps = (variants) => ({ ...alertDefaultVariants, ...compact(variants) })

export const alert = /* @__PURE__ */ Object.assign(alertFn, {
  __recipe__: false,
  __name__: 'alert',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: alertVariantKeys,
  variantMap: {
  "variant": [
    "default",
    "destructive",
    "subtle",
    "solid",
    "outline"
  ],
  "status": [
    "info",
    "positive",
    "caution",
    "critical"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, alertVariantKeys)
  },
  getVariantProps
})
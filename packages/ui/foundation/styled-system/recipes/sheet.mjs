import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const sheetDefaultVariants = {
  "side": "right",
  "size": "md"
}
const sheetCompoundVariants = [
  {
    "side": "left",
    "size": "sm",
    "css": {
      "content": {
        "width": "20rem"
      }
    }
  },
  {
    "side": "left",
    "size": "md",
    "css": {
      "content": {
        "width": "24rem"
      }
    }
  },
  {
    "side": "left",
    "size": "lg",
    "css": {
      "content": {
        "width": "32rem"
      }
    }
  },
  {
    "side": "left",
    "size": "xl",
    "css": {
      "content": {
        "width": "40rem"
      }
    }
  },
  {
    "side": "right",
    "size": "sm",
    "css": {
      "content": {
        "width": "20rem"
      }
    }
  },
  {
    "side": "right",
    "size": "md",
    "css": {
      "content": {
        "width": "24rem"
      }
    }
  },
  {
    "side": "right",
    "size": "lg",
    "css": {
      "content": {
        "width": "32rem"
      }
    }
  },
  {
    "side": "right",
    "size": "xl",
    "css": {
      "content": {
        "width": "40rem"
      }
    }
  },
  {
    "side": "top",
    "size": "sm",
    "css": {
      "content": {
        "height": "20vh"
      }
    }
  },
  {
    "side": "top",
    "size": "md",
    "css": {
      "content": {
        "height": "40vh"
      }
    }
  },
  {
    "side": "top",
    "size": "lg",
    "css": {
      "content": {
        "height": "60vh"
      }
    }
  },
  {
    "side": "top",
    "size": "xl",
    "css": {
      "content": {
        "height": "80vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "sm",
    "css": {
      "content": {
        "height": "20vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "md",
    "css": {
      "content": {
        "height": "40vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "lg",
    "css": {
      "content": {
        "height": "60vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "xl",
    "css": {
      "content": {
        "height": "80vh"
      }
    }
  },
  {
    "side": "left",
    "size": "sm",
    "css": {
      "content": {
        "width": "20rem"
      }
    }
  },
  {
    "side": "left",
    "size": "md",
    "css": {
      "content": {
        "width": "24rem"
      }
    }
  },
  {
    "side": "left",
    "size": "lg",
    "css": {
      "content": {
        "width": "32rem"
      }
    }
  },
  {
    "side": "left",
    "size": "xl",
    "css": {
      "content": {
        "width": "40rem"
      }
    }
  },
  {
    "side": "right",
    "size": "sm",
    "css": {
      "content": {
        "width": "20rem"
      }
    }
  },
  {
    "side": "right",
    "size": "md",
    "css": {
      "content": {
        "width": "24rem"
      }
    }
  },
  {
    "side": "right",
    "size": "lg",
    "css": {
      "content": {
        "width": "32rem"
      }
    }
  },
  {
    "side": "right",
    "size": "xl",
    "css": {
      "content": {
        "width": "40rem"
      }
    }
  },
  {
    "side": "top",
    "size": "sm",
    "css": {
      "content": {
        "height": "20vh"
      }
    }
  },
  {
    "side": "top",
    "size": "md",
    "css": {
      "content": {
        "height": "40vh"
      }
    }
  },
  {
    "side": "top",
    "size": "lg",
    "css": {
      "content": {
        "height": "60vh"
      }
    }
  },
  {
    "side": "top",
    "size": "xl",
    "css": {
      "content": {
        "height": "80vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "sm",
    "css": {
      "content": {
        "height": "20vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "md",
    "css": {
      "content": {
        "height": "40vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "lg",
    "css": {
      "content": {
        "height": "60vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "xl",
    "css": {
      "content": {
        "height": "80vh"
      }
    }
  }
]

const sheetSlotNames = [
  [
    "backdrop",
    "sheet__backdrop"
  ],
  [
    "positioner",
    "sheet__positioner"
  ],
  [
    "content",
    "sheet__content"
  ],
  [
    "header",
    "sheet__header"
  ],
  [
    "title",
    "sheet__title"
  ],
  [
    "description",
    "sheet__description"
  ],
  [
    "body",
    "sheet__body"
  ],
  [
    "footer",
    "sheet__footer"
  ],
  [
    "closeTrigger",
    "sheet__closeTrigger"
  ],
  [
    "backdrop",
    "sheet__backdrop"
  ],
  [
    "positioner",
    "sheet__positioner"
  ],
  [
    "content",
    "sheet__content"
  ],
  [
    "header",
    "sheet__header"
  ],
  [
    "title",
    "sheet__title"
  ],
  [
    "description",
    "sheet__description"
  ],
  [
    "body",
    "sheet__body"
  ],
  [
    "footer",
    "sheet__footer"
  ],
  [
    "closeTrigger",
    "sheet__closeTrigger"
  ]
]
const sheetSlotFns = /* @__PURE__ */ sheetSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, sheetDefaultVariants, getSlotCompoundVariant(sheetCompoundVariants, slotName))])

const sheetFn = memo((props = {}) => {
  return Object.fromEntries(sheetSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const sheetVariantKeys = [
  "side",
  "size"
]
const getVariantProps = (variants) => ({ ...sheetDefaultVariants, ...compact(variants) })

export const sheet = /* @__PURE__ */ Object.assign(sheetFn, {
  __recipe__: false,
  __name__: 'sheet',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: sheetVariantKeys,
  variantMap: {
  "side": [
    "left",
    "right",
    "top",
    "bottom"
  ],
  "size": [
    "sm",
    "md",
    "lg",
    "xl",
    "full"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, sheetVariantKeys)
  },
  getVariantProps
})
import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const drawerDefaultVariants = {
  "side": "bottom",
  "size": "md"
}
const drawerCompoundVariants = [
  {
    "side": "bottom",
    "size": "sm",
    "css": {
      "content": {
        "maxHeight": "40vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "md",
    "css": {
      "content": {
        "maxHeight": "60vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "lg",
    "css": {
      "content": {
        "maxHeight": "85vh"
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
    "side": "bottom",
    "size": "sm",
    "css": {
      "content": {
        "maxHeight": "40vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "md",
    "css": {
      "content": {
        "maxHeight": "60vh"
      }
    }
  },
  {
    "side": "bottom",
    "size": "lg",
    "css": {
      "content": {
        "maxHeight": "85vh"
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
  }
]

const drawerSlotNames = [
  [
    "backdrop",
    "drawer__backdrop"
  ],
  [
    "positioner",
    "drawer__positioner"
  ],
  [
    "content",
    "drawer__content"
  ],
  [
    "handle",
    "drawer__handle"
  ],
  [
    "header",
    "drawer__header"
  ],
  [
    "title",
    "drawer__title"
  ],
  [
    "description",
    "drawer__description"
  ],
  [
    "body",
    "drawer__body"
  ],
  [
    "footer",
    "drawer__footer"
  ],
  [
    "closeTrigger",
    "drawer__closeTrigger"
  ],
  [
    "backdrop",
    "drawer__backdrop"
  ],
  [
    "positioner",
    "drawer__positioner"
  ],
  [
    "content",
    "drawer__content"
  ],
  [
    "handle",
    "drawer__handle"
  ],
  [
    "header",
    "drawer__header"
  ],
  [
    "title",
    "drawer__title"
  ],
  [
    "description",
    "drawer__description"
  ],
  [
    "body",
    "drawer__body"
  ],
  [
    "footer",
    "drawer__footer"
  ],
  [
    "closeTrigger",
    "drawer__closeTrigger"
  ]
]
const drawerSlotFns = /* @__PURE__ */ drawerSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, drawerDefaultVariants, getSlotCompoundVariant(drawerCompoundVariants, slotName))])

const drawerFn = memo((props = {}) => {
  return Object.fromEntries(drawerSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const drawerVariantKeys = [
  "side",
  "size"
]
const getVariantProps = (variants) => ({ ...drawerDefaultVariants, ...compact(variants) })

export const drawer = /* @__PURE__ */ Object.assign(drawerFn, {
  __recipe__: false,
  __name__: 'drawer',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: drawerVariantKeys,
  variantMap: {
  "side": [
    "bottom",
    "top",
    "left",
    "right"
  ],
  "size": [
    "sm",
    "md",
    "lg",
    "full"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, drawerVariantKeys)
  },
  getVariantProps
})
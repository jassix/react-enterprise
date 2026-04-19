import { compact, getSlotCompoundVariant, memo, splitProps } from '../helpers.mjs';
import { createRecipe } from './create-recipe.mjs';

const toggleGroupDefaultVariants = {
  "orientation": "horizontal",
  "variant": "default",
  "attached": true
}
const toggleGroupCompoundVariants = [
  {
    "orientation": "horizontal",
    "attached": true,
    "css": {
      "item": {
        "&:first-child": {
          "borderTopLeftRadius": "{radii.3xl}",
          "borderBottomLeftRadius": "{radii.3xl}"
        },
        "&:last-child": {
          "borderTopRightRadius": "{radii.3xl}",
          "borderBottomRightRadius": "{radii.3xl}"
        }
      }
    }
  },
  {
    "orientation": "vertical",
    "attached": true,
    "css": {
      "item": {
        "&:first-child": {
          "borderTopLeftRadius": "{radii.3xl}",
          "borderTopRightRadius": "{radii.3xl}"
        },
        "&:last-child": {
          "borderBottomLeftRadius": "{radii.3xl}",
          "borderBottomRightRadius": "{radii.3xl}"
        }
      }
    }
  },
  {
    "variant": "outline",
    "attached": true,
    "orientation": "horizontal",
    "css": {
      "item": {
        "borderInlineStartWidth": "0",
        "&:first-child": {
          "borderInlineStartWidth": "1px"
        }
      }
    }
  },
  {
    "variant": "outline",
    "attached": true,
    "orientation": "vertical",
    "css": {
      "item": {
        "borderBlockStartWidth": "0",
        "&:first-child": {
          "borderBlockStartWidth": "1px"
        }
      }
    }
  },
  {
    "orientation": "horizontal",
    "attached": true,
    "css": {
      "item": {
        "&:first-child": {
          "borderTopLeftRadius": "{radii.3xl}",
          "borderBottomLeftRadius": "{radii.3xl}"
        },
        "&:last-child": {
          "borderTopRightRadius": "{radii.3xl}",
          "borderBottomRightRadius": "{radii.3xl}"
        }
      }
    }
  },
  {
    "orientation": "vertical",
    "attached": true,
    "css": {
      "item": {
        "&:first-child": {
          "borderTopLeftRadius": "{radii.3xl}",
          "borderTopRightRadius": "{radii.3xl}"
        },
        "&:last-child": {
          "borderBottomLeftRadius": "{radii.3xl}",
          "borderBottomRightRadius": "{radii.3xl}"
        }
      }
    }
  },
  {
    "variant": "outline",
    "attached": true,
    "orientation": "horizontal",
    "css": {
      "item": {
        "borderInlineStartWidth": "0",
        "&:first-child": {
          "borderInlineStartWidth": "1px"
        }
      }
    }
  },
  {
    "variant": "outline",
    "attached": true,
    "orientation": "vertical",
    "css": {
      "item": {
        "borderBlockStartWidth": "0",
        "&:first-child": {
          "borderBlockStartWidth": "1px"
        }
      }
    }
  }
]

const toggleGroupSlotNames = [
  [
    "root",
    "toggle-group__root"
  ],
  [
    "item",
    "toggle-group__item"
  ],
  [
    "root",
    "toggle-group__root"
  ],
  [
    "item",
    "toggle-group__item"
  ]
]
const toggleGroupSlotFns = /* @__PURE__ */ toggleGroupSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, toggleGroupDefaultVariants, getSlotCompoundVariant(toggleGroupCompoundVariants, slotName))])

const toggleGroupFn = memo((props = {}) => {
  return Object.fromEntries(toggleGroupSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]))
})

const toggleGroupVariantKeys = [
  "orientation",
  "variant",
  "attached"
]
const getVariantProps = (variants) => ({ ...toggleGroupDefaultVariants, ...compact(variants) })

export const toggleGroup = /* @__PURE__ */ Object.assign(toggleGroupFn, {
  __recipe__: false,
  __name__: 'toggleGroup',
  raw: (props) => props,
  classNameMap: {},
  variantKeys: toggleGroupVariantKeys,
  variantMap: {
  "orientation": [
    "horizontal",
    "vertical"
  ],
  "variant": [
    "default",
    "outline"
  ],
  "attached": [
    "true",
    "false"
  ]
},
  splitVariantProps(props) {
    return splitProps(props, toggleGroupVariantKeys)
  },
  getVariantProps
})
import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const toggleSwitchFn = /* @__PURE__ */ createRecipe('toggle-switch', {
  "size": "md",
  "intent": "primary"
}, [
  {
    "intent": "critical",
    "css": {
      "_checked": {
        "bg": "{colors.critical.accent}",
        "borderColor": "{colors.critical.accent}"
      }
    }
  },
  {
    "intent": "positive",
    "css": {
      "_checked": {
        "bg": "{colors.positive.accent}",
        "borderColor": "{colors.positive.accent}"
      }
    }
  },
  {
    "intent": "caution",
    "css": {
      "_checked": {
        "bg": "{colors.caution.accent}",
        "borderColor": "{colors.caution.accent}"
      }
    }
  },
  {
    "intent": "info",
    "css": {
      "_checked": {
        "bg": "{colors.info.accent}",
        "borderColor": "{colors.info.accent}"
      }
    }
  },
  {
    "intent": "critical",
    "css": {
      "_checked": {
        "bg": "{colors.critical.accent}",
        "borderColor": "{colors.critical.accent}"
      }
    }
  },
  {
    "intent": "positive",
    "css": {
      "_checked": {
        "bg": "{colors.positive.accent}",
        "borderColor": "{colors.positive.accent}"
      }
    }
  },
  {
    "intent": "caution",
    "css": {
      "_checked": {
        "bg": "{colors.caution.accent}",
        "borderColor": "{colors.caution.accent}"
      }
    }
  },
  {
    "intent": "info",
    "css": {
      "_checked": {
        "bg": "{colors.info.accent}",
        "borderColor": "{colors.info.accent}"
      }
    }
  }
])

const toggleSwitchVariantMap = {
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
}

const toggleSwitchVariantKeys = Object.keys(toggleSwitchVariantMap)

export const toggleSwitch = /* @__PURE__ */ Object.assign(memo(toggleSwitchFn.recipeFn), {
  __recipe__: true,
  __name__: 'toggleSwitch',
  __getCompoundVariantCss__: toggleSwitchFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: toggleSwitchVariantKeys,
  variantMap: toggleSwitchVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, toggleSwitchVariantKeys)
  },
  getVariantProps: toggleSwitchFn.getVariantProps,
})
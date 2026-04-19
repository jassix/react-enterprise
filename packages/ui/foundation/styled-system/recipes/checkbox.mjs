import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const checkboxFn = /* @__PURE__ */ createRecipe('checkbox', {
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
        "borderColor": "{colors.caution.accent}",
        "color": "{colors.foreground}"
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
        "borderColor": "{colors.caution.accent}",
        "color": "{colors.foreground}"
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

const checkboxVariantMap = {
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

const checkboxVariantKeys = Object.keys(checkboxVariantMap)

export const checkbox = /* @__PURE__ */ Object.assign(memo(checkboxFn.recipeFn), {
  __recipe__: true,
  __name__: 'checkbox',
  __getCompoundVariantCss__: checkboxFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: checkboxVariantKeys,
  variantMap: checkboxVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, checkboxVariantKeys)
  },
  getVariantProps: checkboxFn.getVariantProps,
})
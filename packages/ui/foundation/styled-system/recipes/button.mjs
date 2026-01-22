import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const buttonFn = /* @__PURE__ */ createRecipe('button', {
  "variant": "solid",
  "intent": "primary",
  "size": "md"
}, [
  {
    "variant": "outline",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}",
      "borderColor": "{colors.border.critical}",
      "_hover": {
        "borderColor": "{colors.critical.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}",
      "borderColor": "{colors.border.positive}",
      "_hover": {
        "borderColor": "{colors.positive.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}",
      "borderColor": "{colors.border.caution}",
      "_hover": {
        "borderColor": "{colors.caution.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}",
      "borderColor": "{colors.border.info}",
      "_hover": {
        "borderColor": "{colors.info.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}",
      "borderColor": "{colors.border.critical}",
      "_hover": {
        "borderColor": "{colors.critical.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}",
      "borderColor": "{colors.border.positive}",
      "_hover": {
        "borderColor": "{colors.positive.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}",
      "borderColor": "{colors.border.caution}",
      "_hover": {
        "borderColor": "{colors.caution.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}",
      "borderColor": "{colors.border.info}",
      "_hover": {
        "borderColor": "{colors.info.emphasis}"
      }
    }
  }
])

const buttonVariantMap = {
  "variant": [
    "solid",
    "outline",
    "ghost",
    "link"
  ],
  "intent": [
    "primary",
    "critical",
    "positive",
    "caution",
    "info"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "stretched": [
    "true"
  ]
}

const buttonVariantKeys = Object.keys(buttonVariantMap)

export const button = /* @__PURE__ */ Object.assign(memo(buttonFn.recipeFn), {
  __recipe__: true,
  __name__: 'button',
  __getCompoundVariantCss__: buttonFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: buttonVariantKeys,
  variantMap: buttonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, buttonVariantKeys)
  },
  getVariantProps: buttonFn.getVariantProps,
})
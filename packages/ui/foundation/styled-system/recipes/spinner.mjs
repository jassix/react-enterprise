import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const spinnerFn = /* @__PURE__ */ createRecipe('spinner', {
  "variant": "circular",
  "size": "md",
  "intent": "primary"
}, [
  {
    "variant": "circular",
    "size": "xs",
    "css": {
      "borderWidth": "1px"
    }
  },
  {
    "variant": "circular",
    "size": "xl",
    "css": {
      "borderWidth": "3px"
    }
  },
  {
    "variant": "circular",
    "size": "xs",
    "css": {
      "borderWidth": "1px"
    }
  },
  {
    "variant": "circular",
    "size": "xl",
    "css": {
      "borderWidth": "3px"
    }
  }
])

const spinnerVariantMap = {
  "variant": [
    "circular",
    "dots",
    "bars"
  ],
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "intent": [
    "neutral",
    "primary",
    "critical",
    "positive",
    "caution",
    "info"
  ]
}

const spinnerVariantKeys = Object.keys(spinnerVariantMap)

export const spinner = /* @__PURE__ */ Object.assign(memo(spinnerFn.recipeFn), {
  __recipe__: true,
  __name__: 'spinner',
  __getCompoundVariantCss__: spinnerFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: spinnerVariantKeys,
  variantMap: spinnerVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, spinnerVariantKeys)
  },
  getVariantProps: spinnerFn.getVariantProps,
})
import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const alertFn = /* @__PURE__ */ createRecipe('alert', {
  "status": "info",
  "variant": "subtle"
}, [
  {
    "variant": "solid",
    "status": "info",
    "css": {
      "bg": "{colors.info.DEFAULT}",
      "color": "white"
    }
  },
  {
    "variant": "solid",
    "status": "positive",
    "css": {
      "bg": "{colors.positive.DEFAULT}",
      "color": "white"
    }
  },
  {
    "variant": "solid",
    "status": "caution",
    "css": {
      "bg": "{colors.caution.DEFAULT}",
      "color": "{colors.caution.text}"
    }
  },
  {
    "variant": "solid",
    "status": "critical",
    "css": {
      "bg": "{colors.critical.DEFAULT}",
      "color": "white"
    }
  },
  {
    "variant": "solid",
    "status": "info",
    "css": {
      "bg": "{colors.info.DEFAULT}",
      "color": "white"
    }
  },
  {
    "variant": "solid",
    "status": "positive",
    "css": {
      "bg": "{colors.positive.DEFAULT}",
      "color": "white"
    }
  },
  {
    "variant": "solid",
    "status": "caution",
    "css": {
      "bg": "{colors.caution.DEFAULT}",
      "color": "{colors.caution.text}"
    }
  },
  {
    "variant": "solid",
    "status": "critical",
    "css": {
      "bg": "{colors.critical.DEFAULT}",
      "color": "white"
    }
  }
])

const alertVariantMap = {
  "status": [
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
}

const alertVariantKeys = Object.keys(alertVariantMap)

export const alert = /* @__PURE__ */ Object.assign(memo(alertFn.recipeFn), {
  __recipe__: true,
  __name__: 'alert',
  __getCompoundVariantCss__: alertFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: alertVariantKeys,
  variantMap: alertVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, alertVariantKeys)
  },
  getVariantProps: alertFn.getVariantProps,
})
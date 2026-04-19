import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const aspectFn = /* @__PURE__ */ createRecipe('aspect', {
  "ratio": "video"
}, [])

const aspectVariantMap = {
  "ratio": [
    "square",
    "video",
    "wide",
    "portrait",
    "classic",
    "golden"
  ]
}

const aspectVariantKeys = Object.keys(aspectVariantMap)

export const aspect = /* @__PURE__ */ Object.assign(memo(aspectFn.recipeFn), {
  __recipe__: true,
  __name__: 'aspect',
  __getCompoundVariantCss__: aspectFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: aspectVariantKeys,
  variantMap: aspectVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, aspectVariantKeys)
  },
  getVariantProps: aspectFn.getVariantProps,
})
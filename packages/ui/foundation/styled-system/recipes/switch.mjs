import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const switchFn = /* @__PURE__ */ createRecipe('switch', {
  "size": "md",
  "intent": "primary"
}, [])

const switchVariantMap = {
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "intent": [
    "primary",
    "critical",
    "positive"
  ]
}

const switchVariantKeys = Object.keys(switchVariantMap)

export const switch = /* @__PURE__ */ Object.assign(memo(switchFn.recipeFn), {
  __recipe__: true,
  __name__: 'switch',
  __getCompoundVariantCss__: switchFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: switchVariantKeys,
  variantMap: switchVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, switchVariantKeys)
  },
  getVariantProps: switchFn.getVariantProps,
})
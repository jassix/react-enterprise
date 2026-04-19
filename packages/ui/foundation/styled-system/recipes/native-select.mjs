import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const nativeSelectFn = /* @__PURE__ */ createRecipe('native-select', {
  "variant": "outline",
  "size": "md"
}, [])

const nativeSelectVariantMap = {
  "variant": [
    "outline",
    "filled",
    "flushed"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ]
}

const nativeSelectVariantKeys = Object.keys(nativeSelectVariantMap)

export const nativeSelect = /* @__PURE__ */ Object.assign(memo(nativeSelectFn.recipeFn), {
  __recipe__: true,
  __name__: 'nativeSelect',
  __getCompoundVariantCss__: nativeSelectFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: nativeSelectVariantKeys,
  variantMap: nativeSelectVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, nativeSelectVariantKeys)
  },
  getVariantProps: nativeSelectFn.getVariantProps,
})
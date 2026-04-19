import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const kbdFn = /* @__PURE__ */ createRecipe('kbd', {
  "variant": "subtle",
  "size": "sm"
}, [])

const kbdVariantMap = {
  "variant": [
    "outline",
    "solid",
    "subtle"
  ],
  "size": [
    "xs",
    "sm",
    "md"
  ]
}

const kbdVariantKeys = Object.keys(kbdVariantMap)

export const kbd = /* @__PURE__ */ Object.assign(memo(kbdFn.recipeFn), {
  __recipe__: true,
  __name__: 'kbd',
  __getCompoundVariantCss__: kbdFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: kbdVariantKeys,
  variantMap: kbdVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, kbdVariantKeys)
  },
  getVariantProps: kbdFn.getVariantProps,
})
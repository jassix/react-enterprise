import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const avatarFn = /* @__PURE__ */ createRecipe('avatar', {
  "size": "md",
  "shape": "circle"
}, [])

const avatarVariantMap = {
  "size": [
    "xs",
    "sm",
    "md",
    "lg",
    "xl",
    "2xl"
  ],
  "shape": [
    "circle",
    "square",
    "rounded"
  ]
}

const avatarVariantKeys = Object.keys(avatarVariantMap)

export const avatar = /* @__PURE__ */ Object.assign(memo(avatarFn.recipeFn), {
  __recipe__: true,
  __name__: 'avatar',
  __getCompoundVariantCss__: avatarFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: avatarVariantKeys,
  variantMap: avatarVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, avatarVariantKeys)
  },
  getVariantProps: avatarFn.getVariantProps,
})
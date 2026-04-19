import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const textareaFn = /* @__PURE__ */ createRecipe('textarea', {
  "variant": "outline",
  "size": "md",
  "resize": "none"
}, [])

const textareaVariantMap = {
  "variant": [
    "outline",
    "filled",
    "flushed"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ],
  "resize": [
    "none",
    "vertical",
    "horizontal",
    "both"
  ]
}

const textareaVariantKeys = Object.keys(textareaVariantMap)

export const textarea = /* @__PURE__ */ Object.assign(memo(textareaFn.recipeFn), {
  __recipe__: true,
  __name__: 'textarea',
  __getCompoundVariantCss__: textareaFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: textareaVariantKeys,
  variantMap: textareaVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, textareaVariantKeys)
  },
  getVariantProps: textareaFn.getVariantProps,
})
import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const badgeFn = /* @__PURE__ */ createRecipe('badge', {
  "variant": "subtle",
  "intent": "neutral",
  "size": "md"
}, [
  {
    "variant": "subtle",
    "intent": "accent",
    "css": {
      "bg": "{colors.accent.light.3}",
      "color": "{colors.accent.light.11}",
      "_dark": {
        "bg": "{colors.accent.dark.3}",
        "color": "{colors.accent.dark.11}"
      }
    }
  },
  {
    "variant": "subtle",
    "intent": "critical",
    "css": {
      "bg": "{colors.red.light.3}",
      "color": "{colors.red.light.11}",
      "_dark": {
        "bg": "{colors.red.dark.3}",
        "color": "{colors.red.dark.11}"
      }
    }
  },
  {
    "variant": "subtle",
    "intent": "positive",
    "css": {
      "bg": "{colors.green.light.3}",
      "color": "{colors.green.light.11}",
      "_dark": {
        "bg": "{colors.green.dark.3}",
        "color": "{colors.green.dark.11}"
      }
    }
  },
  {
    "variant": "subtle",
    "intent": "caution",
    "css": {
      "bg": "{colors.amber.light.3}",
      "color": "{colors.amber.light.11}",
      "_dark": {
        "bg": "{colors.amber.dark.3}",
        "color": "{colors.amber.dark.11}"
      }
    }
  },
  {
    "variant": "subtle",
    "intent": "info",
    "css": {
      "bg": "{colors.blue.light.3}",
      "color": "{colors.blue.light.11}",
      "_dark": {
        "bg": "{colors.blue.dark.3}",
        "color": "{colors.blue.dark.11}"
      }
    }
  },
  {
    "variant": "subtle",
    "intent": "accent",
    "css": {
      "bg": "{colors.accent.light.3}",
      "color": "{colors.accent.light.11}",
      "_dark": {
        "bg": "{colors.accent.dark.3}",
        "color": "{colors.accent.dark.11}"
      }
    }
  },
  {
    "variant": "subtle",
    "intent": "critical",
    "css": {
      "bg": "{colors.red.light.3}",
      "color": "{colors.red.light.11}",
      "_dark": {
        "bg": "{colors.red.dark.3}",
        "color": "{colors.red.dark.11}"
      }
    }
  },
  {
    "variant": "subtle",
    "intent": "positive",
    "css": {
      "bg": "{colors.green.light.3}",
      "color": "{colors.green.light.11}",
      "_dark": {
        "bg": "{colors.green.dark.3}",
        "color": "{colors.green.dark.11}"
      }
    }
  },
  {
    "variant": "subtle",
    "intent": "caution",
    "css": {
      "bg": "{colors.amber.light.3}",
      "color": "{colors.amber.light.11}",
      "_dark": {
        "bg": "{colors.amber.dark.3}",
        "color": "{colors.amber.dark.11}"
      }
    }
  },
  {
    "variant": "subtle",
    "intent": "info",
    "css": {
      "bg": "{colors.blue.light.3}",
      "color": "{colors.blue.light.11}",
      "_dark": {
        "bg": "{colors.blue.dark.3}",
        "color": "{colors.blue.dark.11}"
      }
    }
  }
])

const badgeVariantMap = {
  "variant": [
    "solid",
    "subtle",
    "outline"
  ],
  "intent": [
    "neutral",
    "accent",
    "critical",
    "positive",
    "caution",
    "info"
  ],
  "size": [
    "sm",
    "md",
    "lg"
  ]
}

const badgeVariantKeys = Object.keys(badgeVariantMap)

export const badge = /* @__PURE__ */ Object.assign(memo(badgeFn.recipeFn), {
  __recipe__: true,
  __name__: 'badge',
  __getCompoundVariantCss__: badgeFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: badgeVariantKeys,
  variantMap: badgeVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, badgeVariantKeys)
  },
  getVariantProps: badgeFn.getVariantProps,
})
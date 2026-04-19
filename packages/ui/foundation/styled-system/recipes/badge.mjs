import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const badgeFn = /* @__PURE__ */ createRecipe('badge', {
  "variant": "default",
  "size": "md"
}, [
  {
    "variant": "default",
    "intent": "critical",
    "css": {
      "bg": "{colors.critical.accent}",
      "color": "{colors.foreground.inverse}"
    }
  },
  {
    "variant": "default",
    "intent": "positive",
    "css": {
      "bg": "{colors.positive.accent}",
      "color": "{colors.foreground.inverse}"
    }
  },
  {
    "variant": "default",
    "intent": "caution",
    "css": {
      "bg": "{colors.caution.accent}",
      "color": "{colors.foreground}"
    }
  },
  {
    "variant": "default",
    "intent": "info",
    "css": {
      "bg": "{colors.info.accent}",
      "color": "{colors.foreground.inverse}"
    }
  },
  {
    "variant": "outline",
    "intent": "critical",
    "css": {
      "bg": "color-mix(in oklab, {colors.critical} 10%, transparent)",
      "color": "{colors.critical.text}",
      "borderColor": "{colors.border.critical}",
      "_dark": {
        "bg": "color-mix(in oklab, {colors.critical} 20%, transparent)"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "positive",
    "css": {
      "bg": "color-mix(in oklab, {colors.positive} 10%, transparent)",
      "color": "{colors.positive.text}",
      "borderColor": "{colors.border.positive}",
      "_dark": {
        "bg": "color-mix(in oklab, {colors.positive} 20%, transparent)"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "caution",
    "css": {
      "bg": "color-mix(in oklab, {colors.caution} 10%, transparent)",
      "color": "{colors.caution.text}",
      "borderColor": "{colors.border.caution}",
      "_dark": {
        "bg": "color-mix(in oklab, {colors.caution} 20%, transparent)"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "info",
    "css": {
      "bg": "color-mix(in oklab, {colors.info} 10%, transparent)",
      "color": "{colors.info.text}",
      "borderColor": "{colors.border.info}",
      "_dark": {
        "bg": "color-mix(in oklab, {colors.info} 20%, transparent)"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}"
    }
  },
  {
    "variant": "ghost",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}"
    }
  },
  {
    "variant": "ghost",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}"
    }
  },
  {
    "variant": "ghost",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}"
    }
  },
  {
    "variant": "link",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}"
    }
  },
  {
    "variant": "link",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}"
    }
  },
  {
    "variant": "link",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}"
    }
  },
  {
    "variant": "link",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}"
    }
  },
  {
    "variant": "default",
    "intent": "critical",
    "css": {
      "bg": "{colors.critical.accent}",
      "color": "{colors.foreground.inverse}"
    }
  },
  {
    "variant": "default",
    "intent": "positive",
    "css": {
      "bg": "{colors.positive.accent}",
      "color": "{colors.foreground.inverse}"
    }
  },
  {
    "variant": "default",
    "intent": "caution",
    "css": {
      "bg": "{colors.caution.accent}",
      "color": "{colors.foreground}"
    }
  },
  {
    "variant": "default",
    "intent": "info",
    "css": {
      "bg": "{colors.info.accent}",
      "color": "{colors.foreground.inverse}"
    }
  },
  {
    "variant": "outline",
    "intent": "critical",
    "css": {
      "bg": "color-mix(in oklab, {colors.critical} 10%, transparent)",
      "color": "{colors.critical.text}",
      "borderColor": "{colors.border.critical}",
      "_dark": {
        "bg": "color-mix(in oklab, {colors.critical} 20%, transparent)"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "positive",
    "css": {
      "bg": "color-mix(in oklab, {colors.positive} 10%, transparent)",
      "color": "{colors.positive.text}",
      "borderColor": "{colors.border.positive}",
      "_dark": {
        "bg": "color-mix(in oklab, {colors.positive} 20%, transparent)"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "caution",
    "css": {
      "bg": "color-mix(in oklab, {colors.caution} 10%, transparent)",
      "color": "{colors.caution.text}",
      "borderColor": "{colors.border.caution}",
      "_dark": {
        "bg": "color-mix(in oklab, {colors.caution} 20%, transparent)"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "info",
    "css": {
      "bg": "color-mix(in oklab, {colors.info} 10%, transparent)",
      "color": "{colors.info.text}",
      "borderColor": "{colors.border.info}",
      "_dark": {
        "bg": "color-mix(in oklab, {colors.info} 20%, transparent)"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}"
    }
  },
  {
    "variant": "ghost",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}"
    }
  },
  {
    "variant": "ghost",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}"
    }
  },
  {
    "variant": "ghost",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}"
    }
  },
  {
    "variant": "link",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}"
    }
  },
  {
    "variant": "link",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}"
    }
  },
  {
    "variant": "link",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}"
    }
  },
  {
    "variant": "link",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}"
    }
  }
])

const badgeVariantMap = {
  "variant": [
    "default",
    "secondary",
    "destructive",
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
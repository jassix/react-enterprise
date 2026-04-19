import { memo, splitProps } from '../helpers.mjs';
import { createRecipe, mergeRecipes } from './create-recipe.mjs';

const buttonFn = /* @__PURE__ */ createRecipe('button', {
  "variant": "default",
  "size": "md"
}, [
  {
    "variant": "default",
    "intent": "critical",
    "css": {
      "bg": "{colors.critical.accent}",
      "color": "{colors.foreground.inverse}",
      "_hover": {
        "bg": "{colors.critical.emphasis}"
      }
    }
  },
  {
    "variant": "default",
    "intent": "positive",
    "css": {
      "bg": "{colors.positive.accent}",
      "color": "{colors.foreground.inverse}",
      "_hover": {
        "bg": "{colors.positive.emphasis}"
      }
    }
  },
  {
    "variant": "default",
    "intent": "caution",
    "css": {
      "bg": "{colors.caution.accent}",
      "color": "{colors.foreground}",
      "_hover": {
        "bg": "{colors.caution.emphasis}"
      }
    }
  },
  {
    "variant": "default",
    "intent": "info",
    "css": {
      "bg": "{colors.info.accent}",
      "color": "{colors.foreground.inverse}",
      "_hover": {
        "bg": "{colors.info.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}",
      "borderColor": "{colors.border.critical}",
      "_hover": {
        "borderColor": "{colors.critical.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}",
      "borderColor": "{colors.border.positive}",
      "_hover": {
        "borderColor": "{colors.positive.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}",
      "borderColor": "{colors.border.caution}",
      "_hover": {
        "borderColor": "{colors.caution.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}",
      "borderColor": "{colors.border.info}",
      "_hover": {
        "borderColor": "{colors.info.emphasis}"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}",
      "_hover": {
        "bg": "color-mix(in oklab, {colors.critical} 10%, transparent)",
        "color": "{colors.critical.text}"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}",
      "_hover": {
        "bg": "color-mix(in oklab, {colors.positive} 10%, transparent)",
        "color": "{colors.positive.text}"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}",
      "_hover": {
        "bg": "color-mix(in oklab, {colors.caution} 10%, transparent)",
        "color": "{colors.caution.text}"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}",
      "_hover": {
        "bg": "color-mix(in oklab, {colors.info} 10%, transparent)",
        "color": "{colors.info.text}"
      }
    }
  },
  {
    "variant": "link",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}",
      "_hover": {
        "color": "{colors.critical.emphasis}"
      }
    }
  },
  {
    "variant": "link",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}",
      "_hover": {
        "color": "{colors.positive.emphasis}"
      }
    }
  },
  {
    "variant": "link",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}",
      "_hover": {
        "color": "{colors.caution.emphasis}"
      }
    }
  },
  {
    "variant": "link",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}",
      "_hover": {
        "color": "{colors.info.emphasis}"
      }
    }
  },
  {
    "variant": "default",
    "intent": "critical",
    "css": {
      "bg": "{colors.critical.accent}",
      "color": "{colors.foreground.inverse}",
      "_hover": {
        "bg": "{colors.critical.emphasis}"
      }
    }
  },
  {
    "variant": "default",
    "intent": "positive",
    "css": {
      "bg": "{colors.positive.accent}",
      "color": "{colors.foreground.inverse}",
      "_hover": {
        "bg": "{colors.positive.emphasis}"
      }
    }
  },
  {
    "variant": "default",
    "intent": "caution",
    "css": {
      "bg": "{colors.caution.accent}",
      "color": "{colors.foreground}",
      "_hover": {
        "bg": "{colors.caution.emphasis}"
      }
    }
  },
  {
    "variant": "default",
    "intent": "info",
    "css": {
      "bg": "{colors.info.accent}",
      "color": "{colors.foreground.inverse}",
      "_hover": {
        "bg": "{colors.info.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}",
      "borderColor": "{colors.border.critical}",
      "_hover": {
        "borderColor": "{colors.critical.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}",
      "borderColor": "{colors.border.positive}",
      "_hover": {
        "borderColor": "{colors.positive.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}",
      "borderColor": "{colors.border.caution}",
      "_hover": {
        "borderColor": "{colors.caution.emphasis}"
      }
    }
  },
  {
    "variant": "outline",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}",
      "borderColor": "{colors.border.info}",
      "_hover": {
        "borderColor": "{colors.info.emphasis}"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}",
      "_hover": {
        "bg": "color-mix(in oklab, {colors.critical} 10%, transparent)",
        "color": "{colors.critical.text}"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}",
      "_hover": {
        "bg": "color-mix(in oklab, {colors.positive} 10%, transparent)",
        "color": "{colors.positive.text}"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}",
      "_hover": {
        "bg": "color-mix(in oklab, {colors.caution} 10%, transparent)",
        "color": "{colors.caution.text}"
      }
    }
  },
  {
    "variant": "ghost",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}",
      "_hover": {
        "bg": "color-mix(in oklab, {colors.info} 10%, transparent)",
        "color": "{colors.info.text}"
      }
    }
  },
  {
    "variant": "link",
    "intent": "critical",
    "css": {
      "color": "{colors.critical.text}",
      "_hover": {
        "color": "{colors.critical.emphasis}"
      }
    }
  },
  {
    "variant": "link",
    "intent": "positive",
    "css": {
      "color": "{colors.positive.text}",
      "_hover": {
        "color": "{colors.positive.emphasis}"
      }
    }
  },
  {
    "variant": "link",
    "intent": "caution",
    "css": {
      "color": "{colors.caution.text}",
      "_hover": {
        "color": "{colors.caution.emphasis}"
      }
    }
  },
  {
    "variant": "link",
    "intent": "info",
    "css": {
      "color": "{colors.info.text}",
      "_hover": {
        "color": "{colors.info.emphasis}"
      }
    }
  }
])

const buttonVariantMap = {
  "variant": [
    "default",
    "secondary",
    "outline",
    "ghost",
    "destructive",
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
    "xs",
    "sm",
    "md",
    "lg",
    "xl"
  ],
  "icon": [
    "true"
  ],
  "stretched": [
    "true"
  ]
}

const buttonVariantKeys = Object.keys(buttonVariantMap)

export const button = /* @__PURE__ */ Object.assign(memo(buttonFn.recipeFn), {
  __recipe__: true,
  __name__: 'button',
  __getCompoundVariantCss__: buttonFn.__getCompoundVariantCss__,
  raw: (props) => props,
  variantKeys: buttonVariantKeys,
  variantMap: buttonVariantMap,
  merge(recipe) {
    return mergeRecipes(this, recipe)
  },
  splitVariantProps(props) {
    return splitProps(props, buttonVariantKeys)
  },
  getVariantProps: buttonFn.getVariantProps,
})
import type { Decorator, Preview } from "@storybook/react-vite";
import { useEffect } from "react";
import "../src/index.css";
import "./preview.css";
import "./icons";

const THEMES = { light: "light", dark: "dark" } as const;
type ThemeName = keyof typeof THEMES;

const resolveTheme = (raw: string | undefined): ThemeName =>
  raw && raw in THEMES ? (raw as ThemeName) : "light";

/** Mirror the toolbar's theme to the native `color-scheme` so form widgets adapt. */
const withColorScheme: Decorator = (Story, context) => {
  const theme = resolveTheme(context.globals.theme as string | undefined);
  useEffect(() => {
    document.documentElement.style.colorScheme = theme;
  }, [theme]);
  return Story(context);
};

/**
 * Toggle the `light`/`dark` class on `<html>` from the toolbar global.
 *
 * We bypass `@storybook/addon-themes`' `withThemeByClassName` because it
 * crashes (`Cannot read properties of undefined (reading 'split')`) the
 * moment `context.globals.theme` carries an unrecognized value — typically a
 * stale entry left over in localStorage from a renamed/removed global. This
 * decorator validates the global before applying, so the cascade can never
 * reach an `undefined` className.
 */
const withThemeClass: Decorator = (Story, context) => {
  const theme = resolveTheme(context.globals.theme as string | undefined);
  useEffect(() => {
    const html = document.documentElement;
    Object.values(THEMES).forEach((cls) => html.classList.remove(cls));
    html.classList.add(THEMES[theme]);
  }, [theme]);
  return Story(context);
};

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Foundation",
          ["Tokens", "Colors", "Typography", "Motion", "Themes", "Theming"],
          "Primitives",
          [
            "Buttons",
            "Forms",
            "Overlays",
            "Data Display",
            "Feedback",
            "Layout",
            "Disclosure",
            "Collections",
            "Typography",
            "Date",
          ],
          "Blocks",
        ],
      },
    },
    a11y: { config: { rules: [] } },
    backgrounds: { disable: true },
  },
  decorators: [withColorScheme, withThemeClass],
  globalTypes: {
    theme: {
      name: "Theme",
      description: "Light / dark mode",
      defaultValue: "light",
      toolbar: {
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light" },
          { value: "dark", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
};

export default preview;

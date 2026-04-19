import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
	framework: {
		name: "@storybook/react-vite",
		options: {},
	},
	stories: [
		"../src/docs/**/*.mdx",
		"../src/docs/**/*.stories.@(ts|tsx)",
		"../../primitives/src/**/*.stories.@(ts|tsx|mdx)",
		"../../blocks/src/**/*.stories.@(ts|tsx|mdx)",
	],
	addons: [
		"@storybook/addon-docs",
		"@storybook/addon-a11y",
		"@storybook/addon-themes",
		"@storybook/addon-designs",
	],
	typescript: {
		reactDocgen: "react-docgen-typescript",
		reactDocgenTypescriptOptions: {
			shouldExtractLiteralValuesFromEnum: true,
			propFilter: (prop) =>
				prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
		},
	},
	docs: {
		defaultName: "Docs",
	},
};

export default config;

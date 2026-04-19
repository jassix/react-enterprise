import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../icon";
import { Kbd } from "./kbd";

const meta = {
	title: "Primitives/Data Display/Kbd",
	component: Kbd,
	tags: ["autodocs"],
	args: { children: "K" },
	argTypes: {
		variant: { control: "inline-radio", options: ["outline", "solid", "subtle"] },
		size: { control: "inline-radio", options: ["xs", "sm", "md"] },
	},
} satisfies Meta<typeof Kbd>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = { args: { variant: "outline" } };
export const Solid: Story = { args: { variant: "solid" } };
export const Subtle: Story = { args: { variant: "subtle" } };

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
			<Kbd {...args} size="xs"><Icon name="hugeicons:command" size="xs" />K</Kbd>
			<Kbd {...args} size="sm"><Icon name="hugeicons:command" size="xs" />K</Kbd>
			<Kbd {...args} size="md"><Icon name="hugeicons:command" size="sm" />K</Kbd>
		</div>
	),
};

export const Combo: Story = {
	render: (args) => (
		<span style={{ display: "inline-flex", gap: 4, alignItems: "center" }}>
			<Kbd {...args}><Icon name="hugeicons:command" size="xs" /></Kbd>
			<span>+</span>
			<Kbd {...args}><Icon name="hugeicons:arrow-up-01" size="xs" /></Kbd>
			<span>+</span>
			<Kbd {...args}>P</Kbd>
		</span>
	),
};

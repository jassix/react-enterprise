import type { Meta, StoryObj } from "@storybook/react-vite";
import { ToggleGroup } from "./toggle-group";

const meta = {
	title: "Primitives/Buttons/Toggle Group",
	component: ToggleGroup,
	tags: ["autodocs"],
	args: { defaultValue: ["left"] },
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
		variant: { control: "inline-radio", options: ["default", "outline"] },
		size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
		attached: { control: "boolean" },
		multiple: { control: "boolean" },
	},
	render: (args) => (
		<ToggleGroup.Root {...args}>
			<ToggleGroup.Item value="left">Left</ToggleGroup.Item>
			<ToggleGroup.Item value="center">Center</ToggleGroup.Item>
			<ToggleGroup.Item value="right">Right</ToggleGroup.Item>
		</ToggleGroup.Root>
	),
} satisfies Meta<typeof ToggleGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Outline: Story = { args: { variant: "outline" } };
export const Attached: Story = { args: { attached: true, variant: "outline" } };
export const Multiple: Story = {
	args: { multiple: true, defaultValue: ["left", "center"] },
};

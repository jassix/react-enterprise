import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "./label";

const meta = {
	title: "Primitives/Forms/Label",
	component: Label,
	tags: ["autodocs"],
	args: { children: "Email address" },
	argTypes: {
		size: { control: "inline-radio", options: ["sm", "md", "lg"] },
		required: { control: "boolean" },
	},
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Required: Story = { args: { required: true } };

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
			<Label {...args} size="sm">Small label</Label>
			<Label {...args} size="md">Medium label</Label>
			<Label {...args} size="lg">Large label</Label>
		</div>
	),
};

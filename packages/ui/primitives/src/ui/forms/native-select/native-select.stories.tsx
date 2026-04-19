import type { Meta, StoryObj } from "@storybook/react-vite";
import { NativeSelect } from "./native-select";

const meta = {
	title: "Primitives/Forms/Native Select",
	component: NativeSelect,
	tags: ["autodocs"],
	argTypes: {
		variant: { control: "inline-radio", options: ["outline", "filled", "flushed"] },
		size: { control: "inline-radio", options: ["sm", "md", "lg"] },
	},
	render: (args) => (
		<div style={{ width: 240 }}>
			<NativeSelect {...args}>
				<option value="">Select a role</option>
				<option value="owner">Owner</option>
				<option value="member">Member</option>
				<option value="viewer">Viewer</option>
			</NativeSelect>
		</div>
	),
} satisfies Meta<typeof NativeSelect>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = { args: { variant: "outline" } };
export const Filled: Story = { args: { variant: "filled" } };
export const Flushed: Story = { args: { variant: "flushed" } };

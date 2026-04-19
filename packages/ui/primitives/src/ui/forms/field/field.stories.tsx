import type { Meta, StoryObj } from "@storybook/react-vite";
import { Field } from "./field";

const meta = {
	title: "Primitives/Forms/Field",
	component: Field,
	tags: ["autodocs"],
	argTypes: {
		orientation: { control: "inline-radio", options: ["vertical", "horizontal"] },
		size: { control: "inline-radio", options: ["sm", "md", "lg"] },
	},
	render: (args) => (
		<div style={{ width: 360 }}>
			<Field.Root {...args}>
				<Field.Label>
					Email
					<Field.RequiredIndicator>*</Field.RequiredIndicator>
				</Field.Label>
				<Field.Input placeholder="you@example.com" />
				<Field.HelperText>We'll never share your email.</Field.HelperText>
			</Field.Root>
		</div>
	),
} satisfies Meta<typeof Field>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = { args: { orientation: "vertical" } };
export const Horizontal: Story = { args: { orientation: "horizontal" } };

export const Invalid: Story = {
	args: { invalid: true },
	render: (args) => (
		<div style={{ width: 360 }}>
			<Field.Root {...args}>
				<Field.Label>Email</Field.Label>
				<Field.Input defaultValue="not-an-email" />
				<Field.ErrorText>Please enter a valid email address.</Field.ErrorText>
			</Field.Root>
		</div>
	),
};

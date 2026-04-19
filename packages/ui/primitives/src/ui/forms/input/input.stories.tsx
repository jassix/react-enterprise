import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "./input";

const meta = {
	title: "Primitives/Forms/Input",
	component: Input,
	tags: ["autodocs"],
	args: { placeholder: "Type something…" },
	argTypes: {
		variant: { control: "inline-radio", options: ["outline", "filled", "flushed"] },
		size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
		disabled: { control: "boolean" },
	},
	render: (args) => (
		<div style={{ width: 320 }}>
			<Input {...args} />
		</div>
	),
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = { args: { variant: "outline" } };
export const Filled: Story = { args: { variant: "filled" } };
export const Flushed: Story = { args: { variant: "flushed" } };

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8, width: 320 }}>
			{(["sm", "md", "lg", "xl"] as const).map((size) => (
				<Input key={size} {...args} size={size} placeholder={`size: ${size}`} />
			))}
		</div>
	),
};

export const Invalid: Story = {
	args: { "aria-invalid": true, value: "not an email" },
};

export const FileInput: Story = {
	args: { type: "file", placeholder: undefined },
};

export const Disabled: Story = { args: { disabled: true, value: "Read-only" } };

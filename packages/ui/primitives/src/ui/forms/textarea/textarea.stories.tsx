import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./textarea";

const meta = {
	title: "Primitives/Forms/Textarea",
	component: Textarea,
	tags: ["autodocs"],
	args: { placeholder: "Tell us what happened…", rows: 4 },
	argTypes: {
		variant: { control: "inline-radio", options: ["outline", "filled", "flushed"] },
		size: { control: "inline-radio", options: ["sm", "md", "lg"] },
		resize: { control: "inline-radio", options: ["none", "vertical", "horizontal", "both"] },
	},
	render: (args) => (
		<div style={{ width: 360 }}>
			<Textarea {...args} />
		</div>
	),
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Outline: Story = { args: { variant: "outline" } };
export const Filled: Story = { args: { variant: "filled" } };
export const Flushed: Story = { args: { variant: "flushed" } };

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8, width: 360 }}>
			{(["sm", "md", "lg"] as const).map((size) => (
				<Textarea key={size} {...args} size={size} placeholder={`size: ${size}`} />
			))}
		</div>
	),
};

export const Disabled: Story = { args: { disabled: true, value: "Read-only content" } };

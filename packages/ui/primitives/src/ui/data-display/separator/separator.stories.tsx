import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "./separator";

const meta = {
	title: "Primitives/Data Display/Separator",
	component: Separator,
	tags: ["autodocs"],
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
		variant: { control: "inline-radio", options: ["solid", "dashed", "dotted"] },
		emphasis: { control: "inline-radio", options: ["subtle", "DEFAULT", "strong"] },
	},
} satisfies Meta<typeof Separator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
	args: { orientation: "horizontal" },
	render: (args) => (
		<div style={{ width: 360 }}>
			<div>Above</div>
			<Separator {...args} />
			<div>Below</div>
		</div>
	),
};

export const Vertical: Story = {
	args: { orientation: "vertical" },
	render: (args) => (
		<div style={{ display: "flex", gap: 12, alignItems: "center", height: 40 }}>
			<span>Left</span>
			<Separator {...args} style={{ height: "100%" }} />
			<span>Right</span>
		</div>
	),
};

export const Variants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 8, width: 360 }}>
			<Separator variant="solid" />
			<Separator variant="dashed" />
			<Separator variant="dotted" />
		</div>
	),
};

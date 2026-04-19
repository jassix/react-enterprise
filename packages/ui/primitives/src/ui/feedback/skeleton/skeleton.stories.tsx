import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "./skeleton";

const meta = {
	title: "Primitives/Feedback/Skeleton",
	component: Skeleton,
	tags: ["autodocs"],
	argTypes: {
		variant: { control: "inline-radio", options: ["text", "circle", "rect"] },
		speed: { control: "inline-radio", options: ["slow", "normal", "fast"] },
	},
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
	args: { variant: "text" },
	render: (args) => <Skeleton {...args} style={{ width: 240, height: 14 }} />,
};

export const Circle: Story = {
	args: { variant: "circle" },
	render: (args) => <Skeleton {...args} style={{ width: 48, height: 48 }} />,
};

export const Rect: Story = {
	args: { variant: "rect" },
	render: (args) => <Skeleton {...args} style={{ width: 320, height: 120 }} />,
};

export const Composite: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 12, alignItems: "center", width: 360 }}>
			<Skeleton variant="circle" style={{ width: 40, height: 40 }} />
			<div style={{ display: "flex", flexDirection: "column", gap: 6, flex: 1 }}>
				<Skeleton variant="text" style={{ height: 14, width: "70%" }} />
				<Skeleton variant="text" style={{ height: 12, width: "40%" }} />
			</div>
		</div>
	),
};

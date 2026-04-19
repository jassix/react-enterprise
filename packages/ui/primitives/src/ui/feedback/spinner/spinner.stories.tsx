import type { Meta, StoryObj } from "@storybook/react-vite";
import { Spinner } from "./spinner";

const meta = {
	title: "Primitives/Feedback/Spinner",
	component: Spinner,
	tags: ["autodocs"],
	argTypes: {
		variant: { control: "inline-radio", options: ["circular", "dots", "bars"] },
		size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl"] },
		intent: { control: "inline-radio", options: ["neutral", "primary", "critical", "positive"] },
	},
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Circular: Story = { args: { variant: "circular" } };
export const Dots: Story = { args: { variant: "dots" } };
export const Bars: Story = { args: { variant: "bars" } };

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
			{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
				<Spinner key={size} {...args} size={size} />
			))}
		</div>
	),
};

export const Intents: Story = {
	render: (args) => (
		<div style={{ display: "flex", gap: 12, alignItems: "center" }}>
			{(["neutral", "primary", "critical", "positive"] as const).map((intent) => (
				<Spinner key={intent} {...args} intent={intent} />
			))}
		</div>
	),
};

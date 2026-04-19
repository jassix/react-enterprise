import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./progress";

const meta = {
	title: "Primitives/Feedback/Progress",
	component: Progress,
	tags: ["autodocs"],
	args: { value: 60, min: 0, max: 100 },
	argTypes: {
		size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
		intent: {
			control: "inline-radio",
			options: ["primary", "critical", "positive", "caution", "info"],
		},
		variant: { control: "inline-radio", options: ["linear", "striped"] },
	},
	render: (args) => (
		<div style={{ width: 360 }}>
			<Progress.Root {...args}>
				<Progress.Label>Uploading</Progress.Label>
				<Progress.Track>
					<Progress.Range />
				</Progress.Track>
				<Progress.ValueText />
			</Progress.Root>
		</div>
	),
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = { args: { variant: "linear" } };
export const Striped: Story = { args: { variant: "striped" } };

export const Intents: Story = {
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
			{(["primary", "critical", "positive", "caution", "info"] as const).map((intent) => (
				<Progress.Root key={intent} {...args} intent={intent}>
					<Progress.Label>{intent}</Progress.Label>
					<Progress.Track>
						<Progress.Range />
					</Progress.Track>
				</Progress.Root>
			))}
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", flexDirection: "column", gap: 12, width: 360 }}>
			{(["xs", "sm", "md", "lg"] as const).map((size) => (
				<Progress.Root key={size} {...args} size={size}>
					<Progress.Track>
						<Progress.Range />
					</Progress.Track>
				</Progress.Root>
			))}
		</div>
	),
};

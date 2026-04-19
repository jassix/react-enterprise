import type { Meta, StoryObj } from "@storybook/react-vite";
import { Tabs } from "./tabs";

const meta = {
	title: "Primitives/Collections/Tabs",
	component: Tabs,
	tags: ["autodocs"],
	args: { defaultValue: "overview" },
	argTypes: {
		variant: { control: "inline-radio", options: ["line", "enclosed", "unstyled"] },
		size: { control: "inline-radio", options: ["sm", "md", "lg"] },
	},
	render: (args) => (
		<div style={{ width: 520 }}>
			<Tabs.Root {...args}>
				<Tabs.List>
					<Tabs.Trigger value="overview">Overview</Tabs.Trigger>
					<Tabs.Trigger value="activity">Activity</Tabs.Trigger>
					<Tabs.Trigger value="settings">Settings</Tabs.Trigger>
					<Tabs.Indicator />
				</Tabs.List>
				<Tabs.Content value="overview">
					High-level summary of the project, recent progress, and pinned items.
				</Tabs.Content>
				<Tabs.Content value="activity">
					A timeline of who did what — commits, deploys, comments, reviews.
				</Tabs.Content>
				<Tabs.Content value="settings">
					Configure permissions, integrations, and team preferences.
				</Tabs.Content>
			</Tabs.Root>
		</div>
	),
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = { args: { variant: "line" } };
export const Pill: Story = { args: { variant: "pill" } };

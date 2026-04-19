import type { Meta, StoryObj } from "@storybook/react-vite";
import { Command } from "./command";

const meta = {
	title: "Primitives/Collections/Command",
	component: Command,
	tags: ["autodocs"],
	argTypes: {
		size: { control: "inline-radio", options: ["sm", "md", "lg"] },
	},
	render: (args) => (
		<div style={{ width: 420 }}>
			<Command.Root {...args}>
				<Command.InputWrapper>
					<Command.Input placeholder="Search commands…" />
				</Command.InputWrapper>
				<Command.List>
					<Command.Group>
						<Command.GroupLabel>Actions</Command.GroupLabel>
						<Command.Item value="new-file">
							New file
							<Command.Shortcut>⌘N</Command.Shortcut>
						</Command.Item>
						<Command.Item value="open">
							Open
							<Command.Shortcut>⌘O</Command.Shortcut>
						</Command.Item>
					</Command.Group>
					<Command.Separator />
					<Command.Group>
						<Command.GroupLabel>Navigation</Command.GroupLabel>
						<Command.Item value="dashboard">Dashboard</Command.Item>
						<Command.Item value="settings">Settings</Command.Item>
					</Command.Group>
				</Command.List>
			</Command.Root>
		</div>
	),
} satisfies Meta<typeof Command>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

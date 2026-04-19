import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../../buttons/button";
import { Icon } from "../../data-display/icon";
import { Empty } from "./empty";

const meta = {
	title: "Primitives/Feedback/Empty",
	component: Empty,
	tags: ["autodocs"],
	render: (args) => (
		<Empty {...args} style={{ width: 420 }}>
			<Empty.Header>
				<Empty.Icon>
					<Icon name="hugeicons:inbox" size="md" />
				</Empty.Icon>
				<Empty.Title>No projects yet</Empty.Title>
				<Empty.Description>
					Create your first project to see it listed here.
				</Empty.Description>
			</Empty.Header>
			<Empty.Content>
				<Empty.Actions>
					<Button variant="default">New project</Button>
					<Button variant="outline">Import</Button>
				</Empty.Actions>
			</Empty.Content>
		</Empty>
	),
} satisfies Meta<typeof Empty>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithIconChip: Story = { args: { variant: "icon" } };
export const Muted: Story = { args: { variant: "muted" } };
export const Dashed: Story = { args: { variant: "dashed" } };

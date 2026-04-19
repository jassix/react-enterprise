import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Table } from "./table";

type StoryArgs = ComponentProps<typeof Table>;

const rows = [
	{ id: "1", name: "Alice", role: "Owner", status: "Active" },
	{ id: "2", name: "Bob", role: "Admin", status: "Active" },
	{ id: "3", name: "Carol", role: "Member", status: "Invited" },
];

const meta = {
	title: "Primitives/Data Display/Table",
	component: Table,
	tags: ["autodocs"],
	argTypes: {
		density: { control: "inline-radio", options: ["compact", "comfortable", "spacious"] },
		striped: { control: "boolean" },
		bordered: { control: "boolean" },
	},
	render: (args) => (
		<Table {...args} containerProps={{ style: { width: 560 } }}>
			<Table.Header>
				<Table.Row>
					<Table.Head>Name</Table.Head>
					<Table.Head>Role</Table.Head>
					<Table.Head>Status</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{rows.map((row) => (
					<Table.Row key={row.id}>
						<Table.Cell>{row.name}</Table.Cell>
						<Table.Cell>{row.role}</Table.Cell>
						<Table.Cell>{row.status}</Table.Cell>
					</Table.Row>
				))}
			</Table.Body>
		</Table>
	),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Comfortable: Story = { args: { density: "comfortable" } };
export const Compact: Story = { args: { density: "compact" } };
export const Striped: Story = { args: { striped: true } };
export const Bordered: Story = { args: { bordered: true } };

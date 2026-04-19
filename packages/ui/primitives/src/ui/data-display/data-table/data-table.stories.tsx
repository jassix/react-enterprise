import type { Meta, StoryObj } from "@storybook/react-vite";
import { DataTable } from "./data-table";

const rows = [
	{ id: "evt-1", event: "User signed up", actor: "alice@acme.io", at: "2m ago" },
	{ id: "evt-2", event: "Project created", actor: "bob@acme.io", at: "10m ago" },
	{ id: "evt-3", event: "Deployed to prod", actor: "carol@acme.io", at: "1h ago" },
];

const meta = {
	title: "Primitives/Data Display/Data Table",
	component: DataTable,
	tags: ["autodocs"],
	argTypes: {
		density: { control: "inline-radio", options: ["compact", "comfortable", "spacious"] },
		striped: { control: "boolean" },
	},
	render: (args) => (
		<DataTable.Root {...args} style={{ width: 640 }}>
			<DataTable.Toolbar>
				<DataTable.ToolbarStart>
					<strong>Audit log</strong>
				</DataTable.ToolbarStart>
				<DataTable.ToolbarEnd>
					<span style={{ opacity: 0.6, fontSize: 13 }}>3 events</span>
				</DataTable.ToolbarEnd>
			</DataTable.Toolbar>
			<DataTable.TableWrapper>
				<DataTable.Table>
					<DataTable.Head>
						<DataTable.HeaderRow>
							<DataTable.Header>Event</DataTable.Header>
							<DataTable.Header>Actor</DataTable.Header>
							<DataTable.Header>When</DataTable.Header>
						</DataTable.HeaderRow>
					</DataTable.Head>
					<DataTable.Body>
						{rows.map((row) => (
							<DataTable.Row key={row.id}>
								<DataTable.Cell>{row.event}</DataTable.Cell>
								<DataTable.Cell>{row.actor}</DataTable.Cell>
								<DataTable.Cell>{row.at}</DataTable.Cell>
							</DataTable.Row>
						))}
					</DataTable.Body>
				</DataTable.Table>
			</DataTable.TableWrapper>
		</DataTable.Root>
	),
} satisfies Meta<typeof DataTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Striped: Story = { args: { striped: true } };
export const Compact: Story = { args: { density: "compact" } };

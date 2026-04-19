import type { Meta, StoryObj } from "@storybook/react-vite";
import { Item } from "./item";
import { Button } from "../../buttons/button";

const meta = {
	title: "Primitives/Data Display/Item",
	component: Item,
	tags: ["autodocs"],
	argTypes: {
		size: { control: "inline-radio", options: ["sm", "md", "lg"] },
		variant: { control: "inline-radio", options: ["default", "muted", "outline"] },
		interactive: { control: "boolean" },
	},
	render: (args) => (
		<div style={{ width: 460 }}>
			<Item.Root {...args}>
				<Item.Media>🗂️</Item.Media>
				<Item.Content>
					<Item.Title>Project alpha</Item.Title>
					<Item.Description>Updated 3 hours ago · 12 members</Item.Description>
				</Item.Content>
				<Item.Actions>
					<Button variant="outline" size="sm">Open</Button>
				</Item.Actions>
			</Item.Root>
		</div>
	),
} satisfies Meta<typeof Item>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Muted: Story = { args: { variant: "muted" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Interactive: Story = { args: { interactive: true } };

export const List: Story = {
	render: () => (
		<div style={{ width: 460, display: "flex", flexDirection: "column" }}>
			{["One", "Two", "Three"].map((label, i, arr) => (
				<div key={label}>
					<Item.Root>
						<Item.Content>
							<Item.Title>{label}</Item.Title>
							<Item.Description>Shared with team</Item.Description>
						</Item.Content>
					</Item.Root>
					{i < arr.length - 1 && <Item.Separator />}
				</div>
			))}
		</div>
	),
};

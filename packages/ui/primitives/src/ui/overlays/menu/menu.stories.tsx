import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { Button } from "../../buttons/button";
import { Icon } from "../../data-display/icon";
import { Menu } from "./menu";

const meta = {
	title: "Primitives/Overlays/Menu",
	component: Menu,
	tags: ["autodocs"],
	render: (args) => (
		<Menu.Root {...args}>
			<Menu.Trigger asChild>
				<Button variant="outline">
					Actions <Icon name="hugeicons:arrow-down-01" size="sm" />
				</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item value="duplicate">Duplicate</Menu.Item>
						<Menu.Item value="archive">Archive</Menu.Item>
						<Menu.Separator />
						<Menu.Item value="delete">Delete</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	),
} satisfies Meta<typeof Menu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Grouped: Story = {
	render: () => (
		<Menu.Root>
			<Menu.Trigger asChild>
				<Button variant="outline">Profile</Button>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.ItemGroup id="account">
							<Menu.ItemGroupLabel>Account</Menu.ItemGroupLabel>
							<Menu.Item value="profile">Profile</Menu.Item>
							<Menu.Item value="billing">Billing</Menu.Item>
						</Menu.ItemGroup>
						<Menu.Separator />
						<Menu.Item value="logout">Log out</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { NavigationMenu } from "./navigation-menu";

const meta = {
	title: "Primitives/Collections/Navigation Menu",
	component: NavigationMenu,
	tags: ["autodocs"],
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
	},
	render: (args) => (
		<NavigationMenu.Root {...args}>
			<NavigationMenu.List>
				<NavigationMenu.Item value="products">
					<NavigationMenu.Trigger>Products</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<NavigationMenu.Link href="#">Analytics</NavigationMenu.Link>
						<NavigationMenu.Link href="#">Experiments</NavigationMenu.Link>
						<NavigationMenu.Link href="#">Data warehouse</NavigationMenu.Link>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Item value="resources">
					<NavigationMenu.Trigger>Resources</NavigationMenu.Trigger>
					<NavigationMenu.Content>
						<NavigationMenu.Link href="#">Docs</NavigationMenu.Link>
						<NavigationMenu.Link href="#">Blog</NavigationMenu.Link>
						<NavigationMenu.Link href="#">Changelog</NavigationMenu.Link>
					</NavigationMenu.Content>
				</NavigationMenu.Item>
				<NavigationMenu.Indicator />
			</NavigationMenu.List>
			<NavigationMenu.Viewport />
		</NavigationMenu.Root>
	),
} satisfies Meta<typeof NavigationMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

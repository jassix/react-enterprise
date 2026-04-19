import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { ContextMenu } from "./context-menu";

const meta = {
	title: "Primitives/Overlays/Context Menu",
	component: ContextMenu,
	tags: ["autodocs"],
	render: () => (
		<ContextMenu.Root>
			<ContextMenu.Trigger>
				<div
					style={{
						padding: "48px 80px",
						border: "1px dashed rgba(0,0,0,0.25)",
						borderRadius: 8,
						textAlign: "center",
					}}
				>
					Right-click here
				</div>
			</ContextMenu.Trigger>
			<Portal>
				<ContextMenu.Positioner>
					<ContextMenu.Content>
						<ContextMenu.Item value="cut">
							<ContextMenu.ItemText>Cut</ContextMenu.ItemText>
							<ContextMenu.Shortcut>⌘X</ContextMenu.Shortcut>
						</ContextMenu.Item>
						<ContextMenu.Item value="copy">
							<ContextMenu.ItemText>Copy</ContextMenu.ItemText>
							<ContextMenu.Shortcut>⌘C</ContextMenu.Shortcut>
						</ContextMenu.Item>
						<ContextMenu.Item value="paste">
							<ContextMenu.ItemText>Paste</ContextMenu.ItemText>
							<ContextMenu.Shortcut>⌘V</ContextMenu.Shortcut>
						</ContextMenu.Item>
						<ContextMenu.Separator />
						<ContextMenu.Item value="delete">
							<ContextMenu.ItemText>Delete</ContextMenu.ItemText>
						</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Positioner>
			</Portal>
		</ContextMenu.Root>
	),
} satisfies Meta<typeof ContextMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

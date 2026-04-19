import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { Button } from "../../buttons/button";
import { Drawer } from "./drawer";

const meta = {
	title: "Primitives/Overlays/Drawer",
	component: Drawer,
	tags: ["autodocs"],
	render: (args) => (
		<Drawer.Root {...args}>
			<Drawer.Trigger asChild>
				<Button variant="outline">Open drawer</Button>
			</Drawer.Trigger>
			<Portal>
				<Drawer.Backdrop />
				<Drawer.Content>
					<Drawer.Handle />
					<Drawer.Header>
						<Drawer.Title>Session details</Drawer.Title>
						<Drawer.Description>A summary of this session.</Drawer.Description>
					</Drawer.Header>
					<Drawer.Body>
						Use drawers for focused secondary content — details panels, quick filters, or step-by-step flows.
					</Drawer.Body>
					<Drawer.Footer>
						<Drawer.CloseTrigger asChild>
							<Button variant="default">Done</Button>
						</Drawer.CloseTrigger>
					</Drawer.Footer>
				</Drawer.Content>
			</Portal>
		</Drawer.Root>
	),
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

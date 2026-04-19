import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { Button } from "../../buttons/button";
import { AlertDialog } from "./alert-dialog";

const meta = {
	title: "Primitives/Overlays/Alert Dialog",
	component: AlertDialog,
	tags: ["autodocs"],
	render: (args) => (
		<AlertDialog.Root {...args}>
			<AlertDialog.Trigger asChild>
				<Button variant="destructive">Delete account</Button>
			</AlertDialog.Trigger>
			<Portal>
				<AlertDialog.Backdrop />
				<AlertDialog.Positioner>
					<AlertDialog.Content>
						<AlertDialog.Header>
							<AlertDialog.Title>Delete your account?</AlertDialog.Title>
							<AlertDialog.Description>
								This is permanent. All projects, tokens, and history will be removed.
							</AlertDialog.Description>
						</AlertDialog.Header>
						<AlertDialog.Footer>
							<AlertDialog.CancelTrigger asChild>
								<Button variant="outline">Cancel</Button>
							</AlertDialog.CancelTrigger>
							<AlertDialog.ConfirmTrigger asChild>
								<Button variant="destructive">Delete</Button>
							</AlertDialog.ConfirmTrigger>
						</AlertDialog.Footer>
					</AlertDialog.Content>
				</AlertDialog.Positioner>
			</Portal>
		</AlertDialog.Root>
	),
} satisfies Meta<typeof AlertDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };

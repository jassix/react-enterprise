import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/icon";
import { Button } from "../../buttons/button";
import { Toast } from "./toast";

// Module-scope toaster — a single store for the entire story file. Creating it
// inside `render` caused two problems in Storybook:
//   1. The docs / autodocs renderer mounts the story multiple times, each
//      time spinning up a new store + zag machine + global hotkey listeners
//      that were never cleaned up.
//   2. `overlap: true` asks Ark to reposition every toast each time the stack
//      changes; combined with the old recipe's `transition: transform`, the
//      `--y` updates cascaded into a render storm.
// Putting the store here keeps it stable, and the recipe now composes with
// Ark's `--y` / `--scale` / `--opacity` vars via `translate` / `scale` /
// `opacity` — no more fighting the machine.
const toaster = Toast.createToaster({
	placement: "bottom-end",
	overlap: true,
	gap: 12,
	max: 5,
	// Auto-dismiss after 4s so rapid clicks don't pile up machines forever.
	duration: 4000,
});

const meta = {
	title: "Primitives/Feedback/Toast",
	component: Toast,
	// Autodocs tries to statically render a preview of the interactive story,
	// which spins up a live toaster on the docs page for no benefit. Keep the
	// story interactive-only.
	parameters: { docs: { disable: true } },
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
	render: () => (
		<>
			<div style={{ display: "flex", gap: 8 }}>
				<Button
					onClick={() =>
						toaster.create({
							title: "Saved",
							description: "Your changes have been saved.",
							type: "success",
						})
					}
				>
					Success
				</Button>
				<Button
					variant="outline"
					intent="critical"
					onClick={() =>
						toaster.create({
							title: "Failed",
							description: "We couldn't complete the request.",
							type: "error",
						})
					}
				>
					Error
				</Button>
			</div>
			<Toast.Toaster toaster={toaster}>
				{(toast) => (
					<Toast.Root key={toast.id}>
						<Toast.Title>{toast.title}</Toast.Title>
						<Toast.Description>{toast.description}</Toast.Description>
						<Toast.CloseTrigger>
							<Icon name="hugeicons:cancel-01" size="sm" />
						</Toast.CloseTrigger>
					</Toast.Root>
				)}
			</Toast.Toaster>
		</>
	),
};

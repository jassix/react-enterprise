import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { HoverCard } from "./hover-card";

const meta = {
	title: "Primitives/Overlays/Hover Card",
	component: HoverCard,
	tags: ["autodocs"],
	parameters: { layout: "centered" },
	render: (args) => (
		<HoverCard.Root {...args}>
			<HoverCard.Trigger>@mikita</HoverCard.Trigger>
			<Portal>
				<HoverCard.Positioner>
					<HoverCard.Content>
						<HoverCard.Arrow />
						<strong>Mikita Pitunoŭ</strong>
						<div style={{ opacity: 0.7, fontSize: 13 }}>Joined 2024 · 42 repos</div>
					</HoverCard.Content>
				</HoverCard.Positioner>
			</Portal>
		</HoverCard.Root>
	),
} satisfies Meta<typeof HoverCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const OpenByDefault: Story = { args: { defaultOpen: true } };

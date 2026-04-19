import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/icon";
import { Sonner } from "./sonner";

const meta = {
	title: "Primitives/Feedback/Sonner",
	component: Sonner,
	tags: ["autodocs"],
	argTypes: {
		status: {
			control: "inline-radio",
			options: ["neutral", "info", "positive", "caution", "critical", "loading"],
		},
		placement: {
			control: "inline-radio",
			options: ["top-left", "top-center", "top-right", "bottom-left", "bottom-center", "bottom-right"],
		},
	},
	render: (args) => (
		<Sonner.Viewport {...args} style={{ position: "relative", minHeight: 160 }}>
			<Sonner.Toast {...args}>
				<Sonner.Icon>
					<Icon name="hugeicons:tick-circle" size="md" />
				</Sonner.Icon>
				<Sonner.Title>Snapshot created</Sonner.Title>
				<Sonner.Description>Restored from 2 minutes ago.</Sonner.Description>
				<Sonner.ActionButton>Undo</Sonner.ActionButton>
				<Sonner.CloseButton>
					<Icon name="hugeicons:cancel-01" size="sm" />
				</Sonner.CloseButton>
			</Sonner.Toast>
		</Sonner.Viewport>
	),
} satisfies Meta<typeof Sonner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { status: "info" } };
export const Positive: Story = { args: { status: "positive" } };
export const Critical: Story = { args: { status: "critical" } };

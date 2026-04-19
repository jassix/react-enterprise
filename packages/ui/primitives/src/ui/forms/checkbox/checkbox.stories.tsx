import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/icon";
import { Checkbox } from "./checkbox";

const meta = {
	title: "Primitives/Forms/Checkbox",
	component: Checkbox,
	tags: ["autodocs"],
	render: () => (
		<Checkbox.Root>
			<Checkbox.Control>
				<Checkbox.Indicator><Icon name="hugeicons:tick-02" size="xs" /></Checkbox.Indicator>
			</Checkbox.Control>
			<Checkbox.Label>Accept terms</Checkbox.Label>
		</Checkbox.Root>
	),
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultChecked: Story = {
	render: () => (
		<Checkbox.Root defaultChecked>
			<Checkbox.Control>
				<Checkbox.Indicator><Icon name="hugeicons:tick-02" size="xs" /></Checkbox.Indicator>
			</Checkbox.Control>
			<Checkbox.Label>Subscribe to updates</Checkbox.Label>
		</Checkbox.Root>
	),
};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
			{(["sm", "md", "lg"] as const).map((size) => (
				<Checkbox.Root key={size} defaultChecked>
					<Checkbox.Control size={size}>
						<Checkbox.Indicator><Icon name="hugeicons:tick-02" size="xs" /></Checkbox.Indicator>
					</Checkbox.Control>
					<Checkbox.Label>Size: {size}</Checkbox.Label>
				</Checkbox.Root>
			))}
		</div>
	),
};

export const Intents: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
			{(["primary", "critical", "positive"] as const).map((intent) => (
				<Checkbox.Root key={intent} defaultChecked>
					<Checkbox.Control intent={intent}>
						<Checkbox.Indicator><Icon name="hugeicons:tick-02" size="xs" /></Checkbox.Indicator>
					</Checkbox.Control>
					<Checkbox.Label>Intent: {intent}</Checkbox.Label>
				</Checkbox.Root>
			))}
		</div>
	),
};

export const Disabled: Story = {
	render: () => (
		<Checkbox.Root disabled>
			<Checkbox.Control>
				<Checkbox.Indicator><Icon name="hugeicons:tick-02" size="xs" /></Checkbox.Indicator>
			</Checkbox.Control>
			<Checkbox.Label>Disabled</Checkbox.Label>
		</Checkbox.Root>
	),
};

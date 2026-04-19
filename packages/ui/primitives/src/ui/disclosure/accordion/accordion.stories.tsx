import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/icon";
import { Accordion } from "./accordion";

const items = [
	{ value: "shipping", title: "Shipping", body: "We ship worldwide within 2–5 business days." },
	{ value: "returns", title: "Returns", body: "Free returns within 30 days of delivery." },
	{ value: "support", title: "Support", body: "Reach our team 24/7 via chat or email." },
];

const meta = {
	title: "Primitives/Disclosure/Accordion",
	component: Accordion,
	tags: ["autodocs"],
	render: (args) => (
		<div style={{ width: 420 }}>
			<Accordion.Root {...args}>
				{items.map((item) => (
					<Accordion.Item key={item.value} value={item.value}>
						<Accordion.Trigger>
							{item.title}
							<Accordion.Indicator>
								<Icon name="hugeicons:arrow-down-01" size="sm" />
							</Accordion.Indicator>
						</Accordion.Trigger>
						<Accordion.Content>{item.body}</Accordion.Content>
					</Accordion.Item>
				))}
			</Accordion.Root>
		</div>
	),
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = { args: { defaultValue: ["shipping"] } };
export const Multiple: Story = { args: { multiple: true, defaultValue: ["shipping", "returns"] } };
export const Collapsible: Story = { args: { collapsible: true } };

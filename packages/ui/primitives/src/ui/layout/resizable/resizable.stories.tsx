import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Resizable } from "./resizable";

type StoryArgs = ComponentProps<typeof Resizable.Root>;

const panels = [
	{ id: "sidebar", size: 30, minSize: 15 },
	{ id: "main", size: 70, minSize: 30 },
];

const meta = {
	title: "Primitives/Layout/Resizable",
	component: Resizable.Root,
	tags: ["autodocs"],
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
		variant: { control: "inline-radio", options: ["bar", "handle"] },
	},
	render: (args) => (
		<Resizable.Root {...args} panels={panels} style={{ width: 520, height: 240 }}>
			<Resizable.Panel id="sidebar">
				<div style={{ padding: 12, height: "100%", background: "rgba(0,0,0,0.04)" }}>Sidebar</div>
			</Resizable.Panel>
			<Resizable.ResizeTrigger id="sidebar:main" />
			<Resizable.Panel id="main">
				<div style={{ padding: 12, height: "100%", background: "rgba(0,0,0,0.02)" }}>Main</div>
			</Resizable.Panel>
		</Resizable.Root>
	),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Horizontal: Story = { args: { orientation: "horizontal" } };
export const Vertical: Story = { args: { orientation: "vertical" } };
export const HandleVariant: Story = { args: { variant: "handle" } };

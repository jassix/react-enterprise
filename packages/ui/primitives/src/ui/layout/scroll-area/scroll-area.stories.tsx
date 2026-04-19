import type { Meta, StoryObj } from "@storybook/react-vite";
import { ScrollArea } from "./scroll-area";

const meta = {
	title: "Primitives/Layout/Scroll Area",
	component: ScrollArea,
	tags: ["autodocs"],
	argTypes: {
		size: { control: "inline-radio", options: ["thin", "md", "thick"] },
	},
	render: (args) => (
		<ScrollArea.Root {...args} style={{ height: 220, width: 320, border: "1px solid rgba(0,0,0,0.1)", borderRadius: 8 }}>
			<ScrollArea.Viewport>
				<div style={{ padding: 12 }}>
					{Array.from({ length: 40 }).map((_, i) => (
						<div key={i} style={{ padding: "6px 0", borderBottom: "1px dashed rgba(0,0,0,0.08)" }}>
							Row {i + 1}
						</div>
					))}
				</div>
			</ScrollArea.Viewport>
			<ScrollArea.Scrollbar orientation="vertical">
				<ScrollArea.Thumb />
			</ScrollArea.Scrollbar>
			<ScrollArea.Corner />
		</ScrollArea.Root>
	),
} satisfies Meta<typeof ScrollArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Thin: Story = { args: { size: "thin" } };
export const Medium: Story = { args: { size: "md" } };
export const Thick: Story = { args: { size: "thick" } };

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Stack } from "./stack";

const meta = {
  title: "Primitives/Typography/Stack",
  component: Stack,
  tags: ["autodocs"],
  argTypes: {
    direction: { control: "inline-radio", options: ["row", "column"] },
    gap: { control: "text" },
  },
  render: (args) => (
    <Stack {...args}>
      <div style={{ background: "rgba(0,0,0,0.05)", padding: 8 }}>First</div>
      <div style={{ background: "rgba(0,0,0,0.05)", padding: 8 }}>Second</div>
      <div style={{ background: "rgba(0,0,0,0.05)", padding: 8 }}>Third</div>
    </Stack>
  ),
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Column: Story = { args: { direction: "column", gap: "12px" } };
export const Row: Story = { args: { direction: "row", gap: "12px" } };

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar } from "./avatar";

const meta = {
  title: "Primitives/Data Display/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  args: { fallback: "MP" },
  argTypes: {
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg", "xl", "2xl"] },
    shape: { control: "inline-radio", options: ["circle", "square", "rounded"] },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fallback: Story = {};

export const WithImage: Story = {
  args: { src: "https://i.pravatar.cc/96?img=12", alt: "User" },
};

export const Shapes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      <Avatar {...args} shape="circle" />
      <Avatar {...args} shape="rounded" />
      <Avatar {...args} shape="square" />
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {(["xs", "sm", "md", "lg", "xl", "2xl"] as const).map((size) => (
        <Avatar key={size} {...args} size={size} />
      ))}
    </div>
  ),
};

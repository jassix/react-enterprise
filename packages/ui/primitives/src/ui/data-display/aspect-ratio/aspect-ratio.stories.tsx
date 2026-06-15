import type { Meta, StoryObj } from "@storybook/react-vite";
import { AspectRatio } from "./aspect-ratio";

const meta = {
  title: "Primitives/Data Display/Aspect Ratio",
  component: AspectRatio,
  tags: ["autodocs"],
  argTypes: {
    ratio: {
      control: "inline-radio",
      options: ["square", "video", "wide", "portrait", "classic", "golden"],
    },
  },
  render: (args) => (
    <div style={{ width: 320 }}>
      <AspectRatio
        {...args}
        style={{
          background: "var(--colors-surface-muted, #eee)",
          display: "grid",
          placeItems: "center",
        }}
      >
        <span style={{ opacity: 0.6 }}>{args.ratio ?? "default"}</span>
      </AspectRatio>
    </div>
  ),
} satisfies Meta<typeof AspectRatio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Square: Story = { args: { ratio: "square" } };
export const Video: Story = { args: { ratio: "video" } };
export const Wide: Story = { args: { ratio: "wide" } };
export const Portrait: Story = { args: { ratio: "portrait" } };
export const Golden: Story = { args: { ratio: "golden" } };

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "./badge";

const meta = {
  title: "Primitives/Data Display/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge" },
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "secondary", "outline", "ghost", "destructive"],
    },
    intent: {
      control: "inline-radio",
      options: ["primary", "critical", "positive", "caution", "info"],
    },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Ghost: Story = { args: { variant: "ghost" } };
export const Destructive: Story = { args: { variant: "destructive" } };

export const Intents: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      {(["default", "outline", "ghost"] as const).map((variant) => (
        <div key={variant} style={{ display: "flex", gap: 6, alignItems: "center" }}>
          <span style={{ width: 80, fontSize: 12, opacity: 0.6 }}>{variant}</span>
          {(["primary", "critical", "positive", "caution", "info"] as const).map((intent) => (
            <Badge key={intent} {...args} variant={variant} intent={intent}>
              {intent}
            </Badge>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <Badge {...args} size="sm">
        Small
      </Badge>
      <Badge {...args} size="md">
        Medium
      </Badge>
      <Badge {...args} size="lg">
        Large
      </Badge>
    </div>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/icon";
import { Toggle } from "./toggle";

const meta = {
  title: "Primitives/Buttons/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["default", "outline"] },
    intent: {
      control: "inline-radio",
      options: ["primary", "critical", "positive", "caution", "info"],
    },
    size: { control: "inline-radio", options: ["xs", "sm", "md", "lg"] },
    icon: { control: "boolean" },
  },
  render: (args) => (
    <Toggle.Root {...args}>
      <Toggle.Indicator>
        <Icon name="hugeicons:star" size="sm" />
      </Toggle.Indicator>
      Favorite
    </Toggle.Root>
  ),
} satisfies Meta<typeof Toggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Pressed: Story = { args: { variant: "default", defaultPressed: true } };
export const PressedCritical: Story = {
  args: { variant: "default", intent: "critical", defaultPressed: true },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
      {(["xs", "sm", "md", "lg"] as const).map((size) => (
        <Toggle.Root key={size} size={size}>
          <Toggle.Indicator>
            <Icon name="hugeicons:star" size="sm" />
          </Toggle.Indicator>
          {size}
        </Toggle.Root>
      ))}
    </div>
  ),
};

const intents = ["primary", "critical", "positive", "caution", "info"] as const;

export const Intents: Story = {
  render: (args) => (
    <div style={{ display: "grid", gap: 12 }}>
      {(["default", "outline"] as const).map((variant) => (
        <div
          key={variant}
          style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}
        >
          <span style={{ width: 72, fontSize: 12, opacity: 0.6 }}>{variant}</span>
          {intents.map((intent) => (
            <Toggle.Root key={intent} {...args} variant={variant} intent={intent} defaultPressed>
              <Toggle.Indicator>
                <Icon name="hugeicons:star" size="sm" />
              </Toggle.Indicator>
              {intent}
            </Toggle.Root>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const IconOnly: Story = {
  args: { icon: true, "aria-label": "Favorite" },
  render: (args) => (
    <Toggle.Root {...args}>
      <Icon name="hugeicons:star" size="sm" />
    </Toggle.Root>
  ),
};

export const WithIndicatorIntent: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
      {intents.map((intent) => (
        <Toggle.Root key={intent} intent={intent}>
          <Toggle.Indicator>
            <Icon name="hugeicons:tick-02" size="sm" />
          </Toggle.Indicator>
          {intent}
        </Toggle.Root>
      ))}
    </div>
  ),
};

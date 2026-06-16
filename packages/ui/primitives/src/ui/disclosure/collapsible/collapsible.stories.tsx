import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/icon";
import { Collapsible } from "./collapsible";

const meta = {
  title: "Primitives/Disclosure/Collapsible",
  component: Collapsible,
  tags: ["autodocs"],
  render: (args) => (
    <div style={{ width: 360 }}>
      <Collapsible.Root {...args}>
        <Collapsible.Trigger>
          Show advanced options
          <Collapsible.Indicator>
            <Icon name="hugeicons:arrow-down-01" size="sm" />
          </Collapsible.Indicator>
        </Collapsible.Trigger>
        <Collapsible.Content>
          <div style={{ padding: 8, opacity: 0.7 }}>
            Advanced settings for power users — keyboard shortcuts, telemetry, beta features.
          </div>
        </Collapsible.Content>
      </Collapsible.Root>
    </div>
  ),
} satisfies Meta<typeof Collapsible>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };

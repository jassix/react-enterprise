import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { Tooltip } from "./tooltip";

const meta = {
  title: "Primitives/Overlays/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  render: () => (
    <Tooltip.Root openDelay={100} closeDelay={50}>
      <Tooltip.Trigger>Hover me</Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Tooltip content
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  ),
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const OpenByDefault: Story = {
  render: () => (
    <Tooltip.Root defaultOpen openDelay={0} closeDelay={0}>
      <Tooltip.Trigger>Always open</Tooltip.Trigger>
      <Portal>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow />
            Visible tooltip
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Portal>
    </Tooltip.Root>
  ),
};

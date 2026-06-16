import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { Button } from "../../buttons/button";
import { Popover } from "./popover";

const meta = {
  title: "Primitives/Overlays/Popover",
  component: Popover,
  tags: ["autodocs"],
  render: (args) => (
    <Popover.Root {...args}>
      <Popover.Trigger asChild>
        <Button variant="outline">Open popover</Button>
      </Popover.Trigger>
      <Portal>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Title>Quick settings</Popover.Title>
            <Popover.Description>Adjust preferences inline.</Popover.Description>
            <Popover.CloseTrigger asChild>
              <Button variant="ghost" size="sm">
                Close
              </Button>
            </Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Positioner>
      </Portal>
    </Popover.Root>
  ),
} satisfies Meta<typeof Popover>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };

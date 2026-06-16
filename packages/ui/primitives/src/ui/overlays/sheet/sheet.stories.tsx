import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { Button } from "../../buttons/button";
import { Sheet } from "./sheet";

const meta = {
  title: "Primitives/Overlays/Sheet",
  component: Sheet,
  tags: ["autodocs"],
  render: (args) => (
    <Sheet.Root {...args}>
      <Sheet.Trigger asChild>
        <Button variant="outline">Open sheet</Button>
      </Sheet.Trigger>
      <Portal>
        <Sheet.Backdrop />
        <Sheet.Positioner>
          <Sheet.Content>
            <Sheet.Header>
              <Sheet.Title>Edit profile</Sheet.Title>
              <Sheet.Description>Make changes and save when ready.</Sheet.Description>
            </Sheet.Header>
            <Sheet.Body>
              Sheets slide in from an edge for secondary tasks that don't warrant a full page.
            </Sheet.Body>
            <Sheet.Footer>
              <Sheet.CloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Sheet.CloseTrigger>
              <Sheet.CloseTrigger asChild>
                <Button variant="default">Save</Button>
              </Sheet.CloseTrigger>
            </Sheet.Footer>
          </Sheet.Content>
        </Sheet.Positioner>
      </Portal>
    </Sheet.Root>
  ),
} satisfies Meta<typeof Sheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

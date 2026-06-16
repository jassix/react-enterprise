import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { Button } from "../../buttons/button";
import { Dialog } from "./dialog";

const meta = {
  title: "Primitives/Overlays/Dialog",
  component: Dialog,
  tags: ["autodocs"],
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger asChild>
        <Button variant="default">Open dialog</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Delete project?</Dialog.Title>
              <Dialog.Description>
                This action cannot be undone. The project and all of its data will be removed.
              </Dialog.Description>
            </Dialog.Header>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.CloseTrigger>
              <Dialog.CloseTrigger asChild>
                <Button variant="destructive">Delete</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  ),
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Open: Story = { args: { defaultOpen: true } };

export const Scrollable: Story = {
  args: { defaultOpen: true },
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger asChild>
        <Button variant="default">Open scrollable</Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Terms of service</Dialog.Title>
              <Dialog.Description>Please read carefully before accepting.</Dialog.Description>
            </Dialog.Header>
            <div style={{ overflow: "auto", maxHeight: "40vh" }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <p key={i} style={{ marginBottom: 12 }}>
                  Section {i + 1}. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>
              ))}
            </div>
            <Dialog.Footer>
              <Dialog.CloseTrigger asChild>
                <Button variant="outline">Decline</Button>
              </Dialog.CloseTrigger>
              <Dialog.CloseTrigger asChild>
                <Button variant="default">Accept</Button>
              </Dialog.CloseTrigger>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { Menubar } from "./menubar";

const meta = {
  title: "Primitives/Overlays/Menubar",
  component: Menubar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  render: (args) => (
    <Menubar.Root {...args}>
      <Menubar.Menu>
        <Menubar.Trigger>File</Menubar.Trigger>
        <Portal>
          <Menubar.Positioner>
            <Menubar.Content>
              <Menubar.Item value="new">
                <Menubar.ItemText>New</Menubar.ItemText>
                <Menubar.Shortcut>⌘N</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Item value="open">
                <Menubar.ItemText>Open</Menubar.ItemText>
                <Menubar.Shortcut>⌘O</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Separator />
              <Menubar.Item value="save">
                <Menubar.ItemText>Save</Menubar.ItemText>
                <Menubar.Shortcut>⌘S</Menubar.Shortcut>
              </Menubar.Item>
            </Menubar.Content>
          </Menubar.Positioner>
        </Portal>
      </Menubar.Menu>
      <Menubar.Menu>
        <Menubar.Trigger>Edit</Menubar.Trigger>
        <Portal>
          <Menubar.Positioner>
            <Menubar.Content>
              <Menubar.Item value="undo">
                <Menubar.ItemText>Undo</Menubar.ItemText>
                <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
              </Menubar.Item>
              <Menubar.Item value="redo">
                <Menubar.ItemText>Redo</Menubar.ItemText>
                <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
              </Menubar.Item>
            </Menubar.Content>
          </Menubar.Positioner>
        </Portal>
      </Menubar.Menu>
    </Menubar.Root>
  ),
} satisfies Meta<typeof Menubar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

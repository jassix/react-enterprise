import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { createListCollection } from "@ark-ui/react/select";
import type { ComponentProps } from "react";
import { Icon } from "../../data-display/icon";
import { Select } from "./select";

type StoryArgs = ComponentProps<typeof Select.Root>;

const collection = createListCollection({
  items: [
    { value: "owner", label: "Owner" },
    { value: "admin", label: "Admin" },
    { value: "member", label: "Member" },
    { value: "viewer", label: "Viewer" },
  ],
});

const meta = {
  title: "Primitives/Forms/Select",
  component: Select.Root,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  render: (args) => (
    <div style={{ width: 280 }}>
      <Select.Root {...args} collection={collection}>
        <Select.Label>Role</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select a role" />
            <Select.Indicator>
              <Icon name="hugeicons:unfold-more" size="sm" />
            </Select.Indicator>
          </Select.Trigger>
        </Select.Control>
        <Portal>
          <Select.Positioner>
            <Select.Content>
              {collection.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator>
                    <Icon name="hugeicons:tick-02" size="sm" />
                  </Select.ItemIndicator>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
        </Portal>
      </Select.Root>
    </div>
  ),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};
export const Large: Story = { args: { size: "lg" } };

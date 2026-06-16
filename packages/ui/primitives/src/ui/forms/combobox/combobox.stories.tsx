import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { createListCollection } from "@ark-ui/react/combobox";
import type { ComponentProps } from "react";
import { useMemo, useState } from "react";
import { Icon } from "../../data-display/icon";
import { Combobox } from "./combobox";

type StoryArgs = ComponentProps<typeof Combobox.Root>;

const frameworks = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
  { value: "solid", label: "Solid" },
  { value: "qwik", label: "Qwik" },
];

const meta = {
  title: "Primitives/Forms/Combobox",
  component: Combobox.Root,
  tags: ["autodocs"],
  render: () => {
    const [query, setQuery] = useState("");
    const collection = useMemo(
      () =>
        createListCollection({
          items: frameworks.filter((i) => i.label.toLowerCase().includes(query.toLowerCase())),
        }),
      [query],
    );

    return (
      <div style={{ width: 320 }}>
        <Combobox.Root collection={collection} onInputValueChange={(e) => setQuery(e.inputValue)}>
          <Combobox.Label>Framework</Combobox.Label>
          <Combobox.Control>
            <Combobox.Input placeholder="Search…" />
            <Combobox.Trigger>
              <Icon name="hugeicons:unfold-more" size="sm" />
            </Combobox.Trigger>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                {collection.items.length === 0 ? (
                  <Combobox.Empty>No matches</Combobox.Empty>
                ) : (
                  collection.items.map((item) => (
                    <Combobox.Item key={item.value} item={item}>
                      <Combobox.ItemText>{item.label}</Combobox.ItemText>
                      <Combobox.ItemIndicator>
                        <Icon name="hugeicons:tick-02" size="sm" />
                      </Combobox.ItemIndicator>
                    </Combobox.Item>
                  ))
                )}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
      </div>
    );
  },
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {
  args: { collection: createListCollection({ items: frameworks }) },
};

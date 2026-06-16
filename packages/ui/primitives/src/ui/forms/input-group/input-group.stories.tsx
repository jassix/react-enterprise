import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputGroup } from "./input-group";

const meta = {
  title: "Primitives/Forms/Input Group",
  component: InputGroup,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "inline-radio", options: ["outline", "filled", "flushed"] },
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <InputGroup.Root {...args}>
        <InputGroup.StartAddon>https://</InputGroup.StartAddon>
        <InputGroup.Input placeholder="your-domain" />
        <InputGroup.EndAddon>.com</InputGroup.EndAddon>
      </InputGroup.Root>
    </div>
  ),
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Addons: Story = {};

export const WithElements: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <InputGroup.Root {...args}>
        <InputGroup.StartElement>🔍</InputGroup.StartElement>
        <InputGroup.Input placeholder="Search…" />
        <InputGroup.EndElement>⌘K</InputGroup.EndElement>
      </InputGroup.Root>
    </div>
  ),
};

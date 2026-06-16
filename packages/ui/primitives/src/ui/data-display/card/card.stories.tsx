import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "./card";

const meta = {
  title: "Primitives/Data Display/Card",
  component: Card,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md"] },
    interactive: { control: "boolean" },
  },
  render: (args) => (
    <Card {...args} style={{ maxWidth: 360 }}>
      <Card.Header>
        <Card.Title>Card title</Card.Title>
        <Card.Description>
          Short supporting copy that explains the purpose of this card and its contents.
        </Card.Description>
      </Card.Header>
      <Card.Content>Main card content lives here.</Card.Content>
      <Card.Footer>Footer</Card.Footer>
    </Card>
  ),
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { size: "md" } };
export const Small: Story = { args: { size: "sm" } };
export const Interactive: Story = { args: { size: "md", interactive: true } };

export const WithAction: Story = {
  render: () => (
    <Card style={{ maxWidth: 360 }}>
      <Card.Header>
        <Card.Title>Billing plan</Card.Title>
        <Card.Description>Manage your subscription and invoices.</Card.Description>
        <Card.Action>
          <button type="button" style={{ fontSize: 12 }}>
            Upgrade
          </button>
        </Card.Action>
      </Card.Header>
      <Card.Content>Your current plan renews on April 30.</Card.Content>
    </Card>
  ),
};

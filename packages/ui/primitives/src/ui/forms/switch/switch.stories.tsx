import type { Meta, StoryObj } from "@storybook/react-vite";
import { Switch } from "./switch";

const meta = {
  title: "Primitives/Forms/Switch",
  component: Switch,
  tags: ["autodocs"],
  render: () => (
    <Switch.Root>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Enable notifications</Switch.Label>
    </Switch.Root>
  ),
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DefaultChecked: Story = {
  render: () => (
    <Switch.Root defaultChecked>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Auto-save drafts</Switch.Label>
    </Switch.Root>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {(["sm", "md", "lg"] as const).map((size) => (
        <Switch.Root key={size} defaultChecked>
          <Switch.Control size={size}>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Size: {size}</Switch.Label>
        </Switch.Root>
      ))}
    </div>
  ),
};

export const Intents: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {(["primary", "critical", "positive"] as const).map((intent) => (
        <Switch.Root key={intent} defaultChecked>
          <Switch.Control intent={intent}>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.Label>Intent: {intent}</Switch.Label>
        </Switch.Root>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Switch.Root disabled>
      <Switch.Control>
        <Switch.Thumb />
      </Switch.Control>
      <Switch.Label>Disabled</Switch.Label>
    </Switch.Root>
  ),
};

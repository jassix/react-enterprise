import type { Meta, StoryObj } from "@storybook/react-vite";
import { Alert } from "./alert";

const meta = {
  title: "Primitives/Feedback/Alert",
  component: Alert,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "inline-radio",
      options: ["default", "destructive", "subtle", "solid", "outline"],
    },
    status: {
      control: "inline-radio",
      options: ["info", "positive", "caution", "critical"],
    },
  },
  render: (args) => (
    <Alert {...args} style={{ width: 360 }}>
      <Alert.Title>Update available</Alert.Title>
      <Alert.Description>A new version of the design system is ready to install.</Alert.Description>
    </Alert>
  ),
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Destructive: Story = { args: { variant: "destructive" } };
export const Info: Story = { args: { variant: "subtle", status: "info" } };
export const Positive: Story = { args: { variant: "subtle", status: "positive" } };
export const Caution: Story = { args: { variant: "subtle", status: "caution" } };
export const Critical: Story = { args: { variant: "subtle", status: "critical" } };

export const WithAction: Story = {
  render: () => (
    <Alert variant="subtle" status="caution" style={{ width: 420 }}>
      <Alert.Title>Unsaved changes</Alert.Title>
      <Alert.Description>Leaving now will discard this draft.</Alert.Description>
      <Alert.Action>
        <button type="button" style={{ fontSize: 12 }}>
          Save
        </button>
      </Alert.Action>
    </Alert>
  ),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup } from "./radio-group";

const items = [
  { value: "monthly", label: "Monthly" },
  { value: "annually", label: "Annually" },
  { value: "lifetime", label: "Lifetime" },
];

const meta = {
  title: "Primitives/Forms/Radio Group",
  component: RadioGroup,
  tags: ["autodocs"],
  args: { defaultValue: "monthly" },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    intent: { control: "inline-radio", options: ["primary", "critical", "positive"] },
  },
  render: (args) => (
    <RadioGroup.Root {...args}>
      <RadioGroup.Label>Billing cadence</RadioGroup.Label>
      {items.map((item) => (
        <RadioGroup.Item key={item.value} value={item.value}>
          <RadioGroup.ItemControl>
            <RadioGroup.Indicator />
          </RadioGroup.ItemControl>
          <RadioGroup.ItemText>{item.label}</RadioGroup.ItemText>
        </RadioGroup.Item>
      ))}
    </RadioGroup.Root>
  ),
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Critical: Story = { args: { intent: "critical" } };
export const Large: Story = { args: { size: "lg" } };

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Icon } from "../../data-display/icon";
import { Calendar } from "./calendar";

const meta = {
  title: "Primitives/Date/Calendar",
  component: Calendar,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    variant: { control: "inline-radio", options: ["default", "bordered"] },
  },
  render: (args) => (
    <Calendar.Root {...args}>
      <Calendar.Header>
        <Calendar.PrevTrigger>
          <Icon name="hugeicons:arrow-left-01" size="sm" />
        </Calendar.PrevTrigger>
        <Calendar.Heading />
        <Calendar.NextTrigger>
          <Icon name="hugeicons:arrow-right-01" size="sm" />
        </Calendar.NextTrigger>
      </Calendar.Header>
      <Calendar.View view="day">
        <Calendar.Grid>
          <Calendar.TableHead>
            <Calendar.RowHeader>Mo</Calendar.RowHeader>
            <Calendar.RowHeader>Tu</Calendar.RowHeader>
            <Calendar.RowHeader>We</Calendar.RowHeader>
            <Calendar.RowHeader>Th</Calendar.RowHeader>
            <Calendar.RowHeader>Fr</Calendar.RowHeader>
            <Calendar.RowHeader>Sa</Calendar.RowHeader>
            <Calendar.RowHeader>Su</Calendar.RowHeader>
          </Calendar.TableHead>
        </Calendar.Grid>
      </Calendar.View>
    </Calendar.Root>
  ),
} satisfies Meta<typeof Calendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Bordered: Story = { args: { variant: "bordered" } };

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Slider } from "./slider";

const meta = {
  title: "Primitives/Forms/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: { defaultValue: [40], min: 0, max: 100, step: 1 },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
    intent: { control: "inline-radio", options: ["primary", "critical", "positive"] },
  },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Slider.Root {...args}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Slider.Label>Volume</Slider.Label>
          <Slider.ValueText />
        </div>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} />
        </Slider.Control>
      </Slider.Root>
    </div>
  ),
} satisfies Meta<typeof Slider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Range: Story = {
  args: { defaultValue: [20, 70] },
  render: (args) => (
    <div style={{ width: 360 }}>
      <Slider.Root {...args}>
        <Slider.Label>Price range</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} />
          <Slider.Thumb index={1} />
        </Slider.Control>
      </Slider.Root>
    </div>
  ),
};

export const WithMarkers: Story = {
  render: (args) => (
    <div style={{ width: 360 }}>
      <Slider.Root {...args}>
        <Slider.Label>Steps</Slider.Label>
        <Slider.Control>
          <Slider.Track>
            <Slider.Range />
          </Slider.Track>
          <Slider.Thumb index={0} />
        </Slider.Control>
        <Slider.MarkerGroup>
          <Slider.Marker value={0}>0</Slider.Marker>
          <Slider.Marker value={50}>50</Slider.Marker>
          <Slider.Marker value={100}>100</Slider.Marker>
        </Slider.MarkerGroup>
      </Slider.Root>
    </div>
  ),
};

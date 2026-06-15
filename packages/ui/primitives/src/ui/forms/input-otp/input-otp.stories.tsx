import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputOtp } from "./input-otp";

const meta = {
  title: "Primitives/Forms/Input OTP",
  component: InputOtp,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] },
    attached: { control: "boolean" },
  },
  render: (args) => (
    <InputOtp.Root {...args} otp>
      <InputOtp.Label>Verification code</InputOtp.Label>
      <InputOtp.Control>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <InputOtp.Input key={i} index={i} />
        ))}
      </InputOtp.Control>
      <InputOtp.HiddenInput />
    </InputOtp.Root>
  ),
} satisfies Meta<typeof InputOtp>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Attached: Story = { args: { attached: true } };
export const Large: Story = { args: { size: "lg" } };

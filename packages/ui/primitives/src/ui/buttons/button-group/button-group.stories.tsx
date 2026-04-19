import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button";
import { ButtonGroup } from "./button-group";

const meta = {
	title: "Primitives/Buttons/Button Group",
	component: ButtonGroup,
	tags: ["autodocs"],
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
	},
	render: (args) => (
		<ButtonGroup {...args}>
			<Button variant="outline">One</Button>
			<Button variant="outline">Two</Button>
			<Button variant="outline">Three</Button>
		</ButtonGroup>
	),
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = { args: { orientation: "horizontal" } };
export const Vertical: Story = { args: { orientation: "vertical" } };

export const WithSeparator: Story = {
	render: () => (
		<ButtonGroup>
			<Button variant="outline">Cut</Button>
			<ButtonGroup.Separator />
			<Button variant="outline">Copy</Button>
			<ButtonGroup.Separator />
			<Button variant="outline">Paste</Button>
		</ButtonGroup>
	),
};

export const WithText: Story = {
	render: () => (
		<ButtonGroup>
			<Button variant="outline">Reply</Button>
			<ButtonGroup.Text>·</ButtonGroup.Text>
			<Button variant="outline">Forward</Button>
		</ButtonGroup>
	),
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Button } from "./button";

const meta = {
	title: "Primitives/Buttons/Button",
	component: Button,
	tags: ["autodocs"],
	parameters: {
		design: {
			type: "figma",
			url: "https://www.figma.com/file/REPLACE_WITH_FIGMA_FILE_KEY/Design-System?node-id=0%3A1",
		},
	},
	args: {
		children: "Click me",
	},
	argTypes: {
		variant: {
			control: "inline-radio",
			options: ["default", "secondary", "outline", "ghost", "destructive", "link"],
		},
		intent: {
			control: "inline-radio",
			options: ["primary", "critical", "positive", "caution", "info"],
		},
		size: {
			control: "inline-radio",
			options: ["xs", "sm", "md", "lg", "xl"],
		},
		icon: { control: "boolean" },
		stretched: { control: "boolean" },
		disabled: { control: "boolean" },
	},
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };

export const Secondary: Story = { args: { variant: "secondary" } };

export const Outline: Story = { args: { variant: "outline" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const Destructive: Story = { args: { variant: "destructive" } };

export const Link: Story = { args: { variant: "link" } };

export const Variants: Story = {
	render: (args) => (
		<div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
			<Button {...args} variant="default">Default</Button>
			<Button {...args} variant="secondary">Secondary</Button>
			<Button {...args} variant="outline">Outline</Button>
			<Button {...args} variant="ghost">Ghost</Button>
			<Button {...args} variant="destructive">Destructive</Button>
			<Button {...args} variant="link">Link</Button>
		</div>
	),
};

export const Sizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
			<Button {...args} size="xs">XS</Button>
			<Button {...args} size="sm">SM</Button>
			<Button {...args} size="md">MD</Button>
			<Button {...args} size="lg">LG</Button>
			<Button {...args} size="xl">XL</Button>
		</div>
	),
};

const Arrow = () => (
	<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
		<path d="M5 12h14M12 5l7 7-7 7" />
	</svg>
);

export const IconSizes: Story = {
	render: (args) => (
		<div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
			{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
				<Button key={size} {...args} icon size={size} aria-label={size}>
					<Arrow />
				</Button>
			))}
		</div>
	),
};

const intents = ["primary", "critical", "positive", "caution", "info"] as const;

export const Intents: Story = {
	render: (args) => (
		<div style={{ display: "grid", gap: 12 }}>
			{(["default", "outline", "ghost", "link"] as const).map((variant) => (
				<div key={variant} style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
					<span style={{ width: 80, fontSize: 12, opacity: 0.6 }}>{variant}</span>
					{intents.map((intent) => (
						<Button key={intent} {...args} variant={variant} intent={intent}>
							{intent}
						</Button>
					))}
				</div>
			))}
		</div>
	),
};

export const Invalid: Story = {
	args: { "aria-invalid": true, children: "aria-invalid" },
};

export const DropdownTrigger: Story = {
	args: { variant: "outline", "aria-expanded": true, "aria-haspopup": "menu", children: "Open menu ▾" },
};

export const Disabled: Story = { args: { disabled: true } };

export const Stretched: Story = {
	args: { stretched: true },
	parameters: { layout: "padded" },
	decorators: [
		(Story) => (
			<div style={{ width: 320, border: "1px dashed rgba(0,0,0,0.2)", padding: 8 }}>
				<Story />
			</div>
		),
	],
};

export const ClickInteraction: Story = {
	args: {
		variant: "default",
		children: "Click me",
		onClick: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button", { name: /click me/i });
		await userEvent.click(button);
		await expect(args.onClick).toHaveBeenCalledOnce();
	},
};

export const DisabledNotInteractive: Story = {
	args: {
		variant: "default",
		disabled: true,
		children: "Disabled",
		onClick: fn(),
	},
	play: async ({ canvasElement, args }) => {
		const canvas = within(canvasElement);
		const button = canvas.getByRole("button", { name: /disabled/i });
		await userEvent.click(button);
		await expect(args.onClick).not.toHaveBeenCalled();
	},
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import {
	Avatar,
	Badge,
	Button,
	Card,
	Icon,
	Input,
	Separator,
} from "@lume/primitives";

const Section = ({
	label,
	className,
}: {
	label: string;
	className: string;
}) => (
	<div
		className={className}
		style={{
			background: "var(--colors-background)",
			color: "var(--colors-foreground)",
			padding: 20,
			borderRadius: 14,
			display: "flex",
			flexDirection: "column",
			gap: 16,
			flex: 1,
			minWidth: 260,
			border: "1px solid var(--colors-border-hairline)",
		}}
	>
		<div
			style={{
				display: "flex",
				justifyContent: "space-between",
				alignItems: "center",
			}}
		>
			<strong style={{ fontSize: 13, letterSpacing: 0.3, textTransform: "uppercase" }}>
				{label}
			</strong>
			<Badge variant="secondary">{className}</Badge>
		</div>

		<Card size="md">
			<div style={{ display: "flex", alignItems: "center", gap: 12 }}>
				<Avatar fallback="MP" size="md" />
				<div style={{ display: "flex", flexDirection: "column" }}>
					<strong style={{ fontSize: 14 }}>Mikita Pitunoŭ</strong>
					<span
						style={{ fontSize: 12, color: "var(--colors-foreground-tertiary)" }}
					>
						Admin · since 2024
					</span>
				</div>
			</div>
			<Separator />
			<Input placeholder="you@domain.com" />
			<div style={{ display: "flex", gap: 8 }}>
				<Button variant="default" size="sm">
					<Icon name="hugeicons:tick-01" size="sm" />
					Confirm
				</Button>
				<Button variant="outline" size="sm">Cancel</Button>
				<Button variant="ghost" size="sm" icon>
					<Icon name="hugeicons:settings-02" size="sm" />
				</Button>
			</div>
		</Card>
	</div>
);

const meta = {
	title: "Foundation/Theme Showcase",
	parameters: {
		layout: "fullscreen",
		options: { showPanel: false },
	},
	tags: ["autodocs"],
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const LightVsDark: Story = {
	render: () => (
		<div
			style={{
				padding: 24,
				display: "flex",
				gap: 16,
				background: "var(--colors-background-muted)",
				minHeight: "100vh",
			}}
		>
			<Section label="Light" className="light" />
			<Section label="Dark" className="dark" />
		</div>
	),
};

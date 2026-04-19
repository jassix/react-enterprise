import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ChangeEvent } from "react";
import { useMemo, useState } from "react";
import { Icon } from "./icon";

const meta = {
	title: "Primitives/Data Display/Icon",
	component: Icon,
	tags: ["autodocs"],
	args: { name: "hugeicons:sparkles", size: "md" },
	argTypes: {
		name: { control: "text" },
		size: {
			control: "inline-radio",
			options: ["xs", "sm", "md", "lg", "xl"],
		},
	},
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
	render: () => (
		<div style={{ display: "flex", gap: 16, alignItems: "center" }}>
			{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
				<div key={size} style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center" }}>
					<Icon name="hugeicons:sparkles" size={size} />
					<span style={{ fontSize: 11, opacity: 0.7 }}>{size}</span>
				</div>
			))}
		</div>
	),
};

const curatedNames = [
	"menu-02",
	"cancel-01",
	"arrow-down-01",
	"arrow-up-01",
	"arrow-left-01",
	"arrow-right-01",
	"tick-01",
	"tick-circle",
	"alert-circle",
	"information-circle",
	"search-01",
	"settings-02",
	"star",
	"home-01",
	"user",
	"inbox",
	"command",
	"shift-01",
	"delete-02",
	"edit-02",
	"copy-01",
	"eye",
	"sun-03",
	"moon-02",
	"sparkles",
	"calendar-03",
	"clock-01",
];

export const Browse: Story = {
	render: () => {
		const [query, setQuery] = useState("");
		const filtered = useMemo(
			() => curatedNames.filter((n) => n.includes(query.toLowerCase())),
			[query],
		);
		return (
			<div style={{ display: "flex", flexDirection: "column", gap: 16, width: 560 }}>
				<input
					value={query}
					onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
					placeholder="Filter icons…"
					style={{
						padding: "8px 12px",
						borderRadius: 8,
						border: "1px solid var(--colors-border-DEFAULT)",
						background: "var(--colors-surface-base)",
						color: "var(--colors-foreground)",
						outline: "none",
						fontSize: 13,
					}}
				/>
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
						gap: 8,
					}}
				>
					{filtered.map((n) => (
						<div
							key={n}
							style={{
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
								gap: 6,
								padding: 10,
								border: "1px solid var(--colors-border-hairline)",
								borderRadius: 10,
								background: "var(--colors-surface-base)",
							}}
						>
							<Icon name={`hugeicons:${n}`} size="lg" />
							<span style={{ fontSize: 10, opacity: 0.6, textAlign: "center", lineHeight: 1.2 }}>
								{n}
							</span>
						</div>
					))}
				</div>
			</div>
		);
	},
};

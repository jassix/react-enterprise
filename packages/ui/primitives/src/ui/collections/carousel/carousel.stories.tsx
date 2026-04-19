import type { Meta, StoryObj } from "@storybook/react-vite";
import type { ComponentProps } from "react";
import { Icon } from "../../data-display/icon";
import { Carousel } from "./carousel";

type StoryArgs = ComponentProps<typeof Carousel.Root>;

const slides = [
	{ color: "#fca5a5", label: "One" },
	{ color: "#fcd34d", label: "Two" },
	{ color: "#86efac", label: "Three" },
	{ color: "#93c5fd", label: "Four" },
];

const meta = {
	title: "Primitives/Collections/Carousel",
	component: Carousel.Root,
	tags: ["autodocs"],
	argTypes: {
		orientation: { control: "inline-radio", options: ["horizontal", "vertical"] },
	},
	render: (args) => (
		<div style={{ width: 480 }}>
			<Carousel.Root {...args} slideCount={slides.length}>
				<Carousel.ItemGroup>
					{slides.map((slide, i) => (
						<Carousel.Item key={slide.label} index={i}>
							<div
								style={{
									background: slide.color,
									display: "grid",
									placeItems: "center",
									height: 180,
									borderRadius: 8,
									fontSize: 24,
									fontWeight: 600,
								}}
							>
								{slide.label}
							</div>
						</Carousel.Item>
					))}
				</Carousel.ItemGroup>
				<Carousel.Control>
					<Carousel.PrevTrigger><Icon name="hugeicons:arrow-left-01" size="md" /></Carousel.PrevTrigger>
					<Carousel.IndicatorGroup>
						{slides.map((_, i) => (
							<Carousel.Indicator key={i} index={i} />
						))}
					</Carousel.IndicatorGroup>
					<Carousel.NextTrigger><Icon name="hugeicons:arrow-right-01" size="md" /></Carousel.NextTrigger>
				</Carousel.Control>
			</Carousel.Root>
		</div>
	),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

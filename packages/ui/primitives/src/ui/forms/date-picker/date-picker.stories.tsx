import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "@ark-ui/react/portal";
import { Icon } from "../../data-display/icon";
import { DatePicker } from "./date-picker";

const meta = {
	title: "Primitives/Forms/Date Picker",
	component: DatePicker,
	tags: ["autodocs"],
	render: () => (
		<div style={{ width: 320 }}>
			<DatePicker.Root>
				<DatePicker.Label>Pick a date</DatePicker.Label>
				<DatePicker.Control>
					<DatePicker.Input />
					<DatePicker.Trigger>
						<Icon name="hugeicons:calendar-03" size="sm" />
					</DatePicker.Trigger>
					<DatePicker.ClearTrigger>
						<Icon name="hugeicons:cancel-01" size="sm" />
					</DatePicker.ClearTrigger>
				</DatePicker.Control>
				<Portal>
					<DatePicker.Positioner>
						<DatePicker.Content>
							<DatePicker.View view="day">
								<DatePicker.ViewControl>
									<DatePicker.PrevTrigger><Icon name="hugeicons:arrow-left-01" size="sm" /></DatePicker.PrevTrigger>
									<DatePicker.ViewTrigger>
										<DatePicker.RangeText />
									</DatePicker.ViewTrigger>
									<DatePicker.NextTrigger><Icon name="hugeicons:arrow-right-01" size="sm" /></DatePicker.NextTrigger>
								</DatePicker.ViewControl>
								<DatePicker.Table>
									<DatePicker.TableHead>
										<DatePicker.TableRow>
											{["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
												<DatePicker.TableHeader key={d}>{d}</DatePicker.TableHeader>
											))}
										</DatePicker.TableRow>
									</DatePicker.TableHead>
								</DatePicker.Table>
							</DatePicker.View>
						</DatePicker.Content>
					</DatePicker.Positioner>
				</Portal>
			</DatePicker.Root>
		</div>
	),
} satisfies Meta<typeof DatePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

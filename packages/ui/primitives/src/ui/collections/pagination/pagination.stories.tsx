import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pagination as PaginationPrimitive } from "@ark-ui/react/pagination";
import type { ComponentProps } from "react";
import { Icon } from "../../data-display/icon";
import { Pagination } from "./pagination";

type StoryArgs = ComponentProps<typeof Pagination.Root>;

const meta = {
  title: "Primitives/Collections/Pagination",
  component: Pagination.Root,
  tags: ["autodocs"],
  args: { count: 200, pageSize: 10, siblingCount: 1 },
  argTypes: {
    size: { control: "inline-radio", options: ["sm", "md", "lg"] },
  },
  render: (args) => (
    <Pagination.Root {...args}>
      <PaginationPrimitive.Context>
        {(api) => (
          <>
            <Pagination.PrevTrigger>
              <Icon name="hugeicons:arrow-left-01" size="sm" />
            </Pagination.PrevTrigger>
            {api.pages.map((page, i) =>
              page.type === "page" ? (
                <Pagination.Item key={i} {...page}>
                  {page.value}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={i} index={i}>
                  …
                </Pagination.Ellipsis>
              ),
            )}
            <Pagination.NextTrigger>
              <Icon name="hugeicons:arrow-right-01" size="sm" />
            </Pagination.NextTrigger>
          </>
        )}
      </PaginationPrimitive.Context>
    </Pagination.Root>
  ),
} satisfies Meta<StoryArgs>;

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};
export const Small: Story = { args: { size: "sm" } };

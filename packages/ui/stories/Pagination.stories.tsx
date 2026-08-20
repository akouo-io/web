import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Pagination } from "../src";

const meta = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { page: 1, pageCount: 10, onPageChange: () => {} },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

function PaginationDemo({ pageCount }: { pageCount: number }) {
  const [page, setPage] = useState(1);
  return (
    <Pagination page={page} pageCount={pageCount} onPageChange={setPage} />
  );
}

export const Default: Story = {
  render: () => <PaginationDemo pageCount={10} />,
};

export const Few: Story = {
  render: () => <PaginationDemo pageCount={3} />,
};

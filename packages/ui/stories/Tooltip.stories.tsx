import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "../src";
import { Tooltip } from "../src";

const meta = {
  title: "UI/Tooltip",
  component: Tooltip,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { content: "", children: <span /> },
} satisfies Meta<typeof Tooltip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tooltip content="Copy share link">
      <Button variant="secondary">Share</Button>
    </Tooltip>
  ),
};

export const Sides: Story = {
  render: () => (
    <div className="flex gap-6">
      <Tooltip content="Top" side="top">
        <Button variant="secondary">Top</Button>
      </Tooltip>
      <Tooltip content="Bottom" side="bottom">
        <Button variant="secondary">Bottom</Button>
      </Tooltip>
      <Tooltip content="Right" side="right">
        <Button variant="secondary">Right</Button>
      </Tooltip>
    </div>
  ),
};

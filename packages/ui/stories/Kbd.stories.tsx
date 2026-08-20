import type { Meta, StoryObj } from "@storybook/react";

import { Kbd } from "../src";

const meta = {
  title: "Data/Kbd",
  component: Kbd,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: "K" },
} satisfies Meta<typeof Kbd>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Combo: Story = {
  render: () => (
    <div className="flex items-center gap-1 text-sm text-muted-foreground">
      <Kbd>⌘</Kbd>
      <span>+</span>
      <Kbd>K</Kbd>
      <span className="ml-2">to open the command palette</span>
    </div>
  ),
};

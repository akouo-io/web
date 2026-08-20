import type { Meta, StoryObj } from "@storybook/react";

import { Separator } from "./Separator";

const meta = {
  title: "Layout/Separator",
  component: Separator,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Separator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="w-64 text-sm text-foreground">
      <p className="pb-3">Transcript</p>
      <Separator />
      <p className="pt-3 text-muted-foreground">42 minutes · 4 speakers</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-10 items-center gap-3 text-sm text-muted-foreground">
      <span>Play</span>
      <Separator orientation="vertical" />
      <span>Speed</span>
      <Separator orientation="vertical" />
      <span>Share</span>
    </div>
  ),
};

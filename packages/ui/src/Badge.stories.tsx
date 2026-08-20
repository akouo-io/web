import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: "Badge" },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Secondary: Story = { args: { variant: "secondary" } };
export const Outline: Story = { args: { variant: "outline" } };
export const Success: Story = { args: { variant: "success", children: "Ready" } };
export const Destructive: Story = {
  args: { variant: "destructive", children: "Failed" },
};

export const Speakers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {([1, 2, 3, 4, 5, 6] as const).map((n) => (
        <Badge key={n} speaker={n}>
          Speaker {n}
        </Badge>
      ))}
    </div>
  ),
};

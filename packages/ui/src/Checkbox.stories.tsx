import type { Meta, StoryObj } from "@storybook/react";

import { Checkbox } from "./Checkbox";

const meta = {
  title: "UI/Checkbox",
  component: Checkbox,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { defaultChecked: true, disabled: true },
};

export const WithLabel: Story = {
  render: (args) => (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <Checkbox {...args} />
      Enable diarization
    </label>
  ),
};

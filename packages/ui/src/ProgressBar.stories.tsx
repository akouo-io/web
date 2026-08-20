import type { Meta, StoryObj } from "@storybook/react";

import { ProgressBar } from "./ProgressBar";

const meta: Meta<typeof ProgressBar> = {
  title: "UI/ProgressBar",
  component: ProgressBar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-72">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Determinate: Story = {
  args: { value: 60 },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Slider } from "../src";

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
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

export const Default: Story = {
  args: { min: 0, max: 100, defaultValue: 50 },
};

export const Disabled: Story = {
  args: { min: 0, max: 100, defaultValue: 30, disabled: true },
};

import type { Meta, StoryObj } from "@storybook/react";

import { Textarea } from "../src";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
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
  args: { placeholder: "Add a note…", rows: 4 },
};

export const Disabled: Story = {
  args: { placeholder: "Add a note…", rows: 4, disabled: true },
};

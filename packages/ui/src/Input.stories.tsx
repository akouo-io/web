import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
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
  args: { placeholder: "you@example.com" },
};

export const WithValue: Story = {
  args: { defaultValue: "Ada Lovelace" },
};

export const Disabled: Story = {
  args: { placeholder: "you@example.com", disabled: true },
};

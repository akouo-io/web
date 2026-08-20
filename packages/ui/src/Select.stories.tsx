import type { Meta, StoryObj } from "@storybook/react";

import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
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
  render: (args) => (
    <Select {...args} defaultValue="en">
      <option value="en">English</option>
      <option value="nl">Nederlands</option>
      <option value="de">Deutsch</option>
      <option value="fr">Français</option>
    </Select>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Select {...args} disabled defaultValue="en">
      <option value="en">English</option>
    </Select>
  ),
};

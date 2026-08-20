import type { Meta, StoryObj } from "@storybook/react";

import { Radio } from "../src";

const meta = {
  title: "UI/Radio",
  component: Radio,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "example" },
};

export const Disabled: Story = {
  args: { name: "example", defaultChecked: true, disabled: true },
};

export const Group: Story = {
  render: () => (
    <fieldset className="flex flex-col gap-2 text-sm text-foreground">
      <label className="flex items-center gap-2">
        <Radio name="speaker" defaultChecked /> Speaker 1
      </label>
      <label className="flex items-center gap-2">
        <Radio name="speaker" /> Speaker 2
      </label>
      <label className="flex items-center gap-2">
        <Radio name="speaker" /> Speaker 3
      </label>
    </fieldset>
  ),
};

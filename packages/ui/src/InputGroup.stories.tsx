import type { Meta, StoryObj } from "@storybook/react";

import { InputGroup } from "./InputGroup";

const meta: Meta<typeof InputGroup> = {
  title: "UI/InputGroup",
  component: InputGroup,
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

export const LeadingUnit: Story = {
  args: { leading: "https://", placeholder: "akouo.io" },
};

export const TrailingUnit: Story = {
  args: { trailing: "min", type: "number", defaultValue: 30 },
};

export const Both: Story = {
  args: { leading: "$", trailing: "USD", type: "number", defaultValue: 99 },
};

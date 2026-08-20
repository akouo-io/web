import type { Meta, StoryObj } from "@storybook/react";

import { Heading } from "../src";

const meta = {
  title: "Data/Heading",
  component: Heading,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Scale: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading level={1}>Heading level 1</Heading>
      <Heading level={2}>Heading level 2</Heading>
      <Heading level={3}>Heading level 3</Heading>
      <Heading level={4}>Heading level 4</Heading>
    </div>
  ),
};

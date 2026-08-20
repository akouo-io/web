import type { Meta, StoryObj } from "@storybook/react";

import { Text } from "../src";

const meta = {
  title: "Data/Text",
  component: Text,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: "The sound of listening." },
} satisfies Meta<typeof Text>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Variants: Story = {
  render: () => (
    <div className="space-y-1">
      <Text>Default body text</Text>
      <Text variant="muted">Muted secondary text</Text>
      <Text variant="subtle">Subtle tertiary text</Text>
    </div>
  ),
};

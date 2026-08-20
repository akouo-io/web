import type { Meta, StoryObj } from "@storybook/react";

import { Avatar, AvatarGroup } from "../src";

const meta = {
  title: "Data/Avatar",
  component: Avatar,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Initials: Story = {
  args: { name: "Ada Lovelace" },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Ada Lovelace" size="sm" />
      <Avatar name="Ada Lovelace" size="md" />
      <Avatar name="Ada Lovelace" size="lg" />
    </div>
  ),
};

export const SpeakerRings: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      {([1, 2, 3, 4, 5, 6] as const).map((n) => (
        <Avatar key={n} name={`S${n}`} speaker={n} />
      ))}
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <AvatarGroup max={3}>
      <Avatar name="Ada Lovelace" />
      <Avatar name="Alan Turing" />
      <Avatar name="Grace Hopper" />
      <Avatar name="Edsger Dijkstra" />
      <Avatar name="Barbara Liskov" />
    </AvatarGroup>
  ),
};

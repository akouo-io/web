import type { Meta, StoryObj } from "@storybook/react";

import { List, ListItem } from "../src";

const meta = {
  title: "Data/List",
  component: List,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof List>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Bulleted: Story = {
  render: () => (
    <List className="w-64">
      <ListItem>Automatic speaker labels</ListItem>
      <ListItem>Time-coded transcript</ListItem>
      <ListItem>Exportable summaries</ListItem>
    </List>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List ordered className="w-64">
      <ListItem>Upload a recording</ListItem>
      <ListItem>Review the transcript</ListItem>
      <ListItem>Share with your team</ListItem>
    </List>
  ),
};

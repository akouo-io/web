import type { Meta, StoryObj } from "@storybook/react";

import { Link } from "../src";

const meta = {
  title: "UI/Link",
  component: Link,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { href: "#", children: "View transcript" },
} satisfies Meta<typeof Link>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { variant: "default" } };
export const Muted: Story = { args: { variant: "muted" } };
export const Underline: Story = { args: { variant: "underline" } };

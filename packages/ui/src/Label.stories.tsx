import type { Meta, StoryObj } from "@storybook/react";

import { Input } from "./Input";
import { Label } from "./Label";

const meta = {
  title: "UI/Label",
  component: Label,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Label>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Email" },
};

export const Required: Story = {
  args: { children: "Email", required: true },
};

export const WithControl: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <Label htmlFor="label-demo" required>
        Workspace name
      </Label>
      <Input id="label-demo" placeholder="Acme Inc." />
    </div>
  ),
};

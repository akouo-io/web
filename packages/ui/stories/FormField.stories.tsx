import type { Meta, StoryObj } from "@storybook/react";

import { FormField } from "../src";
import { Input } from "../src";

const meta = {
  title: "UI/FormField",
  component: FormField,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: () => null },
} satisfies Meta<typeof FormField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="w-72">
      <FormField
        label="Email"
        description="We'll never share it."
        required
      >
        {(field) => <Input {...field} placeholder="you@example.com" />}
      </FormField>
    </div>
  ),
};

export const WithError: Story = {
  render: () => (
    <div className="w-72">
      <FormField label="Email" error="Enter a valid email address." required>
        {(field) => <Input {...field} defaultValue="not-an-email" />}
      </FormField>
    </div>
  ),
};

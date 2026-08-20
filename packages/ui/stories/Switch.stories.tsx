import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Switch } from "../src";

const meta = {
  title: "UI/Switch",
  component: Switch,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Off: Story = {
  args: { checked: false },
};

export const On: Story = {
  args: { checked: true },
};

export const Disabled: Story = {
  args: { checked: true, disabled: true },
};

/** Named component so hooks are allowed (rules-of-hooks). */
function ControlledSwitch() {
  const [on, setOn] = useState(false);
  return (
    <label className="flex items-center gap-2 text-sm text-foreground">
      <Switch checked={on} onCheckedChange={setOn} />
      Live captions {on ? "on" : "off"}
    </label>
  );
}

export const Controlled: Story = {
  render: () => <ControlledSwitch />,
};

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { ToggleButton, ToggleGroup, ToggleGroupItem } from "../src";

const meta = {
  title: "UI/Toggle",
  component: ToggleButton,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof ToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

function SingleToggle() {
  const [pressed, setPressed] = useState(false);
  return (
    <ToggleButton pressed={pressed} onPressedChange={setPressed}>
      Bold
    </ToggleButton>
  );
}

export const Button: Story = {
  render: () => <SingleToggle />,
};

function GroupSingle() {
  const [value, setValue] = useState<string | null>("left");
  return (
    <ToggleGroup
      type="single"
      value={value}
      onValueChange={setValue}
      aria-label="Text alignment"
    >
      <ToggleGroupItem value="left">Left</ToggleGroupItem>
      <ToggleGroupItem value="center">Center</ToggleGroupItem>
      <ToggleGroupItem value="right">Right</ToggleGroupItem>
    </ToggleGroup>
  );
}

export const GroupSingleSelect: Story = {
  render: () => <GroupSingle />,
};

function GroupMultiple() {
  const [value, setValue] = useState<string[]>(["bold"]);
  return (
    <ToggleGroup
      type="multiple"
      value={value}
      onValueChange={setValue}
      aria-label="Text formatting"
    >
      <ToggleGroupItem value="bold">B</ToggleGroupItem>
      <ToggleGroupItem value="italic">I</ToggleGroupItem>
      <ToggleGroupItem value="underline">U</ToggleGroupItem>
    </ToggleGroup>
  );
}

export const GroupMultiSelect: Story = {
  render: () => <GroupMultiple />,
};

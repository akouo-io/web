import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { RadioGroup, RadioGroupItem } from "../src";

const meta = {
  title: "Forms/RadioGroup",
  component: RadioGroup,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof RadioGroup>;

export default meta;

type Story = StoryObj<typeof meta>;

function Demo() {
  const [value, setValue] = useState("balanced");
  return (
    <RadioGroup value={value} onValueChange={setValue} aria-label="Quality">
      <RadioGroupItem value="fast">Fast (draft)</RadioGroupItem>
      <RadioGroupItem value="balanced">Balanced</RadioGroupItem>
      <RadioGroupItem value="accurate">Accurate</RadioGroupItem>
      <RadioGroupItem value="beta" disabled>
        Beta model (unavailable)
      </RadioGroupItem>
    </RadioGroup>
  );
}

export const Default: Story = {
  render: () => <Demo />,
};

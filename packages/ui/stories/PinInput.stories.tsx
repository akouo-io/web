import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { PinInput } from "../src";

const meta = {
  title: "UI/PinInput",
  component: PinInput,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { value: "", onChange: () => {} },
} satisfies Meta<typeof PinInput>;

export default meta;

type Story = StoryObj<typeof meta>;

function PinInputDemo({
  length,
  mask,
  initial = "",
}: {
  length?: number;
  mask?: boolean;
  initial?: string;
}) {
  const [code, setCode] = useState(initial);
  return (
    <PinInput value={code} onChange={setCode} length={length} mask={mask} />
  );
}

export const Default: Story = {
  render: () => <PinInputDemo />,
};

export const Filled: Story = {
  render: () => <PinInputDemo initial="1234" length={4} />,
};

export const Masked: Story = {
  render: () => <PinInputDemo initial="0000" length={4} mask />,
};

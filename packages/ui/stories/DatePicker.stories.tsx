import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { DatePicker } from "../src";

const meta = {
  title: "UI/DatePicker",
  component: DatePicker,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { value: null, onChange: () => {} },
} satisfies Meta<typeof DatePicker>;

export default meta;

type Story = StoryObj<typeof meta>;

function DatePickerDemo({ initial }: { initial: Date | null }) {
  const [date, setDate] = useState<Date | null>(initial);
  return (
    <div className="w-64">
      <DatePicker value={date} onChange={setDate} />
    </div>
  );
}

export const Default: Story = {
  render: () => <DatePickerDemo initial={null} />,
};

export const WithValue: Story = {
  render: () => <DatePickerDemo initial={new Date()} />,
};

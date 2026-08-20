import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Autocomplete } from "../src";

const meta = {
  title: "UI/Autocomplete",
  component: Autocomplete,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { options: [], value: null, onChange: () => {} },
} satisfies Meta<typeof Autocomplete>;

export default meta;

type Story = StoryObj<typeof meta>;

const LANGUAGES = [
  { label: "English", value: "en" },
  { label: "Nederlands", value: "nl" },
  { label: "Deutsch", value: "de" },
  { label: "Français", value: "fr" },
  { label: "Español", value: "es" },
  { label: "Português", value: "pt" },
  { label: "Italiano", value: "it" },
];

function AutocompleteDemo({ initial }: { initial: string | null }) {
  const [value, setValue] = useState<string | null>(initial);
  return (
    <div className="w-72">
      <Autocomplete
        options={LANGUAGES}
        value={value}
        onChange={setValue}
        placeholder="Search a language…"
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <AutocompleteDemo initial={null} />,
};

export const Preselected: Story = {
  render: () => <AutocompleteDemo initial="de" />,
};

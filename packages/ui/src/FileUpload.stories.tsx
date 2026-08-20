import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { FileUpload } from "./FileUpload";

const meta = {
  title: "UI/FileUpload",
  component: FileUpload,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { onFiles: () => {} },
} satisfies Meta<typeof FileUpload>;

export default meta;

type Story = StoryObj<typeof meta>;

function FileUploadDemo() {
  const [names, setNames] = useState<string[]>([]);
  return (
    <div className="w-96 space-y-3">
      <FileUpload
        multiple
        accept="audio/*,video/*"
        hint="Audio or video, up to 2 GB"
        onFiles={(files) => setNames(files.map((f) => f.name))}
      />
      {names.length > 0 && (
        <ul className="text-sm text-muted-foreground">
          {names.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export const Default: Story = {
  render: () => <FileUploadDemo />,
};

export const Disabled: Story = {
  render: () => (
    <div className="w-96">
      <FileUpload disabled hint="Upload disabled" onFiles={() => {}} />
    </div>
  ),
};

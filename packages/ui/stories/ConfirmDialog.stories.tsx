import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "../src";
import { ConfirmDialog } from "../src";

const meta = {
  title: "UI/ConfirmDialog",
  component: ConfirmDialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: {
    open: false,
    onOpenChange: () => {},
    title: "",
    onConfirm: () => {},
  },
} satisfies Meta<typeof ConfirmDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

function ConfirmDemo({ destructive }: { destructive?: boolean }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  return (
    <div className="flex flex-col items-center gap-2">
      <Button variant="secondary" onClick={() => setOpen(true)}>
        Delete session
      </Button>
      {done && <p className="text-sm text-muted-foreground">Deleted.</p>}
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete this session?"
        description="This permanently removes the recording and its transcript."
        confirmLabel="Delete"
        destructive={destructive}
        onConfirm={() => setDone(true)}
      />
    </div>
  );
}

export const Default: Story = {
  render: () => <ConfirmDemo destructive />,
};

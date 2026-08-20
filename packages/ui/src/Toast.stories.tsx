import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import { ToastProvider, useToast } from "./Toast";

const meta = {
  title: "UI/Toast",
  component: ToastProvider,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof ToastProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

function ToastButtons() {
  const { toast } = useToast();
  return (
    <div className="flex gap-2">
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            title: "Transcript ready",
            description: "Weekly sync · 42 min",
          })
        }
      >
        Show toast
      </Button>
      <Button
        variant="secondary"
        onClick={() =>
          toast({
            variant: "destructive",
            title: "Upload failed",
            description: "The file exceeds the 2 GB limit.",
          })
        }
      >
        Show error
      </Button>
    </div>
  );
}

export const Default: Story = {
  render: () => (
    <ToastProvider>
      <ToastButtons />
    </ToastProvider>
  ),
};

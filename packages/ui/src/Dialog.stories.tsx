import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import {
  Dialog,
  DialogBody,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./Dialog";

const meta = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof Dialog>;

export default meta;

type Story = StoryObj<typeof meta>;

const triggerClass =
  "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function Body() {
  return (
    <DialogContent>
      <DialogClose />
      <DialogHeader>
        <DialogTitle>Rename session</DialogTitle>
        <DialogDescription>
          Give this recording a memorable name.
        </DialogDescription>
      </DialogHeader>
      <DialogBody>
        <input
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          defaultValue="Weekly sync"
        />
      </DialogBody>
      <DialogFooter>
        <DialogClose className="inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground hover:bg-secondary/80">
          Cancel
        </DialogClose>
        <Button>Save</Button>
      </DialogFooter>
    </DialogContent>
  );
}

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger className={triggerClass}>Rename</DialogTrigger>
      <Body />
    </Dialog>
  ),
};

export const Open: Story = {
  render: () => (
    <Dialog defaultOpen>
      <DialogTrigger className={triggerClass}>Rename</DialogTrigger>
      <Body />
    </Dialog>
  ),
};

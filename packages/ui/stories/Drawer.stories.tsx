import type { Meta, StoryObj } from "@storybook/react";

import {
  Drawer,
  DrawerBody,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../src";

const meta = {
  title: "UI/Drawer",
  component: Drawer,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof Drawer>;

export default meta;

type Story = StoryObj<typeof meta>;

const triggerClass =
  "inline-flex h-10 items-center justify-center rounded-md bg-secondary px-4 text-sm font-medium text-secondary-foreground hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

function Body({ side }: { side?: "left" | "right" }) {
  return (
    <DrawerContent side={side}>
      <DrawerClose />
      <DrawerHeader>
        <DrawerTitle>Session details</DrawerTitle>
        <DrawerDescription>Metadata and speaker breakdown.</DrawerDescription>
      </DrawerHeader>
      <DrawerBody className="text-sm text-muted-foreground">
        A side sheet is handy for contextual detail without leaving the page.
      </DrawerBody>
    </DrawerContent>
  );
}

export const Default: Story = {
  render: () => (
    <Drawer>
      <DrawerTrigger className={triggerClass}>Open details</DrawerTrigger>
      <Body />
    </Drawer>
  ),
};

export const Open: Story = {
  render: () => (
    <Drawer defaultOpen>
      <DrawerTrigger className={triggerClass}>Open details</DrawerTrigger>
      <Body side="right" />
    </Drawer>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Drawer defaultOpen>
      <DrawerTrigger className={triggerClass}>Open</DrawerTrigger>
      <Body side="left" />
    </Drawer>
  ),
};

import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

import { Button } from "./Button";
import { CommandPalette } from "./CommandPalette";

const meta = {
  title: "UI/CommandPalette",
  component: CommandPalette,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { open: false, onOpenChange: () => {}, commands: [] },
} satisfies Meta<typeof CommandPalette>;

export default meta;

type Story = StoryObj<typeof meta>;

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState<string | null>(null);

  const commands = [
    { id: "new", label: "New recording", group: "Actions", shortcut: "N", onSelect: () => setLast("New recording") },
    { id: "upload", label: "Upload file", group: "Actions", shortcut: "U", onSelect: () => setLast("Upload file") },
    { id: "search", label: "Search transcripts", group: "Navigation", onSelect: () => setLast("Search transcripts") },
    { id: "settings", label: "Open settings", group: "Navigation", shortcut: ",", onSelect: () => setLast("Open settings") },
    { id: "theme", label: "Toggle theme", group: "Navigation", onSelect: () => setLast("Toggle theme") },
  ];

  return (
    <div className="flex flex-col items-center gap-3">
      <Button onClick={() => setOpen(true)}>Open command palette (⌘K)</Button>
      {last && (
        <p className="text-sm text-muted-foreground">Ran: {last}</p>
      )}
      <CommandPalette open={open} onOpenChange={setOpen} commands={commands} />
    </div>
  );
}

export const Default: Story = {
  render: () => <CommandPaletteDemo />,
};

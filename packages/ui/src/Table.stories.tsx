import type { Meta, StoryObj } from "@storybook/react";

import { Badge } from "./Badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./Table";

const meta = {
  title: "Layout/Table",
  component: Table,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;

type Story = StoryObj<typeof meta>;

const rows = [
  { name: "Weekly sync", length: "42:10", speakers: 4 },
  { name: "Design review", length: "58:03", speakers: 3 },
  { name: "1:1 with Ada", length: "24:47", speakers: 2 },
];

export const Default: Story = {
  render: () => (
    <div className="w-96">
      <Table>
        <TableCaption>Recent sessions</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Session</TableHead>
            <TableHead>Length</TableHead>
            <TableHead>Speakers</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((r) => (
            <TableRow key={r.name}>
              <TableCell className="font-medium">{r.name}</TableCell>
              <TableCell className="tabular-nums">{r.length}</TableCell>
              <TableCell>
                <Badge variant="secondary">{r.speakers}</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

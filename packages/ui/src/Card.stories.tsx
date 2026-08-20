import type { Meta, StoryObj } from "@storybook/react";

import { Button } from "./Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./Card";

const meta = {
  title: "UI/Card",
  component: Card,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="w-80">
      <CardHeader>
        <CardTitle>Session recording</CardTitle>
        <CardDescription>Weekly sync · 42 min · 4 speakers</CardDescription>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        Diarization complete. Review the transcript and assign speaker labels
        before sharing.
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="secondary">Discard</Button>
        <Button>Open</Button>
      </CardFooter>
    </Card>
  ),
};

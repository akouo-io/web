import type { Meta, StoryObj } from "@storybook/react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../src";

const meta = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: null },
} satisfies Meta<typeof Tabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="transcript" className="w-80">
      <TabsList aria-label="Session views">
        <TabsTrigger value="transcript">Transcript</TabsTrigger>
        <TabsTrigger value="summary">Summary</TabsTrigger>
        <TabsTrigger value="speakers">Speakers</TabsTrigger>
      </TabsList>
      <TabsContent value="transcript" className="text-sm text-muted-foreground">
        The full, time-coded transcript of the session.
      </TabsContent>
      <TabsContent value="summary" className="text-sm text-muted-foreground">
        An AI-generated summary of key points.
      </TabsContent>
      <TabsContent value="speakers" className="text-sm text-muted-foreground">
        Speaker labels and talk-time breakdown.
      </TabsContent>
    </Tabs>
  ),
};

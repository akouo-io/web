import type { Meta, StoryObj } from "@storybook/react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../src";

const meta = {
  title: "Layout/Accordion",
  component: Accordion,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { type: "single", children: null },
} satisfies Meta<typeof Accordion>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Accordion type="single" defaultValue="a" className="w-80">
      <AccordionItem value="a">
        <AccordionTrigger>What is diarization?</AccordionTrigger>
        <AccordionContent>
          Diarization labels which speaker said what across a recording.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="b">
        <AccordionTrigger>Which formats are supported?</AccordionTrigger>
        <AccordionContent>Most common audio and video containers.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="c">
        <AccordionTrigger>Can I edit the transcript?</AccordionTrigger>
        <AccordionContent>Yes — text and speaker labels are editable.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

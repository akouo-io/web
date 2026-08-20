import type { Meta, StoryObj } from "@storybook/react";

import { Code, CodeBlock } from "../src";

const meta = {
  title: "Data/Code",
  component: Code,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
  args: { children: "pnpm install" },
} satisfies Meta<typeof Code>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  render: () => (
    <p className="text-sm text-foreground">
      Run <Code>pnpm --filter @akouo/ui storybook</Code> to start.
    </p>
  ),
};

export const Block: Story = {
  render: () => (
    <CodeBlock className="w-96">{`import { Button } from "@akouo/ui";

export function App() {
  return <Button>Listen</Button>;
}`}</CodeBlock>
  ),
};

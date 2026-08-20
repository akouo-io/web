import type { Meta, StoryObj } from "@storybook/react";

import {
  NavRail,
  NavRailItem,
  Sidebar,
  SidebarItem,
  SidebarSection,
} from "../src";

const Dot = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <circle cx="12" cy="12" r="8" />
  </svg>
);

const meta = {
  title: "UI/Sidebar",
  component: Sidebar,
  parameters: { layout: "fullscreen" },
  tags: ["autodocs"],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="h-96">
      <Sidebar>
        <SidebarSection label="Library">
          <SidebarItem href="#" icon={<Dot />} active>
            Recordings
          </SidebarItem>
          <SidebarItem href="#" icon={<Dot />}>
            Transcripts
          </SidebarItem>
          <SidebarItem href="#" icon={<Dot />}>
            Speakers
          </SidebarItem>
        </SidebarSection>
        <SidebarSection label="Workspace">
          <SidebarItem href="#" icon={<Dot />}>
            Members
          </SidebarItem>
          <SidebarItem href="#" icon={<Dot />}>
            Settings
          </SidebarItem>
        </SidebarSection>
      </Sidebar>
    </div>
  ),
};

export const Rail: Story = {
  render: () => (
    <div className="h-96">
      <NavRail>
        <NavRailItem href="#" aria-label="Recordings" icon={<Dot />} active />
        <NavRailItem href="#" aria-label="Transcripts" icon={<Dot />} />
        <NavRailItem href="#" aria-label="Speakers" icon={<Dot />} />
        <NavRailItem href="#" aria-label="Settings" icon={<Dot />} />
      </NavRail>
    </div>
  ),
};

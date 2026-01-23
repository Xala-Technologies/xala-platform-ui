/**
 * Layout Primitives Stories
 *
 * Storybook stories for layout primitive components.
 */

import type { Meta, StoryObj } from '@storybook/react';
import {
  HorizontalLayout,
  SimpleSidebar,
  SidebarHeaderArea,
  SidebarPanel,
  SidebarScrollArea,
  MainContent,
  Center,
  Stack,
  Heading,
  Paragraph,
  Button,
  ExplorerItem,
} from '../../index';

// =============================================================================
// Center Stories
// =============================================================================

const centerMeta: Meta<typeof Center> = {
  title: 'Primitives/Layout/Center',
  component: Center,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default centerMeta;

export const CenterBoth: StoryObj<typeof Center> = {
  render: () => (
    <div style={{ height: '400px', border: '1px dashed var(--ds-color-neutral-border-default)' }}>
      <Center>
        <Stack spacing="var(--ds-spacing-2)" align="center">
          <Heading level={2} data-size="md">Centered Content</Heading>
          <Paragraph data-size="sm">This content is centered both horizontally and vertically</Paragraph>
        </Stack>
      </Center>
    </div>
  ),
};

export const CenterHorizontal: StoryObj<typeof Center> = {
  render: () => (
    <div style={{ height: '200px', border: '1px dashed var(--ds-color-neutral-border-default)' }}>
      <Center axis="horizontal">
        <Paragraph data-size="sm">Centered horizontally only</Paragraph>
      </Center>
    </div>
  ),
};

// =============================================================================
// SimpleSidebar Stories
// =============================================================================

export const SidebarExample: StoryObj<typeof SimpleSidebar> = {
  render: () => (
    <div style={{ height: '500px', display: 'flex' }}>
      <SimpleSidebar>
        <SidebarHeaderArea>
          <Heading level={1} data-size="md">App Name</Heading>
          <Paragraph data-size="sm">Subtitle text</Paragraph>
        </SidebarHeaderArea>

        <SidebarPanel bordered>
          <Paragraph data-size="sm">Controls section</Paragraph>
        </SidebarPanel>

        <SidebarScrollArea>
          <ExplorerItem title="Dashboard" description="Overview" />
          <ExplorerItem title="Settings" description="Configuration" />
          <ExplorerItem title="Users" description="User management" />
        </SidebarScrollArea>
      </SimpleSidebar>

      <MainContent>
        <Heading level={2} data-size="lg">Main Content Area</Heading>
      </MainContent>
    </div>
  ),
};

// =============================================================================
// HorizontalLayout Stories
// =============================================================================

export const FullAppLayout: StoryObj<typeof HorizontalLayout> = {
  parameters: {
    layout: 'fullscreen',
  },
  render: () => (
    <HorizontalLayout>
      <SimpleSidebar>
        <SidebarHeaderArea>
          <Heading level={1} data-size="md">Playground</Heading>
          <Paragraph data-size="sm">Component Explorer</Paragraph>
        </SidebarHeaderArea>

        <SidebarPanel bordered>
          <Button variant="primary" data-size="sm" style={{ width: '100%' }}>
            New Component
          </Button>
        </SidebarPanel>

        <SidebarScrollArea>
          <ExplorerItem title="Button" description="Interactive element" selected />
          <ExplorerItem title="Card" description="Content container" />
          <ExplorerItem title="Modal" description="Dialog overlay" />
        </SidebarScrollArea>
      </SimpleSidebar>

      <MainContent>
        <Stack spacing="var(--ds-spacing-4)">
          <Heading level={2} data-size="lg">Button</Heading>
          <Paragraph data-size="md">Interactive button component for user actions.</Paragraph>
          <Button variant="primary">Example Button</Button>
        </Stack>
      </MainContent>
    </HorizontalLayout>
  ),
};

// =============================================================================
// MainContent Stories
// =============================================================================

export const MainContentPadding: StoryObj<typeof MainContent> = {
  render: () => (
    <div style={{ height: '300px', display: 'flex', border: '1px solid var(--ds-color-neutral-border-default)' }}>
      <MainContent padding="lg">
        <Stack spacing="var(--ds-spacing-2)">
          <Heading level={2} data-size="md">Large Padding</Heading>
          <Paragraph data-size="sm">This content has large padding around it.</Paragraph>
        </Stack>
      </MainContent>
    </div>
  ),
};

export const MainContentSmallPadding: StoryObj<typeof MainContent> = {
  render: () => (
    <div style={{ height: '300px', display: 'flex', border: '1px solid var(--ds-color-neutral-border-default)' }}>
      <MainContent padding="sm">
        <Stack spacing="var(--ds-spacing-2)">
          <Heading level={2} data-size="md">Small Padding</Heading>
          <Paragraph data-size="sm">This content has small padding around it.</Paragraph>
        </Stack>
      </MainContent>
    </div>
  ),
};

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
  render: function Render() {
    return (
      <div style={{ height: '400px', border: '1px dashed var(--ds-color-neutral-border-default)' }}>
        <Center>
          <Stack spacing="var(--ds-spacing-2)" align="center">
            <Heading level={2} data-size="md">
              "Eksempel Tekst"
            </Heading>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
          </Stack>
        </Center>
      </div>
    );
  },
};

export const CenterHorizontal: StoryObj<typeof Center> = {
  render: function Render() {
    return (
      <div style={{ height: '200px', border: '1px dashed var(--ds-color-neutral-border-default)' }}>
        <Center axis="horizontal">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </Center>
      </div>
    );
  },
};

// =============================================================================
// SimpleSidebar Stories
// =============================================================================

export const SidebarExample: StoryObj<typeof SimpleSidebar> = {
  render: function Render() {
    return (
      <div style={{ height: '500px', display: 'flex' }}>
        <SimpleSidebar>
          <SidebarHeaderArea>
            <Heading level={1} data-size="md">
              "Eksempel Tekst"
            </Heading>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
          </SidebarHeaderArea>

          <SidebarPanel bordered>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
          </SidebarPanel>

          <SidebarScrollArea>
            <ExplorerItem
              title="Eksempel Tekst"
              description="Eksempel Tekst"
            />
            <ExplorerItem
              title="Eksempel Tekst"
              description="Eksempel Tekst"
            />
            <ExplorerItem
              title="Eksempel Tekst"
              description="Eksempel Tekst"
            />
          </SidebarScrollArea>
        </SimpleSidebar>

        <MainContent>
          <Heading level={2} data-size="lg">
            "Eksempel Tekst"
          </Heading>
        </MainContent>
      </div>
    );
  },
};

// =============================================================================
// HorizontalLayout Stories
// =============================================================================

export const FullAppLayout: StoryObj<typeof HorizontalLayout> = {
  parameters: {
    layout: 'fullscreen',
  },
  render: function Render() {
    return (
      <HorizontalLayout>
        <SimpleSidebar>
          <SidebarHeaderArea>
            <Heading level={1} data-size="md">
              "Eksempel Tekst"
            </Heading>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
          </SidebarHeaderArea>

          <SidebarPanel bordered>
            <Button variant="primary" data-size="sm" style={{ width: '100%' }}>
              "Eksempel Tekst"
            </Button>
          </SidebarPanel>

          <SidebarScrollArea>
            <ExplorerItem
              title="Eksempel Tekst"
              description="Eksempel Tekst"
              selected
            />
            <ExplorerItem
              title="Eksempel Tekst"
              description="Eksempel Tekst"
            />
            <ExplorerItem
              title="Eksempel Tekst"
              description="Eksempel Tekst"
            />
          </SidebarScrollArea>
        </SimpleSidebar>

        <MainContent>
          <Stack spacing="var(--ds-spacing-4)">
            <Heading level={2} data-size="lg">
              "Eksempel Tekst"
            </Heading>
            <Paragraph data-size="md">
              "Eksempel Tekst"
            </Paragraph>
            <Button variant="primary">"Eksempel Tekst"</Button>
          </Stack>
        </MainContent>
      </HorizontalLayout>
    );
  },
};

// =============================================================================
// MainContent Stories
// =============================================================================

export const MainContentPadding: StoryObj<typeof MainContent> = {
  render: function Render() {
    return (
      <div
        style={{
          height: '300px',
          display: 'flex',
          border: '1px solid var(--ds-color-neutral-border-default)',
        }}
      >
        <MainContent padding="lg">
          <Stack spacing="var(--ds-spacing-2)">
            <Heading level={2} data-size="md">
              "Eksempel Tekst"
            </Heading>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
          </Stack>
        </MainContent>
      </div>
    );
  },
};

export const MainContentSmallPadding: StoryObj<typeof MainContent> = {
  render: function Render() {
    return (
      <div
        style={{
          height: '300px',
          display: 'flex',
          border: '1px solid var(--ds-color-neutral-border-default)',
        }}
      >
        <MainContent padding="sm">
          <Stack spacing="var(--ds-spacing-2)">
            <Heading level={2} data-size="md">
              "Eksempel Tekst"
            </Heading>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
          </Stack>
        </MainContent>
      </div>
    );
  },
};

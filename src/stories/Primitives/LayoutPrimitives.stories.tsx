/**
 * Layout Primitives Stories
 *
 * Storybook stories for layout primitive components.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
    const t = useT();
    return (
      <div style={{ height: '400px', border: '1px dashed var(--ds-color-neutral-border-default)' }}>
        <Center>
          <Stack spacing="var(--ds-spacing-2)" align="center">
            <Heading level={2} data-size="md">
              {t('storybook.layout.centeredContent')}
            </Heading>
            <Paragraph data-size="sm">{t('storybook.layout.centeredBothDescription')}</Paragraph>
          </Stack>
        </Center>
      </div>
    );
  },
};

export const CenterHorizontal: StoryObj<typeof Center> = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ height: '200px', border: '1px dashed var(--ds-color-neutral-border-default)' }}>
        <Center axis="horizontal">
          <Paragraph data-size="sm">{t('storybook.layout.centeredHorizontalOnly')}</Paragraph>
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
    const t = useT();
    return (
      <div style={{ height: '500px', display: 'flex' }}>
        <SimpleSidebar>
          <SidebarHeaderArea>
            <Heading level={1} data-size="md">
              {t('storybook.layout.appName')}
            </Heading>
            <Paragraph data-size="sm">{t('storybook.layout.subtitleText')}</Paragraph>
          </SidebarHeaderArea>

          <SidebarPanel bordered>
            <Paragraph data-size="sm">{t('storybook.layout.controlsSection')}</Paragraph>
          </SidebarPanel>

          <SidebarScrollArea>
            <ExplorerItem
              title={t('platform.nav.dashboard')}
              description={t('storybook.layout.overview')}
            />
            <ExplorerItem
              title={t('platform.common.settings')}
              description={t('storybook.layout.configuration')}
            />
            <ExplorerItem
              title={t('storybook.layout.users')}
              description={t('storybook.layout.userManagement')}
            />
          </SidebarScrollArea>
        </SimpleSidebar>

        <MainContent>
          <Heading level={2} data-size="lg">
            {t('storybook.layout.mainContentArea')}
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
    const t = useT();
    return (
      <HorizontalLayout>
        <SimpleSidebar>
          <SidebarHeaderArea>
            <Heading level={1} data-size="md">
              {t('storybook.layout.playground')}
            </Heading>
            <Paragraph data-size="sm">{t('storybook.layout.componentExplorer')}</Paragraph>
          </SidebarHeaderArea>

          <SidebarPanel bordered>
            <Button variant="primary" data-size="sm" style={{ width: '100%' }}>
              {t('storybook.layout.newComponent')}
            </Button>
          </SidebarPanel>

          <SidebarScrollArea>
            <ExplorerItem
              title={t('storybook.layout.buttonComponent')}
              description={t('storybook.layout.interactiveElement')}
              selected
            />
            <ExplorerItem
              title={t('storybook.layout.cardComponent')}
              description={t('storybook.layout.contentContainer')}
            />
            <ExplorerItem
              title={t('storybook.layout.modalComponent')}
              description={t('storybook.layout.dialogOverlay')}
            />
          </SidebarScrollArea>
        </SimpleSidebar>

        <MainContent>
          <Stack spacing="var(--ds-spacing-4)">
            <Heading level={2} data-size="lg">
              {t('storybook.layout.buttonComponent')}
            </Heading>
            <Paragraph data-size="md">
              {t('storybook.layout.interactiveButtonDescription')}
            </Paragraph>
            <Button variant="primary">{t('storybook.layout.exampleButton')}</Button>
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
    const t = useT();
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
              {t('storybook.layout.largePadding')}
            </Heading>
            <Paragraph data-size="sm">{t('storybook.layout.largePaddingDescription')}</Paragraph>
          </Stack>
        </MainContent>
      </div>
    );
  },
};

export const MainContentSmallPadding: StoryObj<typeof MainContent> = {
  render: function Render() {
    const t = useT();
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
              {t('storybook.layout.smallPadding')}
            </Heading>
            <Paragraph data-size="sm">{t('storybook.layout.smallPaddingDescription')}</Paragraph>
          </Stack>
        </MainContent>
      </div>
    );
  },
};

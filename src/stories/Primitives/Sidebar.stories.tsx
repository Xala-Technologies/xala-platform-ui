import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import {
  SimpleSidebar,
  SidebarHeaderArea,
  SidebarPanel,
  SidebarScrollArea,
  Stack,
  Paragraph,
  Card,
  Button,
} from '../../index';

/**
 * Sidebar provides low-level sidebar container components for application layouts.
 *
 * ## Components
 * - SimpleSidebar: Basic sidebar container
 * - SidebarHeaderArea: Header section within sidebar
 * - SidebarPanel: Scrollable panel area
 * - SidebarScrollArea: Scrollable content area
 *
 * ## When to Use
 * - Application sidebars
 * - Navigation panels
 * - Sidebar layouts
 */
const meta: Meta<typeof SimpleSidebar> = {
  title: 'Primitives/Sidebar',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SimpleSidebar>;

/**
 * Simple sidebar
 */
export const Simple: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.sidebar.description')}</Paragraph>
            <div
              style={{
                display: 'flex',
                height: '400px',
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <SimpleSidebar>
                <SidebarHeaderArea>
                  <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {t('storybook.sidebar.header')}
                  </Paragraph>
                </SidebarHeaderArea>
                <SidebarScrollArea>
                  <Stack spacing="var(--ds-spacing-2)" style={{ padding: 'var(--ds-spacing-2)' }}>
                    <Button
                      data-color="neutral"
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                    >
                      {t('storybook.sidebar.item1')}
                    </Button>
                    <Button
                      data-color="neutral"
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                    >
                      {t('storybook.sidebar.item2')}
                    </Button>
                    <Button
                      data-color="neutral"
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                    >
                      {t('storybook.sidebar.item3')}
                    </Button>
                  </Stack>
                </SidebarScrollArea>
              </SimpleSidebar>
              <div style={{ flex: 1, padding: 'var(--ds-spacing-4)' }}>
                <Paragraph data-size="sm">{t('storybook.sidebar.content')}</Paragraph>
              </div>
            </div>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Sidebar with panel
 */
export const WithPanel: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.sidebar.withPanel')}</Paragraph>
            <div
              style={{
                display: 'flex',
                height: '400px',
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <SimpleSidebar>
                <SidebarHeaderArea>
                  <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {t('storybook.sidebar.header')}
                  </Paragraph>
                </SidebarHeaderArea>
                <SidebarPanel>
                  <Stack spacing="var(--ds-spacing-2)" style={{ padding: 'var(--ds-spacing-2)' }}>
                    <Button
                      data-color="neutral"
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                    >
                      {t('storybook.sidebar.item1')}
                    </Button>
                    <Button
                      data-color="neutral"
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                    >
                      {t('storybook.sidebar.item2')}
                    </Button>
                    <Button
                      data-color="neutral"
                      style={{ width: '100%', justifyContent: 'flex-start' }}
                    >
                      {t('storybook.sidebar.item3')}
                    </Button>
                  </Stack>
                </SidebarPanel>
              </SimpleSidebar>
              <div style={{ flex: 1, padding: 'var(--ds-spacing-4)' }}>
                <Paragraph data-size="sm">{t('storybook.sidebar.content')}</Paragraph>
              </div>
            </div>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

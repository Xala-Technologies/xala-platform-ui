import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { AppShell, Stack, Paragraph, Card, Button } from '../../index';
import { HeaderLogo } from '../../index';

/**
 * AppShell provides the main application shell with header and content areas.
 *
 * ## Features
 * - Header support
 * - Footer support
 * - Maximum width constraint
 * - Fluid layout option
 *
 * ## When to Use
 * - Application layouts
 * - Main page shells
 * - Full-page layouts
 */
const meta: Meta<typeof AppShell> = {
  title: 'Shells/AppShell',
  component: AppShell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AppShell>;

/**
 * Default app shell
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <AppShell
        header={
          <div style={{ padding: 'var(--ds-spacing-4)', borderBottom: '1px solid var(--ds-color-neutral-border-default)' }}>
            <HeaderLogo title={t('storybook.appShell.appName')} />
          </div>
        }
      >
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Card data-color="neutral" data-size="medium">
            <Stack spacing="var(--ds-spacing-4)">
              <Paragraph data-size="md">{t('storybook.appShell.description')}</Paragraph>
              <Paragraph data-size="sm">{t('storybook.appShell.content')}</Paragraph>
            </Stack>
          </Card>
        </Stack>
      </AppShell>
    );
  },
};

/**
 * App shell with footer
 */
export const WithFooter: Story = {
  render: function Render() {
    const t = useT();
    return (
      <AppShell
        header={
          <div style={{ padding: 'var(--ds-spacing-4)', borderBottom: '1px solid var(--ds-color-neutral-border-default)' }}>
            <HeaderLogo title={t('storybook.appShell.appName')} />
          </div>
        }
        footer={
          <div style={{ padding: 'var(--ds-spacing-4)', borderTop: '1px solid var(--ds-color-neutral-border-default)', textAlign: 'center' }}>
            <Paragraph data-size="sm">{t('storybook.appShell.footer')}</Paragraph>
          </div>
        }
      >
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Card data-color="neutral" data-size="medium">
            <Stack spacing="var(--ds-spacing-4)">
              <Paragraph data-size="md">{t('storybook.appShell.withFooter')}</Paragraph>
              <Paragraph data-size="sm">{t('storybook.appShell.content')}</Paragraph>
            </Stack>
          </Card>
        </Stack>
      </AppShell>
    );
  },
};

/**
 * Fluid app shell
 */
export const Fluid: Story = {
  render: function Render() {
    const t = useT();
    return (
      <AppShell
        fluid
        header={
          <div style={{ padding: 'var(--ds-spacing-4)', borderBottom: '1px solid var(--ds-color-neutral-border-default)' }}>
            <HeaderLogo title={t('storybook.appShell.appName')} />
          </div>
        }
      >
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Card data-color="neutral" data-size="medium">
            <Stack spacing="var(--ds-spacing-4)">
              <Paragraph data-size="md">{t('storybook.appShell.fluid')}</Paragraph>
              <Paragraph data-size="sm">{t('storybook.appShell.content')}</Paragraph>
            </Stack>
          </Card>
        </Stack>
      </AppShell>
    );
  },
};

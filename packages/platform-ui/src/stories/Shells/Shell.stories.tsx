import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { AppShell as Shell, Stack, Paragraph, Card } from '../../index';
import { HeaderLogo } from '../../index';

/**
 * Shell provides a reusable shell component with consistent layout structure.
 *
 * ## Features
 * - Title and subtitle
 * - Header and footer support
 * - Maximum width constraint
 * - Fluid layout option
 * - Branding section
 *
 * ## When to Use
 * - Application shells
 * - Page layouts
 * - Consistent structure
 */
const meta: Meta<typeof Shell> = {
  title: 'Shells/Shell',
  component: Shell,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Shell>;

/**
 * Default shell
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Shell title={t('storybook.shell.title')} subtitle={t('storybook.shell.subtitle')}>
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Card data-color="neutral" data-size="medium">
            <Stack spacing="var(--ds-spacing-4)">
              <Paragraph data-size="md">{t('storybook.shell.description')}</Paragraph>
              <Paragraph data-size="sm">{t('storybook.shell.content')}</Paragraph>
            </Stack>
          </Card>
        </Stack>
      </Shell>
    );
  },
};

/**
 * Shell with header and footer
 */
export const WithHeaderFooter: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Shell
        title={t('storybook.shell.title')}
        subtitle={t('storybook.shell.subtitle')}
        header={<HeaderLogo title={t('storybook.shell.appName')} />}
        footer={<Paragraph data-size="sm">{t('storybook.shell.footer')}</Paragraph>}
      >
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Card data-color="neutral" data-size="medium">
            <Stack spacing="var(--ds-spacing-4)">
              <Paragraph data-size="md">{t('storybook.shell.withHeaderFooter')}</Paragraph>
              <Paragraph data-size="sm">{t('storybook.shell.content')}</Paragraph>
            </Stack>
          </Card>
        </Stack>
      </Shell>
    );
  },
};

/**
 * Fluid shell
 */
export const Fluid: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Shell fluid title={t('storybook.shell.title')} subtitle={t('storybook.shell.subtitle')}>
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Card data-color="neutral" data-size="medium">
            <Stack spacing="var(--ds-spacing-4)">
              <Paragraph data-size="md">{t('storybook.shell.fluid')}</Paragraph>
              <Paragraph data-size="sm">{t('storybook.shell.content')}</Paragraph>
            </Stack>
          </Card>
        </Stack>
      </Shell>
    );
  },
};

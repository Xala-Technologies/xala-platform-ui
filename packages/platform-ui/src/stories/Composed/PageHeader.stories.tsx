import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { PageHeader, Stack, Paragraph, Card, Button } from '../../index';

/**
 * PageHeader provides a consistent header component for pages.
 *
 * ## Features
 * - Title and subtitle
 * - Action buttons
 * - Breadcrumb support
 * - Optional border
 *
 * ## When to Use
 * - Page headers
 * - Detail page headers
 * - Form page headers
 */
const meta: Meta<typeof PageHeader> = {
  title: 'Composed/PageHeader',
  component: PageHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PageHeader>;

/**
 * Default page header
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.pageHeader.description')}</Paragraph>
            <PageHeader
              title={t('storybook.pageHeader.title')}
              subtitle={t('storybook.pageHeader.subtitle')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Header with actions
 */
export const WithActions: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.pageHeader.withActions')}</Paragraph>
            <PageHeader
              title={t('storybook.pageHeader.title')}
              subtitle={t('storybook.pageHeader.subtitle')}
              actions={
                <Stack spacing="var(--ds-spacing-2)" style={{ flexDirection: 'row' }}>
                  <Button>{t('storybook.pageHeader.edit')}</Button>
                  <Button>{t('storybook.pageHeader.save')}</Button>
                </Stack>
              }
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Header with border
 */
export const WithBorder: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.pageHeader.withBorder')}</Paragraph>
            <PageHeader
              title={t('storybook.pageHeader.title')}
              subtitle={t('storybook.pageHeader.subtitle')}
              bordered
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

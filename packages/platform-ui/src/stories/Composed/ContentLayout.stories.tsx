import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ContentLayout, Stack, Paragraph, Card } from '../../index';

/**
 * ContentLayout provides a high-level layout component for page content.
 *
 * ## Features
 * - Maximum width constraint
 * - Padding control
 * - Fluid layout option
 * - Header offset support
 * - Grid configuration
 *
 * ## When to Use
 * - Page layouts
 * - Content containers
 * - Responsive layouts
 */
const meta: Meta<typeof ContentLayout> = {
  title: 'Composed/ContentLayout',
  component: ContentLayout,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentLayout>;

/**
 * Default content layout
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ContentLayout>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.contentLayout.description')}</Paragraph>
            <Paragraph data-size="sm">{t('storybook.contentLayout.content')}</Paragraph>
          </Stack>
        </Card>
      </ContentLayout>
    );
  },
};

/**
 * Fluid layout
 */
export const Fluid: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ContentLayout fluid>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.contentLayout.fluid')}</Paragraph>
            <Paragraph data-size="sm">{t('storybook.contentLayout.content')}</Paragraph>
          </Stack>
        </Card>
      </ContentLayout>
    );
  },
};

/**
 * Layout with grid
 */
export const WithGrid: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ContentLayout
        grid={{
          columns: 'repeat(3, 1fr)',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">{t('storybook.contentLayout.column1')}</Paragraph>
        </Card>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">{t('storybook.contentLayout.column2')}</Paragraph>
        </Card>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">{t('storybook.contentLayout.column3')}</Paragraph>
        </Card>
      </ContentLayout>
    );
  },
};

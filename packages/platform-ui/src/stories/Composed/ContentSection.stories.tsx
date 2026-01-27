import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ContentSection, Stack, Paragraph, Card, Button } from '../../index';

/**
 * ContentSection provides a high-level section component for grouping related content.
 *
 * ## Features
 * - Title and subtitle
 * - Fieldset wrapper option
 * - Configurable spacing
 * - Vertical or horizontal direction
 *
 * ## When to Use
 * - Form sections
 * - Content grouping
 * - Page sections
 */
const meta: Meta<typeof ContentSection> = {
  title: 'Composed/ContentSection',
  component: ContentSection,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ContentSection>;

/**
 * Default content section
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.contentSection.description')}</Paragraph>
            <ContentSection
              title={t('storybook.contentSection.title')}
              subtitle={t('storybook.contentSection.subtitle')}
            >
              <Paragraph data-size="sm">{t('storybook.contentSection.content')}</Paragraph>
            </ContentSection>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Section without fieldset
 */
export const WithoutFieldset: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.contentSection.withoutFieldset')}</Paragraph>
            <ContentSection
              title={t('storybook.contentSection.title')}
              subtitle={t('storybook.contentSection.subtitle')}
              fieldset={false}
            >
              <Paragraph data-size="sm">{t('storybook.contentSection.content')}</Paragraph>
            </ContentSection>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Horizontal section
 */
export const Horizontal: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.contentSection.horizontal')}</Paragraph>
            <ContentSection title={t('storybook.contentSection.title')} direction="horizontal">
              <Button>{t('storybook.contentSection.button1')}</Button>
              <Button>{t('storybook.contentSection.button2')}</Button>
            </ContentSection>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

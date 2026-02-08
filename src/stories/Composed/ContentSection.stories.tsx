import type { Meta, StoryObj } from '@storybook/react';
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
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <ContentSection
              title="Eksempel Tekst"
              subtitle="Eksempel Tekst"
            >
              <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
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
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <ContentSection
              title="Eksempel Tekst"
              subtitle="Eksempel Tekst"
              fieldset={false}
            >
              <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
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
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <ContentSection title="Eksempel Tekst" direction="horizontal">
              <Button>"Eksempel Tekst"</Button>
              <Button>"Eksempel Tekst"</Button>
            </ContentSection>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

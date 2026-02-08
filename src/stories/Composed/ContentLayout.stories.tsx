import type { Meta, StoryObj } from '@storybook/react';
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
    return (
      <ContentLayout>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
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
    return (
      <ContentLayout fluid>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
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
    return (
      <ContentLayout
        grid={{
          columns: 'repeat(3, 1fr)',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </Card>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </Card>
        <Card data-color="neutral" data-size="medium">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </Card>
      </ContentLayout>
    );
  },
};

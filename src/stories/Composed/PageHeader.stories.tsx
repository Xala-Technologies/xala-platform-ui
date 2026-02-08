import type { Meta, StoryObj } from '@storybook/react';
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <PageHeader
              title="Eksempel Tekst"
              subtitle="Eksempel Tekst"
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <PageHeader
              title="Eksempel Tekst"
              subtitle="Eksempel Tekst"
              actions={
                <Stack spacing="var(--ds-spacing-2)" style={{ flexDirection: 'row' }}>
                  <Button>"Eksempel Tekst"</Button>
                  <Button>"Eksempel Tekst"</Button>
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <PageHeader
              title="Eksempel Tekst"
              subtitle="Eksempel Tekst"
              bordered
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

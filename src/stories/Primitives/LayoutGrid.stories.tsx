import type { Meta, StoryObj } from '@storybook/react';
import { LayoutGrid, Stack, Paragraph, Card } from '../../index';

/**
 * LayoutGrid provides a responsive grid layout component for consistent spacing and alignment.
 *
 * ## Features
 * - Responsive columns
 * - Configurable gap
 * - Auto-fit option
 * - Breakpoint support
 *
 * ## When to Use
 * - Grid layouts
 * - Responsive grids
 * - Card grids
 */
const meta: Meta<typeof LayoutGrid> = {
  title: 'Primitives/LayoutGrid',
  component: LayoutGrid,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof LayoutGrid>;

/**
 * Default grid
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
            <LayoutGrid columns={{ sm: 1, md: 2, lg: 3 }} gap={16}>
              <Card data-color="neutral" data-size="medium">
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              </Card>
              <Card data-color="neutral" data-size="medium">
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              </Card>
              <Card data-color="neutral" data-size="medium">
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              </Card>
            </LayoutGrid>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Auto-fit grid
 */
export const AutoFit: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <LayoutGrid autoFit minColumnWidth="200px" gap={16}>
              <Card data-color="neutral" data-size="medium">
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              </Card>
              <Card data-color="neutral" data-size="medium">
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              </Card>
              <Card data-color="neutral" data-size="medium">
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              </Card>
              <Card data-color="neutral" data-size="medium">
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              </Card>
            </LayoutGrid>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

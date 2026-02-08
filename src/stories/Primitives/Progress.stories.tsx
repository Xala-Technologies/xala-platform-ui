import type { Meta, StoryObj } from '@storybook/react';
import { Progress, Stack, Paragraph, Card } from '../../index';

/**
 * Progress provides a progress bar component for displaying completion status.
 *
 * ## Features
 * - Value from 0 to 100
 * - Multiple color variants
 * - Size variants
 * - Accessible labels
 *
 * ## When to Use
 * - Progress indicators
 * - Loading states
 * - Completion tracking
 */
const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

/**
 * Default progress bar
 */
export const Default: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Progress value={50} aria-label="Eksempel Tekst" />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Color variants
 */
export const Colors: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack spacing="var(--ds-spacing-3)">
              <Progress
                value={75}
                data-color="success"
                aria-label="Eksempel Tekst"
              />
              <Progress value={50} data-color="info" aria-label="Eksempel Tekst" />
              <Progress
                value={30}
                data-color="warning"
                aria-label="Eksempel Tekst"
              />
              <Progress
                value={10}
                data-color="danger"
                aria-label="Eksempel Tekst"
              />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Size variants
 */
export const Sizes: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack spacing="var(--ds-spacing-3)">
              <Progress value={50} data-size="sm" aria-label="Eksempel Tekst" />
              <Progress value={50} data-size="md" aria-label="Eksempel Tekst" />
              <Progress value={50} data-size="lg" aria-label="Eksempel Tekst" />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Different values
 */
export const Values: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack spacing="var(--ds-spacing-3)">
              <Progress value={0} aria-label="Eksempel Tekst" />
              <Progress value={25} aria-label="Eksempel Tekst" />
              <Progress value={50} aria-label="Eksempel Tekst" />
              <Progress value={75} aria-label="Eksempel Tekst" />
              <Progress value={100} aria-label="Eksempel Tekst" />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

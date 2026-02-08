import type { Meta, StoryObj } from '@storybook/react';
import { MainContent, Stack, Paragraph, Card } from '../../index';

/**
 * MainContent provides a main content area with proper padding and overflow handling.
 *
 * ## Features
 * - Padding presets (none, sm, default, lg)
 * - Scrollable option
 * - Design token-based styling
 *
 * ## When to Use
 * - Main content areas
 * - Scrollable content
 * - Page content
 */
const meta: Meta<typeof MainContent> = {
  title: 'Primitives/MainContent',
  component: MainContent,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MainContent>;

/**
 * Default main content
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
            <div
              style={{
                height: '300px',
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <MainContent>
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              </MainContent>
            </div>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Different padding sizes
 */
export const PaddingSizes: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <div
                style={{
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                }}
              >
                <MainContent padding="sm">
                  <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
                </MainContent>
              </div>
              <div
                style={{
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                }}
              >
                <MainContent padding="default">
                  <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
                </MainContent>
              </div>
              <div
                style={{
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                }}
              >
                <MainContent padding="lg">
                  <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
                </MainContent>
              </div>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Non-scrollable
 */
export const NonScrollable: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <div
              style={{
                height: '200px',
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <MainContent scrollable={false}>
                <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
              </MainContent>
            </div>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { IframeViewer, Stack, Paragraph } from '../../index';

/**
 * IframeViewer provides an iframe container with loading and error states.
 *
 * ## Features
 * - Loading states
 * - Error handling
 * - Retry functionality
 * - Copy link
 * - Open in new tab
 * - Custom header
 *
 * ## When to Use
 * - Embedding external content
 * - Preview panels
 * - Documentation viewers
 */
const meta: Meta<typeof IframeViewer> = {
  title: 'Composed/IframeViewer',
  component: IframeViewer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
IframeViewer provides an iframe container with loading and error states.

## Features
- Loading states
- Error handling
- Retry functionality
- Copy link
- Open in new tab
- Custom header

## When to Use
- Embedding external content
- Preview panels
- Documentation viewers
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IframeViewer>;

/**
 * Default iframe viewer
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ height: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <IframeViewer
          src="https://example.com"
          title="Eksempel Tekst"
          showHeader
          headerTitle="Eksempel Tekst"
          headerSubtitle="Eksempel Tekst"
        />
      </Stack>
    );
  },
};

/**
 * Iframe viewer with custom header
 */
export const WithCustomHeader: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ height: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <IframeViewer
          src="https://example.com"
          title="Eksempel Tekst"
          header={
            <Stack
              spacing="var(--ds-spacing-4)"
              style={{
                padding: 'var(--ds-spacing-4)',
                borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
              }}
            >
              <Paragraph data-size="md" style={{ margin: 0 }}>
                "Eksempel Tekst"
              </Paragraph>
            </Stack>
          }
        />
      </Stack>
    );
  },
};

/**
 * Iframe viewer with external URL
 */
export const WithExternalUrl: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ height: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <IframeViewer
          src="https://example.com"
          title="Eksempel Tekst"
          showHeader
          headerTitle="Eksempel Tekst"
          externalUrl="https://example.com/full"
        />
      </Stack>
    );
  },
};

/**
 * Iframe viewer with custom height
 */
export const CustomHeight: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <IframeViewer
          src="https://example.com"
          title="Eksempel Tekst"
          height="400px"
          showHeader
          headerTitle="Eksempel Tekst"
        />
      </div>
    );
  },
};

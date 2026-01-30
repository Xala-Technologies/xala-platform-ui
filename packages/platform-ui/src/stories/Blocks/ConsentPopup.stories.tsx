import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { ConsentBanner, DEFAULT_CONSENT_BANNER_LABELS } from '../../blocks/gdpr/ConsentPopup';
import { Paragraph, Stack, Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof ConsentBanner> = {
  title: 'Blocks/ConsentBanner',
  component: ConsentBanner,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ConsentBanner

GDPR consent banner for initial consent collection. Displays at bottom of viewport with Accept, Reject, and Customize options.

### Features
- Fixed positioning at bottom of viewport
- Three action buttons: Accept All, Reject All, Customize
- Responsive design (mobile/desktop)
- Backdrop blur effect
- Keyboard navigation support

### Usage
\`\`\`tsx
<ConsentBanner
  isVisible={true}
  onAccept={() => handleAccept()}
  onReject={() => handleReject()}
  onCustomize={() => handleCustomize()}
  labels={DEFAULT_CONSENT_BANNER_LABELS}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic consent banner
export const Default: Story = {
  render: function Render() {
    const [isVisible, setIsVisible] = useState(true);
    const [action, setAction] = useState<string | null>(null);

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Stack
          spacing="var(--ds-spacing-4)"
          style={{ padding: 'var(--ds-spacing-4)', maxWidth: '800px', margin: '0 auto' }}
        >
          <Paragraph data-size="md">
            Scroll down to see the consent banner at the bottom of the viewport.
          </Paragraph>
          {action && (
            <Paragraph
              data-size="md"
              style={{
                padding: 'var(--ds-spacing-3)',
                backgroundColor: 'var(--ds-color-success-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              Action taken: <strong>{action}</strong>
            </Paragraph>
          )}
          {!isVisible && (
            <Paragraph data-size="sm">
              Banner is hidden.{' '}
              <Button
                variant="tertiary"
                size="small"
                onClick={() => {
                  setIsVisible(true);
                  setAction(null);
                }}
              >
                Show again
              </Button>
            </Paragraph>
          )}
        </Stack>

        <ConsentBanner
          isVisible={isVisible}
          onAccept={() => {
            setAction('Accepted all consents');
            setIsVisible(false);
          }}
          onReject={() => {
            setAction('Rejected all consents');
            setIsVisible(false);
          }}
          onCustomize={() => {
            setAction('Opened customization settings');
            setIsVisible(false);
          }}
          labels={DEFAULT_CONSENT_BANNER_LABELS}
        />
      </div>
    );
  },
};

// Always visible for testing
export const AlwaysVisible: Story = {
  render: function Render() {
    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Stack
          spacing="var(--ds-spacing-4)"
          style={{ padding: 'var(--ds-spacing-4)', maxWidth: '800px', margin: '0 auto' }}
        >
          <Paragraph data-size="md">
            This banner remains visible for testing button interactions.
          </Paragraph>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            Try using Tab to navigate between buttons, Enter to activate, and test all three
            actions.
          </Paragraph>
        </Stack>

        <ConsentBanner
          isVisible={true}
          onAccept={fn()}
          onReject={fn()}
          onCustomize={fn()}
          labels={DEFAULT_CONSENT_BANNER_LABELS}
        />
      </div>
    );
  },
};

// Custom labels (English)
export const CustomLabels: Story = {
  render: function Render() {
    const [isVisible, setIsVisible] = useState(true);

    const customLabels = {
      title: 'We respect your privacy',
      description:
        'We use cookies and similar technologies to improve your experience, analyze website traffic, and personalize content. You can choose to accept all, reject all, or customize your preferences.',
      acceptButton: 'Accept All',
      rejectButton: 'Reject All',
      customizeButton: 'Customize',
    };

    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Stack
          spacing="var(--ds-spacing-4)"
          style={{ padding: 'var(--ds-spacing-4)', maxWidth: '800px', margin: '0 auto' }}
        >
          <Paragraph data-size="md">
            Example with custom English labels for internationalization.
          </Paragraph>
          {!isVisible && (
            <Paragraph data-size="sm">
              Banner is hidden.{' '}
              <Button
                variant="tertiary"
                size="small"
                onClick={() => setIsVisible(true)}
              >
                Show again
              </Button>
            </Paragraph>
          )}
        </Stack>

        <ConsentBanner
          isVisible={isVisible}
          onAccept={() => setIsVisible(false)}
          onReject={() => setIsVisible(false)}
          onCustomize={() => setIsVisible(false)}
          labels={customLabels}
        />
      </div>
    );
  },
};

// Mobile viewport simulation
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
  render: function Render() {
    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Stack
          spacing="var(--ds-spacing-4)"
          style={{ padding: 'var(--ds-spacing-4)', maxWidth: '800px', margin: '0 auto' }}
        >
          <Paragraph data-size="md">
            Mobile view - buttons are stacked vertically with Accept at top.
          </Paragraph>
        </Stack>

        <ConsentBanner
          isVisible={true}
          onAccept={fn()}
          onReject={fn()}
          onCustomize={fn()}
          labels={DEFAULT_CONSENT_BANNER_LABELS}
        />
      </div>
    );
  },
};

// Hidden state
export const Hidden: Story = {
  render: function Render() {
    return (
      <div style={{ minHeight: '400px', position: 'relative' }}>
        <Stack
          spacing="var(--ds-spacing-4)"
          style={{ padding: 'var(--ds-spacing-4)', maxWidth: '800px', margin: '0 auto' }}
        >
          <Paragraph data-size="md">
            The banner is hidden (isVisible=false). This is the state after user interaction or when
            consent has already been collected.
          </Paragraph>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            Component returns null when not visible.
          </Paragraph>
        </Stack>

        <ConsentBanner
          isVisible={false}
          onAccept={fn()}
          onReject={fn()}
          onCustomize={fn()}
          labels={DEFAULT_CONSENT_BANNER_LABELS}
        />
      </div>
    );
  },
};

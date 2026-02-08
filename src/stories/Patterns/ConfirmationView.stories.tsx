import type { Meta, StoryObj } from '@storybook/react';
import { ConfirmationView } from '../../index';
import { Card } from '@digdir/designsystemet-react';

/**
 * ConfirmationView provides a domain-neutral confirmation screen pattern.
 *
 * ## Features
 * - Custom icon or default variant icons
 * - Title and message
 * - Optional details (key-value pairs)
 * - Confirm and cancel buttons
 * - Loading state
 * - Variant support (default, warning, danger)
 *
 * ## When to Use
 * - Confirming important actions
 * - Showing action summaries before execution
 * - Warning users about consequences
 */
const meta: Meta<typeof ConfirmationView> = {
  title: 'Patterns/ConfirmationView',
  component: ConfirmationView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
ConfirmationView provides a domain-neutral confirmation screen pattern.

## Features
- Custom icon or default variant icons
- Title and optional message
- Optional details section (key-value pairs)
- Confirm and cancel buttons
- Loading state support
- Variant support (default, warning, danger)

## Variants
- **default**: Standard confirmation with accent colors
- **warning**: Warning confirmation with warning colors
- **danger**: Dangerous action confirmation with danger colors

## When to Use
- Confirming important actions
- Showing action summaries before execution
- Warning users about consequences
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ConfirmationView>;

/**
 * Default confirmation view
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ConfirmationView
          title="Eksempel Tekst"
          message="Eksempel Tekst"
          confirmLabel="Eksempel Tekst"
          cancelLabel="Eksempel Tekst"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    );
  },
};

/**
 * Confirmation view with details
 */
export const WithDetails: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ConfirmationView
          title="Eksempel Tekst"
          message="Eksempel Tekst"
          details={[
            {
              label: t('storybook.confirmation.item'),
              value: t('storybook.confirmation.premiumPackage'),
            },
            { label: t('storybook.confirmation.date'), value: '2026-01-26' },
            { label: t('storybook.confirmation.price'), value: 'NOK 1,500' },
          ]}
          confirmLabel="Eksempel Tekst"
          cancelLabel="Eksempel Tekst"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    );
  },
};

/**
 * Warning variant
 */
export const Warning: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ConfirmationView
          variant="warning"
          title="Eksempel Tekst"
          message="Eksempel Tekst"
          details={[
            {
              label: t('storybook.confirmation.action'),
              value: t('storybook.confirmation.deleteItem'),
            },
            { label: t('storybook.confirmation.affectedItems'), value: '5' },
          ]}
          confirmLabel="Eksempel Tekst"
          cancelLabel="Eksempel Tekst"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    );
  },
};

/**
 * Danger variant
 */
export const Danger: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ConfirmationView
          variant="danger"
          title="Eksempel Tekst"
          message="Eksempel Tekst"
          details={[
            {
              label: t('storybook.confirmation.action'),
              value: t('storybook.confirmation.deleteAccount'),
            },
            { label: t('storybook.confirmation.email'), value: 'user@example.com' },
          ]}
          confirmLabel="Eksempel Tekst"
          cancelLabel="Eksempel Tekst"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    );
  },
};

/**
 * With custom icon
 */
export const WithCustomIcon: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ConfirmationView
          icon={
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2v20M2 12h20" />
            </svg>
          }
          title="Eksempel Tekst"
          message="Eksempel Tekst"
          confirmLabel="Eksempel Tekst"
          cancelLabel="Eksempel Tekst"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    );
  },
};

/**
 * Loading state
 */
export const Loading: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ConfirmationView
          title="Eksempel Tekst"
          message="Eksempel Tekst"
          details={[
            {
              label: t('storybook.confirmation.item'),
              value: t('storybook.confirmation.premiumPackage'),
            },
            { label: t('storybook.confirmation.date'), value: '2026-01-26' },
          ]}
          confirmLabel="Eksempel Tekst"
          cancelLabel="Eksempel Tekst"
          isConfirming
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        />
      </div>
    );
  },
};

/**
 * Without cancel button
 */
export const WithoutCancel: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ConfirmationView
          title="Eksempel Tekst"
          message="Eksempel Tekst"
          confirmLabel="Eksempel Tekst"
          onConfirm={() => console.log('Confirmed')}
        />
      </div>
    );
  },
};

/**
 * With additional content
 */
export const WithAdditionalContent: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <ConfirmationView
          title="Eksempel Tekst"
          message="Eksempel Tekst"
          details={[
            {
              label: t('storybook.confirmation.item'),
              value: t('storybook.confirmation.premiumPackage'),
            },
          ]}
          confirmLabel="Eksempel Tekst"
          cancelLabel="Eksempel Tekst"
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        >
          <Card
            data-color="neutral"
            data-size="medium"
            style={{ marginTop: 'var(--ds-spacing-4)' }}
          >
            <Card.Block>
              <p style={{ margin: 0, fontSize: 'var(--ds-font-size-sm)' }}>
                "Eksempel Tekst"
              </p>
            </Card.Block>
          </Card>
        </ConfirmationView>
      </div>
    );
  },
};

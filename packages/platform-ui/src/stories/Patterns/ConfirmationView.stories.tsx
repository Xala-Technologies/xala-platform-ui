import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
          title={t('storybook.confirmation.defaultTitle')}
          message={t('storybook.confirmation.defaultMessage')}
          confirmLabel={t('storybook.confirmation.confirm')}
          cancelLabel={t('storybook.confirmation.cancel')}
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
          title={t('storybook.confirmation.withDetailsTitle')}
          message={t('storybook.confirmation.withDetailsMessage')}
          details={[
            { label: t('storybook.confirmation.item'), value: t('storybook.confirmation.premiumPackage') },
            { label: t('storybook.confirmation.date'), value: '2026-01-26' },
            { label: t('storybook.confirmation.price'), value: 'NOK 1,500' },
          ]}
          confirmLabel={t('storybook.confirmation.confirm')}
          cancelLabel={t('storybook.confirmation.cancel')}
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
          title={t('storybook.confirmation.warningTitle')}
          message={t('storybook.confirmation.warningMessage')}
          details={[
            { label: t('storybook.confirmation.action'), value: t('storybook.confirmation.deleteItem') },
            { label: t('storybook.confirmation.affectedItems'), value: '5' },
          ]}
          confirmLabel={t('storybook.confirmation.proceed')}
          cancelLabel={t('storybook.confirmation.cancel')}
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
          title={t('storybook.confirmation.dangerTitle')}
          message={t('storybook.confirmation.dangerMessage')}
          details={[
            { label: t('storybook.confirmation.action'), value: t('storybook.confirmation.deleteAccount') },
            { label: t('storybook.confirmation.email'), value: 'user@example.com' },
          ]}
          confirmLabel={t('storybook.confirmation.delete')}
          cancelLabel={t('storybook.confirmation.cancel')}
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
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2v20M2 12h20" />
            </svg>
          }
          title={t('storybook.confirmation.customIconTitle')}
          message={t('storybook.confirmation.customIconMessage')}
          confirmLabel={t('storybook.confirmation.confirm')}
          cancelLabel={t('storybook.confirmation.cancel')}
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
          title={t('storybook.confirmation.loadingTitle')}
          message={t('storybook.confirmation.loadingMessage')}
          details={[
            { label: t('storybook.confirmation.item'), value: t('storybook.confirmation.premiumPackage') },
            { label: t('storybook.confirmation.date'), value: '2026-01-26' },
          ]}
          confirmLabel={t('storybook.confirmation.confirm')}
          cancelLabel={t('storybook.confirmation.cancel')}
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
          title={t('storybook.confirmation.noCancelTitle')}
          message={t('storybook.confirmation.noCancelMessage')}
          confirmLabel={t('storybook.confirmation.ok')}
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
          title={t('storybook.confirmation.additionalContentTitle')}
          message={t('storybook.confirmation.additionalContentMessage')}
          details={[
            { label: t('storybook.confirmation.item'), value: t('storybook.confirmation.premiumPackage') },
          ]}
          confirmLabel={t('storybook.confirmation.confirm')}
          cancelLabel={t('storybook.confirmation.cancel')}
          onConfirm={() => console.log('Confirmed')}
          onCancel={() => console.log('Cancelled')}
        >
          <Card data-color="neutral" data-size="medium" style={{ marginTop: 'var(--ds-spacing-4)' }}>
            <Card.Content>
              <p style={{ margin: 0, fontSize: 'var(--ds-font-size-sm)' }}>
                {t('storybook.confirmation.additionalInfo')}
              </p>
            </Card.Content>
          </Card>
        </ConfirmationView>
      </div>
    );
  },
};

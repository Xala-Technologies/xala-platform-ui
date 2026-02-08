import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { FormActions, Stack, Paragraph } from '../../index';

/**
 * FormActions provides standardized action buttons for forms.
 *
 * ## Features
 * - Submit and cancel buttons
 * - Loading state
 * - Consistent layout
 * - Customizable text
 *
 * ## When to Use
 * - Form footers
 * - Modal forms
 * - Form submissions
 */
const meta: Meta<typeof FormActions> = {
  title: 'Composed/FormActions',
  component: FormActions,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FormActions provides standardized action buttons for forms.

## Features
- Submit and cancel buttons
- Loading state
- Consistent layout
- Customizable text

## When to Use
- Form footers
- Modal forms
- Form submissions
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormActions>;

/**
 * Default form actions
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Form submitted');
          }}
        >
          <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="md">{t('storybook.formActions.formContent')}</Paragraph>
          </Stack>
          <FormActions
            submitText={t('storybook.formActions.save')}
            onCancel={() => console.log('Cancelled')}
          />
        </form>
      </Stack>
    );
  },
};

/**
 * Form actions with custom cancel text
 */
export const CustomCancelText: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log('Form submitted');
          }}
        >
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <p>{t('storybook.formActions.formContent')}</p>
          </div>
          <FormActions
            submitText={t('storybook.formActions.submit')}
            cancelText={t('storybook.formActions.close')}
            onCancel={() => console.log('Closed')}
          />
        </form>
      </div>
    );
  },
};

/**
 * Form actions with loading state
 */
export const Loading: Story = {
  render: function Render() {
    const t = useT();
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setTimeout(() => setIsSubmitting(false), 2000);
          }}
        >
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <p>{t('storybook.formActions.formContent')}</p>
          </div>
          <FormActions
            submitText={t('storybook.formActions.save')}
            isSubmitting={isSubmitting}
            submittingText={t('storybook.formActions.saving')}
            onCancel={() => console.log('Cancelled')}
          />
        </form>
      </div>
    );
  },
};

/**
 * Form actions with custom submitting text
 */
export const CustomSubmittingText: Story = {
  render: function Render() {
    const t = useT();
    const [isSubmitting, setIsSubmitting] = useState(false);
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setIsSubmitting(true);
            setTimeout(() => setIsSubmitting(false), 2000);
          }}
        >
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <p>{t('storybook.formActions.formContent')}</p>
          </div>
          <FormActions
            submitText={t('storybook.formActions.create')}
            isSubmitting={isSubmitting}
            submittingText={t('storybook.formActions.creating')}
            onCancel={() => console.log('Cancelled')}
          />
        </form>
      </div>
    );
  },
};

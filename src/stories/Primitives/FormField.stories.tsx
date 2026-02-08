import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { FormField } from '../../index';
import { Textfield } from '@digdir/designsystemet-react';

/**
 * FormField provides a wrapper for form inputs with label, description, and error message.
 *
 * ## Features
 * - Label support
 * - Required indicator
 * - Error message display
 * - Help text / description
 *
 * ## When to Use
 * - Form inputs
 * - Input wrappers
 * - Form validation display
 */
const meta: Meta<typeof FormField> = {
  title: 'Primitives/FormField',
  component: FormField,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FormField provides a wrapper for form inputs with label, description, and error message.

## Features
- Label support
- Required indicator (*)
- Error message display
- Help text / description

## When to Use
- Form inputs
- Input wrappers
- Form validation display
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormField>;

/**
 * Default form field
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField label={t('storybook.formField.name')}>
          <Textfield placeholder={t('storybook.formField.enterName')} />
        </FormField>
      </div>
    );
  },
};

/**
 * Form field with description
 */
export const WithDescription: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField
          label={t('storybook.formField.email')}
          description={t('storybook.formField.emailDescription')}
        >
          <Textfield type="email" placeholder={t('storybook.formField.enterEmail')} />
        </FormField>
      </div>
    );
  },
};

/**
 * Required form field
 */
export const Required: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField label={t('storybook.formField.name')} required>
          <Textfield placeholder={t('storybook.formField.enterName')} />
        </FormField>
      </div>
    );
  },
};

/**
 * Form field with error
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField
          label={t('storybook.formField.email')}
          error={t('storybook.formField.emailError')}
        >
          <Textfield type="email" placeholder={t('storybook.formField.enterEmail')} />
        </FormField>
      </div>
    );
  },
};

/**
 * Form field with description and error
 */
export const WithDescriptionAndError: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField
          label={t('storybook.formField.password')}
          description={t('storybook.formField.passwordDescription')}
          error={t('storybook.formField.passwordError')}
          required
        >
          <Textfield type="password" placeholder={t('storybook.formField.enterPassword')} />
        </FormField>
      </div>
    );
  },
};

/**
 * Form field without label
 */
export const WithoutLabel: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField>
          <Textfield placeholder={t('storybook.formField.enterName')} />
        </FormField>
      </div>
    );
  },
};

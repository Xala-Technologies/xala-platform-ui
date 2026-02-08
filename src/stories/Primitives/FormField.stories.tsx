import type { Meta, StoryObj } from '@storybook/react';
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
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField label="Eksempel Tekst">
          <Textfield placeholder="Eksempel Tekst" />
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
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField
          label="Eksempel Tekst"
          description="Eksempel Tekst"
        >
          <Textfield type="email" placeholder="Eksempel Tekst" />
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
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField label="Eksempel Tekst" required>
          <Textfield placeholder="Eksempel Tekst" />
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
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField
          label="Eksempel Tekst"
          error="Eksempel Tekst"
        >
          <Textfield type="email" placeholder="Eksempel Tekst" />
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
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField
          label="Eksempel Tekst"
          description="Eksempel Tekst"
          error="Eksempel Tekst"
          required
        >
          <Textfield type="password" placeholder="Eksempel Tekst" />
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
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FormField>
          <Textfield placeholder="Eksempel Tekst" />
        </FormField>
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { NativeSelect } from '../../index';

/**
 * NativeSelect provides a simple wrapper around native HTML select with Designsystemet styling.
 *
 * ## Features
 * - Label support
 * - Error message display
 * - Helper text / description
 * - Native select behavior
 *
 * ## When to Use
 * - Simple dropdowns
 * - Native select behavior needed
 * - Lightweight selects
 */
const meta: Meta<typeof NativeSelect> = {
  title: 'Primitives/NativeSelect',
  component: NativeSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
NativeSelect provides a simple wrapper around native HTML select with Designsystemet styling.

## Features
- Label support
- Error message display
- Helper text / description
- Native select behavior

## When to Use
- Simple dropdowns
- Native select behavior needed
- Lightweight selects
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

/**
 * Default native select
 */
export const Default: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect label="Eksempel Tekst">
          <option value="">"Eksempel Tekst"</option>
          <option value="no">"Eksempel Tekst"</option>
          <option value="se">"Eksempel Tekst"</option>
          <option value="dk">"Eksempel Tekst"</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Native select with description
 */
export const WithDescription: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect
          label="Eksempel Tekst"
          description="Eksempel Tekst"
        >
          <option value="">"Eksempel Tekst"</option>
          <option value="nb">"Eksempel Tekst"</option>
          <option value="en">"Eksempel Tekst"</option>
          <option value="ar">"Eksempel Tekst"</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Required native select
 */
export const Required: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect label="Eksempel Tekst" required>
          <option value="">"Eksempel Tekst"</option>
          <option value="no">"Eksempel Tekst"</option>
          <option value="se">"Eksempel Tekst"</option>
          <option value="dk">"Eksempel Tekst"</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Native select with error
 */
export const WithError: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect
          label="Eksempel Tekst"
          error="Eksempel Tekst"
        >
          <option value="">"Eksempel Tekst"</option>
          <option value="no">"Eksempel Tekst"</option>
          <option value="se">"Eksempel Tekst"</option>
          <option value="dk">"Eksempel Tekst"</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Disabled native select
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect label="Eksempel Tekst" disabled>
          <option value="">"Eksempel Tekst"</option>
          <option value="no">"Eksempel Tekst"</option>
          <option value="se">"Eksempel Tekst"</option>
          <option value="dk">"Eksempel Tekst"</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Native select with many options
 */
export const ManyOptions: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect label="Eksempel Tekst">
          <option value="">"Eksempel Tekst"</option>
          <option value="oslo">"Eksempel Tekst"</option>
          <option value="bergen">"Eksempel Tekst"</option>
          <option value="trondheim">"Eksempel Tekst"</option>
          <option value="stavanger">"Eksempel Tekst"</option>
          <option value="bodo">"Eksempel Tekst"</option>
          <option value="tromso">"Eksempel Tekst"</option>
        </NativeSelect>
      </div>
    );
  },
};

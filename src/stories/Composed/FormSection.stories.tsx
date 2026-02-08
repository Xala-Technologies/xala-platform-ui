import type { Meta, StoryObj } from '@storybook/react';
import { FormSection, Textfield, Label, Stack } from '../../index';

/**
 * FormSection provides standardized section headers for forms.
 *
 * ## Features
 * - Section title
 * - Optional description
 * - Consistent styling
 *
 * ## When to Use
 * - Form grouping
 * - Sectioned forms
 * - Multi-step forms
 */
const meta: Meta<typeof FormSection> = {
  title: 'Composed/FormSection',
  component: FormSection,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FormSection provides standardized section headers for forms.

## Features
- Section title
- Optional description
- Consistent styling

## When to Use
- Form grouping
- Sectioned forms
- Multi-step forms
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FormSection>;

/**
 * Default form section
 */
export const Default: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <FormSection title="Eksempel Tekst">
          <Stack spacing="var(--ds-spacing-3)" direction="vertical">
            <Stack spacing="var(--ds-spacing-2)" direction="vertical">
              <Label htmlFor="name">"Eksempel Tekst"</Label>
              <Textfield id="name" placeholder="Eksempel Tekst" />
            </Stack>
            <Stack spacing="var(--ds-spacing-2)" direction="vertical">
              <Label htmlFor="email">"Eksempel Tekst"</Label>
              <Textfield
                id="email"
                type="email"
                placeholder="Eksempel Tekst"
              />
            </Stack>
          </Stack>
        </FormSection>
      </Stack>
    );
  },
};

/**
 * Form section with description
 */
export const WithDescription: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FormSection
          title="Eksempel Tekst"
          description="Eksempel Tekst"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <div>
              <Label htmlFor="name">"Eksempel Tekst"</Label>
              <Textfield id="name" placeholder="Eksempel Tekst" />
            </div>
            <div>
              <Label htmlFor="email">"Eksempel Tekst"</Label>
              <Textfield
                id="email"
                type="email"
                placeholder="Eksempel Tekst"
              />
            </div>
          </div>
        </FormSection>
      </div>
    );
  },
};

/**
 * Multiple form sections
 */
export const Multiple: Story = {
  render: function Render() {
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FormSection title="Eksempel Tekst">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <div>
              <Label htmlFor="name">"Eksempel Tekst"</Label>
              <Textfield id="name" placeholder="Eksempel Tekst" />
            </div>
            <div>
              <Label htmlFor="email">"Eksempel Tekst"</Label>
              <Textfield
                id="email"
                type="email"
                placeholder="Eksempel Tekst"
              />
            </div>
          </div>
        </FormSection>
        <Stack spacing="var(--ds-spacing-6)" style={{ marginTop: 'var(--ds-spacing-6)' }}>
          <FormSection title="Eksempel Tekst">
            <Stack spacing="var(--ds-spacing-3)" direction="vertical">
              <Stack spacing="var(--ds-spacing-2)" direction="vertical">
                <Label htmlFor="street">"Eksempel Tekst"</Label>
                <Textfield id="street" placeholder="Eksempel Tekst" />
              </Stack>
              <Stack spacing="var(--ds-spacing-2)" direction="vertical">
                <Label htmlFor="city">"Eksempel Tekst"</Label>
                <Textfield id="city" placeholder="Eksempel Tekst" />
              </Stack>
            </Stack>
          </FormSection>
        </Stack>
      </div>
    );
  },
};

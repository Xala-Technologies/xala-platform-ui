import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Textarea, Label, Field, ValidationMessage } from '../../index';

const meta: Meta<typeof Textarea> = {
  title: 'Components/Textarea',
  component: Textarea,
  parameters: {
    docs: {
      description: {
        component: `
Textarea for multi-line text input.

## When to Use
- Long-form text input
- Comments or descriptions
- Messages
- Feedback forms

## Best Practices
- Always provide a label
- Use character counter for limits
- Set appropriate rows for context
- Provide helpful placeholder text

## Accessibility
- Label is required
- Error messages are announced
- Resize handle for user control
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    return (
      <Field>
        <Label>{t('platform.common.description')}</Label>
        <Textarea placeholder="Eksempel Tekst" />
      </Field>
    );
  },
};

export const WithDescription: Story = {
  render: function Render() {
    return (
      <Field>
        <Label>"Eksempel Tekst"</Label>
        <Field.Description>"Eksempel Tekst"</Field.Description>
        <Textarea placeholder="Eksempel Tekst" />
      </Field>
    );
  },
};

export const WithCharacterCount: Story = {
  render: function Render() {
    return (
      <Field>
        <Label>"Eksempel Tekst"</Label>
        <Field.Description>"Eksempel Tekst"</Field.Description>
        <Textarea placeholder="Eksempel Tekst" maxLength={200} />
        <Field.Counter limit={200} />
      </Field>
    );
  },
};

export const WithError: Story = {
  render: function Render() {
    return (
      <Field>
        <Label>"Eksempel Tekst"</Label>
        <Textarea placeholder="Eksempel Tekst" aria-invalid="true" />
        <ValidationMessage>"Eksempel Tekst"</ValidationMessage>
      </Field>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    return (
      <Field>
        <Label>"Eksempel Tekst"</Label>
        <Textarea defaultValue="Eksempel Tekst" disabled />
      </Field>
    );
  },
};

export const ReadOnly: Story = {
  render: function Render() {
    return (
      <Field>
        <Label>"Eksempel Tekst"</Label>
        <Textarea defaultValue="Eksempel Tekst" readOnly />
      </Field>
    );
  },
};

export const Rows: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Field>
          <Label>"Eksempel Tekst"</Label>
          <Textarea rows={3} placeholder="Eksempel Tekst" />
        </Field>
        <Field>
          <Label>"Eksempel Tekst"</Label>
          <Textarea rows={5} placeholder="Eksempel Tekst" />
        </Field>
        <Field>
          <Label>"Eksempel Tekst"</Label>
          <Textarea rows={8} placeholder="Eksempel Tekst" />
        </Field>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            "Eksempel Tekst"
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <Field>
              <Label>"Eksempel Tekst"</Label>
              <Textarea placeholder="Eksempel Tekst" />
            </Field>
            <Field>
              <Label>"Eksempel Tekst"</Label>
              <Textarea defaultValue="Eksempel Tekst" />
            </Field>
            <Field>
              <Label>"Eksempel Tekst"</Label>
              <Textarea disabled defaultValue="Eksempel Tekst" />
            </Field>
            <Field>
              <Label>"Eksempel Tekst"</Label>
              <Textarea readOnly defaultValue="Eksempel Tekst" />
            </Field>
          </div>
        </div>
      </div>
    );
  },
};

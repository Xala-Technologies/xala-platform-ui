import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Textarea, Label, Field, ValidationMessage } from '@xala-technologies/platform/ui';

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
  render: () => (
    <Field>
      <Label>Description</Label>
      <Textarea placeholder="Enter a description..." />
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field>
      <Label>Additional notes</Label>
      <Field.Description>Include any special requirements or requests</Field.Description>
      <Textarea placeholder="Enter notes..." />
    </Field>
  ),
};

export const WithCharacterCount: Story = {
  render: () => (
    <Field>
      <Label>Bio</Label>
      <Field.Description>Tell us about yourself</Field.Description>
      <Textarea 
        placeholder="Write a short bio..."
        maxLength={200}
      />
      <Field.Counter limit={200} />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field>
      <Label>Message</Label>
      <Textarea 
        placeholder="Enter your message..."
        aria-invalid="true"
      />
      <ValidationMessage>Message is required</ValidationMessage>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field>
      <Label>Locked content</Label>
      <Textarea 
        defaultValue="This content cannot be edited"
        disabled
      />
    </Field>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <Field>
      <Label>Terms and conditions</Label>
      <Textarea 
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        readOnly
      />
    </Field>
  ),
};

export const Rows: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Field>
        <Label>Small (3 rows)</Label>
        <Textarea rows={3} placeholder="3 rows..." />
      </Field>
      <Field>
        <Label>Medium (5 rows)</Label>
        <Textarea rows={5} placeholder="5 rows..." />
      </Field>
      <Field>
        <Label>Large (8 rows)</Label>
        <Textarea rows={8} placeholder="8 rows..." />
      </Field>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Field>
            <Label>Default</Label>
            <Textarea placeholder="Enter text..." />
          </Field>
          <Field>
            <Label>With value</Label>
            <Textarea defaultValue="Some existing content" />
          </Field>
          <Field>
            <Label>Disabled</Label>
            <Textarea disabled defaultValue="Cannot edit" />
          </Field>
          <Field>
            <Label>Read-only</Label>
            <Textarea readOnly defaultValue="Read-only content" />
          </Field>
        </div>
      </div>
    </div>
  ),
};

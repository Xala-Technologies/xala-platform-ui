import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Radio, Fieldset, ValidationMessage, Heading } from '../../index';

/**
 * Radio component from Digdir Designsystemet.
 *
 * Radio allows users to select one option from a list.
 *
 * @see https://designsystemet.no/en/components/docs/radio/overview
 */
const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    docs: {
      description: {
        component: `
A Radio is an option the user can select. Use multiple Radio to show a list of options. Users can switch between the options, but can only select one.

## Variants

- **Vertical group** - Default stacked layout (recommended)
- **Horizontal group** - Side-by-side layout for 2-3 short options
- **With descriptions** - Additional context for each option
- **With error** - Validation errors on fieldset
- **Disabled** - Unavailable options
- **Read-only** - Non-editable but visible

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- User must select exactly one option from a list
- Options are mutually exclusive
- Small number of options (2-7 options)
- All options should be visible at once
- Use Select component for 8+ options
- Use Checkbox for multiple selections

## Best Practices

### Do
- Always use Fieldset with Legend to group related radios
- Use Legend to ask the question or describe the choice
- Sort options logically (alphabetically, by frequency, or importance)
- Use descriptions to clarify complex options
- Place vertically for easier scanning and accessibility
- Provide clear, concise labels for each option
- Make the entire label clickable for larger hit area

### Don't
- Don't use for multiple selections (use Checkbox instead)
- Don't use horizontal layout for more than 3 options
- Don't make labels too long (keep under 60 characters)
- Avoid pre-selecting options unless there's a clear default
- Don't use radio buttons for binary choices (use Switch instead)
- Don't disable without providing explanation

## Usage Patterns

### Basic Radio Group
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select time slot</Fieldset.Legend>
  <Radio label="Morning (08:00 - 12:00)" name="time" value="morning" />
  <Radio label="Afternoon (12:00 - 16:00)" name="time" value="afternoon" />
  <Radio label="Evening (16:00 - 20:00)" name="time" value="evening" />
</Fieldset>
\`\`\`

### With Descriptions
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select plan</Fieldset.Legend>
  <Radio
    label="Basic"
    name="plan"
    value="basic"
    description="Up to 5 bookings per month"
  />
  <Radio
    label="Pro"
    name="plan"
    value="pro"
    description="Unlimited bookings, priority support"
  />
</Fieldset>
\`\`\`

### With Error Validation
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select a category</Fieldset.Legend>
  <Radio label="Option 1" name="category" value="opt1" aria-invalid="true" />
  <Radio label="Option 2" name="category" value="opt2" aria-invalid="true" />
  <ValidationMessage>Please select a category</ValidationMessage>
</Fieldset>
\`\`\`

### Horizontal Layout (2-3 options only)
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Payment method</Fieldset.Legend>
  <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)' }}>
    <Radio label="Card" name="payment" value="card" />
    <Radio label="Invoice" name="payment" value="invoice" />
  </div>
</Fieldset>
\`\`\`

## Anti-Patterns

### Anti-pattern: Using Radio for Multiple Selections
If users can select more than one option, use Checkbox instead.

### Anti-pattern: Too Many Options Horizontally
Horizontal layout with 4+ options is hard to scan and not mobile-friendly.

### Anti-pattern: No Fieldset/Legend
Radio groups without Fieldset and Legend lack context for screen readers.

### Anti-pattern: Unclear Labels
Labels like "Option 1", "Choice A" don't provide meaningful information.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus into the radio group
- **Arrow keys** (Up/Down/Left/Right) navigate between radio options
- **Space** selects the focused radio option
- **Shift+Tab** moves focus out of the group

### Screen Readers
- Radio role is announced
- Label is read when focused
- Selected/unselected state is announced
- Fieldset Legend provides group context
- Description text provides additional information
- Total number of options in group is announced

### WCAG 2.1 AA Compliance
- **Label**: Every radio must have a visible label
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for radio border
- **Focus visible**: Clear focus indicator (2px outline)
- **Touch target**: Minimum 44x44px including label
- **Name, Role, Value**: Proper semantic HTML and ARIA
- **Group labels**: Use Fieldset and Legend for related radios
- **Keyboard navigation**: Arrow keys must navigate within group

### Required Radio Groups
For required selections:
\`\`\`tsx
<Fieldset required>
  <Fieldset.Legend>Select shipping method (required)</Fieldset.Legend>
  <Radio label="Standard" name="shipping" value="standard" required />
  <Radio label="Express" name="shipping" value="express" required />
</Fieldset>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'data-size': {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the radio',
    },
    name: {
      control: 'text',
      description: 'Name attribute for radio group (required)',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    return (
      <Fieldset>
        <Fieldset.Legend>"Eksempel Tekst"</Fieldset.Legend>
        <Radio label="Eksempel Tekst" name="time" value="morning" />
        <Radio label="Eksempel Tekst" name="time" value="afternoon" />
        <Radio label="Eksempel Tekst" name="time" value="evening" />
      </Fieldset>
    );
  },
};

export const WithDescription: Story = {
  render: function Render() {
    return (
      <Fieldset>
        <Fieldset.Legend>"Eksempel Tekst"</Fieldset.Legend>
        <Radio
          label="Eksempel Tekst"
          name="plan"
          value="basic"
          description="Eksempel Tekst"
        />
        <Radio
          label="Eksempel Tekst"
          name="plan"
          value="pro"
          description="Eksempel Tekst"
        />
        <Radio
          label="Eksempel Tekst"
          name="plan"
          value="enterprise"
          description="Eksempel Tekst"
        />
      </Fieldset>
    );
  },
};

export const Horizontal: Story = {
  render: function Render() {
    return (
      <Fieldset>
        <Fieldset.Legend>"Eksempel Tekst"</Fieldset.Legend>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)' }}>
          <Radio label="Eksempel Tekst" name="payment" value="card" />
          <Radio label="Eksempel Tekst" name="payment" value="invoice" />
          <Radio label="Eksempel Tekst" name="payment" value="vipps" />
        </div>
      </Fieldset>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    return (
      <Fieldset>
        <Fieldset.Legend>{t('platform.common.status')}</Fieldset.Legend>
        <Radio label={t('platform.status.active')} name="status" value="active" defaultChecked />
        <Radio
          label="Eksempel Tekst"
          name="status"
          value="inactive"
          disabled
        />
      </Fieldset>
    );
  },
};

export const WithError: Story = {
  render: function Render() {
    return (
      <Fieldset>
        <Fieldset.Legend>"Eksempel Tekst"</Fieldset.Legend>
        <Radio
          label="Eksempel Tekst"
          name="category"
          value="lokaler"
          aria-invalid="true"
        />
        <Radio
          label="Eksempel Tekst"
          name="category"
          value="utstyr"
          aria-invalid="true"
        />
        <ValidationMessage>"Eksempel Tekst"</ValidationMessage>
      </Fieldset>
    );
  },
};

/**
 * Interactive radio group with state
 */
export const InteractiveGroup: Story = {
  render: function Render() {
    const [selected, setSelected] = useState('email');

    return (
      <Fieldset>
        <Fieldset.Legend>"Eksempel Tekst"</Fieldset.Legend>
        <Fieldset.Description>"Eksempel Tekst"</Fieldset.Description>
        <Radio
          label={t('platform.auth.email')}
          description="Eksempel Tekst"
          value="email"
          name="contact"
          checked={selected === 'email'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Eksempel Tekst"
          description="Eksempel Tekst"
          value="sms"
          name="contact"
          checked={selected === 'sms'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <Radio
          label="Eksempel Tekst"
          description="Eksempel Tekst"
          value="letter"
          name="contact"
          checked={selected === 'letter'}
          onChange={(e) => setSelected(e.target.value)}
        />
        <div
          style={{
            marginTop: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <strong>{t('platform.common.selected')}:</strong> {selected}
        </div>
      </Fieldset>
    );
  },
};

/**
 * Size variants
 */
export const Sizes: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Radio label="Eksempel Tekst" name="size-demo" value="sm" data-size="sm" />
        <Radio label="Eksempel Tekst" name="size-demo" value="md" data-size="md" />
        <Radio label="Eksempel Tekst" name="size-demo" value="lg" data-size="lg" />
      </div>
    );
  },
};

/**
 * All variants overview
 */
export const AllVariants: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            "Eksempel Tekst"
          </Heading>
          <Fieldset>
            <Fieldset.Legend>"Eksempel Tekst"</Fieldset.Legend>
            <Radio label="Eksempel Tekst" name="time1" value="morning" />
            <Radio label="Eksempel Tekst" name="time1" value="afternoon" />
            <Radio label="Eksempel Tekst" name="time1" value="evening" />
          </Fieldset>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            "Eksempel Tekst"
          </Heading>
          <Fieldset>
            <Fieldset.Legend>"Eksempel Tekst"</Fieldset.Legend>
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)' }}>
              <Radio label="Eksempel Tekst" name="payment1" value="card" />
              <Radio label="Eksempel Tekst" name="payment1" value="invoice" />
              <Radio label="Eksempel Tekst" name="payment1" value="vipps" />
            </div>
          </Fieldset>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            "Eksempel Tekst"
          </Heading>
          <Fieldset>
            <Fieldset.Legend>"Eksempel Tekst"</Fieldset.Legend>
            <Radio
              label="Eksempel Tekst"
              description="Eksempel Tekst"
              name="plan1"
              value="basic"
            />
            <Radio
              label="Eksempel Tekst"
              description="Eksempel Tekst"
              name="plan1"
              value="pro"
            />
          </Fieldset>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            "Eksempel Tekst"
          </Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <Radio label="Eksempel Tekst" name="states" value="default" />
            <Radio
              label={t('platform.common.selected')}
              name="states"
              value="selected"
              defaultChecked
            />
            <Radio label="Eksempel Tekst" name="states" value="disabled" disabled />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            "Eksempel Tekst"
          </Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <Radio label="Eksempel Tekst" name="sizes" value="sm" data-size="sm" />
            <Radio label="Eksempel Tekst" name="sizes" value="md" data-size="md" />
            <Radio label="Eksempel Tekst" name="sizes" value="lg" data-size="lg" />
          </div>
        </div>
      </div>
    );
  },
};

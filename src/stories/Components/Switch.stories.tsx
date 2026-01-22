import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Switch, Fieldset, Heading } from '@xala-technologies/platform/ui';

/**
 * Switch component from Digdir Designsystemet.
 * 
 * Switch gives users a choice between two alternatives (on/off).
 * 
 * @see https://designsystemet.no/en/components/docs/switch/overview
 */
const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    docs: {
      description: {
        component: `
Switch gives users a choice between two alternatives. The switch can either be turned off or on and must always be set with a default choice.

## Variants

- **Default** - Standard switch (off by default)
- **Checked** - Switch in on state
- **With description** - Additional context below label
- **Grouped** - Multiple switches in fieldset
- **Disabled** - Not interactive
- **Read-only** - Visible but not editable

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Binary settings (on/off, enabled/disabled, yes/no)
- Immediate effect settings that take effect instantly
- Preferences that don't require form submission
- Toggle features or functionality on/off
- Use Checkbox for selections that require form submission
- Use Radio for mutually exclusive options

## Best Practices

### Do
- Always set a default state (checked or unchecked)
- Use for immediate actions that take effect instantly
- Provide clear, descriptive labels
- Use descriptions for complex or unclear settings
- Group related switches with Fieldset and Legend
- Make labels clickable for larger hit area
- Use positive language ("Enable notifications" not "Disable notifications")

### Don't
- Don't use for form submissions (use Checkbox instead)
- Don't use for mutually exclusive options (use Radio instead)
- Don't change state without user action
- Don't use ambiguous labels
- Don't disable without explanation
- Don't use for destructive actions without confirmation

## Usage Patterns

### Basic Switch
\`\`\`tsx
<Switch label="Enable notifications" />
\`\`\`

### With Description
\`\`\`tsx
<Switch 
  label="Dark mode"
  description="Switch between light and dark theme"
/>
\`\`\`

### Checked by Default
\`\`\`tsx
<Switch 
  label="Email notifications" 
  defaultChecked 
/>
\`\`\`

### Grouped Switches
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Notification preferences</Fieldset.Legend>
  <Switch label="Email notifications" defaultChecked />
  <Switch label="SMS notifications" />
  <Switch label="Push notifications" defaultChecked />
</Fieldset>
\`\`\`

### Controlled Switch
\`\`\`tsx
const [enabled, setEnabled] = useState(false);

<Switch 
  label="Feature enabled"
  checked={enabled}
  onChange={(e) => setEnabled(e.target.checked)}
/>
\`\`\`

## Anti-Patterns

### Anti-pattern: Using Switch for Form Submission
Switches are for immediate effects. Use Checkbox for form submissions.

### Anti-pattern: Negative Labels
Labels like "Disable notifications" are confusing. Use positive language.

### Anti-pattern: No Default State
Switches must always have a default state. Never leave them indeterminate.

### Anti-pattern: Destructive Actions Without Confirmation
Don't use switches for destructive actions like "Delete account" without confirmation.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to the switch
- **Space** toggles the switch state
- **Shift+Tab** moves focus to previous element
- Focus indicator must be visible

### Screen Readers
- Switch role is announced
- Label is read when focused
- State is announced (on/off, checked/unchecked)
- Description text provides additional context
- State changes are announced immediately

### WCAG 2.1 AA Compliance
- **Label**: Every switch must have a visible label
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for switch border
- **Focus visible**: Clear focus indicator (2px outline)
- **Touch target**: Minimum 44x44px including label
- **Name, Role, Value**: Proper semantic HTML and ARIA
- **State indication**: Visual state must not rely on color alone
- **Keyboard accessible**: Full keyboard control

### Required Switches
For required settings:
\`\`\`tsx
<Switch 
  label="Accept terms and conditions"
  required
  aria-required="true"
/>
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
      description: 'Disables the switch',
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes switch read-only',
    },
    checked: {
      control: 'boolean',
      description: 'Controlled checked state',
    },
    defaultChecked: {
      control: 'boolean',
      description: 'Default checked state (uncontrolled)',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Switch label="Enable notifications" />
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Switch 
      label="Dark mode"
      description="Switch between light and dark theme"
    />
  ),
};

export const Checked: Story = {
  render: () => (
    <Switch label="Email notifications" defaultChecked />
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Switch label="Disabled off" disabled />
      <Switch label="Disabled on" disabled defaultChecked />
    </div>
  ),
};

export const ReadOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Switch label="Read-only off" readOnly />
      <Switch label="Read-only on" readOnly defaultChecked />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Switch label="Small switch" data-size="sm" />
      <Switch label="Medium switch" data-size="md" />
      <Switch label="Large switch" data-size="lg" />
    </div>
  ),
};

export const SwitchGroup: Story = {
  render: () => (
    <Fieldset>
      <Fieldset.Legend>Turn lights on/off</Fieldset.Legend>
      <Switch label="Living room" defaultChecked />
      <Switch label="Kitchen" />
      <Switch label="Bathroom" />
      <Switch label="Bedroom" description="Unable to connect to the light bulbs" readOnly />
    </Fieldset>
  ),
};

/**
 * Interactive switch with state
 */
export const Interactive: Story = {
  render: function Render() {
    const [notifications, setNotifications] = useState({
      email: true,
      sms: false,
      push: true,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Fieldset>
          <Fieldset.Legend>Notification preferences</Fieldset.Legend>
          <Switch 
            label="Email notifications" 
            checked={notifications.email}
            onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
          />
          <Switch 
            label="SMS notifications" 
            checked={notifications.sms}
            onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
          />
          <Switch 
            label="Push notifications" 
            checked={notifications.push}
            onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
          />
        </Fieldset>
        <div style={{ padding: 'var(--ds-spacing-3)', backgroundColor: 'var(--ds-color-neutral-surface-default)', borderRadius: 'var(--ds-border-radius-md)' }}>
          <strong>Active notifications:</strong> {Object.entries(notifications).filter(([, v]) => v).map(([k]) => k).join(', ') || 'None'}
        </div>
      </div>
    );
  },
};

/**
 * All variants overview
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>States</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Switch label="Default (off)" />
          <Switch label="Checked (on)" defaultChecked />
          <Switch label="With description" description="Additional context for this setting" />
          <Switch label="Disabled off" disabled />
          <Switch label="Disabled on" disabled defaultChecked />
          <Switch label="Read-only off" readOnly />
          <Switch label="Read-only on" readOnly defaultChecked />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>Sizes</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Switch label="Small" data-size="sm" />
          <Switch label="Medium" data-size="md" />
          <Switch label="Large" data-size="lg" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>Grouped</Heading>
        <Fieldset>
          <Fieldset.Legend>Settings</Fieldset.Legend>
          <Switch label="Option 1" defaultChecked />
          <Switch label="Option 2" />
          <Switch label="Option 3" defaultChecked />
        </Fieldset>
      </div>
    </div>
  ),
};

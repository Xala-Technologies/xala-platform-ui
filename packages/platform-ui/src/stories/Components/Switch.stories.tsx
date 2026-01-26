import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { Switch, Fieldset, Heading } from '../../index';

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
  render: function Render() {
    const t = useT();
    return <Switch label={t('storybook.demo.enableNotifications')} />;
  },
};

export const WithDescription: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Switch
        label={t('storybook.demo.darkMode')}
        description={t('storybook.demo.darkModeDescription')}
      />
    );
  },
};

export const Checked: Story = {
  render: function Render() {
    const t = useT();
    return <Switch label={t('storybook.demo.emailNotifications')} defaultChecked />;
  },
};

export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Switch label={t('storybook.demo.disabledOff')} disabled />
        <Switch label={t('storybook.demo.disabledOn')} disabled defaultChecked />
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Switch label={t('storybook.demo.readOnlyOff')} readOnly />
        <Switch label={t('storybook.demo.readOnlyOn')} readOnly defaultChecked />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Switch label={t('storybook.demo.smallSwitch')} data-size="sm" />
        <Switch label={t('storybook.demo.mediumSwitch')} data-size="md" />
        <Switch label={t('storybook.demo.largeSwitch')} data-size="lg" />
      </div>
    );
  },
};

export const SwitchGroup: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.turnLightsOnOff')}</Fieldset.Legend>
        <Switch label={t('storybook.demo.livingRoom')} defaultChecked />
        <Switch label={t('storybook.demo.kitchen')} />
        <Switch label={t('storybook.demo.bathroom')} />
        <Switch
          label={t('storybook.demo.bedroom')}
          description={t('storybook.demo.unableToConnectToLightBulbs')}
          readOnly
        />
      </Fieldset>
    );
  },
};

/**
 * Interactive switch with state
 */
export const Interactive: Story = {
  render: function Render() {
    const t = useT();
    const [notifications, setNotifications] = useState({
      email: true,
      sms: false,
      push: true,
    });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Fieldset>
          <Fieldset.Legend>{t('storybook.demo.notificationPreferences')}</Fieldset.Legend>
          <Switch
            label={t('storybook.demo.emailNotifications')}
            checked={notifications.email}
            onChange={(e) => setNotifications({ ...notifications, email: e.target.checked })}
          />
          <Switch
            label={t('storybook.demo.smsNotifications')}
            checked={notifications.sms}
            onChange={(e) => setNotifications({ ...notifications, sms: e.target.checked })}
          />
          <Switch
            label={t('storybook.demo.pushNotifications')}
            checked={notifications.push}
            onChange={(e) => setNotifications({ ...notifications, push: e.target.checked })}
          />
        </Fieldset>
        <div
          style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <strong>{t('storybook.demo.activeNotifications')}:</strong>{' '}
          {Object.entries(notifications)
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ') || t('platform.common.none')}
        </div>
      </div>
    );
  },
};

/**
 * All variants overview
 */
export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.states')}
          </Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <Switch label={t('storybook.demo.defaultOff')} />
            <Switch label={t('storybook.demo.checkedOn')} defaultChecked />
            <Switch
              label={t('storybook.demo.withDescription')}
              description={t('storybook.demo.additionalContextForSetting')}
            />
            <Switch label={t('storybook.demo.disabledOff')} disabled />
            <Switch label={t('storybook.demo.disabledOn')} disabled defaultChecked />
            <Switch label={t('storybook.demo.readOnlyOff')} readOnly />
            <Switch label={t('storybook.demo.readOnlyOn')} readOnly defaultChecked />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.sizes')}
          </Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <Switch label={t('storybook.demo.small')} data-size="sm" />
            <Switch label={t('storybook.demo.medium')} data-size="md" />
            <Switch label={t('storybook.demo.large')} data-size="lg" />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.grouped')}
          </Heading>
          <Fieldset>
            <Fieldset.Legend>{t('platform.nav.settings')}</Fieldset.Legend>
            <Switch label={t('storybook.demo.option') + ' 1'} defaultChecked />
            <Switch label={t('storybook.demo.option') + ' 2'} />
            <Switch label={t('storybook.demo.option') + ' 3'} defaultChecked />
          </Fieldset>
        </div>
      </div>
    );
  },
};

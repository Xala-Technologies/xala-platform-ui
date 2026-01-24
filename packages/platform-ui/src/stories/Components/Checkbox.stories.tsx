import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useEffect } from 'react';
import { useT } from '@xala-technologies/i18n';
import { Checkbox, Fieldset, ValidationMessage, Heading } from '../../index';

/**
 * Checkbox component from Digdir Designsystemet.
 *
 * Checkbox allows users to select one or more options.
 *
 * @see https://designsystemet.no/en/components/docs/checkbox/overview
 */
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    docs: {
      description: {
        component: `
Checkbox allows users to select one or more options. It can also be used in situations where the user needs to confirm something.

## Variants

- **Single confirmation** - Standalone checkbox for consent/confirmation
- **Grouped** - Multiple checkboxes in a fieldset
- **With description** - Additional context for each option
- **With error** - Validation errors on fieldset
- **Indeterminate** - Partially selected state (parent checkbox)
- **Read-only** - Non-editable but visible
- **Disabled** - Not interactive

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Multiple options can be selected simultaneously
- Toggle a single option on/off
- Accepting terms and conditions
- Confirming user is over age limit
- Selecting preferences or features
- Filtering content with multiple criteria

## Best Practices

### Do
- Use Fieldset with Legend for groups of checkboxes
- Sort options logically (alphabetically, by frequency, or importance)
- Provide clear, concise labels
- Use descriptions for additional context when needed
- Place error messages on Fieldset for groups
- Make labels clickable for larger hit area
- Use indeterminate state for parent checkboxes when some children are selected

### Don't
- **Never preselect consent checkboxes** (GDPR requirement)
- Don't use for mutually exclusive options (use Radio instead)
- Don't use read-only unless absolutely necessary (confusing UX)
- Don't use too many checkboxes (consider alternative UI)
- Don't make labels too long (keep under 60 characters)
- Don't disable without explanation

## Usage Patterns

### Single Confirmation
\`\`\`tsx
<Checkbox
  label="I accept the terms and conditions"
  value="accept"
  required
/>
\`\`\`

### Grouped Checkboxes
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Select amenities</Fieldset.Legend>
  <Checkbox label="WiFi" value="wifi" />
  <Checkbox label="Parking" value="parking" />
  <Checkbox label="Kitchen" value="kitchen" />
</Fieldset>
\`\`\`

### With Error Validation
\`\`\`tsx
<Fieldset>
  <Fieldset.Legend>Required selections</Fieldset.Legend>
  <Checkbox label="Option 1" value="opt1" />
  <Checkbox label="Option 2" value="opt2" />
  <ValidationMessage>Please select at least one option</ValidationMessage>
</Fieldset>
\`\`\`

### Indeterminate State
\`\`\`tsx
<Checkbox
  label="Select all"
  indeterminate={someSelected && !allSelected}
  checked={allSelected}
/>
\`\`\`

## Anti-Patterns

### Anti-pattern: Preselected Consent
Never preselect checkboxes for consent, subscriptions, or data sharing. This violates GDPR and user trust.

### Anti-pattern: Using Checkbox for Single Choice
If only one option can be selected, use Radio buttons instead.

### Anti-pattern: Too Many Options
More than 10 checkboxes becomes overwhelming. Consider categorization or alternative UI.

### Anti-pattern: Unclear Labels
Labels like "Yes" or "Option 1" don't provide context. Be specific.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to next checkbox
- **Shift+Tab** moves focus to previous checkbox
- **Space** toggles checkbox state
- Arrow keys do NOT navigate between checkboxes (unlike Radio)

### Screen Readers
- Checkbox role is announced
- Label is read when focused
- Checked/unchecked state is announced
- Indeterminate state is announced as "mixed"
- Fieldset Legend provides group context
- Description text provides additional information

### WCAG 2.1 AA Compliance
- **Label**: Every checkbox must have a visible label
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for checkbox border
- **Focus visible**: Clear focus indicator (2px outline)
- **Touch target**: Minimum 44x44px including label
- **Name, Role, Value**: Proper semantic HTML and ARIA
- **Group labels**: Use Fieldset and Legend for related checkboxes

### Required Checkboxes
For consent or required selections:
\`\`\`tsx
<Checkbox
  label="I accept the terms and conditions"
  value="accept"
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
      description: 'Disables the checkbox',
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes checkbox read-only',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    const t = useT();
    return <Checkbox label={t('storybook.demo.acceptTermsAndConditions')} value="accept" />;
  },
};

export const WithDescription: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Checkbox
        label={t('storybook.demo.subscribeToNewsletter')}
        value="newsletter"
        description={t('storybook.demo.unsubscribeAnytime')}
      />
    );
  },
};

export const CheckboxGroup: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.selectAmenities')}</Fieldset.Legend>
        <Checkbox label={t('storybook.demo.wifi')} value="wifi" />
        <Checkbox label={t('storybook.demo.parking')} value="parking" />
        <Checkbox label={t('storybook.demo.kitchen')} value="kitchen" />
        <Checkbox label={t('storybook.demo.projector')} value="projector" />
      </Fieldset>
    );
  },
};

export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        <Checkbox label={t('storybook.demo.disabledUnchecked')} value="disabled1" disabled />
        <Checkbox
          label={t('storybook.demo.disabledChecked')}
          value="disabled2"
          disabled
          defaultChecked
        />
      </div>
    );
  },
};

export const WithError: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.acceptTerms')}</Fieldset.Legend>
        <Checkbox label={t('storybook.demo.iAcceptTheTerms')} value="terms" aria-invalid="true" />
        <ValidationMessage>{t('storybook.demo.mustAcceptTermsToContinue')}</ValidationMessage>
      </Fieldset>
    );
  },
};

/**
 * Single confirmation checkbox - For consent or age verification
 */
export const SingleConfirmation: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.confirmOver18')}</Fieldset.Legend>
        <Fieldset.Description>{t('storybook.demo.legalAgeRequirement')}</Fieldset.Description>
        <Checkbox label={t('storybook.demo.iConfirmOver18')} value="consent" />
      </Fieldset>
    );
  },
};

/**
 * Interactive checkbox group with state management
 */
export const InteractiveGroup: Story = {
  render: function Render() {
    const t = useT();
    const [selected, setSelected] = useState<string[]>(['email']);

    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter((v) => v !== value));
      }
    };

    return (
      <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.preferredContactMethod')}</Fieldset.Legend>
        <Fieldset.Description>{t('storybook.demo.selectAllRelevantOptions')}</Fieldset.Description>
        <Checkbox
          label={t('storybook.demo.email')}
          value="email"
          checked={selected.includes('email')}
          onChange={(e) => handleChange('email', e.target.checked)}
        />
        <Checkbox
          label={t('storybook.demo.phone')}
          value="phone"
          checked={selected.includes('phone')}
          onChange={(e) => handleChange('phone', e.target.checked)}
        />
        <Checkbox
          label={t('storybook.demo.sms')}
          value="sms"
          checked={selected.includes('sms')}
          onChange={(e) => handleChange('sms', e.target.checked)}
        />
        <div
          style={{
            marginTop: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <strong>{t('storybook.demo.selected')}:</strong>{' '}
          {selected.length > 0 ? selected.join(', ') : t('storybook.demo.none')}
        </div>
      </Fieldset>
    );
  },
};

/**
 * Checkbox group with validation
 */
export const WithValidation: Story = {
  render: function Render() {
    const t = useT();
    const [selected, setSelected] = useState<string[]>(['email']);
    const [error, setError] = useState('');

    useEffect(() => {
      if (selected.length < 2) {
        setError(t('storybook.demo.selectAtLeastTwo'));
      } else {
        setError('');
      }
    }, [selected, t]);

    const handleChange = (value: string, checked: boolean) => {
      if (checked) {
        setSelected([...selected, value]);
      } else {
        setSelected(selected.filter((v) => v !== value));
      }
    };

    return (
      <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.preferredContactMethod')}</Fieldset.Legend>
        <Fieldset.Description>{t('storybook.demo.selectAllRelevantOptions')}</Fieldset.Description>
        <Checkbox
          label={t('storybook.demo.email')}
          value="email"
          checked={selected.includes('email')}
          onChange={(e) => handleChange('email', e.target.checked)}
          aria-invalid={!!error}
        />
        <Checkbox
          label={t('storybook.demo.phone')}
          value="phone"
          checked={selected.includes('phone')}
          onChange={(e) => handleChange('phone', e.target.checked)}
          aria-invalid={!!error}
        />
        <Checkbox
          label={t('storybook.demo.sms')}
          value="sms"
          checked={selected.includes('sms')}
          onChange={(e) => handleChange('sms', e.target.checked)}
          aria-invalid={!!error}
        />
        {error && <ValidationMessage>{error}</ValidationMessage>}
      </Fieldset>
    );
  },
};

/**
 * Read-only checkboxes - Avoid when possible
 */
export const ReadOnly: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Fieldset>
        <Fieldset.Legend>{t('storybook.demo.yourSelectedPreferences')}</Fieldset.Legend>
        <Fieldset.Description>
          {t('storybook.demo.preferencesSetByOrganization')}
        </Fieldset.Description>
        <Checkbox label={t('storybook.demo.emailNotifications')} value="email" checked readOnly />
        <Checkbox label={t('storybook.demo.phoneNotifications')} value="phone" readOnly />
        <Checkbox label={t('storybook.demo.smsNotifications')} value="sms" checked readOnly />
      </Fieldset>
    );
  },
};

/**
 * Size variants
 */
export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Checkbox label={t('storybook.demo.smallCheckbox')} value="sm" data-size="sm" />
        <Checkbox label={t('storybook.demo.mediumCheckbox')} value="md" data-size="md" />
        <Checkbox label={t('storybook.demo.largeCheckbox')} value="lg" data-size="lg" />
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
            <Checkbox label={t('storybook.story.default')} value="default" />
            <Checkbox label={t('storybook.demo.checked')} value="checked" defaultChecked />
            <Checkbox label={t('storybook.demo.disabledUnchecked')} value="disabled1" disabled />
            <Checkbox
              label={t('storybook.demo.disabledChecked')}
              value="disabled2"
              disabled
              defaultChecked
            />
            <Checkbox
              label={t('storybook.demo.readOnlyChecked')}
              value="readonly"
              checked
              readOnly
            />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.sizes')}
          </Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <Checkbox label={t('storybook.story.small')} value="sm" data-size="sm" />
            <Checkbox label={t('storybook.story.medium')} value="md" data-size="md" />
            <Checkbox label={t('storybook.story.large')} value="lg" data-size="lg" />
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.withDescription')}
          </Heading>
          <Checkbox
            label={t('storybook.demo.subscribeToNewsletter')}
            value="newsletter"
            description={t('storybook.demo.unsubscribeAnytime')}
          />
        </div>
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Button, Textfield, Checkbox, Heading, Paragraph, Card } from '../../index';
import { useState } from 'react';

const meta: Meta = {
  title: 'Fundamentals/Accessibility',
  parameters: {
    docs: {
      description: {
        component: `
# Accessibility (WCAG 2.1 AA)

All components are built to meet WCAG 2.1 Level AA standards.

## Key Principles
- **Perceivable**: Content is available to all senses
- **Operable**: Interface is keyboard accessible
- **Understandable**: Content and operation are clear
- **Robust**: Works with assistive technologies

## Best Practices
- Use semantic HTML
- Provide text alternatives
- Ensure keyboard navigation
- Maintain color contrast
- Support screen readers

## Reference
[WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Example 1: Keyboard Navigation
 *
 * All interactive elements must be keyboard accessible
 */
export const KeyboardNavigation: Story = {
  render: function Render() {
    const t = useT();

    return (
      <Card style={{ padding: 'var(--ds-spacing-6)', maxWidth: '600px' }}>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          "Eksempel Tekst"
        </Heading>
        <Paragraph
          style={{
            marginBottom: 'var(--ds-spacing-6)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          "Eksempel Tekst"
        </Paragraph>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Button data-variant="primary" tabIndex={0}>
            "Eksempel Tekst"
          </Button>
          <Button data-variant="secondary" tabIndex={0}>
            "Eksempel Tekst"
          </Button>
          <Textfield
            label="Eksempel Tekst"
            placeholder="Eksempel Tekst"
            tabIndex={0}
          />
          <Checkbox tabIndex={0}>"Eksempel Tekst"</Checkbox>
          <a
            href="#"
            style={{
              color: 'var(--ds-color-accent-text-default)',
              textDecoration: 'underline',
            }}
            tabIndex={0}
          >
            "Eksempel Tekst"
          </a>
        </div>

        <div
          style={{
            marginTop: 'var(--ds-spacing-6)',
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-info-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-info-text-default)' }}>
            <strong>"Eksempel Tekst":</strong> "Eksempel Tekst"
          </Paragraph>
        </div>
      </Card>
    );
  },
};

/**
 * Example 2: ARIA Labels
 *
 * Proper labeling for screen readers
 */
export const ARIALabels: Story = {
  render: function Render() {
    const t = useT();

    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        {/* Bad Example */}
        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            "Eksempel Tekst"
          </Heading>
          <button type="button" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            ✓
          </button>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            "Eksempel Tekst"
          </Paragraph>
        </Card>

        {/* Good Example */}
        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-success-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            "Eksempel Tekst"
          </Heading>
          <button
            type="button"
            aria-label="Eksempel Tekst"
            style={{ marginBottom: 'var(--ds-spacing-2)' }}
          >
            ✓
          </button>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            "Eksempel Tekst"
          </Paragraph>
        </Card>
      </div>
    );
  },
};

/**
 * Example 3: Color Contrast
 *
 * Minimum contrast ratio of 4.5:1 for normal text
 */
export const ColorContrast: Story = {
  render: function Render() {
    const t = useT();

    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        {/* Bad Example */}
        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            "Eksempel Tekst"
          </Heading>
          <div
            style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: '#E0E0E0',
              color: '#C0C0C0',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            "Eksempel Tekst"
          </div>
        </Card>

        {/* Good Example */}
        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-success-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            "Eksempel Tekst"
          </Heading>
          <div
            style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              color: 'var(--ds-color-neutral-text-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            "Eksempel Tekst"
          </div>
        </Card>
      </div>
    );
  },
};

/**
 * Example 4: Focus Indicators
 *
 * Visible focus states for keyboard navigation
 */
export const FocusIndicators: Story = {
  render: function Render() {
    const t = useT();

    return (
      <Card style={{ padding: 'var(--ds-spacing-6)', maxWidth: '600px' }}>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          "Eksempel Tekst"
        </Heading>
        <Paragraph
          style={{
            marginBottom: 'var(--ds-spacing-6)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          "Eksempel Tekst"
        </Paragraph>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Button
            data-variant="primary"
            style={{
              outline: '2px solid transparent',
              outlineOffset: '2px',
            }}
            onFocus={(e) => {
              e.currentTarget.style.outline = '2px solid var(--ds-color-accent-border-strong)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.outline = '2px solid transparent';
            }}
          >
            "Eksempel Tekst"
          </Button>

          <Textfield
            label="Eksempel Tekst"
            placeholder="Eksempel Tekst"
          />

          <div
            style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-info-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-info-text-default)' }}>
              <strong>"Eksempel Tekst":</strong>{' '}
              "Eksempel Tekst"
            </Paragraph>
          </div>
        </div>
      </Card>
    );
  },
};

/**
 * Example 5: Form Accessibility
 *
 * Complete accessible form pattern
 */
export const FormAccessibility: Story = {
  render: function Render() {
    const t = useT();
    const [formData, setFormData] = useState({ name: '', email: '', subscribe: false });
    const [errors, setErrors] = useState<Record<string, string>>({});

    return (
      <Card style={{ padding: 'var(--ds-spacing-6)', maxWidth: '500px' }}>
        <form aria-label="Eksempel Tekst">
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
            "Eksempel Tekst"
          </Heading>

          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <Textfield
              label="Eksempel Tekst"
              id="name-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <Paragraph
                id="name-error"
                data-size="sm"
                role="alert"
                style={{
                  color: 'var(--ds-color-danger-text-default)',
                  marginTop: 'var(--ds-spacing-1)',
                }}
              >
                {errors.name}
              </Paragraph>
            )}
          </div>

          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <Textfield
              label={t('platform.auth.email')}
              type="email"
              id="email-input"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby="email-help"
            />
            <Paragraph
              id="email-help"
              data-size="sm"
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                marginTop: 'var(--ds-spacing-1)',
              }}
            >
              "Eksempel Tekst"
            </Paragraph>
          </div>

          <div style={{ marginBottom: 'var(--ds-spacing-6)' }}>
            <Checkbox
              checked={formData.subscribe}
              onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
              aria-label="Eksempel Tekst"
            >
              "Eksempel Tekst"
            </Checkbox>
          </div>

          <Button data-variant="primary" type="submit">
            {t('platform.common.submit')}
          </Button>
        </form>

        <div
          style={{
            marginTop: 'var(--ds-spacing-6)',
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
            <strong>"Eksempel Tekst":</strong>
            <br />• "Eksempel Tekst"
            <br />• "Eksempel Tekst"
            <br />• "Eksempel Tekst"
            <br />• "Eksempel Tekst"
            <br />• "Eksempel Tekst"
          </Paragraph>
        </div>
      </Card>
    );
  },
};

/**
 * Example 6: Screen Reader Text
 *
 * Visually hidden text for screen readers
 */
export const ScreenReaderText: Story = {
  render: function Render() {
    const t = useT();

    return (
      <Card style={{ padding: 'var(--ds-spacing-6)', maxWidth: '600px' }}>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          "Eksempel Tekst"
        </Heading>

        <div style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          <button
            type="button"
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-accent-base-default)',
              color: 'var(--ds-color-accent-contrast-default)',
              border: 'none',
              borderRadius: 'var(--ds-border-radius-md)',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                position: 'absolute',
                width: '1px',
                height: '1px',
                padding: 0,
                margin: '-1px',
                overflow: 'hidden',
                clip: 'rect(0, 0, 0, 0)',
                whiteSpace: 'nowrap',
                border: 0,
              }}
            >
              "Eksempel Tekst"
            </span>
            ✕
          </button>
        </div>

        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-info-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-info-text-default)' }}>
            <strong>"Eksempel Tekst":</strong>{' '}
            "Eksempel Tekst"
          </Paragraph>
        </div>
      </Card>
    );
  },
};

/**
 * Accessibility Checklist
 */
export const Checklist: Story = {
  render: function Render() {
    const t = useT();

    const checklistData = [
      {
        category: t('storybook.a11y.keyboard'),
        items: [
          t('storybook.a11y.checklistKeyboardAccessible'),
          t('storybook.a11y.checklistTabOrder'),
          t('storybook.a11y.checklistFocusVisible'),
          t('storybook.a11y.checklistNoKeyboardTraps'),
        ],
      },
      {
        category: t('storybook.a11y.screenReaders'),
        items: [
          t('storybook.a11y.checklistAltText'),
          t('storybook.a11y.checklistFormLabels'),
          t('storybook.a11y.checklistAriaLabels'),
          t('storybook.a11y.checklistLandmarks'),
        ],
      },
      {
        category: t('storybook.a11y.visual'),
        items: [
          t('storybook.a11y.checklistContrastRatio'),
          t('storybook.a11y.checklistTextResizable'),
          t('storybook.a11y.checklistNoColorAlone'),
          t('storybook.a11y.checklistFocusClear'),
        ],
      },
      {
        category: t('storybook.a11y.content'),
        items: [
          t('storybook.a11y.checklistHeadingsHierarchy'),
          t('storybook.a11y.checklistLinksDescriptive'),
          t('storybook.a11y.checklistErrorsClear'),
          t('storybook.a11y.checklistInstructionsProvided'),
        ],
      },
    ];

    return (
      <Card style={{ padding: 'var(--ds-spacing-6)' }}>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          "Eksempel Tekst"
        </Heading>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
          {checklistData.map(({ category, items }) => (
            <div key={category}>
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                {category}
              </Heading>
              <div
                style={{
                  padding: 'var(--ds-spacing-4)',
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                }}
              >
                {items.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      gap: 'var(--ds-spacing-2)',
                      marginBottom: index < items.length - 1 ? 'var(--ds-spacing-2)' : 0,
                    }}
                  >
                    <span style={{ color: 'var(--ds-color-success-text-default)' }}>✓</span>
                    <Paragraph data-size="sm">{item}</Paragraph>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  },
};

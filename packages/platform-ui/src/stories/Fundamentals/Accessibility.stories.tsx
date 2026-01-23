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
  render: () => (
    <Card style={{ padding: 'var(--ds-spacing-6)', maxWidth: '600px' }}>
      <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
        Keyboard Navigation Demo
      </Heading>
      <Paragraph
        style={{
          marginBottom: 'var(--ds-spacing-6)',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        Try navigating with Tab, Shift+Tab, Enter, and Space keys
      </Paragraph>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Button data-variant="primary" tabIndex={0}>
          First Button (Tab to focus)
        </Button>
        <Button data-variant="secondary" tabIndex={0}>
          Second Button
        </Button>
        <Textfield label="Text Input" placeholder="Type here" tabIndex={0} />
        <Checkbox tabIndex={0}>Checkbox (Space to toggle)</Checkbox>
        <a
          href="#"
          style={{
            color: 'var(--ds-color-accent-text-default)',
            textDecoration: 'underline',
          }}
          tabIndex={0}
        >
          Link (Enter to activate)
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
          <strong>✅ Good:</strong> All elements have tabIndex and respond to keyboard
        </Paragraph>
      </div>
    </Card>
  ),
};

/**
 * Example 2: ARIA Labels
 *
 * Proper labeling for screen readers
 */
export const ARIALabels: Story = {
  render: () => (
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
          ❌ Missing ARIA
        </Heading>
        <button type="button" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          ✓
        </button>
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          Icon-only button with no label - screen readers can't understand it
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
          ✅ Proper ARIA
        </Heading>
        <button
          type="button"
          aria-label="Mark as complete"
          style={{ marginBottom: 'var(--ds-spacing-2)' }}
        >
          ✓
        </button>
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          Icon button with aria-label - screen readers announce "Mark as complete"
        </Paragraph>
      </Card>
    </div>
  ),
};

/**
 * Example 3: Color Contrast
 *
 * Minimum contrast ratio of 4.5:1 for normal text
 */
export const ColorContrast: Story = {
  render: () => (
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
          ❌ Poor Contrast
        </Heading>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: '#E0E0E0',
            color: '#C0C0C0',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          This text is hard to read (contrast ratio &lt; 3:1)
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
          ✅ Good Contrast
        </Heading>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            color: 'var(--ds-color-neutral-text-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          This text is easy to read (contrast ratio &gt; 4.5:1)
        </div>
      </Card>
    </div>
  ),
};

/**
 * Example 4: Focus Indicators
 *
 * Visible focus states for keyboard navigation
 */
export const FocusIndicators: Story = {
  render: () => (
    <Card style={{ padding: 'var(--ds-spacing-6)', maxWidth: '600px' }}>
      <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
        Focus Indicators
      </Heading>
      <Paragraph
        style={{
          marginBottom: 'var(--ds-spacing-6)',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        Tab through these elements to see focus indicators
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
          Button with focus ring
        </Button>

        <Textfield label="Input Field" placeholder="Focus to see outline" />

        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-info-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-info-text-default)' }}>
            <strong>✅ Good:</strong> Clear visual indicator when element has focus
          </Paragraph>
        </div>
      </div>
    </Card>
  ),
};

/**
 * Example 5: Form Accessibility
 *
 * Complete accessible form pattern
 */
export const FormAccessibility: Story = {
  render: () => {
    const [formData, setFormData] = useState({ name: '', email: '', subscribe: false });
    const [errors, setErrors] = useState<Record<string, string>>({});

    return (
      <Card style={{ padding: 'var(--ds-spacing-6)', maxWidth: '500px' }}>
        <form aria-label="Contact form">
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
            Accessible Form
          </Heading>

          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <Textfield
              label="Name"
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
              label="Email"
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
              We'll never share your email
            </Paragraph>
          </div>

          <div style={{ marginBottom: 'var(--ds-spacing-6)' }}>
            <Checkbox
              checked={formData.subscribe}
              onChange={(e) => setFormData({ ...formData, subscribe: e.target.checked })}
              aria-label="Subscribe to newsletter"
            >
              Subscribe to newsletter
            </Checkbox>
          </div>

          <Button data-variant="primary" type="submit">
            Submit
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
            <strong>✅ Accessible features:</strong>
            <br />• Proper labels with htmlFor
            <br />• aria-required for required fields
            <br />• aria-invalid for validation
            <br />• aria-describedby for help text
            <br />• role="alert" for errors
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
  render: () => (
    <Card style={{ padding: 'var(--ds-spacing-6)', maxWidth: '600px' }}>
      <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
        Screen Reader Only Text
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
            Close dialog
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
          <strong>Pattern:</strong> The "✕" is visible, but screen readers announce "Close dialog"
        </Paragraph>
      </div>
    </Card>
  ),
};

/**
 * Accessibility Checklist
 */
export const Checklist: Story = {
  render: () => (
    <Card style={{ padding: 'var(--ds-spacing-6)' }}>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Accessibility Checklist
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {[
          {
            category: 'Keyboard',
            items: [
              'All interactive elements are keyboard accessible',
              'Tab order is logical',
              'Focus indicators are visible',
              'No keyboard traps',
            ],
          },
          {
            category: 'Screen Readers',
            items: [
              'All images have alt text',
              'Form inputs have labels',
              'ARIA labels for icon buttons',
              'Landmarks for page regions',
            ],
          },
          {
            category: 'Visual',
            items: [
              'Color contrast meets 4.5:1 ratio',
              'Text is resizable to 200%',
              'No information by color alone',
              'Focus indicators are clear',
            ],
          },
          {
            category: 'Content',
            items: [
              'Headings are hierarchical',
              'Links are descriptive',
              'Error messages are clear',
              'Instructions are provided',
            ],
          },
        ].map(({ category, items }) => (
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
  ),
};

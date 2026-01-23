import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Examples/Anti-Patterns',
  parameters: {
    docs: {
      description: {
        component: `
# Anti-Patterns - What NOT to Do

Learn from common mistakes. Each example shows the **wrong way** and the **correct way**.

## Categories
- **Hardcoded Values**: Using pixels/hex instead of tokens
- **Inline Styles**: Custom styles instead of components
- **Accessibility**: Missing ARIA, labels, keyboard support
- **Architecture**: Domain logic in platform, SDK bypass
- **i18n**: Hardcoded text instead of translations

## For AI Agents
Use these examples to:
- Detect anti-patterns in code
- Suggest corrections
- Validate against best practices
- Learn what to avoid
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Anti-Pattern 1: Hardcoded Colors
 */
export const HardcodedColors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      {/* Bad Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-danger-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ❌ Wrong
        </h4>
        <div
          style={{
            padding: '16px',
            backgroundColor: '#0066CC',
            color: '#FFFFFF',
            borderRadius: '8px',
          }}
        >
          Hardcoded hex colors
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`<div style={{
  backgroundColor: '#0066CC',
  color: '#FFFFFF'
}}>
  Content
</div>`}
        </pre>
      </div>

      {/* Good Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-success-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ✅ Correct
        </h4>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-accent-base-default)',
            color: 'var(--ds-color-accent-contrast-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          Design token colors
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`<div style={{
  backgroundColor: 'var(--ds-color-accent-base-default)',
  color: 'var(--ds-color-accent-contrast-default)'
}}>
  Content
</div>`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * Anti-Pattern 2: Hardcoded Spacing
 */
export const HardcodedSpacing: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      {/* Bad Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-danger-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ❌ Wrong
        </h4>
        <div
          style={{
            padding: '24px',
            margin: '16px 0',
            gap: '12px',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          Hardcoded pixel values
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`<div style={{
  padding: '24px',
  margin: '16px 0',
  gap: '12px'
}}>
  Content
</div>`}
        </pre>
      </div>

      {/* Good Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-success-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ✅ Correct
        </h4>
        <div
          style={{
            padding: 'var(--ds-spacing-6)',
            margin: 'var(--ds-spacing-4) 0',
            gap: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          Design token spacing
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`<div style={{
  padding: 'var(--ds-spacing-6)',
  margin: 'var(--ds-spacing-4) 0',
  gap: 'var(--ds-spacing-3)'
}}>
  Content
</div>`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * Anti-Pattern 3: Missing Accessibility
 */
export const MissingAccessibility: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      {/* Bad Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-danger-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ❌ Wrong
        </h4>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <input type="text" placeholder="Enter name" />
          <div
            onClick={() => alert('clicked')}
            style={{ cursor: 'pointer', marginTop: 'var(--ds-spacing-2)' }}
          >
            Click me
          </div>
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`// No label, no ARIA
<input type="text" placeholder="Enter name" />

// div as button, not keyboard accessible
<div onClick={handleClick}>Click me</div>`}
        </pre>
      </div>

      {/* Good Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-success-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ✅ Correct
        </h4>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <label htmlFor="name-input">
            Name
            <input
              id="name-input"
              type="text"
              aria-label="Enter your name"
              style={{ display: 'block', marginTop: 'var(--ds-spacing-1)' }}
            />
          </label>
          <button
            type="button"
            onClick={() => alert('clicked')}
            style={{ marginTop: 'var(--ds-spacing-2)' }}
          >
            Click me
          </button>
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`// Proper label association
<label htmlFor="name-input">
  Name
  <input 
    id="name-input"
    type="text" 
    aria-label="Enter your name"
  />
</label>

// Semantic button element
<button type="button" onClick={handleClick}>
  Click me
</button>`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * Anti-Pattern 4: Hardcoded Text (No i18n)
 */
export const HardcodedText: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      {/* Bad Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-danger-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ❌ Wrong
        </h4>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <h3>Welcome</h3>
          <p>Click the button below to continue</p>
          <button type="button">Continue</button>
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`// Hardcoded English text
<h3>Welcome</h3>
<p>Click the button below to continue</p>
<button>Continue</button>`}
        </pre>
      </div>

      {/* Good Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-success-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ✅ Correct
        </h4>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <h3>Welcome (from t())</h3>
          <p>Click the button below to continue (from t())</p>
          <button type="button">Continue (from t())</button>
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`// Using i18n translation function
const { t } = useTranslation();

<h3>{t('welcome.title')}</h3>
<p>{t('welcome.description')}</p>
<button>{t('common.continue')}</button>`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * Anti-Pattern 5: Custom Components Instead of Platform
 */
export const CustomComponents: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      {/* Bad Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-danger-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ❌ Wrong
        </h4>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <div
            style={{
              padding: '12px 24px',
              backgroundColor: '#0066CC',
              color: 'white',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'inline-block',
            }}
          >
            Custom Button
          </div>
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`// Custom button implementation
<div style={{
  padding: '12px 24px',
  backgroundColor: '#0066CC',
  color: 'white',
  borderRadius: '4px',
  cursor: 'pointer'
}}>
  Custom Button
</div>`}
        </pre>
      </div>

      {/* Good Example */}
      <div style={{ flex: 1, minWidth: '300px' }}>
        <h4
          style={{
            color: 'var(--ds-color-success-text-default)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          ✅ Correct
        </h4>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <button className="ds-button" data-variant="primary" data-size="md" type="button">
            Platform Button
          </button>
        </div>
        <pre
          style={{
            marginTop: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontSize: 'var(--ds-font-size-xs)',
            overflow: 'auto',
          }}
        >
          {`// Using platform Button component
import { Button } from '../../index';

<Button data-variant="primary" data-size="md">
  Platform Button
</Button>`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * Anti-Pattern Summary
 */
export const Summary: Story = {
  render: () => (
    <div
      style={{
        padding: 'var(--ds-spacing-6)',
        backgroundColor: 'var(--ds-color-info-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        borderLeft: '4px solid var(--ds-color-info-border-default)',
      }}
    >
      <h3
        style={{
          color: 'var(--ds-color-info-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}
      >
        Anti-Pattern Checklist
      </h3>
      <div style={{ color: 'var(--ds-color-info-text-default)' }}>
        <p style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          <strong>Always avoid:</strong>
        </p>
        <ul style={{ marginLeft: 'var(--ds-spacing-6)', marginBottom: 'var(--ds-spacing-4)' }}>
          <li>❌ Hardcoded colors (hex, rgb, hsl)</li>
          <li>❌ Hardcoded spacing (px values)</li>
          <li>❌ Missing accessibility (labels, ARIA, keyboard)</li>
          <li>❌ Hardcoded text (use i18n)</li>
          <li>❌ Custom components (use platform)</li>
          <li>❌ Direct fetch/axios (use SDK)</li>
          <li>❌ Domain logic in platform apps</li>
          <li>❌ Inline styles without tokens</li>
        </ul>
        <p style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          <strong>Always use:</strong>
        </p>
        <ul style={{ marginLeft: 'var(--ds-spacing-6)' }}>
          <li>✅ Design tokens for all values</li>
          <li>✅ Platform UI components</li>
          <li>✅ Proper accessibility attributes</li>
          <li>✅ i18n for all user-facing text</li>
          <li>✅ SDK for all API calls</li>
          <li>✅ Semantic HTML elements</li>
          <li>✅ Feature flags for domain logic</li>
        </ul>
      </div>
    </div>
  ),
};

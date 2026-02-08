import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';

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
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        {/* Bad Example */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h4
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            {t('storybook.bestPractices.dont')}
          </h4>
          <div
            style={{
              padding: '16px',
              backgroundColor: '#0066CC',
              color: '#FFFFFF',
              borderRadius: '8px',
            }}
          >
            {t('storybook.antiPatterns.hardcodedHexColors')}
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
            {t('storybook.bestPractices.do')}
          </h4>
          <div
            style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-accent-base-default)',
              color: 'var(--ds-color-accent-contrast-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            {t('storybook.antiPatterns.designTokenColors')}
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
    );
  },
};

/**
 * Anti-Pattern 2: Hardcoded Spacing
 */
export const HardcodedSpacing: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        {/* Bad Example */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h4
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            {t('storybook.bestPractices.dont')}
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
            {t('storybook.antiPatterns.hardcodedPixelValues')}
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
            {t('storybook.bestPractices.do')}
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
            {t('storybook.antiPatterns.designTokenSpacing')}
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
    );
  },
};

/**
 * Anti-Pattern 3: Missing Accessibility
 */
export const MissingAccessibility: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        {/* Bad Example */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h4
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            {t('storybook.bestPractices.dont')}
          </h4>
          <div
            style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              border: '1px solid var(--ds-color-neutral-border-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <input type="text" placeholder={t('storybook.antiPatterns.enterName')} />
            <div
              onClick={() => alert('clicked')}
              style={{ cursor: 'pointer', marginTop: 'var(--ds-spacing-2)' }}
            >
              {t('storybook.antiPatterns.clickMe')}
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
            {t('storybook.bestPractices.do')}
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
              {t('platform.common.name')}
              <input
                id="name-input"
                type="text"
                aria-label={t('storybook.antiPatterns.enterYourName')}
                style={{ display: 'block', marginTop: 'var(--ds-spacing-1)' }}
              />
            </label>
            <button
              type="button"
              onClick={() => alert('clicked')}
              style={{ marginTop: 'var(--ds-spacing-2)' }}
            >
              {t('storybook.antiPatterns.clickMe')}
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
    );
  },
};

/**
 * Anti-Pattern 4: Hardcoded Text (No i18n)
 */
export const HardcodedText: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        {/* Bad Example */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h4
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            {t('storybook.bestPractices.dont')}
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
            {t('storybook.bestPractices.do')}
          </h4>
          <div
            style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              border: '1px solid var(--ds-color-neutral-border-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <h3>{t('storybook.demo.welcome')} (from t())</h3>
            <p>{t('storybook.demo.clickToContinue')} (from t())</p>
            <button type="button">{t('platform.common.continue')} (from t())</button>
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
    );
  },
};

/**
 * Anti-Pattern 5: Custom Components Instead of Platform
 */
export const CustomComponents: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        {/* Bad Example */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h4
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            {t('storybook.bestPractices.dont')}
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
              {t('storybook.antiPatterns.customButton')}
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
            {t('storybook.bestPractices.do')}
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
              {t('storybook.antiPatterns.platformButton')}
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
    );
  },
};

/**
 * Anti-Pattern Summary
 */
export const Summary: Story = {
  render: function Render() {
    const t = useT();
    return (
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
          {t('storybook.antiPatterns.checklist')}
        </h3>
        <div style={{ color: 'var(--ds-color-info-text-default)' }}>
          <p style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            <strong>{t('storybook.antiPatterns.alwaysAvoid')}:</strong>
          </p>
          <ul style={{ marginLeft: 'var(--ds-spacing-6)', marginBottom: 'var(--ds-spacing-4)' }}>
            <li>{t('storybook.antiPatterns.avoidHardcodedColors')}</li>
            <li>{t('storybook.antiPatterns.avoidHardcodedSpacing')}</li>
            <li>{t('storybook.antiPatterns.avoidMissingA11y')}</li>
            <li>{t('storybook.antiPatterns.avoidHardcodedText')}</li>
            <li>{t('storybook.antiPatterns.avoidCustomComponents')}</li>
            <li>{t('storybook.antiPatterns.avoidDirectFetch')}</li>
            <li>{t('storybook.antiPatterns.avoidDomainLogic')}</li>
            <li>{t('storybook.antiPatterns.avoidInlineStyles')}</li>
          </ul>
          <p style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            <strong>{t('storybook.antiPatterns.alwaysUse')}:</strong>
          </p>
          <ul style={{ marginLeft: 'var(--ds-spacing-6)' }}>
            <li>{t('storybook.antiPatterns.useDesignTokens')}</li>
            <li>{t('storybook.antiPatterns.usePlatformUI')}</li>
            <li>{t('storybook.antiPatterns.useA11yAttributes')}</li>
            <li>{t('storybook.antiPatterns.useI18n')}</li>
            <li>{t('storybook.antiPatterns.useSdk')}</li>
            <li>{t('storybook.antiPatterns.useSemanticHtml')}</li>
            <li>{t('storybook.antiPatterns.useFeatureFlags')}</li>
          </ul>
        </div>
      </div>
    );
  },
};

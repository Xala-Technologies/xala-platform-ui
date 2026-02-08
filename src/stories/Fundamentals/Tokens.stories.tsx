import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';

/**
 * Design Tokens from Digdir Designsystemet.
 *
 * Design tokens are the visual design atoms — named entities that store visual design attributes.
 *
 * @see https://designsystemet.no/en/fundamentals/design-elements/variables
 */
const meta: Meta = {
  title: 'Fundamentals/Tokens',
  parameters: {
    docs: {
      description: {
        component: `
Design tokens are the visual design atoms of the design system — specifically, they are named entities that store visual design attributes. We use them in place of hard-coded values to ensure consistency and maintainability.

## Token Categories

- **Colors**: Semantic color tokens for backgrounds, text, borders (accent, neutral, success, warning, danger, info)
- **Spacing**: Consistent spacing scale from 1 (4px) to 16 (64px) for margins, padding, gaps
- **Typography**: Font sizes (xs to xl), weights (regular to bold), line heights
- **Borders**: Border radius (sm to full) and width tokens
- **Shadows**: Elevation tokens (xs to xl) for depth
- **Sizing**: Component dimensions and constraints

## Why Use Tokens?

- **Consistency**: Same values across all components
- **Maintainability**: Change once, update everywhere
- **Theming**: Easy theme switching and customization
- **Accessibility**: Built-in contrast and spacing standards

## Usage Guidelines

Always use design tokens instead of hardcoded values:

\`\`\`tsx
// Bad - Hardcoded values
<div style={{
  padding: '16px',
  color: '#0066CC',
  fontSize: '14px',
  borderRadius: '8px'
}} />

// Good - Design tokens
<div style={{
  padding: 'var(--ds-spacing-4)',
  color: 'var(--ds-color-accent-base-default)',
  fontSize: 'var(--ds-font-size-sm)',
  borderRadius: 'var(--ds-border-radius-md)'
}} />
\`\`\`

## Reference

- [Designsystemet Variables](https://designsystemet.no/en/fundamentals/design-elements/variables)
- [Theme Builder](https://theme.designsystemet.no/)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Color tokens organized by semantic meaning
 */
export const ColorTokens: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
        {/* Accent Colors */}
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
            {t('storybook.tokens.accentColors')}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-3)' }}>
            {[
              {
                token: '--ds-color-accent-background-default',
                labelKey: 'storybook.tokens.backgroundDefault',
              },
              {
                token: '--ds-color-accent-surface-default',
                labelKey: 'storybook.tokens.surfaceDefault',
              },
              {
                token: '--ds-color-accent-surface-hover',
                labelKey: 'storybook.tokens.surfaceHover',
              },
              {
                token: '--ds-color-accent-border-default',
                labelKey: 'storybook.tokens.borderDefault',
              },
              { token: '--ds-color-accent-base-default', labelKey: 'storybook.tokens.baseDefault' },
              { token: '--ds-color-accent-text-default', labelKey: 'storybook.tokens.textDefault' },
            ].map(({ token, labelKey }) => (
              <div
                key={token}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-3)',
                  padding: 'var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <div
                  style={{
                    width: 'var(--ds-spacing-12)',
                    height: 'var(--ds-spacing-12)',
                    backgroundColor: `var(${token})`,
                    borderRadius: 'var(--ds-border-radius-sm)',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 'var(--ds-font-size-sm)',
                      fontWeight: 600,
                      marginBottom: 'var(--ds-spacing-1)',
                    }}
                  >
                    {t(labelKey)}
                  </div>
                  <code
                    style={{
                      fontSize: 'var(--ds-font-size-xs)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                      wordBreak: 'break-all',
                    }}
                  >
                    {token}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Neutral Colors */}
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
            {t('storybook.tokens.neutralColors')}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-3)' }}>
            {[
              {
                token: '--ds-color-neutral-background-default',
                labelKey: 'storybook.tokens.backgroundDefault',
              },
              {
                token: '--ds-color-neutral-surface-default',
                labelKey: 'storybook.tokens.surfaceDefault',
              },
              {
                token: '--ds-color-neutral-surface-hover',
                labelKey: 'storybook.tokens.surfaceHover',
              },
              {
                token: '--ds-color-neutral-border-default',
                labelKey: 'storybook.tokens.borderDefault',
              },
              {
                token: '--ds-color-neutral-text-default',
                labelKey: 'storybook.tokens.textDefault',
              },
              { token: '--ds-color-neutral-text-subtle', labelKey: 'storybook.tokens.textSubtle' },
            ].map(({ token, labelKey }) => (
              <div
                key={token}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-3)',
                  padding: 'var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <div
                  style={{
                    width: 'var(--ds-spacing-12)',
                    height: 'var(--ds-spacing-12)',
                    backgroundColor: `var(${token})`,
                    borderRadius: 'var(--ds-border-radius-sm)',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    flexShrink: 0,
                  }}
                />
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: 'var(--ds-font-size-sm)',
                      fontWeight: 600,
                      marginBottom: 'var(--ds-spacing-1)',
                    }}
                  >
                    {t(labelKey)}
                  </div>
                  <code
                    style={{
                      fontSize: 'var(--ds-font-size-xs)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                      wordBreak: 'break-all',
                    }}
                  >
                    {token}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Semantic Colors */}
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
            {t('storybook.tokens.semanticColors')}
          </h3>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 'var(--ds-spacing-6)',
            }}
          >
            {[
              {
                category: t('storybook.notifications.success'),
                colors: [
                  {
                    token: '--ds-color-success-surface-default',
                    labelKey: 'storybook.tokens.surface',
                  },
                  {
                    token: '--ds-color-success-border-default',
                    labelKey: 'storybook.tokens.border',
                  },
                  { token: '--ds-color-success-text-default', labelKey: 'storybook.tokens.text' },
                ],
              },
              {
                category: t('storybook.notifications.warning'),
                colors: [
                  {
                    token: '--ds-color-warning-surface-default',
                    labelKey: 'storybook.tokens.surface',
                  },
                  {
                    token: '--ds-color-warning-border-default',
                    labelKey: 'storybook.tokens.border',
                  },
                  { token: '--ds-color-warning-text-default', labelKey: 'storybook.tokens.text' },
                ],
              },
              {
                category: t('storybook.tokens.danger'),
                colors: [
                  {
                    token: '--ds-color-danger-surface-default',
                    labelKey: 'storybook.tokens.surface',
                  },
                  {
                    token: '--ds-color-danger-border-default',
                    labelKey: 'storybook.tokens.border',
                  },
                  { token: '--ds-color-danger-text-default', labelKey: 'storybook.tokens.text' },
                ],
              },
              {
                category: t('storybook.tokens.info'),
                colors: [
                  {
                    token: '--ds-color-info-surface-default',
                    labelKey: 'storybook.tokens.surface',
                  },
                  { token: '--ds-color-info-border-default', labelKey: 'storybook.tokens.border' },
                  { token: '--ds-color-info-text-default', labelKey: 'storybook.tokens.text' },
                ],
              },
            ].map(({ category, colors }) => (
              <div key={category}>
                <h4
                  style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}
                >
                  {category}
                </h4>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}
                >
                  {colors.map(({ token, labelKey }) => (
                    <div
                      key={token}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--ds-spacing-2)',
                        padding: 'var(--ds-spacing-2)',
                        backgroundColor: 'var(--ds-color-neutral-surface-default)',
                        borderRadius: 'var(--ds-border-radius-sm)',
                      }}
                    >
                      <div
                        style={{
                          width: 'var(--ds-spacing-8)',
                          height: 'var(--ds-spacing-8)',
                          backgroundColor: `var(${token})`,
                          borderRadius: 'var(--ds-border-radius-sm)',
                          border: '1px solid var(--ds-color-neutral-border-default)',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ minWidth: 0, fontSize: 'var(--ds-font-size-xs)' }}>
                        <div style={{ fontWeight: 600 }}>{t(labelKey)}</div>
                        <code style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                          {token}
                        </code>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Spacing tokens for consistent rhythm
 */
export const SpacingTokens: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
          {t('storybook.tokens.spacingScale')}
        </h3>
        <p
          style={{
            marginBottom: 'var(--ds-spacing-6)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {t('storybook.tokens.spacingDescription')}
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
          {[
            { token: '1', value: '4px', useKey: 'storybook.tokens.tightSpacing' },
            { token: '2', value: '8px', useKey: 'storybook.tokens.smallGaps' },
            { token: '3', value: '12px', useKey: 'storybook.tokens.formFieldGaps' },
            { token: '4', value: '16px', useKey: 'storybook.tokens.standardSpacing' },
            { token: '6', value: '24px', useKey: 'storybook.tokens.cardPadding' },
            { token: '8', value: '32px', useKey: 'storybook.tokens.largeSections' },
            { token: '12', value: '48px', useKey: 'storybook.tokens.majorDivisions' },
            { token: '16', value: '64px', useKey: 'storybook.tokens.pageSections' },
          ].map(({ token, value, useKey }) => (
            <div
              key={token}
              style={{
                display: 'grid',
                gridTemplateColumns: '150px 1fr 200px',
                gap: 'var(--ds-spacing-4)',
                alignItems: 'center',
                padding: 'var(--ds-spacing-3)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <code style={{ fontSize: 'var(--ds-font-size-sm)' }}>--ds-spacing-{token}</code>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <div
                  style={{
                    width: `var(--ds-spacing-${token})`,
                    height: 'var(--ds-spacing-6)',
                    backgroundColor: 'var(--ds-color-accent-base-default)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                  }}
                />
                <span
                  style={{
                    fontSize: 'var(--ds-font-size-xs)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {value}
                </span>
              </div>
              <span
                style={{
                  fontSize: 'var(--ds-font-size-xs)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {t(useKey)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Typography tokens for text styling
 */
export const TypographyTokens: Story = {
  render: function Render() {
    const t = useT();
    const sampleText = t('storybook.tokens.sampleText');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
        {/* Font Sizes */}
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
            {t('storybook.tokens.fontSizeTokens')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            {[
              { token: '--ds-font-size-xs', labelKey: 'storybook.tokens.extraSmall' },
              { token: '--ds-font-size-sm', labelKey: 'storybook.sizes.small' },
              { token: '--ds-font-size-md', labelKey: 'storybook.sizes.medium' },
              { token: '--ds-font-size-lg', labelKey: 'storybook.sizes.large' },
              { token: '--ds-font-size-xl', labelKey: 'storybook.tokens.extraLarge' },
            ].map(({ token, labelKey }) => (
              <div
                key={token}
                style={{
                  padding: 'var(--ds-spacing-4)',
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: 'var(--ds-spacing-2)',
                  }}
                >
                  <code
                    style={{
                      fontSize: 'var(--ds-font-size-xs)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {token}
                  </code>
                  <span
                    style={{
                      fontSize: 'var(--ds-font-size-xs)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {t(labelKey)}
                  </span>
                </div>
                <div style={{ fontSize: `var(${token})` }}>{sampleText}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Font Weights */}
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
            {t('storybook.tokens.fontWeightTokens')}
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            {[
              {
                token: '--ds-font-weight-regular',
                value: '400',
                labelKey: 'storybook.tokens.regular',
              },
              {
                token: '--ds-font-weight-medium',
                value: '500',
                labelKey: 'storybook.tokens.medium',
              },
              {
                token: '--ds-font-weight-semibold',
                value: '600',
                labelKey: 'storybook.tokens.semibold',
              },
              { token: '--ds-font-weight-bold', value: '700', labelKey: 'storybook.tokens.bold' },
            ].map(({ token, value, labelKey }) => (
              <div
                key={token}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-4)',
                  padding: 'var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                }}
              >
                <span
                  style={{
                    fontWeight: `var(${token})`,
                    fontSize: 'var(--ds-font-size-4)',
                    minWidth: '150px',
                  }}
                >
                  {t(labelKey)} ({value})
                </span>
                <code
                  style={{
                    fontSize: 'var(--ds-font-size-xs)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {token}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Border and shadow tokens
 */
export const BorderAndShadowTokens: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
        {/* Border Radius */}
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
            {t('storybook.tokens.borderRadiusTokens')}
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-4)' }}>
            {[
              { token: '--ds-border-radius-sm', labelKey: 'storybook.sizes.small' },
              { token: '--ds-border-radius-md', labelKey: 'storybook.sizes.medium' },
              { token: '--ds-border-radius-lg', labelKey: 'storybook.sizes.large' },
              { token: '--ds-border-radius-xl', labelKey: 'storybook.tokens.extraLarge' },
              { token: '--ds-border-radius-full', labelKey: 'storybook.tokens.full' },
            ].map(({ token, labelKey }) => (
              <div key={token} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '100px',
                    height: '100px',
                    backgroundColor: 'var(--ds-color-accent-background-default)',
                    border: '2px solid var(--ds-color-accent-border-default)',
                    borderRadius: `var(${token})`,
                    marginBottom: 'var(--ds-spacing-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--ds-font-size-sm)',
                      fontWeight: 600,
                      color: 'var(--ds-color-accent-text-default)',
                    }}
                  >
                    {t(labelKey)}
                  </span>
                </div>
                <code
                  style={{
                    fontSize: 'var(--ds-font-size-xs)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {token}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Shadows */}
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
            {t('storybook.tokens.shadowTokens')}
          </h3>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--ds-spacing-6)',
              padding: 'var(--ds-spacing-6)',
              backgroundColor: 'var(--ds-color-neutral-background-subtle)',
              borderRadius: 'var(--ds-border-radius-lg)',
            }}
          >
            {['xs', 'sm', 'md', 'lg', 'xl'].map((size) => (
              <div key={size} style={{ textAlign: 'center' }}>
                <div
                  style={{
                    width: '120px',
                    height: '100px',
                    backgroundColor: 'var(--ds-color-neutral-background-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    boxShadow: `var(--ds-shadow-${size})`,
                    marginBottom: 'var(--ds-spacing-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span style={{ fontSize: 'var(--ds-font-size-sm)', fontWeight: 600 }}>
                    {size}
                  </span>
                </div>
                <code
                  style={{
                    fontSize: 'var(--ds-font-size-xs)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  --ds-shadow-{size}
                </code>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Interactive token explorer - Test different token combinations
 */
export const InteractiveExplorer: Story = {
  render: function Render() {
    const t = useT();
    const [selectedColor, setSelectedColor] = useState('accent');
    const [selectedSpacing, setSelectedSpacing] = useState('4');
    const [selectedRadius, setSelectedRadius] = useState('md');
    const [selectedShadow, setSelectedShadow] = useState('md');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
            {t('storybook.tokens.interactiveExplorer')}
          </h3>
          <p
            style={{
              color: 'var(--ds-color-neutral-text-subtle)',
              marginBottom: 'var(--ds-spacing-6)',
            }}
          >
            {t('storybook.tokens.experimentWithTokens')}
          </p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-4)' }}>
          <div>
            <label
              style={{
                display: 'block',
                marginBottom: 'var(--ds-spacing-2)',
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 600,
              }}
            >
              {t('storybook.tokens.color')}
            </label>
            <select
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--ds-spacing-2)',
                borderRadius: 'var(--ds-border-radius-sm)',
                border: '1px solid var(--ds-color-neutral-border-default)',
              }}
            >
              <option value="accent">{t('storybook.tokens.accent')}</option>
              <option value="neutral">{t('storybook.tokens.neutral')}</option>
              <option value="success">{t('storybook.notifications.success')}</option>
              <option value="warning">{t('storybook.notifications.warning')}</option>
              <option value="danger">{t('storybook.tokens.danger')}</option>
              <option value="info">{t('storybook.tokens.info')}</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: 'var(--ds-spacing-2)',
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 600,
              }}
            >
              {t('storybook.tokens.spacing')}
            </label>
            <select
              value={selectedSpacing}
              onChange={(e) => setSelectedSpacing(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--ds-spacing-2)',
                borderRadius: 'var(--ds-border-radius-sm)',
                border: '1px solid var(--ds-color-neutral-border-default)',
              }}
            >
              <option value="2">2 (8px)</option>
              <option value="4">4 (16px)</option>
              <option value="6">6 (24px)</option>
              <option value="8">8 (32px)</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: 'var(--ds-spacing-2)',
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 600,
              }}
            >
              {t('storybook.tokens.borderRadius')}
            </label>
            <select
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--ds-spacing-2)',
                borderRadius: 'var(--ds-border-radius-sm)',
                border: '1px solid var(--ds-color-neutral-border-default)',
              }}
            >
              <option value="sm">{t('storybook.sizes.small')}</option>
              <option value="md">{t('storybook.sizes.medium')}</option>
              <option value="lg">{t('storybook.sizes.large')}</option>
              <option value="xl">{t('storybook.tokens.extraLarge')}</option>
            </select>
          </div>

          <div>
            <label
              style={{
                display: 'block',
                marginBottom: 'var(--ds-spacing-2)',
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 600,
              }}
            >
              {t('storybook.tokens.shadow')}
            </label>
            <select
              value={selectedShadow}
              onChange={(e) => setSelectedShadow(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--ds-spacing-2)',
                borderRadius: 'var(--ds-border-radius-sm)',
                border: '1px solid var(--ds-color-neutral-border-default)',
              }}
            >
              <option value="xs">{t('storybook.tokens.extraSmall')}</option>
              <option value="sm">{t('storybook.sizes.small')}</option>
              <option value="md">{t('storybook.sizes.medium')}</option>
              <option value="lg">{t('storybook.sizes.large')}</option>
              <option value="xl">{t('storybook.tokens.extraLarge')}</option>
            </select>
          </div>
        </div>

        <div
          style={{
            padding: `var(--ds-spacing-${selectedSpacing})`,
            backgroundColor: `var(--ds-color-${selectedColor}-surface-default)`,
            border: `2px solid var(--ds-color-${selectedColor}-border-default)`,
            borderRadius: `var(--ds-border-radius-${selectedRadius})`,
            boxShadow: `var(--ds-shadow-${selectedShadow})`,
            color: `var(--ds-color-${selectedColor}-text-default)`,
          }}
        >
          <h4
            style={{
              fontSize: 'var(--ds-font-size-4)',
              fontWeight: 'var(--ds-font-weight-semibold)',
              marginBottom: 'var(--ds-spacing-2)',
            }}
          >
            {t('storybook.tokens.previewCard')}
          </h4>
          <p style={{ fontSize: 'var(--ds-font-size-sm)' }}>
            {t('storybook.tokens.previewDescription')}
          </p>
        </div>

        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <h4
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              fontWeight: 600,
              marginBottom: 'var(--ds-spacing-2)',
            }}
          >
            {t('storybook.tokens.generatedCSS')}:
          </h4>
          <pre
            style={{
              fontSize: 'var(--ds-font-size-xs)',
              margin: 0,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
            }}
          >
            {`padding: var(--ds-spacing-${selectedSpacing});
backgroundColor: var(--ds-color-${selectedColor}-surface-default);
border: 2px solid var(--ds-color-${selectedColor}-border-default);
borderRadius: var(--ds-border-radius-${selectedRadius});
boxShadow: var(--ds-shadow-${selectedShadow});
color: var(--ds-color-${selectedColor}-text-default);`}
          </pre>
        </div>
      </div>
    );
  },
};

/**
 * Complete token usage example
 */
export const TokenUsageExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px' }}>
        <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
          {t('storybook.tokens.tokenUsageExample')}
        </h3>
        <p
          style={{
            marginBottom: 'var(--ds-spacing-6)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {t('storybook.tokens.tokenUsageDescription')}
        </p>

        <div
          style={{
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            boxShadow: 'var(--ds-shadow-md)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: 'var(--ds-spacing-6)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            }}
          >
            <h4
              style={{
                fontSize: 'var(--ds-font-size-4)',
                fontWeight: 'var(--ds-font-weight-semibold)',
                color: 'var(--ds-color-neutral-text-default)',
                marginBottom: 'var(--ds-spacing-2)',
              }}
            >
              {t('storybook.sizes.cardTitle')}
            </h4>
            <p
              style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('storybook.tokens.cardTokensOnly')}
            </p>
          </div>

          <div style={{ padding: 'var(--ds-spacing-6)' }}>
            <div
              style={{
                display: 'flex',
                gap: 'var(--ds-spacing-2)',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              <span
                style={{
                  padding: 'var(--ds-spacing-1) var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-accent-surface-default)',
                  color: 'var(--ds-color-accent-text-default)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontSize: 'var(--ds-font-size-xs)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                }}
              >
                {t('storybook.sizes.tag')} 1
              </span>
              <span
                style={{
                  padding: 'var(--ds-spacing-1) var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-success-surface-default)',
                  color: 'var(--ds-color-success-text-default)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontSize: 'var(--ds-font-size-xs)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                }}
              >
                {t('storybook.sizes.tag')} 2
              </span>
            </div>

            <button
              style={{
                padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-accent-base-default)',
                color: 'var(--ds-color-accent-contrast-default)',
                border: 'none',
                borderRadius: 'var(--ds-border-radius-md)',
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: 'var(--ds-font-weight-medium)',
                cursor: 'pointer',
              }}
              type="button"
            >
              {t('storybook.tokens.actionButton')}
            </button>
          </div>
        </div>

        <div
          style={{
            marginTop: 'var(--ds-spacing-6)',
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-info-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            borderLeft: '4px solid var(--ds-color-info-border-default)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-info-text-default)',
              margin: 0,
            }}
          >
            <strong>{t('storybook.tokens.tokensUsed')}:</strong>{' '}
            {t('storybook.tokens.tokensUsedList')}
          </p>
        </div>
      </div>
    );
  },
};

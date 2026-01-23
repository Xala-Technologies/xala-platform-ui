import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';

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
// ❌ Bad - Hardcoded values
<div style={{ 
  padding: '16px', 
  color: '#0066CC',
  fontSize: '14px',
  borderRadius: '8px'
}} />

// ✅ Good - Design tokens
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
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      {/* Accent Colors */}
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
          Accent Colors
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-3)' }}>
          {[
            { token: '--ds-color-accent-background-default', label: 'Background Default' },
            { token: '--ds-color-accent-surface-default', label: 'Surface Default' },
            { token: '--ds-color-accent-surface-hover', label: 'Surface Hover' },
            { token: '--ds-color-accent-border-default', label: 'Border Default' },
            { token: '--ds-color-accent-base-default', label: 'Base Default' },
            { token: '--ds-color-accent-text-default', label: 'Text Default' },
          ].map(({ token, label }) => (
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
                  {label}
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
          Neutral Colors
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-3)' }}>
          {[
            { token: '--ds-color-neutral-background-default', label: 'Background Default' },
            { token: '--ds-color-neutral-surface-default', label: 'Surface Default' },
            { token: '--ds-color-neutral-surface-hover', label: 'Surface Hover' },
            { token: '--ds-color-neutral-border-default', label: 'Border Default' },
            { token: '--ds-color-neutral-text-default', label: 'Text Default' },
            { token: '--ds-color-neutral-text-subtle', label: 'Text Subtle' },
          ].map(({ token, label }) => (
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
                  {label}
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
          Semantic Colors
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
              category: 'Success',
              colors: [
                { token: '--ds-color-success-surface-default', label: 'Surface' },
                { token: '--ds-color-success-border-default', label: 'Border' },
                { token: '--ds-color-success-text-default', label: 'Text' },
              ],
            },
            {
              category: 'Warning',
              colors: [
                { token: '--ds-color-warning-surface-default', label: 'Surface' },
                { token: '--ds-color-warning-border-default', label: 'Border' },
                { token: '--ds-color-warning-text-default', label: 'Text' },
              ],
            },
            {
              category: 'Danger',
              colors: [
                { token: '--ds-color-danger-surface-default', label: 'Surface' },
                { token: '--ds-color-danger-border-default', label: 'Border' },
                { token: '--ds-color-danger-text-default', label: 'Text' },
              ],
            },
            {
              category: 'Info',
              colors: [
                { token: '--ds-color-info-surface-default', label: 'Surface' },
                { token: '--ds-color-info-border-default', label: 'Border' },
                { token: '--ds-color-info-text-default', label: 'Text' },
              ],
            },
          ].map(({ category, colors }) => (
            <div key={category}>
              <h4
                style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}
              >
                {category}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
                {colors.map(({ token, label }) => (
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
                      <div style={{ fontWeight: 600 }}>{label}</div>
                      <code style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>{token}</code>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * Spacing tokens for consistent rhythm
 */
export const SpacingTokens: Story = {
  render: () => (
    <div>
      <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
        Spacing Scale
      </h3>
      <p
        style={{
          marginBottom: 'var(--ds-spacing-6)',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        Use spacing tokens for padding, margin, and gaps to maintain consistent rhythm.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        {[
          { token: '1', value: '4px', use: 'Tight spacing, icon gaps' },
          { token: '2', value: '8px', use: 'Small gaps, compact layouts' },
          { token: '3', value: '12px', use: 'Form field gaps' },
          { token: '4', value: '16px', use: 'Standard spacing' },
          { token: '6', value: '24px', use: 'Card padding, section gaps' },
          { token: '8', value: '32px', use: 'Large sections' },
          { token: '12', value: '48px', use: 'Major divisions' },
          { token: '16', value: '64px', use: 'Page sections' },
        ].map(({ token, value, use }) => (
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
              {use}
            </span>
          </div>
        ))}
      </div>
    </div>
  ),
};

/**
 * Typography tokens for text styling
 */
export const TypographyTokens: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      {/* Font Sizes */}
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
          Font Size Tokens
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          {[
            { token: '--ds-font-size-xs', label: 'Extra Small', sample: 'The quick brown fox' },
            { token: '--ds-font-size-sm', label: 'Small', sample: 'The quick brown fox' },
            { token: '--ds-font-size-md', label: 'Medium', sample: 'The quick brown fox' },
            { token: '--ds-font-size-lg', label: 'Large', sample: 'The quick brown fox' },
            { token: '--ds-font-size-xl', label: 'Extra Large', sample: 'The quick brown fox' },
          ].map(({ token, label, sample }) => (
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
                  {label}
                </span>
              </div>
              <div style={{ fontSize: `var(${token})` }}>{sample}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Font Weights */}
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
          Font Weight Tokens
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          {[
            { token: '--ds-font-weight-regular', value: '400', label: 'Regular' },
            { token: '--ds-font-weight-medium', value: '500', label: 'Medium' },
            { token: '--ds-font-weight-semibold', value: '600', label: 'Semibold' },
            { token: '--ds-font-weight-bold', value: '700', label: 'Bold' },
          ].map(({ token, value, label }) => (
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
                {label} ({value})
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
  ),
};

/**
 * Border and shadow tokens
 */
export const BorderAndShadowTokens: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      {/* Border Radius */}
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
          Border Radius Tokens
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-4)' }}>
          {[
            { token: '--ds-border-radius-sm', label: 'Small' },
            { token: '--ds-border-radius-md', label: 'Medium' },
            { token: '--ds-border-radius-lg', label: 'Large' },
            { token: '--ds-border-radius-xl', label: 'Extra Large' },
            { token: '--ds-border-radius-full', label: 'Full' },
          ].map(({ token, label }) => (
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
                  {label}
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
          Shadow Tokens
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
                <span style={{ fontSize: 'var(--ds-font-size-sm)', fontWeight: 600 }}>{size}</span>
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
  ),
};

/**
 * Interactive token explorer - Test different token combinations
 */
export const InteractiveExplorer: Story = {
  render: () => {
    const [selectedColor, setSelectedColor] = useState('accent');
    const [selectedSpacing, setSelectedSpacing] = useState('4');
    const [selectedRadius, setSelectedRadius] = useState('md');
    const [selectedShadow, setSelectedShadow] = useState('md');

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
            Interactive Token Explorer
          </h3>
          <p
            style={{
              color: 'var(--ds-color-neutral-text-subtle)',
              marginBottom: 'var(--ds-spacing-6)',
            }}
          >
            Experiment with different token combinations to see how they work together.
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
              Color
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
              <option value="accent">Accent</option>
              <option value="neutral">Neutral</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="danger">Danger</option>
              <option value="info">Info</option>
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
              Spacing
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
              Border Radius
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
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
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
              Shadow
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
              <option value="xs">Extra Small</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
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
            Preview Card
          </h4>
          <p style={{ fontSize: 'var(--ds-font-size-sm)' }}>
            This card updates in real-time as you change the token selections above.
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
            Generated CSS:
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
  render: () => (
    <div style={{ maxWidth: '600px' }}>
      <h3 style={{ marginBottom: 'var(--ds-spacing-4)', fontSize: 'var(--ds-font-size-5)' }}>
        Token Usage Example
      </h3>
      <p
        style={{
          marginBottom: 'var(--ds-spacing-6)',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        This card demonstrates proper token usage for a complete component.
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
            Card Title
          </h4>
          <p
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            This card uses only design tokens for all styling.
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
              Tag 1
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
              Tag 2
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
            Action Button
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
          <strong>Tokens used:</strong> Colors, spacing, typography, borders, and shadows — all from
          design tokens!
        </p>
      </div>
    </div>
  ),
};

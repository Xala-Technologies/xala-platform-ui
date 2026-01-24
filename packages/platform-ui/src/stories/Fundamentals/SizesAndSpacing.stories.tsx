import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Button, Textfield, Heading, Paragraph, Card } from '../../index';

const meta: Meta = {
  title: 'Fundamentals/Sizes and Spacing',
  parameters: {
    docs: {
      description: {
        component: `
Sizes and spacing system from Designsystemet.

## Size Modes
Components can be rendered in three size modes using \`data-size\`:
- **sm** - Small/compact
- **md** - Medium (default)
- **lg** - Large/comfortable

## Spacing Scale
Uses \`--ds-spacing-*\` tokens for consistent rhythm.

## Reference
[Designsystemet Sizes and Spacing](https://designsystemet.no/no/fundamentals/design-elements/sizes-and-spacing)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Size modes affect component dimensions
 */
export const SizeModes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
        <div data-size="sm">
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t('storybook.sizes.small')} (data-size="sm")
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
            <Button data-variant="primary" data-size="sm">
              {t('storybook.sizes.button')}
            </Button>
            <Textfield
              placeholder={t('storybook.sizes.inputField')}
              data-size="sm"
              style={{ flex: 1 }}
            />
            <span
              style={{
                padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                backgroundColor: 'var(--ds-color-accent-surface-default)',
                borderRadius: 'var(--ds-border-radius-sm)',
                fontSize: 'var(--ds-font-size-sm)',
              }}
            >
              {t('storybook.sizes.tag')}
            </span>
          </div>
        </div>

        <div data-size="md">
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t('storybook.sizes.medium')} (data-size="md") - {t('storybook.sizes.default')}
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
            <Button data-variant="primary" data-size="md">
              {t('storybook.sizes.button')}
            </Button>
            <Textfield
              placeholder={t('storybook.sizes.inputField')}
              data-size="md"
              style={{ flex: 1 }}
            />
            <span
              style={{
                padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                backgroundColor: 'var(--ds-color-accent-surface-default)',
                borderRadius: 'var(--ds-border-radius-sm)',
                fontSize: 'var(--ds-font-size-sm)',
              }}
            >
              {t('storybook.sizes.tag')}
            </span>
          </div>
        </div>

        <div data-size="lg">
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t('storybook.sizes.large')} (data-size="lg")
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
            <Button data-variant="primary" data-size="lg">
              {t('storybook.sizes.button')}
            </Button>
            <Textfield
              placeholder={t('storybook.sizes.inputField')}
              data-size="lg"
              style={{ flex: 1 }}
            />
            <span
              style={{
                padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                backgroundColor: 'var(--ds-color-accent-surface-default)',
                borderRadius: 'var(--ds-border-radius-sm)',
                fontSize: 'var(--ds-font-size-sm)',
              }}
            >
              {t('storybook.sizes.tag')}
            </span>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Visual spacing scale
 */
export const SpacingScale: Story = {
  render: function Render() {
    const t = useT();
    const spacings = [
      { token: '0', value: '0' },
      { token: '1', value: '4px / 0.25rem' },
      { token: '2', value: '8px / 0.5rem' },
      { token: '3', value: '12px / 0.75rem' },
      { token: '4', value: '16px / 1rem' },
      { token: '5', value: '20px / 1.25rem' },
      { token: '6', value: '24px / 1.5rem' },
      { token: '7', value: '28px / 1.75rem' },
      { token: '8', value: '32px / 2rem' },
      { token: '9', value: '36px / 2.25rem' },
      { token: '10', value: '40px / 2.5rem' },
      { token: '11', value: '44px / 2.75rem' },
      { token: '12', value: 'var(--ds-spacing-12) / 3rem' },
      { token: '14', value: '56px / 3.5rem' },
      { token: '16', value: '64px / 4rem' },
      { token: '18', value: 'var(--ds-spacing-18) / 4.5rem' },
      { token: '20', value: '80px / 5rem' },
    ];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-1)' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '180px 1fr 120px',
            gap: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-2)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            fontWeight: 'var(--ds-font-weight-semibold)',
            fontSize: 'var(--ds-font-size-sm)',
          }}
        >
          <span>{t('storybook.sizes.token')}</span>
          <span>{t('storybook.sizes.visual')}</span>
          <span>{t('storybook.sizes.value')}</span>
        </div>
        {spacings.map(({ token, value }) => (
          <div
            key={token}
            style={{
              display: 'grid',
              gridTemplateColumns: '180px 1fr 120px',
              gap: 'var(--ds-spacing-2)',
              alignItems: 'center',
              padding: 'var(--ds-spacing-2)',
            }}
          >
            <code style={{ fontSize: 'var(--ds-font-size-sm)' }}>--ds-spacing-{token}</code>
            <div style={{ height: 'var(--ds-spacing-6)', display: 'flex', alignItems: 'center' }}>
              <div
                style={{
                  width: `var(--ds-spacing-${token})`,
                  height: 'var(--ds-spacing-6)',
                  backgroundColor: 'var(--ds-color-accent-base-default)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  minWidth: token === '0' ? '2px' : undefined,
                }}
              />
            </div>
            <span
              style={{
                fontSize: 'var(--ds-font-size-xs)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Spacing in practice - padding and margins
 */
export const SpacingInPractice: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t('storybook.sizes.paddingExamples')}
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', flexWrap: 'wrap' }}>
            {['2', '4', '6', '8'].map((size) => (
              <div
                key={size}
                style={{
                  backgroundColor: 'var(--ds-color-accent-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                }}
              >
                <div
                  style={{
                    padding: `var(--ds-spacing-${size})`,
                    backgroundColor: 'var(--ds-color-neutral-background-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    border: '1px dashed var(--ds-color-accent-border-default)',
                  }}
                >
                  <code style={{ fontSize: 'var(--ds-font-size-xs)' }}>
                    padding: spacing-{size}
                  </code>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t('storybook.sizes.gapExamples')}
          </Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            {['2', '4', '6'].map((size) => (
              <div key={size}>
                <code
                  style={{
                    fontSize: 'var(--ds-font-size-xs)',
                    marginBottom: 'var(--ds-spacing-1)',
                    display: 'block',
                  }}
                >
                  gap: spacing-{size}
                </code>
                <div style={{ display: 'flex', gap: `var(--ds-spacing-${size})` }}>
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      style={{
                        width: 'var(--ds-spacing-12)',
                        height: 'var(--ds-spacing-12)',
                        backgroundColor: 'var(--ds-color-accent-base-default)',
                        borderRadius: 'var(--ds-border-radius-md)',
                      }}
                    />
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
 * Component sizing tokens
 */
export const ComponentSizing: Story = {
  render: function Render() {
    const t = useT();
    const sizings = [
      { token: '0', value: '0' },
      { token: '1', value: '4px' },
      { token: '2', value: 'var(--ds-spacing-2)' },
      { token: '3', value: '12px' },
      { token: '4', value: 'var(--ds-spacing-4)' },
      { token: '5', value: '20px' },
      { token: '6', value: 'var(--ds-spacing-6)' },
      { token: '7', value: '28px' },
      { token: '8', value: 'var(--ds-spacing-8)' },
      { token: '9', value: '36px' },
      { token: '10', value: '40px' },
      { token: '11', value: 'var(--ds-spacing-11)' },
      { token: '12', value: 'var(--ds-spacing-12)' },
    ];

    return (
      <div>
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          {t('storybook.sizes.sizeTokens')} (--ds-size-*)
        </Heading>
        <Paragraph
          data-size="sm"
          style={{
            marginBottom: 'var(--ds-spacing-4)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {t('storybook.sizes.sizeTokensDescription')}
        </Paragraph>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-4)',
            alignItems: 'flex-end',
          }}
        >
          {sizings.slice(4).map(({ token, value }) => (
            <div key={token} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: `var(--ds-size-${token})`,
                  height: `var(--ds-size-${token})`,
                  backgroundColor: 'var(--ds-color-accent-base-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  marginBottom: 'var(--ds-spacing-2)',
                }}
              />
              <code style={{ fontSize: 'var(--ds-font-size-xs)', display: 'block' }}>{token}</code>
              <span
                style={{
                  fontSize: 'var(--ds-font-size-xs)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  },
};

/**
 * Semantic spacing usage
 */
export const SemanticUsage: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div>
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          {t('storybook.sizes.whenToUseWhichSpacing')}
        </Heading>

        <table
          style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--ds-font-size-sm)' }}
        >
          <thead>
            <tr style={{ backgroundColor: 'var(--ds-color-neutral-surface-hover)' }}>
              <th
                style={{
                  padding: 'var(--ds-spacing-3)',
                  textAlign: 'left',
                  borderBottom: '1px solid var(--ds-color-neutral-border-default)',
                }}
              >
                {t('storybook.sizes.useCase')}
              </th>
              <th
                style={{
                  padding: 'var(--ds-spacing-3)',
                  textAlign: 'left',
                  borderBottom: '1px solid var(--ds-color-neutral-border-default)',
                }}
              >
                {t('storybook.sizes.token')}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                {t('storybook.sizes.inlineElements')}
              </td>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <code>spacing-1, spacing-2</code>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                {t('storybook.sizes.formFieldGaps')}
              </td>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <code>spacing-3, spacing-4</code>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                {t('storybook.sizes.cardPadding')}
              </td>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <code>spacing-5, spacing-6</code>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                {t('storybook.sizes.pageSections')}
              </td>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <code>spacing-8, spacing-10</code>
              </td>
            </tr>
            <tr>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                {t('storybook.sizes.majorDivisions')}
              </td>
              <td
                style={{
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <code>spacing-12+</code>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  },
};

/**
 * Card layout example with proper spacing
 */
export const CardLayoutExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card>
        <div
          style={{
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              height: 'var(--ds-spacing-20)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ds-color-accent-text-default)',
            }}
          >
            {t('storybook.sizes.imageArea')}
          </div>

          <div style={{ padding: 'var(--ds-spacing-6)' }}>
            <Heading
              level={3}
              data-size="md"
              style={{
                marginBottom: 'var(--ds-spacing-2)',
              }}
            >
              {t('storybook.sizes.cardTitle')}
            </Heading>

            <Paragraph
              data-size="sm"
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              {t('storybook.sizes.descriptionText')}
            </Paragraph>

            <div
              style={{
                display: 'flex',
                gap: 'var(--ds-spacing-2)',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              <span
                style={{
                  padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                  backgroundColor: 'var(--ds-color-accent-surface-default)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontSize: 'var(--ds-font-size-2)',
                }}
              >
                {t('storybook.sizes.tag')} 1
              </span>
              <span
                style={{
                  padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                  backgroundColor: 'var(--ds-color-accent-surface-default)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontSize: 'var(--ds-font-size-2)',
                }}
              >
                {t('storybook.sizes.tag')} 2
              </span>
            </div>
          </div>

          <div
            style={{
              padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontSize: 'var(--ds-font-size-2)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('storybook.sizes.metaInfo')}
            </span>
            <Button data-variant="primary" data-size="sm">
              {t('storybook.examples.action')}
            </Button>
          </div>
        </div>

        <Paragraph
          data-size="xs"
          style={{ marginTop: 'var(--ds-spacing-4)', color: 'var(--ds-color-neutral-text-subtle)' }}
        >
          <strong>{t('storybook.sizes.spacingUsed')}:</strong> spacing-1 (
          {t('storybook.sizes.tags')}
          ), spacing-2 ({t('storybook.sizes.gaps')}), spacing-4 ({t('storybook.sizes.sections')}),
          spacing-6 ({t('storybook.sizes.cardPaddingLabel')})
        </Paragraph>
      </Card>
    );
  },
};

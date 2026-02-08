import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Heading, Paragraph, Label } from '../../index';

const meta: Meta = {
  title: 'Fundamentals/Typography',
  parameters: {
    docs: {
      description: {
        component: `
Typography system from Designsystemet with Digilist theme.

## Type Scale
Based on a modular scale with responsive sizing via \`data-size\` attribute.

## Font
Uses Inter font family for optimal readability.

## Reference
[Designsystemet Typography](https://designsystemet.no/no/fundamentals/design-elements/typography)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Font families used in the design system
 */
export const FontFamilies: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <Label style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t('storybook.typography.defaultFont')} (Inter)
          </Label>
          <div
            style={{
              fontFamily: 'var(--ds-font-family-default, Inter, system-ui, sans-serif)',
              fontSize: 'var(--ds-font-size-5)',
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <p style={{ marginBottom: 'var(--ds-spacing-2)' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p style={{ marginBottom: 'var(--ds-spacing-2)' }}>abcdefghijklmnopqrstuvwxyz</p>
            <p style={{ marginBottom: 'var(--ds-spacing-2)' }}>0123456789</p>
            <p>{t('storybook.typography.samplePhrase')}</p>
          </div>
          <code
            style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-neutral-text-subtle)',
              marginTop: 'var(--ds-spacing-2)',
              display: 'block',
            }}
          >
            font-family: var(--ds-font-family-default)
          </code>
        </div>

        <div>
          <Label style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t('storybook.typography.monospaceFont')} ({t('storybook.typography.code')})
          </Label>
          <div
            style={{
              fontFamily: 'var(--ds-font-family-mono, ui-monospace, monospace)',
              fontSize: 'var(--ds-font-size-3)',
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <p style={{ marginBottom: 'var(--ds-spacing-2)' }}>ABCDEFGHIJKLMNOPQRSTUVWXYZ</p>
            <p style={{ marginBottom: 'var(--ds-spacing-2)' }}>abcdefghijklmnopqrstuvwxyz</p>
            <p style={{ marginBottom: 'var(--ds-spacing-2)' }}>0123456789</p>
            <p>{`const resourceRequest = await createResourceRequest(data);`}</p>
          </div>
          <code
            style={{
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-neutral-text-subtle)',
              marginTop: 'var(--ds-spacing-2)',
              display: 'block',
            }}
          >
            font-family: var(--ds-font-family-mono)
          </code>
        </div>

        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-info-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            borderLeft: '4px solid var(--ds-color-info-border-default)',
          }}
        >
          <Paragraph data-size="sm">
            <strong>{t('storybook.typography.note')}:</strong>{' '}
            {t('storybook.typography.fontFallbackNote')}
          </Paragraph>
        </div>
      </div>
    );
  },
};

/**
 * Font weights
 */
export const FontWeights: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
        {[
          {
            weight: 400,
            nameKey: 'storybook.tokens.regular',
            variable: '--ds-font-weight-regular',
          },
          { weight: 500, nameKey: 'storybook.tokens.medium', variable: '--ds-font-weight-medium' },
          {
            weight: 600,
            nameKey: 'storybook.tokens.semibold',
            variable: '--ds-font-weight-semibold',
          },
          { weight: 700, nameKey: 'storybook.tokens.bold', variable: '--ds-font-weight-bold' },
        ].map(({ weight, nameKey, variable }) => (
          <div
            key={weight}
            style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--ds-spacing-4)' }}
          >
            <span
              style={{
                fontWeight: weight,
                fontSize: 'var(--ds-font-size-5)',
                minWidth: 'var(--ds-size-50)',
              }}
            >
              {t(nameKey)} ({weight})
            </span>
            <code
              style={{
                fontSize: 'var(--ds-font-size-xs)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {variable}
            </code>
          </div>
        ))}
      </div>
    );
  },
};

/**
 * Heading sizes from 2xl to 2xs
 */
export const Headings: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Heading level={1} data-size="2xl">
          {t('storybook.typography.heading')} 2XL (h1)
        </Heading>
        <Heading level={1} data-size="xl">
          {t('storybook.typography.heading')} XL (h1)
        </Heading>
        <Heading level={2} data-size="lg">
          {t('storybook.typography.heading')} LG (h2)
        </Heading>
        <Heading level={2} data-size="md">
          {t('storybook.typography.heading')} MD (h2)
        </Heading>
        <Heading level={3} data-size="sm">
          {t('storybook.typography.heading')} SM (h3)
        </Heading>
        <Heading level={3} data-size="xs">
          {t('storybook.typography.heading')} XS (h3)
        </Heading>
        <Heading level={4} data-size="2xs">
          {t('storybook.typography.heading')} 2XS (h4)
        </Heading>
      </div>
    );
  },
};

/**
 * Body text variants
 */
export const BodyText: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-4)',
          maxWidth: 'var(--ds-size-150)',
        }}
      >
        <div>
          <Label>{t('storybook.typography.bodyXL')}</Label>
          <Paragraph data-size="xl">{t('storybook.typography.bodyXLDescription')}</Paragraph>
        </div>
        <div>
          <Label>{t('storybook.typography.bodyLG')}</Label>
          <Paragraph data-size="lg">{t('storybook.typography.bodyLGDescription')}</Paragraph>
        </div>
        <div>
          <Label>
            {t('storybook.typography.bodyMD')} ({t('storybook.sizes.default')})
          </Label>
          <Paragraph data-size="md">{t('storybook.typography.bodyMDDescription')}</Paragraph>
        </div>
        <div>
          <Label>{t('storybook.typography.bodySM')}</Label>
          <Paragraph data-size="sm">{t('storybook.typography.bodySMDescription')}</Paragraph>
        </div>
        <div>
          <Label>{t('storybook.typography.bodyXS')}</Label>
          <Paragraph data-size="xs">{t('storybook.typography.bodyXSDescription')}</Paragraph>
        </div>
      </div>
    );
  },
};

/**
 * Paragraph variants (short vs long)
 */
export const ParagraphVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-6)',
          maxWidth: 'var(--ds-size-175)',
        }}
      >
        <div>
          <Label style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t('storybook.typography.short')} ({t('storybook.typography.compactLineHeight')})
          </Label>
          <Paragraph variant="short">{t('storybook.typography.shortVariantDescription')}</Paragraph>
        </div>
        <div>
          <Label style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            {t('storybook.typography.long')} ({t('storybook.typography.relaxedLineHeight')})
          </Label>
          <Paragraph variant="long">{t('storybook.typography.longVariantDescription')}</Paragraph>
        </div>
      </div>
    );
  },
};

/**
 * Labels and form typography
 */
export const FormTypography: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-4)',
          maxWidth: 'var(--ds-size-100)',
        }}
      >
        <div>
          <Label data-size="lg">{t('storybook.typography.largeLabel')}</Label>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {t('storybook.typography.descriptionText')}
          </Paragraph>
        </div>
        <div>
          <Label data-size="md">
            {t('storybook.typography.mediumLabel')} ({t('storybook.sizes.default')})
          </Label>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {t('storybook.typography.helperText')}
          </Paragraph>
        </div>
        <div>
          <Label data-size="sm">{t('storybook.typography.smallLabel')}</Label>
          <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {t('storybook.typography.compactHelperText')}
          </Paragraph>
        </div>
        <div>
          <Label>{t('storybook.typography.fieldWithError')}</Label>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
            {t('storybook.patterns.requiredField')}
          </Paragraph>
        </div>
      </div>
    );
  },
};

/**
 * Responsive sizes via data-size attribute
 */
export const ResponsiveSizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div
          data-size="sm"
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Heading level={3} data-size="sm">
            {t('storybook.typography.smallSizeContext')}
          </Heading>
          <Paragraph>{t('storybook.typography.smallSizeDescription')}</Paragraph>
        </div>
        <div
          data-size="md"
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Heading level={3} data-size="sm">
            {t('storybook.typography.mediumSizeContext')} ({t('storybook.sizes.default')})
          </Heading>
          <Paragraph>{t('storybook.typography.mediumSizeDescription')}</Paragraph>
        </div>
        <div
          data-size="lg"
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Heading level={3} data-size="sm">
            {t('storybook.typography.largeSizeContext')}
          </Heading>
          <Paragraph>{t('storybook.typography.largeSizeDescription')}</Paragraph>
        </div>
      </div>
    );
  },
};

/**
 * Typography with semantic colors
 */
export const SemanticColors: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
        <Paragraph style={{ color: 'var(--ds-color-neutral-text-default)' }}>
          {t('storybook.typography.defaultTextColor')}
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {t('storybook.typography.subtleTextColor')}
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-accent-text-default)' }}>
          {t('storybook.typography.accentTextColor')}
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-success-text-default)' }}>
          {t('storybook.typography.successTextColor')}
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-warning-text-default)' }}>
          {t('storybook.typography.warningTextColor')}
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-danger-text-default)' }}>
          {t('storybook.typography.dangerTextColor')}
        </Paragraph>
      </div>
    );
  },
};

/**
 * Complete typography example
 */
export const ArticleExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <article style={{ maxWidth: 'var(--ds-size-175)' }}>
        <Heading level={1} data-size="xl" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          {t('storybook.typography.articleTitle')}
        </Heading>
        <Paragraph
          data-size="lg"
          variant="short"
          style={{
            marginBottom: 'var(--ds-spacing-6)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {t('storybook.typography.articleSubtitle')}
        </Paragraph>

        <Heading level={2} data-size="md" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          {t('storybook.typography.howItWorks')}
        </Heading>
        <Paragraph variant="long" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          {t('storybook.typography.howItWorksDescription')}
        </Paragraph>

        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          {t('storybook.typography.forRenters')}
        </Heading>
        <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          {t('storybook.typography.forRentersDescription')}
        </Paragraph>

        <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {t('storybook.typography.lastUpdated')}: {t('storybook.typography.january2026')}
        </Paragraph>
      </article>
    );
  },
};

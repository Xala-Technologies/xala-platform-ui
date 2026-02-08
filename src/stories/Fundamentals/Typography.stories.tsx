import type { Meta, StoryObj } from '@storybook/react';
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <Label style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            "Eksempel Tekst" (Inter)
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
            <p>"Eksempel Tekst"</p>
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
            "Eksempel Tekst" ("Eksempel Tekst")
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
            <strong>"Eksempel Tekst":</strong>{' '}
            "Eksempel Tekst"
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Heading level={1} data-size="2xl">
          "Eksempel Tekst" 2XL (h1)
        </Heading>
        <Heading level={1} data-size="xl">
          "Eksempel Tekst" XL (h1)
        </Heading>
        <Heading level={2} data-size="lg">
          "Eksempel Tekst" LG (h2)
        </Heading>
        <Heading level={2} data-size="md">
          "Eksempel Tekst" MD (h2)
        </Heading>
        <Heading level={3} data-size="sm">
          "Eksempel Tekst" SM (h3)
        </Heading>
        <Heading level={3} data-size="xs">
          "Eksempel Tekst" XS (h3)
        </Heading>
        <Heading level={4} data-size="2xs">
          "Eksempel Tekst" 2XS (h4)
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
          <Label>"Eksempel Tekst"</Label>
          <Paragraph data-size="xl">"Eksempel Tekst"</Paragraph>
        </div>
        <div>
          <Label>"Eksempel Tekst"</Label>
          <Paragraph data-size="lg">"Eksempel Tekst"</Paragraph>
        </div>
        <div>
          <Label>
            "Eksempel Tekst" ("Eksempel Tekst")
          </Label>
          <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
        </div>
        <div>
          <Label>"Eksempel Tekst"</Label>
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </div>
        <div>
          <Label>"Eksempel Tekst"</Label>
          <Paragraph data-size="xs">"Eksempel Tekst"</Paragraph>
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
            "Eksempel Tekst" ("Eksempel Tekst")
          </Label>
          <Paragraph variant="short">"Eksempel Tekst"</Paragraph>
        </div>
        <div>
          <Label style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            "Eksempel Tekst" ("Eksempel Tekst")
          </Label>
          <Paragraph variant="long">"Eksempel Tekst"</Paragraph>
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
          <Label data-size="lg">"Eksempel Tekst"</Label>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            "Eksempel Tekst"
          </Paragraph>
        </div>
        <div>
          <Label data-size="md">
            "Eksempel Tekst" ("Eksempel Tekst")
          </Label>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            "Eksempel Tekst"
          </Paragraph>
        </div>
        <div>
          <Label data-size="sm">"Eksempel Tekst"</Label>
          <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            "Eksempel Tekst"
          </Paragraph>
        </div>
        <div>
          <Label>"Eksempel Tekst"</Label>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
            "Eksempel Tekst"
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
            "Eksempel Tekst"
          </Heading>
          <Paragraph>"Eksempel Tekst"</Paragraph>
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
            "Eksempel Tekst" ("Eksempel Tekst")
          </Heading>
          <Paragraph>"Eksempel Tekst"</Paragraph>
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
            "Eksempel Tekst"
          </Heading>
          <Paragraph>"Eksempel Tekst"</Paragraph>
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
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
        <Paragraph style={{ color: 'var(--ds-color-neutral-text-default)' }}>
          "Eksempel Tekst"
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          "Eksempel Tekst"
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-accent-text-default)' }}>
          "Eksempel Tekst"
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-success-text-default)' }}>
          "Eksempel Tekst"
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-warning-text-default)' }}>
          "Eksempel Tekst"
        </Paragraph>
        <Paragraph style={{ color: 'var(--ds-color-danger-text-default)' }}>
          "Eksempel Tekst"
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
    return (
      <article style={{ maxWidth: 'var(--ds-size-175)' }}>
        <Heading level={1} data-size="xl" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          "Eksempel Tekst"
        </Heading>
        <Paragraph
          data-size="lg"
          variant="short"
          style={{
            marginBottom: 'var(--ds-spacing-6)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          "Eksempel Tekst"
        </Paragraph>

        <Heading level={2} data-size="md" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          "Eksempel Tekst"
        </Heading>
        <Paragraph variant="long" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          "Eksempel Tekst"
        </Paragraph>

        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          "Eksempel Tekst"
        </Heading>
        <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          "Eksempel Tekst"
        </Paragraph>

        <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          "Eksempel Tekst": "Eksempel Tekst"
        </Paragraph>
      </article>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Tag, Heading } from '../../index';
import {
  SparklesIcon,
  CheckmarkCircleIcon,
  ExclamationmarkTriangleIcon,
  XMarkOctagonIcon,
  InformationSquareIcon,
} from '@navikt/aksel-icons';

/**
 * Tag component from Digdir Designsystemet.
 *
 * Tag is a label for categorization and status communication.
 *
 * @see https://designsystemet.no/en/components/docs/tag/overview
 */
const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  parameters: {
    docs: {
      description: {
        component: `
Tag is a label that can be used to categorize items or communicate progress, status, or process. Tags provide users with a quicker overview of content.

## Variants

- **Default** - Filled background (standard)
- **Outline** - Outlined border (more visible on colored backgrounds)
- **With icons** - Add visual information and context
- **Removable** - Interactive tags with remove button

## Colors

Available in all theme colors: **accent**, **brand1**, **brand2**, **brand3**, **neutral**, **success**, **warning**, **danger**, **info**.

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Categorizing and labeling items
- Showing status, type, or state
- Active filter indicators
- Metadata and attribute display
- Progress or process communication
- Keyword or topic tags

## Best Practices

### Do
- Keep text short and clear (1-3 words)
- Use consistent colors for same meanings across application
- Use icons to add visual clarity when helpful
- Choose variant based on background (outline for colored backgrounds)
- Group related tags together
- Use semantic colors (success for positive, danger for negative)

### Don't
- Don't use long text (keep under 20 characters)
- Don't use too many different colors in one context
- Don't make tags interactive unless necessary (use Button instead)
- Don't rely on color alone to convey meaning
- Don't use for critical information that must be read

## Usage Patterns

### Basic Tag
\`\`\`tsx
<Tag>Category</Tag>
\`\`\`

### Status Tags
\`\`\`tsx
<Tag data-color="success">Active</Tag>
<Tag data-color="warning">Pending</Tag>
<Tag data-color="danger">Inactive</Tag>
\`\`\`

### Tags with Icons
\`\`\`tsx
<Tag data-color="success">
  <CheckCircle aria-hidden size={16} />
  Verified
</Tag>
<Tag data-color="warning">
  <AlertTriangle aria-hidden size={16} />
  Warning
</Tag>
\`\`\`

### Outline Variant
\`\`\`tsx
<Tag variant="outline" data-color="neutral">Outlined</Tag>
\`\`\`

### Size Variants
\`\`\`tsx
<Tag data-size="sm">Small</Tag>
<Tag data-size="md">Medium</Tag>
<Tag data-size="lg">Large</Tag>
\`\`\`

## Anti-Patterns

### Anti-pattern: Long Text in Tags
Tags are for short labels. Use other components for longer content.

### Anti-pattern: Too Many Colors
Using many different colors in one area creates visual confusion.

### Anti-pattern: Interactive Tags Without Proper Semantics
If tags need to be clickable, use proper button semantics or Button component.

### Anti-pattern: Color as Only Indicator
Don't rely solely on color. Include text or icons for meaning.

## Accessibility

### Screen Readers
- Tag content is read by screen readers
- Icons should have aria-hidden attribute
- Color meaning should be supplemented with text
- Context should be clear from surrounding content

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for text
- **Color not sole indicator**: Meaning conveyed through text, not just color
- **Text alternative**: Tag content provides meaning
- **Readable text**: Sufficient size and contrast
- **Touch target**: Minimum 44x44px for interactive tags

### Tags with Icons
Icons should be decorative:
\`\`\`tsx
<Tag data-color="success">
  <CheckCircle aria-hidden size={16} />
  Verified
</Tag>
\`\`\`

### Interactive Tags
If tags are interactive, use proper semantics:
\`\`\`tsx
<Tag asChild>
  <button type="button" onClick={handleRemove} aria-label="Remove category tag">
    Category
    <XIcon aria-hidden size={16} />
  </button>
</Tag>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'data-color': {
      control: 'select',
      options: [
        'accent',
        'brand1',
        'brand2',
        'brand3',
        'neutral',
        'success',
        'warning',
        'danger',
        'info',
      ],
      description: 'Color variant',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    'data-size': {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Tag>Default tag</Tag>,
};

export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
      <Tag data-color="neutral">Neutral</Tag>
      <Tag data-color="success">Success</Tag>
      <Tag data-color="warning">Warning</Tag>
      <Tag data-color="danger">Danger</Tag>
      <Tag data-color="info">Info</Tag>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
      <Tag data-size="sm">Small</Tag>
      <Tag data-size="md">Medium</Tag>
      <Tag data-size="lg">Large</Tag>
    </div>
  ),
};

export const StatusTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
      <Tag data-color="success">Active</Tag>
      <Tag data-color="warning">Pending</Tag>
      <Tag data-color="danger">Cancelled</Tag>
      <Tag data-color="neutral">Draft</Tag>
      <Tag data-color="info">Processing</Tag>
    </div>
  ),
};

export const CategoryTags: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
      <Tag>Meeting Room</Tag>
      <Tag>Sports Hall</Tag>
      <Tag>Outdoor</Tag>
      <Tag>Equipment</Tag>
    </div>
  ),
};

/**
 * With icons - Add visual information
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
      <Tag
        data-color="neutral"
        data-size="md"
        style={{ paddingInlineStart: 'var(--ds-spacing-1)' }}
      >
        <SparklesIcon
          fontSize="1rem"
          aria-hidden
          style={{ marginInlineEnd: 'var(--ds-spacing-1)' }}
        />
        AI-generated
      </Tag>
      <Tag
        data-color="success"
        data-size="md"
        style={{ paddingInlineStart: 'var(--ds-spacing-1)' }}
      >
        <CheckmarkCircleIcon
          fontSize="1rem"
          aria-hidden
          style={{ marginInlineEnd: 'var(--ds-spacing-1)' }}
        />
        Verified
      </Tag>
      <Tag
        data-color="warning"
        data-size="md"
        style={{ paddingInlineStart: 'var(--ds-spacing-1)' }}
      >
        <ExclamationmarkTriangleIcon
          fontSize="1rem"
          aria-hidden
          style={{ marginInlineEnd: 'var(--ds-spacing-1)' }}
        />
        Review needed
      </Tag>
      <Tag data-color="info" data-size="md" style={{ paddingInlineStart: 'var(--ds-spacing-1)' }}>
        <InformationSquareIcon
          fontSize="1rem"
          aria-hidden
          style={{ marginInlineEnd: 'var(--ds-spacing-1)' }}
        />
        New
      </Tag>
    </div>
  ),
};

/**
 * Variants - Default vs Outline
 */
export const Variants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <div>
        <h4 style={{ marginBottom: 'var(--ds-spacing-2)', fontSize: 'var(--ds-font-size-sm)' }}>
          Default (filled)
        </h4>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
          {[
            'accent',
            'brand1',
            'brand2',
            'brand3',
            'neutral',
            'success',
            'warning',
            'danger',
            'info',
          ].map((color) => (
            <Tag key={color} data-color={color as any} variant="default">
              {color}
            </Tag>
          ))}
        </div>
      </div>
      <div>
        <h4 style={{ marginBottom: 'var(--ds-spacing-2)', fontSize: 'var(--ds-font-size-sm)' }}>
          Outline
        </h4>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
          {[
            'accent',
            'brand1',
            'brand2',
            'brand3',
            'neutral',
            'success',
            'warning',
            'danger',
            'info',
          ].map((color) => (
            <Tag key={color} data-color={color as any} variant="outline">
              {color}
            </Tag>
          ))}
        </div>
      </div>
    </div>
  ),
};

/**
 * All variants overview
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Colors
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
          <Tag data-color="neutral">Neutral</Tag>
          <Tag data-color="success">Success</Tag>
          <Tag data-color="warning">Warning</Tag>
          <Tag data-color="danger">Danger</Tag>
          <Tag data-color="info">Info</Tag>
          <Tag data-color="accent">Accent</Tag>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Sizes
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
          <Tag data-size="sm">Small</Tag>
          <Tag data-size="md">Medium</Tag>
          <Tag data-size="lg">Large</Tag>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Variants
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Tag variant="default">Default</Tag>
          <Tag variant="outline">Outline</Tag>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          With Icons
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
          <Tag data-color="success" style={{ paddingInlineStart: 'var(--ds-spacing-1)' }}>
            <CheckmarkCircleIcon
              fontSize="1rem"
              aria-hidden
              style={{ marginInlineEnd: 'var(--ds-spacing-1)' }}
            />
            Verified
          </Tag>
          <Tag data-color="neutral" style={{ paddingInlineStart: 'var(--ds-spacing-1)' }}>
            <SparklesIcon
              fontSize="1rem"
              aria-hidden
              style={{ marginInlineEnd: 'var(--ds-spacing-1)' }}
            />
            AI-generated
          </Tag>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Status Examples
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
          <Tag data-color="success">Active</Tag>
          <Tag data-color="warning">Pending</Tag>
          <Tag data-color="danger">Cancelled</Tag>
          <Tag data-color="neutral">Draft</Tag>
          <Tag data-color="info">Processing</Tag>
        </div>
      </div>
    </div>
  ),
};

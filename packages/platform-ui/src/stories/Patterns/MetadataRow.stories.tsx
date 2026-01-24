/**
 * MetadataRow Stories
 *
 * Horizontal row of key-value metadata items with icons and separators.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { MetadataRow, MetadataRowInline, type MetadataRowProps } from '../../patterns/MetadataRow';
import type { MetadataItem } from '../../patterns/types';

const meta: Meta<typeof MetadataRow> = {
  title: 'Patterns/MetadataRow',
  component: MetadataRow,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## MetadataRow

A horizontal row of key-value metadata items with optional icons and separators.

### Features
- Size variants (sm, md, lg)
- Optional icons per item
- Custom separators
- Show/hide labels
- Max visible with overflow indicator
- Two variants: chip-style and inline

### Usage

\`\`\`tsx
<MetadataRow
  items={[
    { id: '1', label: 'Capacity', value: '25 people' },
    { id: '2', label: 'Area', value: '120 m²' },
    { id: '3', label: 'Duration', value: '2 hours' },
  ]}
  size="md"
  separator="•"
/>
\`\`\`

### Accessibility
- Uses semantic list markup (role="list", role="listitem")
- Title attributes for hover context
- Separators marked as aria-hidden
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '600px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetadataRow>;

// =============================================================================
// Sample Data
// =============================================================================

const basicMetadata: MetadataItem[] = [
  { id: '1', label: 'Capacity', value: '25 people' },
  { id: '2', label: 'Area', value: '120 m²' },
  { id: '3', label: 'Floor', value: '3rd' },
];

const resourceMetadata: MetadataItem[] = [
  { id: '1', label: 'Type', value: 'Meeting Room' },
  { id: '2', label: 'Capacity', value: '12 seats' },
  { id: '3', label: 'Location', value: 'Building A' },
  { id: '4', label: 'Floor', value: '2nd Floor' },
];

const bookingMetadata: MetadataItem[] = [
  { id: '1', label: 'Date', value: 'Jan 15, 2026' },
  { id: '2', label: 'Time', value: '09:00 - 12:00' },
  { id: '3', label: 'Duration', value: '3 hours' },
  { id: '4', label: 'Attendees', value: '8 people' },
  { id: '5', label: 'Price', value: '1,500 kr' },
];

const productMetadata: MetadataItem[] = [
  { id: '1', label: 'SKU', value: 'PRD-2026-001' },
  { id: '2', label: 'Weight', value: '2.5 kg' },
  { id: '3', label: 'Dimensions', value: '30×20×10 cm' },
  { id: '4', label: 'Color', value: 'Natural Oak' },
  { id: '5', label: 'Material', value: 'Solid Wood' },
  { id: '6', label: 'Origin', value: 'Norway' },
];

const statsMetadata: MetadataItem[] = [
  { id: '1', label: 'Views', value: '1,234' },
  { id: '2', label: 'Bookings', value: '56' },
  { id: '3', label: 'Rating', value: '4.8/5' },
  { id: '4', label: 'Reviews', value: '23' },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    items: basicMetadata,
    size: 'md',
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    items: basicMetadata,
    size: 'sm',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    items: basicMetadata,
    size: 'lg',
  },
};

export const WithLabels: Story = {
  name: 'With Labels Shown',
  args: {
    items: basicMetadata,
    size: 'md',
    showLabels: true,
  },
};

export const CustomSeparator: Story = {
  name: 'Custom Separator (Pipe)',
  args: {
    items: resourceMetadata,
    size: 'sm',
    separator: '|',
  },
};

export const DotSeparator: Story = {
  name: 'Dot Separator',
  args: {
    items: resourceMetadata,
    size: 'sm',
    separator: '•',
  },
};

export const NoSeparator: Story = {
  name: 'Default Dot Separator',
  args: {
    items: basicMetadata,
    size: 'md',
  },
};

export const WithMaxVisible: Story = {
  name: 'With Max Visible (Overflow)',
  args: {
    items: productMetadata,
    size: 'sm',
    maxVisible: 4,
  },
};

export const CustomOverflowText: Story = {
  name: 'Custom Overflow Text',
  args: {
    items: productMetadata,
    size: 'sm',
    maxVisible: 3,
    overflowText: '+{count} attributter',
  },
};

export const BookingDetails: Story = {
  name: 'Domain Example: Booking Details',
  args: {
    items: bookingMetadata,
    size: 'md',
  },
};

export const ResourceStats: Story = {
  name: 'Domain Example: Resource Stats',
  args: {
    items: statsMetadata,
    size: 'sm',
  },
};

export const ProductSpecs: Story = {
  name: 'Domain Example: Product Specs',
  args: {
    items: productMetadata,
    size: 'sm',
    maxVisible: 4,
  },
};

export const SingleItem: Story = {
  name: 'Single Item',
  args: {
    items: [{ id: '1', label: 'Status', value: 'Available' }],
    size: 'md',
  },
};

export const EmptyState: Story = {
  name: 'Empty (No Items)',
  args: {
    items: [],
    size: 'md',
  },
};

export const AllSizes: Story = {
  name: 'Size Comparison',
  render: () => {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.sizeSmall')}
          </p>
          <MetadataRow items={basicMetadata} size="sm" />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.sizeMedium')}
          </p>
          <MetadataRow items={basicMetadata} size="md" />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.sizeLarge')}
          </p>
          <MetadataRow items={basicMetadata} size="lg" />
        </div>
      </div>
    );
  },
};

// =============================================================================
// MetadataRowInline Stories
// =============================================================================

export const InlineVariant: Story = {
  name: 'Inline Variant',
  render: () => <MetadataRowInline items={basicMetadata} size="md" separator="•" />,
};

export const InlineSmall: Story = {
  name: 'Inline Small',
  render: () => <MetadataRowInline items={resourceMetadata} size="sm" separator="•" />,
};

export const InlineWithLabels: Story = {
  name: 'Inline With Labels',
  render: () => (
    <MetadataRowInline items={basicMetadata} size="md" separator="·" showLabels={true} />
  ),
};

export const InlineWithOverflow: Story = {
  name: 'Inline With Overflow',
  render: () => (
    <MetadataRowInline
      items={productMetadata}
      size="sm"
      separator="•"
      maxVisible={4}
      overflowText="+{count}"
    />
  ),
};

export const VariantComparison: Story = {
  name: 'Variant Comparison (Chip vs Inline)',
  render: () => {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.variantChip')}
          </p>
          <MetadataRow items={basicMetadata} size="sm" />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.variantInline')}
          </p>
          <MetadataRowInline items={basicMetadata} size="sm" separator="•" />
        </div>
      </div>
    );
  },
};

export const InContextUsage: Story = {
  name: 'In Context: Card Footer',
  render: () => (
    <div
      style={{
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-md)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          padding: 'var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <h3 style={{ margin: 0, marginBottom: 'var(--ds-spacing-1)' }}>Conference Room Alpha</h3>
        <p
          style={{
            margin: 0,
            color: 'var(--ds-color-neutral-text-subtle)',
            fontSize: 'var(--ds-font-size-sm)',
          }}
        >
          Large meeting room with modern amenities
        </p>
      </div>
      <div
        style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
        }}
      >
        <MetadataRowInline
          items={[
            { id: '1', label: 'Capacity', value: '25' },
            { id: '2', label: 'Floor', value: '3rd' },
            { id: '3', label: 'Area', value: '85 m²' },
          ]}
          size="sm"
          separator="•"
        />
      </div>
    </div>
  ),
};

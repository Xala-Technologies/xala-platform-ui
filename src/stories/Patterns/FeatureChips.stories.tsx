/**
 * FeatureChips Stories
 *
 * Displays feature/attribute chips with optional icons and availability states.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { FeatureChips, type FeatureChipsProps } from '../../patterns/FeatureChips';
import type { PatternFeatureItem } from '../../patterns/types';

const meta: Meta<typeof FeatureChips> = {
  title: 'Patterns/FeatureChips',
  component: FeatureChips,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FeatureChips

A pattern component for displaying feature/attribute chips with optional icons.

### Features
- Available/unavailable states with visual distinction
- Size variants (sm, md, lg)
- Layout options (horizontal, vertical, wrap)
- Expandable overflow with "show more" functionality
- i18n-ready labels

### Usage

\`\`\`tsx
<FeatureChips
  features={[
    { id: '1', label: 'WiFi', available: true },
    { id: '2', label: 'Parking', available: false },
    { id: '3', label: 'Kitchen', available: true },
  ]}
  layout="wrap"
  size="md"
  showUnavailable={true}
/>
\`\`\`

### Accessibility
- Uses semantic list markup (role="list", role="listitem")
- Proper color contrast for available/unavailable states
- Check icons indicate available features
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
type Story = StoryObj<typeof FeatureChips>;

// =============================================================================
// Sample Data
// =============================================================================

const basicFeatures: PatternFeatureItem[] = [
  { id: '1', label: 'WiFi', available: true },
  { id: '2', label: 'Projector', available: true },
  { id: '3', label: 'Whiteboard', available: true },
  { id: '4', label: 'Coffee Machine', available: true },
  { id: '5', label: 'Video Conferencing', available: true },
];

const mixedFeatures: PatternFeatureItem[] = [
  { id: '1', label: 'WiFi', available: true },
  { id: '2', label: 'Parking', available: false },
  { id: '3', label: 'Kitchen', available: true },
  { id: '4', label: 'Air Conditioning', available: true },
  { id: '5', label: 'Accessibility', available: true },
  { id: '6', label: 'Shower', available: false },
  { id: '7', label: 'Storage', available: true },
];

const venueFeatures: PatternFeatureItem[] = [
  { id: '1', label: 'Stage', available: true },
  { id: '2', label: 'Sound System', available: true },
  { id: '3', label: 'Lighting Rig', available: true },
  { id: '4', label: 'Green Room', available: true },
  { id: '5', label: 'Catering Kitchen', available: true },
  { id: '6', label: 'Backstage Access', available: true },
  { id: '7', label: 'Loading Dock', available: true },
  { id: '8', label: 'VIP Lounge', available: false },
  { id: '9', label: 'Outdoor Area', available: false },
  { id: '10', label: 'Streaming Equipment', available: true },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    features: basicFeatures,
    layout: 'wrap',
    size: 'sm',
  },
};

export const MediumSize: Story = {
  name: 'Medium Size',
  args: {
    features: basicFeatures,
    layout: 'wrap',
    size: 'md',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    features: basicFeatures,
    layout: 'wrap',
    size: 'lg',
  },
};

export const HorizontalLayout: Story = {
  name: 'Horizontal Layout',
  args: {
    features: basicFeatures.slice(0, 4),
    layout: 'horizontal',
    size: 'sm',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '800px', overflowX: 'auto' }}>
        <Story />
      </div>
    ),
  ],
};

export const VerticalLayout: Story = {
  name: 'Vertical Layout',
  args: {
    features: basicFeatures.slice(0, 5),
    layout: 'vertical',
    size: 'md',
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '200px' }}>
        <Story />
      </div>
    ),
  ],
};

export const WithUnavailable: Story = {
  name: 'With Unavailable Features',
  args: {
    features: mixedFeatures,
    layout: 'wrap',
    size: 'sm',
    showUnavailable: true,
  },
};

export const OnlyAvailable: Story = {
  name: 'Only Available Features',
  args: {
    features: mixedFeatures,
    layout: 'wrap',
    size: 'sm',
    showUnavailable: false,
  },
};

export const WithMaxVisible: Story = {
  name: 'With Max Visible (Expandable)',
  args: {
    features: venueFeatures,
    layout: 'wrap',
    size: 'sm',
    maxVisible: 5,
    showUnavailable: true,
  },
};

export const CustomLabels: Story = {
  name: 'Custom Labels (i18n)',
  args: {
    features: venueFeatures,
    layout: 'wrap',
    size: 'sm',
    maxVisible: 4,
    showUnavailable: true,
    labels: {
      showMore: 'Vis {count} til',
      showLess: 'Vis mindre',
    },
  },
};

export const VenueAmenities: Story = {
  name: 'Domain Example: Venue Amenities',
  args: {
    features: venueFeatures,
    layout: 'wrap',
    size: 'md',
    maxVisible: 6,
    showUnavailable: true,
  },
};

export const MeetingRoomFeatures: Story = {
  name: 'Domain Example: Meeting Room',
  args: {
    features: [
      { id: '1', label: 'Video Conferencing', available: true },
      { id: '2', label: 'Whiteboard', available: true },
      { id: '3', label: 'Display Screen', available: true },
      { id: '4', label: 'Sound System', available: true },
      { id: '5', label: 'Natural Light', available: true },
      { id: '6', label: 'Adjustable Lighting', available: false },
    ],
    layout: 'wrap',
    size: 'sm',
    showUnavailable: true,
  },
};

export const SingleFeature: Story = {
  name: 'Single Feature',
  args: {
    features: [{ id: '1', label: 'WiFi Available', available: true }],
    layout: 'wrap',
    size: 'md',
  },
};

export const AllSizes: Story = {
  name: 'Size Comparison',
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.sizeSmall')}
          </p>
          <FeatureChips features={basicFeatures.slice(0, 3)} size="sm" layout="wrap" />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.sizeMedium')}
          </p>
          <FeatureChips features={basicFeatures.slice(0, 3)} size="md" layout="wrap" />
        </div>
        <div>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.sizeLarge')}
          </p>
          <FeatureChips features={basicFeatures.slice(0, 3)} size="lg" layout="wrap" />
        </div>
      </div>
    );
  },
};

export const AllLayouts: Story = {
  name: 'Layout Comparison',
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.layoutWrap')}
          </p>
          <FeatureChips features={basicFeatures} layout="wrap" size="sm" />
        </div>
        <div style={{ maxWidth: '600px', overflowX: 'auto' }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.layoutHorizontal')}
          </p>
          <FeatureChips features={basicFeatures} layout="horizontal" size="sm" />
        </div>
        <div style={{ maxWidth: '200px' }}>
          <p style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
            {t('storybook.patterns.layoutVertical')}
          </p>
          <FeatureChips features={basicFeatures} layout="vertical" size="sm" />
        </div>
      </div>
    );
  },
};

export const EmptyState: Story = {
  name: 'Empty (No Features)',
  args: {
    features: [],
    layout: 'wrap',
    size: 'sm',
  },
};

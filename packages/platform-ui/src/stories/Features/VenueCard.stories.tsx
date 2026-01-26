/**
 * VenueCard Component Stories
 *
 * Demonstrates all states and variations of the pure VenueCard component.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { VenueCard } from '../../features/seasons';
import type { VenueVM } from '../../features/seasons';

const meta: Meta<typeof VenueCard> = {
  title: 'Features/Seasons/VenueCard',
  component: VenueCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pure presentational card component for displaying venue information. Fully controlled via props with no SDK or i18n dependencies.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof VenueCard>;

// =============================================================================
// Mock Data
// =============================================================================

const mockVenueFull: VenueVM = {
  id: '1',
  name: 'Community Hall',
  description: 'Large event space perfect for community gatherings, concerts, and cultural events',
  capacity: 200,
  size: 350,
  address: {
    street: 'Main Street 123',
    city: 'Oslo',
  },
  imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f29da8c8d0?w=400',
  categories: ['Events', 'Concerts', 'Meetings', 'Weddings'],
};

const mockVenueMinimal: VenueVM = {
  id: '2',
  name: 'Sports Field',
};

const mockVenueNoImage: VenueVM = {
  id: '3',
  name: 'Meeting Room A',
  description: 'Small meeting room for workshops and team meetings',
  capacity: 15,
  address: {
    street: 'Office Complex 45',
    city: 'Bergen',
  },
  categories: ['Meetings', 'Workshops'],
};

const mockVenueNoAddress: VenueVM = {
  id: '4',
  name: 'Virtual Event Space',
  description: 'Online venue for virtual events and webinars',
  capacity: 500,
  imageUrl: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400',
  categories: ['Virtual', 'Webinars'],
};

const mockVenueNoCategories: VenueVM = {
  id: '5',
  name: 'Beach Volleyball Court',
  description: 'Outdoor volleyball court by the beach',
  capacity: 20,
  address: {
    street: 'Beachfront Road 78',
    city: 'Stavanger',
  },
  imageUrl: 'https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?w=400',
};

const mockVenueLongContent: VenueVM = {
  id: '6',
  name: 'Grand Auditorium and Conference Center with State-of-the-Art Facilities',
  description:
    'An exceptionally large and versatile venue featuring cutting-edge audiovisual equipment, professional lighting systems, comfortable seating arrangements, and modern amenities suitable for conferences, presentations, theatrical performances, and large-scale corporate events',
  capacity: 800,
  size: 1200,
  address: {
    street: 'Convention Center Boulevard 456, Building A, 3rd Floor',
    city: 'Trondheim',
  },
  imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
  categories: [
    'Conferences',
    'Presentations',
    'Theater',
    'Concerts',
    'Corporate Events',
    'Exhibitions',
  ],
};

const defaultLabels = {
  capacityLabel: 'Capacity',
  applyLabel: 'Apply',
};

const norwegianLabels = {
  capacityLabel: 'Kapasitet',
  applyLabel: 'Søk',
};

// =============================================================================
// Stories - Default States
// =============================================================================

export const Default: Story = {
  args: {
    venue: mockVenueFull,
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

export const MinimalVenue: Story = {
  args: {
    venue: mockVenueMinimal,
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

export const NoImage: Story = {
  args: {
    venue: mockVenueNoImage,
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

export const NoAddress: Story = {
  args: {
    venue: mockVenueNoAddress,
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

export const NoCategories: Story = {
  args: {
    venue: mockVenueNoCategories,
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

// =============================================================================
// Stories - Variations
// =============================================================================

export const NoApplyButton: Story = {
  args: {
    venue: mockVenueFull,
    labels: defaultLabels,
    showApplyButton: false,
  },
};

export const WithApplyButtonNoCallback: Story = {
  args: {
    venue: mockVenueFull,
    labels: defaultLabels,
    showApplyButton: true,
    // No onApply callback - button won't be shown
  },
};

export const CustomMaxCategories: Story = {
  args: {
    venue: mockVenueFull,
    labels: defaultLabels,
    maxCategories: 4,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

export const SingleCategory: Story = {
  args: {
    venue: {
      ...mockVenueFull,
      categories: ['Events'],
    },
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

// =============================================================================
// Stories - Content Variations
// =============================================================================

export const LongContent: Story = {
  args: {
    venue: mockVenueLongContent,
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

export const SmallVenue: Story = {
  args: {
    venue: {
      id: '7',
      name: 'Study Room',
      description: 'Quiet space for individual study',
      capacity: 4,
      address: {
        street: 'Library Building',
        city: 'Oslo',
      },
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
      categories: ['Study'],
    },
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

export const LargeVenue: Story = {
  args: {
    venue: {
      id: '8',
      name: 'National Stadium',
      description: 'Premier sports and entertainment venue',
      capacity: 25000,
      size: 50000,
      address: {
        street: 'Stadium Avenue 1',
        city: 'Oslo',
      },
      imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=400',
      categories: ['Sports', 'Concerts', 'Events'],
    },
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

// =============================================================================
// Stories - Internationalization
// =============================================================================

export const NorwegianTranslation: Story = {
  args: {
    venue: {
      ...mockVenueFull,
      name: 'Samfunnshus',
      description:
        'Stort arrangementsrom perfekt for samfunnssamlinger, konserter og kulturarrangementer',
      categories: ['Arrangementer', 'Konserter', 'Møter', 'Bryllup'],
    },
    labels: norwegianLabels,
    onApply: (id) => console.log('Søk til lokale:', id),
  },
};

// =============================================================================
// Stories - Interactive Examples
// =============================================================================

export const InteractiveExample: Story = {
  args: {
    venue: mockVenueFull,
    labels: defaultLabels,
    onApply: (id) => {
      alert(`Applying to venue: ${id}`);
    },
  },
};

// =============================================================================
// Stories - Different Image Orientations
// =============================================================================

export const PortraitImage: Story = {
  args: {
    venue: {
      ...mockVenueFull,
      imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=400',
    },
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

export const WideImage: Story = {
  args: {
    venue: {
      ...mockVenueFull,
      imageUrl: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&h=300',
    },
    labels: defaultLabels,
    onApply: (id) => console.log('Apply to venue:', id),
  },
};

// =============================================================================
// Stories - Grid Layout Preview
// =============================================================================

export const GridLayout: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
      <VenueCard
        venue={mockVenueFull}
        labels={defaultLabels}
        onApply={(id) => console.log('Apply:', id)}
      />
      <VenueCard
        venue={mockVenueNoImage}
        labels={defaultLabels}
        onApply={(id) => console.log('Apply:', id)}
      />
      <VenueCard
        venue={mockVenueNoAddress}
        labels={defaultLabels}
        onApply={(id) => console.log('Apply:', id)}
      />
      <VenueCard
        venue={mockVenueNoCategories}
        labels={defaultLabels}
        onApply={(id) => console.log('Apply:', id)}
      />
      <VenueCard
        venue={mockVenueMinimal}
        labels={defaultLabels}
        onApply={(id) => console.log('Apply:', id)}
      />
      <VenueCard
        venue={{
          id: '9',
          name: 'Conference Room B',
          capacity: 50,
          imageUrl: 'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?w=400',
          categories: ['Meetings'],
        }}
        labels={defaultLabels}
        onApply={(id) => console.log('Apply:', id)}
      />
    </div>
  ),
};

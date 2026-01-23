import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ResourceDetailHeader } from '../../blocks/ResourceDetailHeader';

const meta: Meta<typeof ResourceDetailHeader> = {
  title: 'Blocks/ResourceDetailHeader',
  component: ResourceDetailHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ResourceDetailHeader

Header section for resource detail page showing category, title, key facts, location, and action buttons (favorite, share).

### Features
- Category badge
- Resource title
- Key facts row
- Location display
- Favorite button
- Share button
- Simple mode (capacity) or advanced mode (keyFacts)

### Usage
\`\`\`tsx
<ResourceDetailHeader
  category="Rom"
  title="Møterom 101"
  location="Storgata 1, 0155 Oslo"
  capacity={25}
  onFavorite={handleFavorite}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onFavorite: fn(),
    onShare: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic header with capacity
export const Default: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Møterom 101',
    location: 'Storgata 1, 0155 Oslo',
    capacity: 25,
    isFavorited: false,
    isAuthenticated: true,
    isFavoriteLoading: false,
  },
};

// Favorited
export const Favorited: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Møterom 101',
    location: 'Storgata 1, 0155 Oslo',
    capacity: 25,
    isFavorited: true,
    isAuthenticated: true,
    isFavoriteLoading: false,
  },
};

// With key facts
export const WithKeyFacts: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Møterom 101',
    location: 'Storgata 1, 0155 Oslo',
    keyFacts: [
      { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
      { type: 'area', label: 'Areal', value: '120 m²' },
      { type: 'duration', label: 'Varighet', value: '2 timer' },
    ],
    isFavorited: false,
    isAuthenticated: true,
    isFavoriteLoading: false,
  },
};

// With share data
export const WithShare: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Møterom 101',
    location: 'Storgata 1, 0155 Oslo',
    capacity: 25,
    isFavorited: false,
    isAuthenticated: true,
    isFavoriteLoading: false,
    shareData: {
      url: 'https://example.com/resource/1',
      title: 'Møterom 101',
      description: 'A spacious meeting room',
    },
  },
};

// Unauthenticated
export const Unauthenticated: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Møterom 101',
    location: 'Storgata 1, 0155 Oslo',
    capacity: 25,
    isFavorited: false,
    isAuthenticated: false,
    onAuthRequired: fn(),
    isFavoriteLoading: false,
  },
};

// Loading favorite
export const LoadingFavorite: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Møterom 101',
    location: 'Storgata 1, 0155 Oslo',
    capacity: 25,
    isFavorited: false,
    isAuthenticated: true,
    isFavoriteLoading: true,
  },
};

// Different resource type
export const ResourceType: Story = {
  args: {
    category: 'Ressurs',
    resourceType: 'RESOURCE',
    title: 'Projector Equipment',
    location: 'Storgata 1, 0155 Oslo',
    keyFacts: [
      { type: 'quantity', label: 'Antall', value: '5 enheter' },
      { type: 'duration', label: 'Utlånstid', value: '7 dager' },
    ],
    isFavorited: false,
    isAuthenticated: true,
    isFavoriteLoading: false,
  },
};

// Event type
export const EventType: Story = {
  args: {
    category: 'Arrangement',
    resourceType: 'EVENT',
    title: 'Workshop Event',
    location: 'Storgata 1, 0155 Oslo',
    keyFacts: [
      { type: 'capacity', label: 'Kapasitet', value: '50 personer' },
      { type: 'resourceRequestMode', label: 'Modus', value: 'Booking' },
    ],
    isFavorited: true,
    isAuthenticated: true,
    isFavoriteLoading: false,
  },
};

// Complete example
export const Complete: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Møterom 101',
    location: 'Storgata 1, 0155 Oslo',
    keyFacts: [
      { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
      { type: 'area', label: 'Areal', value: '120 m²' },
      { type: 'duration', label: 'Varighet', value: '2 timer' },
      { type: 'accessibility', label: 'Tilgjengelighet', value: 'Rullestol' },
    ],
    isFavorited: true,
    isAuthenticated: true,
    isFavoriteLoading: false,
    shareData: {
      url: 'https://example.com/resource/1',
      title: 'Møterom 101',
      description: 'A spacious meeting room perfect for team meetings',
    },
    shareUtmParams: {
      source: 'storybook',
      medium: 'web',
      campaign: 'test',
    },
  },
};

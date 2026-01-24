import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { LocationCard } from '../../blocks/LocationCard';

const meta: Meta<typeof LocationCard> = {
  title: 'Blocks/LocationCard',
  component: LocationCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## LocationCard

Card displaying location with an embedded map preview. Uses Mapbox static image for the map preview.

### Features
- Map preview with Mapbox integration
- Address display
- Google Maps link for larger map
- Customizable height
- Dark mode support
- Clickable map area

### Usage
\`\`\`tsx
<LocationCard
  address="Storgata 1, 0155 Oslo"
  latitude={59.7439}
  longitude={10.2045}
  mapboxToken="your-mapbox-token"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    height: {
      control: 'number',
      description: 'Height of the map preview',
    },
    showExpandLink: {
      control: 'boolean',
      description: 'Show "View larger map" link',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic location card
export const Default: Story = {
  args: {
    address: 'Storgata 1, 0155 Oslo',
    latitude: 59.7439,
    longitude: 10.2045,
    title: 'Lokasjon',
    height: 200,
    showExpandLink: true,
  },
};

// Without coordinates (no map)
export const WithoutCoordinates: Story = {
  args: {
    address: 'Storgata 1, 0155 Oslo',
    title: 'Lokasjon',
    height: 200,
    showExpandLink: true,
  },
};

// Without title
export const WithoutTitle: Story = {
  args: {
    address: 'Storgata 1, 0155 Oslo',
    latitude: 59.7439,
    longitude: 10.2045,
    height: 200,
    showExpandLink: true,
  },
};

// Custom height
export const CustomHeight: Story = {
  args: {
    address: 'Storgata 1, 0155 Oslo',
    latitude: 59.7439,
    longitude: 10.2045,
    title: 'Lokasjon',
    height: 300,
    showExpandLink: true,
  },
};

// Without expand link
export const WithoutExpandLink: Story = {
  args: {
    address: 'Storgata 1, 0155 Oslo',
    latitude: 59.7439,
    longitude: 10.2045,
    title: 'Lokasjon',
    height: 200,
    showExpandLink: false,
  },
};

// With map click handler
export const WithMapClick: Story = {
  args: {
    address: 'Storgata 1, 0155 Oslo',
    latitude: 59.7439,
    longitude: 10.2045,
    title: 'Lokasjon',
    height: 200,
    showExpandLink: true,
    onMapClick: fn(),
  },
};

// Tall map
export const TallMap: Story = {
  args: {
    address: 'Storgata 1, 0155 Oslo',
    latitude: 59.7439,
    longitude: 10.2045,
    title: 'Lokasjon',
    height: 400,
    showExpandLink: true,
  },
};

// Short map
export const ShortMap: Story = {
  args: {
    address: 'Storgata 1, 0155 Oslo',
    latitude: 59.7439,
    longitude: 10.2045,
    title: 'Lokasjon',
    height: 150,
    showExpandLink: true,
  },
};

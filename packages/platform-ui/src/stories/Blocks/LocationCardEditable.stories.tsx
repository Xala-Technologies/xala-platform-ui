/**
 * LocationCardEditable Stories
 *
 * Editable location card with address input and map preview.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { LocationCardEditable } from '../../blocks/LocationCardEditable';

const meta: Meta<typeof LocationCardEditable> = {
  title: 'Blocks/LocationCardEditable',
  component: LocationCardEditable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## LocationCardEditable

An editable location card with address input and optional map preview.

### Features
- Toggle between view and edit mode
- Address text input with placeholder
- Optional latitude/longitude coordinate editing
- Mapbox static map preview (requires token)
- Google Maps integration
- Dark mode support

### Usage

\`\`\`tsx
import { LocationCardEditable } from '@xala-technologies/platform-ui/blocks';

<LocationCardEditable
  address={address}
  onAddressChange={setAddress}
  latitude={59.9139}
  longitude={10.7522}
  onCoordinatesChange={(lat, lng) => setCoordinates({ lat, lng })}
  mapboxToken="your-mapbox-token"
/>
\`\`\`

### Localization

All labels are customizable via the \`labels\` prop:

\`\`\`tsx
<LocationCardEditable
  address={address}
  onAddressChange={setAddress}
  labels={{
    title: 'Location',
    addressLabel: 'Address',
    edit: 'Edit',
    save: 'Save',
    cancel: 'Cancel',
  }}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: 400, padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof LocationCardEditable>;

// =============================================================================
// Sample Data
// =============================================================================

const sampleLabelsNorwegian = {
  title: 'Lokasjon',
  addressLabel: 'Adresse',
  addressPlaceholder: 'Storgata 1, 0155 Oslo',
  coordinates: 'Koordinater',
  latitude: 'Breddegrad',
  longitude: 'Lengdegrad',
  save: 'Lagre',
  cancel: 'Avbryt',
  edit: 'Rediger',
  viewOnMap: 'Vis i kart',
  mapPlaceholder: 'Kart',
};

const sampleLabelsEnglish = {
  title: 'Location',
  addressLabel: 'Address',
  addressPlaceholder: '123 Main Street, Oslo',
  coordinates: 'Coordinates',
  latitude: 'Latitude',
  longitude: 'Longitude',
  save: 'Save',
  cancel: 'Cancel',
  edit: 'Edit',
  viewOnMap: 'View on map',
  mapPlaceholder: 'Map',
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    address: 'Stortorvet 1, 0155 Oslo',
    latitude: 59.9127,
    longitude: 10.7461,
  },
  render: function Render(args) {
    const [address, setAddress] = React.useState(args.address);
    const [lat, setLat] = React.useState(args.latitude);
    const [lng, setLng] = React.useState(args.longitude);

    return (
      <LocationCardEditable
        {...args}
        address={address}
        onAddressChange={setAddress}
        latitude={lat}
        longitude={lng}
        onCoordinatesChange={(newLat, newLng) => {
          setLat(newLat);
          setLng(newLng);
        }}
      />
    );
  },
};

export const WithoutCoordinates: Story = {
  name: 'Without Coordinates',
  args: {
    address: 'Stortorvet 1, 0155 Oslo',
  },
  render: function Render(args) {
    const [address, setAddress] = React.useState(args.address);

    return <LocationCardEditable {...args} address={address} onAddressChange={setAddress} />;
  },
};

export const EditingMode: Story = {
  name: 'Editing Mode (Default)',
  args: {
    address: '',
    defaultEditing: true,
  },
  render: function Render(args) {
    const [address, setAddress] = React.useState(args.address);
    const [lat, setLat] = React.useState<number | undefined>(undefined);
    const [lng, setLng] = React.useState<number | undefined>(undefined);

    return (
      <LocationCardEditable
        {...args}
        address={address}
        onAddressChange={setAddress}
        latitude={lat}
        longitude={lng}
        onCoordinatesChange={(newLat, newLng) => {
          setLat(newLat);
          setLng(newLng);
        }}
      />
    );
  },
};

export const Disabled: Story = {
  name: 'Disabled State',
  args: {
    address: 'Stortorvet 1, 0155 Oslo',
    latitude: 59.9127,
    longitude: 10.7461,
    disabled: true,
  },
  render: function Render(args) {
    return <LocationCardEditable {...args} onAddressChange={() => {}} />;
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (Default)',
  args: {
    address: 'Karl Johans gate 1, Oslo',
    labels: sampleLabelsNorwegian,
  },
  render: function Render(args) {
    const [address, setAddress] = React.useState(args.address);

    return (
      <LocationCardEditable
        {...args}
        address={address}
        onAddressChange={setAddress}
        defaultEditing={true}
      />
    );
  },
};

export const EnglishLabels: Story = {
  name: 'English Labels (i18n)',
  args: {
    address: 'Karl Johans gate 1, Oslo',
    labels: sampleLabelsEnglish,
  },
  render: function Render(args) {
    const [address, setAddress] = React.useState(args.address);

    return (
      <LocationCardEditable
        {...args}
        address={address}
        onAddressChange={setAddress}
        defaultEditing={true}
      />
    );
  },
};

export const EmptyAddress: Story = {
  name: 'Empty Address',
  args: {
    address: '',
  },
  render: function Render(args) {
    const [address, setAddress] = React.useState(args.address);

    return <LocationCardEditable {...args} address={address} onAddressChange={setAddress} />;
  },
};

export const CustomHeight: Story = {
  name: 'Custom Map Height',
  args: {
    address: 'Stortorvet 1, 0155 Oslo',
    latitude: 59.9127,
    longitude: 10.7461,
    height: 240,
  },
  render: function Render(args) {
    const [address, setAddress] = React.useState(args.address);

    return <LocationCardEditable {...args} address={address} onAddressChange={setAddress} />;
  },
};

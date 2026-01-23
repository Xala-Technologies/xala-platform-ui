import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { AdditionalServicesList } from '../../blocks/AdditionalServicesList';
import type { AdditionalService } from '../../types';

const meta: Meta<typeof AdditionalServicesList> = {
  title: 'Blocks/AdditionalServicesList',
  component: AdditionalServicesList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AdditionalServicesList

Professional list of add-on services with elegant cards. Services can be selectable for booking.

### Features
- Service cards with icons
- Selectable services
- Price display
- Custom titles
- Design token compliant

### Usage
\`\`\`tsx
<AdditionalServicesList
  services={services}
  selectedServices={selectedIds}
  onServiceSelect={handleSelect}
  showPrices={true}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onServiceSelect: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample services
const sampleServices: AdditionalService[] = [
  {
    id: 'catering',
    name: 'Catering',
    description: 'Professional catering service for your event',
    price: 500,
    priceUnit: 'person',
    currency: 'NOK',
  },
  {
    id: 'parking',
    name: 'Parking',
    description: 'Reserved parking space',
    price: 100,
    priceUnit: 'time',
    currency: 'NOK',
  },
  {
    id: 'tech-support',
    name: 'Technical Support',
    description: 'On-site technical support during your event',
    price: 800,
    priceUnit: 'time',
    currency: 'NOK',
  },
];

// Basic services list
export const Default: Story = {
  args: {
    services: sampleServices,
    showPrices: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <AdditionalServicesList {...args} />
    </div>
  ),
};

// With selected services
export const WithSelected: Story = {
  args: {
    services: sampleServices,
    selectedServices: ['catering', 'parking'],
    showPrices: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <AdditionalServicesList {...args} />
    </div>
  ),
};

// Without prices
export const WithoutPrices: Story = {
  args: {
    services: sampleServices,
    showPrices: false,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <AdditionalServicesList {...args} />
    </div>
  ),
};

// Custom title
export const CustomTitle: Story = {
  args: {
    services: sampleServices,
    title: 'Additional Options',
    showPrices: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <AdditionalServicesList {...args} />
    </div>
  ),
};

// No title
export const NoTitle: Story = {
  args: {
    services: sampleServices,
    title: '',
    showPrices: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <AdditionalServicesList {...args} />
    </div>
  ),
};

// Many services
export const ManyServices: Story = {
  args: {
    services: [
      ...sampleServices,
      {
        id: 'cleaning',
        name: 'Cleaning Service',
        description: 'Post-event cleaning service',
        price: 300,
        priceUnit: 'time',
        currency: 'NOK',
      },
      {
        id: 'security',
        name: 'Security',
        description: 'Security personnel for your event',
        price: 1200,
        priceUnit: 'time',
        currency: 'NOK',
      },
      {
        id: 'photography',
        name: 'Photography',
        description: 'Professional photography service',
        price: 2000,
        priceUnit: 'time',
        currency: 'NOK',
      },
    ],
    showPrices: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <AdditionalServicesList {...args} />
    </div>
  ),
};

// Empty state
export const Empty: Story = {
  args: {
    services: [],
    showPrices: true,
  },
  render: (args) => (
    <div style={{ width: '500px' }}>
      <AdditionalServicesList {...args} />
    </div>
  ),
};

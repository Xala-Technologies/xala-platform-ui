import type { Meta, StoryObj } from '@storybook/react';
import { LogisticsDetailsCard } from '../../blocks/LogisticsDetailsCard';
import type { LogisticsInfo, DetailsInfo } from '../../blocks/LogisticsDetailsCard';

const meta: Meta<typeof LogisticsDetailsCard> = {
    title: 'Blocks/LogisticsDetailsCard',
    component: LogisticsDetailsCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## LogisticsDetailsCard

Two-column card for logistics (pickup) and details (specs).
Used for equipment rentals and venues with specific requirements.

### Features
- Logistics section (pickup location, hours, delivery)
- Details section (specs, included items, policies)
- Side-by-side or stacked layout

### Accessibility
- Semantic heading hierarchy
- List structure for items
- Descriptive labels
        `,
            },
        },
    },
    argTypes: {
        layout: {
            control: 'radio',
            options: ['side-by-side', 'stacked'],
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const fullLogistics: LogisticsInfo = {
    pickupLocation: 'Hovedlager',
    pickupAddress: 'Industriveien 15, 0580 Oslo',
    pickupHours: 'Man-Fre 08:00-16:00',
    deliveryAvailable: true,
    transportInfo: 'Levering innen Oslo-området mot tillegg',
};

const fullDetails: DetailsInfo = {
    specifications: [
        'Kapasitet: 100 personer',
        'Areal: 200 kvm',
        'Takhøyde: 3,5 meter',
    ],
    includedItems: [
        'Lydanlegg',
        'Mikrofon',
        '50 stoler',
        '10 bord',
    ],
    returnDeadline: 'Samme dag innen kl 16:00',
    damagePolicy: 'Depositum kr 2000. Skader faktureres.',
};

// Full content
export const Default: Story = {
    args: {
        logistics: fullLogistics,
        details: fullDetails,
    },
    decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};

// Logistics only
export const LogisticsOnly: Story = {
    args: {
        logistics: fullLogistics,
    },
    decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

// Details only
export const DetailsOnly: Story = {
    args: {
        details: fullDetails,
    },
    decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

// Stacked layout
export const StackedLayout: Story = {
    args: {
        logistics: fullLogistics,
        details: fullDetails,
        layout: 'stacked',
    },
    decorators: [(Story) => <div style={{ width: 400 }}><Story /></div>],
};

// Minimal content
export const MinimalContent: Story = {
    args: {
        logistics: {
            pickupLocation: 'Resepsjonen',
            pickupHours: 'Alle dager 08-20',
        },
        details: {
            specifications: ['Standard utstyr'],
        },
    },
    decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};

// No delivery
export const NoDelivery: Story = {
    args: {
        logistics: {
            pickupLocation: 'Lager A3',
            pickupAddress: 'Verkstedveien 10',
            pickupHours: 'Man-Fre 10:00-15:00',
            deliveryAvailable: false,
        },
        details: {
            specifications: ['Maks vekt: 50 kg'],
            returnDeadline: 'Innen 24 timer',
        },
    },
    decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};

// English labels
export const EnglishLabels: Story = {
    args: {
        logistics: {
            pickupLocation: 'Main Warehouse',
            pickupAddress: '123 Industrial Way',
            pickupHours: 'Mon-Fri 8AM-4PM',
            deliveryAvailable: true,
        },
        details: {
            specifications: ['Capacity: 100 people'],
            includedItems: ['Sound system', 'Microphone'],
            returnDeadline: 'Same day by 4PM',
        },
        labels: {
            logisticsTitle: 'Logistics',
            detailsTitle: 'Details',
            pickupLocation: 'Pickup Location',
            pickupHours: 'Pickup Hours',
            delivery: 'Delivery',
            transport: 'Transport',
            specifications: 'Specifications',
            included: 'Included',
            returnDeadline: 'Return Deadline',
            damagePolicy: 'Damage Policy',
            deliveryAvailable: 'Delivery available',
            deliveryNotAvailable: 'Pickup only',
        },
    },
    decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};

// Equipment rental example
export const EquipmentRental: Story = {
    args: {
        logistics: {
            pickupLocation: 'Utstyrslager',
            pickupAddress: 'Kulturhuset, Inngang B',
            pickupHours: 'Man-Lør 09:00-17:00',
            deliveryAvailable: false,
        },
        details: {
            specifications: [
                'PA-anlegg 500W',
                '2x høyttalere',
                '1x mikser',
                'Alle kabler inkludert',
            ],
            includedItems: [
                'Koffert med alt utstyr',
                'Brukerveiledning',
                'Nødkontakt',
            ],
            returnDeadline: 'Neste virkedag innen kl 12:00',
            damagePolicy: 'Erstatningspris ved skade: kr 15.000',
        },
    },
    decorators: [(Story) => <div style={{ width: 600 }}><Story /></div>],
};

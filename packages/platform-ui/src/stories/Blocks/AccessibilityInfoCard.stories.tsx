import type { Meta, StoryObj } from '@storybook/react';
import {
    AccessibilityInfoCard,
    defaultAccessibilityFeatures,
    defaultAccessibilityFeaturesEn,
} from '../../blocks/AccessibilityInfoCard';
import type { AccessibilityFeature } from '../../blocks/AccessibilityInfoCard';

const meta: Meta<typeof AccessibilityInfoCard> = {
    title: 'Blocks/AccessibilityInfoCard',
    component: AccessibilityInfoCard,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## AccessibilityInfoCard

Display of universal design / accessibility features.
Shows available accessibility accommodations for venues.

### Features
- List or grid layout
- Show only available option
- Custom icons support
- Available/unavailable status

### Accessibility
- Semantic list structure
- Status via icon + text (not color-only)
- Screen reader descriptions
        `,
            },
        },
    },
    argTypes: {
        layout: {
            control: 'radio',
            options: ['list', 'grid'],
        },
        showOnlyAvailable: {
            control: 'boolean',
        },
    },
    tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const allAvailable: AccessibilityFeature[] = [
    { id: 'wheelchair', label: 'Rullestoltilgang', available: true },
    { id: 'elevator', label: 'Heis', available: true },
    { id: 'hearing_loop', label: 'Teleslynge', available: true },
    { id: 'accessible_toilet', label: 'HC-toalett', available: true },
    { id: 'parking', label: 'HC-parkering', available: true },
];

const partiallyAvailable: AccessibilityFeature[] = [
    { id: 'wheelchair', label: 'Rullestoltilgang', available: true },
    { id: 'elevator', label: 'Heis', available: true },
    { id: 'hearing_loop', label: 'Teleslynge', available: false },
    { id: 'accessible_toilet', label: 'HC-toalett', available: true },
    { id: 'parking', label: 'HC-parkering', available: false },
];

const noneAvailable: AccessibilityFeature[] = [
    { id: 'wheelchair', label: 'Rullestoltilgang', available: false },
    { id: 'elevator', label: 'Heis', available: false },
    { id: 'hearing_loop', label: 'Teleslynge', available: false },
    { id: 'accessible_toilet', label: 'HC-toalett', available: false },
    { id: 'parking', label: 'HC-parkering', available: false },
];

// Default (default features)
export const Default: Story = {
    args: {
        features: defaultAccessibilityFeatures,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// All available
export const AllAvailable: Story = {
    args: {
        features: allAvailable,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// Partially available
export const PartiallyAvailable: Story = {
    args: {
        features: partiallyAvailable,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// None available
export const NoneAvailable: Story = {
    args: {
        features: noneAvailable,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// Grid layout
export const GridLayout: Story = {
    args: {
        features: partiallyAvailable,
        layout: 'grid',
    },
    decorators: [(Story) => <div style={{ width: 480 }}><Story /></div>],
};

// Show only available
export const ShowOnlyAvailable: Story = {
    args: {
        features: partiallyAvailable,
        showOnlyAvailable: true,
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
    parameters: {
        docs: {
            description: {
                story: 'Only features that are available are shown.',
            },
        },
    },
};

// Empty state
export const EmptyState: Story = {
    args: {
        features: [],
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// English labels
export const EnglishLabels: Story = {
    args: {
        features: defaultAccessibilityFeaturesEn.map((f) => ({ ...f, available: f.id === 'wheelchair' || f.id === 'elevator' })),
        labels: {
            title: 'Accessibility',
            available: 'Available',
            notAvailable: 'Not available',
            featureAvailable: 'is available',
            featureNotAvailable: 'is not available',
        },
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

// Custom title
export const CustomTitle: Story = {
    args: {
        features: allAvailable,
        title: 'Tilgjengelighet i lokalet',
    },
    decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

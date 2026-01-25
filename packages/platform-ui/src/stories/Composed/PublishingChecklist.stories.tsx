import type { Meta, StoryObj } from '@storybook/react';
import { PublishingChecklist } from '../../composed/PublishingChecklist';
import type { ChecklistItem } from '../../composed/PublishingChecklist';

const meta: Meta<typeof PublishingChecklist> = {
  title: 'Composed/PublishingChecklist',
  component: PublishingChecklist,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PublishingChecklist

Validation checklist showing OK/Missing/Warning status for each required field.
Used in wizard publishing step to show completion status.

### Features
- Three status types: ok, missing, warning
- Optional title header
- Click handler for navigation to step
- Norwegian labels by default

### Accessibility
- Semantic list structure
- Status conveyed via StatusTag (icon + text, not color-only)
- Keyboard accessible when interactive
- Screen reader announcements for status
        `,
      },
    },
  },
  argTypes: {
    showTitle: {
      control: 'boolean',
      description: 'Show title header',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const allOkItems: ChecklistItem[] = [
  { id: 'name', label: 'Navn', status: 'ok' },
  { id: 'category', label: 'Kategori', status: 'ok' },
  { id: 'address', label: 'Adresse', status: 'ok' },
  { id: 'price', label: 'Pris', status: 'ok' },
  { id: 'images', label: 'Bilder', status: 'ok' },
];

const mixedItems: ChecklistItem[] = [
  { id: 'name', label: 'Navn', status: 'ok' },
  { id: 'category', label: 'Kategori', status: 'ok' },
  { id: 'address', label: 'Adresse', status: 'missing', description: 'Påkrevd felt' },
  { id: 'price', label: 'Pris', status: 'missing' },
  { id: 'images', label: 'Bilder', status: 'warning', description: 'Anbefalt for bedre synlighet' },
];

const allMissingItems: ChecklistItem[] = [
  { id: 'name', label: 'Navn', status: 'missing' },
  { id: 'category', label: 'Kategori', status: 'missing' },
  { id: 'address', label: 'Adresse', status: 'missing' },
  { id: 'price', label: 'Pris', status: 'missing' },
  { id: 'images', label: 'Bilder', status: 'missing' },
];

// Default with mixed status
export const Default: Story = {
  args: {
    items: mixedItems,
    showTitle: true,
  },
};

// All items OK (ready to publish)
export const AllOk: Story = {
  args: {
    items: allOkItems,
    showTitle: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'All validation items passed. Ready for publishing.',
      },
    },
  },
};

// All items missing
export const AllMissing: Story = {
  args: {
    items: allMissingItems,
    showTitle: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'All validation items are missing. Cannot publish.',
      },
    },
  },
};

// Without title
export const WithoutTitle: Story = {
  args: {
    items: mixedItems,
    showTitle: false,
  },
};

// Interactive (with click handler)
export const Interactive: Story = {
  args: {
    items: mixedItems,
    showTitle: true,
    onItemClick: (item: ChecklistItem) => {
      // eslint-disable-next-line no-console
      console.log('Navigate to step for:', item.id);
      alert(`Navigate to fix: ${item.label}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on missing/warning items to navigate to the relevant wizard step.',
      },
    },
  },
};

// English labels
export const EnglishLabels: Story = {
  args: {
    items: [
      { id: 'name', label: 'Name', status: 'ok' },
      { id: 'category', label: 'Category', status: 'ok' },
      { id: 'address', label: 'Address', status: 'missing' },
      { id: 'price', label: 'Price', status: 'warning', description: 'Recommended' },
    ],
    showTitle: true,
    labels: {
      title: 'Publishing Checklist',
      ok: 'OK',
      missing: 'Missing',
      warning: 'Recommended',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'English localization via labels prop.',
      },
    },
  },
};

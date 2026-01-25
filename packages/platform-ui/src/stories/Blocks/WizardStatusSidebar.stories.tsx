import type { Meta, StoryObj } from '@storybook/react';
import { WizardStatusSidebar } from '../../blocks/WizardStatusSidebar';
import type { StatusSection, WizardStatus } from '../../blocks/WizardStatusSidebar';

const meta: Meta<typeof WizardStatusSidebar> = {
  title: 'Blocks/WizardStatusSidebar',
  component: WizardStatusSidebar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## WizardStatusSidebar

Persistent sidebar showing wizard completion status, validation errors,
and summary of entered data. Used in multi-step admin wizards.

### Features
- Three wizard statuses: draft, incomplete, ready
- Missing items section with click navigation
- Summary section showing completed fields
- Norwegian labels by default

### Accessibility
- aria-live for status changes
- Semantic list structure
- Color + icon for status (not color-only)
- Keyboard accessible sections
        `,
      },
    },
  },
  argTypes: {
    status: {
      control: 'radio',
      options: ['draft', 'incomplete', 'ready'],
      description: 'Overall wizard status',
    },
    showSummary: {
      control: 'boolean',
      description: 'Show completed items summary',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

const incompleteSections: StatusSection[] = [
  { key: 'name', label: 'Navn', status: 'ok', value: 'Kultursalen' },
  { key: 'category', label: 'Kategori', status: 'ok', value: 'Lokaler og baner' },
  { key: 'address', label: 'Adresse', status: 'ok', value: 'Storgata 1, 0123 Oslo' },
  { key: 'price', label: 'Pris', status: 'missing' },
  { key: 'payment', label: 'Betalingsmåte', status: 'missing' },
  { key: 'images', label: 'Bilder', status: 'error', errorMessage: 'Minimum 1 bilde påkrevd' },
];

const allOkSections: StatusSection[] = [
  { key: 'name', label: 'Navn', status: 'ok', value: 'Kultursalen' },
  { key: 'category', label: 'Kategori', status: 'ok', value: 'Lokaler og baner' },
  { key: 'address', label: 'Adresse', status: 'ok', value: 'Storgata 1, 0123 Oslo' },
  { key: 'price', label: 'Pris', status: 'ok', value: '500 kr/time' },
  { key: 'payment', label: 'Betalingsmåte', status: 'ok', value: 'Kort, Vipps' },
];

const draftSections: StatusSection[] = [
  { key: 'name', label: 'Navn', status: 'missing' },
  { key: 'category', label: 'Kategori', status: 'missing' },
  { key: 'address', label: 'Adresse', status: 'missing' },
  { key: 'price', label: 'Pris', status: 'missing' },
  { key: 'payment', label: 'Betalingsmåte', status: 'missing' },
];

// Default incomplete status
export const Default: Story = {
  args: {
    title: 'Status',
    status: 'incomplete' as WizardStatus,
    sections: incompleteSections,
    showSummary: true,
  },
};

// Ready to publish
export const Ready: Story = {
  args: {
    title: 'Status',
    status: 'ready' as WizardStatus,
    sections: allOkSections,
    showSummary: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'All validation passed. Ready for publishing.',
      },
    },
  },
};

// Draft (nothing completed)
export const Draft: Story = {
  args: {
    title: 'Status',
    status: 'draft' as WizardStatus,
    sections: draftSections,
    showSummary: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Initial draft state. Nothing completed yet.',
      },
    },
  },
};

// Without summary section
export const WithoutSummary: Story = {
  args: {
    title: 'Status',
    status: 'incomplete' as WizardStatus,
    sections: incompleteSections,
    showSummary: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Only show missing items, hide the summary of completed fields.',
      },
    },
  },
};

// Interactive (with click handler)
export const Interactive: Story = {
  args: {
    title: 'Status',
    status: 'incomplete' as WizardStatus,
    sections: incompleteSections,
    showSummary: true,
    onSectionClick: (section: StatusSection) => {
      // eslint-disable-next-line no-console
      console.log('Navigate to section:', section.key);
      alert(`Navigate to: ${section.label}`);
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Click on sections to navigate to the relevant wizard step.',
      },
    },
  },
};

// English labels
export const EnglishLabels: Story = {
  args: {
    title: 'Status',
    status: 'incomplete' as WizardStatus,
    sections: [
      { key: 'name', label: 'Name', status: 'ok', value: 'Culture Hall' },
      { key: 'category', label: 'Category', status: 'ok', value: 'Venues' },
      { key: 'price', label: 'Price', status: 'missing' },
      { key: 'images', label: 'Images', status: 'error', errorMessage: 'Minimum 1 image required' },
    ],
    showSummary: true,
    labels: {
      draft: 'Draft',
      incomplete: 'Incomplete',
      ready: 'Ready to Publish',
      requiredTitle: 'Missing for Publishing',
      summaryTitle: 'Summary',
      notSet: 'Not set',
      ok: 'OK',
      missing: 'Missing',
      error: 'Error',
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

// In context (with wrapper)
export const InContext: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
      }}
    >
      <div
        style={{
          flex: 1,
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          borderRadius: 'var(--ds-border-radius-lg)',
        }}
      >
        <div
          style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            textAlign: 'center',
            padding: 'var(--ds-spacing-8)',
          }}
        >
          Main wizard content area
        </div>
      </div>
      <div style={{ width: 280 }}>
        <WizardStatusSidebar
          title="Status"
          status="incomplete"
          sections={incompleteSections}
          showSummary
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Sidebar shown in typical wizard layout context.',
      },
    },
  },
};

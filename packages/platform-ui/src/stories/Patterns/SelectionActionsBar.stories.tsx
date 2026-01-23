/**
 * SelectionActionsBar Stories
 *
 * Floating action bar component for bulk operations on selected items.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  SelectionActionsBar,
  type SelectionActionsBarProps,
  type SelectionAction,
} from '../../patterns/SelectionActionsBar';
import { Paragraph, Checkbox } from '@digdir/designsystemet-react';

const meta: Meta<typeof SelectionActionsBar> = {
  title: 'Patterns/SelectionActionsBar',
  component: SelectionActionsBar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## SelectionActionsBar

A domain-neutral floating action bar for bulk operations on selected items.

### Features
- Configurable action buttons
- Selected count display
- Clear selection action
- Position variants (top/bottom)
- Size variants (sm, md, lg)
- Animated entrance

### Usage

\`\`\`tsx
<SelectionActionsBar
  selectedCount={selectedIds.length}
  actions={[
    { id: 'publish', label: 'Publish', onClick: handlePublish },
    { id: 'delete', label: 'Delete', onClick: handleDelete, color: 'danger' },
  ]}
  onClearSelection={() => setSelectedIds([])}
/>
\`\`\`

### Accessibility
- Clear button labels
- Keyboard accessible actions
- ARIA labels for screen readers
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '400px', padding: '2rem', position: 'relative' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SelectionActionsBar>;

// =============================================================================
// Sample Icons (inline SVG)
// =============================================================================

const PublishIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 19V5" />
    <path d="m5 12 7-7 7 7" />
  </svg>
);

const ArchiveIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M21 9H3" />
    <path d="m9 14 3 3 3-3" />
  </svg>
);

const TrashIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 6h18" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

// =============================================================================
// Sample Data
// =============================================================================

const defaultActions: SelectionAction[] = [
  {
    id: 'publish',
    label: 'Publish',
    onClick: () => console.log('Publish clicked'),
    variant: 'secondary',
  },
  {
    id: 'unpublish',
    label: 'Unpublish',
    onClick: () => console.log('Unpublish clicked'),
    variant: 'secondary',
  },
  {
    id: 'archive',
    label: 'Archive',
    onClick: () => console.log('Archive clicked'),
    variant: 'secondary',
  },
  {
    id: 'delete',
    label: 'Delete',
    onClick: () => console.log('Delete clicked'),
    variant: 'primary',
    color: 'danger',
  },
];

const actionsWithIcons: SelectionAction[] = [
  {
    id: 'publish',
    label: 'Publish',
    onClick: () => {},
    variant: 'secondary',
    icon: <PublishIcon />,
  },
  {
    id: 'archive',
    label: 'Archive',
    onClick: () => {},
    variant: 'secondary',
    icon: <ArchiveIcon />,
  },
  {
    id: 'delete',
    label: 'Delete',
    onClick: () => {},
    variant: 'primary',
    color: 'danger',
    icon: <TrashIcon />,
  },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    selectedCount: 5,
    actions: defaultActions,
    onClearSelection: () => console.log('Clear selection'),
  },
};

export const WithIcons: Story = {
  name: 'With Icons',
  args: {
    selectedCount: 3,
    actions: actionsWithIcons,
    onClearSelection: () => console.log('Clear selection'),
  },
};

export const SingleAction: Story = {
  name: 'Single Action',
  args: {
    selectedCount: 12,
    actions: [
      {
        id: 'delete',
        label: 'Delete selected',
        onClick: () => console.log('Delete clicked'),
        variant: 'primary',
        color: 'danger',
        icon: <TrashIcon />,
      },
    ],
    onClearSelection: () => console.log('Clear selection'),
  },
};

export const TwoActions: Story = {
  name: 'Two Actions',
  args: {
    selectedCount: 7,
    actions: [
      {
        id: 'export',
        label: 'Export',
        onClick: () => {},
        variant: 'secondary',
        icon: <DownloadIcon />,
      },
      { id: 'delete', label: 'Delete', onClick: () => {}, variant: 'primary', color: 'danger' },
    ],
    onClearSelection: () => console.log('Clear selection'),
  },
};

export const TopPosition: Story = {
  name: 'Top Position',
  args: {
    selectedCount: 4,
    actions: defaultActions.slice(0, 3),
    onClearSelection: () => console.log('Clear selection'),
    position: 'top',
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    selectedCount: 3,
    actions: defaultActions.slice(0, 2),
    onClearSelection: () => console.log('Clear selection'),
    size: 'sm',
  },
};

export const LargeSize: Story = {
  name: 'Large Size',
  args: {
    selectedCount: 10,
    actions: defaultActions,
    onClearSelection: () => console.log('Clear selection'),
    size: 'lg',
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    selectedCount: 6,
    actions: [
      { id: 'publish', label: 'Publiser', onClick: () => {}, variant: 'secondary' },
      { id: 'archive', label: 'Arkiver', onClick: () => {}, variant: 'secondary' },
      { id: 'delete', label: 'Slett', onClick: () => {}, variant: 'primary', color: 'danger' },
    ],
    onClearSelection: () => console.log('Clear selection'),
    labels: {
      selectedCount: '{count} valgt',
      clearSelection: 'Avbryt',
    },
  },
};

export const FileManager: Story = {
  name: 'Domain Example: File Manager',
  args: {
    selectedCount: 4,
    actions: [
      {
        id: 'download',
        label: 'Download',
        onClick: () => {},
        variant: 'secondary',
        icon: <DownloadIcon />,
      },
      { id: 'move', label: 'Move to...', onClick: () => {}, variant: 'secondary' },
      { id: 'share', label: 'Share', onClick: () => {}, variant: 'secondary' },
      {
        id: 'delete',
        label: 'Delete',
        onClick: () => {},
        variant: 'primary',
        color: 'danger',
        icon: <TrashIcon />,
      },
    ],
    onClearSelection: () => console.log('Clear selection'),
    labels: {
      selectedCount: '{count} files selected',
      clearSelection: 'Cancel',
    },
  },
};

export const CmsContentManager: Story = {
  name: 'Domain Example: CMS Content',
  args: {
    selectedCount: 8,
    actions: [
      {
        id: 'publish',
        label: 'Publish',
        onClick: () => {},
        variant: 'secondary',
        icon: <PublishIcon />,
      },
      { id: 'unpublish', label: 'Unpublish', onClick: () => {}, variant: 'secondary' },
      { id: 'duplicate', label: 'Duplicate', onClick: () => {}, variant: 'secondary' },
      {
        id: 'archive',
        label: 'Archive',
        onClick: () => {},
        variant: 'secondary',
        icon: <ArchiveIcon />,
      },
    ],
    onClearSelection: () => console.log('Clear selection'),
    labels: {
      selectedCount: '{count} articles',
      clearSelection: 'Deselect all',
    },
  },
};

export const RentalObjects: Story = {
  name: 'Domain Example: Rental Objects',
  args: {
    selectedCount: 5,
    actions: [
      { id: 'publish', label: 'Publish', onClick: () => {}, variant: 'secondary' },
      { id: 'unpublish', label: 'Unpublish', onClick: () => {}, variant: 'secondary' },
      { id: 'archive', label: 'Archive', onClick: () => {}, variant: 'secondary' },
      { id: 'delete', label: 'Delete', onClick: () => {}, variant: 'primary', color: 'danger' },
    ],
    onClearSelection: () => console.log('Clear selection'),
    labels: {
      selectedCount: '{count} objects selected',
      clearSelection: 'Clear',
    },
  },
};

export const DisabledActions: Story = {
  name: 'With Disabled Actions',
  args: {
    selectedCount: 2,
    actions: [
      { id: 'publish', label: 'Publish', onClick: () => {}, variant: 'secondary' },
      { id: 'archive', label: 'Archive', onClick: () => {}, variant: 'secondary', disabled: true },
      { id: 'delete', label: 'Delete', onClick: () => {}, variant: 'primary', color: 'danger' },
    ],
    onClearSelection: () => console.log('Clear selection'),
  },
};

export const LoadingAction: Story = {
  name: 'With Loading Action',
  args: {
    selectedCount: 3,
    actions: [
      {
        id: 'publish',
        label: 'Publishing...',
        onClick: () => {},
        variant: 'secondary',
        loading: true,
      },
      { id: 'delete', label: 'Delete', onClick: () => {}, variant: 'primary', color: 'danger' },
    ],
    onClearSelection: () => console.log('Clear selection'),
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  render: () => {
    const [selectedIds, setSelectedIds] = React.useState<string[]>([]);

    const items = [
      { id: '1', name: 'Meeting Room A' },
      { id: '2', name: 'Meeting Room B' },
      { id: '3', name: 'Conference Hall' },
      { id: '4', name: 'Training Room' },
      { id: '5', name: 'Board Room' },
    ];

    const toggleSelection = (id: string) => {
      setSelectedIds((prev) => (prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]));
    };

    const handleAction = (action: string) => {
      alert(`${action} action on: ${selectedIds.join(', ')}`);
      setSelectedIds([]);
    };

    return (
      <div style={{ paddingBottom: '100px' }}>
        <Paragraph data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Select items below to see the action bar appear:
        </Paragraph>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-2)',
          }}
        >
          {items.map((item) => (
            <label
              key={item.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-3)',
                padding: 'var(--ds-spacing-3)',
                borderRadius: 'var(--ds-border-radius-md)',
                border: '1px solid var(--ds-color-neutral-border-subtle)',
                backgroundColor: selectedIds.includes(item.id)
                  ? 'var(--ds-color-accent-surface-default)'
                  : 'var(--ds-color-neutral-background-default)',
                cursor: 'pointer',
              }}
            >
              <Checkbox
                checked={selectedIds.includes(item.id)}
                onChange={() => toggleSelection(item.id)}
              />
              <span>{item.name}</span>
            </label>
          ))}
        </div>

        <SelectionActionsBar
          selectedCount={selectedIds.length}
          actions={[
            {
              id: 'publish',
              label: 'Publish',
              onClick: () => handleAction('Publish'),
              variant: 'secondary',
            },
            {
              id: 'archive',
              label: 'Archive',
              onClick: () => handleAction('Archive'),
              variant: 'secondary',
            },
            {
              id: 'delete',
              label: 'Delete',
              onClick: () => handleAction('Delete'),
              variant: 'primary',
              color: 'danger',
            },
          ]}
          onClearSelection={() => setSelectedIds([])}
        />
      </div>
    );
  },
};

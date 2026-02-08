/**
 * ToggleMatrix Stories
 *
 * Matrix component for managing multiple toggle settings.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  ToggleMatrix,
  type ToggleMatrixProps,
  type ToggleMatrixRow,
  type ToggleMatrixColumn,
  type ToggleMatrixValues,
} from '../../patterns/ToggleMatrix';
import { Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof ToggleMatrix> = {
  title: 'Patterns/ToggleMatrix',
  component: ToggleMatrix,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ToggleMatrix

A domain-neutral matrix component for managing multiple toggle settings.

### Features
- Rows and columns with icons and descriptions
- Row/column select-all buttons
- Card and default variants
- Size variants (sm, md)
- Disabled states for rows/columns/cells

### Usage

\`\`\`tsx
<ToggleMatrix
  rows={[
    { id: 'bookings', label: 'Bookings', description: 'Booking notifications' },
    { id: 'updates', label: 'Updates', description: 'Product updates' },
  ]}
  columns={[
    { id: 'email', label: 'Email' },
    { id: 'push', label: 'Push' },
  ]}
  values={{
    bookings: { email: true, push: false },
    updates: { email: true, push: true },
  }}
  onChange={(rowId, colId, value) => handleChange(rowId, colId, value)}
/>
\`\`\`

### Accessibility
- Switch components are properly labeled
- Table structure for screen readers
- Select-all buttons have descriptive labels
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', maxWidth: '700px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ToggleMatrix>;

// =============================================================================
// Sample Icons (inline SVG)
// =============================================================================

const MailIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const BellIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const PhoneIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

const CalendarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const MessageIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// =============================================================================
// Sample Data
// =============================================================================

const notificationRows: ToggleMatrixRow[] = [
  {
    id: 'bookings',
    label: 'Bookings',
    description: 'Booking confirmations and reminders',
    icon: <CalendarIcon />,
  },
  {
    id: 'updates',
    label: 'Product Updates',
    description: 'New features and improvements',
    icon: <BellIcon />,
  },
  {
    id: 'marketing',
    label: 'Marketing',
    description: 'Promotional offers and deals',
    icon: <MessageIcon />,
  },
];

const notificationColumns: ToggleMatrixColumn[] = [
  { id: 'email', label: 'Email', icon: <MailIcon /> },
  { id: 'push', label: 'Push', icon: <BellIcon /> },
  { id: 'sms', label: 'SMS', icon: <PhoneIcon /> },
];

const defaultValues: ToggleMatrixValues = {
  bookings: { email: true, push: true, sms: false },
  updates: { email: true, push: false, sms: false },
  marketing: { email: false, push: false, sms: false },
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    rows: notificationRows,
    columns: notificationColumns,
    values: defaultValues,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
  },
};

export const WithTitle: Story = {
  name: 'With Title',
  args: {
    rows: notificationRows,
    columns: notificationColumns,
    values: defaultValues,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    labels: {
      title: 'Notification Preferences',
      subtitle: 'Choose how you want to receive notifications',
    },
  },
};

export const CardVariant: Story = {
  name: 'Card Variant',
  args: {
    rows: notificationRows,
    columns: notificationColumns,
    values: defaultValues,
    variant: 'card',
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    labels: {
      title: 'Notification Settings',
    },
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    rows: notificationRows,
    columns: notificationColumns,
    values: defaultValues,
    size: 'sm',
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
  },
};

export const WithRowSelectAll: Story = {
  name: 'With Row Select All',
  args: {
    rows: notificationRows,
    columns: notificationColumns,
    values: defaultValues,
    showRowSelectAll: true,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    onRowChange: (rowId, value) => console.log(`Row changed: ${rowId} = ${value}`),
    labels: {
      title: 'Notification Preferences',
    },
  },
};

export const WithColumnSelectAll: Story = {
  name: 'With Column Select All',
  args: {
    rows: notificationRows,
    columns: notificationColumns,
    values: defaultValues,
    showColumnSelectAll: true,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    onColumnChange: (colId, value) => console.log(`Column changed: ${colId} = ${value}`),
    labels: {
      title: 'Notification Preferences',
    },
  },
};

export const WithBothSelectAll: Story = {
  name: 'With Both Select All',
  args: {
    rows: notificationRows,
    columns: notificationColumns,
    values: defaultValues,
    showRowSelectAll: true,
    showColumnSelectAll: true,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    onRowChange: (rowId, value) => console.log(`Row changed: ${rowId} = ${value}`),
    onColumnChange: (colId, value) => console.log(`Column changed: ${colId} = ${value}`),
    labels: {
      title: 'Notification Preferences',
      selectAll: 'All',
      deselectAll: 'None',
    },
  },
};

export const WithDisabledRow: Story = {
  name: 'With Disabled Row',
  args: {
    rows: [...notificationRows.slice(0, 2), { ...notificationRows[2], disabled: true }],
    columns: notificationColumns,
    values: defaultValues,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    labels: {
      title: 'Notification Preferences',
      subtitle: 'Marketing notifications are disabled for your account type',
    },
  },
};

export const WithDisabledColumn: Story = {
  name: 'With Disabled Column',
  args: {
    rows: notificationRows,
    columns: [
      ...notificationColumns.slice(0, 2),
      { ...notificationColumns[2], disabled: true, description: 'Not available' },
    ],
    values: defaultValues,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    labels: {
      title: 'Notification Preferences',
    },
  },
};

export const Disabled: Story = {
  name: 'Fully Disabled',
  args: {
    rows: notificationRows,
    columns: notificationColumns,
    values: defaultValues,
    disabled: true,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    labels: {
      title: 'Notification Preferences',
      subtitle: 'Contact support to modify these settings',
    },
  },
};

export const Loading: Story = {
  name: 'Loading State',
  args: {
    rows: notificationRows,
    columns: notificationColumns,
    values: defaultValues,
    loading: true,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    labels: {
      title: 'Notification Preferences',
    },
  },
};

export const SimpleMatrix: Story = {
  name: 'Simple Matrix (No Icons)',
  args: {
    rows: [
      { id: 'feature1', label: 'Feature A' },
      { id: 'feature2', label: 'Feature B' },
      { id: 'feature3', label: 'Feature C' },
    ],
    columns: [
      { id: 'read', label: 'Read' },
      { id: 'write', label: 'Write' },
      { id: 'delete', label: 'Delete' },
    ],
    values: {
      feature1: { read: true, write: true, delete: false },
      feature2: { read: true, write: false, delete: false },
      feature3: { read: true, write: true, delete: true },
    },
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    rows: [
      { id: 'bookings', label: 'Bestillinger', description: 'Bekreftelser og påminnelser' },
      { id: 'updates', label: 'Oppdateringer', description: 'Nye funksjoner' },
      { id: 'marketing', label: 'Markedsføring', description: 'Tilbud og kampanjer' },
    ],
    columns: [
      { id: 'email', label: 'E-post', icon: <MailIcon /> },
      { id: 'push', label: 'Push', icon: <BellIcon /> },
      { id: 'sms', label: 'SMS', icon: <PhoneIcon /> },
    ],
    values: defaultValues,
    showRowSelectAll: true,
    showColumnSelectAll: true,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    onRowChange: (rowId, value) => console.log(`Row changed: ${rowId} = ${value}`),
    onColumnChange: (colId, value) => console.log(`Column changed: ${colId} = ${value}`),
    labels: {
      title: 'Varslingsinnstillinger',
      subtitle: 'Velg hvordan du vil motta varsler',
      selectAll: 'Alle',
      deselectAll: 'Ingen',
      enableAllInRow: 'Aktiver alle {row}',
      enableAllInColumn: 'Aktiver alle {column}',
    },
  },
};

export const PermissionsMatrix: Story = {
  name: 'Domain Example: Permissions',
  args: {
    rows: [
      { id: 'documents', label: 'Documents', description: 'Files and attachments' },
      { id: 'reports', label: 'Reports', description: 'Analytics and reports' },
      { id: 'settings', label: 'Settings', description: 'System configuration' },
      { id: 'users', label: 'User Management', description: 'Team member access' },
    ],
    columns: [
      { id: 'view', label: 'View' },
      { id: 'create', label: 'Create' },
      { id: 'edit', label: 'Edit' },
      { id: 'delete', label: 'Delete' },
    ],
    values: {
      documents: { view: true, create: true, edit: true, delete: false },
      reports: { view: true, create: false, edit: false, delete: false },
      settings: { view: true, create: false, edit: false, delete: false },
      users: { view: false, create: false, edit: false, delete: false },
    },
    variant: 'card',
    showRowSelectAll: true,
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    onRowChange: (rowId, value) => console.log(`Row changed: ${rowId} = ${value}`),
    labels: {
      title: 'Role Permissions',
      subtitle: 'Configure access levels for this role',
    },
  },
};

export const FeatureFlags: Story = {
  name: 'Domain Example: Feature Flags',
  args: {
    rows: [
      { id: 'dark_mode', label: 'Dark Mode', description: 'Enable dark color scheme' },
      { id: 'beta_features', label: 'Beta Features', description: 'Try new features early' },
      { id: 'analytics', label: 'Analytics', description: 'Usage data collection' },
    ],
    columns: [{ id: 'enabled', label: 'Enabled' }],
    values: {
      dark_mode: { enabled: true },
      beta_features: { enabled: false },
      analytics: { enabled: true },
    },
    size: 'sm',
    onChange: (rowId, colId, value) => console.log(`Changed: ${rowId}.${colId} = ${value}`),
    labels: {
      title: 'Feature Settings',
    },
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  render: function Render() {
    const [values, setValues] = React.useState<ToggleMatrixValues>(defaultValues);

    const handleChange = (rowId: string, colId: string, value: boolean) => {
      setValues((prev) => ({
        ...prev,
        [rowId]: {
          ...prev[rowId],
          [colId]: value,
        },
      }));
    };

    const handleRowChange = (rowId: string, value: boolean) => {
      setValues((prev) => ({
        ...prev,
        [rowId]: notificationColumns.reduce((acc, col) => ({ ...acc, [col.id]: value }), {}),
      }));
    };

    const handleColumnChange = (colId: string, value: boolean) => {
      setValues((prev) => {
        const newValues = { ...prev };
        notificationRows.forEach((row) => {
          newValues[row.id] = {
            ...newValues[row.id],
            [colId]: value,
          };
        });
        return newValues;
      });
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <ToggleMatrix
          rows={notificationRows}
          columns={notificationColumns}
          values={values}
          onChange={handleChange}
          onRowChange={handleRowChange}
          onColumnChange={handleColumnChange}
          showRowSelectAll={true}
          showColumnSelectAll={true}
          variant="card"
          labels={{
            title: 'Notification Preferences',
            subtitle: 'Changes are saved automatically',
          }}
        />

        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 600 }}>
            Current Values:
          </Paragraph>
          <pre
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-2)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {JSON.stringify(values, null, 2)}
          </pre>
        </div>
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { DataExportCard, DEFAULT_DATA_EXPORT_LABELS } from '../../blocks/gdpr/DataExportCard';
import type { GdprExportRequest } from '../../blocks/gdpr/DataExportCard';

const meta: Meta<typeof DataExportCard> = {
  title: 'Blocks/DataExportCard',
  component: DataExportCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## DataExportCard

Component for exporting user data in compliance with GDPR. Domain-agnostic - receives all data and callbacks via props.

### Features
- Request data export
- Download exported data
- Status tracking (pending, processing, completed, rejected)
- Expiry warnings
- Loading and error states

### Usage
\`\`\`tsx
<DataExportCard
  exportRequest={exportRequest}
  isLoading={false}
  isRequesting={false}
  isError={false}
  onRequestExport={handleRequest}
  onDownload={handleDownload}
  labels={labels}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// No request yet
export const NoRequest: Story = {
  args: {
    exportRequest: null,
    isLoading: false,
    isRequesting: false,
    isError: false,
    onRequestExport: fn(),
    onDownload: fn(),
    labels: DEFAULT_DATA_EXPORT_LABELS,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <DataExportCard {...args} />
      </div>
    );
  },
};

// Pending request
export const Pending: Story = {
  args: {
    exportRequest: {
      id: '1',
      status: 'pending',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    } as GdprExportRequest,
    isLoading: false,
    isRequesting: false,
    isError: false,
    onRequestExport: fn(),
    onDownload: fn(),
    labels: DEFAULT_DATA_EXPORT_LABELS,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <DataExportCard {...args} />
      </div>
    );
  },
};

// Processing request
export const Processing: Story = {
  args: {
    exportRequest: {
      id: '1',
      status: 'processing',
      requestedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    } as GdprExportRequest,
    isLoading: false,
    isRequesting: false,
    isError: false,
    onRequestExport: fn(),
    onDownload: fn(),
    labels: DEFAULT_DATA_EXPORT_LABELS,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <DataExportCard {...args} />
      </div>
    );
  },
};

// Completed request
export const Completed: Story = {
  args: {
    exportRequest: {
      id: '1',
      status: 'completed',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 29).toISOString(),
      metadata: {
        downloadUrl: 'https://example.com/export.zip',
      },
    } as GdprExportRequest,
    isLoading: false,
    isRequesting: false,
    isError: false,
    onRequestExport: fn(),
    onDownload: fn(),
    labels: DEFAULT_DATA_EXPORT_LABELS,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <DataExportCard {...args} />
      </div>
    );
  },
};

// Rejected request
export const Rejected: Story = {
  args: {
    exportRequest: {
      id: '1',
      status: 'rejected',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
      metadata: {
        rejectionReason: 'Request does not meet requirements.',
      },
    } as GdprExportRequest,
    isLoading: false,
    isRequesting: false,
    isError: false,
    onRequestExport: fn(),
    onDownload: fn(),
    labels: DEFAULT_DATA_EXPORT_LABELS,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <DataExportCard {...args} />
      </div>
    );
  },
};

// Loading state
export const Loading: Story = {
  args: {
    exportRequest: null,
    isLoading: true,
    isRequesting: false,
    isError: false,
    onRequestExport: fn(),
    onDownload: fn(),
    labels: DEFAULT_DATA_EXPORT_LABELS,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <DataExportCard {...args} />
      </div>
    );
  },
};

// Requesting state
export const Requesting: Story = {
  args: {
    exportRequest: null,
    isLoading: false,
    isRequesting: true,
    isError: false,
    onRequestExport: fn(),
    onDownload: fn(),
    labels: DEFAULT_DATA_EXPORT_LABELS,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <DataExportCard {...args} />
      </div>
    );
  },
};

// Error state
export const Error: Story = {
  args: {
    exportRequest: null,
    isLoading: false,
    isRequesting: false,
    isError: true,
    onRequestExport: fn(),
    onDownload: fn(),
    labels: DEFAULT_DATA_EXPORT_LABELS,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <DataExportCard {...args} />
      </div>
    );
  },
};

// Expiring soon
export const ExpiringSoon: Story = {
  args: {
    exportRequest: {
      id: '1',
      status: 'completed',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 25).toISOString(),
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
      metadata: {
        downloadUrl: 'https://example.com/export.zip',
      },
    } as GdprExportRequest,
    isLoading: false,
    isRequesting: false,
    isError: false,
    onRequestExport: fn(),
    onDownload: fn(),
    labels: DEFAULT_DATA_EXPORT_LABELS,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <DataExportCard {...args} />
      </div>
    );
  },
};

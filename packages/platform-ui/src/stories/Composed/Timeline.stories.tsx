import type { Meta, StoryObj } from '@storybook/react';
import { Timeline } from '../../composed/Timeline';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const meta: Meta<typeof Timeline> = {
  title: 'Composed/Timeline',
  component: Timeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Timeline

Activity feed and history timeline for audit logs, notifications, etc. Supports different item types and actors.

### Features
- Multiple item types (default, success, warning, danger, info)
- Actor avatars and names
- Timestamp formatting
- Custom icons
- Connector lines
- Metadata display

### Usage
\`\`\`tsx
<Timeline
  items={[
    {
      id: '1',
      title: 'Item created',
      timestamp: new Date(),
      type: 'success'
    }
  ]}
  showConnector={true}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    showConnector: {
      control: 'boolean',
      description: 'Show connector lines between items',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic timeline
export const Default: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Item created',
        description: 'A new item was created',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        type: 'success',
      },
      {
        id: '2',
        title: 'Item updated',
        description: 'The item was modified',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'info',
      },
      {
        id: '3',
        title: 'Item published',
        description: 'The item is now live',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: 'success',
      },
    ],
    showConnector: true,
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Success',
        description: 'Operation completed successfully',
        timestamp: new Date(),
        type: 'success',
        icon: <CheckCircle size={16} />,
      },
      {
        id: '2',
        title: 'Warning',
        description: 'Please review this item',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'warning',
        icon: <AlertCircle size={16} />,
      },
      {
        id: '3',
        title: 'Error',
        description: 'An error occurred',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: 'danger',
        icon: <XCircle size={16} />,
      },
    ],
    showConnector: true,
  },
};

// With actors
export const WithActors: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Document created',
        description: 'A new document was created',
        timestamp: new Date(Date.now() - 1000 * 60 * 10),
        type: 'success',
        actor: {
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=1',
        },
      },
      {
        id: '2',
        title: 'Document reviewed',
        description: 'The document was reviewed and approved',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        type: 'info',
        actor: {
          name: 'Jane Smith',
        },
      },
      {
        id: '3',
        title: 'Document published',
        description: 'The document is now publicly available',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        type: 'success',
        actor: {
          name: 'Bob Johnson',
          avatar: 'https://i.pravatar.cc/150?img=3',
        },
      },
    ],
    showConnector: true,
  },
};

// All types
export const AllTypes: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Default item',
        timestamp: new Date(),
        type: 'default',
      },
      {
        id: '2',
        title: 'Success item',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'success',
      },
      {
        id: '3',
        title: 'Warning item',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        type: 'warning',
      },
      {
        id: '4',
        title: 'Danger item',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        type: 'danger',
      },
      {
        id: '5',
        title: 'Info item',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
        type: 'info',
      },
    ],
    showConnector: true,
  },
};

// Without connector
export const WithoutConnector: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'Item 1',
        timestamp: new Date(),
        type: 'success',
      },
      {
        id: '2',
        title: 'Item 2',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        type: 'info',
      },
      {
        id: '3',
        title: 'Item 3',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        type: 'warning',
      },
    ],
    showConnector: false,
  },
};

// With metadata
export const WithMetadata: Story = {
  args: {
    items: [
      {
        id: '1',
        title: 'User logged in',
        description: 'User successfully authenticated',
        timestamp: new Date(),
        type: 'success',
        metadata: {
          ip: '192.168.1.1',
          device: 'Chrome on Windows',
        },
      },
      {
        id: '2',
        title: 'Password changed',
        description: 'User changed their password',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        type: 'info',
        metadata: {
          method: 'Email verification',
        },
      },
    ],
    showConnector: true,
  },
};

// Empty state
export const Empty: Story = {
  args: {
    items: [],
    emptyMessage: 'No activity yet',
    showConnector: true,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    items: [],
    loading: true,
    showConnector: true,
  },
};

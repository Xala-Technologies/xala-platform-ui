import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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

// Wrapper for default story
const DefaultDemo = () => {
  const t = useT();
  return (
    <Timeline
      items={[
        {
          id: '1',
          title: t('storybook.demo.itemCreated'),
          description: t('storybook.demo.newItemCreated'),
          timestamp: new Date(Date.now() - 1000 * 60 * 5),
          type: 'success',
        },
        {
          id: '2',
          title: t('storybook.demo.itemUpdated'),
          description: t('storybook.demo.itemModified'),
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: 'info',
        },
        {
          id: '3',
          title: t('storybook.demo.itemPublished'),
          description: t('storybook.demo.itemNowLive'),
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          type: 'success',
        },
      ]}
      showConnector={true}
    />
  );
};

// Basic timeline
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Wrapper for icons story
const WithIconsDemo = () => {
  const t = useT();
  return (
    <Timeline
      items={[
        {
          id: '1',
          title: t('storybook.story.success'),
          description: t('storybook.demo.operationSuccessful'),
          timestamp: new Date(),
          type: 'success',
          icon: <CheckCircle size={16} />,
        },
        {
          id: '2',
          title: t('storybook.demo.warning'),
          description: t('storybook.demo.pleaseReview'),
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: 'warning',
          icon: <AlertCircle size={16} />,
        },
        {
          id: '3',
          title: t('storybook.story.error'),
          description: t('storybook.demo.errorOccurred'),
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          type: 'danger',
          icon: <XCircle size={16} />,
        },
      ]}
      showConnector={true}
    />
  );
};

// With icons
export const WithIcons: Story = {
  render: function Render() {
    return <WithIconsDemo />;
  },
};

// Wrapper for actors story
const WithActorsDemo = () => {
  const t = useT();
  return (
    <Timeline
      items={[
        {
          id: '1',
          title: t('storybook.demo.documentCreated'),
          description: t('storybook.demo.newDocumentCreated'),
          timestamp: new Date(Date.now() - 1000 * 60 * 10),
          type: 'success',
          actor: {
            name: 'John Doe',
            avatar: 'https://i.pravatar.cc/150?img=1',
          },
        },
        {
          id: '2',
          title: t('storybook.demo.documentReviewed'),
          description: t('storybook.demo.documentApproved'),
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          type: 'info',
          actor: {
            name: 'Jane Smith',
          },
        },
        {
          id: '3',
          title: t('storybook.demo.documentPublished'),
          description: t('storybook.demo.documentPubliclyAvailable'),
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          type: 'success',
          actor: {
            name: 'Bob Johnson',
            avatar: 'https://i.pravatar.cc/150?img=3',
          },
        },
      ]}
      showConnector={true}
    />
  );
};

// With actors
export const WithActors: Story = {
  render: function Render() {
    return <WithActorsDemo />;
  },
};

// Wrapper for all types story
const AllTypesDemo = () => {
  const t = useT();
  return (
    <Timeline
      items={[
        {
          id: '1',
          title: t('storybook.demo.defaultItem'),
          timestamp: new Date(),
          type: 'default',
        },
        {
          id: '2',
          title: t('storybook.demo.successItem'),
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: 'success',
        },
        {
          id: '3',
          title: t('storybook.demo.warningItem'),
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          type: 'warning',
        },
        {
          id: '4',
          title: t('storybook.demo.dangerItem'),
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
          type: 'danger',
        },
        {
          id: '5',
          title: t('storybook.demo.infoItem'),
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3),
          type: 'info',
        },
      ]}
      showConnector={true}
    />
  );
};

// All types
export const AllTypes: Story = {
  render: function Render() {
    return <AllTypesDemo />;
  },
};

// Wrapper for without connector story
const WithoutConnectorDemo = () => {
  const t = useT();
  return (
    <Timeline
      items={[
        {
          id: '1',
          title: `${t('storybook.demo.item')} 1`,
          timestamp: new Date(),
          type: 'success',
        },
        {
          id: '2',
          title: `${t('storybook.demo.item')} 2`,
          timestamp: new Date(Date.now() - 1000 * 60 * 30),
          type: 'info',
        },
        {
          id: '3',
          title: `${t('storybook.demo.item')} 3`,
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          type: 'warning',
        },
      ]}
      showConnector={false}
    />
  );
};

// Without connector
export const WithoutConnector: Story = {
  render: function Render() {
    return <WithoutConnectorDemo />;
  },
};

// Wrapper for metadata story
const WithMetadataDemo = () => {
  const t = useT();
  return (
    <Timeline
      items={[
        {
          id: '1',
          title: t('storybook.demo.userLoggedIn'),
          description: t('storybook.demo.userAuthenticated'),
          timestamp: new Date(),
          type: 'success',
          metadata: {
            ip: '192.168.1.1',
            device: 'Chrome on Windows',
          },
        },
        {
          id: '2',
          title: t('storybook.demo.passwordChanged'),
          description: t('storybook.demo.userChangedPassword'),
          timestamp: new Date(Date.now() - 1000 * 60 * 60),
          type: 'info',
          metadata: {
            method: t('storybook.demo.emailVerification'),
          },
        },
      ]}
      showConnector={true}
    />
  );
};

// With metadata
export const WithMetadata: Story = {
  render: function Render() {
    return <WithMetadataDemo />;
  },
};

// Wrapper for empty story
const EmptyDemo = () => {
  const t = useT();
  return (
    <Timeline items={[]} emptyMessage={t('storybook.demo.noActivityYet')} showConnector={true} />
  );
};

// Empty state
export const Empty: Story = {
  render: function Render() {
    return <EmptyDemo />;
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

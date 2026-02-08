import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Badge, Tag, NotificationBadge } from '../../composed/Badge';
import { Button } from '@digdir/designsystemet-react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Composed/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Badge & Tag Components

Status badges, notification counts, and tags for displaying labels and counts.

### Features
- Multiple variants (default, success, warning, danger, info, accent)
- Size variants (sm, md, lg)
- Dot badge variant
- Pill shape option
- Outline variant
- Removable tags
- Notification badges with count

### Usage
\`\`\`tsx
<Badge variant="success" size="md">Active</Badge>
<Tag variant="info" removable onRemove={handleRemove}>Tag</Tag>
<NotificationBadge count={5}>
  <Button>Notifications</Button>
</NotificationBadge>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info', 'accent'],
      description: 'Badge variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Badge size',
    },
    dot: {
      control: 'boolean',
      description: 'Show as dot only',
    },
    pill: {
      control: 'boolean',
      description: 'Pill shape',
    },
    outline: {
      control: 'boolean',
      description: 'Outline variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need translations
const AllVariantsDemo = () => {
  const t = useT();
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-2)' }}>
      <Badge variant="default">"Eksempel Tekst"</Badge>
      <Badge variant="success">"Eksempel Tekst"</Badge>
      <Badge variant="warning">"Eksempel Tekst"</Badge>
      <Badge variant="danger">"Eksempel Tekst"</Badge>
      <Badge variant="info">"Eksempel Tekst"</Badge>
      <Badge variant="accent">"Eksempel Tekst"</Badge>
    </div>
  );
};

const TagDefaultDemo = () => {
  const t = useT();
  return (
    <Tag variant="default" size="md">
      "Eksempel Tekst"
    </Tag>
  );
};

const TagRemovableDemo = () => {
  const t = useT();
  return (
    <Tag variant="info" size="md" removable onRemove={fn()}>
      "Eksempel Tekst"
    </Tag>
  );
};

const TagWithIconDemo = () => {
  const t = useT();
  return (
    <Tag variant="success" size="md" icon={<CheckCircle size={14} />}>
      "Eksempel Tekst"
    </Tag>
  );
};

const NotificationBadgeDemo = () => {
  const t = useT();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <NotificationBadge count={5}>
        <Button data-color="neutral" data-size="medium">
          "Eksempel Tekst"
        </Button>
      </NotificationBadge>
      <NotificationBadge count={99}>
        <Button data-color="neutral" data-size="medium">
          "Eksempel Tekst"
        </Button>
      </NotificationBadge>
      <NotificationBadge count={150} max={99}>
        <Button data-color="neutral" data-size="medium">
          "Eksempel Tekst"
        </Button>
      </NotificationBadge>
      <NotificationBadge count={0} showZero>
        <Button data-color="neutral" data-size="medium">
          "Eksempel Tekst"
        </Button>
      </NotificationBadge>
      <NotificationBadge count={3} dot>
        <Button data-color="neutral" data-size="medium">
          "Eksempel Tekst"
        </Button>
      </NotificationBadge>
    </div>
  );
};

// Default badge
export const Default: Story = {
  args: {
    children: 'Badge',
    variant: 'default',
    size: 'md',
  },
};

// Variants
export const Success: Story = {
  args: {
    children: 'Success',
    variant: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    children: 'Warning',
    variant: 'warning',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger',
    variant: 'danger',
    size: 'md',
  },
};

export const InfoVariant: Story = {
  args: {
    children: 'Info',
    variant: 'info',
    size: 'md',
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent',
    variant: 'accent',
    size: 'md',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: 'Small',
    variant: 'default',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: 'Medium',
    variant: 'default',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    variant: 'default',
    size: 'lg',
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    children: 'With Icon',
    variant: 'success',
    size: 'md',
    icon: <CheckCircle size={14} />,
  },
};

// Dot variant
export const Dot: Story = {
  args: {
    variant: 'success',
    dot: true,
  },
};

// Pill shape
export const Pill: Story = {
  args: {
    children: 'Pill Badge',
    variant: 'accent',
    size: 'md',
    pill: true,
  },
};

// Outline variant
export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'info',
    size: 'md',
    outline: true,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: function Render() {
    return <AllVariantsDemo />;
  },
};

// Tag component
export const TagDefault: Story = {
  render: function Render() {
    return <TagDefaultDemo />;
  },
};

export const TagRemovable: Story = {
  render: function Render() {
    return <TagRemovableDemo />;
  },
};

export const TagWithIcon: Story = {
  render: function Render() {
    return <TagWithIconDemo />;
  },
};

// Notification badge
export const NotificationBadgeExample: Story = {
  render: function Render() {
    return <NotificationBadgeDemo />;
  },
};

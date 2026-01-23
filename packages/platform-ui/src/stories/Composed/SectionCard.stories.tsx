import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  SectionCard,
  SectionCardHeader,
  SectionCardContent,
  SectionCardFooter,
} from '../../composed/SectionCard';
import { Button, Paragraph } from '@digdir/designsystemet-react';
import { Settings, User, FileText } from 'lucide-react';

const meta: Meta<typeof SectionCard> = {
  title: 'Composed/SectionCard',
  component: SectionCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SectionCard

Consistent section containers for page content. Provides standardized header, content, and footer areas.

### Features
- Header with title, description, icon, and actions
- Content area
- Footer with actions
- Variants (default, outlined, elevated)
- Size variants
- Collapsible sections
- Loading state

### Usage
\`\`\`tsx
<SectionCard
  title="Section Title"
  description="Section description"
  icon={<Icon />}
  actions={<Button>Action</Button>}
>
  Content here
</SectionCard>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'elevated'],
      description: 'Card variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card size',
    },
    collapsible: {
      control: 'boolean',
      description: 'Make section collapsible',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic section card
export const Default: Story = {
  args: {
    title: 'Section Title',
    description: 'This is a section description',
    children: (
      <Paragraph data-size="sm">
        This is the content area of the section card. You can add any content here, including forms, tables, or
        other components.
      </Paragraph>
    ),
    variant: 'default',
    size: 'md',
    collapsible: false,
    loading: false,
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    title: 'Settings',
    description: 'Manage your account settings',
    icon: <Settings size={20} />,
    children: (
      <Paragraph data-size="sm">
        Settings content goes here. This section has an icon in the header.
      </Paragraph>
    ),
    variant: 'default',
    size: 'md',
    collapsible: false,
    loading: false,
  },
};

// With actions
export const WithActions: Story = {
  args: {
    title: 'User Profile',
    description: 'View and edit your profile information',
    icon: <User size={20} />,
    actions: (
      <Button onClick={fn()} data-color="accent" data-size="sm">
        Edit
      </Button>
    ),
    children: (
      <Paragraph data-size="sm">
        Profile content goes here. This section has action buttons in the header.
      </Paragraph>
    ),
    variant: 'default',
    size: 'md',
    collapsible: false,
    loading: false,
  },
};

// With footer
export const WithFooter: Story = {
  args: {
    title: 'Document',
    description: 'Document details',
    icon: <FileText size={20} />,
    children: (
      <Paragraph data-size="sm">
        Document content goes here. This section has a footer with action buttons.
      </Paragraph>
    ),
    footer: (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
        <Button onClick={fn()} data-color="neutral" data-size="sm">
          Cancel
        </Button>
        <Button onClick={fn()} data-color="accent" data-size="sm">
          Save
        </Button>
      </div>
    ),
    variant: 'default',
    size: 'md',
    collapsible: false,
    loading: false,
  },
};

// Collapsible
export const Collapsible: Story = {
  args: {
    title: 'Collapsible Section',
    description: 'Click to expand or collapse',
    children: (
      <Paragraph data-size="sm">
        This section can be collapsed and expanded. The content is hidden when collapsed.
      </Paragraph>
    ),
    variant: 'default',
    size: 'md',
    collapsible: true,
    defaultCollapsed: false,
    loading: false,
  },
};

// Variants
export const Outlined: Story = {
  args: {
    title: 'Outlined Variant',
    description: 'This card uses the outlined variant',
    children: (
      <Paragraph data-size="sm">
        The outlined variant has a transparent background with a visible border.
      </Paragraph>
    ),
    variant: 'outlined',
    size: 'md',
    collapsible: false,
    loading: false,
  },
};

export const Elevated: Story = {
  args: {
    title: 'Elevated Variant',
    description: 'This card uses the elevated variant',
    children: (
      <Paragraph data-size="sm">
        The elevated variant has a shadow for depth without a border.
      </Paragraph>
    ),
    variant: 'elevated',
    size: 'md',
    collapsible: false,
    loading: false,
  },
};

// Size variants
export const Small: Story = {
  args: {
    title: 'Small Size',
    description: 'Small section card',
    children: <Paragraph data-size="sm">Small content</Paragraph>,
    variant: 'default',
    size: 'sm',
    collapsible: false,
    loading: false,
  },
};

export const Large: Story = {
  args: {
    title: 'Large Size',
    description: 'Large section card',
    children: <Paragraph data-size="sm">Large content</Paragraph>,
    variant: 'default',
    size: 'lg',
    collapsible: false,
    loading: false,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    title: 'Loading Section',
    description: 'This section is loading',
    children: <Paragraph data-size="sm">Content</Paragraph>,
    variant: 'default',
    size: 'md',
    collapsible: false,
    loading: true,
  },
};

// Using sub-components
export const WithSubComponents: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <SectionCard variant="default" size="md">
        <SectionCardHeader
          title="Section Title"
          description="Section description"
          icon={<Settings size={20} />}
          actions={
            <Button onClick={fn()} data-color="accent" data-size="sm">
              Edit
            </Button>
          }
        />
        <SectionCardContent>
          <Paragraph data-size="sm">
            This section uses the sub-components (SectionCardHeader, SectionCardContent, SectionCardFooter) for
            better structure and styling.
          </Paragraph>
        </SectionCardContent>
        <SectionCardFooter alignment="right">
          <Button onClick={fn()} data-color="neutral" data-size="sm">
            Cancel
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="sm">
            Save
          </Button>
        </SectionCardFooter>
      </SectionCard>
    </div>
  ),
};

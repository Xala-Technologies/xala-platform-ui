import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ResourceTabs } from '../../blocks/ResourceTabs';
import { Paragraph, Heading } from '@digdir/designsystemet-react';
import { Info, Settings, FileText, Calendar } from 'lucide-react';

const meta: Meta<typeof ResourceTabs> = {
  title: 'Blocks/ResourceTabs',
  component: ResourceTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ResourceTabs

Tabbed navigation component for resource detail pages. Supports dynamic tabs based on resource type and available content.

### Features
- Dynamic tab configuration
- Tab icons
- Badge counts
- Visible/hidden tabs
- Multiple variants
- Tab content panels

### Usage
\`\`\`tsx
<ResourceTabs
  tabs={[
    { id: 'overview', label: 'Overview', content: <div>Content</div> },
    { id: 'details', label: 'Details', content: <div>Details</div> },
  ]}
  activeTab="overview"
  onTabChange={handleTabChange}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onTabChange: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'secondary', 'subtle'],
      description: 'Tab list variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic tabs
export const Default: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <Paragraph data-size="sm">
            This is the overview tab content. It contains general information about the resource.
          </Paragraph>
        ),
      },
      {
        id: 'details',
        label: 'Details',
        content: (
          <Paragraph data-size="sm">
            This is the details tab content. It contains detailed information about the resource.
          </Paragraph>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        content: (
          <Paragraph data-size="sm">
            This is the settings tab content. It contains configuration options for the resource.
          </Paragraph>
        ),
      },
    ],
    activeTab: 'overview',
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        icon: <Info size={16} />,
        content: (
          <Paragraph data-size="sm">
            Overview content with icon in the tab label.
          </Paragraph>
        ),
      },
      {
        id: 'details',
        label: 'Details',
        icon: <FileText size={16} />,
        content: (
          <Paragraph data-size="sm">
            Details content with icon.
          </Paragraph>
        ),
      },
      {
        id: 'settings',
        label: 'Settings',
        icon: <Settings size={16} />,
        content: (
          <Paragraph data-size="sm">
            Settings content with icon.
          </Paragraph>
        ),
      },
    ],
    activeTab: 'overview',
  },
};

// With badges
export const WithBadges: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        badge: 3,
        content: (
          <Paragraph data-size="sm">
            Overview tab with badge count.
          </Paragraph>
        ),
      },
      {
        id: 'details',
        label: 'Details',
        badge: 12,
        content: (
          <Paragraph data-size="sm">
            Details tab with badge count.
          </Paragraph>
        ),
      },
      {
        id: 'calendar',
        label: 'Calendar',
        badge: 'New',
        content: (
          <Paragraph data-size="sm">
            Calendar tab with text badge.
          </Paragraph>
        ),
      },
    ],
    activeTab: 'overview',
  },
};

// With icons and badges
export const WithIconsAndBadges: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        icon: <Info size={16} />,
        badge: 3,
        content: (
          <Paragraph data-size="sm">
            Overview with both icon and badge.
          </Paragraph>
        ),
      },
      {
        id: 'details',
        label: 'Details',
        icon: <FileText size={16} />,
        badge: 12,
        content: (
          <Paragraph data-size="sm">
            Details with icon and badge.
          </Paragraph>
        ),
      },
      {
        id: 'calendar',
        label: 'Calendar',
        icon: <Calendar size={16} />,
        badge: 'New',
        content: (
          <Paragraph data-size="sm">
            Calendar with icon and text badge.
          </Paragraph>
        ),
      },
    ],
    activeTab: 'overview',
  },
};

// Secondary variant
export const SecondaryVariant: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <Paragraph data-size="sm">
            Secondary variant tabs with background.
          </Paragraph>
        ),
      },
      {
        id: 'details',
        label: 'Details',
        content: (
          <Paragraph data-size="sm">
            Details content.
          </Paragraph>
        ),
      },
    ],
    activeTab: 'overview',
    variant: 'secondary',
  },
};

// Subtle variant
export const SubtleVariant: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <Paragraph data-size="sm">
            Subtle variant tabs with transparent background.
          </Paragraph>
        ),
      },
      {
        id: 'details',
        label: 'Details',
        content: (
          <Paragraph data-size="sm">
            Details content.
          </Paragraph>
        ),
      },
    ],
    activeTab: 'overview',
    variant: 'subtle',
  },
};

// With hidden tabs
export const WithHiddenTabs: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        visible: true,
        content: (
          <Paragraph data-size="sm">
            Visible overview tab.
          </Paragraph>
        ),
      },
      {
        id: 'details',
        label: 'Details',
        visible: true,
        content: (
          <Paragraph data-size="sm">
            Visible details tab.
          </Paragraph>
        ),
      },
      {
        id: 'hidden',
        label: 'Hidden',
        visible: false,
        content: (
          <Paragraph data-size="sm">
            This tab is hidden and should not appear.
          </Paragraph>
        ),
      },
    ],
    activeTab: 'overview',
  },
};

// Rich content
export const RichContent: Story = {
  args: {
    tabs: [
      {
        id: 'overview',
        label: 'Overview',
        content: (
          <div>
            <Heading level={3} data-size="sm">
              Overview Section
            </Heading>
            <Paragraph data-size="sm">
              This tab contains rich content including headings, paragraphs, and other components.
            </Paragraph>
          </div>
        ),
      },
      {
        id: 'details',
        label: 'Details',
        content: (
          <div>
            <Heading level={3} data-size="sm">
              Details Section
            </Heading>
            <Paragraph data-size="sm">
              Detailed information goes here.
            </Paragraph>
          </div>
        ),
      },
    ],
    activeTab: 'overview',
  },
};

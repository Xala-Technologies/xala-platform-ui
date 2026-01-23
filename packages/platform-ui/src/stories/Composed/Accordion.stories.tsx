import type { Meta, StoryObj } from '@storybook/react';
import { Accordion, Collapsible } from '../../composed/Accordion';
import { Paragraph } from '@digdir/designsystemet-react';
import { Info, Settings, User } from 'lucide-react';

const meta: Meta<typeof Accordion> = {
  title: 'Composed/Accordion',
  component: Accordion,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Accordion & Collapsible

Expandable content sections for organizing information. Supports single or multiple expanded items.

### Features
- Single or multiple expansion modes
- Variant styles (default, bordered, separated)
- Icon support
- Disabled state
- Keyboard navigation
- SSR-safe with 'use client' directive

### Usage
\`\`\`tsx
<Accordion
  items={[
    { id: '1', title: 'Section 1', content: <p>Content 1</p> },
    { id: '2', title: 'Section 2', content: <p>Content 2</p> },
  ]}
  allowMultiple={false}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'bordered', 'separated'],
      description: 'Visual variant',
    },
    allowMultiple: {
      control: 'boolean',
      description: 'Allow multiple items to be expanded',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample accordion items
const sampleItems = [
  {
    id: '1',
    title: 'Getting Started',
    content: (
      <Paragraph data-size="sm">
        This section contains information about getting started with the platform. Learn the basics
        and explore key features.
      </Paragraph>
    ),
    icon: <Info size={20} />,
  },
  {
    id: '2',
    title: 'User Settings',
    content: (
      <Paragraph data-size="sm">
        Manage your account settings, preferences, and personal information. Customize your
        experience to suit your needs.
      </Paragraph>
    ),
    icon: <Settings size={20} />,
  },
  {
    id: '3',
    title: 'Profile Information',
    content: (
      <Paragraph data-size="sm">
        Update your profile information, including your name, email, and other personal details.
      </Paragraph>
    ),
    icon: <User size={20} />,
  },
];

// Default accordion (single expansion)
export const Default: Story = {
  args: {
    items: sampleItems,
    allowMultiple: false,
    variant: 'default',
  },
};

// Multiple expansion
export const AllowMultiple: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
    variant: 'default',
  },
};

// Bordered variant
export const Bordered: Story = {
  args: {
    items: sampleItems,
    allowMultiple: false,
    variant: 'bordered',
  },
};

// Separated variant
export const Separated: Story = {
  args: {
    items: sampleItems,
    allowMultiple: true,
    variant: 'separated',
  },
};

// With default expanded
export const DefaultExpanded: Story = {
  args: {
    items: sampleItems,
    allowMultiple: false,
    variant: 'default',
    defaultExpanded: ['1'],
  },
};

// With disabled item
export const WithDisabled: Story = {
  args: {
    items: [
      ...sampleItems.slice(0, 2),
      {
        ...sampleItems[2],
        disabled: true,
      },
    ],
    allowMultiple: false,
    variant: 'default',
  },
};

// Collapsible component
export const CollapsibleExample: Story = {
  render: () => (
    <Collapsible title="Click to expand" defaultOpen={false}>
      <Paragraph data-size="sm">
        This is a single collapsible section. It can be used independently without the accordion
        component.
      </Paragraph>
    </Collapsible>
  ),
};

// Collapsible with icon
export const CollapsibleWithIcon: Story = {
  render: () => (
    <Collapsible title="Settings" icon={<Settings size={20} />} defaultOpen={false}>
      <Paragraph data-size="sm">
        Collapsible sections can include icons for better visual hierarchy and recognition.
      </Paragraph>
    </Collapsible>
  ),
};

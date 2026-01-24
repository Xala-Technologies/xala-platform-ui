import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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

// Sample accordion items component
const AccordionWithItems = (args: any) => {
  const t = useT();

  const sampleItems = [
    {
      id: '1',
      title: t('storybook.demo.gettingStarted'),
      content: (
        <Paragraph data-size="sm">{t('storybook.demo.gettingStartedDescription')}</Paragraph>
      ),
      icon: <Info size={20} />,
    },
    {
      id: '2',
      title: t('platform.nav.settings'),
      content: <Paragraph data-size="sm">{t('storybook.demo.settingsDescription')}</Paragraph>,
      icon: <Settings size={20} />,
    },
    {
      id: '3',
      title: t('platform.nav.profile'),
      content: <Paragraph data-size="sm">{t('storybook.demo.profileDescription')}</Paragraph>,
      icon: <User size={20} />,
    },
  ];

  return <Accordion {...args} items={args.items || sampleItems} />;
};

// Default accordion (single expansion)
export const Default: Story = {
  render: (args) => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: false,
    variant: 'default',
  },
};

// Multiple expansion
export const AllowMultiple: Story = {
  render: (args) => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: true,
    variant: 'default',
  },
};

// Bordered variant
export const Bordered: Story = {
  render: (args) => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: false,
    variant: 'bordered',
  },
};

// Separated variant
export const Separated: Story = {
  render: (args) => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: true,
    variant: 'separated',
  },
};

// With default expanded
export const DefaultExpanded: Story = {
  render: (args) => <AccordionWithItems {...args} />,
  args: {
    allowMultiple: false,
    variant: 'default',
    defaultExpanded: ['1'],
  },
};

// With disabled item
const AccordionWithDisabled = (args: any) => {
  const t = useT();

  const items = [
    {
      id: '1',
      title: t('storybook.demo.gettingStarted'),
      content: (
        <Paragraph data-size="sm">{t('storybook.demo.gettingStartedDescription')}</Paragraph>
      ),
      icon: <Info size={20} />,
    },
    {
      id: '2',
      title: t('platform.nav.settings'),
      content: <Paragraph data-size="sm">{t('storybook.demo.settingsDescription')}</Paragraph>,
      icon: <Settings size={20} />,
    },
    {
      id: '3',
      title: t('platform.nav.profile'),
      content: <Paragraph data-size="sm">{t('storybook.demo.profileDescription')}</Paragraph>,
      icon: <User size={20} />,
      disabled: true,
    },
  ];

  return <Accordion {...args} items={items} />;
};

export const WithDisabled: Story = {
  render: (args) => <AccordionWithDisabled {...args} />,
  args: {
    allowMultiple: false,
    variant: 'default',
  },
};

// Collapsible component
const CollapsibleExample = () => {
  const t = useT();
  return (
    <Collapsible title={t('storybook.demo.clickToExpand')} defaultOpen={false}>
      <Paragraph data-size="sm">{t('storybook.demo.collapsibleDescription')}</Paragraph>
    </Collapsible>
  );
};

export const CollapsibleExampleStory: Story = {
  name: 'CollapsibleExample',
  render: () => <CollapsibleExample />,
};

// Collapsible with icon
const CollapsibleWithIconExample = () => {
  const t = useT();
  return (
    <Collapsible
      title={t('platform.nav.settings')}
      icon={<Settings size={20} />}
      defaultOpen={false}
    >
      <Paragraph data-size="sm">{t('storybook.demo.collapsibleIconDescription')}</Paragraph>
    </Collapsible>
  );
};

export const CollapsibleWithIcon: Story = {
  render: () => <CollapsibleWithIconExample />,
};

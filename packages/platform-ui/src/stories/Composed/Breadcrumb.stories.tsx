import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { Breadcrumb } from '../../composed/Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Composed/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Breadcrumb

Navigation breadcrumb component for showing page hierarchy. Supports links and click handlers.

### Features
- Hierarchical navigation display
- Custom separators
- Link and onClick support
- Current page indication
- Proper ARIA labels

### Usage
\`\`\`tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Meeting Room 101' }
  ]}
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

// Wrapper for default story
const DefaultDemo = () => {
  const t = useT();
  return (
    <Breadcrumb
      items={[
        { label: t('platform.nav.home'), href: '/' },
        { label: t('storybook.demo.facilities'), href: '/facilities' },
        { label: 'Meeting Room 101' },
      ]}
    />
  );
};

// Basic breadcrumb
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Wrapper for onClick story
const WithOnClickDemo = () => {
  const t = useT();
  return (
    <Breadcrumb
      items={[
        { label: t('platform.nav.home'), onClick: fn() },
        { label: t('storybook.demo.facilities'), onClick: fn() },
        { label: 'Meeting Room 101' },
      ]}
    />
  );
};

// With onClick handlers
export const WithOnClick: Story = {
  render: function Render() {
    return <WithOnClickDemo />;
  },
};

// Wrapper for custom separator story
const CustomSeparatorDemo = () => {
  const t = useT();
  return (
    <Breadcrumb
      items={[
        { label: t('platform.nav.home'), href: '/' },
        { label: t('storybook.demo.facilities'), href: '/facilities' },
        { label: 'Meeting Room 101' },
      ]}
      separator="/"
    />
  );
};

// Custom separator
export const CustomSeparator: Story = {
  render: function Render() {
    return <CustomSeparatorDemo />;
  },
};

// Wrapper for long trail story
const LongTrailDemo = () => {
  const t = useT();
  return (
    <Breadcrumb
      items={[
        { label: t('platform.nav.home'), href: '/' },
        { label: t('storybook.demo.administration'), href: '/admin' },
        { label: t('platform.nav.settings'), href: '/admin/settings' },
        { label: t('storybook.demo.userManagement'), href: '/admin/settings/users' },
        { label: t('storybook.demo.editUser') },
      ]}
    />
  );
};

// Long breadcrumb trail
export const LongTrail: Story = {
  render: function Render() {
    return <LongTrailDemo />;
  },
};

// Wrapper for single item story
const SingleItemDemo = () => {
  const t = useT();
  return <Breadcrumb items={[{ label: t('platform.nav.home') }]} />;
};

// Single item
export const SingleItem: Story = {
  render: function Render() {
    return <SingleItemDemo />;
  },
};

// Wrapper for two items story
const TwoItemsDemo = () => {
  const t = useT();
  return (
    <Breadcrumb
      items={[
        { label: t('platform.nav.home'), href: '/' },
        { label: t('storybook.demo.currentPage') },
      ]}
    />
  );
};

// Two items
export const TwoItems: Story = {
  render: function Render() {
    return <TwoItemsDemo />;
  },
};

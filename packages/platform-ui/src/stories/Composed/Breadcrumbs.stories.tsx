import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { Breadcrumbs } from '../../composed/Breadcrumbs';
import { Home } from 'lucide-react';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Composed/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Breadcrumbs

Navigation breadcrumbs with route integration support. Supports icons, custom separators, and max items with overflow.

### Features
- Breadcrumb navigation items
- Custom separators
- Home icon support
- Max items with overflow indicator
- Icon support for items
- Current page indication

### Usage
\`\`\`tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: 'Current Page', current: true },
  ]}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onNavigate: fn(),
  },
  argTypes: {
    maxItems: {
      control: 'number',
      description: 'Maximum items before showing overflow',
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
    <Breadcrumbs
      items={[
        { label: t('platform.nav.home'), href: '/' },
        { label: t('storybook.demo.resources'), href: '/resources' },
        { label: t('storybook.demo.currentPage'), current: true },
      ]}
      onNavigate={fn()}
    />
  );
};

// Basic breadcrumbs
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Wrapper for home icon story
const WithHomeIconDemo = () => {
  const t = useT();
  return (
    <Breadcrumbs
      items={[
        { label: t('platform.nav.home'), href: '/', icon: <Home size={16} /> },
        { label: t('storybook.demo.resources'), href: '/resources' },
        { label: t('storybook.demo.currentPage'), current: true },
      ]}
      homeIcon={<Home size={16} />}
      onNavigate={fn()}
    />
  );
};

// With home icon
export const WithHomeIcon: Story = {
  render: function Render() {
    return <WithHomeIconDemo />;
  },
};

// Wrapper for icons story
const WithIconsDemo = () => {
  const t = useT();
  return (
    <Breadcrumbs
      items={[
        { label: t('platform.nav.home'), href: '/', icon: <Home size={16} /> },
        { label: t('platform.nav.settings'), href: '/settings', icon: <Home size={16} /> },
        { label: t('platform.nav.profile'), current: true, icon: <Home size={16} /> },
      ]}
      onNavigate={fn()}
    />
  );
};

// With icons
export const WithIcons: Story = {
  render: function Render() {
    return <WithIconsDemo />;
  },
};

// Wrapper for long trail story
const LongTrailDemo = () => {
  const t = useT();
  return (
    <Breadcrumbs
      items={[
        { label: t('platform.nav.home'), href: '/' },
        { label: t('storybook.demo.administration'), href: '/admin' },
        { label: t('platform.nav.settings'), href: '/admin/settings' },
        { label: t('storybook.demo.userManagement'), href: '/admin/settings/users' },
        { label: t('storybook.demo.editUser'), current: true },
      ]}
      onNavigate={fn()}
    />
  );
};

// Long breadcrumb trail
export const LongTrail: Story = {
  render: function Render() {
    return <LongTrailDemo />;
  },
};

// Wrapper for max items story
const WithMaxItemsDemo = () => {
  const t = useT();
  return (
    <Breadcrumbs
      items={[
        { label: t('platform.nav.home'), href: '/' },
        { label: `${t('storybook.demo.level')} 1`, href: '/level1' },
        { label: `${t('storybook.demo.level')} 2`, href: '/level1/level2' },
        { label: `${t('storybook.demo.level')} 3`, href: '/level1/level2/level3' },
        { label: `${t('storybook.demo.level')} 4`, href: '/level1/level2/level3/level4' },
        { label: t('storybook.demo.currentPage'), current: true },
      ]}
      maxItems={3}
      onNavigate={fn()}
    />
  );
};

// With max items
export const WithMaxItems: Story = {
  render: function Render() {
    return <WithMaxItemsDemo />;
  },
};

// Wrapper for custom separator story
const CustomSeparatorDemo = () => {
  const t = useT();
  return (
    <Breadcrumbs
      items={[
        { label: t('platform.nav.home'), href: '/' },
        { label: t('storybook.demo.resources'), href: '/resources' },
        { label: t('storybook.demo.currentPage'), current: true },
      ]}
      separator="/"
      onNavigate={fn()}
    />
  );
};

// Custom separator
export const CustomSeparator: Story = {
  render: function Render() {
    return <CustomSeparatorDemo />;
  },
};

// Wrapper for single item story
const SingleItemDemo = () => {
  const t = useT();
  return (
    <Breadcrumbs items={[{ label: t('platform.nav.home'), current: true }]} onNavigate={fn()} />
  );
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
    <Breadcrumbs
      items={[
        { label: t('platform.nav.home'), href: '/' },
        { label: t('storybook.demo.currentPage'), current: true },
      ]}
      onNavigate={fn()}
    />
  );
};

// Two items
export const TwoItems: Story = {
  render: function Render() {
    return <TwoItemsDemo />;
  },
};

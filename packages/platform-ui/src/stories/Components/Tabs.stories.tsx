import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { Tabs, Paragraph } from '../../index';

const meta: Meta = {
  title: 'Components/Tabs',
  parameters: {
    docs: {
      description: {
        component: `
Tabs organize content into different views within the same context. They allow users to switch between related content sections without navigation.

## Variants

- **Default** - Standard horizontal tabs
- **Vertical** - Tabs on the left side
- **With icons** - Icons for visual context
- **Overflow** - Scrollable tabs for many items
- **Controlled** - Programmatically controlled tabs

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Multiple related views in same context
- When users need to switch between content
- For navigation within a section
- Content categorization
- Step-by-step processes
- Settings or configuration panels

## Best Practices

### Do
- Use clear, concise tab labels
- Keep tab order logical
- Show active tab clearly
- Use icons when they add meaning
- Ensure content fits within tab panels
- Provide keyboard navigation

### Don't
- Don't use for page navigation
- Don't nest tabs within tabs
- Don't use too many tabs (5-7 max)
- Don't disable tabs without reason
- Don't use tabs for unrelated content
- Don't hide tabs on mobile

## Usage Patterns

### Basic Tabs
\`\`\`tsx
<Tabs defaultValue="overview">
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
    <Tabs.Tab value="settings">Settings</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">
    <Paragraph>Overview content</Paragraph>
  </Tabs.Panel>
  <Tabs.Panel value="details">
    <Paragraph>Details content</Paragraph>
  </Tabs.Panel>
  <Tabs.Panel value="settings">
    <Paragraph>Settings content</Paragraph>
  </Tabs.Panel>
</Tabs>
\`\`\`

### Size Variants
\`\`\`tsx
<Tabs data-size="sm" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Small</Tabs.Tab>
    <Tabs.Tab value="tab2">Tabs</Tabs.Tab>
  </Tabs.List>
</Tabs>
<Tabs data-size="lg" defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Large</Tabs.Tab>
    <Tabs.Tab value="tab2">Tabs</Tabs.Tab>
  </Tabs.List>
</Tabs>
\`\`\`

### Controlled Tabs
\`\`\`tsx
const [activeTab, setActiveTab] = useState('overview');

<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">
    <Paragraph>Overview content</Paragraph>
  </Tabs.Panel>
  <Tabs.Panel value="details">
    <Paragraph>Details content</Paragraph>
  </Tabs.Panel>
</Tabs>
\`\`\`

## Anti-Patterns

### Anti-pattern: Too Many Tabs
More than 7 tabs becomes hard to scan and navigate.

### Anti-pattern: Nested Tabs
Tabs within tabs create confusing navigation patterns.

### Anti-pattern: Disabled Tabs
Disabling tabs without explanation frustrates users.

### Anti-pattern: Empty Tab Panels
Tabs without content provide no value to users.

## Accessibility

### Screen Readers
- Tab role announced with tablist context
- Selected tab state clearly communicated
- Panel content associated with tabs
- Navigation instructions provided
- Tab count and position announced

### Keyboard Navigation
- Arrow keys navigate between tabs
- Tab key moves to panel content
- Enter/Space activates tabs
- Focus stays within tab component
- Logical tab order maintained

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All tabs reachable via keyboard
- **Focus management**: Clear focus indicators
- **ARIA attributes**: Proper roles and states
- **Content association**: Tabs linked to panels
- **Navigation predictability**: Expected keyboard behavior

### ARIA Implementation
\`\`\`tsx
<div role="tablist" aria-label="Content sections">
  <button role="tab" aria-selected="true" aria-controls="panel1" id="tab1">
    Overview
  </button>
  <button role="tab" aria-selected="false" aria-controls="panel2" id="tab2">
    Details
  </button>
</div>
<div role="tabpanel" aria-labelledby="tab1" id="panel1">
  Overview content
</div>
<div role="tabpanel" aria-labelledby="tab2" id="panel2" hidden>
  Details content
</div>
\`\`\`

### Best Practice for Tab Labels
Use descriptive, concise labels:
\`\`\`tsx
<Tabs.Tab value="overview">Overview</Tabs.Tab>
<Tabs.Tab value="user-settings">User Settings</Tabs.Tab>
<Tabs.Tab value="billing-info">Billing Information</Tabs.Tab>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Tabs defaultValue="overview">
        <Tabs.List>
          <Tabs.Tab value="overview">{t('storybook.demo.overview')}</Tabs.Tab>
          <Tabs.Tab value="details">{t('storybook.demo.details')}</Tabs.Tab>
          <Tabs.Tab value="settings">{t('storybook.demo.settings')}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="overview">
          <Paragraph>{t('storybook.demo.overviewContentGoesHere')}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="details">
          <Paragraph>{t('storybook.demo.detailsContentGoesHere')}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="settings">
          <Paragraph>{t('storybook.demo.settingsContentGoesHere')}</Paragraph>
        </Tabs.Panel>
      </Tabs>
    );
  },
};

export const WithIcons: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Tabs defaultValue="bookings">
        <Tabs.List>
          <Tabs.Tab value="bookings">{t('storybook.demo.bookings')}</Tabs.Tab>
          <Tabs.Tab value="listings">{t('storybook.demo.listings')}</Tabs.Tab>
          <Tabs.Tab value="users">{t('storybook.demo.users')}</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="bookings">
          <Paragraph>{t('storybook.demo.manageBookingsHere')}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="listings">
          <Paragraph>{t('storybook.demo.viewAndEditListings')}</Paragraph>
        </Tabs.Panel>
        <Tabs.Panel value="users">
          <Paragraph>{t('storybook.demo.userManagementSection')}</Paragraph>
        </Tabs.Panel>
      </Tabs>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <Tabs defaultValue="tab1" data-size="sm">
          <Tabs.List>
            <Tabs.Tab value="tab1">{t('storybook.demo.small')}</Tabs.Tab>
            <Tabs.Tab value="tab2">{t('storybook.demo.tabs')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">
            <Paragraph>{t('storybook.demo.smallTabsContent')}</Paragraph>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <Paragraph>{t('storybook.demo.tab2Content')}</Paragraph>
          </Tabs.Panel>
        </Tabs>

        <Tabs defaultValue="tab1" data-size="md">
          <Tabs.List>
            <Tabs.Tab value="tab1">{t('storybook.demo.medium')}</Tabs.Tab>
            <Tabs.Tab value="tab2">{t('storybook.demo.tabs')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">
            <Paragraph>{t('storybook.demo.mediumTabsContent')}</Paragraph>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <Paragraph>{t('storybook.demo.tab2Content')}</Paragraph>
          </Tabs.Panel>
        </Tabs>

        <Tabs defaultValue="tab1" data-size="lg">
          <Tabs.List>
            <Tabs.Tab value="tab1">{t('storybook.demo.large')}</Tabs.Tab>
            <Tabs.Tab value="tab2">{t('storybook.demo.tabs')}</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="tab1">
            <Paragraph>{t('storybook.demo.largeTabsContent')}</Paragraph>
          </Tabs.Panel>
          <Tabs.Panel value="tab2">
            <Paragraph>{t('storybook.demo.tab2Content')}</Paragraph>
          </Tabs.Panel>
        </Tabs>
      </div>
    );
  },
};

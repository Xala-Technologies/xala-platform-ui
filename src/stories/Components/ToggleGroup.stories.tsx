import type { Meta, StoryObj } from '@storybook/react';
import { ToggleGroup } from '@xala-technologies/platform/ui';

const meta: Meta = {
  title: 'Components/ToggleGroup',
  parameters: {
    docs: {
      description: {
        component: `
ToggleGroup allows users to select between mutually exclusive options in a compact, button-style interface. It's ideal for view modes or settings.

## Variants

- **Default** - Standard toggle group
- **With icons** - Icons for visual context
- **Size variants** - sm, md (default), lg
- **Controlled** - Programmatically controlled state
- **Disabled** - Disabled toggle group
- **Vertical** - Vertical orientation

## When to Use

- View toggles (list/grid/calendar)
- Mode selection (edit/preview)
- Single option from small set (2-5 items)
- Filter options
- Sort preferences
- Display settings

## Best Practices

### Do
- Use clear, concise labels
- Limit to 2-5 options maximum
- Provide visual feedback for selection
- Use icons when they add meaning
- Ensure adequate touch targets
- Maintain logical order

### Don't
- Don't use for more than 5 options
- Don't use for navigation
- Don't nest within other toggles
- Don't disable without explanation
- Don't use for unrelated options
- Don't make labels too long

## Usage Patterns

### Basic ToggleGroup
\`\`\`tsx
<ToggleGroup defaultValue="list" name="view">
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
  <ToggleGroup.Item value="calendar">Calendar</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### With Icons
\`\`\`tsx
<ToggleGroup defaultValue="list" name="view-icons">
  <ToggleGroup.Item value="list">List View</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid View</ToggleGroup.Item>
  <ToggleGroup.Item value="calendar">Calendar View</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### Size Variants
\`\`\`tsx
<ToggleGroup data-size="sm" defaultValue="a" name="size-sm">
  <ToggleGroup.Item value="a">Small A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">Small B</ToggleGroup.Item>
</ToggleGroup>
<ToggleGroup data-size="lg" defaultValue="a" name="size-lg">
  <ToggleGroup.Item value="a">Large A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">Large B</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### Time Filter
\`\`\`tsx
<ToggleGroup defaultValue="week" name="time-filter">
  <ToggleGroup.Item value="day">Today</ToggleGroup.Item>
  <ToggleGroup.Item value="week">This Week</ToggleGroup.Item>
  <ToggleGroup.Item value="month">This Month</ToggleGroup.Item>
  <ToggleGroup.Item value="all">All Time</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### Controlled State
\`\`\`tsx
const [selectedView, setSelectedView] = useState('list');

<ToggleGroup value={selectedView} onValueChange={setSelectedView} name="view">
  <ToggleGroup.Item value="list">List</ToggleGroup.Item>
  <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

### Sort Options
\`\`\`tsx
<ToggleGroup defaultValue="newest" name="sort">
  <ToggleGroup.Item value="newest">Newest</ToggleGroup.Item>
  <ToggleGroup.Item value="oldest">Oldest</ToggleGroup.Item>
  <ToggleGroup.Item value="popular">Popular</ToggleGroup.Item>
</ToggleGroup>
\`\`\`

## Anti-Patterns

### Anti-pattern: Too Many Options
More than 5 options makes the group hard to use.

### Anti-pattern: Long Labels
Text that wraps breaks the visual rhythm.

### Anti-pattern: Navigation Use
Using toggle groups for page navigation.

### Anti-pattern: Unclear Icons
Icons without text labels can be ambiguous.

## Accessibility

### Screen Readers
- Radio group role announced
- Selected option clearly communicated
- Group label provides context
- Option count and position announced
- State changes announced

### Keyboard Navigation
- Arrow keys navigate between options
- Tab enters/exits the group
- Enter/Space selects options
- Focus stays within group
- Logical navigation order

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All options reachable via keyboard
- **Focus management**: Clear focus indicators
- **ARIA attributes**: Proper roles and states
- **Group labeling**: Descriptive group labels
- **State indication**: Selection clearly shown

### ARIA Implementation
\`\`\`tsx
<div role="radiogroup" aria-labelledby="view-label">
  <div id="view-label">View mode</div>
  <button 
    role="radio" 
    aria-checked="true" 
    aria-label="List view"
    type="button"
  >
    List
  </button>
  <button 
    role="radio" 
    aria-checked="false" 
    aria-label="Grid view"
    type="button"
  >
    Grid
  </button>
</div>
\`\`\`

### Best Practice for Labels
Use clear, concise labels:
\`\`\`tsx
// Good
<ToggleGroup.Item value="list">List View</ToggleGroup.Item>
<ToggleGroup.Item value="grid">Grid View</ToggleGroup.Item>
<ToggleGroup.Item value="day">Today</ToggleGroup.Item>

// Bad
<ToggleGroup.Item value="1">Option 1</ToggleGroup.Item>
<ToggleGroup.Item value="2">Option 2</ToggleGroup.Item>
<ToggleGroup.Item value="all">Show All Items In The List</ToggleGroup.Item>
\`\`\`

### Controlled ToggleGroup Example
\`\`\`tsx
const ViewToggle = () => {
  const [view, setView] = useState('list');
  
  return (
    <>
      <ToggleGroup value={view} onValueChange={setView} name="view-mode">
        <ToggleGroup.Item value="list">List</ToggleGroup.Item>
        <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
      </ToggleGroup>
      
      {view === 'list' && <ListView />}
      {view === 'grid' && <GridView />}
    </>
  );
};
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
  render: () => (
    <ToggleGroup defaultValue="list" name="view">
      <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
      <ToggleGroup.Item value="calendar">Calendar</ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <ToggleGroup defaultValue="list" name="view-icons">
      <ToggleGroup.Item value="list">List</ToggleGroup.Item>
      <ToggleGroup.Item value="grid">Grid</ToggleGroup.Item>
      <ToggleGroup.Item value="calendar">Calendar</ToggleGroup.Item>
    </ToggleGroup>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <ToggleGroup defaultValue="a" name="size-sm" data-size="sm">
        <ToggleGroup.Item value="a">Small A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">Small B</ToggleGroup.Item>
      </ToggleGroup>
      <ToggleGroup defaultValue="a" name="size-md" data-size="md">
        <ToggleGroup.Item value="a">Medium A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">Medium B</ToggleGroup.Item>
      </ToggleGroup>
      <ToggleGroup defaultValue="a" name="size-lg" data-size="lg">
        <ToggleGroup.Item value="a">Large A</ToggleGroup.Item>
        <ToggleGroup.Item value="b">Large B</ToggleGroup.Item>
      </ToggleGroup>
    </div>
  ),
};

export const TimeFilter: Story = {
  render: () => (
    <ToggleGroup defaultValue="week" name="time-filter">
      <ToggleGroup.Item value="day">Today</ToggleGroup.Item>
      <ToggleGroup.Item value="week">This Week</ToggleGroup.Item>
      <ToggleGroup.Item value="month">This Month</ToggleGroup.Item>
      <ToggleGroup.Item value="all">All Time</ToggleGroup.Item>
    </ToggleGroup>
  ),
};

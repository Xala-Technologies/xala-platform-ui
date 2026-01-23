import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Chip } from '@digdir/designsystemet-react';

/**
 * Chip component from Digdir Designsystemet.
 * 
 * Chip are small, interactive components for filtering and selection.
 * 
 * @see https://designsystemet.no/en/components/docs/chip/overview
 */
const meta: Meta<typeof Chip> = {
  title: 'Components/Chip',
  component: Chip,
  parameters: {
    docs: {
      description: {
        component: `
Chip are small, interactive components that allow users to control how they want to see content. They are commonly used for filtering categories, showing active filters, and making selections.

## Variants

- **Chip.Radio** - Single selection (mutually exclusive, like radio buttons)
- **Chip.Checkbox** - Multiple selection (can select multiple, like checkboxes)
- **Chip.Removable** - Dismissible chips with remove button for active filters
- **Chip.Button** - Clickable action chips (alternative to buttons)
- **Chip.Input** - Editable chips for dynamic content

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Filtering search results or lists
- Showing active filters
- Tag selection and categorization
- Quick actions and shortcuts
- Category selection
- Input tags and keywords
- Status indicators

## Best Practices

### Do
- Use for filtering and selection tasks
- Keep labels short and clear (1-3 words)
- Use Chip.Removable for active filters
- Use Chip.Checkbox for multiple selections
- Use Chip.Radio for single selection
- Group related chips together
- Provide clear visual feedback for selection

### Don't
- Don't use for navigation (use links instead)
- Don't use very long text in chips
- Don't mix chip types in same group
- Don't use chips for critical actions
- Don't create too many options in one group
- Don't rely on color alone for selection state

## Usage Patterns

### Radio Chips (Single Selection)
\`\`\`tsx
<Chip.Radio name="category" value="all" checked>
  All Categories
</Chip.Radio>
<Chip.Radio name="category" value="tech">
  Technology
</Chip.Radio>
<Chip.Radio name="category" value="design">
  Design
</Chip.Radio>
\`\`\`

### Checkbox Chips (Multiple Selection)
\`\`\`tsx
<Chip.Checkbox value="frontend" checked>
  Frontend
</Chip.Checkbox>
<Chip.Checkbox value="backend">
  Backend
</Chip.Checkbox>
<Chip.Checkbox value="design">
  Design
</Chip.Checkbox>
\`\`\`

### Removable Chips (Active Filters)
\`\`\`tsx
<Chip.Removable onRemove={() => removeFilter('tech')}>
  Technology
</Chip.Removable>
<Chip.Removable onRemove={() => removeFilter('design')}>
  Design
</Chip.Removable>
\`\`\`

### Action Chips
\`\`\`tsx
<Chip.Button onClick={handleAction}>
  Quick Action
</Chip.Button>
\`\`\`

### Size Variants
\`\`\`tsx
<Chip data-size="sm">Small</Chip>
<Chip data-size="md">Medium</Chip>
<Chip data-size="lg">Large</Chip>
\`\`\`

## Anti-Patterns

### Anti-pattern: Chips for Navigation
Using chips for navigation instead of proper links or buttons.

### Anti-pattern: Too Many Options
Presenting 10+ chip options becomes overwhelming to scan.

### Anti-pattern: Long Text in Chips
Chips with long text become unwieldy and hard to scan.

### Anti-pattern: Mixed Selection Types
Mixing radio and checkbox chips in the same group.

## Accessibility

### Screen Readers
- Proper ARIA roles for each chip type
- Selection state is clearly announced
- Remove actions are announced for removable chips
- Group labels provide context
- Focus management within chip groups

### Keyboard Navigation
- Tab key navigates between chips
- Space/Enter selects/deselects chips
- Escape may close removable chips
- Arrow keys navigate within chip groups
- Focus stays within logical group

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All chips reachable via keyboard
- **Focus indicators**: Visible focus states
- **ARIA roles**: Proper roles for chip types
- **Selection state**: Clear indication of selected state
- **Touch targets**: Minimum 44x44px for touch

### Radio Chips Implementation
\`\`\`tsx
<div role="radiogroup" aria-label="Category filter">
  <Chip.Radio 
    name="category"
    value="all"
    checked={selected === 'all'}
    onChange={() => setSelected('all')}
    aria-checked={selected === 'all'}
  >
    All Categories
  </Chip.Radio>
</div>
\`\`\`

### Checkbox Chips Implementation
\`\`\`tsx
<div role="group" aria-label="Filter options">
  <Chip.Checkbox
    value="frontend"
    checked={filters.includes('frontend')}
    onChange={(checked) => updateFilter('frontend', checked)}
    aria-checked={filters.includes('frontend')}
  >
    Frontend
  </Chip.Checkbox>
</div>
\`\`\`

### Removable Chips
\`\`\`tsx
<Chip.Removable
  onRemove={() => removeFilter('tech')}
  aria-label="Remove Technology filter"
>
  Technology
</Chip.Removable>
\`\`\`

### Best Practice for Groups
Always provide group labels:
\`\`\`tsx
<fieldset>
  <legend>Filter by category</legend>
  <div role="group">
    <Chip.Radio name="category" value="all">All</Chip.Radio>
    <Chip.Radio name="category" value="tech">Tech</Chip.Radio>
  </div>
</fieldset>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const RadioChips: Story = {
  render: function Render() {
    const [selected, setSelected] = useState('option1');
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
        <Chip.Radio 
          name="filter" 
          value="option1"
          checked={selected === 'option1'}
          onChange={() => setSelected('option1')}
        >
          All
        </Chip.Radio>
        <Chip.Radio 
          name="filter" 
          value="option2"
          checked={selected === 'option2'}
          onChange={() => setSelected('option2')}
        >
          Active
        </Chip.Radio>
        <Chip.Radio 
          name="filter" 
          value="option3"
          checked={selected === 'option3'}
          onChange={() => setSelected('option3')}
        >
          Completed
        </Chip.Radio>
      </div>
    );
  },
};

export const CheckboxChips: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string[]>(['tag1']);
    const toggle = (tag: string) => {
      setSelected(prev => 
        prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
      );
    };
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
        <Chip.Checkbox 
          name="tags"
          checked={selected.includes('tag1')}
          onChange={() => toggle('tag1')}
        >
          Indoor
        </Chip.Checkbox>
        <Chip.Checkbox 
          name="tags"
          checked={selected.includes('tag2')}
          onChange={() => toggle('tag2')}
        >
          Outdoor
        </Chip.Checkbox>
        <Chip.Checkbox 
          name="tags"
          checked={selected.includes('tag3')}
          onChange={() => toggle('tag3')}
        >
          Accessible
        </Chip.Checkbox>
      </div>
    );
  },
};

export const RemovableChips: Story = {
  render: function Render() {
    const [chips, setChips] = useState(['Oslo', 'Bergen', 'Trondheim']);
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
        {chips.map(chip => (
          <Chip.Removable 
            key={chip}
            onClick={() => setChips(prev => prev.filter(c => c !== chip))}
          >
            {chip}
          </Chip.Removable>
        ))}
      </div>
    );
  },
};

export const ButtonChips: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
      <Chip.Button onClick={() => {}}>Clear all filters</Chip.Button>
      <Chip.Button onClick={() => {}}>Apply</Chip.Button>
      <Chip.Button onClick={() => {}}>Reset</Chip.Button>
    </div>
  ),
};

/**
 * Size variants
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
        <Chip.Checkbox data-size="sm">Small</Chip.Checkbox>
        <Chip.Checkbox data-size="md">Medium</Chip.Checkbox>
        <Chip.Checkbox data-size="lg">Large</Chip.Checkbox>
      </div>
    </div>
  ),
};

/**
 * All variants overview
 */
export const AllVariants: Story = {
  render: function Render() {
    const [radioSelected, setRadioSelected] = useState('all');
    const [checkboxSelected, setCheckboxSelected] = useState<string[]>(['indoor']);
    const [removableChips, setRemovableChips] = useState(['Oslo', 'Bergen']);

    const toggleCheckbox = (value: string) => {
      setCheckboxSelected(prev => 
        prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]
      );
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>Chip.Radio (Single Selection)</h3>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
            <Chip.Radio 
              name="status" 
              value="all"
              checked={radioSelected === 'all'}
              onChange={() => setRadioSelected('all')}
            >
              All
            </Chip.Radio>
            <Chip.Radio 
              name="status" 
              value="active"
              checked={radioSelected === 'active'}
              onChange={() => setRadioSelected('active')}
            >
              Active
            </Chip.Radio>
            <Chip.Radio 
              name="status" 
              value="completed"
              checked={radioSelected === 'completed'}
              onChange={() => setRadioSelected('completed')}
            >
              Completed
            </Chip.Radio>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>Chip.Checkbox (Multiple Selection)</h3>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
            <Chip.Checkbox 
              name="features"
              checked={checkboxSelected.includes('indoor')}
              onChange={() => toggleCheckbox('indoor')}
            >
              Indoor
            </Chip.Checkbox>
            <Chip.Checkbox 
              name="features"
              checked={checkboxSelected.includes('outdoor')}
              onChange={() => toggleCheckbox('outdoor')}
            >
              Outdoor
            </Chip.Checkbox>
            <Chip.Checkbox 
              name="features"
              checked={checkboxSelected.includes('accessible')}
              onChange={() => toggleCheckbox('accessible')}
            >
              Accessible
            </Chip.Checkbox>
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>Chip.Removable (Active Filters)</h3>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
            {removableChips.map(chip => (
              <Chip.Removable 
                key={chip}
                aria-label={`Remove ${chip}`}
                onClick={() => setRemovableChips(prev => prev.filter(c => c !== chip))}
              >
                {chip}
              </Chip.Removable>
            ))}
            {removableChips.length === 0 && (
              <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>No active filters</span>
            )}
          </div>
        </div>

        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>Chip.Button (Actions)</h3>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
            <Chip.Button onClick={() => {}}>Clear all</Chip.Button>
            <Chip.Button onClick={() => {}}>Apply</Chip.Button>
          </div>
        </div>
      </div>
    );
  },
};

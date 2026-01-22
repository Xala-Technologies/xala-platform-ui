import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { List } from '@xala-technologies/platform/ui';

const meta: Meta<typeof List> = {
  title: 'Components/List',
  component: List,
  parameters: {
    docs: {
      description: {
        component: `
List component for displaying ordered and unordered lists.

## When to Use
- Feature lists
- Navigation menus
- Step-by-step instructions
- Content summaries
- Nested hierarchies

## Best Practices
- Use ordered lists for sequences
- Use unordered lists for non-sequential items
- Keep list items concise
- Use nesting sparingly

## Accessibility
- Uses semantic list elements
- Proper list structure for screen readers
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Unordered: Story = {
  render: () => (
    <List.Unordered>
      <List.Item>Free cancellation up to 24 hours before</List.Item>
      <List.Item>Equipment included in the price</List.Item>
      <List.Item>Changing rooms available</List.Item>
      <List.Item>Parking on site</List.Item>
    </List.Unordered>
  ),
};

export const Ordered: Story = {
  render: () => (
    <List.Ordered>
      <List.Item>Create an account</List.Item>
      <List.Item>Browse available resources</List.Item>
      <List.Item>Select a date and time</List.Item>
      <List.Item>Complete your resourceRequest</List.Item>
      <List.Item>Receive confirmation email</List.Item>
    </List.Ordered>
  ),
};

export const Nested: Story = {
  render: () => (
    <List.Unordered>
      <List.Item>
        Indoor amenities
        <List.Unordered>
          <List.Item>Basketball court</List.Item>
          <List.Item>Swimming pool</List.Item>
          <List.Item>Gym</List.Item>
        </List.Unordered>
      </List.Item>
      <List.Item>
        Outdoor amenities
        <List.Unordered>
          <List.Item>Football field</List.Item>
          <List.Item>Tennis court</List.Item>
          <List.Item>Running track</List.Item>
        </List.Unordered>
      </List.Item>
    </List.Unordered>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <List.Unordered data-size="sm">
        <List.Item>Small list item 1</List.Item>
        <List.Item>Small list item 2</List.Item>
      </List.Unordered>
      <List.Unordered data-size="md">
        <List.Item>Medium list item 1</List.Item>
        <List.Item>Medium list item 2</List.Item>
      </List.Unordered>
      <List.Unordered data-size="lg">
        <List.Item>Large list item 1</List.Item>
        <List.Item>Large list item 2</List.Item>
      </List.Unordered>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>Unordered List</h3>
        <List.Unordered>
          <List.Item>First item</List.Item>
          <List.Item>Second item</List.Item>
          <List.Item>Third item</List.Item>
        </List.Unordered>
      </div>
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>Ordered List</h3>
        <List.Ordered>
          <List.Item>Step one</List.Item>
          <List.Item>Step two</List.Item>
          <List.Item>Step three</List.Item>
        </List.Ordered>
      </div>
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>Nested List</h3>
        <List.Unordered>
          <List.Item>
            Parent item
            <List.Unordered>
              <List.Item>Child item 1</List.Item>
              <List.Item>Child item 2</List.Item>
            </List.Unordered>
          </List.Item>
        </List.Unordered>
      </div>
    </div>
  ),
};

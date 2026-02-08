import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { List } from '../../index';

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
  render: function Render() {
    const t = useT();
    return (
      <List.Unordered>
        <List.Item>"Eksempel Tekst"</List.Item>
        <List.Item>"Eksempel Tekst"</List.Item>
        <List.Item>"Eksempel Tekst"</List.Item>
        <List.Item>"Eksempel Tekst"</List.Item>
      </List.Unordered>
    );
  },
};

export const Ordered: Story = {
  render: function Render() {
    const t = useT();
    return (
      <List.Ordered>
        <List.Item>"Eksempel Tekst"</List.Item>
        <List.Item>"Eksempel Tekst"</List.Item>
        <List.Item>"Eksempel Tekst"</List.Item>
        <List.Item>"Eksempel Tekst"</List.Item>
        <List.Item>"Eksempel Tekst"</List.Item>
      </List.Ordered>
    );
  },
};

export const Nested: Story = {
  render: function Render() {
    const t = useT();
    return (
      <List.Unordered>
        <List.Item>
          "Eksempel Tekst"
          <List.Unordered>
            <List.Item>"Eksempel Tekst"</List.Item>
            <List.Item>"Eksempel Tekst"</List.Item>
            <List.Item>"Eksempel Tekst"</List.Item>
          </List.Unordered>
        </List.Item>
        <List.Item>
          "Eksempel Tekst"
          <List.Unordered>
            <List.Item>"Eksempel Tekst"</List.Item>
            <List.Item>"Eksempel Tekst"</List.Item>
            <List.Item>"Eksempel Tekst"</List.Item>
          </List.Unordered>
        </List.Item>
      </List.Unordered>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <List.Unordered data-size="sm">
          <List.Item>"Eksempel Tekst" 1</List.Item>
          <List.Item>"Eksempel Tekst" 2</List.Item>
        </List.Unordered>
        <List.Unordered data-size="md">
          <List.Item>"Eksempel Tekst" 1</List.Item>
          <List.Item>"Eksempel Tekst" 2</List.Item>
        </List.Unordered>
        <List.Unordered data-size="lg">
          <List.Item>"Eksempel Tekst" 1</List.Item>
          <List.Item>"Eksempel Tekst" 2</List.Item>
        </List.Unordered>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            "Eksempel Tekst"
          </h3>
          <List.Unordered>
            <List.Item>"Eksempel Tekst"</List.Item>
            <List.Item>"Eksempel Tekst"</List.Item>
            <List.Item>"Eksempel Tekst"</List.Item>
          </List.Unordered>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            "Eksempel Tekst"
          </h3>
          <List.Ordered>
            <List.Item>"Eksempel Tekst"</List.Item>
            <List.Item>"Eksempel Tekst"</List.Item>
            <List.Item>"Eksempel Tekst"</List.Item>
          </List.Ordered>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            "Eksempel Tekst"
          </h3>
          <List.Unordered>
            <List.Item>
              "Eksempel Tekst"
              <List.Unordered>
                <List.Item>"Eksempel Tekst" 1</List.Item>
                <List.Item>"Eksempel Tekst" 2</List.Item>
              </List.Unordered>
            </List.Item>
          </List.Unordered>
        </div>
      </div>
    );
  },
};

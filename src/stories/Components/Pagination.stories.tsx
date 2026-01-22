import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Pagination, Heading } from '@xala-technologies/platform/ui';

const meta: Meta<typeof Pagination> = {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    docs: {
      description: {
        component: `
Pagination allows users to navigate through large amounts of content that is split across multiple pages. It provides controls to move between pages efficiently.

## Variants

- **Standard** - Full pagination with page numbers
- **Compact** - Minimal pagination for tight spaces
- **With ellipsis** - Shows ellipsis for many pages
- **With info** - Shows current/total information

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Large data sets split across pages
- Search results with many items
- Tables with many rows
- List views with 20+ items
- Gallery or grid layouts
- Article or blog post listings

## Best Practices

### Do
- Show total pages or items when possible
- Provide first/last page navigation
- Indicate current page clearly
- Use appropriate size for context
- Include previous/next navigation
- Show page numbers when practical

### Don't
- Don't hide pagination without indication
- Don't use for small data sets (< 10 items)
- Don't make current page clickable
- Don't show too many page numbers at once
- Don't use pagination without clear context
- Don't forget to maintain state on page change

## Usage Patterns

### Basic Pagination
\`\`\`tsx
<Pagination
  currentPage={1}
  totalPages={10}
  onPageChange={handlePageChange}
  aria-label="Pagination navigation"
/>
\`\`\`

### Size Variants
\`\`\`tsx
<Pagination data-size="sm" currentPage={1} totalPages={10} />
<Pagination data-size="md" currentPage={1} totalPages={10} />
<Pagination data-size="lg" currentPage={1} totalPages={10} />
\`\`\`

### With Information
\`\`\`tsx
<Pagination
  currentPage={3}
  totalPages={50}
  totalItems={500}
  itemsPerPage={10}
  onPageChange={handlePageChange}
/>
\`\`\`

### Compact Pagination
\`\`\`tsx
<Pagination
  variant="compact"
  currentPage={1}
  totalPages={10}
  showPageNumbers={false}
/>
\`\`\`

## Anti-Patterns

### Anti-pattern: Pagination for Small Sets
Using pagination for fewer than 10 items is unnecessary.

### Anti-pattern: No Current Page Indication
Not clearly showing which page is active confuses users.

### Anti-pattern: Too Many Page Numbers
Showing all 100 page numbers at once is overwhelming.

### Anti-pattern: No Previous/Next
Missing previous/next buttons requires extra clicks.

## Accessibility

### Screen Readers
- ARIA labels describe navigation purpose
- Current page is properly announced
- Page numbers are read as links
- Total pages/items information is provided
- Navigation state is communicated

### Keyboard Navigation
- Tab key navigates through pagination controls
- Enter key activates page navigation
- Arrow keys may navigate page numbers
- Focus stays within pagination component
- Logical tab order maintained

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All controls reachable via keyboard
- **Focus management**: Clear focus indicators
- **ARIA labels**: Descriptive labels for navigation
- **Current state**: Current page clearly indicated
- **Predictable**: Navigation behaves as expected

### ARIA Implementation
\`\`\`tsx
<nav aria-label="Pagination navigation" role="navigation">
  <button aria-label="Previous page" disabled>Previous</button>
  <ul>
    <li><a href="?page=1" aria-label="Page 1" aria-current="page">1</a></li>
    <li><a href="?page=2" aria-label="Page 2">2</a></li>
  </ul>
  <button aria-label="Next page">Next</button>
</nav>
\`\`\`

### Best Practice for Current Page
Use aria-current="page" for the current page:
\`\`\`tsx
<a href="?page=3" aria-current="page" aria-label="Current page, page 3">
  3
</a>
\`\`\`

### Pagination with Information
Provide context about total items:
\`\`\`tsx
<div aria-live="polite">
  Showing 21-30 of 500 items
</div>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'data-size': {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const Default: Story = {
  args: {
    'aria-label': 'Pagination navigation',
  },
};

export const Small: Story = {
  args: {
    'data-size': 'sm',
    'aria-label': 'Small pagination',
  },
};

export const Medium: Story = {
  args: {
    'data-size': 'md',
    'aria-label': 'Medium pagination',
  },
};

export const Large: Story = {
  args: {
    'data-size': 'lg',
    'aria-label': 'Large pagination',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>Sizes</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Pagination data-size="sm" aria-label="Small pagination" />
          <Pagination data-size="md" aria-label="Medium pagination" />
          <Pagination data-size="lg" aria-label="Large pagination" />
        </div>
      </div>
    </div>
  ),
};

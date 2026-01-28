/**
 * Grid Stories
 *
 * Demonstrates the responsive Grid primitive with token-based spacing.
 *
 * @module @xala-technologies/platform-ui/stories/primitives/Grid
 */

import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';
import { Grid } from '../../primitives/grid';

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof Grid> = {
  title: 'Primitives/Grid',
  component: Grid,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
Fully responsive grid layout component with token-based spacing and padding.

## Features
- **Responsive columns**: Configure columns per breakpoint using object notation
- **Responsive padding**: Configure padding per breakpoint using object notation
- **Token-based gaps**: Use design system tokens for consistent spacing
- **Auto-fit/fill**: Create intrinsic responsive grids without breakpoints
- **Alignment controls**: Full control over item and content alignment

## Breakpoints
- \`base\`: Mobile-first (default)
- \`sm\`: 640px+
- \`md\`: 768px+ (tablet breakpoint)
- \`lg\`: 1024px+
- \`xl\`: 1280px+

## Spacing Tokens (gap & padding)
- \`none\`: 0
- \`xs\`: var(--ds-spacing-1)
- \`sm\`: var(--ds-spacing-2)
- \`md\`: var(--ds-spacing-4)
- \`lg\`: var(--ds-spacing-6)
- \`xl\`: var(--ds-spacing-8)

## Responsive Usage
\`\`\`tsx
// Responsive columns and padding
<Grid
  cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
  padding={{ base: 'sm', md: 'md', lg: 'lg' }}
  gap="md"
>
  ...
</Grid>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    cols: {
      description: 'Number of columns or responsive config',
      control: { type: 'object' },
    },
    gap: {
      description: 'Gap between items (token or CSS value)',
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    padding: {
      description: 'Padding around the grid (token, responsive object, or CSS value)',
      control: { type: 'object' },
    },
    px: {
      description: 'Horizontal padding (token or CSS value)',
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    py: {
      description: 'Vertical padding (token or CSS value)',
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
    },
    autoFit: {
      description: 'Enable auto-fit grid behavior',
      control: { type: 'boolean' },
    },
    autoFill: {
      description: 'Enable auto-fill grid behavior',
      control: { type: 'boolean' },
    },
    minColWidth: {
      description: 'Minimum column width for auto-fit/fill',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Grid>;

// =============================================================================
// Demo Card Component
// =============================================================================

function DemoCard({ children, index }: { children?: React.ReactNode; index?: number }) {
  return (
    <Card data-color="neutral" data-size="sm" style={{ minHeight: '100px' }}>
      <Card.Block>
        <Paragraph data-size="sm">{children ?? `Card ${index}`}</Paragraph>
      </Card.Block>
    </Card>
  );
}

// =============================================================================
// Stories
// =============================================================================

/**
 * Default responsive grid - adapts columns and padding to screen size
 */
export const Default: Story = {
  args: {
    cols: { base: 1, sm: 2, md: 3 },
    gap: 'md',
    padding: { base: 'sm', md: 'md', lg: 'lg' },
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <DemoCard key={i} index={i + 1} />
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Fully responsive grid: 1 column on mobile, 2 on sm, 3 on md. Padding also scales with viewport.',
      },
    },
  },
};

/**
 * Responsive grid with 4 columns on large screens
 */
export const Responsive: Story = {
  args: {
    cols: { base: 1, sm: 2, md: 3, lg: 4 },
    gap: 'md',
    padding: { base: 'sm', md: 'md', lg: 'lg' },
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <DemoCard key={i} index={i + 1} />
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Resize the viewport to see the grid adapt: 1 column on mobile, 2 on sm, 3 on md, 4 on lg.',
      },
    },
  },
};

/**
 * Auto-fit grid - automatically fills available space without breakpoints
 */
export const AutoFit: Story = {
  args: {
    autoFit: true,
    minColWidth: '280px',
    gap: 'lg',
    padding: { base: 'sm', md: 'md', lg: 'lg' },
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <DemoCard key={i} index={i + 1} />
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Uses CSS auto-fit to create responsive columns without breakpoints. Each column is at least 280px wide.',
      },
    },
  },
};

/**
 * Different gap sizes
 */
export const GapVariants: Story = {
  render: () => (
    <Grid cols={{ base: 1 }} gap="lg" padding={{ base: 'sm', md: 'md' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gapSize) => (
        <div key={gapSize}>
          <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            Gap: {gapSize}
          </Heading>
          <Grid cols={{ base: 2, md: 4 }} gap={gapSize}>
            {Array.from({ length: 4 }, (_, i) => (
              <DemoCard key={i} index={i + 1} />
            ))}
          </Grid>
        </div>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows all available gap token sizes with responsive columns.',
      },
    },
  },
};

/**
 * Different padding sizes - fully responsive
 */
export const PaddingVariants: Story = {
  render: () => (
    <Grid cols={{ base: 1 }} gap="lg">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl'] as const).map((paddingSize) => (
        <div key={paddingSize}>
          <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)', paddingLeft: 'var(--ds-spacing-4)' }}>
            Padding: {paddingSize}
          </Heading>
          <Grid
            cols={{ base: 1, sm: 2, md: 3 }}
            gap="sm"
            padding={paddingSize}
            style={{ backgroundColor: 'var(--ds-color-accent-surface-default)' }}
          >
            {Array.from({ length: 3 }, (_, i) => (
              <DemoCard key={i} index={i + 1} />
            ))}
          </Grid>
        </div>
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows all available padding token sizes. Background color highlights the grid bounds. Columns are responsive.',
      },
    },
  },
};

/**
 * Responsive padding - scales with viewport
 */
export const ResponsivePadding: Story = {
  args: {
    cols: { base: 1, sm: 2, md: 3 },
    gap: 'md',
    padding: { base: 'xs', sm: 'sm', md: 'md', lg: 'lg', xl: 'xl' },
  },
  render: (args) => (
    <Grid {...args} style={{ backgroundColor: 'var(--ds-color-accent-surface-default)' }}>
      {Array.from({ length: 6 }, (_, i) => (
        <DemoCard key={i} index={i + 1} />
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Padding scales from xs on mobile to xl on extra-large screens. Resize to see the effect.',
      },
    },
  },
};

/**
 * Two-column layout with different gap on X and Y axes
 */
export const AsymmetricGaps: Story = {
  args: {
    cols: { base: 1, sm: 2 },
    gapX: 'xl',
    gapY: 'sm',
    padding: { base: 'sm', md: 'md' },
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <DemoCard key={i} index={i + 1} />
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different horizontal and vertical gaps using gapX and gapY props. Responsive columns.',
      },
    },
  },
};

/**
 * Asymmetric padding (different horizontal/vertical)
 */
export const AsymmetricPadding: Story = {
  args: {
    cols: { base: 1, sm: 2, md: 3 },
    gap: 'md',
    px: 'xl',
    py: 'sm',
  },
  render: (args) => (
    <Grid {...args} style={{ backgroundColor: 'var(--ds-color-accent-surface-default)' }}>
      {Array.from({ length: 6 }, (_, i) => (
        <DemoCard key={i} index={i + 1} />
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different horizontal (px) and vertical (py) padding. Background shows grid bounds.',
      },
    },
  },
};

/**
 * 12-column layout for complex designs
 */
export const TwelveColumn: Story = {
  args: {
    cols: 12,
    gap: 'sm',
    padding: { base: 'sm', md: 'md', lg: 'lg' },
  },
  render: (args) => (
    <Grid {...args}>
      <Card data-color="accent" style={{ gridColumn: 'span 12', minHeight: '80px' }}>
        <Card.Block><Paragraph data-size="sm">Full width header (12 cols)</Paragraph></Card.Block>
      </Card>
      <Card data-color="neutral" style={{ gridColumn: 'span 8', minHeight: '80px' }}>
        <Card.Block><Paragraph data-size="sm">Main content (8 cols)</Paragraph></Card.Block>
      </Card>
      <Card data-color="neutral" style={{ gridColumn: 'span 4', minHeight: '80px' }}>
        <Card.Block><Paragraph data-size="sm">Sidebar (4 cols)</Paragraph></Card.Block>
      </Card>
      <Card data-color="neutral" style={{ gridColumn: 'span 4', minHeight: '60px' }}>
        <Card.Block><Paragraph data-size="sm">Card 1 (4 cols)</Paragraph></Card.Block>
      </Card>
      <Card data-color="neutral" style={{ gridColumn: 'span 4', minHeight: '60px' }}>
        <Card.Block><Paragraph data-size="sm">Card 2 (4 cols)</Paragraph></Card.Block>
      </Card>
      <Card data-color="neutral" style={{ gridColumn: 'span 4', minHeight: '60px' }}>
        <Card.Block><Paragraph data-size="sm">Card 3 (4 cols)</Paragraph></Card.Block>
      </Card>
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use a 12-column grid with gridColumn styles for complex layouts. Note: This is a fixed 12-col grid for precise control.',
      },
    },
  },
};

/**
 * Mobile-first design pattern
 */
export const MobileFirst: Story = {
  args: {
    cols: { base: 1, md: 2, xl: 4 },
    gap: { base: 'sm', md: 'md', lg: 'lg' } as unknown as 'md',
    padding: { base: 'sm', md: 'lg', xl: 'xl' },
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 8 }, (_, i) => (
        <DemoCard key={i} index={i + 1} />
      ))}
    </Grid>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Mobile-first pattern: starts with 1 column and small padding, progressively enhances for larger screens.',
      },
    },
  },
};

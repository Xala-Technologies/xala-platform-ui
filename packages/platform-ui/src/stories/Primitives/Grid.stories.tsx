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
Responsive grid layout component with token-based spacing.

## Features
- **Responsive columns**: Configure columns per breakpoint using object notation
- **Token-based gaps**: Use design system tokens for consistent spacing
- **Auto-fit/fill**: Create intrinsic responsive grids without breakpoints
- **Alignment controls**: Full control over item and content alignment

## Breakpoints
- \`base\`: Mobile-first (default)
- \`sm\`: 640px+
- \`md\`: 768px+ (tablet breakpoint)
- \`lg\`: 1024px+
- \`xl\`: 1280px+

## Gap Tokens
- \`none\`: 0
- \`xs\`: var(--ds-spacing-1)
- \`sm\`: var(--ds-spacing-2)
- \`md\`: var(--ds-spacing-4) - default
- \`lg\`: var(--ds-spacing-6)
- \`xl\`: var(--ds-spacing-8)
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
 * Default grid with 3 fixed columns
 */
export const Default: Story = {
  args: {
    cols: 3,
    gap: 'md',
  },
  render: (args) => (
    <Grid {...args}>
      {Array.from({ length: 6 }, (_, i) => (
        <DemoCard key={i} index={i + 1} />
      ))}
    </Grid>
  ),
};

/**
 * Responsive grid that adapts to screen size
 */
export const Responsive: Story = {
  args: {
    cols: { base: 1, sm: 2, md: 3, lg: 4 },
    gap: 'md',
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
 * Auto-fit grid - automatically fills available space
 */
export const AutoFit: Story = {
  args: {
    autoFit: true,
    minColWidth: '280px',
    gap: 'lg',
  },
  render: (args) => (
    <div style={{ padding: 'var(--ds-spacing-4)' }}>
      <Grid {...args}>
        {Array.from({ length: 6 }, (_, i) => (
          <DemoCard key={i} index={i + 1} />
        ))}
      </Grid>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Uses CSS auto-fit to create responsive columns without breakpoints. Each column is at least 280px wide. Wrapped in a container with padding for proper mobile display.',
      },
    },
  },
};

/**
 * Different gap sizes
 */
export const GapVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((gapSize) => (
        <div key={gapSize}>
          <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            Gap: {gapSize}
          </Heading>
          <Grid cols={4} gap={gapSize}>
            {Array.from({ length: 4 }, (_, i) => (
              <DemoCard key={i} index={i + 1} />
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows all available gap token sizes.',
      },
    },
  },
};

/**
 * Two-column layout with different gap on X and Y axes
 */
export const AsymmetricGaps: Story = {
  args: {
    cols: 2,
    gapX: 'xl',
    gapY: 'sm',
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
        story: 'Different horizontal and vertical gaps using gapX and gapY props.',
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
  },
  render: (args) => (
    <Grid {...args}>
      <Card data-color="accent" style={{ gridColumn: 'span 8', minHeight: '80px' }}>
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
        story: 'Use a 12-column grid with gridColumn styles for complex layouts.',
      },
    },
  },
};

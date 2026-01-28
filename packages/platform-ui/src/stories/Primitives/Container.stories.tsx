/**
 * Container Stories
 *
 * Demonstrates the Container primitive with size presets and responsive behavior.
 *
 * @module @xala-technologies/platform-ui/stories/primitives/Container
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';
import { Container } from '../../primitives/container';

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof Container> = {
  title: 'Primitives/Container',
  component: Container,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Low-level container component with responsive padding and size presets.

## Features
- **Size presets**: sm (600px), md (960px), lg (1200px), max (1440px), full (100%)
- **Responsive padding**: Automatically adjusts padding at breakpoints
- **Container queries**: Enables CSS container queries for child components
- **Centered by default**: Horizontally centered with auto margins

## Size Presets
| Size | Max Width |
|------|-----------|
| sm   | 600px     |
| md   | 960px     |
| lg   | 1200px    |
| max  | 1440px    |
| full | 100%      |
        `,
      },
    },
  },
  argTypes: {
    size: {
      description: 'Container size preset',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'max', 'full'],
    },
    fluid: {
      description: 'Full-width container without max-width constraint',
      control: { type: 'boolean' },
    },
    centered: {
      description: 'Center the container horizontally',
      control: { type: 'boolean' },
    },
    padding: {
      description: 'Padding around content',
      control: { type: 'text' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

// =============================================================================
// Helper Components
// =============================================================================

function ContentBlock() {
  return (
    <Card data-color="neutral" data-size="sm">
      <Card.Block>
        <Paragraph data-size="sm">
          This is sample content inside the container. The container provides consistent max-width
          constraints and responsive padding. Resize the viewport to see how the container adapts.
        </Paragraph>
      </Card.Block>
    </Card>
  );
}

function WidthIndicator() {
  return (
    <div
      style={{
        padding: 'var(--ds-spacing-2)',
        backgroundColor: 'var(--ds-color-accent-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
        marginBottom: 'var(--ds-spacing-4)',
        textAlign: 'center',
      }}
    >
      <Paragraph data-size="sm">Container area (background shows full width)</Paragraph>
    </div>
  );
}

// =============================================================================
// Stories
// =============================================================================

/**
 * Default container with max-width (1440px)
 */
export const Default: Story = {
  args: {
    size: 'max',
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        padding: 'var(--ds-spacing-4)',
      }}
    >
      <Container {...args}>
        <WidthIndicator />
        <ContentBlock />
      </Container>
    </div>
  ),
};

/**
 * All size presets comparison
 */
export const SizePresets: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-8)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        padding: 'var(--ds-spacing-4)',
      }}
    >
      {(['sm', 'md', 'lg', 'max', 'full'] as const).map((size) => (
        <div key={size}>
          <Heading
            level={3}
            data-size="xs"
            style={{ marginBottom: 'var(--ds-spacing-2)', textAlign: 'center' }}
          >
            Size: {size}
          </Heading>
          <Container
            size={size}
            style={{ backgroundColor: 'var(--ds-color-accent-surface-default)' }}
          >
            <Card data-color="neutral" data-size="sm">
              <Card.Block>
                <Paragraph data-size="sm">Container with size=&quot;{size}&quot;</Paragraph>
              </Card.Block>
            </Card>
          </Container>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'Comparison of all container size presets. The colored background shows the actual container width.',
      },
    },
  },
};

/**
 * Fluid container (no max-width)
 */
export const Fluid: Story = {
  args: {
    fluid: true,
    padding: 'var(--ds-spacing-6)',
  },
  render: (args) => (
    <div style={{ backgroundColor: 'var(--ds-color-neutral-surface-default)' }}>
      <Container {...args}>
        <Card data-color="neutral" data-size="sm">
          <Card.Block>
            <Heading level={3} data-size="sm">
              Fluid Container
            </Heading>
            <Paragraph data-size="sm">
              This container has no max-width constraint and spans the full width of its parent.
              Useful for full-bleed sections or edge-to-edge layouts.
            </Paragraph>
          </Card.Block>
        </Card>
      </Container>
    </div>
  ),
};

/**
 * Custom max-width
 */
export const CustomWidth: Story = {
  args: {
    maxWidth: '800px',
    padding: 'var(--ds-spacing-4)',
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        padding: 'var(--ds-spacing-4)',
      }}
    >
      <Container {...args}>
        <Card data-color="accent" data-size="sm">
          <Card.Block>
            <Heading level={3} data-size="sm">
              Custom Width: 800px
            </Heading>
            <Paragraph data-size="sm">
              Use the maxWidth prop for custom widths that don&apos;t match the presets.
            </Paragraph>
          </Card.Block>
        </Card>
      </Container>
    </div>
  ),
};

/**
 * Not centered (aligned to left)
 */
export const NotCentered: Story = {
  args: {
    size: 'md',
    centered: false,
    padding: 'var(--ds-spacing-4)',
  },
  render: (args) => (
    <div
      style={{
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        padding: 'var(--ds-spacing-4)',
      }}
    >
      <Container {...args}>
        <Card data-color="neutral" data-size="sm">
          <Card.Block>
            <Heading level={3} data-size="sm">
              Left-aligned Container
            </Heading>
            <Paragraph data-size="sm">
              Set centered=false to align the container to the left instead of centering it.
            </Paragraph>
          </Card.Block>
        </Card>
      </Container>
    </div>
  ),
};

/**
 * With different padding options
 */
export const PaddingVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
      }}
    >
      <Container
        size="lg"
        padding="var(--ds-spacing-2)"
        style={{ backgroundColor: 'var(--ds-color-info-surface-default)' }}
      >
        <Card data-color="neutral" data-size="sm">
          <Card.Block>
            <Paragraph data-size="sm">Padding: spacing-2</Paragraph>
          </Card.Block>
        </Card>
      </Container>
      <Container
        size="lg"
        padding="var(--ds-spacing-4)"
        style={{ backgroundColor: 'var(--ds-color-info-surface-default)' }}
      >
        <Card data-color="neutral" data-size="sm">
          <Card.Block>
            <Paragraph data-size="sm">Padding: spacing-4</Paragraph>
          </Card.Block>
        </Card>
      </Container>
      <Container
        size="lg"
        padding="var(--ds-spacing-8)"
        style={{ backgroundColor: 'var(--ds-color-info-surface-default)' }}
      >
        <Card data-color="neutral" data-size="sm">
          <Card.Block>
            <Paragraph data-size="sm">Padding: spacing-8 (default)</Paragraph>
          </Card.Block>
        </Card>
      </Container>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different padding values using design system spacing tokens.',
      },
    },
  },
};

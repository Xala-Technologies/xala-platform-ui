/**
 * PageContainer Stories
 *
 * Demonstrates the PageContainer composed component with semantic HTML support.
 *
 * @module @xala-technologies/platform-ui/stories/composed/PageContainer
 */

import type { Meta, StoryObj } from '@storybook/react';
import { Card, Heading, Paragraph, Button } from '@digdir/designsystemet-react';
import { PageContainer } from '../../composed/PageContainer';

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof PageContainer> = {
  title: 'Composed/PageContainer',
  component: PageContainer,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Semantic page wrapper with proper spacing from design tokens.

## Accessibility Features
- **Renders as \`<main>\` element** by default for proper document structure
- **Skip-link support**: Uses \`id="main-content"\` by default for keyboard navigation
- **\`tabIndex={-1}\`**: Allows focus to be programmatically moved to main content

## Features
- Token-based gap spacing (1-8 scale)
- Max-width presets (sm, md, lg, xl, full, none)
- Optional padding
- Can render as \`<div>\` for nested containers

## Semantic HTML
The PageContainer renders as a \`<main>\` element, which is important for:
- Screen readers to identify the main content area
- Skip-link navigation to bypass header/nav
- SEO and document structure

Use \`asMain={false}\` when nesting containers or when another element serves as main.
        `,
      },
    },
  },
  argTypes: {
    gap: {
      description: 'Spacing between child elements (1-8)',
      control: { type: 'number', min: 1, max: 8, step: 1 },
    },
    maxWidth: {
      description: 'Maximum width constraint',
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', 'full', 'none'],
    },
    padding: {
      description: 'Padding around content (0-6)',
      control: { type: 'number', min: 0, max: 6, step: 1 },
    },
    asMain: {
      description: 'Render as <main> element',
      control: { type: 'boolean' },
    },
    skipLinkId: {
      description: 'ID for skip-link navigation',
      control: { type: 'text' },
    },
    centered: {
      description: 'Center the container horizontally',
      control: { type: 'boolean' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof PageContainer>;

// =============================================================================
// Stories
// =============================================================================

/**
 * Default page container
 */
export const Default: Story = {
  args: {
    gap: 6,
    maxWidth: 'lg',
    padding: 4,
    asMain: true,
  },
  render: (args) => (
    <PageContainer {...args}>
      <Card data-color="neutral" data-size="md">
        <Card.Header>
          <Heading level={1} data-size="lg">Page Title</Heading>
        </Card.Header>
        <Card.Block>
          <Paragraph>
            This is a semantic page container that renders as a &lt;main&gt; element.
            It provides consistent spacing and max-width constraints for page content.
          </Paragraph>
        </Card.Block>
      </Card>
      <Card data-color="neutral" data-size="md">
        <Card.Header>
          <Heading level={2} data-size="md">Section One</Heading>
        </Card.Header>
        <Card.Block>
          <Paragraph>
            Content sections are spaced using the gap prop, which maps to design tokens.
          </Paragraph>
        </Card.Block>
      </Card>
      <Card data-color="neutral" data-size="md">
        <Card.Header>
          <Heading level={2} data-size="md">Section Two</Heading>
        </Card.Header>
        <Card.Block>
          <Paragraph>
            The container is centered by default and has a constrained max-width for readability.
          </Paragraph>
        </Card.Block>
      </Card>
    </PageContainer>
  ),
};

/**
 * With skip-link demonstration
 */
export const WithSkipLink: Story = {
  args: {
    gap: 6,
    maxWidth: 'lg',
    padding: 4,
    skipLinkId: 'main-content',
  },
  render: (args) => (
    <div>
      {/* Skip link (usually in layout header) */}
      <a
        href="#main-content"
        style={{
          position: 'absolute',
          left: '-9999px',
          top: '0',
          padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-accent-base-default)',
          color: 'var(--ds-color-accent-contrast-default)',
          zIndex: 9999,
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '0';
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-9999px';
        }}
      >
        Skip to main content
      </a>

      {/* Simulated header */}
      <header style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderBottom: '1px solid var(--ds-color-neutral-border-default)',
      }}>
        <Heading level={2} data-size="sm">Site Header (Tab here to see skip link)</Heading>
      </header>

      {/* Main content */}
      <PageContainer {...args}>
        <Heading level={1} data-size="lg">Main Content</Heading>
        <Paragraph>
          Press Tab when focused on the header area to reveal the skip link.
          The skip link targets the main-content ID which this container provides.
        </Paragraph>
        <Button data-color="accent">Focusable Button</Button>
      </PageContainer>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demonstrates skip-link accessibility. Focus on the header and press Tab to see the skip link appear.',
      },
    },
  },
};

/**
 * Different max-width presets
 */
export const MaxWidthVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((width) => (
        <div key={width}>
          <Heading level={3} data-size="xs" style={{ textAlign: 'center', marginBottom: 'var(--ds-spacing-2)' }}>
            maxWidth: {width}
          </Heading>
          <PageContainer
            maxWidth={width}
            gap={4}
            padding={4}
            asMain={false}
            style={{ backgroundColor: 'var(--ds-color-info-surface-default)' }}
          >
            <Card data-color="neutral" data-size="sm">
              <Card.Block>
                <Paragraph data-size="sm">Content with maxWidth=&quot;{width}&quot;</Paragraph>
              </Card.Block>
            </Card>
          </PageContainer>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Shows all available max-width presets. The colored background indicates the container bounds.',
      },
    },
  },
};

/**
 * Gap spacing variations
 */
export const GapVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      {([2, 4, 6, 8] as const).map((gapValue) => (
        <div key={gapValue}>
          <Heading level={3} data-size="xs" style={{ textAlign: 'center', marginBottom: 'var(--ds-spacing-2)' }}>
            gap: {gapValue}
          </Heading>
          <PageContainer
            maxWidth="md"
            gap={gapValue}
            padding={4}
            asMain={false}
            style={{ backgroundColor: 'var(--ds-color-neutral-surface-default)' }}
          >
            <Card data-color="neutral" data-size="sm">
              <Card.Block><Paragraph data-size="sm">Card 1</Paragraph></Card.Block>
            </Card>
            <Card data-color="neutral" data-size="sm">
              <Card.Block><Paragraph data-size="sm">Card 2</Paragraph></Card.Block>
            </Card>
            <Card data-color="neutral" data-size="sm">
              <Card.Block><Paragraph data-size="sm">Card 3</Paragraph></Card.Block>
            </Card>
          </PageContainer>
        </div>
      ))}
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different gap values controlling spacing between child elements.',
      },
    },
  },
};

/**
 * As div (for nested containers)
 */
export const AsDiv: Story = {
  args: {
    asMain: false,
    gap: 4,
    maxWidth: 'md',
    padding: 4,
  },
  render: (args) => (
    <main style={{ padding: 'var(--ds-spacing-4)' }}>
      <Heading level={1} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
        Page with Existing Main Element
      </Heading>
      <PageContainer {...args} style={{ backgroundColor: 'var(--ds-color-neutral-surface-default)' }}>
        <Heading level={2} data-size="md">Nested Section</Heading>
        <Paragraph>
          When there&apos;s already a &lt;main&gt; element in the page structure,
          use asMain=false to render as a &lt;div&gt; instead.
        </Paragraph>
        <Card data-color="neutral" data-size="sm">
          <Card.Block>
            <Paragraph data-size="sm">This maintains valid HTML structure.</Paragraph>
          </Card.Block>
        </Card>
      </PageContainer>
    </main>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Use asMain={false} when the PageContainer is nested within an existing <main> element.',
      },
    },
  },
};

/**
 * Dashboard-style layout
 */
export const DashboardLayout: Story = {
  args: {
    gap: 6,
    maxWidth: 'xl',
    padding: 6,
  },
  render: (args) => (
    <PageContainer {...args} style={{ backgroundColor: 'var(--ds-color-neutral-background-default)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Heading level={1} data-size="lg">Dashboard</Heading>
        <Button data-color="accent">New Item</Button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 'var(--ds-spacing-4)',
      }}>
        {['Revenue', 'Users', 'Orders', 'Conversion'].map((stat) => (
          <Card key={stat} data-color="neutral" data-size="sm">
            <Card.Header>
              <Heading level={3} data-size="sm">{stat}</Heading>
            </Card.Header>
            <Card.Block>
              <Paragraph data-size="lg" style={{ fontWeight: 'bold' }}>
                {Math.floor(Math.random() * 10000).toLocaleString()}
              </Paragraph>
            </Card.Block>
          </Card>
        ))}
      </div>

      <Card data-color="neutral" data-size="md">
        <Card.Header>
          <Heading level={2} data-size="md">Recent Activity</Heading>
        </Card.Header>
        <Card.Block>
          <Paragraph>Activity list would go here...</Paragraph>
        </Card.Block>
      </Card>
    </PageContainer>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of a dashboard-style page layout using PageContainer.',
      },
    },
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { Container, Grid, Stack } from '../../primitives';

const meta: Meta = {
  title: 'Primitives/Layout',
  parameters: {
    docs: {
      description: {
        component: `
Low-level layout primitives for building consistent UIs.

## Components
- **Container** - Centered container with max-width
- **Grid** - CSS Grid wrapper
- **Stack** - Flexbox stack (vertical/horizontal)

## When to Use
- Building page layouts
- Creating consistent spacing
- Component composition
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

const Box = ({ children, color = 'accent' }: { children: React.ReactNode; color?: string }) => (
  <div
    style={{
      padding: 'var(--ds-spacing-4)',
      backgroundColor: `var(--ds-color-${color}-surface-default)`,
      border: `1px solid var(--ds-color-${color}-border-default)`,
      borderRadius: 'var(--ds-border-radius-md)',
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

/**
 * Container with max-width and centered content
 */
export const ContainerDefault: Story = {
  name: 'Container',
  render: function Render() {
    return (
      <Container style={{ backgroundColor: 'var(--ds-color-neutral-surface-hover)' }}>
        <Box>"Eksempel Tekst"</Box>
      </Container>
    );
  },
};

/**
 * Fluid container (no max-width)
 */
export const ContainerFluid: Story = {
  name: 'Container Fluid',
  render: function Render() {
    return (
      <Container fluid style={{ backgroundColor: 'var(--ds-color-neutral-surface-hover)' }}>
        <Box>"Eksempel Tekst"</Box>
      </Container>
    );
  },
};

/**
 * Basic CSS Grid
 */
export const GridBasic: Story = {
  name: 'Grid',
  render: function Render() {
    return (
      <Grid columns="repeat(3, 1fr)" gap="var(--ds-spacing-4)">
        <Box>"Eksempel Tekst" 1</Box>
        <Box>"Eksempel Tekst" 2</Box>
        <Box>"Eksempel Tekst" 3</Box>
        <Box>"Eksempel Tekst" 4</Box>
        <Box>"Eksempel Tekst" 5</Box>
        <Box>"Eksempel Tekst" 6</Box>
      </Grid>
    );
  },
};

/**
 * Grid with different column sizes
 */
export const GridMixed: Story = {
  name: 'Grid Mixed Columns',
  render: function Render() {
    return (
      <Grid columns="1fr 2fr 1fr" gap="var(--ds-spacing-4)">
        <Box>"Eksempel Tekst"</Box>
        <Box>"Eksempel Tekst" (2fr)</Box>
        <Box>"Eksempel Tekst"</Box>
      </Grid>
    );
  },
};

/**
 * Auto-fit grid for responsive cards
 */
export const GridAutoFit: Story = {
  name: 'Grid Auto-fit',
  render: function Render() {
    return (
      <Grid columns="repeat(auto-fit, minmax(var(--ds-spacing-48), 1fr))" gap="var(--ds-spacing-4)">
        <Box>"Eksempel Tekst" 1</Box>
        <Box>"Eksempel Tekst" 2</Box>
        <Box>"Eksempel Tekst" 3</Box>
        <Box>"Eksempel Tekst" 4</Box>
      </Grid>
    );
  },
};

/**
 * Vertical stack (default)
 */
export const StackVertical: Story = {
  name: 'Stack Vertical',
  render: function Render() {
    return (
      <Stack spacing="var(--ds-spacing-4)">
        <Box>"Eksempel Tekst" 1</Box>
        <Box>"Eksempel Tekst" 2</Box>
        <Box>"Eksempel Tekst" 3</Box>
      </Stack>
    );
  },
};

/**
 * Horizontal stack
 */
export const StackHorizontal: Story = {
  name: 'Stack Horizontal',
  render: function Render() {
    return (
      <Stack direction="horizontal" spacing="var(--ds-spacing-4)">
        <Box>"Eksempel Tekst" 1</Box>
        <Box>"Eksempel Tekst" 2</Box>
        <Box>"Eksempel Tekst" 3</Box>
      </Stack>
    );
  },
};

/**
 * Stack with alignment
 */
export const StackAligned: Story = {
  name: 'Stack Aligned',
  render: function Render() {
    return (
      <Stack
        direction="horizontal"
        spacing="var(--ds-spacing-4)"
        justify="between"
        align="center"
        style={{
          minHeight: 'var(--ds-spacing-32)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          padding: 'var(--ds-spacing-4)',
        }}
      >
        <Box>"Eksempel Tekst"</Box>
        <Box>"Eksempel Tekst"</Box>
        <Box>"Eksempel Tekst"</Box>
      </Stack>
    );
  },
};

/**
 * Combined layout example
 */
export const CombinedLayout: Story = {
  name: 'Combined Example',
  render: function Render() {
    return (
      <Container>
        <Stack spacing="var(--ds-spacing-6)">
          <Box color="info">"Eksempel Tekst"</Box>
          <Grid columns="var(--ds-spacing-64) 1fr" gap="var(--ds-spacing-4)">
            <Stack spacing="var(--ds-spacing-2)">
              <Box color="warning">"Eksempel Tekst" 1</Box>
              <Box color="warning">"Eksempel Tekst" 2</Box>
              <Box color="warning">"Eksempel Tekst" 3</Box>
            </Stack>
            <Stack spacing="var(--ds-spacing-4)">
              <Box>"Eksempel Tekst"</Box>
              <Grid columns="repeat(2, 1fr)" gap="var(--ds-spacing-4)">
                <Box color="success">"Eksempel Tekst" 1</Box>
                <Box color="success">"Eksempel Tekst" 2</Box>
              </Grid>
            </Stack>
          </Grid>
          <Box color="neutral">"Eksempel Tekst"</Box>
        </Stack>
      </Container>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
    const t = useT();
    return (
      <Container style={{ backgroundColor: 'var(--ds-color-neutral-surface-hover)' }}>
        <Box>{t('storybook.layout.contentInsideContainer')}</Box>
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
    const t = useT();
    return (
      <Container fluid style={{ backgroundColor: 'var(--ds-color-neutral-surface-hover)' }}>
        <Box>{t('storybook.layout.fullWidthFluidContainer')}</Box>
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
    const t = useT();
    return (
      <Grid columns="repeat(3, 1fr)" gap="var(--ds-spacing-4)">
        <Box>{t('storybook.layout.column')} 1</Box>
        <Box>{t('storybook.layout.column')} 2</Box>
        <Box>{t('storybook.layout.column')} 3</Box>
        <Box>{t('storybook.layout.column')} 4</Box>
        <Box>{t('storybook.layout.column')} 5</Box>
        <Box>{t('storybook.layout.column')} 6</Box>
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
    const t = useT();
    return (
      <Grid columns="1fr 2fr 1fr" gap="var(--ds-spacing-4)">
        <Box>{t('storybook.layout.sidebar')}</Box>
        <Box>{t('storybook.layout.mainContent')} (2fr)</Box>
        <Box>{t('storybook.layout.sidebar')}</Box>
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
    const t = useT();
    return (
      <Grid columns="repeat(auto-fit, minmax(var(--ds-spacing-48), 1fr))" gap="var(--ds-spacing-4)">
        <Box>{t('storybook.layout.card')} 1</Box>
        <Box>{t('storybook.layout.card')} 2</Box>
        <Box>{t('storybook.layout.card')} 3</Box>
        <Box>{t('storybook.layout.card')} 4</Box>
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
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)">
        <Box>{t('storybook.layout.item')} 1</Box>
        <Box>{t('storybook.layout.item')} 2</Box>
        <Box>{t('storybook.layout.item')} 3</Box>
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
    const t = useT();
    return (
      <Stack direction="horizontal" spacing="var(--ds-spacing-4)">
        <Box>{t('storybook.layout.item')} 1</Box>
        <Box>{t('storybook.layout.item')} 2</Box>
        <Box>{t('storybook.layout.item')} 3</Box>
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
    const t = useT();
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
        <Box>{t('storybook.layout.left')}</Box>
        <Box>{t('storybook.layout.center')}</Box>
        <Box>{t('storybook.layout.right')}</Box>
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
    const t = useT();
    return (
      <Container>
        <Stack spacing="var(--ds-spacing-6)">
          <Box color="info">{t('storybook.layout.header')}</Box>
          <Grid columns="var(--ds-spacing-64) 1fr" gap="var(--ds-spacing-4)">
            <Stack spacing="var(--ds-spacing-2)">
              <Box color="warning">{t('storybook.layout.navItem')} 1</Box>
              <Box color="warning">{t('storybook.layout.navItem')} 2</Box>
              <Box color="warning">{t('storybook.layout.navItem')} 3</Box>
            </Stack>
            <Stack spacing="var(--ds-spacing-4)">
              <Box>{t('storybook.layout.mainContentArea')}</Box>
              <Grid columns="repeat(2, 1fr)" gap="var(--ds-spacing-4)">
                <Box color="success">{t('storybook.layout.card')} 1</Box>
                <Box color="success">{t('storybook.layout.card')} 2</Box>
              </Grid>
            </Stack>
          </Grid>
          <Box color="neutral">{t('storybook.layout.footer')}</Box>
        </Stack>
      </Container>
    );
  },
};

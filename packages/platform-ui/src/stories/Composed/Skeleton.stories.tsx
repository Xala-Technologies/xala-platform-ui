import type { Meta, StoryObj } from '@storybook/react';
import {
  Skeleton,
  SkeletonText,
  SkeletonCard,
  SkeletonTable,
  SkeletonAvatar,
} from '../../composed/Skeleton';
import { Card, Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof Skeleton> = {
  title: 'Composed/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Skeleton Loading Components

Placeholder skeletons for loading states. Multiple variants for different content types.

### Features
- Multiple variants (text, circular, rectangular, rounded)
- Animation types (pulse, wave, none)
- Pre-built components (SkeletonText, SkeletonCard, SkeletonTable, SkeletonAvatar)
- Customizable dimensions

### Usage
\`\`\`tsx
<Skeleton variant="text" width="100%" height="20px" animation="pulse" />
<SkeletonText lines={3} />
<SkeletonCard hasImage lines={3} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['text', 'circular', 'rectangular', 'rounded'],
      description: 'Skeleton variant',
    },
    animation: {
      control: 'select',
      options: ['pulse', 'wave', 'none'],
      description: 'Animation type',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Text variant
export const Text: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: '20px',
    animation: 'pulse',
  },
};

// Circular variant
export const Circular: Story = {
  args: {
    variant: 'circular',
    width: 40,
    height: 40,
    animation: 'pulse',
  },
};

// Rectangular variant
export const Rectangular: Story = {
  args: {
    variant: 'rectangular',
    width: '100%',
    height: 200,
    animation: 'pulse',
  },
};

// Rounded variant
export const Rounded: Story = {
  args: {
    variant: 'rounded',
    width: '100%',
    height: 100,
    animation: 'pulse',
  },
};

// Animation variants
export const PulseAnimation: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: '20px',
    animation: 'pulse',
  },
};

export const WaveAnimation: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: '20px',
    animation: 'wave',
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'text',
    width: '100%',
    height: '20px',
    animation: 'none',
  },
};

// SkeletonText component
export const TextSkeleton: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <SkeletonText lines={3} animation="pulse" />
    </div>
  ),
};

export const TextSkeletonCustom: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <SkeletonText lines={4} lastLineWidth="40%" animation="wave" />
    </div>
  ),
};

// SkeletonCard component
export const CardSkeleton: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <SkeletonCard hasImage imageHeight="200px" lines={3} animation="pulse" />
    </div>
  ),
};

export const CardSkeletonNoImage: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <SkeletonCard hasImage={false} lines={3} animation="pulse" />
    </div>
  ),
};

// SkeletonTable component
export const TableSkeleton: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <SkeletonTable rows={5} columns={4} hasHeader animation="pulse" />
    </div>
  ),
};

export const TableSkeletonNoHeader: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <SkeletonTable rows={3} columns={3} hasHeader={false} animation="wave" />
    </div>
  ),
};

// SkeletonAvatar component
export const AvatarSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
      <SkeletonAvatar size="sm" animation="pulse" />
      <SkeletonAvatar size="md" animation="pulse" />
      <SkeletonAvatar size="lg" animation="pulse" />
    </div>
  ),
};

// Combined example
export const CombinedExample: Story = {
  render: () => (
    <Card
      data-color="neutral"
      data-size="medium"
      style={{ padding: 'var(--ds-spacing-4)', width: '400px' }}
    >
      <div
        style={{ display: 'flex', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-4)' }}
      >
        <SkeletonAvatar size="md" animation="pulse" />
        <div style={{ flex: 1 }}>
          <Skeleton
            variant="text"
            width="60%"
            height="16px"
            animation="pulse"
            style={{ marginBottom: 'var(--ds-spacing-2)' }}
          />
          <Skeleton variant="text" width="40%" height="14px" animation="pulse" />
        </div>
      </div>
      <Skeleton
        variant="rectangular"
        width="100%"
        height="200px"
        animation="pulse"
        style={{ marginBottom: 'var(--ds-spacing-4)', borderRadius: 'var(--ds-border-radius-md)' }}
      />
      <SkeletonText lines={2} animation="pulse" />
    </Card>
  ),
};

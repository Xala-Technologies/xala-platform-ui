import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ProgressBar, ProgressRing, ProgressSteps } from '../../composed/Progress';

const meta: Meta<typeof ProgressBar> = {
  title: 'Composed/Progress',
  component: ProgressBar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Progress Components

Progress bars and rings for loading/completion states. Multiple variants and display options.

### Features
- ProgressBar with variants and sizes
- ProgressRing for circular progress
- ProgressSteps for step-based progress
- Label positioning options
- Animation and striped effects

### Usage
\`\`\`tsx
<ProgressBar value={75} max={100} variant="success" showLabel />
<ProgressRing value={60} size={120} />
<ProgressSteps steps={['Step 1', 'Step 2', 'Step 3']} currentStep={1} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Progress variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Progress size',
    },
    showLabel: {
      control: 'boolean',
      description: 'Show percentage label',
    },
    animated: {
      control: 'boolean',
      description: 'Animate progress',
    },
    striped: {
      control: 'boolean',
      description: 'Show striped pattern',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need translations
const RingDemo = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <ProgressRing value={75} size={120} variant="default" showLabel />
      <ProgressRing value={50} size={100} variant="success" showLabel />
      <ProgressRing value={25} size={80} variant="danger" showLabel />
    </div>
  );
};

const StepsDemo = () => {
  const t = useT();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <ProgressSteps
        steps={[
          `${t('storybook.demo.step')} 1`,
          `${t('storybook.demo.step')} 2`,
          `${t('storybook.demo.step')} 3`,
          `${t('storybook.demo.step')} 4`,
        ]}
        currentStep={1}
        variant="default"
      />
      <ProgressSteps
        steps={[
          t('storybook.demo.create'),
          t('storybook.demo.review'),
          t('storybook.demo.approve'),
          t('storybook.demo.publish'),
        ]}
        currentStep={2}
        variant="success"
      />
      <ProgressSteps
        steps={[
          t('storybook.demo.start'),
          t('storybook.demo.process'),
          t('storybook.demo.complete'),
        ]}
        currentStep={0}
        variant="info"
      />
    </div>
  );
};

const AllVariantsDemo = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
        width: '400px',
      }}
    >
      <ProgressBar value={100} variant="success" showLabel />
      <ProgressBar value={75} variant="default" showLabel />
      <ProgressBar value={50} variant="warning" showLabel />
      <ProgressBar value={25} variant="danger" showLabel />
      <ProgressBar value={60} variant="info" showLabel />
    </div>
  );
};

// Basic progress bar
export const Default: Story = {
  args: {
    value: 75,
    max: 100,
    variant: 'default',
    size: 'md',
    showLabel: false,
    animated: false,
    striped: false,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    value: 65,
    max: 100,
    variant: 'default',
    size: 'md',
    showLabel: true,
    labelPosition: 'outside',
    animated: false,
    striped: false,
  },
};

// Label inside
export const LabelInside: Story = {
  args: {
    value: 80,
    max: 100,
    variant: 'success',
    size: 'lg',
    showLabel: true,
    labelPosition: 'inside',
    animated: false,
    striped: false,
  },
};

// Label on top
export const LabelTop: Story = {
  args: {
    value: 45,
    max: 100,
    variant: 'info',
    size: 'md',
    showLabel: true,
    labelPosition: 'top',
    animated: false,
    striped: false,
  },
};

// Variants
export const Success: Story = {
  args: {
    value: 90,
    max: 100,
    variant: 'success',
    size: 'md',
    showLabel: true,
    animated: false,
    striped: false,
  },
};

export const Warning: Story = {
  args: {
    value: 60,
    max: 100,
    variant: 'warning',
    size: 'md',
    showLabel: true,
    animated: false,
    striped: false,
  },
};

export const Danger: Story = {
  args: {
    value: 30,
    max: 100,
    variant: 'danger',
    size: 'md',
    showLabel: true,
    animated: false,
    striped: false,
  },
};

// Sizes
export const Small: Story = {
  args: {
    value: 50,
    max: 100,
    variant: 'default',
    size: 'sm',
    showLabel: true,
    animated: false,
    striped: false,
  },
};

export const Large: Story = {
  args: {
    value: 70,
    max: 100,
    variant: 'default',
    size: 'lg',
    showLabel: true,
    animated: false,
    striped: false,
  },
};

// Animated
export const Animated: Story = {
  args: {
    value: 75,
    max: 100,
    variant: 'default',
    size: 'md',
    showLabel: true,
    animated: true,
    striped: false,
  },
};

// Striped
export const Striped: Story = {
  args: {
    value: 65,
    max: 100,
    variant: 'success',
    size: 'md',
    showLabel: true,
    animated: true,
    striped: true,
  },
};

// ProgressRing
export const Ring: Story = {
  render: () => <RingDemo />,
};

// ProgressSteps
export const Steps: Story = {
  render: () => <StepsDemo />,
};

// All variants showcase
export const AllVariants: Story = {
  render: () => <AllVariantsDemo />,
};

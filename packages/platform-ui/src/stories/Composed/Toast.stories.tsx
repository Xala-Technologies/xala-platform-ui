import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ToastProvider, useToast } from '../../composed/Toast';
import { Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof ToastProvider> = {
  title: 'Composed/Toast',
  component: ToastProvider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Toast

A reusable toast notification system with provider and hooks. Supports multiple toast types, auto-dismiss, and stacking.

### Features
- Multiple variants (info, success, warning, error)
- Auto-dismiss with configurable duration
- Action buttons
- Multiple positions
- Stacking with max limit
- Dismissible toasts

### Usage
\`\`\`tsx
// Wrap app with ToastProvider
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Use in components
const { toast, success, error } = useToast();
toast({ title: 'Notification', variant: 'info' });
success('Success!', 'Operation completed');
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    position: {
      control: 'select',
      options: [
        'top-right',
        'top-left',
        'top-center',
        'bottom-right',
        'bottom-left',
        'bottom-center',
      ],
      description: 'Toast position',
    },
    maxToasts: {
      control: 'number',
      description: 'Maximum number of toasts',
    },
    defaultDuration: {
      control: 'number',
      description: 'Default auto-dismiss duration (ms)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Toast trigger component
const ToastDemo = () => {
  const { toast, success, error, warning, info } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
      <Button
        onClick={() => toast({ title: 'Info Toast', variant: 'info' })}
        data-color="info"
        data-size="medium"
      >
        Show Info
      </Button>
      <Button
        onClick={() => success('Success!', 'Operation completed successfully')}
        data-color="success"
        data-size="medium"
      >
        Show Success
      </Button>
      <Button
        onClick={() => warning('Warning!', 'Please review this action')}
        data-color="warning"
        data-size="medium"
      >
        Show Warning
      </Button>
      <Button
        onClick={() => error('Error!', 'Something went wrong')}
        data-color="danger"
        data-size="medium"
      >
        Show Error
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'With Action',
            description: 'This toast has an action button',
            variant: 'info',
            action: { label: 'Undo', onClick: fn() },
          })
        }
        data-color="accent"
        data-size="medium"
      >
        Show with Action
      </Button>
      <Button
        onClick={() =>
          toast({
            title: 'Persistent',
            description: 'This toast will not auto-dismiss',
            variant: 'info',
            duration: 0,
          })
        }
        data-color="neutral"
        data-size="medium"
      >
        Show Persistent
      </Button>
    </div>
  );
};

// Default position
export const Default: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'top-right',
    maxToasts: 5,
    defaultDuration: 5000,
  },
};

// Bottom right
export const BottomRight: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'bottom-right',
    maxToasts: 5,
    defaultDuration: 5000,
  },
};

// Top center
export const TopCenter: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'top-center',
    maxToasts: 5,
    defaultDuration: 5000,
  },
};

// Bottom left
export const BottomLeft: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'bottom-left',
    maxToasts: 5,
    defaultDuration: 5000,
  },
};

// Custom duration
export const CustomDuration: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'top-right',
    maxToasts: 5,
    defaultDuration: 10000,
  },
};

// Limited toasts
export const LimitedToasts: Story = {
  render: (args) => (
    <ToastProvider {...args}>
      <ToastDemo />
    </ToastProvider>
  ),
  args: {
    position: 'top-right',
    maxToasts: 3,
    defaultDuration: 5000,
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
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
  const t = useT();
  const { toast, success, error, warning, info } = useToast();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
      <Button
        onClick={() => toast({ title: t('storybook.demo.infoToast'), variant: 'info' })}
        data-color="info"
        data-size="medium"
      >
        {t('storybook.demo.showInfo')}
      </Button>
      <Button
        onClick={() =>
          success(t('storybook.story.success'), t('storybook.demo.operationCompleted'))
        }
        data-color="success"
        data-size="medium"
      >
        {t('storybook.demo.showSuccess')}
      </Button>
      <Button
        onClick={() => warning(t('storybook.demo.warning'), t('storybook.demo.reviewAction'))}
        data-color="warning"
        data-size="medium"
      >
        {t('storybook.demo.showWarning')}
      </Button>
      <Button
        onClick={() => error(t('storybook.story.error'), t('storybook.demo.somethingWentWrong'))}
        data-color="danger"
        data-size="medium"
      >
        {t('storybook.demo.showError')}
      </Button>
      <Button
        onClick={() =>
          toast({
            title: t('storybook.demo.withAction'),
            description: t('storybook.demo.toastWithActionButton'),
            variant: 'info',
            action: { label: t('storybook.demo.undo'), onClick: fn() },
          })
        }
        data-color="accent"
        data-size="medium"
      >
        {t('storybook.demo.showWithAction')}
      </Button>
      <Button
        onClick={() =>
          toast({
            title: t('storybook.demo.persistent'),
            description: t('storybook.demo.toastWillNotAutoDismiss'),
            variant: 'info',
            duration: 0,
          })
        }
        data-color="neutral"
        data-size="medium"
      >
        {t('storybook.demo.showPersistent')}
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

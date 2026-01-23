import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Alert } from '../../composed/Alert';
import { Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof Alert> = {
  title: 'Composed/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Alert

Inline alert banners for displaying contextual messages. Supports info, success, warning, and error variants.

### Features
- Four variants: info, success, warning, error
- Dismissible alerts
- Optional title
- Action button support
- Custom icons
- Proper ARIA roles

### Usage
\`\`\`tsx
<Alert
  variant="info"
  title="Information"
  dismissible={true}
  onDismiss={handleDismiss}
>
  This is an informational message.
</Alert>
\`\`\`
        `,
      },
    },
  },
  args: {
    onDismiss: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'error'],
      description: 'Alert variant',
    },
    dismissible: {
      control: 'boolean',
      description: 'Show dismiss button',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Info variant
export const Info: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    children:
      'This is an informational message. Use this for general information that users should be aware of.',
    dismissible: false,
  },
};

// Success variant
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
    dismissible: false,
  },
};

// Warning variant
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your changes before proceeding. Some fields may need attention.',
    dismissible: false,
  },
};

// Error variant
export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Error',
    children: 'An error occurred while processing your request. Please try again.',
    dismissible: false,
  },
};

// Without title
export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'This alert does not have a title. The message is displayed directly.',
    dismissible: false,
  },
};

// Dismissible
export const Dismissible: Story = {
  args: {
    variant: 'info',
    title: 'Dismissible Alert',
    children: 'This alert can be dismissed by clicking the close button.',
    dismissible: true,
    onDismiss: fn(),
  },
};

// With action button
export const WithAction: Story = {
  args: {
    variant: 'warning',
    title: 'Action Required',
    children: 'Your session will expire soon. Click the button below to extend it.',
    dismissible: false,
    action: {
      label: 'Extend Session',
      onClick: fn(),
    },
  },
};

// With custom icon
export const WithCustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom Icon',
    children: 'This alert uses a custom icon instead of the default variant icon.',
    dismissible: false,
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
};

// Long content
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Detailed Information',
    children:
      'This alert contains a longer message to demonstrate how the component handles extended content. The text will wrap naturally within the alert container, maintaining proper spacing and readability. This is useful for providing detailed explanations or instructions to users.',
    dismissible: true,
    onDismiss: fn(),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
        width: '600px',
      }}
    >
      <Alert variant="info" title="Info">
        This is an informational alert.
      </Alert>
      <Alert variant="success" title="Success">
        Operation completed successfully.
      </Alert>
      <Alert variant="warning" title="Warning">
        Please review before proceeding.
      </Alert>
      <Alert variant="error" title="Error">
        An error occurred. Please try again.
      </Alert>
    </div>
  ),
};

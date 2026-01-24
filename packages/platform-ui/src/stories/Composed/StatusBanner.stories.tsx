import type { Meta, StoryObj } from '@storybook/react';
import { StatusBanner } from '../../composed/StatusBanner';
import { Button } from '@digdir/designsystemet-react';
import { CheckCircle, AlertCircle, Info, XCircle } from 'lucide-react';

const meta: Meta<typeof StatusBanner> = {
  title: 'Composed/StatusBanner',
  component: StatusBanner,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## StatusBanner

Contextual status banners for detail pages. Displays status information with icon and description.

### Features
- Multiple variants (info, success, warning, danger, neutral)
- Custom icons
- Action buttons
- Title and description
- Design token compliant

### Usage
\`\`\`tsx
<StatusBanner
  variant="success"
  title="Success"
  description="Your changes have been saved."
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
      description: 'Banner variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Info variant
export const InfoBanner: Story = {
  args: {
    variant: 'info',
    title: 'Information',
    description:
      'This is an informational banner. Use this for general information that users should be aware of.',
  },
};

// Success variant
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    description: 'Your changes have been saved successfully.',
  },
};

// Warning variant
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    description: 'Please review your changes before proceeding. Some fields may need attention.',
  },
};

// Danger variant
export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Error',
    description: 'An error occurred while processing your request. Please try again.',
  },
};

// Neutral variant
export const Neutral: Story = {
  args: {
    variant: 'neutral',
    title: 'Notice',
    description: 'This is a neutral status banner without any specific status indication.',
  },
};

// Without description
export const WithoutDescription: Story = {
  args: {
    variant: 'success',
    title: 'Operation completed',
  },
};

// With custom icon
export const CustomIcon: Story = {
  args: {
    variant: 'info',
    title: 'Custom Icon',
    description: 'This banner uses a custom icon instead of the default variant icon.',
    icon: <Info size={24} />,
  },
};

// With action button
export const WithAction: Story = {
  args: {
    variant: 'warning',
    title: 'Action Required',
    description: 'Your session will expire soon. Click the button below to extend it.',
    action: (
      <Button onClick={() => alert('Action clicked')} data-color="accent" data-size="sm">
        Extend Session
      </Button>
    ),
  },
};

// Long content
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Detailed Information',
    description:
      'This banner contains a longer message to demonstrate how the component handles extended content. The text will wrap naturally within the banner container, maintaining proper spacing and readability. This is useful for providing detailed explanations or instructions to users.',
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
      <StatusBanner variant="info" title="Info" description="This is an informational banner." />
      <StatusBanner
        variant="success"
        title="Success"
        description="Operation completed successfully."
      />
      <StatusBanner
        variant="warning"
        title="Warning"
        description="Please review before proceeding."
      />
      <StatusBanner
        variant="danger"
        title="Error"
        description="An error occurred. Please try again."
      />
      <StatusBanner variant="neutral" title="Notice" description="This is a neutral banner." />
    </div>
  ),
};

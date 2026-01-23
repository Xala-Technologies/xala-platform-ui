import type { Meta, StoryObj } from '@storybook/react';
import { InfoBox } from '../../composed/InfoBox';

const meta: Meta<typeof InfoBox> = {
  title: 'Composed/InfoBox',
  component: InfoBox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## InfoBox

Reusable colored info/status boxes. Supports different color variants matching the design system.

### Features
- Multiple variants (info, success, warning, danger, neutral)
- Optional title
- Colored backgrounds and borders
- Design token compliant

### Usage
\`\`\`tsx
<InfoBox variant="success" title="Success">
  Your changes have been saved.
</InfoBox>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['info', 'success', 'warning', 'danger', 'neutral'],
      description: 'InfoBox variant',
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
    children: 'This is an informational message. Use this for general information that users should be aware of.',
  },
};

// Success variant
export const Success: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'Your changes have been saved successfully.',
  },
};

// Warning variant
export const Warning: Story = {
  args: {
    variant: 'warning',
    title: 'Warning',
    children: 'Please review your changes before proceeding. Some fields may need attention.',
  },
};

// Danger variant
export const Danger: Story = {
  args: {
    variant: 'danger',
    title: 'Error',
    children: 'An error occurred while processing your request. Please try again.',
  },
};

// Neutral variant
export const Neutral: Story = {
  args: {
    variant: 'neutral',
    title: 'Note',
    children: 'This is a neutral information box without any specific status indication.',
  },
};

// Without title
export const WithoutTitle: Story = {
  args: {
    variant: 'info',
    children: 'This info box does not have a title. The message is displayed directly.',
  },
};

// Long content
export const LongContent: Story = {
  args: {
    variant: 'info',
    title: 'Detailed Information',
    children:
      'This info box contains a longer message to demonstrate how the component handles extended content. The text will wrap naturally within the container, maintaining proper spacing and readability. This is useful for providing detailed explanations or instructions to users.',
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)', width: '600px' }}>
      <InfoBox variant="info" title="Info">
        This is an informational message.
      </InfoBox>
      <InfoBox variant="success" title="Success">
        Operation completed successfully.
      </InfoBox>
      <InfoBox variant="warning" title="Warning">
        Please review before proceeding.
      </InfoBox>
      <InfoBox variant="danger" title="Error">
        An error occurred. Please try again.
      </InfoBox>
      <InfoBox variant="neutral" title="Note">
        This is a neutral information box.
      </InfoBox>
    </div>
  ),
};

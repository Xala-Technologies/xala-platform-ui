import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../../composed/Modal';
import { Button, Paragraph, Heading } from '@digdir/designsystemet-react';

const meta: Meta<typeof Modal> = {
  title: 'Composed/Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Modal

A generic, reusable modal component with customizable sizes, header, footer, and content areas.

### Features
- Multiple size variants (sm, md, lg, xl, full)
- Header with title and close button
- Footer with action buttons
- Overlay click to close
- Escape key to close
- Focus management
- Portal rendering

### Usage
\`\`\`tsx
<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Modal Title"
  size="md"
>
  Modal content
</Modal>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
      description: 'Modal size',
    },
    closeOnOverlayClick: {
      control: 'boolean',
      description: 'Close when clicking overlay',
    },
    closeOnEscape: {
      control: 'boolean',
      description: 'Close on Escape key',
    },
    showCloseButton: {
      control: 'boolean',
      description: 'Show close button',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Modal wrapper component for stories
const ModalWrapper = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-color="accent" data-size="medium">
        Open Modal
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children || (
          <Paragraph data-size="sm">
            This is the modal content. You can add any content here, including forms, images, or
            other components.
          </Paragraph>
        )}
      </Modal>
    </>
  );
};

// Basic modal
export const Default: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Modal Title',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

// Small modal
export const Small: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Small Modal',
    size: 'sm',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

// Large modal
export const Large: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Large Modal',
    size: 'lg',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

// Extra large modal
export const ExtraLarge: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Extra Large Modal',
    size: 'xl',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

// Full width modal
export const FullWidth: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Full Width Modal',
    size: 'full',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

// With footer
export const WithFooter: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} data-color="accent" data-size="medium">
          Open Modal with Footer
        </Button>
        <Modal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          footer={
            <div
              style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}
            >
              <Button onClick={() => setIsOpen(false)} data-color="neutral" data-size="medium">
                Cancel
              </Button>
              <Button onClick={() => setIsOpen(false)} data-color="accent" data-size="medium">
                Confirm
              </Button>
            </div>
          }
        >
          <Paragraph data-size="sm">
            This modal has a footer with action buttons. The footer is separated from the content
            and styled appropriately.
          </Paragraph>
        </Modal>
      </>
    );
  },
  args: {
    title: 'Modal with Footer',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

// Without close button
export const WithoutCloseButton: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    title: 'Modal without Close Button',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: false,
  },
};

// Without title
export const WithoutTitle: Story = {
  render: (args) => <ModalWrapper {...args} />,
  args: {
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

// Long content
export const LongContent: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} data-color="accent" data-size="medium">
          Open Modal with Long Content
        </Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <Paragraph key={i} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                This is paragraph {i + 1} of a long content. The modal should handle scrolling
                properly when content exceeds the viewport height.
              </Paragraph>
            ))}
        </Modal>
      </>
    );
  },
  args: {
    title: 'Modal with Long Content',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

// Using sub-components
export const WithSubComponents: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setIsOpen(true)} data-color="accent" data-size="medium">
          Open Modal with Sub-components
        </Button>
        <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <ModalHeader>
            <Heading level={3} data-size="sm">
              Section Header
            </Heading>
          </ModalHeader>
          <ModalBody>
            <Paragraph data-size="sm">
              This modal uses the ModalHeader, ModalBody, and ModalFooter sub-components for better
              structure and styling.
            </Paragraph>
          </ModalBody>
          <ModalFooter align="right">
            <Button onClick={() => setIsOpen(false)} data-color="neutral" data-size="medium">
              Cancel
            </Button>
            <Button onClick={() => setIsOpen(false)} data-color="accent" data-size="medium">
              Save
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  },
  args: {
    title: 'Modal with Sub-components',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

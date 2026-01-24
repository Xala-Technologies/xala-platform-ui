import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
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
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-color="accent" data-size="medium">
        {t('storybook.demo.openModal')}
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {args.children || <Paragraph data-size="sm">{t('storybook.demo.modalContent')}</Paragraph>}
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
const ModalWithFooter = (args: any) => {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-color="accent" data-size="medium">
        {t('storybook.demo.openModalWithFooter')}
      </Button>
      <Modal
        {...args}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        footer={
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
            <Button onClick={() => setIsOpen(false)} data-color="neutral" data-size="medium">
              {t('platform.common.cancel')}
            </Button>
            <Button onClick={() => setIsOpen(false)} data-color="accent" data-size="medium">
              {t('platform.common.confirm')}
            </Button>
          </div>
        }
      >
        <Paragraph data-size="sm">{t('storybook.demo.modalFooterDescription')}</Paragraph>
      </Modal>
    </>
  );
};

export const WithFooter: Story = {
  render: (args) => <ModalWithFooter {...args} />,
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
const ModalWithLongContent = (args: any) => {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-color="accent" data-size="medium">
        {t('storybook.demo.openModalWithLongContent')}
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <Paragraph key={i} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              {t('storybook.demo.paragraphContent', { number: i + 1 })}
            </Paragraph>
          ))}
      </Modal>
    </>
  );
};

export const LongContent: Story = {
  render: (args) => <ModalWithLongContent {...args} />,
  args: {
    title: 'Modal with Long Content',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

// Using sub-components
const ModalWithSubComponents = (args: any) => {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)} data-color="accent" data-size="medium">
        {t('storybook.demo.openModalWithSubcomponents')}
      </Button>
      <Modal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ModalHeader>
          <Heading level={3} data-size="sm">
            {t('storybook.demo.sectionHeader')}
          </Heading>
        </ModalHeader>
        <ModalBody>
          <Paragraph data-size="sm">{t('storybook.demo.subcomponentsDescription')}</Paragraph>
        </ModalBody>
        <ModalFooter align="right">
          <Button onClick={() => setIsOpen(false)} data-color="neutral" data-size="medium">
            {t('platform.common.cancel')}
          </Button>
          <Button onClick={() => setIsOpen(false)} data-color="accent" data-size="medium">
            {t('platform.common.save')}
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export const WithSubComponents: Story = {
  render: (args) => <ModalWithSubComponents {...args} />,
  args: {
    title: 'Modal with Sub-components',
    size: 'md',
    closeOnOverlayClick: true,
    closeOnEscape: true,
    showCloseButton: true,
  },
};

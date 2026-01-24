import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ConfirmDialog } from '../../composed';
import { Button } from '../../primitives';
import { useState } from 'react';

const meta = {
  title: 'Composed/ConfirmDialog',
  component: ConfirmDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ConfirmDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

const DialogWithTrigger = (args: any) => {
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>{t('storybook.demo.openDialog')}</Button>
      <ConfirmDialog
        {...args}
        open={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={() => {
          console.log('Confirmed');
          setIsOpen(false);
        }}
      />
    </>
  );
};

export const Default: Story = {
  render: (args) => <DialogWithTrigger {...args} />,
  args: {
    title: 'Confirm Action',
    description: 'Are you sure you want to proceed?',
  },
};

export const Destructive: Story = {
  render: (args) => <DialogWithTrigger {...args} />,
  args: {
    title: 'Delete Item',
    description: 'This action cannot be undone. Are you sure you want to delete this item?',
    variant: 'danger',
    confirmText: 'Delete',
  },
};

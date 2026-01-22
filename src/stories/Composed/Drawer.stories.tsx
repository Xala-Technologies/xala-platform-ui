import type { Meta, StoryObj } from '@storybook/react';
import { Drawer, DrawerSection, DrawerItem } from '@xala-technologies/platform/ui/composed';
import { Button } from '@xala-technologies/platform/ui/primitives';
import { useState } from 'react';

const meta = {
  title: 'Composed/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

const DrawerWithTrigger = (args: any) => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>Open Drawer</Button>
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerSection title="Section 1">
          <DrawerItem onClick={() => console.log('Item 1')}>Item 1</DrawerItem>
          <DrawerItem onClick={() => console.log('Item 2')}>Item 2</DrawerItem>
        </DrawerSection>
        <DrawerSection title="Section 2">
          <DrawerItem onClick={() => console.log('Item 3')}>Item 3</DrawerItem>
          <DrawerItem onClick={() => console.log('Item 4')}>Item 4</DrawerItem>
        </DrawerSection>
      </Drawer>
    </div>
  );
};

export const RightDrawer: Story = {
  render: (args) => <DrawerWithTrigger {...args} />,
  args: {
    position: 'right',
    title: 'Drawer Title',
  },
};

export const LeftDrawer: Story = {
  render: (args) => <DrawerWithTrigger {...args} />,
  args: {
    position: 'left',
    title: 'Left Drawer',
  },
};

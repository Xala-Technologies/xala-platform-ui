import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Drawer, DrawerSection, DrawerItem } from '../../composed';
import { Button } from '../../primitives';
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
  const t = useT();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <Button onClick={() => setIsOpen(true)}>{t('storybook.demo.openDrawer')}</Button>
      <Drawer {...args} isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <DrawerSection title={t('storybook.demo.section', { number: 1 })}>
          <DrawerItem onClick={() => console.log('Item 1')}>
            {t('storybook.demo.item', { number: 1 })}
          </DrawerItem>
          <DrawerItem onClick={() => console.log('Item 2')}>
            {t('storybook.demo.item', { number: 2 })}
          </DrawerItem>
        </DrawerSection>
        <DrawerSection title={t('storybook.demo.section', { number: 2 })}>
          <DrawerItem onClick={() => console.log('Item 3')}>
            {t('storybook.demo.item', { number: 3 })}
          </DrawerItem>
          <DrawerItem onClick={() => console.log('Item 4')}>
            {t('storybook.demo.item', { number: 4 })}
          </DrawerItem>
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

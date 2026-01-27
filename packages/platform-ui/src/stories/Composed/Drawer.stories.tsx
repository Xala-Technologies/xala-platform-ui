import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { Drawer, Button, Paragraph, Stack } from '../../index';

/**
 * Drawer provides a sliding panel that can open from any side.
 *
 * ## Features
 * - Multiple positions (left, right, top, bottom)
 * - Size presets
 * - Backdrop overlay
 * - Footer support
 * - Mobile responsive
 *
 * ## When to Use
 * - Side panels
 * - Mobile menus
 * - Detail views
 * - Filters
 */
const meta: Meta<typeof Drawer> = {
  title: 'Composed/Drawer',
  component: Drawer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
Drawer provides a sliding panel that can open from any side.

## Features
- Multiple positions (left, right, top, bottom)
- Size presets (sm, md, lg, xl, full)
- Backdrop overlay
- Footer support
- Mobile responsive

## When to Use
- Side panels
- Mobile menus
- Detail views
- Filters
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Drawer>;

/**
 * Default drawer (right)
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.drawer.openDrawer')}</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={t('storybook.drawer.drawerTitle')}
        >
          <Paragraph data-size="md">{t('storybook.drawer.drawerContent')}</Paragraph>
        </Drawer>
      </Stack>
    );
  },
};

/**
 * Drawer from left
 */
export const Left: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.drawer.openLeftDrawer')}</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="left"
          title={t('storybook.drawer.navigation')}
        >
          <Paragraph data-size="md">{t('storybook.drawer.drawerContent')}</Paragraph>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer from bottom
 */
export const Bottom: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.drawer.openBottomDrawer')}</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottom"
          title={t('storybook.drawer.drawerTitle')}
        >
          <Paragraph data-size="md">{t('storybook.drawer.drawerContent')}</Paragraph>
        </Drawer>
      </div>
    );
  },
};

/**
 * Drawer with footer
 */
export const WithFooter: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.drawer.openDrawer')}</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={t('storybook.drawer.drawerTitle')}
          footer={
            <Stack direction="horizontal" spacing="var(--ds-spacing-2)" justify="end">
              <Button data-color="neutral" variant="tertiary" onClick={() => setIsOpen(false)}>
                {t('storybook.drawer.cancel')}
              </Button>
              <Button data-color="accent" onClick={() => setIsOpen(false)}>
                {t('storybook.drawer.save')}
              </Button>
            </Stack>
          }
        >
          <Paragraph data-size="md">{t('storybook.drawer.drawerContent')}</Paragraph>
        </Drawer>
      </Stack>
    );
  },
};

/**
 * Small drawer
 */
export const Small: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.drawer.openDrawer')}</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="sm"
          title={t('storybook.drawer.drawerTitle')}
        >
          <Paragraph data-size="md">{t('storybook.drawer.drawerContent')}</Paragraph>
        </Drawer>
      </Stack>
    );
  },
};

/**
 * Large drawer
 */
export const Large: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.drawer.openDrawer')}</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          title={t('storybook.drawer.drawerTitle')}
        >
          <Paragraph data-size="md">{t('storybook.drawer.drawerContent')}</Paragraph>
        </Drawer>
      </Stack>
    );
  },
};

/**
 * Drawer without overlay
 */
export const WithoutOverlay: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>{t('storybook.drawer.openDrawer')}</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          overlay={false}
          title={t('storybook.drawer.drawerTitle')}
        >
          <Paragraph data-size="md">{t('storybook.drawer.drawerContent')}</Paragraph>
        </Drawer>
      </Stack>
    );
  },
};

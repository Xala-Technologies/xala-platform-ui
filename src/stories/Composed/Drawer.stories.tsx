import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
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
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>"Eksempel Tekst"</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Eksempel Tekst"
        >
          <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
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
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>"Eksempel Tekst"</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="left"
          title="Eksempel Tekst"
        >
          <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
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
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>"Eksempel Tekst"</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="bottom"
          title="Eksempel Tekst"
        >
          <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
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
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>"Eksempel Tekst"</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Eksempel Tekst"
          footer={
            <Stack direction="horizontal" spacing="var(--ds-spacing-2)" justify="end">
              <Button data-color="neutral" variant="tertiary" onClick={() => setIsOpen(false)}>
                "Eksempel Tekst"
              </Button>
              <Button data-color="accent" onClick={() => setIsOpen(false)}>
                "Eksempel Tekst"
              </Button>
            </Stack>
          }
        >
          <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
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
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>"Eksempel Tekst"</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="sm"
          title="Eksempel Tekst"
        >
          <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
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
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>"Eksempel Tekst"</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          size="lg"
          title="Eksempel Tekst"
        >
          <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
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
    const [isOpen, setIsOpen] = useState(false);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Button onClick={() => setIsOpen(true)}>"Eksempel Tekst"</Button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          overlay={false}
          title="Eksempel Tekst"
        >
          <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
        </Drawer>
      </Stack>
    );
  },
};

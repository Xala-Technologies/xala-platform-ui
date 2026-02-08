import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip, Button, Stack } from '../../index';

/**
 * Tooltip provides accessible tooltips with smart positioning.
 *
 * ## Features
 * - Multiple positions (top, bottom, left, right)
 * - Delay support
 * - Accessible
 * - Smart positioning
 *
 * ## When to Use
 * - Additional information
 * - Help text
 * - Contextual hints
 */
const meta: Meta<typeof Tooltip> = {
  title: 'Composed/Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
Tooltip provides accessible tooltips with smart positioning.

## Features
- Multiple positions (top, bottom, left, right)
- Delay support
- Accessible
- Smart positioning

## When to Use
- Additional information
- Help text
- Contextual hints
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Default tooltip (top)
 */
export const Default: Story = {
  render: function Render() {
    return (
      <Stack spacing="var(--ds-spacing-20)" style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content="Eksempel Tekst">
          <Button data-color="accent">"Eksempel Tekst"</Button>
        </Tooltip>
      </Stack>
    );
  },
};

/**
 * Tooltip bottom position
 */
export const Bottom: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content="Eksempel Tekst" position="bottom">
          <Button data-color="accent">"Eksempel Tekst"</Button>
        </Tooltip>
      </div>
    );
  },
};

/**
 * Tooltip left position
 */
export const Left: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content="Eksempel Tekst" position="left">
          <Button data-color="accent">"Eksempel Tekst"</Button>
        </Tooltip>
      </div>
    );
  },
};

/**
 * Tooltip right position
 */
export const Right: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content="Eksempel Tekst" position="right">
          <Button data-color="accent">"Eksempel Tekst"</Button>
        </Tooltip>
      </div>
    );
  },
};

/**
 * Tooltip with delay
 */
export const WithDelay: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content="Eksempel Tekst" delay={500}>
          <Button data-color="accent">"Eksempel Tekst"</Button>
        </Tooltip>
      </div>
    );
  },
};

/**
 * Tooltip with long content
 */
export const LongContent: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content="Eksempel Tekst">
          <Button data-color="accent">"Eksempel Tekst"</Button>
        </Tooltip>
      </div>
    );
  },
};

/**
 * Disabled tooltip
 */
export const Disabled: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content="Eksempel Tekst" disabled>
          <Button data-color="accent">"Eksempel Tekst"</Button>
        </Tooltip>
      </div>
    );
  },
};

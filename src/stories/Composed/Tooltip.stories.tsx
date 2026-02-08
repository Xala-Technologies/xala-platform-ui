import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-20)" style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content={t('storybook.tooltip.defaultContent')}>
          <Button data-color="accent">{t('storybook.tooltip.hoverMe')}</Button>
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
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content={t('storybook.tooltip.bottomContent')} position="bottom">
          <Button data-color="accent">{t('storybook.tooltip.hoverMe')}</Button>
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
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content={t('storybook.tooltip.leftContent')} position="left">
          <Button data-color="accent">{t('storybook.tooltip.hoverMe')}</Button>
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
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content={t('storybook.tooltip.rightContent')} position="right">
          <Button data-color="accent">{t('storybook.tooltip.hoverMe')}</Button>
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
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content={t('storybook.tooltip.delayedContent')} delay={500}>
          <Button data-color="accent">{t('storybook.tooltip.hoverMe')}</Button>
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
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content={t('storybook.tooltip.longContent')}>
          <Button data-color="accent">{t('storybook.tooltip.hoverMe')}</Button>
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
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-20)' }}>
        <Tooltip content={t('storybook.tooltip.defaultContent')} disabled>
          <Button data-color="accent">{t('storybook.tooltip.hoverMe')}</Button>
        </Tooltip>
      </div>
    );
  },
};

import type { Meta, StoryObj } from '@storybook/react';
import { CompositionPreview, Button, Stack, Paragraph, Textfield } from '../../index';

/**
 * CompositionPreview provides a live preview for component compositions.
 *
 * ## Features
 * - Component preview
 * - Layer display
 * - Custom render function
 * - Loading states
 *
 * ## When to Use
 * - Component explorers
 * - Composition builders
 * - Preview panels
 */
const meta: Meta<typeof CompositionPreview> = {
  title: 'Blocks/CompositionPreview',
  component: CompositionPreview,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
CompositionPreview provides a live preview for component compositions.

## Features
- Component preview
- Layer display
- Custom render function
- Loading states

## When to Use
- Component explorers
- Composition builders
- Preview panels
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CompositionPreview>;

/**
 * Default composition preview
 */
export const Default: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <CompositionPreview
          componentName="Eksempel Tekst"
          composeData={{
            componentName: t('storybook.compositionPreview.button'),
            layer: t('storybook.compositionPreview.primitives'),
            description: t('storybook.compositionPreview.buttonDescription'),
          }}
          renderPreview={() => (
            <Button data-color="accent">"Eksempel Tekst"</Button>
          )}
        />
      </Stack>
    );
  },
};

/**
 * Composition preview with custom render
 */
export const CustomRender: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <CompositionPreview
          componentName="Eksempel Tekst"
          composeData={{
            componentName: t('storybook.compositionPreview.card'),
            layer: t('storybook.compositionPreview.composed'),
            description: t('storybook.compositionPreview.cardDescription'),
          }}
          renderPreview={() => (
            <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
              <Paragraph data-size="md">
                "Eksempel Tekst"
              </Paragraph>
            </Stack>
          )}
        />
      </Stack>
    );
  },
};

/**
 * Composition preview - primitives layer
 */
export const PrimitivesLayer: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <CompositionPreview
          componentName="Eksempel Tekst"
          composeData={{
            componentName: t('storybook.compositionPreview.input'),
            layer: t('storybook.compositionPreview.primitives'),
            description: t('storybook.compositionPreview.inputDescription'),
          }}
          renderPreview={() => (
            <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
              <Textfield placeholder="Eksempel Tekst" />
            </Stack>
          )}
        />
      </Stack>
    );
  },
};

/**
 * Composition preview - blocks layer
 */
export const BlocksLayer: Story = {
  render: function Render() {
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <CompositionPreview
          componentName="Eksempel Tekst"
          composeData={{
            componentName: t('storybook.compositionPreview.notificationBell'),
            layer: t('storybook.compositionPreview.blocks'),
            description: t('storybook.compositionPreview.notificationBellDescription'),
          }}
          renderPreview={() => (
            <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
              <Paragraph data-size="md">
                "Eksempel Tekst"
              </Paragraph>
            </Stack>
          )}
        />
      </Stack>
    );
  },
};

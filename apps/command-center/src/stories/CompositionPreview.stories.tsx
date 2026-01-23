/**
 * CompositionPreview Stories
 *
 * Storybook stories for the CompositionPreview component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { CompositionPreview } from '../components/preview/CompositionPreview';

const meta: Meta<typeof CompositionPreview> = {
  title: 'CommandCenter/Preview/CompositionPreview',
  component: CompositionPreview,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CompositionPreview>;

const sampleComposeData = {
  componentName: 'ResourceCard',
  layer: 'patterns',
  description: 'A card component for displaying resource information',
  props: {
    title: {
      type: 'string',
      required: true,
      description: 'Resource title',
    },
    description: {
      type: 'string',
      required: false,
      description: 'Resource description',
    },
    image: {
      type: 'string',
      required: false,
      description: 'Resource image URL',
    },
  },
};

export const ComponentMissing: Story = {
  args: {
    componentName: 'ResourceCard',
    composeData: sampleComposeData,
  },
};

export const MinimalData: Story = {
  args: {
    componentName: 'NewComponent',
    composeData: {
      componentName: 'NewComponent',
    },
  },
};

export const WithFullContract: Story = {
  args: {
    componentName: 'ComplexComponent',
    composeData: {
      componentName: 'ComplexComponent',
      layer: 'blocks',
      description: 'A complex component with many props and features',
      props: {
        title: { type: 'string', required: true },
        subtitle: { type: 'string', required: false },
        items: { type: 'array', required: true },
        onAction: { type: 'function', required: false },
        variant: {
          type: 'string',
          enum: ['default', 'compact', 'expanded'],
          required: false,
        },
      },
    },
  },
};

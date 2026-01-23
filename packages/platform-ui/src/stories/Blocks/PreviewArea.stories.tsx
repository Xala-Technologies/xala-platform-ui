/**
 * PreviewArea Stories
 *
 * Storybook stories for the PreviewArea component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { PreviewArea, Button, Stack, Paragraph } from '../../index';

const meta: Meta<typeof PreviewArea> = {
  title: 'Blocks/PreviewArea',
  component: PreviewArea,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    background: {
      control: 'select',
      options: ['default', 'subtle', 'transparent', 'checkerboard'],
    },
    centered: {
      control: 'boolean',
    },
    minHeight: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof PreviewArea>;

export const Default: Story = {
  render: () => (
    <PreviewArea>
      <Stack spacing="var(--ds-spacing-2)" align="center">
        <Paragraph data-size="md">Component Preview</Paragraph>
        <Button variant="primary">Example Button</Button>
      </Stack>
    </PreviewArea>
  ),
};

export const SubtleBackground: Story = {
  render: () => (
    <PreviewArea background="subtle">
      <Button variant="secondary">Secondary Button</Button>
    </PreviewArea>
  ),
};

export const TransparentBackground: Story = {
  render: () => (
    <PreviewArea background="transparent">
      <Button variant="tertiary">Tertiary Button</Button>
    </PreviewArea>
  ),
};

export const CheckerboardBackground: Story = {
  render: () => (
    <PreviewArea background="checkerboard">
      <Paragraph data-size="sm">Useful for transparent components</Paragraph>
    </PreviewArea>
  ),
};

export const NotCentered: Story = {
  render: () => (
    <PreviewArea centered={false}>
      <Stack spacing="var(--ds-spacing-2)">
        <Button variant="primary" data-size="sm">
          First
        </Button>
        <Button variant="secondary" data-size="sm">
          Second
        </Button>
        <Button variant="tertiary" data-size="sm">
          Third
        </Button>
      </Stack>
    </PreviewArea>
  ),
};

export const CustomHeight: Story = {
  render: () => (
    <PreviewArea minHeight="500px">
      <Paragraph data-size="md">Taller preview area</Paragraph>
    </PreviewArea>
  ),
};

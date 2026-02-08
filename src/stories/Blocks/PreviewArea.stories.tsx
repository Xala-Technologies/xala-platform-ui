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
  render: function Render() {
    return (
      <PreviewArea>
        <Stack spacing="var(--ds-spacing-2)" align="center">
          <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
          <Button variant="primary">"Eksempel Tekst"</Button>
        </Stack>
      </PreviewArea>
    );
  },
};

export const SubtleBackground: Story = {
  render: function Render() {
    return (
      <PreviewArea background="subtle">
        <Button variant="secondary">"Eksempel Tekst"</Button>
      </PreviewArea>
    );
  },
};

export const TransparentBackground: Story = {
  render: function Render() {
    return (
      <PreviewArea background="transparent">
        <Button variant="tertiary">"Eksempel Tekst"</Button>
      </PreviewArea>
    );
  },
};

export const CheckerboardBackground: Story = {
  render: function Render() {
    return (
      <PreviewArea background="checkerboard">
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </PreviewArea>
    );
  },
};

export const NotCentered: Story = {
  render: function Render() {
    return (
      <PreviewArea centered={false}>
        <Stack spacing="var(--ds-spacing-2)">
          <Button variant="primary" data-size="sm">
            "Eksempel Tekst"
          </Button>
          <Button variant="secondary" data-size="sm">
            "Eksempel Tekst"
          </Button>
          <Button variant="tertiary" data-size="sm">
            "Eksempel Tekst"
          </Button>
        </Stack>
      </PreviewArea>
    );
  },
};

export const CustomHeight: Story = {
  render: function Render() {
    return (
      <PreviewArea minHeight="500px">
        <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
      </PreviewArea>
    );
  },
};

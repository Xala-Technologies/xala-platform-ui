/**
 * PreviewArea Stories
 *
 * Storybook stories for the PreviewArea component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
    const t = useT();
    return (
      <PreviewArea>
        <Stack spacing="var(--ds-spacing-2)" align="center">
          <Paragraph data-size="md">{t('storybook.demo.sampleText')}</Paragraph>
          <Button variant="primary">{t('platform.common.submit')}</Button>
        </Stack>
      </PreviewArea>
    );
  },
};

export const SubtleBackground: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PreviewArea background="subtle">
        <Button variant="secondary">{t('platform.common.cancel')}</Button>
      </PreviewArea>
    );
  },
};

export const TransparentBackground: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PreviewArea background="transparent">
        <Button variant="tertiary">{t('platform.common.back')}</Button>
      </PreviewArea>
    );
  },
};

export const CheckerboardBackground: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PreviewArea background="checkerboard">
        <Paragraph data-size="sm">{t('storybook.demo.sampleText')}</Paragraph>
      </PreviewArea>
    );
  },
};

export const NotCentered: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PreviewArea centered={false}>
        <Stack spacing="var(--ds-spacing-2)">
          <Button variant="primary" data-size="sm">
            {t('platform.common.save')}
          </Button>
          <Button variant="secondary" data-size="sm">
            {t('platform.common.cancel')}
          </Button>
          <Button variant="tertiary" data-size="sm">
            {t('platform.common.delete')}
          </Button>
        </Stack>
      </PreviewArea>
    );
  },
};

export const CustomHeight: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PreviewArea minHeight="500px">
        <Paragraph data-size="md">{t('storybook.demo.sampleText')}</Paragraph>
      </PreviewArea>
    );
  },
};

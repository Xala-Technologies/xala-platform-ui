import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Popover } from '../../composed/Popover';
import { Button, Paragraph, Card } from '@digdir/designsystemet-react';
import { useState } from 'react';

const meta: Meta<typeof Popover> = {
  title: 'Composed/Popover',
  component: Popover,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Popover

Rich content popover with smart positioning. Supports click, hover, and focus triggers.

### Features
- Multiple trigger types (click, hover, focus)
- Position variants (top, bottom, left, right, with start/end)
- Rich content support
- Click outside to close
- Escape key to close
- Controlled and uncontrolled modes

### Usage
\`\`\`tsx
<Popover
  content={<div>Popover content</div>}
  trigger="click"
  position="bottom-start"
>
  <Button>Trigger</Button>
</Popover>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    trigger: {
      control: 'select',
      options: ['click', 'hover', 'focus'],
      description: 'Trigger type',
    },
    position: {
      control: 'select',
      options: [
        'top',
        'bottom',
        'left',
        'right',
        'top-start',
        'top-end',
        'bottom-start',
        'bottom-end',
      ],
      description: 'Popover position',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need translations
const ClickTriggerDemo = () => {
  const t = useT();
  return (
    <Popover
      content={
        <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">{t('storybook.demo.popoverTriggeredByClick')}</Paragraph>
        </Card>
      }
      trigger="click"
      position="bottom-start"
    >
      <Button data-color="accent" data-size="medium">
        {t('storybook.demo.clickMe')}
      </Button>
    </Popover>
  );
};

const HoverTriggerDemo = () => {
  const t = useT();
  return (
    <Popover
      content={
        <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">{t('storybook.demo.popoverAppearsOnHover')}</Paragraph>
        </Card>
      }
      trigger="hover"
      position="bottom"
    >
      <Button data-color="accent" data-size="medium">
        {t('storybook.demo.hoverMe')}
      </Button>
    </Popover>
  );
};

const FocusTriggerDemo = () => {
  const t = useT();
  return (
    <Popover
      content={
        <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">{t('storybook.demo.popoverAppearsOnFocus')}</Paragraph>
        </Card>
      }
      trigger="focus"
      position="top"
    >
      <Button data-color="accent" data-size="medium">
        {t('storybook.demo.focusMe')}
      </Button>
    </Popover>
  );
};

const TopPositionDemo = () => {
  const t = useT();
  return (
    <div style={{ marginTop: '100px' }}>
      <Popover
        content={
          <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm">{t('storybook.demo.topPosition')}</Paragraph>
          </Card>
        }
        trigger="click"
        position="top"
      >
        <Button data-color="accent" data-size="medium">
          {t('storybook.demo.top')}
        </Button>
      </Popover>
    </div>
  );
};

const BottomPositionDemo = () => {
  const t = useT();
  return (
    <Popover
      content={
        <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">{t('storybook.demo.bottomPosition')}</Paragraph>
        </Card>
      }
      trigger="click"
      position="bottom"
    >
      <Button data-color="accent" data-size="medium">
        {t('storybook.demo.bottom')}
      </Button>
    </Popover>
  );
};

const LeftPositionDemo = () => {
  const t = useT();
  return (
    <div style={{ marginLeft: '200px' }}>
      <Popover
        content={
          <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm">{t('storybook.demo.leftPosition')}</Paragraph>
          </Card>
        }
        trigger="click"
        position="left"
      >
        <Button data-color="accent" data-size="medium">
          {t('storybook.demo.left')}
        </Button>
      </Popover>
    </div>
  );
};

const RightPositionDemo = () => {
  const t = useT();
  return (
    <Popover
      content={
        <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">{t('storybook.demo.rightPosition')}</Paragraph>
        </Card>
      }
      trigger="click"
      position="right"
    >
      <Button data-color="accent" data-size="medium">
        {t('storybook.demo.right')}
      </Button>
    </Popover>
  );
};

const RichContentDemo = () => {
  const t = useT();
  return (
    <Popover
      content={
        <Card
          data-color="neutral"
          data-size="medium"
          style={{ padding: 'var(--ds-spacing-4)', maxWidth: '300px' }}
        >
          <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            <strong>{t('storybook.demo.richContentPopover')}</strong>
          </Paragraph>
          <Paragraph data-size="sm">{t('storybook.demo.richContentDescription')}</Paragraph>
          <div style={{ marginTop: 'var(--ds-spacing-3)' }}>
            <Button data-color="accent" data-size="sm">
              {t('storybook.demo.actionButton')}
            </Button>
          </div>
        </Card>
      }
      trigger="click"
      position="bottom-start"
    >
      <Button data-color="accent" data-size="medium">
        {t('storybook.demo.richContent')}
      </Button>
    </Popover>
  );
};

const ControlledDemo = () => {
  const t = useT();
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(!open)} data-color="accent" data-size="medium">
        {open ? t('platform.common.close') : t('storybook.demo.open')} {t('storybook.demo.popover')}
      </Button>
      <Popover
        content={
          <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph data-size="sm">{t('storybook.demo.controlledPopover')}</Paragraph>
          </Card>
        }
        trigger="click"
        position="bottom-start"
        open={open}
        onOpenChange={setOpen}
      >
        <div style={{ display: 'inline-block', marginLeft: 'var(--ds-spacing-4)' }}>
          <Button data-color="neutral" data-size="medium">
            {t('storybook.demo.trigger')}
          </Button>
        </div>
      </Popover>
    </>
  );
};

// Click trigger
export const ClickTrigger: Story = {
  render: function Render() {
    return <ClickTriggerDemo />;
  },
};

// Hover trigger
export const HoverTrigger: Story = {
  render: function Render() {
    return <HoverTriggerDemo />;
  },
};

// Focus trigger
export const FocusTrigger: Story = {
  render: function Render() {
    return <FocusTriggerDemo />;
  },
};

// Position variants
export const TopPosition: Story = {
  render: function Render() {
    return <TopPositionDemo />;
  },
};

export const BottomPosition: Story = {
  render: function Render() {
    return <BottomPositionDemo />;
  },
};

export const LeftPosition: Story = {
  render: function Render() {
    return <LeftPositionDemo />;
  },
};

export const RightPosition: Story = {
  render: function Render() {
    return <RightPositionDemo />;
  },
};

// Rich content
export const RichContent: Story = {
  render: function Render() {
    return <RichContentDemo />;
  },
};

// Controlled mode
export const Controlled: Story = {
  render: function Render() {
    return <ControlledDemo />;
  },
};

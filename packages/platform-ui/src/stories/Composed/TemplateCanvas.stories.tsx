import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { TemplateCanvas, BlockPalette, Stack, Paragraph, Card, Button } from '../../index';
import type { TemplateBlock } from '../../index';

/**
 * TemplateCanvas provides a drag-and-drop canvas for creating email/invoice templates.
 *
 * ## Features
 * - Drag-and-drop block placement
 * - Block palette
 * - Preview mode
 * - Placeholder support
 * - Block selection and editing
 *
 * ## When to Use
 * - Email template builders
 * - Invoice template editors
 * - Document template creation
 */
const meta: Meta<typeof TemplateCanvas> = {
  title: 'Composed/TemplateCanvas',
  component: TemplateCanvas,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TemplateCanvas>;

/**
 * Default template canvas with empty state
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [blocks, setBlocks] = useState<TemplateBlock[]>([]);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.templateCanvas.description')}</Paragraph>
            <TemplateCanvas
              blocks={blocks}
              onChange={setBlocks}
              placeholders={[
                { id: 'name', name: t('storybook.templateCanvas.name'), defaultValue: 'John Doe' },
                { id: 'email', name: t('storybook.templateCanvas.email'), defaultValue: 'john@example.com' },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Template canvas with blocks
 */
export const WithBlocks: Story = {
  render: function Render() {
    const t = useT();
    const [blocks, setBlocks] = useState<TemplateBlock[]>([
      {
        id: '1',
        type: 'header',
        content: { text: t('storybook.templateCanvas.welcome') },
      },
      {
        id: '2',
        type: 'text',
        content: { text: t('storybook.templateCanvas.introText') },
      },
      {
        id: '3',
        type: 'button',
        content: { text: t('storybook.templateCanvas.clickHere'), url: 'https://example.com' },
      },
    ]);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.templateCanvas.withBlocks')}</Paragraph>
            <TemplateCanvas
              blocks={blocks}
              onChange={setBlocks}
              placeholders={[
                { id: 'name', name: t('storybook.templateCanvas.name'), defaultValue: 'John Doe' },
                { id: 'email', name: t('storybook.templateCanvas.email'), defaultValue: 'john@example.com' },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Template canvas in preview mode
 */
export const PreviewMode: Story = {
  render: function Render() {
    const t = useT();
    const [previewMode, setPreviewMode] = useState(true);
    const [blocks] = useState<TemplateBlock[]>([
      {
        id: '1',
        type: 'header',
        content: { text: t('storybook.templateCanvas.welcome') },
      },
      {
        id: '2',
        type: 'text',
        content: { text: t('storybook.templateCanvas.introText') },
      },
      {
        id: '3',
        type: 'button',
        content: { text: t('storybook.templateCanvas.clickHere'), url: 'https://example.com' },
      },
    ]);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Stack spacing="var(--ds-spacing-2)" style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Paragraph data-size="md">{t('storybook.templateCanvas.previewMode')}</Paragraph>
              <Button onClick={() => setPreviewMode(!previewMode)}>
                {previewMode ? t('storybook.templateCanvas.edit') : t('storybook.templateCanvas.preview')}
              </Button>
            </Stack>
            <TemplateCanvas
              blocks={blocks}
              onChange={() => {}}
              previewMode={previewMode}
              previewData={{
                name: 'Jane Doe',
                email: 'jane@example.com',
              }}
              placeholders={[
                { id: 'name', name: t('storybook.templateCanvas.name'), defaultValue: 'John Doe' },
                { id: 'email', name: t('storybook.templateCanvas.email'), defaultValue: 'john@example.com' },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Block palette standalone
 */
export const BlockPaletteStandalone: Story = {
  render: function Render() {
    const t = useT();
    const [draggedType, setDraggedType] = useState<string | null>(null);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.templateCanvas.blockPalette')}</Paragraph>
            {draggedType && (
              <Paragraph data-size="sm">
                {t('storybook.templateCanvas.dragged')}: {draggedType}
              </Paragraph>
            )}
            <BlockPalette
              availableBlocks={['header', 'text', 'button', 'image', 'divider']}
              onDragStart={(type) => {
                setDraggedType(type);
                console.log('Drag started:', type);
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

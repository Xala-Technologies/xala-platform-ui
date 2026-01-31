import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { RichTextEditor, Stack } from '../../index';

/**
 * RichTextEditor provides a rich text editor with formatting toolbar.
 *
 * ## Features
 * - Bold, italic, underline
 * - Headings
 * - Lists (bullet, numbered)
 * - Links
 * - Blockquotes
 * - Code blocks
 * - Undo/redo
 *
 * ## When to Use
 * - Content editing
 * - Comments
 * - Descriptions
 * - Documentation
 */
const meta: Meta<typeof RichTextEditor> = {
  title: 'Composed/RichTextEditor',
  component: RichTextEditor,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
RichTextEditor provides a rich text editor with formatting toolbar.

## Features
- Bold, italic, underline, strikethrough
- Headings (H1, H2, H3)
- Lists (bullet, numbered)
- Links
- Blockquotes
- Code blocks
- Undo/redo

## When to Use
- Content editing
- Comments
- Descriptions
- Documentation
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RichTextEditor>;

/**
 * Default rich text editor
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <RichTextEditor
          value={value}
          onChange={setValue}
          placeholder={t('storybook.richTextEditor.placeholder')}
        />
      </Stack>
    );
  },
};

/**
 * Rich text editor with label
 */
export const WithLabel: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <RichTextEditor
          value={value}
          onChange={setValue}
          label={t('storybook.richTextEditor.description')}
          placeholder={t('storybook.richTextEditor.placeholder')}
        />
      </Stack>
    );
  },
};

/**
 * Rich text editor with initial value
 */
export const WithValue: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState(
      '<p>This is <strong>bold</strong> and <em>italic</em> text.</p>'
    );
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <RichTextEditor
          value={value}
          onChange={setValue}
          placeholder={t('storybook.richTextEditor.placeholder')}
        />
      </Stack>
    );
  },
};

/**
 * Rich text editor with custom toolbar
 */
export const CustomToolbar: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <RichTextEditor
          value={value}
          onChange={setValue}
          toolbar={['bold', 'italic', 'bulletList', 'numberedList', 'link']}
          placeholder={t('storybook.richTextEditor.placeholder')}
        />
      </Stack>
    );
  },
};

/**
 * Rich text editor with error
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <RichTextEditor
          value={value}
          onChange={setValue}
          label={t('storybook.richTextEditor.description')}
          error={t('storybook.richTextEditor.errorMessage')}
          placeholder={t('storybook.richTextEditor.placeholder')}
        />
      </Stack>
    );
  },
};

/**
 * Disabled rich text editor
 */
export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('<p>This is disabled content.</p>');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <RichTextEditor
          value={value}
          onChange={setValue}
          disabled
          placeholder={t('storybook.richTextEditor.placeholder')}
        />
      </Stack>
    );
  },
};

/**
 * Read-only rich text editor
 */
export const ReadOnly: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('<p>This is read-only content.</p>');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <RichTextEditor
          value={value}
          onChange={setValue}
          readOnly
          placeholder={t('storybook.richTextEditor.placeholder')}
        />
      </Stack>
    );
  },
};

/**
 * Rich text editor with custom height
 */
export const CustomHeight: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <RichTextEditor
          value={value}
          onChange={setValue}
          minHeight="200px"
          maxHeight="400px"
          placeholder={t('storybook.richTextEditor.placeholder')}
        />
      </Stack>
    );
  },
};

/**
 * Demonstrates XSS protection by sanitizing malicious scripts while preserving safe content.
 * The editor should strip out script tags and event handlers but render safe HTML correctly.
 */
export const XSSProtection: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState(
      '<p>Safe content with <strong>bold</strong> text.</p>' +
        '<script>alert("XSS Attack!")</script>' +
        '<p>More safe content with <em>italic</em> text.</p>' +
        '<img src="x" onerror="alert(\'XSS\')" />' +
        '<p onclick="alert(\'XSS\')">Paragraph with onclick handler</p>' +
        '<a href="javascript:alert(\'XSS\')">Malicious link</a>' +
        '<p>Normal <a href="https://example.com">safe link</a></p>'
    );
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <RichTextEditor
          value={value}
          onChange={setValue}
          label="XSS Protection Test"
          placeholder={t('storybook.richTextEditor.placeholder')}
        />
      </Stack>
    );
  },
};

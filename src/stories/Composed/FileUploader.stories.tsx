import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { FileUploader, type UploadedFile } from '../../index';

/**
 * FileUploader provides drag-and-drop file upload with preview support.
 *
 * ## Features
 * - Drag and drop
 * - Multiple file support
 * - File type restrictions
 * - Size limits
 * - Preview support
 * - Upload progress
 *
 * ## When to Use
 * - File upload forms
 * - Document management
 * - Media uploads
 */
const meta: Meta<typeof FileUploader> = {
  title: 'Composed/FileUploader',
  component: FileUploader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
FileUploader provides drag-and-drop file upload with preview support.

## Features
- Drag and drop interface
- Multiple file support
- File type restrictions (accept prop)
- Size limits (maxSize prop)
- File preview (list or grid)
- Upload progress tracking

## When to Use
- File upload forms
- Document management
- Media uploads
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileUploader>;

/**
 * Default file uploader
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FileUploader
          value={files}
          onChange={setFiles}
          placeholder={{
            title: t('storybook.fileUploader.dragAndDrop'),
            description: t('storybook.fileUploader.orClickToSelect'),
          }}
        />
      </div>
    );
  },
};

/**
 * File uploader with multiple files
 */
export const Multiple: Story = {
  render: function Render() {
    const t = useT();
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FileUploader
          value={files}
          onChange={setFiles}
          multiple
          maxFiles={5}
          placeholder={{
            title: t('storybook.fileUploader.dragAndDropMultiple'),
            description: t('storybook.fileUploader.maxFiles', { count: 5 }),
          }}
        />
      </div>
    );
  },
};

/**
 * File uploader with file type restriction
 */
export const WithFileTypeRestriction: Story = {
  render: function Render() {
    const t = useT();
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FileUploader
          value={files}
          onChange={setFiles}
          accept="image/*"
          placeholder={{
            title: t('storybook.fileUploader.uploadImages'),
            description: t('storybook.fileUploader.imageFilesOnly'),
          }}
        />
      </div>
    );
  },
};

/**
 * File uploader with size limit
 */
export const WithSizeLimit: Story = {
  render: function Render() {
    const t = useT();
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FileUploader
          value={files}
          onChange={setFiles}
          maxSize={5 * 1024 * 1024} // 5MB
          helperText={t('storybook.fileUploader.maxSize', { size: '5MB' })}
          placeholder={{
            title: t('storybook.fileUploader.dragAndDrop'),
            description: t('storybook.fileUploader.maxSizeDescription', { size: '5MB' }),
          }}
        />
      </div>
    );
  },
};

/**
 * File uploader with preview (list)
 */
export const WithPreviewList: Story = {
  render: function Render() {
    const t = useT();
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FileUploader
          value={files}
          onChange={setFiles}
          showPreview
          previewType="list"
          placeholder={{
            title: t('storybook.fileUploader.dragAndDrop'),
            description: t('storybook.fileUploader.orClickToSelect'),
          }}
        />
      </div>
    );
  },
};

/**
 * File uploader with preview (grid)
 */
export const WithPreviewGrid: Story = {
  render: function Render() {
    const t = useT();
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FileUploader
          value={files}
          onChange={setFiles}
          showPreview
          previewType="grid"
          accept="image/*"
          placeholder={{
            title: t('storybook.fileUploader.uploadImages'),
            description: t('storybook.fileUploader.imageFilesOnly'),
          }}
        />
      </div>
    );
  },
};

/**
 * File uploader with error
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FileUploader
          value={files}
          onChange={setFiles}
          error={t('storybook.fileUploader.errorMessage')}
          placeholder={{
            title: t('storybook.fileUploader.dragAndDrop'),
            description: t('storybook.fileUploader.orClickToSelect'),
          }}
        />
      </div>
    );
  },
};

/**
 * Disabled file uploader
 */
export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    const [files, setFiles] = useState<UploadedFile[]>([]);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <FileUploader
          value={files}
          onChange={setFiles}
          disabled
          placeholder={{
            title: t('storybook.fileUploader.dragAndDrop'),
            description: t('storybook.fileUploader.orClickToSelect'),
          }}
        />
      </div>
    );
  },
};

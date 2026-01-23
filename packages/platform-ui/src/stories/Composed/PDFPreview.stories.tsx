import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PDFPreview } from '../../composed/PDFPreview';

const meta: Meta<typeof PDFPreview> = {
  title: 'Composed/PDFPreview',
  component: PDFPreview,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PDFPreview

A PDF document preview component for invoices, reports, etc. Supports pagination, zoom, download, and print functionality.

### Features
- PDF document preview
- Zoom controls
- Page navigation
- Download button
- Print button
- Customizable toolbar
- Responsive sizing

### Usage
\`\`\`tsx
<PDFPreview
  src="/document.pdf"
  title="Document Preview"
  showToolbar={true}
  showDownload={true}
  showPrint={true}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onLoad: fn(),
    onError: fn(),
    onDownload: fn(),
    onPrint: fn(),
  },
  argTypes: {
    showToolbar: {
      control: 'boolean',
      description: 'Show toolbar',
    },
    showDownload: {
      control: 'boolean',
      description: 'Show download button',
    },
    showPrint: {
      control: 'boolean',
      description: 'Show print button',
    },
    showZoom: {
      control: 'boolean',
      description: 'Show zoom controls',
    },
    showPageNav: {
      control: 'boolean',
      description: 'Show page navigation',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic PDF preview
export const Default: Story = {
  args: {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    title: 'Document Preview',
    showToolbar: true,
    showDownload: true,
    showPrint: true,
    showZoom: true,
    showPageNav: true,
    initialZoom: 100,
  },
};

// With title
export const WithTitle: Story = {
  args: {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    title: 'Invoice #12345',
    showToolbar: true,
    showDownload: true,
    showPrint: true,
    showZoom: true,
    showPageNav: true,
  },
};

// Minimal toolbar
export const MinimalToolbar: Story = {
  args: {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    title: 'Document',
    showToolbar: true,
    showDownload: false,
    showPrint: false,
    showZoom: false,
    showPageNav: true,
  },
};

// Download only
export const DownloadOnly: Story = {
  args: {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    title: 'Downloadable Document',
    showToolbar: true,
    showDownload: true,
    showPrint: false,
    showZoom: false,
    showPageNav: false,
  },
};

// Print only
export const PrintOnly: Story = {
  args: {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    title: 'Printable Document',
    showToolbar: true,
    showDownload: false,
    showPrint: true,
    showZoom: false,
    showPageNav: false,
  },
};

// Custom size
export const CustomSize: Story = {
  args: {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    title: 'Custom Size',
    width: '800px',
    height: '600px',
    showToolbar: true,
    showDownload: true,
    showPrint: true,
    showZoom: true,
    showPageNav: true,
  },
};

// Without toolbar
export const WithoutToolbar: Story = {
  args: {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    title: 'No Toolbar',
    showToolbar: false,
    width: '600px',
    height: '800px',
  },
};

// Full featured
export const FullFeatured: Story = {
  args: {
    src: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
    title: 'Full Featured Preview',
    showToolbar: true,
    showDownload: true,
    showPrint: true,
    showZoom: true,
    showPageNav: true,
    initialZoom: 100,
    width: '100%',
    height: '800px',
  },
};

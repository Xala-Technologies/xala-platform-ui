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

// Wrapper for default story
const DefaultDemo = () => {
  return (
    <PDFPreview
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      title="Eksempel Tekst"
      showToolbar={true}
      showDownload={true}
      showPrint={true}
      showZoom={true}
      showPageNav={true}
      initialZoom={100}
    />
  );
};

// Basic PDF preview
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Wrapper for with title story
const WithTitleDemo = () => {
  return (
    <PDFPreview
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      title={`$"Eksempel Tekst" #12345`}
      showToolbar={true}
      showDownload={true}
      showPrint={true}
      showZoom={true}
      showPageNav={true}
    />
  );
};

// With title
export const WithTitle: Story = {
  render: function Render() {
    return <WithTitleDemo />;
  },
};

// Wrapper for minimal toolbar story
const MinimalToolbarDemo = () => {
  return (
    <PDFPreview
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      title="Eksempel Tekst"
      showToolbar={true}
      showDownload={false}
      showPrint={false}
      showZoom={false}
      showPageNav={true}
    />
  );
};

// Minimal toolbar
export const MinimalToolbar: Story = {
  render: function Render() {
    return <MinimalToolbarDemo />;
  },
};

// Wrapper for download only story
const DownloadOnlyDemo = () => {
  return (
    <PDFPreview
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      title="Eksempel Tekst"
      showToolbar={true}
      showDownload={true}
      showPrint={false}
      showZoom={false}
      showPageNav={false}
    />
  );
};

// Download only
export const DownloadOnly: Story = {
  render: function Render() {
    return <DownloadOnlyDemo />;
  },
};

// Wrapper for print only story
const PrintOnlyDemo = () => {
  return (
    <PDFPreview
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      title="Eksempel Tekst"
      showToolbar={true}
      showDownload={false}
      showPrint={true}
      showZoom={false}
      showPageNav={false}
    />
  );
};

// Print only
export const PrintOnly: Story = {
  render: function Render() {
    return <PrintOnlyDemo />;
  },
};

// Wrapper for custom size story
const CustomSizeDemo = () => {
  return (
    <PDFPreview
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      title="Eksempel Tekst"
      width="800px"
      height="600px"
      showToolbar={true}
      showDownload={true}
      showPrint={true}
      showZoom={true}
      showPageNav={true}
    />
  );
};

// Custom size
export const CustomSize: Story = {
  render: function Render() {
    return <CustomSizeDemo />;
  },
};

// Wrapper for without toolbar story
const WithoutToolbarDemo = () => {
  return (
    <PDFPreview
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      title="Eksempel Tekst"
      showToolbar={false}
      width="600px"
      height="800px"
    />
  );
};

// Without toolbar
export const WithoutToolbar: Story = {
  render: function Render() {
    return <WithoutToolbarDemo />;
  },
};

// Wrapper for full featured story
const FullFeaturedDemo = () => {
  return (
    <PDFPreview
      src="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
      title="Eksempel Tekst"
      showToolbar={true}
      showDownload={true}
      showPrint={true}
      showZoom={true}
      showPageNav={true}
      initialZoom={100}
      width="100%"
      height="800px"
    />
  );
};

// Full featured
export const FullFeatured: Story = {
  render: function Render() {
    return <FullFeaturedDemo />;
  },
};

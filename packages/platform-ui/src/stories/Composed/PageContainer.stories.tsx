import type { Meta, StoryObj } from '@storybook/react';
import { PageContainer } from '../../composed/PageContainer';
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof PageContainer> = {
  title: 'Composed/PageContainer',
  component: PageContainer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PageContainer

Consistent page wrapper with proper spacing from design tokens. Eliminates repeated inline styles across pages.

### Features
- Configurable gap between children
- Max width constraints
- Padding options
- Design token compliant

### Usage
\`\`\`tsx
<PageContainer gap={6} maxWidth="lg" padding={4}>
  <Heading>Page Title</Heading>
  <Content />
</PageContainer>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    gap: {
      control: 'select',
      options: [1, 2, 3, 4, 5, 6, 7, 8],
      description: 'Spacing between children',
    },
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full', 'none'],
      description: 'Maximum width constraint',
    },
    padding: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6],
      description: 'Padding around content',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default page container
export const Default: Story = {
  render: () => (
    <PageContainer gap={6} maxWidth="lg" padding={4}>
      <Heading level={1} data-size="lg">
        Page Title
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">Page content goes here.</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">More content.</Paragraph>
      </Card>
    </PageContainer>
  ),
};

// Small gap
export const SmallGap: Story = {
  render: () => (
    <PageContainer gap={2} maxWidth="md" padding={2}>
      <Heading level={2} data-size="md">
        Compact Layout
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">Item 1</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">Item 2</Paragraph>
      </Card>
    </PageContainer>
  ),
};

// Large gap
export const LargeGap: Story = {
  render: () => (
    <PageContainer gap={8} maxWidth="xl" padding={6}>
      <Heading level={1} data-size="lg">
        Spacious Layout
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">Content with large spacing.</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">More content.</Paragraph>
      </Card>
    </PageContainer>
  ),
};

// Max width variants
export const MaxWidthSmall: Story = {
  render: () => (
    <PageContainer gap={4} maxWidth="sm" padding={3}>
      <Heading level={2} data-size="md">
        Small Max Width
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">Content constrained to small width.</Paragraph>
      </Card>
    </PageContainer>
  ),
};

export const MaxWidthMedium: Story = {
  render: () => (
    <PageContainer gap={4} maxWidth="md" padding={3}>
      <Heading level={2} data-size="md">
        Medium Max Width
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">Content constrained to medium width.</Paragraph>
      </Card>
    </PageContainer>
  ),
};

export const MaxWidthLarge: Story = {
  render: () => (
    <PageContainer gap={4} maxWidth="lg" padding={3}>
      <Heading level={2} data-size="md">
        Large Max Width
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">Content constrained to large width.</Paragraph>
      </Card>
    </PageContainer>
  ),
};

export const MaxWidthFull: Story = {
  render: () => (
    <PageContainer gap={4} maxWidth="full" padding={3}>
      <Heading level={2} data-size="md">
        Full Width
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">Content uses full available width.</Paragraph>
      </Card>
    </PageContainer>
  ),
};

// No padding
export const NoPadding: Story = {
  render: () => (
    <PageContainer gap={4} maxWidth="lg" padding={0}>
      <Heading level={2} data-size="md">
        No Padding
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">Content with no padding around container.</Paragraph>
      </Card>
    </PageContainer>
  ),
};

// With multiple children
export const MultipleChildren: Story = {
  render: () => (
    <PageContainer gap={4} maxWidth="lg" padding={4}>
      <Heading level={1} data-size="lg">
        Page Title
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Heading level={3} data-size="sm">
          Section 1
        </Heading>
        <Paragraph data-size="sm">Content for section 1.</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Heading level={3} data-size="sm">
          Section 2
        </Heading>
        <Paragraph data-size="sm">Content for section 2.</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Heading level={3} data-size="sm">
          Section 3
        </Heading>
        <Paragraph data-size="sm">Content for section 3.</Paragraph>
      </Card>
    </PageContainer>
  ),
};

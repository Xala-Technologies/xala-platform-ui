import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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

// Wrapper for default story
const DefaultDemo = () => {
  const t = useT();
  return (
    <PageContainer gap={6} maxWidth="lg" padding={4}>
      <Heading level={1} data-size="lg">
        {t('storybook.demo.pageTitle')}
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.pageContentHere')}</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.moreContent')}</Paragraph>
      </Card>
    </PageContainer>
  );
};

// Default page container
export const Default: Story = {
  render: () => <DefaultDemo />,
};

// Wrapper for small gap story
const SmallGapDemo = () => {
  const t = useT();
  return (
    <PageContainer gap={2} maxWidth="md" padding={2}>
      <Heading level={2} data-size="md">
        {t('storybook.demo.compactLayout')}
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.item')} 1</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.item')} 2</Paragraph>
      </Card>
    </PageContainer>
  );
};

// Small gap
export const SmallGap: Story = {
  render: () => <SmallGapDemo />,
};

// Wrapper for large gap story
const LargeGapDemo = () => {
  const t = useT();
  return (
    <PageContainer gap={8} maxWidth="xl" padding={6}>
      <Heading level={1} data-size="lg">
        {t('storybook.demo.spaciousLayout')}
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.contentWithLargeSpacing')}</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.moreContent')}</Paragraph>
      </Card>
    </PageContainer>
  );
};

// Large gap
export const LargeGap: Story = {
  render: () => <LargeGapDemo />,
};

// Wrapper for max width small story
const MaxWidthSmallDemo = () => {
  const t = useT();
  return (
    <PageContainer gap={4} maxWidth="sm" padding={3}>
      <Heading level={2} data-size="md">
        {t('storybook.demo.smallMaxWidth')}
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.contentConstrainedSmall')}</Paragraph>
      </Card>
    </PageContainer>
  );
};

// Max width variants
export const MaxWidthSmall: Story = {
  render: () => <MaxWidthSmallDemo />,
};

// Wrapper for max width medium story
const MaxWidthMediumDemo = () => {
  const t = useT();
  return (
    <PageContainer gap={4} maxWidth="md" padding={3}>
      <Heading level={2} data-size="md">
        {t('storybook.demo.mediumMaxWidth')}
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.contentConstrainedMedium')}</Paragraph>
      </Card>
    </PageContainer>
  );
};

export const MaxWidthMedium: Story = {
  render: () => <MaxWidthMediumDemo />,
};

// Wrapper for max width large story
const MaxWidthLargeDemo = () => {
  const t = useT();
  return (
    <PageContainer gap={4} maxWidth="lg" padding={3}>
      <Heading level={2} data-size="md">
        {t('storybook.demo.largeMaxWidth')}
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.contentConstrainedLarge')}</Paragraph>
      </Card>
    </PageContainer>
  );
};

export const MaxWidthLarge: Story = {
  render: () => <MaxWidthLargeDemo />,
};

// Wrapper for max width full story
const MaxWidthFullDemo = () => {
  const t = useT();
  return (
    <PageContainer gap={4} maxWidth="full" padding={3}>
      <Heading level={2} data-size="md">
        {t('storybook.demo.fullWidth')}
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.contentFullWidth')}</Paragraph>
      </Card>
    </PageContainer>
  );
};

export const MaxWidthFull: Story = {
  render: () => <MaxWidthFullDemo />,
};

// Wrapper for no padding story
const NoPaddingDemo = () => {
  const t = useT();
  return (
    <PageContainer gap={4} maxWidth="lg" padding={0}>
      <Heading level={2} data-size="md">
        {t('storybook.demo.noPadding')}
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Paragraph data-size="sm">{t('storybook.demo.contentNoPadding')}</Paragraph>
      </Card>
    </PageContainer>
  );
};

// No padding
export const NoPadding: Story = {
  render: () => <NoPaddingDemo />,
};

// Wrapper for multiple children story
const MultipleChildrenDemo = () => {
  const t = useT();
  return (
    <PageContainer gap={4} maxWidth="lg" padding={4}>
      <Heading level={1} data-size="lg">
        {t('storybook.demo.pageTitle')}
      </Heading>
      <Card data-color="neutral" data-size="medium">
        <Heading level={3} data-size="sm">
          {t('storybook.demo.section')} 1
        </Heading>
        <Paragraph data-size="sm">{t('storybook.demo.contentForSection')} 1.</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Heading level={3} data-size="sm">
          {t('storybook.demo.section')} 2
        </Heading>
        <Paragraph data-size="sm">{t('storybook.demo.contentForSection')} 2.</Paragraph>
      </Card>
      <Card data-color="neutral" data-size="medium">
        <Heading level={3} data-size="sm">
          {t('storybook.demo.section')} 3
        </Heading>
        <Paragraph data-size="sm">{t('storybook.demo.contentForSection')} 3.</Paragraph>
      </Card>
    </PageContainer>
  );
};

// With multiple children
export const MultipleChildren: Story = {
  render: () => <MultipleChildrenDemo />,
};

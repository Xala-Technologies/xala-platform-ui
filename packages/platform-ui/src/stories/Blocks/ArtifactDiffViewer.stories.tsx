import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ArtifactDiffViewer, Stack, Paragraph, Card } from '../../index';

/**
 * ArtifactDiffViewer displays differences between artifact versions.
 *
 * ## Features
 * - Side-by-side comparison
 * - Line-by-line diff display
 * - Added, removed, and modified indicators
 * - Customizable max height
 *
 * ## When to Use
 * - Code diff viewers
 * - Version comparisons
 * - Change tracking
 */
const meta: Meta<typeof ArtifactDiffViewer> = {
  title: 'Blocks/ArtifactDiffViewer',
  component: ArtifactDiffViewer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArtifactDiffViewer>;

/**
 * Default diff viewer
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.artifactDiff.description')}</Paragraph>
            <ArtifactDiffViewer
              fileName="Button.tsx"
              oldContent={`export function Button({ children, onClick }) {
  return (
    <button onClick={onClick}>
      {children}
    </button>
  );
}`}
              newContent={`export function Button({ children, onClick }) {
  return (
    <button 
      onClick={onClick}
      data-testid="button"
    >
      {children}
    </button>
  );
}`}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Diff with structured changes
 */
export const WithStructuredChanges: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.artifactDiff.structured')}</Paragraph>
            <ArtifactDiffViewer
              fileName="config.json"
              changes={[
                {
                  type: 'added',
                  path: 'theme.colors.primary',
                  newValue: '#0062BA',
                },
                {
                  type: 'removed',
                  path: 'theme.colors.accent',
                  oldValue: '#FF6B6B',
                },
                {
                  type: 'modified',
                  path: 'theme.fontSize.base',
                  oldValue: '16px',
                  newValue: '18px',
                },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Diff with custom max height
 */
export const CustomHeight: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.artifactDiff.customHeight')}</Paragraph>
            <ArtifactDiffViewer
              fileName="Component.tsx"
              oldContent={`export function Component() {
  return <div>Old content</div>;
}`}
              newContent={`export function Component() {
  return <div>New content</div>;
}`}
              maxHeight="300px"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Large diff
 */
export const LargeDiff: Story = {
  render: function Render() {
    const t = useT();
    const oldContent = Array.from({ length: 100 }, (_, i) => `Line ${i + 1}: Old content`).join('\n');
    const newContent = Array.from({ length: 100 }, (_, i) => `Line ${i + 1}: ${i < 50 ? 'Old' : 'New'} content`).join('\n');
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.artifactDiff.large')}</Paragraph>
            <ArtifactDiffViewer
              fileName="LargeFile.tsx"
              oldContent={oldContent}
              newContent={newContent}
              maxHeight="500px"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

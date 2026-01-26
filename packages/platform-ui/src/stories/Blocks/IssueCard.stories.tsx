import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { IssueCard, Stack } from '../../index';

/**
 * IssueCard displays GitHub/GitLab issues and pull requests.
 *
 * ## Features
 * - Issue/PR display
 * - Multiple states (open, closed, merged, draft)
 * - Labels support
 * - Comment count
 * - Author display
 *
 * ## When to Use
 * - Issue lists
 * - PR displays
 * - Project management
 */
const meta: Meta<typeof IssueCard> = {
  title: 'Blocks/IssueCard',
  component: IssueCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
IssueCard displays GitHub/GitLab issues and pull requests.

## Features
- Issue/PR display
- Multiple states (open, closed, merged, draft)
- Labels support
- Comment count
- Author display

## When to Use
- Issue lists
- PR displays
- Project management
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof IssueCard>;

/**
 * Default issue card
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <IssueCard
          number={123}
          title={t('storybook.issueCard.fixLoginBug')}
          body={t('storybook.issueCard.fixLoginBugDescription')}
          state="open"
          type="issue"
          platform="github"
          author={t('storybook.issueCard.johnDoe')}
          createdAt={new Date(2026, 0, 20)}
          commentCount={5}
        />
      </Stack>
    );
  },
};

/**
 * Issue card - pull request
 */
export const PullRequest: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <IssueCard
          number={456}
          title={t('storybook.issueCard.addNewFeature')}
          body={t('storybook.issueCard.addNewFeatureDescription')}
          state="open"
          type="pull_request"
          platform="github"
          author={t('storybook.issueCard.janeDoe')}
          createdAt={new Date(2026, 0, 22)}
          commentCount={12}
          labels={[
            { name: t('storybook.issueCard.feature'), color: '#0E8A16' },
            { name: t('storybook.issueCard.frontend'), color: '#0052CC' },
          ]}
        />
      </div>
    );
  },
};

/**
 * Issue card - merged
 */
export const Merged: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <IssueCard
          number={789}
          title={t('storybook.issueCard.improvePerformance')}
          body={t('storybook.issueCard.improvePerformanceDescription')}
          state="merged"
          type="pull_request"
          platform="github"
          author={t('storybook.issueCard.johnDoe')}
          createdAt={new Date(2026, 0, 15)}
          commentCount={8}
        />
      </div>
    );
  },
};

/**
 * Issue card - closed
 */
export const Closed: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <IssueCard
          number={321}
          title={t('storybook.issueCard.duplicateIssue')}
          body={t('storybook.issueCard.duplicateIssueDescription')}
          state="closed"
          type="issue"
          platform="github"
          author={t('storybook.issueCard.janeDoe')}
          createdAt={new Date(2026, 0, 10)}
          commentCount={2}
        />
      </div>
    );
  },
};

/**
 * Issue card - draft
 */
export const Draft: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <IssueCard
          number={654}
          title={t('storybook.issueCard.wipFeature')}
          body={t('storybook.issueCard.wipFeatureDescription')}
          state="draft"
          type="pull_request"
          platform="github"
          author={t('storybook.issueCard.johnDoe')}
          createdAt={new Date(2026, 0, 25)}
          commentCount={0}
        />
      </div>
    );
  },
};

/**
 * Issue card - selected
 */
export const Selected: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <IssueCard
          number={123}
          title={t('storybook.issueCard.fixLoginBug')}
          body={t('storybook.issueCard.fixLoginBugDescription')}
          state="open"
          type="issue"
          platform="github"
          author={t('storybook.issueCard.johnDoe')}
          createdAt={new Date(2026, 0, 20)}
          commentCount={5}
          selected
        />
      </div>
    );
  },
};

/**
 * Issue card - GitLab
 */
export const GitLab: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <IssueCard
          number={999}
          title={t('storybook.issueCard.updateDocumentation')}
          body={t('storybook.issueCard.updateDocumentationDescription')}
          state="open"
          type="merge_request"
          platform="gitlab"
          author={t('storybook.issueCard.janeDoe')}
          createdAt={new Date(2026, 0, 24)}
          commentCount={3}
        />
      </div>
    );
  },
};

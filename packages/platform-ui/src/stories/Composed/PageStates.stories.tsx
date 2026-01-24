import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { LoadingState, EmptyState, NotFoundState, ErrorState } from '../../composed/PageStates';
import { Button } from '@digdir/designsystemet-react';
import { Plus, FileText } from 'lucide-react';

const meta: Meta<typeof LoadingState> = {
  title: 'Composed/PageStates',
  component: LoadingState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PageStates Components

Reusable components for common page states: loading, empty, not found, and error states.

### Features
- LoadingState with spinner and label
- EmptyState with icon, title, description, and action
- NotFoundState with back navigation
- ErrorState with retry action
- Size variants for loading state
- Compact variant for empty state

### Usage
\`\`\`tsx
<LoadingState label="Loading..." size="md" />
<EmptyState title="No items" description="Create your first item" action={<Button>Create</Button>} />
<NotFoundState title="Not found" backLink={{ label: 'Go back', href: '/' }} />
<ErrorState title="Error" onRetry={handleRetry} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Loading spinner size',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// LoadingState - Small
const LoadingSmallExample = () => {
  const t = useT();
  return <LoadingState label={t('platform.common.loading')} size="sm" />;
};

export const LoadingSmall: Story = {
  render: () => <LoadingSmallExample />,
};

// LoadingState - Medium
const LoadingMediumExample = () => {
  const t = useT();
  return <LoadingState label={t('platform.common.loading')} size="md" />;
};

export const LoadingMedium: Story = {
  render: () => <LoadingMediumExample />,
};

// LoadingState - Large
const LoadingLargeExample = () => {
  const t = useT();
  return <LoadingState label={t('platform.common.loading')} size="lg" />;
};

export const LoadingLarge: Story = {
  render: () => <LoadingLargeExample />,
};

// LoadingState - Custom label
const LoadingCustomLabelExample = () => {
  const t = useT();
  return <LoadingState label={t('storybook.demo.fetchingData')} size="md" />;
};

export const LoadingCustomLabel: Story = {
  render: () => <LoadingCustomLabelExample />,
};

// EmptyState - Default
const EmptyDefaultExample = () => {
  const t = useT();
  return (
    <EmptyState
      title={t('storybook.demo.noItemsFound')}
      description={t('storybook.demo.getStartedByCreating')}
      action={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          {t('storybook.demo.createItem')}
        </Button>
      }
    />
  );
};

export const EmptyDefault: Story = {
  render: () => <EmptyDefaultExample />,
};

// EmptyState - Compact
const EmptyCompactExample = () => {
  const t = useT();
  return (
    <EmptyState
      title={t('storybook.demo.noResults')}
      description={t('storybook.demo.tryAdjustingSearch')}
      variant="compact"
    />
  );
};

export const EmptyCompact: Story = {
  render: () => <EmptyCompactExample />,
};

// EmptyState - With custom icon
const EmptyWithIconExample = () => {
  const t = useT();
  return (
    <EmptyState
      icon={<FileText size={48} />}
      title={t('storybook.demo.noDocuments')}
      description={t('storybook.demo.uploadFirstDocument')}
      action={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          <Plus size={16} style={{ marginRight: 'var(--ds-spacing-1)' }} />
          {t('storybook.demo.uploadDocument')}
        </Button>
      }
    />
  );
};

export const EmptyWithIcon: Story = {
  render: () => <EmptyWithIconExample />,
};

// EmptyState - Without action
const EmptyNoActionExample = () => {
  const t = useT();
  return (
    <EmptyState
      title={t('storybook.demo.noItems')}
      description={t('storybook.demo.noItemsToDisplay')}
    />
  );
};

export const EmptyNoAction: Story = {
  render: () => <EmptyNoActionExample />,
};

// NotFoundState - Default
const NotFoundDefaultExample = () => {
  const t = useT();
  return (
    <NotFoundState
      title={t('platform.errors.notFound')}
      description={t('storybook.demo.pageNotFoundDescription')}
      backLink={{
        label: t('platform.common.back'),
        href: '/',
        onClick: fn(),
      }}
    />
  );
};

export const NotFoundDefault: Story = {
  render: () => <NotFoundDefaultExample />,
};

// NotFoundState - Without back link
const NotFoundNoBackLinkExample = () => {
  const t = useT();
  return (
    <NotFoundState
      title={t('storybook.demo.resourceNotFound')}
      description={t('storybook.demo.resourceNotFoundDescription')}
    />
  );
};

export const NotFoundNoBackLink: Story = {
  render: () => <NotFoundNoBackLinkExample />,
};

// NotFoundState - Custom title and description
const NotFoundCustomExample = () => {
  const t = useT();
  return (
    <NotFoundState
      title="404"
      description={t('storybook.demo.couldNotFind')}
      backLink={{
        label: t('storybook.demo.returnHome'),
        href: '/',
      }}
    />
  );
};

export const NotFoundCustom: Story = {
  render: () => <NotFoundCustomExample />,
};

// ErrorState - Default
const ErrorDefaultExample = () => {
  const t = useT();
  return (
    <ErrorState
      title={t('platform.errors.serverError')}
      description={t('storybook.demo.errorWhileLoading')}
      onRetry={fn()}
      retryLabel={t('storybook.demo.tryAgain')}
    />
  );
};

export const ErrorDefault: Story = {
  render: () => <ErrorDefaultExample />,
};

// ErrorState - Custom title
const ErrorCustomExample = () => {
  const t = useT();
  return (
    <ErrorState
      title={t('storybook.demo.failedToLoad')}
      description={t('storybook.demo.checkConnectionAndRetry')}
      onRetry={fn()}
      retryLabel={t('storybook.demo.retry')}
    />
  );
};

export const ErrorCustom: Story = {
  render: () => <ErrorCustomExample />,
};

// ErrorState - Without retry
const ErrorNoRetryExample = () => {
  const t = useT();
  return (
    <ErrorState
      title={t('platform.errors.serverError')}
      description={t('storybook.demo.unexpectedErrorContactSupport')}
    />
  );
};

export const ErrorNoRetry: Story = {
  render: () => <ErrorNoRetryExample />,
};

// All states showcase
const AllStatesExample = () => {
  const t = useT();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      <div
        style={{
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <LoadingState label={t('storybook.demo.loadingContent')} size="md" />
      </div>
      <div
        style={{
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <EmptyState
          title={t('storybook.demo.noItems')}
          description={t('storybook.demo.createFirstToGetStarted')}
          action={
            <Button onClick={fn()} data-color="accent" data-size="medium">
              {t('storybook.demo.createItem')}
            </Button>
          }
        />
      </div>
      <div
        style={{
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <NotFoundState
          title={t('platform.errors.notFound')}
          description={t('storybook.demo.resourceNotFoundDescription')}
          backLink={{ label: t('platform.common.back'), href: '/' }}
        />
      </div>
      <div
        style={{
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <ErrorState
          title={t('platform.errors.serverError')}
          description={t('storybook.demo.somethingWentWrongTryAgain')}
          onRetry={fn()}
        />
      </div>
    </div>
  );
};

export const AllStates: Story = {
  render: () => <AllStatesExample />,
};

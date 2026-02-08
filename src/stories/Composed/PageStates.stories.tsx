import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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
  return <LoadingState label={t('platform.common.loading')} size="sm" />;
};

export const LoadingSmall: Story = {
  render: function Render() {
    return <LoadingSmallExample />;
  },
};

// LoadingState - Medium
const LoadingMediumExample = () => {
  return <LoadingState label={t('platform.common.loading')} size="md" />;
};

export const LoadingMedium: Story = {
  render: function Render() {
    return <LoadingMediumExample />;
  },
};

// LoadingState - Large
const LoadingLargeExample = () => {
  return <LoadingState label={t('platform.common.loading')} size="lg" />;
};

export const LoadingLarge: Story = {
  render: function Render() {
    return <LoadingLargeExample />;
  },
};

// LoadingState - Custom label
const LoadingCustomLabelExample = () => {
  return <LoadingState label="Eksempel Tekst" size="md" />;
};

export const LoadingCustomLabel: Story = {
  render: function Render() {
    return <LoadingCustomLabelExample />;
  },
};

// EmptyState - Default
const EmptyDefaultExample = () => {
  return (
    <EmptyState
      title="Eksempel Tekst"
      description="Eksempel Tekst"
      action={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          "Eksempel Tekst"
        </Button>
      }
    />
  );
};

export const EmptyDefault: Story = {
  render: function Render() {
    return <EmptyDefaultExample />;
  },
};

// EmptyState - Compact
const EmptyCompactExample = () => {
  return (
    <EmptyState
      title="Eksempel Tekst"
      description="Eksempel Tekst"
      variant="compact"
    />
  );
};

export const EmptyCompact: Story = {
  render: function Render() {
    return <EmptyCompactExample />;
  },
};

// EmptyState - With custom icon
const EmptyWithIconExample = () => {
  return (
    <EmptyState
      icon={<FileText size={48} />}
      title="Eksempel Tekst"
      description="Eksempel Tekst"
      action={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          <Plus size={16} style={{ marginRight: 'var(--ds-spacing-1)' }} />
          "Eksempel Tekst"
        </Button>
      }
    />
  );
};

export const EmptyWithIcon: Story = {
  render: function Render() {
    return <EmptyWithIconExample />;
  },
};

// EmptyState - Without action
const EmptyNoActionExample = () => {
  return (
    <EmptyState
      title="Eksempel Tekst"
      description="Eksempel Tekst"
    />
  );
};

export const EmptyNoAction: Story = {
  render: function Render() {
    return <EmptyNoActionExample />;
  },
};

// NotFoundState - Default
const NotFoundDefaultExample = () => {
  return (
    <NotFoundState
      title={t('platform.errors.notFound')}
      description="Eksempel Tekst"
      backLink={{
        label: t('platform.common.back'),
        href: '/',
        onClick: fn(),
      }}
    />
  );
};

export const NotFoundDefault: Story = {
  render: function Render() {
    return <NotFoundDefaultExample />;
  },
};

// NotFoundState - Without back link
const NotFoundNoBackLinkExample = () => {
  return (
    <NotFoundState
      title="Eksempel Tekst"
      description="Eksempel Tekst"
    />
  );
};

export const NotFoundNoBackLink: Story = {
  render: function Render() {
    return <NotFoundNoBackLinkExample />;
  },
};

// NotFoundState - Custom title and description
const NotFoundCustomExample = () => {
  return (
    <NotFoundState
      title="404"
      description="Eksempel Tekst"
      backLink={{
        label: t('storybook.demo.returnHome'),
        href: '/',
      }}
    />
  );
};

export const NotFoundCustom: Story = {
  render: function Render() {
    return <NotFoundCustomExample />;
  },
};

// ErrorState - Default
const ErrorDefaultExample = () => {
  return (
    <ErrorState
      title={t('platform.errors.serverError')}
      description="Eksempel Tekst"
      onRetry={fn()}
      retryLabel="Eksempel Tekst"
    />
  );
};

export const ErrorDefault: Story = {
  render: function Render() {
    return <ErrorDefaultExample />;
  },
};

// ErrorState - Custom title
const ErrorCustomExample = () => {
  return (
    <ErrorState
      title="Eksempel Tekst"
      description="Eksempel Tekst"
      onRetry={fn()}
      retryLabel="Eksempel Tekst"
    />
  );
};

export const ErrorCustom: Story = {
  render: function Render() {
    return <ErrorCustomExample />;
  },
};

// ErrorState - Without retry
const ErrorNoRetryExample = () => {
  return (
    <ErrorState
      title={t('platform.errors.serverError')}
      description="Eksempel Tekst"
    />
  );
};

export const ErrorNoRetry: Story = {
  render: function Render() {
    return <ErrorNoRetryExample />;
  },
};

// All states showcase
const AllStatesExample = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      <div
        style={{
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <LoadingState label="Eksempel Tekst" size="md" />
      </div>
      <div
        style={{
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <EmptyState
          title="Eksempel Tekst"
          description="Eksempel Tekst"
          action={
            <Button onClick={fn()} data-color="accent" data-size="medium">
              "Eksempel Tekst"
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
          description="Eksempel Tekst"
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
          description="Eksempel Tekst"
          onRetry={fn()}
        />
      </div>
    </div>
  );
};

export const AllStates: Story = {
  render: function Render() {
    return <AllStatesExample />;
  },
};

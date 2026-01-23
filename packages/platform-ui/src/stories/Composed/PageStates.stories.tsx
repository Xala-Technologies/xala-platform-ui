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
export const LoadingSmall: Story = {
  render: () => <LoadingState label="Loading..." size="sm" />,
};

// LoadingState - Medium
export const LoadingMedium: Story = {
  render: () => <LoadingState label="Loading..." size="md" />,
};

// LoadingState - Large
export const LoadingLarge: Story = {
  render: () => <LoadingState label="Loading..." size="lg" />,
};

// LoadingState - Custom label
export const LoadingCustomLabel: Story = {
  render: () => <LoadingState label="Fetching data..." size="md" />,
};

// EmptyState - Default
export const EmptyDefault: Story = {
  render: () => (
    <EmptyState
      title="No items found"
      description="Get started by creating your first item."
      action={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          Create Item
        </Button>
      }
    />
  ),
};

// EmptyState - Compact
export const EmptyCompact: Story = {
  render: () => (
    <EmptyState
      title="No results"
      description="Try adjusting your search criteria."
      variant="compact"
    />
  ),
};

// EmptyState - With custom icon
export const EmptyWithIcon: Story = {
  render: () => (
    <EmptyState
      icon={<FileText size={48} />}
      title="No documents"
      description="Upload your first document to get started."
      action={
        <Button onClick={fn()} data-color="accent" data-size="medium">
          <Plus size={16} style={{ marginRight: 'var(--ds-spacing-1)' }} />
          Upload Document
        </Button>
      }
    />
  ),
};

// EmptyState - Without action
export const EmptyNoAction: Story = {
  render: () => <EmptyState title="No items" description="There are no items to display." />,
};

// NotFoundState - Default
export const NotFoundDefault: Story = {
  render: () => (
    <NotFoundState
      title="Page not found"
      description="The page you're looking for doesn't exist or has been moved."
      backLink={{
        label: 'Go back',
        href: '/',
        onClick: fn(),
      }}
    />
  ),
};

// NotFoundState - Without back link
export const NotFoundNoBackLink: Story = {
  render: () => (
    <NotFoundState
      title="Resource not found"
      description="The requested resource could not be found."
    />
  ),
};

// NotFoundState - Custom title and description
export const NotFoundCustom: Story = {
  render: () => (
    <NotFoundState
      title="404"
      description="We couldn't find what you're looking for."
      backLink={{
        label: 'Return home',
        href: '/',
      }}
    />
  ),
};

// ErrorState - Default
export const ErrorDefault: Story = {
  render: () => (
    <ErrorState
      title="Something went wrong"
      description="An error occurred while loading this content."
      onRetry={fn()}
      retryLabel="Try again"
    />
  ),
};

// ErrorState - Custom title
export const ErrorCustom: Story = {
  render: () => (
    <ErrorState
      title="Failed to load"
      description="Please check your connection and try again."
      onRetry={fn()}
      retryLabel="Retry"
    />
  ),
};

// ErrorState - Without retry
export const ErrorNoRetry: Story = {
  render: () => (
    <ErrorState
      title="Error"
      description="An unexpected error occurred. Please contact support if the problem persists."
    />
  ),
};

// All states showcase
export const AllStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      <div
        style={{
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <LoadingState label="Loading content..." size="md" />
      </div>
      <div
        style={{
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <EmptyState
          title="No items"
          description="Create your first item to get started."
          action={
            <Button onClick={fn()} data-color="accent" data-size="medium">
              Create Item
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
          title="Not found"
          description="The requested resource could not be found."
          backLink={{ label: 'Go back', href: '/' }}
        />
      </div>
      <div
        style={{
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <ErrorState
          title="Error"
          description="Something went wrong. Please try again."
          onRetry={fn()}
        />
      </div>
    </div>
  ),
};

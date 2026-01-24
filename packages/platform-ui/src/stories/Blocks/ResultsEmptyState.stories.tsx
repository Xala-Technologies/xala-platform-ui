import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ResultsEmptyState } from '../../blocks/ResultsEmptyState';
import { Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof ResultsEmptyState> = {
  title: 'Blocks/ResultsEmptyState',
  component: ResultsEmptyState,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ResultsEmptyState

Empty state component for when no results match the current filters. Supports multiple variants for different scenarios.

### Features
- Multiple variants (no-results, no-data, error)
- Custom icons
- Action buttons
- Title and description
- Design token compliant

### Usage
\`\`\`tsx
<ResultsEmptyState
  variant="no-results"
  title="Ingen resultater"
  description="Prov a endre filtrene dine"
  action={<Button>Fjern filtre</Button>}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['no-results', 'no-data', 'error'],
      description: 'Empty state variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// No results variant
export const NoResults: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResultsEmptyState
        variant="no-results"
        title={t('platform.errors.notFound')}
        description={t('storybook.demo.cardDescription')}
      />
    );
  },
};

// No results with action
export const NoResultsWithAction: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResultsEmptyState
        variant="no-results"
        title={t('platform.errors.notFound')}
        description={t('storybook.demo.cardDescription')}
        action={
          <Button onClick={() => alert('Clear filters')} data-color="accent" data-size="medium">
            {t('platform.common.cancel')}
          </Button>
        }
      />
    );
  },
};

// No data variant
export const NoData: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResultsEmptyState
        variant="no-data"
        title={t('platform.errors.notFound')}
        description={t('storybook.demo.cardDescription')}
      />
    );
  },
};

// Error variant
export const Error: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResultsEmptyState
        variant="error"
        title={t('platform.errors.serverError')}
        description={t('storybook.demo.cardDescription')}
        action={
          <Button onClick={() => alert('Retry')} data-color="accent" data-size="medium">
            {t('platform.common.submit')}
          </Button>
        }
      />
    );
  },
};

// Custom icon
export const CustomIcon: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResultsEmptyState
        variant="no-results"
        title={t('platform.errors.notFound')}
        description={t('storybook.demo.cardDescription')}
        icon={
          <svg
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        }
      />
    );
  },
};

// Minimal
export const Minimal: Story = {
  render: function Render() {
    const t = useT();
    return <ResultsEmptyState variant="no-results" title={t('platform.errors.notFound')} />;
  },
};

// Long description
export const LongDescription: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResultsEmptyState
        variant="no-results"
        title={t('platform.errors.notFound')}
        description={t('storybook.demo.cardDescription')}
        action={
          <Button onClick={() => alert('Clear filters')} data-color="accent" data-size="medium">
            {t('platform.common.cancel')}
          </Button>
        }
      />
    );
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-8)',
          width: '600px',
        }}
      >
        <ResultsEmptyState
          variant="no-results"
          title={t('platform.errors.notFound')}
          description={t('storybook.demo.cardDescription')}
          action={
            <Button onClick={() => {}} data-color="accent" data-size="medium">
              {t('platform.common.cancel')}
            </Button>
          }
        />
        <ResultsEmptyState
          variant="no-data"
          title={t('platform.errors.notFound')}
          description={t('storybook.demo.cardDescription')}
        />
        <ResultsEmptyState
          variant="error"
          title={t('platform.errors.serverError')}
          description={t('storybook.demo.cardDescription')}
          action={
            <Button onClick={() => {}} data-color="accent" data-size="medium">
              {t('platform.common.submit')}
            </Button>
          }
        />
      </div>
    );
  },
};

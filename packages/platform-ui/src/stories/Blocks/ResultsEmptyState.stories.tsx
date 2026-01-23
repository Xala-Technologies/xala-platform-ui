import type { Meta, StoryObj } from '@storybook/react';
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
  description="Prøv å endre filtrene dine"
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
  args: {
    variant: 'no-results',
    title: 'Ingen resultater',
    description:
      'Vi fant ingen resultater som matcher søket ditt. Prøv å endre filtrene eller søkeordene.',
  },
};

// No results with action
export const NoResultsWithAction: Story = {
  args: {
    variant: 'no-results',
    title: 'Ingen resultater',
    description: 'Vi fant ingen resultater som matcher søket ditt.',
    action: (
      <Button onClick={() => alert('Clear filters')} data-color="accent" data-size="medium">
        Fjern filtre
      </Button>
    ),
  },
};

// No data variant
export const NoData: Story = {
  args: {
    variant: 'no-data',
    title: 'Ingen data',
    description: 'Det er ingen data tilgjengelig for øyeblikket.',
  },
};

// Error variant
export const Error: Story = {
  args: {
    variant: 'error',
    title: 'Kunne ikke laste resultater',
    description: 'Det oppstod en feil ved lasting av resultater. Vennligst prøv igjen.',
    action: (
      <Button onClick={() => alert('Retry')} data-color="accent" data-size="medium">
        Prøv igjen
      </Button>
    ),
  },
};

// Custom icon
export const CustomIcon: Story = {
  args: {
    variant: 'no-results',
    title: 'Ingen resultater',
    description: 'Vi fant ingen resultater som matcher søket ditt.',
    icon: (
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
    ),
  },
};

// Minimal
export const Minimal: Story = {
  args: {
    variant: 'no-results',
    title: 'Ingen resultater',
  },
};

// Long description
export const LongDescription: Story = {
  args: {
    variant: 'no-results',
    title: 'Ingen resultater funnet',
    description:
      'Vi fant ingen resultater som matcher søket ditt. Dette kan skyldes at filtrene dine er for spesifikke, eller at det ikke finnes noen ressurser som matcher kriteriene dine. Prøv å justere filtrene eller søkeordene for å få flere resultater.',
    action: (
      <Button onClick={() => alert('Clear filters')} data-color="accent" data-size="medium">
        Fjern alle filtre
      </Button>
    ),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
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
        title="Ingen resultater"
        description="Vi fant ingen resultater som matcher søket ditt."
        action={
          <Button onClick={() => {}} data-color="accent" data-size="medium">
            Fjern filtre
          </Button>
        }
      />
      <ResultsEmptyState
        variant="no-data"
        title="Ingen data"
        description="Det er ingen data tilgjengelig for øyeblikket."
      />
      <ResultsEmptyState
        variant="error"
        title="Kunne ikke laste resultater"
        description="Det oppstod en feil ved lasting av resultater."
        action={
          <Button onClick={() => {}} data-color="accent" data-size="medium">
            Prøv igjen
          </Button>
        }
      />
    </div>
  ),
};

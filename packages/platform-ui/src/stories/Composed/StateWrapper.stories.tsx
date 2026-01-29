import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import { StateWrapper, ComponentState, useComputedState } from '../../composed/StateWrapper';
import { LoadingFallback } from '../../composed/LoadingFallback';
import { EmptyState } from '../../composed/data-page';
import { AccessGate } from '../../blocks/AccessGate';
import { Card, Heading, Paragraph, Button, Alert, Spinner } from '@digdir/designsystemet-react';
import { PlusIcon, RefreshIcon, InboxIcon } from '@navikt/aksel-icons';

const meta: Meta<typeof StateWrapper> = {
  title: 'Composed/StateWrapper',
  component: StateWrapper,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## StateWrapper

Higher-order component for handling the standard state matrix:
\`idle\`, \`loading\`, \`empty\`, \`error\`, \`success\`, \`permissionDenied\`.

### State Matrix

| State | Description | Typical Component |
|-------|-------------|-------------------|
| \`idle\` | Normal interactive state | Children content |
| \`loading\` | Data is being fetched | LoadingFallback, Skeleton |
| \`empty\` | No data available | EmptyState |
| \`error\` | An error occurred | Alert (danger) |
| \`success\` | Operation completed | Alert (success) |
| \`permissionDenied\` | User lacks permission | AccessGate |

### Features
- Follows UX Lexicon state matrix standard
- Proper ARIA attributes for each state
- State change tracking via callback
- Custom rendering via renderState prop
- Helper hooks: \`useComputedState\`, \`computeState\`

### Usage
\`\`\`tsx
<StateWrapper
  state={isLoading ? 'loading' : error ? 'error' : 'idle'}
  loadingComponent={<LoadingFallback />}
  errorComponent={<Alert data-color="danger">{error.message}</Alert>}
>
  <DataTable data={data} />
</StateWrapper>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    state: {
      control: 'select',
      options: ['idle', 'loading', 'empty', 'error', 'success', 'permissionDenied'],
      description: 'Current component state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content component
function SampleContent() {
  return (
    <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)', width: '400px' }}>
      <Heading level={3} data-size="sm">
        User List
      </Heading>
      <Paragraph data-size="sm">
        Here is the main content that displays when in idle state.
      </Paragraph>
      <ul style={{ margin: 'var(--ds-spacing-2) 0', paddingLeft: 'var(--ds-spacing-4)' }}>
        <li>John Doe</li>
        <li>Jane Smith</li>
        <li>Bob Johnson</li>
      </ul>
    </Card>
  );
}

// Idle State (Default)
export const IdleState: Story = {
  render: function Render() {
    return (
      <StateWrapper state="idle">
        <SampleContent />
      </StateWrapper>
    );
  },
};

// Loading State
export const LoadingState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '400px', height: '300px' }}>
        <StateWrapper
          state="loading"
          loadingComponent={
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--ds-spacing-8)',
                gap: 'var(--ds-spacing-4)',
              }}
            >
              <Spinner data-size="lg" aria-label={t('platform.common.loading')} />
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                {t('platform.common.loading')}
              </Paragraph>
            </div>
          }
        >
          <SampleContent />
        </StateWrapper>
      </div>
    );
  },
};

// Empty State
export const EmptyStateExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '400px' }}>
        <StateWrapper
          state="empty"
          emptyComponent={
            <EmptyState
              title={t('platform.errors.notFound')}
              description={t('storybook.demo.cardDescription')}
              icon={<InboxIcon fontSize="48px" aria-hidden />}
              action={{
                label: t('platform.common.submit'),
                onClick: () => alert('Add item'),
              }}
            />
          }
        >
          <SampleContent />
        </StateWrapper>
      </div>
    );
  },
};

// Error State
export const ErrorState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '400px' }}>
        <StateWrapper
          state="error"
          errorComponent={
            <Alert data-color="danger" style={{ margin: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="xs">
                {t('platform.errors.serverError')}
              </Heading>
              <Paragraph data-size="sm">{t('storybook.demo.cardDescription')}</Paragraph>
              <Button
                variant="secondary"
                data-size="sm"
                onClick={() => alert('Retry')}
                style={{ marginTop: 'var(--ds-spacing-2)' }}
              >
                <RefreshIcon aria-hidden /> {t('platform.common.submit')}
              </Button>
            </Alert>
          }
        >
          <SampleContent />
        </StateWrapper>
      </div>
    );
  },
};

// Success State
export const SuccessState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '400px' }}>
        <StateWrapper
          state="success"
          successComponent={
            <Alert data-color="success" style={{ margin: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="xs">
                {t('platform.common.success')}
              </Heading>
              <Paragraph data-size="sm">{t('storybook.demo.cardDescription')}</Paragraph>
            </Alert>
          }
        >
          <SampleContent />
        </StateWrapper>
      </div>
    );
  },
};

// Permission Denied State
export const PermissionDeniedState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <StateWrapper
          state="permissionDenied"
          permissionDeniedComponent={
            <AccessGate
              denied
              title={t('platform.errors.accessDenied')}
              description={t('platform.errors.noPermission')}
              requiredPermission="admin:users:read"
              actions={[{ label: t('platform.common.submit'), onClick: () => {}, variant: 'primary' }]}
            >
              <div />
            </AccessGate>
          }
        >
          <SampleContent />
        </StateWrapper>
      </div>
    );
  },
};

// Interactive Demo with State Switching
export const InteractiveDemo: Story = {
  render: function Render() {
    const [state, setState] = React.useState<ComponentState>('idle');
    const t = useT();

    return (
      <div style={{ width: '500px' }}>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            marginBottom: 'var(--ds-spacing-4)',
            flexWrap: 'wrap',
          }}
        >
          {(['idle', 'loading', 'empty', 'error', 'success', 'permissionDenied'] as const).map(
            (s) => (
              <Button
                key={s}
                variant={state === s ? 'primary' : 'secondary'}
                data-size="sm"
                onClick={() => setState(s)}
              >
                {s}
              </Button>
            )
          )}
        </div>

        <StateWrapper
          state={state}
          onStateChange={(newState) => console.log('State changed to:', newState)}
          loadingComponent={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--ds-spacing-8)',
              }}
            >
              <Spinner data-size="lg" aria-label={t('platform.common.loading')} />
            </div>
          }
          emptyComponent={
            <EmptyState
              title={t('platform.errors.notFound')}
              description={t('storybook.demo.cardDescription')}
              action={{ label: t('platform.common.submit'), onClick: () => setState('idle') }}
            />
          }
          errorComponent={
            <Alert data-color="danger">
              <Paragraph>{t('platform.errors.serverError')}</Paragraph>
            </Alert>
          }
          successComponent={
            <Alert data-color="success">
              <Paragraph>{t('platform.common.success')}</Paragraph>
            </Alert>
          }
          permissionDeniedComponent={
            <AccessGate
              denied
              title={t('platform.errors.accessDenied')}
              description={t('platform.errors.noPermission')}
            >
              <div />
            </AccessGate>
          }
        >
          <SampleContent />
        </StateWrapper>
      </div>
    );
  },
};

// Using useComputedState Hook
export const WithComputedState: Story = {
  render: function Render() {
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const [data, setData] = React.useState<string[]>(['Item 1', 'Item 2']);
    const [hasPermission, setHasPermission] = React.useState(true);
    const t = useT();

    const state = useComputedState({
      isLoading,
      error,
      isEmpty: data.length === 0,
      hasPermission,
    });

    return (
      <div style={{ width: '500px' }}>
        <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)', marginBottom: 'var(--ds-spacing-4)' }}>
          <Heading level={4} data-size="xs">
            Control Panel
          </Heading>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ds-spacing-2)',
              marginTop: 'var(--ds-spacing-2)',
            }}
          >
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <input
                type="checkbox"
                checked={isLoading}
                onChange={(e) => setIsLoading(e.target.checked)}
              />
              isLoading
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <input
                type="checkbox"
                checked={!!error}
                onChange={(e) => setError(e.target.checked ? 'Something went wrong' : null)}
              />
              hasError
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <input
                type="checkbox"
                checked={data.length === 0}
                onChange={(e) => setData(e.target.checked ? [] : ['Item 1', 'Item 2'])}
              />
              isEmpty
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <input
                type="checkbox"
                checked={!hasPermission}
                onChange={(e) => setHasPermission(!e.target.checked)}
              />
              deniedPermission
            </label>
            <Paragraph data-size="sm" style={{ marginTop: 'var(--ds-spacing-2)' }}>
              <strong>Computed state:</strong> {state}
            </Paragraph>
          </div>
        </Card>

        <StateWrapper
          state={state}
          loadingComponent={
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--ds-spacing-8)',
              }}
            >
              <Spinner data-size="lg" aria-label={t('platform.common.loading')} />
            </div>
          }
          emptyComponent={
            <EmptyState
              title={t('platform.errors.notFound')}
              description={t('storybook.demo.cardDescription')}
            />
          }
          errorComponent={
            <Alert data-color="danger">
              <Paragraph>{error}</Paragraph>
            </Alert>
          }
          permissionDeniedComponent={
            <AccessGate
              denied
              title={t('platform.errors.accessDenied')}
              description={t('platform.errors.noPermission')}
            >
              <div />
            </AccessGate>
          }
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Heading level={3} data-size="sm">
              Data List
            </Heading>
            <ul style={{ margin: 'var(--ds-spacing-2) 0', paddingLeft: 'var(--ds-spacing-4)' }}>
              {data.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </Card>
        </StateWrapper>
      </div>
    );
  },
};

// All States Showcase
export const AllStates: Story = {
  render: function Render() {
    const t = useT();
    const states: ComponentState[] = [
      'idle',
      'loading',
      'empty',
      'error',
      'success',
      'permissionDenied',
    ];

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--ds-spacing-6)',
          width: '900px',
        }}
      >
        {states.map((state) => (
          <div key={state}>
            <Paragraph
              data-size="sm"
              style={{ marginBottom: 'var(--ds-spacing-2)', fontWeight: 'bold' }}
            >
              {state}
            </Paragraph>
            <Card
              data-color="neutral"
              style={{
                padding: 'var(--ds-spacing-2)',
                minHeight: '200px',
              }}
            >
              <StateWrapper
                state={state}
                loadingComponent={
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '150px',
                    }}
                  >
                    <Spinner data-size="md" aria-label={t('platform.common.loading')} />
                  </div>
                }
                emptyComponent={
                  <EmptyState
                    size="sm"
                    title={t('platform.errors.notFound')}
                    description={t('storybook.demo.cardDescription')}
                  />
                }
                errorComponent={
                  <Alert data-color="danger">
                    <Paragraph data-size="sm">{t('platform.errors.serverError')}</Paragraph>
                  </Alert>
                }
                successComponent={
                  <Alert data-color="success">
                    <Paragraph data-size="sm">{t('platform.common.success')}</Paragraph>
                  </Alert>
                }
                permissionDeniedComponent={
                  <AccessGate
                    denied
                    size="sm"
                    title={t('platform.errors.accessDenied')}
                    description={t('platform.errors.noPermission')}
                  >
                    <div />
                  </AccessGate>
                }
              >
                <div style={{ padding: 'var(--ds-spacing-4)' }}>
                  <Heading level={4} data-size="xs">
                    Content
                  </Heading>
                  <Paragraph data-size="sm">Normal content here.</Paragraph>
                </div>
              </StateWrapper>
            </Card>
          </div>
        ))}
      </div>
    );
  },
};

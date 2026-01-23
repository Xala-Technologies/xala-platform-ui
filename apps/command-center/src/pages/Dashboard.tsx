import {
  Card,
  Heading,
  Paragraph,
  Button,
} from '@digdir/designsystemet-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Active Workflows', value: '3' },
  { label: 'Pending Approvals', value: '5' },
  { label: 'Components in Spec', value: '12' },
  { label: 'Approved', value: '24' },
];

const quickActions = [
  {
    title: 'New Component Spec',
    description: 'Start designing a new component specification',
    action: '/specs/new',
    icon: '📝',
  },
  {
    title: 'Run Verification',
    description: 'Verify boundaries and design tokens',
    action: 'verify',
    icon: '🔍',
  },
  {
    title: 'Check Approvals',
    description: 'Review pending approval requests',
    action: '/approvals',
    icon: '✅',
  },
  {
    title: 'Export Prompts',
    description: 'Generate implementation prompts',
    action: 'export',
    icon: '📤',
  },
];

export function Dashboard() {
  const navigate = useNavigate();

  const handleAction = (action: string) => {
    if (action.startsWith('/')) {
      navigate(action);
    } else {
      console.log('Executing command:', action);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <Heading level={2} data-size="lg">
        Dashboard
      </Heading>

      {/* Stats Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        {stats.map((stat) => (
          <Card key={stat.label}>
            <div style={{ padding: 'var(--ds-spacing-4)', textAlign: 'center' }}>
              <Heading level={3} data-size="xl">
                {stat.value}
              </Heading>
              <Paragraph data-size="sm">
                {stat.label}
              </Paragraph>
            </div>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Quick Actions
        </Heading>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--ds-spacing-4)',
          }}
        >
          {quickActions.map((action) => (
            <Card key={action.title}>
              <div style={{ padding: 'var(--ds-spacing-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-3)' }}>
                  <span style={{ fontSize: '1.5rem' }}>{action.icon}</span>
                  <Heading level={4} data-size="sm">
                    {action.title}
                  </Heading>
                </div>
                <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                  {action.description}
                </Paragraph>
                <Button
                  variant="secondary"
                  data-size="sm"
                  onClick={() => handleAction(action.action)}
                >
                  Open
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Recent Activity
        </Heading>
        <Card>
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            {[
              { time: '2 hours ago', event: 'ResourceCard spec approved' },
              { time: '4 hours ago', event: 'NotificationBell moved to review' },
              { time: '1 day ago', event: 'DataTable spec created' },
              { time: '2 days ago', event: 'Boundary violation fixed in Modal' },
            ].map((activity, i, arr) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--ds-spacing-3) 0',
                  borderBottom: i < arr.length - 1 ? '1px solid var(--ds-color-neutral-border-default)' : 'none',
                }}
              >
                <Paragraph data-size="sm">{activity.event}</Paragraph>
                <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {activity.time}
                </Paragraph>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

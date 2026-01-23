import {
  Box,
  Card,
  Heading,
  Paragraph,
  Button,
} from '@digdir/designsystemet-react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Active Workflows', value: '3', color: 'accent' },
  { label: 'Pending Approvals', value: '5', color: 'warning' },
  { label: 'Components in Spec', value: '12', color: 'info' },
  { label: 'Approved', value: '24', color: 'success' },
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
      // Handle command actions
      console.log('Executing command:', action);
      // In a real app, this would execute the CLI command
    }
  };

  return (
    <Box>
      <Heading level={2} data-size="large" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Dashboard
      </Heading>

      {/* Stats Grid */}
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 'var(--ds-spacing-4)',
          marginBottom: 'var(--ds-spacing-8)',
        }}
      >
        {stats.map((stat) => (
          <Card key={stat.label} data-color="neutral">
            <Box style={{ padding: 'var(--ds-spacing-4)', textAlign: 'center' }}>
              <Heading level={3} data-size="xlarge">
                {stat.value}
              </Heading>
              <Paragraph data-size="small" data-color="subtle">
                {stat.label}
              </Paragraph>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Quick Actions */}
      <Heading level={3} data-size="medium" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
        Quick Actions
      </Heading>

      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        {quickActions.map((action) => (
          <Card key={action.title} data-color="neutral">
            <Box style={{ padding: 'var(--ds-spacing-4)' }}>
              <Box style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-3)' }}>
                <Box as="span" style={{ fontSize: '1.5rem' }}>{action.icon}</Box>
                <Heading level={4} data-size="small">
                  {action.title}
                </Heading>
              </Box>
              <Paragraph data-size="small" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                {action.description}
              </Paragraph>
              <Button
                variant="secondary"
                data-size="small"
                onClick={() => handleAction(action.action)}
              >
                Open
              </Button>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Recent Activity */}
      <Heading level={3} data-size="medium" style={{ marginTop: 'var(--ds-spacing-8)', marginBottom: 'var(--ds-spacing-4)' }}>
        Recent Activity
      </Heading>

      <Card data-color="neutral">
        <Box style={{ padding: 'var(--ds-spacing-4)' }}>
          <Box as="ul" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              { time: '2 hours ago', event: 'ResourceCard spec approved', type: 'approval' },
              { time: '4 hours ago', event: 'NotificationBell moved to review', type: 'status' },
              { time: '1 day ago', event: 'DataTable spec created', type: 'create' },
              { time: '2 days ago', event: 'Boundary violation fixed in Modal', type: 'fix' },
            ].map((activity, i) => (
              <Box
                as="li"
                key={i}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 'var(--ds-spacing-3) 0',
                  borderBottom: i < 3 ? '1px solid var(--ds-color-border-default)' : 'none',
                }}
              >
                <Paragraph data-size="small">{activity.event}</Paragraph>
                <Paragraph data-size="xsmall" data-color="subtle">
                  {activity.time}
                </Paragraph>
              </Box>
            ))}
          </Box>
        </Box>
      </Card>
    </Box>
  );
}

/**
 * Dashboard Page
 *
 * Uses platform-ui composed components for proper page structure.
 * Data is extracted to src/data/dashboard.ts (SRP).
 */

import {
  DashboardPageHeader,
  StatCard,
  StatCardGrid,
  QuickActionCard,
  SectionCard,
  SectionCardHeader,
  SectionCardContent,
  Timeline,
  PageContainer,
} from '@xala-technologies/platform-ui';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD_STATS, QUICK_ACTIONS, RECENT_ACTIVITY } from '../data';

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
    <PageContainer>
      <DashboardPageHeader
        title="Dashboard"
        subtitle="Design governance overview and metrics"
      />

      <StatCardGrid columns={4}>
        {DASHBOARD_STATS.map((stat) => (
          <StatCard key={stat.label} label={stat.label} value={stat.value} />
        ))}
      </StatCardGrid>

      <SectionCard>
        <SectionCardHeader
          title="Quick Actions"
          description="Common tasks and workflows"
        />
        <SectionCardContent>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(var(--ds-sizing-70), 1fr))',
              gap: 'var(--ds-spacing-4)',
            }}
          >
            {QUICK_ACTIONS.map((action) => (
              <QuickActionCard
                key={action.title}
                title={action.title}
                description={action.description}
                icon={<action.icon size={24} />}
                onClick={() => handleAction(action.action)}
              />
            ))}
          </div>
        </SectionCardContent>
      </SectionCard>

      <SectionCard>
        <SectionCardHeader
          title="Recent Activity"
          description="Latest updates and changes"
        />
        <SectionCardContent>
          <Timeline items={RECENT_ACTIVITY} />
        </SectionCardContent>
      </SectionCard>
    </PageContainer>
  );
}

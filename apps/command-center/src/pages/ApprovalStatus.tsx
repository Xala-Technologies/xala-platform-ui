/**
 * Approval Status Page
 *
 * Uses platform-ui composed components for proper page structure.
 * Data is extracted to src/data/approvals.ts (SRP).
 */

import {
  DashboardPageHeader,
  StatCard,
  StatCardGrid,
  SectionCard,
  SectionCardContent,
  Paragraph,
  Button,
  Table,
  StatusTag,
  PageContainer,
} from '@xala-technologies/platform-ui';
import {
  MOCK_APPROVALS,
  STATUS_BADGE_COLORS,
  getApprovalCountByStatus,
} from '../data';

export function ApprovalStatus() {
  return (
    <PageContainer>
      <DashboardPageHeader
        title="Approval Status"
        subtitle="Track design specification approval workflows"
        primaryAction={
          <Button variant="secondary" data-size="sm">
            Refresh Status
          </Button>
        }
      />

      <StatCardGrid columns={4}>
        <StatCard label="Draft" value={getApprovalCountByStatus('draft')} />
        <StatCard label="In Review" value={getApprovalCountByStatus('in_review')} />
        <StatCard label="Approved" value={getApprovalCountByStatus('approved')} />
        <StatCard label="Implemented" value={getApprovalCountByStatus('implemented')} />
      </StatCardGrid>

      <SectionCard>
        <SectionCardContent>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Component</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Phase</Table.HeaderCell>
                <Table.HeaderCell>Owner</Table.HeaderCell>
                <Table.HeaderCell>Last Update</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {MOCK_APPROVALS.map((approval) => (
                <Table.Row key={approval.component}>
                  <Table.Cell>
                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                      {approval.component}
                    </Paragraph>
                  </Table.Cell>
                  <Table.Cell>
                    <StatusTag
                      color={STATUS_BADGE_COLORS[approval.status] || 'neutral'}
                      size="sm"
                    >
                      {approval.status.replace('_', ' ')}
                    </StatusTag>
                  </Table.Cell>
                  <Table.Cell>
                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                      {approval.phase.replace('_', ' ')}
                    </Paragraph>
                  </Table.Cell>
                  <Table.Cell>
                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                      {approval.owner}
                    </Paragraph>
                  </Table.Cell>
                  <Table.Cell>
                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                      {approval.lastUpdate}
                    </Paragraph>
                  </Table.Cell>
                  <Table.Cell>
                    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                      <Button variant="tertiary" data-size="sm">
                        View
                      </Button>
                      {approval.status === 'in_review' && (
                        <Button variant="primary" data-size="sm">
                          Approve
                        </Button>
                      )}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </SectionCardContent>
      </SectionCard>
    </PageContainer>
  );
}

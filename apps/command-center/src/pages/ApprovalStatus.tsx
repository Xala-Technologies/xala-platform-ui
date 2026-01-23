import {
  Card,
  Heading,
  Paragraph,
  Button,
  Table,
} from '@digdir/designsystemet-react';

const mockApprovals = [
  { component: 'ResourceCard', status: 'approved', phase: 'implementation', owner: 'design-team', lastUpdate: '2 hours ago', blockers: 0 },
  { component: 'NotificationBell', status: 'in_review', phase: 'design_review', owner: 'platform-ui-maintainers', lastUpdate: '4 hours ago', blockers: 0 },
  { component: 'DataTable', status: 'draft', phase: 'specification', owner: 'design-team', lastUpdate: '1 day ago', blockers: 1 },
  { component: 'SlotCalendar', status: 'in_review', phase: 'qa_review', owner: 'qa-team', lastUpdate: '3 days ago', blockers: 0 },
  { component: 'UserMenu', status: 'implemented', phase: 'final_approval', owner: 'platform-seniors', lastUpdate: '1 week ago', blockers: 0 },
];

const statusStyles: Record<string, { bg: string; color: string }> = {
  approved: { bg: 'var(--ds-color-success-surface-default)', color: 'var(--ds-color-success-text-default)' },
  implemented: { bg: 'var(--ds-color-success-surface-default)', color: 'var(--ds-color-success-text-default)' },
  in_review: { bg: 'var(--ds-color-info-surface-default)', color: 'var(--ds-color-info-text-default)' },
  draft: { bg: 'var(--ds-color-warning-surface-default)', color: 'var(--ds-color-warning-text-default)' },
};

function StatusBadge({ status }: { status: string }) {
  const style = statusStyles[status] || statusStyles.draft;
  return (
    <span
      style={{
        padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
        backgroundColor: style.bg,
        color: style.color,
        borderRadius: 'var(--ds-border-radius-sm)',
        fontSize: '0.75rem',
        fontWeight: '500',
      }}
    >
      {status.replace('_', ' ')}
    </span>
  );
}

export function ApprovalStatus() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Heading level={2} data-size="lg">Approval Status</Heading>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            Track design specification approval workflows
          </Paragraph>
        </div>
        <Button variant="secondary" data-size="sm">Refresh Status</Button>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 'var(--ds-spacing-4)' }}>
        {[
          { label: 'Draft', count: mockApprovals.filter(a => a.status === 'draft').length },
          { label: 'In Review', count: mockApprovals.filter(a => a.status === 'in_review').length },
          { label: 'Approved', count: mockApprovals.filter(a => a.status === 'approved').length },
          { label: 'Implemented', count: mockApprovals.filter(a => a.status === 'implemented').length },
        ].map((stat) => (
          <Card key={stat.label}>
            <div style={{ padding: 'var(--ds-spacing-3)', textAlign: 'center' }}>
              <Heading level={3} data-size="lg">{stat.count}</Heading>
              <Paragraph data-size="sm">{stat.label}</Paragraph>
            </div>
          </Card>
        ))}
      </div>

      {/* Approval Table */}
      <Card>
        <div style={{ padding: 'var(--ds-spacing-4)', overflow: 'auto' }}>
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
              {mockApprovals.map((approval) => (
                <Table.Row key={approval.component}>
                  <Table.Cell><Paragraph data-size="sm">{approval.component}</Paragraph></Table.Cell>
                  <Table.Cell><StatusBadge status={approval.status} /></Table.Cell>
                  <Table.Cell><Paragraph data-size="sm">{approval.phase.replace('_', ' ')}</Paragraph></Table.Cell>
                  <Table.Cell><Paragraph data-size="sm">{approval.owner}</Paragraph></Table.Cell>
                  <Table.Cell><Paragraph data-size="sm">{approval.lastUpdate}</Paragraph></Table.Cell>
                  <Table.Cell>
                    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                      <Button variant="tertiary" data-size="sm">View</Button>
                      {approval.status === 'in_review' && <Button variant="primary" data-size="sm">Approve</Button>}
                    </div>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Card>
    </div>
  );
}

import {
  Box,
  Card,
  Heading,
  Paragraph,
  Button,
  Chip,
  Table,
} from '@digdir/designsystemet-react';

const mockApprovals = [
  {
    component: 'ResourceCard',
    status: 'approved',
    phase: 'implementation',
    owner: 'design-team',
    lastUpdate: '2 hours ago',
    blockers: 0,
  },
  {
    component: 'NotificationBell',
    status: 'in_review',
    phase: 'design_review',
    owner: 'platform-ui-maintainers',
    lastUpdate: '4 hours ago',
    blockers: 0,
  },
  {
    component: 'DataTable',
    status: 'draft',
    phase: 'specification',
    owner: 'design-team',
    lastUpdate: '1 day ago',
    blockers: 1,
  },
  {
    component: 'SlotCalendar',
    status: 'in_review',
    phase: 'qa_review',
    owner: 'qa-team',
    lastUpdate: '3 days ago',
    blockers: 0,
  },
  {
    component: 'UserMenu',
    status: 'implemented',
    phase: 'final_approval',
    owner: 'platform-seniors',
    lastUpdate: '1 week ago',
    blockers: 0,
  },
];

const statusColors: Record<string, 'success' | 'warning' | 'info' | 'neutral'> = {
  approved: 'success',
  implemented: 'success',
  in_review: 'info',
  draft: 'warning',
  rejected: 'neutral',
};

const statusIcons: Record<string, string> = {
  approved: '✅',
  implemented: '🟢',
  in_review: '🔵',
  draft: '🟡',
  rejected: '🔴',
};

export function ApprovalStatus() {
  return (
    <Box>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ds-spacing-6)' }}>
        <Box>
          <Heading level={2} data-size="large">
            Approval Status
          </Heading>
          <Paragraph data-size="small" data-color="subtle">
            Track design specification approval workflows
          </Paragraph>
        </Box>
        <Button variant="secondary" data-size="small">
          Refresh Status
        </Button>
      </Box>

      {/* Summary Cards */}
      <Box
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
          gap: 'var(--ds-spacing-4)',
          marginBottom: 'var(--ds-spacing-6)',
        }}
      >
        {[
          { label: 'Draft', count: mockApprovals.filter(a => a.status === 'draft').length, color: 'warning' },
          { label: 'In Review', count: mockApprovals.filter(a => a.status === 'in_review').length, color: 'info' },
          { label: 'Approved', count: mockApprovals.filter(a => a.status === 'approved').length, color: 'success' },
          { label: 'Implemented', count: mockApprovals.filter(a => a.status === 'implemented').length, color: 'success' },
        ].map((stat) => (
          <Card key={stat.label} data-color="neutral">
            <Box style={{ padding: 'var(--ds-spacing-3)', textAlign: 'center' }}>
              <Heading level={3} data-size="large">
                {stat.count}
              </Heading>
              <Paragraph data-size="small" data-color="subtle">
                {stat.label}
              </Paragraph>
            </Box>
          </Card>
        ))}
      </Box>

      {/* Approval Table */}
      <Card data-color="neutral">
        <Box style={{ padding: 'var(--ds-spacing-4)' }}>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>Component</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Phase</Table.HeaderCell>
                <Table.HeaderCell>Owner</Table.HeaderCell>
                <Table.HeaderCell>Last Update</Table.HeaderCell>
                <Table.HeaderCell>Blockers</Table.HeaderCell>
                <Table.HeaderCell>Actions</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {mockApprovals.map((approval) => (
                <Table.Row key={approval.component}>
                  <Table.Cell>
                    <Paragraph data-size="small">
                      {approval.component}
                    </Paragraph>
                  </Table.Cell>
                  <Table.Cell>
                    <Chip data-size="small" data-color={statusColors[approval.status]}>
                      {statusIcons[approval.status]} {approval.status.replace('_', ' ')}
                    </Chip>
                  </Table.Cell>
                  <Table.Cell>
                    <Paragraph data-size="small" data-color="subtle">
                      {approval.phase.replace('_', ' ')}
                    </Paragraph>
                  </Table.Cell>
                  <Table.Cell>
                    <Paragraph data-size="small">
                      {approval.owner}
                    </Paragraph>
                  </Table.Cell>
                  <Table.Cell>
                    <Paragraph data-size="small" data-color="subtle">
                      {approval.lastUpdate}
                    </Paragraph>
                  </Table.Cell>
                  <Table.Cell>
                    {approval.blockers > 0 ? (
                      <Chip data-size="small" data-color="danger">
                        {approval.blockers} blocker(s)
                      </Chip>
                    ) : (
                      <Paragraph data-size="small" data-color="subtle">
                        None
                      </Paragraph>
                    )}
                  </Table.Cell>
                  <Table.Cell>
                    <Box style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                      <Button variant="tertiary" data-size="small">
                        View
                      </Button>
                      {approval.status === 'in_review' && (
                        <Button variant="primary" data-size="small">
                          Approve
                        </Button>
                      )}
                    </Box>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Box>
      </Card>

      {/* Workflow Phases */}
      <Box style={{ marginTop: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="medium" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Approval Workflow Phases
        </Heading>
        <Box
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--ds-spacing-4)',
          }}
        >
          {[
            { name: 'Specification', description: 'Create SPEC.md, COMPOSE.json, TESTIDS.json', approvers: 'Design' },
            { name: 'Design Review', description: 'Visual and accessibility review', approvers: 'Design, A11y' },
            { name: 'Implementation', description: 'Build the component', approvers: 'Technical' },
            { name: 'QA Review', description: 'Testing and accessibility audit', approvers: 'QA, A11y' },
            { name: 'Final Approval', description: 'Sign-off for release', approvers: 'Design, Tech, A11y' },
          ].map((phase, index) => (
            <Card key={phase.name} data-color="neutral">
              <Box style={{ padding: 'var(--ds-spacing-3)' }}>
                <Box style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-2)' }}>
                  <Box
                    style={{
                      width: '24px',
                      height: '24px',
                      borderRadius: '50%',
                      backgroundColor: 'var(--ds-color-accent-base-default)',
                      color: 'var(--ds-color-accent-contrast-default)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Heading level={4} data-size="xsmall">
                    {phase.name}
                  </Heading>
                </Box>
                <Paragraph data-size="xsmall" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                  {phase.description}
                </Paragraph>
                <Paragraph data-size="xsmall" data-color="subtle">
                  Approvers: {phase.approvers}
                </Paragraph>
              </Box>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

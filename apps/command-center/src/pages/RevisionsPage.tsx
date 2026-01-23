/**
 * Revisions Page
 * 
 * Displays all workflow session revisions with filtering, comparison, and diff viewing.
 * Uses platform-ui components only - no raw HTML or custom styling.
 */

import { useState } from 'react';
import {
    PageContainer,
    DashboardPageHeader,
    SectionCard,
    SectionCardHeader,
    SectionCardContent,
    DataTable,
    Drawer,
    Button,
    Stack,
    Heading,
    Paragraph,
    Badge,
    Select,
    Field,
    Label,
} from '@xala-technologies/platform-ui';
import { revisionManager } from '../services/revision-manager';
import { ArtifactDiffViewer } from '../components/artifacts/ArtifactDiffViewer';
import { TESTIDS } from '../constants/testids';
import type { Revision } from '../registry/types';

export function RevisionsPage() {
    const [selectedRevision, setSelectedRevision] = useState<Revision | null>(null);
    const [compareRevisionId, setCompareRevisionId] = useState<string | null>(null);
    const [filterWorkflow, setFilterWorkflow] = useState<string>('all');
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const allRevisions = revisionManager.getAllRevisions();
    const workflows = Array.from(new Set(allRevisions.map(r => r.workflowId)));

    // Filter revisions
    const filteredRevisions = allRevisions.filter(rev => {
        if (filterWorkflow !== 'all' && rev.workflowId !== filterWorkflow) return false;
        if (filterStatus !== 'all' && rev.status !== filterStatus) return false;
        return true;
    });

    // Table columns
    const columns = [
        {
            key: 'workflowId',
            header: 'Workflow',
            render: (revision: Revision) => (
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {revision.workflowId}
                </Paragraph>
            ),
        },
        {
            key: 'createdAt',
            header: 'Created',
            render: (revision: Revision) => (
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {new Date(revision.createdAt).toLocaleDateString()}
                </Paragraph>
            ),
        },
        {
            key: 'author',
            header: 'Author',
            render: (revision: Revision) => (
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {revision.author.name}
                </Paragraph>
            ),
        },
        {
            key: 'status',
            header: 'Status',
            render: (revision: Revision) => (
                <Badge
                    color={
                        revision.status === 'approved'
                            ? 'success'
                            : revision.status === 'rejected'
                              ? 'danger'
                              : revision.status === 'pending_approval'
                                ? 'warning'
                                : 'neutral'
                    }
                    size="sm"
                >
                    {revision.status.replace('_', ' ')}
                </Badge>
            ),
        },
        {
            key: 'artifacts',
            header: 'Artifacts',
            render: (revision: Revision) => (
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {revision.outputs.length} file{revision.outputs.length !== 1 ? 's' : ''}
                </Paragraph>
            ),
        },
        {
            key: 'actions',
            header: 'Actions',
            render: (revision: Revision) => (
                <Stack direction="horizontal" spacing="var(--ds-spacing-2)">
                    <Button
                        variant="secondary"
                        data-size="sm"
                        onClick={() => setSelectedRevision(revision)}
                        data-testid={`${TESTIDS.revisions.row}-${revision.id}`}
                    >
                        View
                    </Button>
                    {allRevisions.length > 1 && (
                        <Button
                            variant="secondary"
                            data-size="sm"
                            onClick={() => {
                                setSelectedRevision(revision);
                                setCompareRevisionId(
                                    compareRevisionId === revision.id ? null : revision.id
                                );
                            }}
                            data-testid={`${TESTIDS.revisions.compareBtn}-${revision.id}`}
                        >
                            Compare
                        </Button>
                    )}
                </Stack>
            ),
        },
    ];

    // Get comparison data
    const comparisonData =
        selectedRevision && compareRevisionId && compareRevisionId !== selectedRevision.id
            ? revisionManager.compareRevisions(compareRevisionId, selectedRevision.id)
            : null;

    return (
        <PageContainer data-testid={TESTIDS.revisions.root}>
            <DashboardPageHeader
                title="Revisions"
                subtitle="View and compare workflow session revisions"
            />

            {/* Filters */}
            <SectionCard>
                <SectionCardHeader title="Filters" />
                <SectionCardContent>
                    <Stack direction="horizontal" spacing="var(--ds-spacing-4)">
                        <Field>
                            <Label>Workflow</Label>
                            <Select
                                value={filterWorkflow}
                                onChange={(e) => setFilterWorkflow(e.target.value)}
                                data-testid={`${TESTIDS.revisions.filter}-workflow`}
                            >
                                <Select.Option value="all">All Workflows</Select.Option>
                                {workflows.map((wf) => (
                                    <Select.Option key={wf} value={wf}>
                                        {wf}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Field>
                        <Field>
                            <Label>Status</Label>
                            <Select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                data-testid={`${TESTIDS.revisions.filter}-status`}
                            >
                                <Select.Option value="all">All Statuses</Select.Option>
                                <Select.Option value="draft">Draft</Select.Option>
                                <Select.Option value="pending_approval">Pending Approval</Select.Option>
                                <Select.Option value="approved">Approved</Select.Option>
                                <Select.Option value="rejected">Rejected</Select.Option>
                            </Select>
                        </Field>
                    </Stack>
                </SectionCardContent>
            </SectionCard>

            {/* Revisions Table */}
            <SectionCard>
                <SectionCardHeader
                    title={`Revisions (${filteredRevisions.length})`}
                    description="Click 'View' to see details or 'Compare' to compare revisions"
                />
                <SectionCardContent>
                    {filteredRevisions.length === 0 ? (
                        <Stack align="center" spacing="var(--ds-spacing-4)">
                            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                                No revisions found matching the filters.
                            </Paragraph>
                        </Stack>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={filteredRevisions}
                            data-testid={TESTIDS.revisions.table}
                        />
                    )}
                </SectionCardContent>
            </SectionCard>

            {/* Revision Detail Drawer */}
            {selectedRevision && (
                <Drawer
                    open={!!selectedRevision}
                    onClose={() => {
                        setSelectedRevision(null);
                        setCompareRevisionId(null);
                    }}
                    title={`Revision: ${selectedRevision.id.slice(0, 8)}`}
                    size="large"
                >
                    <Stack spacing="var(--ds-spacing-6)">
                        {/* Revision Info */}
                        <SectionCard>
                            <SectionCardHeader title="Revision Details" />
                            <SectionCardContent>
                                <Stack spacing="var(--ds-spacing-3)">
                                    <Stack direction="horizontal" spacing="var(--ds-spacing-4)">
                                        <div>
                                            <Paragraph
                                                data-size="xs"
                                                style={{
                                                    color: 'var(--ds-color-neutral-text-subtle)',
                                                    margin: 0,
                                                }}
                                            >
                                                Workflow
                                            </Paragraph>
                                            <Paragraph data-size="sm" style={{ margin: 0 }}>
                                                {selectedRevision.workflowId}
                                            </Paragraph>
                                        </div>
                                        <div>
                                            <Paragraph
                                                data-size="xs"
                                                style={{
                                                    color: 'var(--ds-color-neutral-text-subtle)',
                                                    margin: 0,
                                                }}
                                            >
                                                Status
                                            </Paragraph>
                                            <Badge
                                                color={
                                                    selectedRevision.status === 'approved'
                                                        ? 'success'
                                                        : selectedRevision.status === 'rejected'
                                                          ? 'danger'
                                                          : selectedRevision.status === 'pending_approval'
                                                            ? 'warning'
                                                            : 'neutral'
                                                }
                                                size="sm"
                                            >
                                                {selectedRevision.status.replace('_', ' ')}
                                            </Badge>
                                        </div>
                                        <div>
                                            <Paragraph
                                                data-size="xs"
                                                style={{
                                                    color: 'var(--ds-color-neutral-text-subtle)',
                                                    margin: 0,
                                                }}
                                            >
                                                Created
                                            </Paragraph>
                                            <Paragraph data-size="sm" style={{ margin: 0 }}>
                                                {new Date(selectedRevision.createdAt).toLocaleString()}
                                            </Paragraph>
                                        </div>
                                    </Stack>
                                </Stack>
                            </SectionCardContent>
                        </SectionCard>

                        {/* Artifacts */}
                        <SectionCard>
                            <SectionCardHeader title="Artifacts" />
                            <SectionCardContent>
                                <Stack spacing="var(--ds-spacing-4)">
                                    {selectedRevision.outputs.map((artifact) => {
                                        const previousArtifact =
                                            comparisonData &&
                                            comparisonData.modified.find(
                                                (m) => m.artifact.id === artifact.id
                                            )?.oldArtifact;

                                        return (
                                            <ArtifactDiffViewer
                                                key={artifact.id}
                                                artifact={artifact}
                                                previousArtifact={previousArtifact}
                                                changes={
                                                    comparisonData
                                                        ? [
                                                              ...comparisonData.added.filter(
                                                                  (a) => a.id === artifact.id
                                                              ).map((a) => ({
                                                                  type: 'added' as const,
                                                                  path: a.path,
                                                                  newValue: a.content,
                                                              })),
                                                              ...comparisonData.modified
                                                                  .filter((m) => m.artifact.id === artifact.id)
                                                                  .map((m) => ({
                                                                      type: 'modified' as const,
                                                                      path: m.artifact.path,
                                                                      oldValue: m.oldArtifact.content,
                                                                      newValue: m.artifact.content,
                                                                  })),
                                                          ]
                                                        : undefined
                                                }
                                                data-testid={`${TESTIDS.revisions.diffView}-${artifact.id}`}
                                            />
                                        );
                                    })}
                                </Stack>
                            </SectionCardContent>
                        </SectionCard>
                    </Stack>
                </Drawer>
            )}
        </PageContainer>
    );
}

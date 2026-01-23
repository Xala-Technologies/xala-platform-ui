/**
 * Approval Status Page
 * 
 * Enhanced approval status page with real approval management, gates, checklist, and promotion.
 * Uses platform-ui components only - no raw HTML or custom styling.
 */

import { useState } from 'react';
import {
    DashboardPageHeader,
    StatCard,
    StatCardGrid,
    SectionCard,
    SectionCardHeader,
    SectionCardContent,
    Paragraph,
    Button,
    DataTable,
    Tag,
    PageContainer,
    Drawer,
    Stack,
    Heading,
    Textarea,
    Field,
    Label,
    Alert,
} from '@xala-technologies/platform-ui';
import { approvalManager } from '../services/approval-manager';
import { revisionManager } from '../services/revision-manager';
import { promotionScaffolder } from '../services/promotion-scaffolder';
import { ApprovalFlow } from '../components/approval/ApprovalFlow';
import { TESTIDS } from '../constants/testids';
import type { Approval } from '../registry/types';

export function ApprovalStatus() {
    const [selectedApproval, setSelectedApproval] = useState<Approval | null>(null);
    const [showApprovalFlow, setShowApprovalFlow] = useState(false);
    const [showRejectDialog, setShowRejectDialog] = useState(false);
    const [rejectionReason, setRejectionReason] = useState('');
    const [promotingRevisionId, setPromotingRevisionId] = useState<string | null>(null);
    const [promotionResult, setPromotionResult] = useState<any>(null);

    const approvals = approvalManager.getAllApprovals();
    const revisions = revisionManager.getAllRevisions();

    // Get approval counts by status
    const draftCount = revisions.filter(r => r.status === 'draft').length;
    const pendingCount = approvals.filter(a => a.status === 'pending').length;
    const approvedCount = approvals.filter(a => a.status === 'approved').length;
    const rejectedCount = approvals.filter(a => a.status === 'rejected').length;

    // Table columns
    const columns = [
        {
            id: 'revisionId',
            key: 'revisionId',
            header: 'Revision',
            render: (approval: Approval) => (
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {approval.revisionId.slice(0, 8)}
                </Paragraph>
            ),
        },
        {
            id: 'workflow',
            key: 'workflow',
            header: 'Workflow',
            render: (approval: Approval) => {
                const revision = revisionManager.getRevision(approval.revisionId);
                return (
                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                        {revision?.workflowId || 'Unknown'}
                    </Paragraph>
                );
            },
        },
        {
            id: 'status',
            key: 'status',
            header: 'Status',
            render: (approval: Approval) => (
                <Tag
                    data-color={
                        approval.status === 'approved'
                            ? 'success'
                            : approval.status === 'rejected'
                              ? 'danger'
                              : 'warning'
                    }
                    data-size="sm"
                >
                    {approval.status}
                </Tag>
            ),
        },
        {
            id: 'gates',
            key: 'gates',
            header: 'Gates',
            render: (approval: Approval) => {
                const passedGates = approval.gates.filter(g => g.status === 'pass').length;
                const totalGates = approval.gates.length;
                return (
                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                        {passedGates}/{totalGates} passed
                    </Paragraph>
                );
            },
        },
        {
            id: 'checklist',
            key: 'checklist',
            header: 'Checklist',
            render: (approval: Approval) => {
                const checkedItems = approval.checklist.filter(i => i.checked).length;
                const requiredItems = approval.checklist.filter(i => i.required).length;
                return (
                    <Paragraph data-size="sm" style={{ margin: 0 }}>
                        {checkedItems}/{requiredItems} required
                    </Paragraph>
                );
            },
        },
        {
            id: 'requestedAt',
            key: 'requestedAt',
            header: 'Requested',
            render: (approval: Approval) => (
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {new Date(approval.requestedAt).toLocaleDateString()}
                </Paragraph>
            ),
        },
        {
            id: 'actions',
            key: 'actions',
            header: 'Actions',
            render: (approval: Approval) => {
                const revision = revisionManager.getRevision(approval.revisionId);
                const canPromote = approval.status === 'approved' && revision?.status === 'approved';

                return (
                    <Stack direction="horizontal" spacing="var(--ds-spacing-2)">
                        <Button
                            data-color="neutral"
                            data-size="sm"
                            onClick={() => {
                                setSelectedApproval(approval);
                                setShowApprovalFlow(true);
                            }}
                            data-testid={`${TESTIDS.approvals.viewBtn}-${approval.id}`}
                        >
                            View
                        </Button>
                        {approval.status === 'pending' && (
                            <>
                                <Button
                                    data-color="accent"
                                    data-size="sm"
                                    onClick={() => handleApprove(approval)}
                                    data-testid={`${TESTIDS.approvals.approveBtn}-${approval.id}`}
                                >
                                    Approve
                                </Button>
                                <Button
                                    data-color="neutral"
                                    data-size="sm"
                                    onClick={() => {
                                        setSelectedApproval(approval);
                                        setShowRejectDialog(true);
                                    }}
                                    data-testid={`${TESTIDS.approvals.rejectBtn}-${approval.id}`}
                                >
                                    Reject
                                </Button>
                            </>
                        )}
                        {canPromote && (
                            <Button
                                data-color="accent"
                                data-size="sm"
                                onClick={() => handlePromote(approval.revisionId)}
                                disabled={promotingRevisionId === approval.revisionId}
                                data-testid={`${TESTIDS.approvals.promoteBtn}-${approval.id}`}
                            >
                                {promotingRevisionId === approval.revisionId ? 'Promoting...' : 'Promote'}
                            </Button>
                        )}
                    </Stack>
                );
            },
        },
    ];

    const handleApprove = (approval: Approval) => {
        try {
            approvalManager.approve(approval.id, {
                name: 'Admin User', // In real app, get from auth context
                email: 'admin@xala.no',
            });
            setSelectedApproval(null);
            // Refresh the page data
            window.location.reload();
        } catch (error) {
            alert(`Cannot approve: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handleReject = () => {
        if (!selectedApproval || !rejectionReason.trim()) {
            return;
        }

        try {
            approvalManager.reject(selectedApproval.id, rejectionReason, {
                name: 'Admin User',
                email: 'admin@xala.no',
            });
            setShowRejectDialog(false);
            setSelectedApproval(null);
            setRejectionReason('');
            // Refresh the page data
            window.location.reload();
        } catch (error) {
            alert(`Cannot reject: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
    };

    const handlePromote = async (revisionId: string) => {
        setPromotingRevisionId(revisionId);
        try {
            const result = await promotionScaffolder.promoteRevision(revisionId);
            setPromotionResult(result);
            if (result.success) {
                alert('Revision promoted successfully!');
            } else {
                alert(`Promotion failed: ${result.errors?.join(', ')}`);
            }
        } catch (error) {
            alert(`Promotion error: ${error instanceof Error ? error.message : 'Unknown error'}`);
        } finally {
            setPromotingRevisionId(null);
        }
    };

    const handleChecklistChange = (approvalId: string, itemId: string, checked: boolean) => {
        approvalManager.updateChecklistItem(approvalId, itemId, checked, 'Admin User');
    };

    const selectedRevision = selectedApproval
        ? revisionManager.getRevision(selectedApproval.revisionId)
        : null;

    return (
        <PageContainer data-testid={TESTIDS.approvals.root}>
            <DashboardPageHeader
                title="Approval Status"
                subtitle="Track design specification approval workflows"
                primaryAction={
                    <Button
                        variant="secondary"
                        data-size="sm"
                        onClick={() => window.location.reload()}
                    >
                        Refresh Status
                    </Button>
                }
            />

            <StatCardGrid columns={4}>
                <StatCard label="Draft" value={draftCount} />
                <StatCard label="Pending Approval" value={pendingCount} />
                <StatCard label="Approved" value={approvedCount} />
                <StatCard label="Rejected" value={rejectedCount} />
            </StatCardGrid>

            <SectionCard>
                <SectionCardHeader
                    title="Approvals"
                    description="Manage approval requests for revisions"
                />
                <SectionCardContent>
                    {approvals.length === 0 ? (
                        <Stack align="center" spacing="var(--ds-spacing-4)">
                            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                                No approval requests found.
                            </Paragraph>
                            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                                Go to Revisions page to request approval for a revision.
                            </Paragraph>
                        </Stack>
                    ) : (
                        <DataTable
                            columns={columns}
                            data={approvals}
                            getRowKey={(approval) => approval.id}
                            data-testid={TESTIDS.approvals.table}
                        />
                    )}
                </SectionCardContent>
            </SectionCard>

            {/* Approval Flow Modal */}
            {selectedApproval && selectedRevision && (
                <ApprovalFlow
                    open={showApprovalFlow}
                    approval={selectedApproval}
                    revision={selectedRevision}
                    onApprove={() => handleApprove(selectedApproval)}
                    onReject={(reason) => {
                        approvalManager.reject(selectedApproval.id, reason, {
                            name: 'Admin User',
                            email: 'admin@xala.no',
                        });
                        setShowApprovalFlow(false);
                        setSelectedApproval(null);
                        window.location.reload();
                    }}
                    onClose={() => {
                        setShowApprovalFlow(false);
                        setSelectedApproval(null);
                    }}
                    onChecklistChange={(itemId, checked) =>
                        handleChecklistChange(selectedApproval.id, itemId, checked)
                    }
                />
            )}

            {/* Reject Dialog */}
            {showRejectDialog && selectedApproval && (
                <Drawer
                    isOpen={showRejectDialog}
                    onClose={() => {
                        setShowRejectDialog(false);
                        setSelectedApproval(null);
                        setRejectionReason('');
                    }}
                    title="Reject Approval"
                    size="md"
                >
                    <Stack spacing="var(--ds-spacing-4)">
                        <Paragraph data-size="sm">
                            Please provide a reason for rejecting this approval request.
                        </Paragraph>
                        <Field>
                            <Label>Rejection Reason</Label>
                            <Textarea
                                value={rejectionReason}
                                onChange={(e) => setRejectionReason(e.target.value)}
                                rows={4}
                                placeholder="Enter reason for rejection..."
                            />
                        </Field>
                        <Stack direction="horizontal" spacing="var(--ds-spacing-2)" justify="end">
                            <Button
                                data-color="neutral"
                                onClick={() => {
                                    setShowRejectDialog(false);
                                    setRejectionReason('');
                                }}
                            >
                                Cancel
                            </Button>
                            <Button
                                data-color="accent"
                                onClick={handleReject}
                                disabled={!rejectionReason.trim()}
                                data-testid={TESTIDS.approvals.rejectBtn}
                            >
                                Reject
                            </Button>
                        </Stack>
                    </Stack>
                </Drawer>
            )}

            {/* Promotion Result */}
            {promotionResult && (
                <Alert
                    data-color={promotionResult.success ? 'success' : 'danger'}
                    style={{ marginTop: 'var(--ds-spacing-4)' }}
                >
                    <Heading level={3} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                        {promotionResult.success ? 'Promotion Successful' : 'Promotion Failed'}
                    </Heading>
                    {promotionResult.success ? (
                        <Stack spacing="var(--ds-spacing-2)">
                            {promotionResult.componentPath && (
                                <Paragraph data-size="sm" style={{ margin: 0 }}>
                                    Component: {promotionResult.componentPath}
                                </Paragraph>
                            )}
                            {promotionResult.storybookPath && (
                                <Paragraph data-size="sm" style={{ margin: 0 }}>
                                    Storybook: {promotionResult.storybookPath}
                                </Paragraph>
                            )}
                            {promotionResult.docsPath && (
                                <Paragraph data-size="sm" style={{ margin: 0 }}>
                                    Documentation: {promotionResult.docsPath}
                                </Paragraph>
                            )}
                        </Stack>
                    ) : (
                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                            {promotionResult.errors?.join(', ')}
                        </Paragraph>
                    )}
                </Alert>
            )}
        </PageContainer>
    );
}

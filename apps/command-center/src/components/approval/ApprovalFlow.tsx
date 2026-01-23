/**
 * Approval Flow Component
 * 
 * Complete approval flow with gates, checklist, and review step.
 * Uses MultiStepFormModal pattern for the approval workflow.
 */

import { useState } from 'react';
import {
    ReviewStep,
    Stack,
    Heading,
    Paragraph,
} from '@xala-technologies/platform-ui';
import { MultiStepFormModal } from '@xala-technologies/platform-ui/patterns';
import { Approval, Revision } from '../../registry/types';
import { ApprovalGate } from './ApprovalGate';
import { ApprovalChecklist } from './ApprovalChecklist';
import { TESTIDS } from '../../constants/testids';
import type { ReviewSection } from '@xala-technologies/platform-ui/patterns';

export interface ApprovalFlowProps {
    open: boolean;
    approval: Approval;
    revision: Revision;
    onApprove: () => void;
    onReject: (reason: string) => void;
    onClose: () => void;
    onChecklistChange?: (itemId: string, checked: boolean) => void;
}

export function ApprovalFlow({
    open,
    approval,
    revision,
    onApprove,
    onReject: _onReject,
    onClose,
    onChecklistChange,
}: ApprovalFlowProps) {
    const [currentStep, setCurrentStep] = useState(0);

    // Check if can approve
    const allRequiredChecked = approval.checklist
        .filter(item => item.required)
        .every(item => item.checked);
    
    const allRequiredGatesPass = approval.gates
        .filter(gate => gate.required)
        .every(gate => gate.status === 'pass');

    const canApprove = allRequiredChecked && allRequiredGatesPass;

    // Build review sections from revision
    const reviewSections: ReviewSection[] = [
        {
            id: 'workflow',
            title: 'Workflow Information',
            items: [
                { label: 'Workflow ID', value: revision.workflowId },
                { label: 'Created', value: new Date(revision.createdAt).toLocaleString() },
                { label: 'Author', value: revision.author.name },
            ],
        },
        {
            id: 'artifacts',
            title: 'Generated Artifacts',
            items: revision.outputs.map(artifact => ({
                label: artifact.name || artifact.path.split('/').pop() || 'Untitled',
                value: artifact.type,
            })),
        },
        {
            id: 'validation',
            title: 'Validation Results',
            items: [
                {
                    label: 'Valid Artifacts',
                    value: `${revision.validationResults.filter(r => r.valid).length}/${revision.validationResults.length}`,
                },
                {
                    label: 'Total Errors',
                    value: revision.validationResults.reduce((sum, r) => sum + r.errors.length, 0).toString(),
                },
            ],
        },
    ];

    const steps = [
        {
            id: 'gates',
            title: 'Approval Gates',
            description: 'Check if all requirements are met',
            content: (
                <Stack spacing="var(--ds-spacing-4)">
                    <Heading level={3} data-size="md">Approval Gates</Heading>
                    <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                        All required gates must pass before approval.
                    </Paragraph>
                    <Stack spacing="var(--ds-spacing-3)">
                        {approval.gates.map(gate => (
                            <ApprovalGate key={gate.id} gate={gate} />
                        ))}
                    </Stack>
                </Stack>
            ),
        },
        {
            id: 'checklist',
            title: 'Checklist',
            description: 'Complete the approval checklist',
            content: (
                <ApprovalChecklist
                    items={approval.checklist}
                    onItemChange={onChecklistChange}
                    readOnly={false}
                />
            ),
        },
        {
            id: 'review',
            title: 'Review',
            description: 'Review revision details before approval',
            content: (
                <ReviewStep
                    title="Review Revision"
                    message="Please review all details before approving this revision."
                    sections={reviewSections}
                />
            ),
        },
    ];

    const handleSubmit = () => {
        if (canApprove) {
            onApprove();
        }
    };

    return (
        <MultiStepFormModal
            open={open}
            title="Approval Review"
            subtitle={`Revision: ${revision.id.slice(0, 8)}`}
            steps={steps}
            currentStep={currentStep}
            onStepChange={setCurrentStep}
            onSubmit={handleSubmit}
            onClose={onClose}
            labels={{
                back: 'Back',
                next: 'Next',
                submit: 'Approve',
                cancel: 'Cancel',
            }}
            canProceed={canApprove}
            size="lg"
            data-testid={TESTIDS.approvals.root}
        />
    );
}

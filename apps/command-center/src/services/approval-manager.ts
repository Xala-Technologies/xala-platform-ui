/**
 * Approval Manager Service
 * 
 * Manages approval workflows for revisions - creation, checklist management, and status updates.
 */

import { Approval, ApprovalChecklistItem, ApprovalGate, Revision } from '../registry/types';
import { revisionManager } from './revision-manager';
import { artifactValidator } from './artifact-validator';

export class ApprovalManager {
    private approvals: Map<string, Approval>;
    private storageKey = 'xala-command-center-approvals';

    constructor() {
        this.approvals = new Map();
        this.loadFromStorage();
    }

    /**
     * Create an approval request for a revision
     */
    async createApprovalRequest(
        revisionId: string,
        requestedBy: { name: string; email: string }
    ): Promise<Approval> {
        const revision = revisionManager.getRevision(revisionId);
        if (!revision) {
            throw new Error(`Revision ${revisionId} not found`);
        }

        // Run approval gates
        const gates = await this.runApprovalGates(revision);

        // Create checklist
        const checklist = this.createChecklist(revision, gates);

        const approval: Approval = {
            id: crypto.randomUUID(),
            revisionId,
            requestedAt: new Date().toISOString(),
            requestedBy,
            status: 'pending',
            checklist,
            gates,
        };

        this.approvals.set(approval.id, approval);
        
        // Update revision status
        revisionManager.updateRevisionStatus(revisionId, 'pending_approval', approval.id);

        this.saveToStorage();
        return approval;
    }

    /**
     * Run approval gates to check if revision meets requirements
     */
    private async runApprovalGates(revision: Revision): Promise<ApprovalGate[]> {
        const gates: ApprovalGate[] = [];

        // Gate 1: Schema validation passes
        const validationGate: ApprovalGate = {
            id: 'schema-validation',
            name: 'Schema Validation',
            description: 'All artifacts must pass schema validation',
            status: revision.validationResults.every(r => r.valid) ? 'pass' : 'fail',
            required: true,
            details: revision.validationResults.some(r => !r.valid)
                ? `${revision.validationResults.filter(r => !r.valid).length} artifact(s) failed validation`
                : 'All artifacts validated successfully',
        };
        gates.push(validationGate);

        // Gate 2: All required artifacts present
        const artifactsGate: ApprovalGate = {
            id: 'artifacts-present',
            name: 'Required Artifacts',
            description: 'All required artifacts must be generated',
            status: revision.outputs.length > 0 ? 'pass' : 'fail',
            required: true,
            details: revision.outputs.length > 0
                ? `${revision.outputs.length} artifact(s) generated`
                : 'No artifacts generated',
        };
        gates.push(artifactsGate);

        // Gate 3: No critical errors
        const errorsGate: ApprovalGate = {
            id: 'no-critical-errors',
            name: 'No Critical Errors',
            description: 'No critical validation errors',
            status: revision.validationResults.every(r => r.errors.length === 0) ? 'pass' : 'fail',
            required: true,
            details: revision.validationResults.some(r => r.errors.length > 0)
                ? `${revision.validationResults.reduce((sum, r) => sum + r.errors.length, 0)} error(s) found`
                : 'No errors found',
        };
        gates.push(errorsGate);

        // Gate 4: Component specification exists
        const specGate: ApprovalGate = {
            id: 'component-spec',
            name: 'Component Specification',
            description: 'Component specification must exist',
            status: revision.outputs.some(a => a.path.includes('SECTION_') || a.path.includes('COMPOSE_'))
                ? 'pass'
                : 'fail',
            required: true,
            details: revision.outputs.some(a => a.path.includes('SECTION_') || a.path.includes('COMPOSE_'))
                ? 'Component specification found'
                : 'Component specification missing',
        };
        gates.push(specGate);

        return gates;
    }

    /**
     * Create approval checklist
     */
    private createChecklist(revision: Revision, gates: ApprovalGate[]): ApprovalChecklistItem[] {
        const checklist: ApprovalChecklistItem[] = [
            {
                id: 'artifacts-validated',
                label: 'All artifacts validated successfully',
                checked: gates.find(g => g.id === 'schema-validation')?.status === 'pass',
                required: true,
            },
            {
                id: 'component-follows-design-system',
                label: 'Component follows design system guidelines',
                checked: true, // Would check against design system rules
                required: true,
            },
            {
                id: 'storybook-story-exists',
                label: 'Storybook story exists (or will be generated)',
                checked: true, // Would check if story exists or will be generated
                required: true,
            },
            {
                id: 'documentation-exists',
                label: 'Documentation exists',
                checked: revision.outputs.some(a => a.path.includes('.md')),
                required: true,
            },
            {
                id: 'testids-added',
                label: 'Test IDs added',
                checked: revision.outputs.some(a => a.path.includes('TESTIDS_')),
                required: true,
            },
            {
                id: 'accessibility-tested',
                label: 'Accessibility tested',
                checked: false, // Manual check
                required: true,
            },
            {
                id: 'code-reviewed',
                label: 'Code reviewed (if applicable)',
                checked: false, // Manual check
                required: false,
            },
        ];

        return checklist;
    }

    /**
     * Get approval by ID
     */
    getApproval(id: string): Approval | undefined {
        return this.approvals.get(id);
    }

    /**
     * Get approval by revision ID
     */
    getApprovalByRevision(revisionId: string): Approval | undefined {
        return Array.from(this.approvals.values()).find(a => a.revisionId === revisionId);
    }

    /**
     * Get all approvals
     */
    getAllApprovals(): Approval[] {
        return Array.from(this.approvals.values()).sort(
            (a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime()
        );
    }

    /**
     * Update checklist item
     */
    updateChecklistItem(approvalId: string, itemId: string, checked: boolean, checkedBy?: string): boolean {
        const approval = this.approvals.get(approvalId);
        if (!approval) return false;

        const item = approval.checklist.find(i => i.id === itemId);
        if (!item) return false;

        item.checked = checked;
        if (checked && checkedBy) {
            item.checkedBy = checkedBy;
            item.checkedAt = new Date().toISOString();
        }

        this.saveToStorage();
        return true;
    }

    /**
     * Approve an approval request
     */
    approve(
        approvalId: string,
        approvedBy: { name: string; email: string }
    ): boolean {
        const approval = this.approvals.get(approvalId);
        if (!approval) return false;

        // Check if all required checklist items are checked
        const allRequiredChecked = approval.checklist
            .filter(item => item.required)
            .every(item => item.checked);

        if (!allRequiredChecked) {
            throw new Error('Cannot approve: not all required checklist items are checked');
        }

        // Check if all required gates pass
        const allRequiredGatesPass = approval.gates
            .filter(gate => gate.required)
            .every(gate => gate.status === 'pass');

        if (!allRequiredGatesPass) {
            throw new Error('Cannot approve: not all required gates pass');
        }

        approval.status = 'approved';
        approval.approvedAt = new Date().toISOString();
        approval.approvedBy = approvedBy;

        // Update revision status
        revisionManager.updateRevisionStatus(approval.revisionId, 'approved', approvalId);

        this.saveToStorage();
        return true;
    }

    /**
     * Reject an approval request
     */
    reject(
        approvalId: string,
        rejectionReason: string,
        rejectedBy: { name: string; email: string }
    ): boolean {
        const approval = this.approvals.get(approvalId);
        if (!approval) return false;

        approval.status = 'rejected';
        approval.rejectionReason = rejectionReason;
        approval.approvedBy = rejectedBy; // Reusing field for rejectedBy

        // Update revision status
        revisionManager.updateRevisionStatus(approval.revisionId, 'rejected', approvalId);

        this.saveToStorage();
        return true;
    }

    /**
     * Load approvals from localStorage
     */
    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                this.approvals = new Map(data.map((a: Approval) => [a.id, a]));
            }
        } catch (error) {
            console.error('Failed to load approvals from storage:', error);
        }
    }

    /**
     * Save approvals to localStorage
     */
    private saveToStorage(): void {
        try {
            const data = Array.from(this.approvals.values());
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save approvals to storage:', error);
        }
    }
}

export const approvalManager = new ApprovalManager();

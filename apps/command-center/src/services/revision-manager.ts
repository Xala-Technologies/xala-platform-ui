/**
 * Revision Manager Service
 * 
 * Manages workflow session revisions - creation, storage, retrieval, and comparison.
 */

import { Revision, WorkflowSession, GeneratedArtifact, ValidationResult } from '../registry/types';

export class RevisionManager {
    private revisions: Map<string, Revision>;
    private storageKey = 'xala-command-center-revisions';

    constructor() {
        this.revisions = new Map();
        this.loadFromStorage();
    }

    /**
     * Create a revision from a completed workflow session
     */
    createRevision(
        session: WorkflowSession,
        author: { name: string; email: string },
        validationResults: ValidationResult[]
    ): Revision {
        const revision: Revision = {
            id: crypto.randomUUID(),
            workflowId: session.workflowId,
            sessionId: session.id,
            createdAt: new Date().toISOString(),
            author,
            inputs: session.data,
            outputs: session.artifacts,
            validationResults,
            status: 'draft',
        };

        this.revisions.set(revision.id, revision);
        this.saveToStorage();

        return revision;
    }

    /**
     * Get a revision by ID
     */
    getRevision(id: string): Revision | undefined {
        return this.revisions.get(id);
    }

    /**
     * Get all revisions
     */
    getAllRevisions(): Revision[] {
        return Array.from(this.revisions.values()).sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    /**
     * Get revisions by workflow ID
     */
    getRevisionsByWorkflow(workflowId: string): Revision[] {
        return this.getAllRevisions().filter(r => r.workflowId === workflowId);
    }

    /**
     * Update revision status
     */
    updateRevisionStatus(id: string, status: Revision['status'], approvalId?: string): boolean {
        const revision = this.revisions.get(id);
        if (!revision) return false;

        revision.status = status;
        if (approvalId) {
            revision.approvalId = approvalId;
        }

        this.saveToStorage();
        return true;
    }

    /**
     * Compare two revisions
     */
    compareRevisions(revisionId1: string, revisionId2: string): {
        added: GeneratedArtifact[];
        removed: GeneratedArtifact[];
        modified: Array<{
            artifact: GeneratedArtifact;
            oldArtifact: GeneratedArtifact;
        }>;
    } {
        const rev1 = this.revisions.get(revisionId1);
        const rev2 = this.revisions.get(revisionId2);

        if (!rev1 || !rev2) {
            return { added: [], removed: [], modified: [] };
        }

        const artifacts1 = new Map(rev1.outputs.map(a => [a.path, a]));
        const artifacts2 = new Map(rev2.outputs.map(a => [a.path, a]));

        const added: GeneratedArtifact[] = [];
        const removed: GeneratedArtifact[] = [];
        const modified: Array<{ artifact: GeneratedArtifact; oldArtifact: GeneratedArtifact }> = [];

        // Find added and modified artifacts
        for (const [path, artifact2] of artifacts2.entries()) {
            const artifact1 = artifacts1.get(path);
            if (!artifact1) {
                added.push(artifact2);
            } else if (artifact1.content !== artifact2.content) {
                modified.push({ artifact: artifact2, oldArtifact: artifact1 });
            }
        }

        // Find removed artifacts
        for (const [path, artifact1] of artifacts1.entries()) {
            if (!artifacts2.has(path)) {
                removed.push(artifact1);
            }
        }

        return { added, removed, modified };
    }

    /**
     * Load revisions from localStorage
     */
    private loadFromStorage(): void {
        try {
            const stored = localStorage.getItem(this.storageKey);
            if (stored) {
                const data = JSON.parse(stored);
                this.revisions = new Map(data.map((r: Revision) => [r.id, r]));
            }
        } catch (error) {
            console.error('Failed to load revisions from storage:', error);
        }
    }

    /**
     * Save revisions to localStorage
     */
    private saveToStorage(): void {
        try {
            const data = Array.from(this.revisions.values());
            localStorage.setItem(this.storageKey, JSON.stringify(data));
        } catch (error) {
            console.error('Failed to save revisions to storage:', error);
        }
    }
}

export const revisionManager = new RevisionManager();

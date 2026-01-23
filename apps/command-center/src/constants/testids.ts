/**
 * Centralized Test ID Map
 * 
 * Requirement: "Every interactive element MUST have data-testid from a centralized testid map."
 * Pattern: cc-{page}-{component}-{action/element}
 */

export const TESTIDS = {
    common: {
        sidebar: 'cc-common-sidebar',
        header: 'cc-common-header',
        content: 'cc-common-content',
        footer: 'cc-common-footer',
        apiKeyInput: 'cc-common-api-key-input',
        apiKeySave: 'cc-common-api-key-save',
    },
    dashboard: {
        root: 'cc-dashboard-root',
        statCard: 'cc-dashboard-stat-card',
        quickAction: 'cc-dashboard-quick-action',
        timeline: 'cc-dashboard-timeline',
    },
    catalog: {
        root: 'cc-catalog-root',
        search: 'cc-catalog-search-input',
        card: 'cc-catalog-workflow-card',
        startBtn: 'cc-catalog-start-btn',
    },
    session: {
        root: 'cc-session-root',
        stepper: 'cc-session-wizard-stepper',
        terminal: 'cc-session-command-terminal',
        artifactPreview: 'cc-session-artifact-preview',
        nextBtn: 'cc-session-next-btn',
        prevBtn: 'cc-session-prev-btn',
        runBtn: 'cc-session-run-command-btn',
        exitBtn: 'cc-session-exit-btn',
        formField: 'cc-session-form-field',
    },
    specEditor: {
        root: 'cc-spec-editor-root',
        tabs: 'cc-spec-editor-tabs',
        previewBtn: 'cc-spec-editor-preview-btn',
        saveBtn: 'cc-spec-editor-save-btn',
        addPropBtn: 'cc-spec-editor-add-prop-btn',
    },
    approvals: {
        root: 'cc-approvals-root',
        table: 'cc-approvals-table',
        approveBtn: 'cc-approvals-approve-btn',
        rejectBtn: 'cc-approvals-reject-btn',
        viewBtn: 'cc-approvals-view-btn',
        promoteBtn: 'cc-approvals-promote-btn',
        requestApprovalBtn: 'cc-approvals-request-btn',
        checklist: 'cc-approval-checklist',
        checklistItem: 'cc-approval-checklist-item',
        gate: 'cc-approval-gate',
    },
    revisions: {
        root: 'cc-revisions-root',
        table: 'cc-revisions-table',
        filter: 'cc-revisions-filter',
        row: 'cc-revisions-row',
        compareBtn: 'cc-revisions-compare-btn',
        diffView: 'cc-revisions-diff-view',
        timeline: 'cc-revisions-timeline',
    },
    artifacts: {
        diffViewer: 'cc-artifacts-diff-viewer',
        validationPanel: 'cc-artifacts-validation-panel',
    },
    commands: {
        root: 'cc-commands-root',
        card: 'cc-commands-card',
        modal: 'cc-commands-modal',
        formField: 'cc-commands-form-field',
        terminal: 'cc-commands-terminal',
        confirmBtn: 'cc-commands-confirm-btn',
    },
    preview: {
        root: 'cc-preview-root',
        placeholder: 'cc-preview-placeholder',
        renderBtn: 'cc-preview-render-btn',
        errorMessage: 'cc-preview-error-message',
    },
} as const;

export type TestId = typeof TESTIDS;

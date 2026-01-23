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
        viewBtn: 'cc-approvals-view-btn',
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
} as const;

export type TestId = typeof TESTIDS;

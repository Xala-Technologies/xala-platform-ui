# PHASE 1 — FUNCTIONAL SPECIFICATION
## Xala Command Center

**Date:** 2026-01-23  
**Status:** 📋 SPECIFICATION COMPLETE  
**Based on:** Phase 0 Audit Report

---

## EXECUTIVE SUMMARY

This document defines the complete functional specification for the Xala Command Center, a dev-only GUI that enables:
- Running interactive workflows (Design OS style) safely
- AI-guided Q&A to generate specs and artifacts
- Previewing designs via platform-ui composition
- Validating artifacts against schemas
- Managing revision and approval states
- Promoting approved UI designs into platform-ui
- Auto-generating Storybook stories and documentation
- Running cloud/CLI commands as guided, safe processes

**Architecture Principle:** Thin UI pages that compose platform-ui shells/blocks/patterns. All business logic in services layer.

---

## 1. ROUTES & SCREENS

### 1.1 Route Structure
```
/                           → Dashboard (overview)
/workflows                  → Workflow Catalog
/session                    → Active Workflow Session
/session/:sessionId         → Specific Session (resume)
/specs/:componentName?      → Spec Editor
/approvals                  → Approval Status
/revisions                  → Revision Management [NEW]
/revisions/:revisionId      → Revision Detail & Diff [NEW]
/commands                   → Command Registry & Execution [NEW]
/commands/:commandId        → Command Execution UI [NEW]
```

### 1.2 Screen Components Mapping

#### Dashboard (`/`)
**Components Used:**
- `PageContainer` (shell)
- `DashboardPageHeader` (composed)
- `StatCard`, `StatCardGrid` (blocks)
- `SectionCard`, `SectionCardHeader`, `SectionCardContent` (composed)
- `QuickActionCard` (blocks)
- `Timeline` (blocks)
- `CardGrid` (composed)

**Data Source:** `src/data/dashboard.ts`

#### Workflow Catalog (`/workflows`)
**Components Used:**
- `PageContainer` (shell)
- `DashboardPageHeader` (composed)
- `WorkflowPipeline` (blocks)
- `WorkflowCard` (blocks)
- `CardGrid` (composed)
- `SectionCard` (composed)

**Data Source:** `registry/workflow-registry.ts`

#### Workflow Session (`/session`)
**Components Used:**
- `PageContainer` (shell)
- `DashboardPageHeader` (composed)
- `WizardStepper` (composed) - **OR** `MultiStepFormModal` (pattern) for full-screen modal
- `SectionCard` (composed)
- Form components: `Textfield`, `Select`, `Field`, `Label` (primitives)
- `CommandTerminal` (custom component)
- `ArtifactPreview` (custom component)
- `Button`, `Stack` (primitives)

**Enhancements:**
- Add artifact diff viewer (new component)
- Add validation panel (new component)
- Add revision creation on completion

#### Spec Editor (`/specs/:componentName?`)
**Components Used:**
- `PageContainer` (shell)
- `DashboardPageHeader` (composed)
- `Tabs` (composed) - for switching between spec files
- `CodeBlock` (composed) - for code editing
- `Button` (primitives)
- `Drawer` (composed) - for preview panel

**Enhancements:**
- Add schema validation display
- Add live preview panel
- Add save/load functionality

#### Approval Status (`/approvals`)
**Components Used:**
- `PageContainer` (shell)
- `DashboardPageHeader` (composed)
- `DataTable` (composed) - for approval list
- `Button` (primitives)
- `Badge` (primitives) - for status indicators

**Enhancements:**
- Add approval checklist view
- Add diff viewer integration
- Add promotion action buttons

#### Revisions (`/revisions`) [NEW]
**Components Used:**
- `PageContainer` (shell)
- `DashboardPageHeader` (composed)
- `DataTable` (composed) - for revision list
- `Timeline` (blocks) - for revision history
- `Card` (primitives) - for revision cards
- `Button` (primitives) - for compare actions

**Features:**
- List all revisions
- Filter by workflow, date, status
- Compare revisions side-by-side
- View revision details

#### Commands (`/commands`) [NEW]
**Components Used:**
- `PageContainer` (shell)
- `DashboardPageHeader` (composed)
- `CardGrid` (composed)
- `ResourceCard` (pattern) - for command cards
- `Modal` (composed) - for command execution dialog
- `CommandTerminal` (custom component)
- `Button` (primitives)

**Features:**
- List all registered commands
- Execute commands with AI-guided Q&A
- Show command logs
- Display command outputs

---

## 2. COMPONENT USAGE MAPPING

### 2.1 Workflow Session Engine

**Current:** Uses `WizardStepper` + custom form rendering

**Recommended:** Use `MultiStepFormModal` pattern for better UX:
```tsx
<MultiStepFormModal
  open={!!session}
  title={activeWorkflow.name}
  steps={workflowSteps}
  currentStep={activeStepIndex}
  onStepChange={setActiveStepIndex}
  onSubmit={handleComplete}
  onClose={cancelSession}
  sidebar={artifactPreview} // Show artifacts in sidebar
/>
```

**Benefits:**
- Built-in step navigation
- Validation states (`canProceed`)
- Loading states
- Sidebar support for artifacts
- Better mobile responsiveness

### 2.2 Artifact Panel

**Components:**
- `Tabs` (composed) - for switching between artifact files
- `CodeBlock` (composed) - for code display
- `Drawer` (composed) - for side-by-side diff view
- `Alert` (composed) - for validation errors
- `Badge` (primitives) - for validation status

**Layout:**
```tsx
<SectionCard>
  <SectionCardHeader title="Generated Artifacts" />
  <SectionCardContent>
    <Tabs>
      <Tabs.List>
        {artifacts.map(a => <Tabs.Tab key={a.id}>{a.name}</Tabs.Tab>)}
      </Tabs.List>
      <Tabs.Panel>
        <ArtifactDiffViewer artifact={selectedArtifact} />
        <ArtifactValidationPanel artifact={selectedArtifact} />
      </Tabs.Panel>
    </Tabs>
  </SectionCardContent>
</SectionCard>
```

### 2.3 Revision Management

**Components:**
- `DataTable` (composed) - for revision list
- `Timeline` (blocks) - for revision history
- `Card` (primitives) - for revision details
- `Button` (primitives) - for compare actions
- `Drawer` (composed) - for diff view

**Layout:**
```tsx
<PageContainer>
  <DashboardPageHeader title="Revisions" />
  <SectionCard>
    <DataTable
      columns={revisionColumns}
      data={revisions}
      onRowClick={viewRevision}
    />
  </SectionCard>
  {selectedRevision && (
    <Drawer open onClose={() => setSelectedRevision(null)}>
      <RevisionDiff revision={selectedRevision} />
    </Drawer>
  )}
</PageContainer>
```

### 2.4 Approval Gates

**Components:**
- `MultiStepFormModal` (pattern) - for approval flow
- `ReviewStep` (pattern) - for final review
- `Checkbox` (primitives) - for checklist items
- `Alert` (composed) - for gate status
- `Button` (primitives) - for approve/reject actions

**Layout:**
```tsx
<MultiStepFormModal
  open={showApprovalFlow}
  title="Approval Review"
  steps={[
    {
      id: 'checklist',
      title: 'Checklist',
      content: <ApprovalChecklist items={checklistItems} />,
    },
    {
      id: 'review',
      title: 'Review',
      content: <ReviewStep sections={reviewSections} />,
    },
  ]}
  onSubmit={handleApprove}
/>
```

### 2.5 Composition Preview

**Components:**
- `PreviewArea` (blocks) - if available, or `Card` (primitives)
- `Stack` (primitives) - for layout
- `Heading`, `Paragraph` (primitives) - for placeholder content
- `Button` (primitives) - for render actions

**Layout:**
```tsx
<SectionCard>
  <SectionCardHeader title="UI Preview" />
  <SectionCardContent>
    {componentExists ? (
      <PreviewArea>
        <ComponentPreview {...props} />
      </PreviewArea>
    ) : (
      <ComponentPlaceholder
        componentName={componentName}
        requiredProps={requiredProps}
      />
    )}
  </SectionCardContent>
</SectionCard>
```

---

## 3. DATA MODELS

### 3.1 Workflow Session
```typescript
interface WorkflowSession {
  id: string;
  workflowId: string;
  startedAt: string;
  completedAt?: string;
  currentStepIndex: number;
  data: Record<string, any>; // Accumulated answers
  status: 'active' | 'completed' | 'aborted';
  artifacts: GeneratedArtifact[];
  revisionId?: string; // Created on completion
}
```

### 3.2 Revision
```typescript
interface Revision {
  id: string;
  workflowId: string;
  sessionId: string;
  createdAt: string;
  author: {
    name: string;
    email: string;
  };
  inputs: Record<string, any>;
  outputs: GeneratedArtifact[];
  validationResults: ValidationResult[];
  status: 'draft' | 'pending_approval' | 'approved' | 'rejected';
  approvalId?: string;
  parentRevisionId?: string; // For branching
}
```

### 3.3 Validation Result
```typescript
interface ValidationResult {
  artifactId: string;
  artifactPath: string;
  schema: string; // Schema name/ID
  valid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
}

interface ValidationError {
  path: string; // JSON path
  message: string;
  code: string; // Error code
  suggestedFix?: string;
}
```

### 3.4 Approval
```typescript
interface Approval {
  id: string;
  revisionId: string;
  requestedAt: string;
  requestedBy: {
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  approvedAt?: string;
  approvedBy?: {
    name: string;
    email: string;
  };
  rejectionReason?: string;
  checklist: ApprovalChecklistItem[];
  gates: ApprovalGate[];
}

interface ApprovalChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  required: boolean;
  checkedBy?: string;
  checkedAt?: string;
}

interface ApprovalGate {
  id: string;
  name: string;
  description: string;
  status: 'pass' | 'fail' | 'pending';
  required: boolean;
  details?: string;
}
```

### 3.5 Command Execution
```typescript
interface CommandExecution {
  id: string;
  commandId: string;
  startedAt: string;
  completedAt?: string;
  status: 'running' | 'completed' | 'failed' | 'cancelled';
  exitCode?: number;
  logs: string[];
  outputs: Record<string, any>;
  artifacts: GeneratedArtifact[];
  error?: string;
}
```

### 3.6 Generated Artifact (Enhanced)
```typescript
interface GeneratedArtifact {
  id: string;
  type: 'file' | 'code' | 'json' | 'image' | 'markdown';
  path: string;
  name: string;
  content?: string;
  previewUrl?: string;
  schema?: string; // Schema name for validation
  validationResult?: ValidationResult;
  diff?: {
    previousRevisionId?: string;
    changes: ArtifactChange[];
  };
}

interface ArtifactChange {
  type: 'added' | 'removed' | 'modified';
  path: string;
  oldValue?: any;
  newValue?: any;
  lineNumbers?: { start: number; end: number };
}
```

---

## 4. COMMAND REGISTRY SCHEMA

### 4.1 Command Definition (Enhanced)
```typescript
interface Command {
  id: string;
  name: string;
  description: string;
  category: 'scaffold' | 'validate' | 'generate' | 'deploy' | 'test';
  executable: string; // e.g., 'npx', 'node', 'bash'
  args: string[]; // Template strings with ${var} substitution
  workingDir?: string; // Template string, defaults to workspace root
  requiredSecrets?: string[]; // Secret names (never show values)
  requiredEnvVars?: string[]; // Environment variable names
  timeout?: number; // Milliseconds, default 300000 (5 min)
  isLongRunning?: boolean; // Shows progress indicator
  dryRun?: boolean; // Supports dry-run mode
  environment?: 'dev' | 'stage' | 'prod'; // Environment guardrails
  inputSchema?: Record<string, any>; // JSON Schema for inputs
  outputSchema?: Record<string, any>; // JSON Schema for outputs
  riskLevel?: 'low' | 'medium' | 'high'; // For confirmation prompts
  confirmationPrompt?: string; // Custom confirmation message
}
```

### 4.2 Command Execution Flow
1. User selects command from registry
2. System checks:
   - Command exists in registry ✅
   - Required secrets present (check existence, not values) ✅
   - Required env vars present ✅
   - Environment guardrails (prod requires extra confirmation) ⚠️
3. If command has `inputSchema`, show AI-guided Q&A form
4. User fills form, validates against schema
5. Show confirmation dialog if `riskLevel` is 'high' or `confirmationPrompt` exists
6. Execute command via `CommandExecutor`
7. Stream logs to `CommandTerminal`
8. On completion, validate outputs against `outputSchema`
9. Display artifacts and results

---

## 5. SECURITY CONTROLS

### 5.1 Command Execution Safety
- ✅ **Registry-only:** Only registered commands can be executed
- ✅ **No arbitrary shell:** No `eval()`, no dynamic command construction
- ✅ **Working directory:** Restricted to workspace root or subdirectories
- ✅ **Timeout:** All commands have timeout (default 5 min)
- ✅ **Secret handling:** Never display secret values, only check presence
- ✅ **Environment guardrails:** Prod commands require extra confirmation

### 5.2 Secret Management
- Secrets stored outside UI (environment variables, secret manager)
- UI only checks if secrets exist, never displays values
- Secret names listed in `requiredSecrets` array
- Missing secrets show clear error message (not which secrets are missing)

### 5.3 Environment Protection
```typescript
// Environment guardrails
if (command.environment === 'prod') {
  // Require explicit confirmation
  // Show warning banner
  // Log to audit trail
  // Require additional approval for destructive commands
}
```

### 5.4 Input Validation
- All command inputs validated against `inputSchema` (JSON Schema)
- Template string substitution sanitized
- No user input directly in command args (always via schema)

---

## 6. ACCESSIBILITY REQUIREMENTS

### 6.1 WCAG 2.1 AA Compliance
- ✅ **Keyboard navigation:** All interactive elements keyboard accessible
- ✅ **Screen readers:** All form fields have labels, status messages use `aria-live`
- ✅ **Focus management:** Modals trap focus, focus returns on close
- ✅ **Color contrast:** Designsystemet components meet contrast requirements
- ✅ **ARIA labels:** All interactive elements have `aria-label` or `aria-labelledby`

### 6.2 Form Accessibility
- All form fields have associated `<Label>`
- Error messages associated with fields via `aria-describedby`
- Required fields marked with `aria-required`
- Validation errors announced via `aria-live="polite"`

### 6.3 Modal/Drawer Accessibility
- Modals trap focus (first focusable element)
- Close button accessible via keyboard (Esc key)
- Focus returns to trigger element on close
- Modal title announced via `aria-labelledby`

### 6.4 Status Messages
- Command execution status announced via `aria-live="polite"`
- Validation errors announced via `aria-live="assertive"`
- Loading states announced via `aria-busy="true"`

---

## 7. TESTID NAMING RULES

### 7.1 Pattern
```
cc-{page}-{component}-{action/element}
```

### 7.2 Examples
```typescript
// Common
cc-common-sidebar
cc-common-header
cc-common-content

// Dashboard
cc-dashboard-root
cc-dashboard-stat-card-{index}
cc-dashboard-quick-action-{actionId}

// Workflow Catalog
cc-catalog-root
cc-catalog-search-input
cc-catalog-workflow-card-{workflowId}
cc-catalog-start-btn-{workflowId}

// Session
cc-session-root
cc-session-stepper
cc-session-step-{stepIndex}
cc-session-input-{fieldId}
cc-session-select-{fieldId}
cc-session-run-command-btn
cc-session-terminal
cc-session-artifact-preview
cc-session-artifact-tab-{artifactId}
cc-session-validation-panel
cc-session-next-btn
cc-session-prev-btn
cc-session-exit-btn

// Revisions [NEW]
cc-revisions-root
cc-revisions-table
cc-revisions-filter-{filterName}
cc-revisions-row-{revisionId}
cc-revisions-compare-btn-{revisionId}
cc-revisions-diff-view
cc-revisions-timeline

// Approval [NEW]
cc-approval-root
cc-approval-checklist
cc-approval-checklist-item-{itemId}
cc-approval-gate-{gateId}
cc-approval-approve-btn
cc-approval-reject-btn
cc-approval-reason-input

// Commands [NEW]
cc-commands-root
cc-commands-card-{commandId}
cc-commands-execute-btn-{commandId}
cc-commands-modal
cc-commands-form-field-{fieldId}
cc-commands-terminal
cc-commands-confirm-btn

// Preview [NEW]
cc-preview-root
cc-preview-placeholder-{componentName}
cc-preview-render-btn
cc-preview-error-message
```

### 7.3 Centralized TestID Map
**Location:** `src/constants/testids.ts`

**Structure:**
```typescript
export const TESTIDS = {
  common: { ... },
  dashboard: { ... },
  catalog: { ... },
  session: { ... },
  revisions: { ... },
  approval: { ... },
  commands: { ... },
  preview: { ... },
} as const;
```

---

## 8. ARTIFACT VALIDATION

### 8.1 Schema Validation
**Schemas:**
- `COMPOSE_*.json` → JSON Schema for UI composition
- `TESTIDS_*.json` → JSON Schema for test ID mapping
- `export.manifest.json` → JSON Schema for export manifest

**Validation Library:** `ajv` (JSON Schema validator)

**Validation Flow:**
1. Artifact generated
2. Load schema based on artifact type
3. Validate artifact content against schema
4. Display validation results:
   - ✅ Pass: Green badge, no errors
   - ❌ Fail: Red badge, list of errors with paths
   - ⚠️ Warnings: Yellow badge, list of warnings

**Error Display:**
```tsx
<Alert variant="error">
  <Alert.Title>Validation Failed</Alert.Title>
  <Alert.Description>
    <List>
      {errors.map(error => (
        <List.Item key={error.path}>
          <strong>{error.path}:</strong> {error.message}
          {error.suggestedFix && (
            <div>💡 {error.suggestedFix}</div>
          )}
        </List.Item>
      ))}
    </List>
  </Alert.Description>
</Alert>
```

### 8.2 Markdown Linting
**For `SECTION_*.md` files:**
- Use `markdownlint` or similar
- Check for:
  - Proper heading hierarchy
  - Code block formatting
  - Link validity
  - Required sections

### 8.3 TestID Validation
**For `TESTIDS_*.json` files:**
- Ensure all testids follow naming convention
- Check for duplicates
- Verify all referenced components exist

---

## 9. REVISION MANAGEMENT

### 9.1 Revision Creation
**Trigger:** When workflow session completes successfully

**Process:**
1. Create revision from session data
2. Store artifacts
3. Run validation on all artifacts
4. Set status to 'draft'
5. Optionally auto-create approval request

### 9.2 Revision Storage
**Initial:** localStorage (for dev)
**Future:** File system or database

**Structure:**
```
.revisions/
  {revisionId}/
    metadata.json
    artifacts/
      SECTION_*.md
      COMPOSE_*.json
      ...
    validation-results.json
```

### 9.3 Revision Comparison
**Features:**
- Compare two revisions side-by-side
- Show diff for each artifact
- Highlight changes (added/removed/modified)
- Show validation differences

**Components:**
- `RevisionDiff` component
- `ArtifactDiffViewer` component
- `Drawer` for side-by-side view

---

## 10. APPROVAL PROCESS

### 10.1 Approval Gates
**Required Gates:**
1. ✅ Schema validation passes
2. ✅ Accessibility checklist complete
3. ✅ Storybook story exists (or will be generated)
4. ✅ Documentation exists
5. ✅ No guardrail violations (verified by CI)
6. ✅ Test coverage meets threshold (if applicable)

### 10.2 Approval Checklist
**Items:**
- [ ] All artifacts validated successfully
- [ ] Component follows design system guidelines
- [ ] Storybook story created
- [ ] Documentation written
- [ ] Test IDs added
- [ ] Accessibility tested
- [ ] Code reviewed (if applicable)

### 10.3 Approval Flow
1. User completes workflow session
2. Revision created
3. User clicks "Request Approval"
4. System runs approval gates
5. If gates pass, create approval request
6. Show approval checklist
7. User (or approver) reviews checklist
8. User clicks "Approve" or "Reject"
9. If approved, enable promotion

---

## 11. PROMOTION INTO PLATFORM-UI

### 11.1 Promotion Scaffolding
**When:** After approval is granted

**Process:**
1. Validate all artifacts
2. Check component doesn't already exist
3. Scaffold component file:
   ```
   packages/platform-ui/src/{layer}/{ComponentName}.tsx
   ```
4. Scaffold Storybook story:
   ```
   packages/platform-ui/src/stories/{Category}/{ComponentName}.stories.tsx
   ```
5. Scaffold documentation:
   ```
   docs/components/{ComponentName}.md
   ```
6. Update export barrel files
7. Run lint/typecheck/storybook build
8. If all pass, mark as ready for PR

### 11.2 Scaffolding Templates
**Component Template:**
```typescript
/**
 * {ComponentName}
 *
 * {Description from spec}
 */
import * as React from 'react';
import { ... } from '@digdir/designsystemet-react';

export interface {ComponentName}Props {
  // Props from COMPOSE_*.json
}

export function {ComponentName}({ ... }: {ComponentName}Props): React.ReactElement {
  // Implementation from COMPOSE_*.json
}
```

**Storybook Template:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { {ComponentName} } from '../../{layer}/{ComponentName}';

const meta: Meta<typeof {ComponentName}> = {
  title: '{Category}/{ComponentName}',
  component: {ComponentName},
};

export default meta;
type Story = StoryObj<typeof {ComponentName}>;

export const Default: Story = {
  args: {
    // Default props
  },
};
```

### 11.3 Export Updates
**Update:**
- `packages/platform-ui/src/{layer}/index.ts`
- `packages/platform-ui/src/index.ts` (if needed)

---

## 12. STORYBOOK + DOCS ENRICHMENT

### 12.1 Storybook Story Generation
**From:** `COMPOSE_*.json` + `SECTION_*.md`

**Generate:**
- Multiple variants (from spec)
- States (loading/empty/error/disabled)
- Controls (from prop definitions)
- Accessibility notes (from spec)
- Usage examples (from spec)

### 12.2 Documentation Generation
**From:** `SECTION_*.md` + component code

**Generate:**
- Component overview
- Props documentation
- Usage examples
- Accessibility notes
- Design guidelines

---

## 13. CLOUD/CLI COMMANDS AS INTERACTIVE GUI

### 13.1 Command Execution UI
**Components:**
- `Modal` (composed) - for command execution dialog
- `MultiStepFormModal` (pattern) - if command has multiple input steps
- `CommandTerminal` (custom) - for log streaming
- `Button` (primitives) - for execute/confirm actions

**Flow:**
1. User clicks command card
2. If command has `inputSchema`, show form modal
3. User fills form (AI-guided Q&A)
4. Validate inputs
5. Show confirmation if `riskLevel` is 'high'
6. Execute command
7. Stream logs to terminal
8. Show results and artifacts

### 13.2 Environment Selection
**Components:**
- `Select` (primitives) - for environment dropdown
- `Alert` (composed) - for environment warnings

**Guardrails:**
- Prod requires extra confirmation
- Show warning banner for prod
- Log to audit trail

---

## 14. IMPLEMENTATION PRIORITY

### Phase 2.1: Foundation (Week 1)
1. ✅ Enhance WorkflowSessionPage with artifact diff/validation
2. ✅ Create RevisionManager service
3. ✅ Create RevisionsPage
4. ✅ Add revision creation on session completion

### Phase 2.2: Approval & Promotion (Week 2)
1. ✅ Create ApprovalManager service
2. ✅ Create ApprovalGate component
3. ✅ Enhance ApprovalStatus page
4. ✅ Create PromotionScaffolder service
5. ✅ Add promotion action to approval flow

### Phase 2.3: Commands & Preview (Week 3)
1. ✅ Create CommandsPage
2. ✅ Enhance CommandExecutor with real execution
3. ✅ Create CompositionPreview component
4. ✅ Add preview to SpecEditor

### Phase 2.4: Polish & CI (Week 4)
1. ✅ Add schema validation
2. ✅ Enhance CI gates
3. ✅ Add Storybook stories for new components
4. ✅ Documentation

---

## 15. ACCEPTANCE CRITERIA

### 15.1 Workflow Session
- ✅ Can start workflow from catalog
- ✅ Can navigate through steps
- ✅ Can answer questions
- ✅ Can execute commands
- ✅ Can view artifacts
- ✅ Can see validation results
- ✅ Can complete workflow
- ✅ Creates revision on completion

### 15.2 Revision Management
- ✅ Can view all revisions
- ✅ Can filter revisions
- ✅ Can compare revisions
- ✅ Can view revision details
- ✅ Can see revision diff

### 15.3 Approval Process
- ✅ Can request approval
- ✅ Can view approval checklist
- ✅ Can approve/reject
- ✅ Approval gates enforced
- ✅ Can promote after approval

### 15.4 Command Execution
- ✅ Can list commands
- ✅ Can execute commands
- ✅ Can see command logs
- ✅ Can view command outputs
- ✅ Environment guardrails enforced

### 15.5 Artifact Validation
- ✅ Artifacts validated against schemas
- ✅ Validation errors displayed clearly
- ✅ Suggested fixes shown
- ✅ Can fix and re-validate

### 15.6 Composition Preview
- ✅ Can preview UI composition
- ✅ Shows placeholder if component missing
- ✅ Shows component if exists
- ✅ Updates on spec changes

### 15.7 Promotion
- ✅ Can scaffold component
- ✅ Can scaffold Storybook story
- ✅ Can scaffold documentation
- ✅ Updates export files
- ✅ Runs quality checks

---

## 16. TECHNICAL CONSTRAINTS

### 16.1 No Violations
- ✅ No raw HTML elements
- ✅ No inline styles (without design tokens)
- ✅ No custom CSS classes
- ✅ No platform package imports
- ✅ No business logic in UI components

### 16.2 Thin Pages
- ✅ Pages only compose shells/blocks/patterns
- ✅ Business logic in services
- ✅ Data in registry/data files

### 16.3 TestIDs
- ✅ All interactive elements have testids
- ✅ Testids from centralized map
- ✅ Testids follow naming convention

### 16.4 Accessibility
- ✅ WCAG 2.1 AA compliant
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Focus management

---

**Specification Completed:** 2026-01-23  
**Status:** ✅ READY FOR IMPLEMENTATION  
**Next Phase:** Phase 2 - Implementation

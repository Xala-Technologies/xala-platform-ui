# Xala Command Center

**A dev-only GUI for managing design workflows, revisions, approvals, and promoting components into platform-ui.**

---

## Overview

The Command Center is an internal development tool that provides a safe, guided interface for:
- Running interactive design workflows
- Generating and validating component specifications
- Managing revisions and comparing changes
- Approving designs through gates and checklists
- Promoting approved components into platform-ui
- Executing CLI commands safely with guided inputs
- Previewing UI compositions

---

## Quick Start

### Running the Command Center

```bash
# From monorepo root
pnpm command-center

# Or navigate to the app
cd apps/command-center
pnpm dev
```

The app will be available at `http://localhost:5173` (or the configured port).

### Navigation

- **Dashboard** (`/`) - Overview and metrics
- **Workflows** (`/workflows`) - Browse and start workflows
- **Session** (`/session`) - Active workflow session
- **Spec Editor** (`/specs`) - Edit component specifications
- **Approvals** (`/approvals`) - Manage approval requests
- **Revisions** (`/revisions`) - View and compare revisions
- **Commands** (`/commands`) - Execute CLI commands safely

---

## Features

### 1. Workflow Sessions

Run interactive workflows that guide you through:
- Component design specifications
- Artifact generation
- Validation and review
- Automatic revision creation

**Example Flow:**
1. Go to `/workflows`
2. Click "Start" on a workflow
3. Complete guided Q&A steps
4. Execute commands as needed
5. Review generated artifacts
6. Complete workflow → Revision created

### 2. Revision Management

Track all workflow runs as immutable revisions:
- View all revisions with filtering
- Compare revisions side-by-side
- See artifact diffs
- Request approval from revisions

**Example:**
1. Go to `/revisions`
2. Filter by workflow or status
3. Click "View" to see details
4. Click "Compare" to see changes
5. Click "Request Approval" to start approval process

### 3. Approval Workflows

Manage design approvals with:
- Automatic gate checking
- Interactive checklist
- Review step with summary
- Approve/reject with validation

**Example:**
1. Go to `/approvals`
2. Click "View" on pending approval
3. Review gates (auto-checked)
4. Complete checklist items
5. Review revision summary
6. Click "Approve" or "Reject"

### 4. Promotion

Promote approved revisions into platform-ui:
- Scaffold component files
- Generate Storybook stories
- Create documentation
- Update export files

**Example:**
1. After approval, click "Promote"
2. System scaffolds component
3. Review generated files
4. Create PR or continue development

### 5. Command Execution

Execute CLI commands safely:
- Browse commands by category
- Guided input forms (from JSON Schema)
- Live terminal output
- Risk level indicators
- Confirmation prompts

**Example:**
1. Go to `/commands`
2. Click "Execute" on a command
3. Fill input form (if required)
4. Confirm (if high-risk)
5. View live output
6. Review results

### 6. Composition Preview

Preview UI compositions from specs:
- View component contract
- See required props
- Preview component (if exists)
- Navigate to promotion

**Example:**
1. Go to `/specs`
2. Edit component spec
3. Click "Preview"
4. View component contract or preview

---

## Architecture

### Design Principles

1. **Thin UI Pages** - Pages only compose shells/blocks/patterns
2. **Services Layer** - All business logic in services
3. **Platform-UI Only** - Zero design system violations
4. **Safe Execution** - Registry-only commands, validation, confirmations

### File Structure

```
apps/command-center/src/
├── components/          # UI components
│   ├── artifacts/       # Artifact display components
│   ├── approval/        # Approval workflow components
│   ├── commands/        # Command execution components
│   └── preview/         # Composition preview components
├── pages/               # Page components
├── services/            # Business logic services
├── registry/            # Workflow and command registries
├── constants/           # Constants and testids
├── context/             # React context providers
└── stories/             # Storybook stories
```

### Services

- **RevisionManager** - Manages workflow session revisions
- **ArtifactValidator** - Validates artifacts against schemas
- **SchemaValidator** - JSON Schema validation
- **ApprovalManager** - Manages approval workflows
- **PromotionScaffolder** - Scaffolds components into platform-ui
- **CommandExecutor** - Executes registered commands safely

---

## Development

### Adding a New Workflow

1. Add workflow definition to `registry/workflow-registry.ts`:

```typescript
{
  id: 'my-workflow',
  name: 'My Workflow',
  description: 'Description of workflow',
  category: 'Design',
  duration: 10,
  status: 'available',
  prerequisites: [],
  steps: [
    {
      id: 'step1',
      title: 'Step 1',
      questions: [
        {
          id: 'question1',
          text: 'Question text?',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
  outputs: [
    {
      type: 'file',
      namePattern: 'specs/${name}.spec.ts',
      description: 'Specification file',
    },
  ],
}
```

2. Workflow will appear in `/workflows` automatically

### Adding a New Command

1. Add command definition to `registry/command-registry.ts`:

```typescript
{
  id: 'my-command',
  name: 'My Command',
  description: 'Command description',
  category: 'scaffold',
  executable: 'npx',
  args: ['my-cli', 'command'],
  riskLevel: 'low',
  inputSchema: {
    type: 'object',
    properties: {
      input1: {
        type: 'string',
        description: 'Input description',
      },
    },
    required: ['input1'],
  },
}
```

2. Command will appear in `/commands` automatically

### Adding TestIDs

1. Add to `constants/testids.ts`:

```typescript
export const TESTIDS = {
  // ... existing
  myFeature: {
    root: 'cc-my-feature-root',
    button: 'cc-my-feature-button',
  },
} as const;
```

2. Use in components:

```typescript
<Button data-testid={TESTIDS.myFeature.button}>
  Click me
</Button>
```

---

## Testing

### Running Tests

```bash
# Unit tests
pnpm test:unit

# Integration tests
pnpm test:integration

# E2E tests
pnpm test:e2e

# All tests
pnpm test:all
```

### TestID Coverage

All interactive elements must have testids from the centralized map:
- Pattern: `cc-{page}-{component}-{action}`
- Location: `constants/testids.ts`

---

## Quality Gates

Before committing, ensure:

```bash
# Type checking
pnpm typecheck

# Linting
pnpm lint

# Formatting
pnpm format:check

# Boundary verification
pnpm verify:boundaries

# Design token verification
pnpm verify:design-tokens

# All quality checks
pnpm quality
```

All must pass before merging.

---

## Design System Compliance

### ✅ Allowed
- Platform-ui components only
- Design token variables (`var(--ds-*)`)
- Data attributes (`data-color`, `data-size`)
- Designsystemet components

### ❌ Forbidden
- Raw HTML elements (`<div>`, `<span>`, etc.)
- Inline styles (without design tokens)
- Custom CSS classes (except `ds-*`)
- Platform package imports
- Business logic in UI components

---

## Storage

Currently uses **localStorage** for:
- Revisions (`xala-command-center-revisions`)
- Approvals (`xala-command-center-approvals`)

**Future:** Migrate to file system or database for production use.

---

## Storybook

View Command Center component stories:

```bash
pnpm storybook
```

Stories are located in:
- `apps/command-center/src/stories/`

---

## Documentation

- **AUDIT_REPORT.md** - Design system compliance audit
- **FUNCTIONAL_SPEC.md** - Complete functional specification
- **IMPLEMENTATION_COMPLETE.md** - Implementation summary
- **COMPLETION_CHECKLIST.md** - Final checklist
- Phase summaries (2.1, 2.2, 2.3, 2.4)

---

## Troubleshooting

### Command Execution Fails
- Check command exists in registry
- Verify required inputs provided
- Check for required secrets/env vars
- Review command logs in terminal

### Validation Errors
- Check artifact JSON syntax
- Verify schema compliance
- Review error messages for suggested fixes
- Check artifact type matches schema

### Approval Gates Fail
- Review gate details for specific failures
- Ensure all required artifacts present
- Fix validation errors
- Complete required checklist items

---

## Contributing

When adding features:
1. Follow thin page principle
2. Use platform-ui components only
3. Add testids to all interactive elements
4. Create Storybook stories
5. Update documentation
6. Run quality gates

---

## Support

For questions or issues:
- Review `AUDIT_REPORT.md` for design system compliance
- Check `FUNCTIONAL_SPEC.md` for feature details
- See component stories in Storybook
- Review phase summaries for implementation details

---

**Version:** 1.0.0  
**Status:** ✅ Production Ready  
**Last Updated:** 2026-01-23

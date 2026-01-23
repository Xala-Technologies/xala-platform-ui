# Design Specifications

This directory contains design specifications and approval workflows for all components in `@xala-technologies/platform-ui`.

## Directory Structure

```
specs/
├── _templates/           # Template files for new components
│   ├── SPEC.md          # Component specification template
│   ├── COMPOSE.json     # Composition structure template
│   ├── TESTIDS.json     # Test ID definitions template
│   └── APPROVAL.json    # Approval workflow template
├── <ComponentName>/      # Per-component specs
│   ├── SPEC.md          # Full specification
│   ├── COMPOSE.json     # Component composition
│   ├── TESTIDS.json     # Test ID registry
│   └── APPROVAL.json    # Approval status
└── README.md            # This file
```

## Workflow Overview

### 1. Create Specification

When creating a new component, start by creating its specification:

```bash
# Copy templates to new component directory
mkdir -p specs/MyNewComponent
cp specs/_templates/* specs/MyNewComponent/

# Edit the files, replacing {{placeholders}}
```

### 2. Design Review

1. Create a PR with the spec files
2. Add the `design:draft` label
3. Request review from `@xala-technologies/design-team`
4. Address feedback and iterate
5. Once approved, label changes to `design:approved`

### 3. Implementation

1. Create the component following the spec
2. Implement all states and variants
3. Add Storybook stories
4. Ensure accessibility requirements are met

### 4. QA Review

1. Run all verification scripts
2. Complete accessibility audit
3. Visual regression testing
4. Update `APPROVAL.json` with final approvals

## Artifact Descriptions

### SPEC.md

The primary specification document containing:
- Component purpose and user stories
- Visual design (layout, variants, states)
- Props interface with TypeScript types
- Data requirements (input/output)
- Accessibility requirements (WCAG 2.1 AA)
- Test scenarios
- Implementation notes

### COMPOSE.json

Machine-readable composition structure:
- Designsystemet components used
- Internal components used
- Component hierarchy/tree
- Props mapping
- Slots definition
- State configurations

Used by tooling to validate composition and generate scaffolding.

### TESTIDS.json

Registry of test identifiers:
- Static test IDs for elements
- Dynamic test ID patterns
- Usage examples for different testing frameworks
- Visibility conditions

Ensures consistent test ID usage across the codebase.

### APPROVAL.json

Workflow state tracking:
- Current phase in approval workflow
- Required approvals per phase
- Approval history
- Comments and blockers
- GitHub label mapping

## Labels

| Label | Color | Description |
|-------|-------|-------------|
| `design:draft` | Yellow | Specification in progress |
| `design:in-review` | Blue | Under design review |
| `design:approved` | Green | Approved for implementation |
| `design:implemented` | Purple | Implementation complete |

## Commands

### Validate Specifications

```bash
# Validate all spec JSON files
pnpm verify:specs

# Validate specific component
pnpm verify:specs -- --component=MyComponent
```

### Generate from Templates

```bash
# Using design-workflow CLI (when available)
npx design-workflow section-spec MyComponent
```

### Check Approval Status

```bash
# Check approval status of all components
npx design-workflow check-approval

# Check specific component
npx design-workflow check-approval MyComponent
```

## Best Practices

1. **Start with specs** - Always create specifications before implementing
2. **Keep specs updated** - Update specs when implementation diverges
3. **Use templates** - Don't create spec files from scratch
4. **Link issues** - Reference GitHub issues in metadata
5. **Document decisions** - Use comments for design decisions
6. **Track blockers** - Add blockers when work is blocked

## Integration with CI/CD

The `design-review.yml` workflow:
- Checks for `design:approved` label on component PRs
- Validates JSON syntax in spec files
- Comments on PRs missing spec artifacts
- Blocks merge without proper approvals

## Questions?

- Design questions: `@xala-technologies/design-team`
- Technical questions: `@xala-technologies/platform-ui-maintainers`
- Process questions: `@xala-technologies/platform-seniors`

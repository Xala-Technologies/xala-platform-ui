# Command Center Testing Guide

**Testing strategy and coverage for Command Center components.**

---

## Test Structure

```
tests/unit/command-center/
├── ApprovalGate.test.tsx              ✅
├── ApprovalChecklist.test.tsx         ✅
├── ArtifactValidationPanel.test.tsx   ✅
├── ArtifactDiffViewer.test.tsx        ✅
└── CompositionPreview.test.tsx        ✅
```

---

## Running Tests

### Unit Tests

```bash
# Run all Command Center tests
pnpm test:unit --run tests/unit/command-center

# Run specific test file
pnpm test:unit --run tests/unit/command-center/ApprovalGate.test.tsx

# Watch mode
pnpm test:unit tests/unit/command-center
```

---

## Test Coverage

### ✅ Covered Components

1. **ApprovalGate**
   - Renders gate name and description
   - Displays pass/fail/pending status
   - Shows required badge
   - Displays details
   - Testid handling

2. **ApprovalChecklist**
   - Renders all items
   - Shows checked state
   - Handles checkbox clicks
   - Displays progress
   - Read-only mode
   - Required badge display

3. **ArtifactValidationPanel**
   - Valid/invalid status display
   - Error display
   - Warning display
   - Error codes
   - Suggested fixes
   - Success message

4. **ArtifactDiffViewer**
   - Artifact name display
   - Change count display
   - Added/modified/removed changes
   - No changes message
   - Content rendering

5. **CompositionPreview**
   - Preview area rendering
   - Component contract display
   - Placeholder for missing components
   - Empty composition handling

---

## Test Patterns

### Component Rendering

```typescript
it('renders correctly', () => {
    render(<Component {...props} />);
    expect(screen.getByText('Expected Text')).toBeInTheDocument();
});
```

### User Interactions

```typescript
it('handles user interaction', () => {
    const handleClick = vi.fn();
    render(<Component onClick={handleClick} />);
    
    fireEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalled();
});
```

### TestID Usage

```typescript
it('uses correct testid', () => {
    render(<Component data-testid="custom-id" />);
    expect(screen.getByTestId('custom-id')).toBeInTheDocument();
});
```

---

## Mock Data

### ApprovalGate Mock

```typescript
const mockGate: ApprovalGate = {
    id: 'gate-1',
    name: 'Schema Validation',
    description: 'Validates all artifacts',
    status: 'pass',
    required: true,
    details: 'All schemas validated',
};
```

### ValidationResult Mock

```typescript
const mockResult: ValidationResult = {
    artifactId: 'artifact-1',
    artifactPath: 'specs/Component.spec.ts',
    schema: 'COMPOSE',
    valid: true,
    errors: [],
    warnings: [],
};
```

---

## Future Test Additions

### Pages (Integration Tests)

- [ ] `RevisionsPage.test.tsx`
- [ ] `CommandsPage.test.tsx`
- [ ] `ApprovalStatus.test.tsx`
- [ ] `WorkflowSessionPage.test.tsx`

### Services (Unit Tests)

- [ ] `revision-manager.test.ts`
- [ ] `approval-manager.test.ts`
- [ ] `artifact-validator.test.ts`
- [ ] `schema-validator.test.ts`
- [ ] `promotion-scaffolder.test.ts`

### E2E Tests

- [ ] Complete workflow flow
- [ ] Approval process flow
- [ ] Command execution flow
- [ ] Revision comparison flow

---

## Test Utilities

Tests use shared utilities from `tests/test-utils.tsx`:

- `render` - Custom render with ThemeProvider
- `screen` - Testing Library screen queries
- `fireEvent` - User interaction simulation
- `vi` - Vitest mocking utilities

---

## Coverage Goals

- **Unit Tests:** 70%+ coverage for components
- **Integration Tests:** Critical user flows
- **E2E Tests:** End-to-end workflows

---

**Last Updated:** 2026-01-23

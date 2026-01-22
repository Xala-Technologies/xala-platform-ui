# Verification Scripts

Automated scripts to enforce governance rules and architectural boundaries.

## Available Scripts

### 1. Boundary Verification
```bash
pnpm verify:boundaries
```

**Checks:**
- Component layer hierarchy (primitives → composed → blocks → patterns → shells → pages)
- No imports from platform packages (`@xala-technologies/platform`)
- No imports from platform-schema
- No imports from governance package
- No direct src/ imports

**Example Violations:**
```typescript
// ❌ WRONG - Importing from platform
import { useAuth } from '@xala-technologies/platform/auth';

// ❌ WRONG - Higher layer importing from lower
// In primitives/Button.tsx:
import { Modal } from '../composed/Modal'; // composed is higher layer

// ✅ CORRECT
import { Button } from '@digdir/designsystemet-react';
```

### 2. Design Token Verification
```bash
pnpm verify:design-tokens
```

**Checks:**
- No raw HTML elements (div, span, p, h1-h6, button, etc.)
- No inline styles (except with design token variables)
- Custom CSS classes (warning - prefer data attributes)

**Example Violations:**
```typescript
// ❌ WRONG - Raw HTML
<div className="container">
  <h1>Title</h1>
  <button onClick={handleClick}>Click</button>
</div>

// ❌ WRONG - Inline styles
<Card style={{ padding: '20px', margin: '10px' }}>

// ⚠️ WARNING - Custom class
<div className="my-custom-class">

// ✅ CORRECT - Designsystemet components
<Card data-color="neutral" data-size="medium">
  <Heading level={1} data-size="large">Title</Heading>
  <Button onClick={handleClick}>Click</Button>
</Card>

// ✅ CORRECT - Design token variables
<Card style={{ padding: 'var(--ds-spacing-4)' }}>
```

### 3. Run All Verifications
```bash
pnpm verify:all
```

Runs both boundary and design token verification.

### 4. Quality Check (Includes Verifications)
```bash
pnpm quality
```

Runs:
1. Type checking
2. Linting
3. Format checking
4. Boundary verification
5. Design token verification

## CI/CD Integration

All verification scripts run automatically in GitHub Actions:

```yaml
- name: Verify boundaries
  run: pnpm verify:boundaries

- name: Verify design tokens
  run: pnpm verify:design-tokens
```

## Pre-publish Hook

Verifications run automatically before publishing:

```json
"prepublishOnly": "pnpm quality && pnpm build"
```

This ensures no violations are published to the package registry.

## Allowed Exceptions

### Storybook Stories
Files in `src/stories/` and `.storybook/` are exempt from checks as they are documentation/examples.

### Design Token Variables
Inline styles are allowed if using design token variables:
```typescript
// ✅ ALLOWED
<Card style={{
  padding: 'var(--ds-spacing-4)',
  gap: 'var(--ds-spacing-2)',
}}>
```

## Exit Codes

- **0**: All checks passed
- **1**: Violations found

## Troubleshooting

### False Positives

If you have a legitimate use case that triggers a violation:

1. Check if it's in an allowed directory (`src/stories/`, `.storybook/`)
2. Verify you're using design token variables for inline styles
3. Consider refactoring to use Designsystemet components
4. If truly necessary, document the exception

### Common Issues

**Issue**: "Raw HTML element found"
**Solution**: Use Designsystemet component instead
```typescript
// Before
<div>Content</div>

// After
<Card>Content</Card>
```

**Issue**: "Inline style without design tokens"
**Solution**: Use data attributes or design token variables
```typescript
// Before
<Card style={{ padding: '20px' }}>

// After
<Card data-size="large">
// or
<Card style={{ padding: 'var(--ds-spacing-5)' }}>
```

**Issue**: "Layer violation"
**Solution**: Respect component hierarchy
```typescript
// Before (in primitives/)
import { Modal } from '../composed/Modal';

// After
// Move code to composed/ or restructure
```

**Issue**: "Platform package import"
**Solution**: UI package must be independent
```typescript
// Before
import { useAuth } from '@xala-technologies/platform/auth';

// After
// Accept auth state via props instead
function Component({ isAuthenticated }: Props) {
  // ...
}
```

## Manual Testing

Run verifications locally before committing:

```bash
# Quick check
pnpm verify:all

# Full quality check
pnpm quality
```

## Continuous Improvement

These scripts are maintained to catch common violations. If you find patterns that should be checked, update the scripts:

- `scripts/verify-boundaries.js` - Boundary checks
- `scripts/verify-design-tokens.js` - Design token checks

## Resources

- [Design Tokens Guide](../guides/DESIGN_TOKENS.md)
- [Component Structure](../architecture/COMPONENTS.md)
- [Governance Rules](./GOVERNANCE.md)

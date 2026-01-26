# Accessibility Scanning Guide

This guide explains how to use the accessibility scanning tools in the Xala Platform UI package.

## Overview

The project includes multiple layers of accessibility scanning:

1. **Static Code Analysis** - Scans source code for common accessibility violations
2. **Storybook Accessibility Addon** - Interactive accessibility panel in Storybook
3. **Automated Storybook Tests** - Runs axe-core on all stories via test-runner
4. **E2E Accessibility Tests** - Playwright tests with axe-core for specific components

## Available Commands

### Static Code Analysis

```bash
# Run static accessibility verification
pnpm verify:accessibility

# Run all verifications (boundaries + design tokens + accessibility)
pnpm verify:all
```

**What it checks:**
- Missing `alt` attributes on images
- Missing ARIA labels on interactive elements
- `div`/`span` elements used as buttons/links without `role` attributes
- Hardcoded color values (should use design tokens)

### Storybook Accessibility Testing

```bash
# Run accessibility tests on all Storybook stories
pnpm test:a11y

# Alternative command
pnpm scan:a11y
```

**What it checks:**
- WCAG 2.1 Level AA compliance (via axe-core)
- All stories are automatically scanned
- Violations are reported with detailed information

### E2E Accessibility Tests

```bash
# Run E2E accessibility tests
pnpm test:e2e

# Run only accessibility E2E tests
pnpm test:e2e tests/e2e/accessibility.spec.ts
```

**What it checks:**
- WCAG compliance for specific components
- Keyboard accessibility
- Form label associations
- Image alt text
- Heading hierarchy
- Color contrast (design token usage)

## Accessibility Tools

### 1. Static Code Scanner (`verify-accessibility.js`)

Scans TypeScript/TSX files for common accessibility patterns:

- **Missing alt text**: Images without `alt` attributes
- **Missing ARIA labels**: Interactive elements without labels
- **Semantic HTML violations**: `div`/`span` used as buttons without `role`
- **Hardcoded colors**: Should use design tokens (`var(--ds-color-*)`)

**Usage:**
```bash
pnpm verify:accessibility
```

### 2. Storybook Accessibility Addon

The `@storybook/addon-a11y` provides an interactive accessibility panel in Storybook:

- **Accessibility tab**: Shows violations for the current story
- **Color blindness simulator**: Test color contrast
- **Keyboard navigation**: Test keyboard accessibility

**Access:** Open any story in Storybook and click the "Accessibility" tab.

### 3. Automated Storybook Test Runner

The `.storybook/test-runner.ts` configuration automatically runs axe-core on every story:

- **WCAG 2.1 Level AA**: Full compliance checking
- **Automatic scanning**: All stories are tested
- **Detailed reports**: HTML reports with violation details

**Configuration:**
- Located in `.storybook/test-runner.ts`
- Uses `axe-playwright` for scanning
- Can be disabled per story: `parameters: { a11y: { disable: true } }`

### 4. E2E Accessibility Tests

Playwright tests in `tests/e2e/accessibility.spec.ts`:

- **Component-specific tests**: Tests individual components
- **WCAG compliance**: Uses axe-core for automated checks
- **Custom checks**: Keyboard navigation, form labels, etc.

## Integration with CI/CD

All accessibility checks are integrated into the quality pipeline:

```bash
# Full quality check (includes accessibility)
pnpm quality

# This runs:
# - typecheck
# - lint
# - format:check
# - verify:all (includes verify:accessibility)
```

## Best Practices

### 1. Use Designsystemet Components

Always use Designsystemet components which have built-in accessibility:

```tsx
// ✅ Good - Designsystemet Button handles accessibility
import { Button } from '@digdir/designsystemet-react';
<Button>Click me</Button>

// ❌ Bad - Raw button without proper attributes
<button>Click me</button>
```

### 2. Provide ARIA Labels

For icon-only buttons or custom interactive elements:

```tsx
// ✅ Good
<button aria-label="Close dialog">
  <CloseIcon />
</button>

// ✅ Good - Using Designsystemet Button with aria-label
<Button aria-label="Close dialog">
  <CloseIcon />
</Button>
```

### 3. Use Semantic HTML

Prefer semantic elements over generic `div`/`span`:

```tsx
// ✅ Good
<button onClick={handleClick}>Action</button>
<a href="/path">Link</a>

// ❌ Bad
<div onClick={handleClick} role="button">Action</div>
```

### 4. Associate Form Labels

Always associate labels with form inputs:

```tsx
// ✅ Good
<Label htmlFor="email">Email</Label>
<Textfield id="email" />

// ✅ Good - Using aria-label
<Textfield aria-label="Email" />
```

### 5. Use Design Tokens

Always use design tokens for colors (ensures proper contrast):

```tsx
// ✅ Good
style={{ color: 'var(--ds-color-accent-text-default)' }}

// ❌ Bad
style={{ color: '#0062BA' }}
```

## Disabling Accessibility Checks

### Per Story (Storybook)

If a story needs to opt out of accessibility checks:

```tsx
export default {
  title: 'Components/Example',
  component: Example,
  parameters: {
    a11y: {
      disable: true, // Disable accessibility checks for this story
    },
  },
};
```

### Per Test (E2E)

Skip accessibility tests:

```ts
test.skip('Component with known issues', async ({ page }) => {
  // Test code
});
```

## Reporting Issues

When accessibility violations are found:

1. **Review the violation**: Understand what's wrong
2. **Check if it's a false positive**: Some violations may be acceptable
3. **Fix the issue**: Update the component to be accessible
4. **Re-run the scan**: Verify the fix

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [axe-core Documentation](https://github.com/dequelabs/axe-core)
- [Storybook Accessibility Addon](https://storybook.js.org/addons/@storybook/addon-a11y)
- [Designsystemet Accessibility](https://designsystemet.no/grunnleggende/universell-utforming/)

## Summary

The accessibility scanning setup provides:

✅ **Static code analysis** - Catches issues before runtime  
✅ **Interactive Storybook panel** - Manual testing and verification  
✅ **Automated story scanning** - All stories tested automatically  
✅ **E2E component tests** - Specific component accessibility checks  
✅ **CI/CD integration** - Quality gates ensure compliance  

All tools work together to ensure WCAG 2.1 Level AA compliance across all components.

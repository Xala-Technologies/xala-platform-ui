# Testing Guide

This directory contains comprehensive tests for the Xala Platform UI component library.

## Test Structure

```
tests/
├── setup.ts                    # Vitest global setup
├── test-utils.tsx              # Shared test utilities
├── unit/                       # Unit tests
│   ├── blocks/
│   └── patterns/
├── integration/                # Integration tests
│   └── patterns/
└── e2e/                        # End-to-end tests
    ├── *.spec.ts
    └── accessibility.spec.ts
```

## Running Tests

### Unit Tests
```bash
# Run all unit tests
pnpm test:unit

# Run in watch mode
pnpm test:unit:watch

# Run with coverage
pnpm test:unit:coverage
```

### Integration Tests
```bash
pnpm test:integration
```

### E2E Tests
```bash
# Run all E2E tests
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui

# Debug mode
pnpm test:e2e:debug
```

### All Tests
```bash
pnpm test:all
```

## Test Types

### Unit Tests
- Test individual components in isolation
- Mock dependencies
- Fast execution
- High coverage target: 70%+

### Integration Tests
- Test component interactions
- Test complete flows
- Use real component compositions

### E2E Tests
- Test user flows end-to-end
- Run against Storybook
- Include accessibility checks
- Cross-browser testing

## Writing Tests

### Unit Test Example
```typescript
import { describe, it, expect } from 'vitest';
import { render, screen } from '../test-utils';
import { MyComponent } from '../../../src/components/MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent title="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });
});
```

### E2E Test Example
```typescript
import { test, expect } from '@playwright/test';

test('component works correctly', async ({ page }) => {
  await page.goto('/iframe.html?id=components-mycomponent--default');
  await expect(page.getByText('Test')).toBeVisible();
});
```

## Test Utilities

### `test-utils.tsx`
- Custom render function with providers
- Mock handlers
- Async helpers

### `setup.ts`
- Global test configuration
- Mock implementations
- Cleanup handlers

## Coverage

Coverage reports are generated in the `coverage/` directory after running tests with coverage.

Target coverage:
- Lines: 70%
- Functions: 70%
- Branches: 70%
- Statements: 70%

## CI/CD

Tests run automatically on:
- Push to main/develop
- Pull requests
- All test suites must pass before merge

## Accessibility Testing

Accessibility tests use `@axe-core/playwright` to ensure WCAG 2.1 AA compliance.

Run accessibility tests:
```bash
pnpm test:e2e tests/e2e/accessibility.spec.ts
```

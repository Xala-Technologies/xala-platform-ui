# Storybook Testing Guide

## Overview

This design system includes comprehensive testing infrastructure:

1. **Smoke Tests** - Story renders without errors
2. **Accessibility Tests** - WCAG 2.1 AA compliance via axe-core
3. **Interaction Tests** - User interactions via play functions
4. **Visual Regression** - Screenshot comparison via Chromatic

---

## 1. Storybook Test Runner

### What It Tests

- ✅ Every story renders without errors
- ✅ Accessibility violations (WCAG 2.1 AA)
- ✅ Interaction tests (play functions)

### Running Tests

```bash
# Development (requires Storybook to be running)
pnpm storybook        # Terminal 1
pnpm test:storybook   # Terminal 2

# CI (builds Storybook first)
pnpm test:storybook:ci
```

### Configuration

Test runner config: `.storybook/test-runner.ts`

```typescript
// Automatically injects axe-core and runs a11y checks
// on every story unless disabled
```

### Disabling A11y for Specific Stories

```tsx
export const MyStory: Story = {
  args: { ... },
  parameters: {
    a11y: {
      disable: true,  // Skip a11y tests for this story
    },
  },
};
```

---

## 2. Accessibility Testing

### What It Checks

- ✅ Color contrast ratios (WCAG AA)
- ✅ Keyboard navigation
- ✅ ARIA attributes
- ✅ Form labels
- ✅ Heading hierarchy
- ✅ Alt text for images

### Running A11y Tests

```bash
# Same as test-runner (includes a11y)
pnpm test:a11y
```

### A11y Rules

Configured in `.storybook/test-runner.ts`:

```typescript
runOnly: {
  type: 'tag',
  values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
}
```

### Fixing A11y Violations

Common issues:

**1. Missing ARIA labels**
```tsx
// ❌ BAD
<button>
  <Icon name="close" />
</button>

// ✅ GOOD
<button aria-label="Close">
  <Icon name="close" />
</button>
```

**2. Low color contrast**
```tsx
// ❌ BAD
<Text style={{ color: '#999', background: '#fff' }}>
  Low contrast text
</Text>

// ✅ GOOD - Use design tokens
<Text style={{ color: 'var(--ds-color-neutral-text-default)' }}>
  Proper contrast text
</Text>
```

**3. Missing form labels**
```tsx
// ❌ BAD
<input type="text" placeholder="Name" />

// ✅ GOOD
<label htmlFor="name">Name</label>
<input id="name" type="text" />
```

---

## 3. Interaction Testing

### What It Tests

- ✅ User interactions (clicks, typing, etc.)
- ✅ State changes
- ✅ Event handlers
- ✅ Form submissions

### Writing Interaction Tests

```tsx
import { expect, userEvent, within } from '@storybook/test';

export const WithInteraction: Story = {
  args: {
    onSubmit: fn(),  // Mock function
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    
    // Find elements
    const input = canvas.getByRole('textbox', { name: /name/i });
    const button = canvas.getByRole('button', { name: /submit/i });
    
    // Interact
    await userEvent.type(input, 'John Doe');
    await userEvent.click(button);
    
    // Assert
    await expect(args.onSubmit).toHaveBeenCalledWith({
      name: 'John Doe',
    });
  },
};
```

### Best Practices

1. **Use Semantic Queries**
   ```tsx
   // ✅ GOOD - Accessible queries
   canvas.getByRole('button', { name: /submit/i })
   canvas.getByLabelText(/email/i)
   
   // ❌ BAD - Fragile queries
   canvas.getByTestId('submit-btn')
   canvas.querySelector('.submit-button')
   ```

2. **Test User Flows**
   ```tsx
   // Test complete user journey
   await userEvent.type(emailInput, 'user@example.com');
   await userEvent.type(passwordInput, 'password123');
   await userEvent.click(submitButton);
   await expect(successMessage).toBeVisible();
   ```

3. **Mock Functions**
   ```tsx
   import { fn } from '@storybook/test';
   
   export const Interactive: Story = {
     args: {
       onClick: fn(),  // Automatically tracked
     },
   };
   ```

---

## 4. Visual Regression Testing

### What It Tests

- ✅ Visual changes across browsers
- ✅ Responsive design
- ✅ Theme variations
- ✅ Component states

### Setup Chromatic

1. **Create Chromatic Account**
   - Visit https://www.chromatic.com/
   - Connect GitHub repository

2. **Get Project Token**
   ```bash
   # Add to .env
   CHROMATIC_PROJECT_TOKEN=your-token-here
   ```

3. **Update Config**
   ```json
   // chromatic.config.json
   {
     "projectId": "your-project-id"
   }
   ```

### Running Visual Tests

```bash
# Local (requires CHROMATIC_PROJECT_TOKEN)
pnpm test:visual

# CI (auto-accept changes on main branch)
pnpm test:visual:ci
```

### Reviewing Changes

1. Chromatic creates build
2. Compares screenshots
3. Flags visual changes
4. Review in Chromatic UI
5. Accept or reject changes

### Best Practices

1. **Capture All States**
   ```tsx
   export const AllStates: Story = {
     render: () => (
       <Stack>
         <Button>Default</Button>
         <Button disabled>Disabled</Button>
         <Button loading>Loading</Button>
       </Stack>
     ),
   };
   ```

2. **Test Responsive**
   ```tsx
   export const Responsive: Story = {
     parameters: {
       viewport: {
         viewports: {
           mobile: { width: 375, height: 667 },
           tablet: { width: 768, height: 1024 },
           desktop: { width: 1920, height: 1080 },
         },
       },
     },
   };
   ```

3. **Skip Flaky Stories**
   ```tsx
   export const FlakyStory: Story = {
     tags: ['skip-test'],  // Skip in test-runner
     parameters: {
       chromatic: { disable: true },  // Skip in Chromatic
     },
   };
   ```

---

## 5. CI Integration

### GitHub Actions Workflow

```yaml
# .github/workflows/platform-quality.yml
storybook-tests:
  name: Storybook Tests
  runs-on: ubuntu-latest
  steps:
    - name: Checkout
      uses: actions/checkout@v4
      with:
        fetch-depth: 0  # Required for Chromatic

    - name: Install
      run: pnpm install

    - name: Run Test Runner
      run: pnpm -F @xala-technologies/platform test:storybook:ci

    - name: Run Visual Regression
      run: pnpm -F @xala-technologies/platform test:visual:ci
      env:
        CHROMATIC_PROJECT_TOKEN: ${{ secrets.CHROMATIC_PROJECT_TOKEN }}
```

---

## 6. Debugging Tests

### Test Runner Debugging

```bash
# Run with debug output
DEBUG=pw:api pnpm test:storybook

# Run specific story
pnpm test:storybook --stories-filter="Button"

# Update snapshots
pnpm test:storybook --update-snapshots
```

### Interaction Test Debugging

```tsx
export const Debug: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Add debugger
    debugger;
    
    // Log elements
    console.log(canvas.getAllByRole('button'));
    
    // Pause execution
    await new Promise(resolve => setTimeout(resolve, 5000));
  },
};
```

### Visual Test Debugging

```bash
# Run Chromatic with debug
DEBUG=chromatic-cli pnpm test:visual

# Only test changed stories
pnpm test:visual --only-changed
```

---

## 7. Coverage Reports

### Generating Coverage

```bash
# Run tests with coverage
pnpm test:storybook --coverage

# View coverage report
open coverage/index.html
```

### Coverage Thresholds

Target coverage:
- **Statements:** 80%
- **Branches:** 75%
- **Functions:** 80%
- **Lines:** 80%

---

## 8. Common Issues

### Issue: Test Runner Hangs

**Solution:**
```bash
# Kill existing Storybook processes
pkill -f storybook

# Clear cache
rm -rf node_modules/.cache

# Restart
pnpm storybook
```

### Issue: A11y False Positives

**Solution:**
```tsx
// Disable specific rules
export const Story: Story = {
  parameters: {
    a11y: {
      config: {
        rules: [
          { id: 'color-contrast', enabled: false },
        ],
      },
    },
  },
};
```

### Issue: Chromatic Timeout

**Solution:**
```json
// chromatic.config.json
{
  "exitOnceUploaded": true,
  "buildScriptName": "storybook:build"
}
```

---

## Resources

- [Storybook Test Runner](https://storybook.js.org/docs/writing-tests/test-runner)
- [Axe-core Rules](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md)
- [Chromatic Documentation](https://www.chromatic.com/docs/)
- [Testing Library](https://testing-library.com/docs/queries/about)

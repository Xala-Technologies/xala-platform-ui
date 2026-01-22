# UI Package Governance

> **Last Updated:** 2026-01-22

## Overview

This document defines the governance rules, quality gates, and automated checks for the `@xala-technologies/platform-ui` package.

## Core Principles

### 1. UI Components Only
- **Pure presentation components** - No business logic
- **No API calls** - Components receive data via props
- **No authentication** - Auth is handled by platform package
- **No i18n** - Translations are in platform package

### 2. Minimal Dependencies
- Only UI-related dependencies allowed
- No platform package dependencies
- No database schema dependencies
- No domain-specific packages

### 3. Accessibility First
- All components must be WCAG 2.1 AA compliant
- Keyboard navigation required
- Screen reader support required
- Proper ARIA attributes

## ESLint Boundary Rules

The package enforces strict boundaries via ESLint:

### ❌ Forbidden Imports
```typescript
// NEVER import from platform packages
import { useAuth } from '@xala-technologies/platform/auth'; // ❌ VIOLATION
import { UserSchema } from '@xala-technologies/platform-schema'; // ❌ VIOLATION
import { rules } from '@xala-technologies/governance'; // ❌ VIOLATION
```

### ✅ Allowed Imports
```typescript
// Only UI libraries and React
import { Button } from '@digdir/designsystemet-react'; // ✅
import { HomeIcon } from 'lucide-react'; // ✅
import React from 'react'; // ✅
```

## Quality Gates

All code must pass these checks before merging:

### 1. Type Checking
```bash
pnpm typecheck
```
- Zero TypeScript errors
- Strict mode enabled
- No `any` types (warnings allowed)

### 2. Linting
```bash
pnpm lint
```
- ESLint rules pass
- No boundary violations
- React best practices enforced

### 3. Formatting
```bash
pnpm format:check
```
- Prettier formatting enforced
- Consistent code style

### 4. Build
```bash
pnpm build
```
- Package builds successfully
- No build errors
- All entry points valid

### 5. Storybook
```bash
pnpm storybook:build
```
- Storybook builds without errors
- All stories render correctly

## Automated Checks

### GitHub Actions

**CI Workflow** (`.github/workflows/ci.yml`)
- Runs on every push and PR
- Executes all quality gates
- Blocks merge if checks fail

**Publish Workflow** (`.github/workflows/publish.yml`)
- Runs on version tags
- Executes quality gates
- Publishes to GitHub Packages

### Pre-publish Hook

The `prepublishOnly` script runs automatically:
```bash
pnpm quality && pnpm build
```

This ensures no broken code is published.

## Component Standards

### File Structure
```typescript
// src/primitives/Button.tsx
import { Button as DSButton } from '@digdir/designsystemet-react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ children, onClick, variant, disabled }: ButtonProps) {
  return (
    <DSButton 
      data-color={variant === 'primary' ? 'accent' : 'neutral'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </DSButton>
  );
}
```

### Requirements
1. **TypeScript interfaces** for all props
2. **JSDoc comments** for public APIs
3. **Storybook stories** for all components
4. **Accessibility** - keyboard and screen reader support
5. **No side effects** - pure presentation only

## Storybook Documentation

Every component must have:

### 1. Story File
```typescript
// src/stories/Components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../primitives/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};
```

### 2. Documentation
- Component description
- Props documentation
- Usage examples
- Accessibility notes

## Versioning

We follow **Semantic Versioning** (semver):

- **Major** (1.0.0 → 2.0.0): Breaking changes
- **Minor** (1.0.0 → 1.1.0): New features (backward compatible)
- **Patch** (1.0.0 → 1.0.1): Bug fixes

### Breaking Changes
Breaking changes require:
1. Major version bump
2. Migration guide in CHANGELOG
3. Deprecation warnings (if possible)

## Publishing Process

### Manual Publish
```bash
# 1. Update version in package.json
# 2. Update CHANGELOG.md
# 3. Commit changes
git add package.json CHANGELOG.md
git commit -m "chore: bump version to 1.1.0"

# 4. Create tag
git tag v1.1.0

# 5. Push
git push origin main --tags

# GitHub Actions will automatically publish
```

### Automated Publish
- Push a version tag (`v*`)
- GitHub Actions runs quality checks
- If all pass, publishes to GitHub Packages

## Rollback Procedure

If a bad version is published:

1. **Unpublish** (if within 72 hours)
```bash
npm unpublish @xala-technologies/platform-ui@1.1.0
```

2. **Deprecate** (after 72 hours)
```bash
npm deprecate @xala-technologies/platform-ui@1.1.0 "This version has issues, use 1.1.1 instead"
```

3. **Publish fix**
```bash
# Fix the issue
# Bump patch version
# Publish new version
```

## Monitoring

### Package Health
- Check GitHub Actions status
- Monitor npm download stats
- Review GitHub issues

### Quality Metrics
- ESLint violations: 0
- TypeScript errors: 0
- Build failures: 0
- Storybook errors: 0

## Enforcement

### Automated
- ESLint catches boundary violations
- TypeScript catches type errors
- GitHub Actions blocks bad PRs
- Pre-publish hook prevents bad releases

### Manual
- Code review required for all PRs
- Maintainer approval required
- Breaking changes need extra review

## Questions?

- **Governance issues**: Create issue in this repository
- **Rule clarifications**: Check AGENTS.md
- **Migration help**: See UI_PACKAGE_MIGRATION.md in platform repo

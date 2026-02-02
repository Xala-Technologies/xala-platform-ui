---
description: Run all verification checks on the codebase
---

# /qa-verify

Runs comprehensive verification checks to ensure code quality and compliance.

## Usage

```
/qa-verify [<target>] [--fix]
```

## What It Checks

### Foundation Compliance
- ✅ Provider order in main.tsx
- ✅ Style import correctness
- ✅ Thin App pattern (only main.tsx in src/)
- ✅ No raw HTML elements
- ✅ Gazetteer structure

### Code Quality
- ✅ TypeScript compilation
- ✅ ESLint rules
- ✅ Design token usage (no hardcoded colors)

### Tests
- ✅ Unit tests pass
- ✅ Integration tests pass
- ✅ E2E tests pass

## Commands

```bash
# Foundation validation
node packages/gazetteer/scripts/validate-foundation.mjs apps/<app>

# TypeScript
pnpm typecheck

# Lint
pnpm lint

# Tests
pnpm test              # Unit + integration
pnpm test:e2e          # E2E Playwright

# All at once
pnpm test:all
```

## Auto-Fix

With `--fix` flag:
```bash
pnpm lint --fix
```

## CI Integration

Add to CI pipeline:
```yaml
- run: pnpm typecheck
- run: pnpm lint
- run: pnpm test
- run: pnpm test:e2e
```

## Verification Report

Produces summary:
```
✅ Foundation: Valid
✅ TypeScript: No errors
✅ Lint: 0 warnings
✅ Tests: 24/24 passed
✅ E2E: 12/12 passed

VERIFICATION: PASSED
```

## Next Steps
If verification passes, run:
- `/deploy-build` to build for production

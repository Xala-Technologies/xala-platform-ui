## Description

<!-- What does this PR do? Please provide a brief summary of the changes. -->

## Type of Change

- [ ] New component
- [ ] Bug fix
- [ ] Enhancement
- [ ] Refactoring
- [ ] Documentation
- [ ] Build/CI configuration
- [ ] Other (please describe)

## Design Artifacts (for new components)

<!-- If adding a new component, ensure these artifacts exist: -->

- [ ] Spec: `specs/<ComponentName>/SPEC.md`
- [ ] Compose: `specs/<ComponentName>/COMPOSE.json`
- [ ] Test IDs: `specs/<ComponentName>/TESTIDS.json`
- [ ] Approval: `specs/<ComponentName>/APPROVAL.json`

## Component Layer

<!-- Which layer does this component belong to? -->

- [ ] primitives (Level 0) - Thin Designsystemet wrappers
- [ ] composed (Level 1) - Multi-component compositions
- [ ] blocks (Level 2) - Feature-specific UI blocks
- [ ] patterns (Level 3) - Reusable UI patterns
- [ ] shells (Level 4) - Layout components
- [ ] pages (Level 5) - Page-level components
- [ ] N/A (not a component change)

## Checklist

### Required

- [ ] `pnpm quality` passes (typecheck + lint + format:check)
- [ ] `pnpm verify:boundaries` passes (layer hierarchy enforced)
- [ ] `pnpm verify:design-tokens` passes (Designsystemet compliance)
- [ ] Storybook story added/updated in `src/stories/`
- [ ] TypeScript types exported from appropriate index file
- [ ] No business logic introduced (pure presentation only)
- [ ] No forbidden imports (platform, platform-schema, governance)

### For New Components

- [ ] Component follows Designsystemet patterns
- [ ] Uses only `@digdir/designsystemet-react` components
- [ ] Uses only `--ds-*` design tokens for styling
- [ ] Accessibility requirements documented and implemented
- [ ] Props documented with JSDoc comments
- [ ] Story includes all relevant variants and states

### For Breaking Changes

- [ ] Version bump required (major version for breaking API changes)
- [ ] Migration guide provided in PR description
- [ ] Deprecation warnings added if applicable

## Screenshots / Storybook Preview

<!-- If applicable, add screenshots or link to Storybook preview -->

## Related Issues

<!-- Link any related issues: Fixes #123, Relates to #456 -->

## Testing Instructions

<!-- How can reviewers test these changes? -->

1.
2.
3.

## Additional Notes

<!-- Any other context, design decisions, or considerations -->

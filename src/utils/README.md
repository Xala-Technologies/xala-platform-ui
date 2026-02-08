# Shared Utilities

This directory contains shared utility functions and components used across the UI package.

## Design System Compliance

All utilities in this directory follow Designsystemet design token rules:

### ✅ Allowed Patterns

1. **Design Token Variables**: All colors, spacing, typography, and border radius use `var(--ds-*)` tokens
2. **Layout Properties**: CSS properties like `display`, `alignItems`, `whiteSpace` that don't have design token equivalents are acceptable
3. **Dynamic Sizing**: When design tokens don't support specific sizes (e.g., custom icon sizes), dynamic pixel values are acceptable

### Example: Compliant Badge Component

```typescript
// ✅ CORRECT - Uses design tokens
style={{
  padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
  fontSize: 'var(--ds-font-size-xs)',
  backgroundColor: 'var(--ds-color-neutral-surface-hover)',
  color: 'var(--ds-color-neutral-text-default)',
  borderRadius: 'var(--ds-border-radius-md)',
  display: 'inline-flex', // Layout property - no design token equivalent
  alignItems: 'center', // Layout property - no design token equivalent
}}
```

### ❌ Avoided Patterns

1. **Hard-coded Colors**: Never use `#0062BA` or `rgb()` - always use design tokens
2. **Hard-coded Spacing**: Never use `16px` or `1rem` - always use `var(--ds-spacing-*)`
3. **Hard-coded Typography**: Never use `14px` - always use `var(--ds-font-size-*)`

## Utilities

### Icons (`icons.tsx`)

Reusable icon components using inline SVG. All icons are accessible and follow Designsystemet principles.

### Badges (`badges.tsx`)

Badge rendering utilities that use design tokens for all colors, spacing, and typography.

### Status (`status.tsx`)

Status indicator utilities with color mappings using design tokens.

## Verification

All utilities pass the design token verification:

```bash
pnpm verify:design-tokens
```

The guardrails check ensures:

- ✅ All colors use `var(--ds-color-*)`
- ✅ All spacing uses `var(--ds-spacing-*)`
- ✅ All typography uses `var(--ds-font-size-*)`
- ✅ All border radius uses `var(--ds-border-radius-*)`
- ✅ Layout properties (display, alignItems, etc.) are acceptable when no design token exists

# Responsive Design Scanning Guide

This guide explains how to use the responsive design scanning tools to ensure your components follow responsive design best practices.

## Overview

The responsive design scanner checks for common responsive design violations:

- **Fixed pixel widths/heights** - Should use responsive units (%, rem, em, vw, vh) or design tokens
- **Small touch targets** - Interactive elements should be at least 44x44px (WCAG 2.5.5)
- **Fixed font sizes** - Should use rem, em, or design tokens
- **Hardcoded z-index** - Should use design tokens
- **Non-responsive images** - Images should have max-width: 100% or width: 100%
- **Tables without wrappers** - Tables should be wrapped in responsive containers
- **Missing container queries** - Prefer container queries over media queries for component-level responsiveness

## Commands

### Static Code Analysis

```bash
# Run responsive design verification
pnpm verify:responsive

# Run all verifications (boundaries, design tokens, accessibility, responsive)
pnpm verify:all
```

### Integration with Quality Checks

The responsive design scanner is automatically included in:

```bash
# Full quality check (includes responsive scanning)
pnpm quality
```

## What Gets Scanned

The scanner analyzes:

- **TypeScript/TSX files** (`.ts`, `.tsx`, `.jsx`)
- **CSS files** (`.css`)
- **Source files** in `packages/platform-ui/src/`

### Excluded Files

The scanner automatically excludes:
- Storybook stories (`src/stories/`)
- Storybook config (`.storybook/`)
- Scripts (`scripts/`)
- Theme files (`src/themes/`) - May define fixed design tokens
- Token definitions (`src/tokens/`)

## Violation Types

### 1. Fixed Pixel Widths/Heights

**Issue**: Using fixed `px` values for widths/heights instead of responsive units.

**Example Violation**:
```tsx
// ❌ Bad
<div style={{ width: '500px', height: '300px' }}>

// ✅ Good
<div style={{ width: '100%', maxWidth: '500px', height: 'auto' }}>
// Or use design tokens
<div style={{ width: 'var(--ds-size-container-md)' }}>
```

**Allowed Exceptions**:
- Values ≤ 24px (likely icons or decorative elements)
- Design tokens: `var(--ds-*)`
- Responsive units: `%`, `rem`, `em`, `vw`, `vh`
- CSS functions: `calc()`, `clamp()`, `min()`, `max()`

### 2. Small Touch Targets

**Issue**: Interactive elements smaller than 44x44px violate WCAG 2.5.5.

**Example Violation**:
```tsx
// ❌ Bad
<button style={{ width: '32px', height: '32px' }}>×</button>

// ✅ Good
<button style={{ width: '44px', height: '44px', minWidth: '44px', minHeight: '44px' }}>×</button>
```

**Note**: The scanner only flags interactive elements (buttons, elements with `onClick`, `cursor: pointer`).

### 3. Fixed Font Sizes

**Issue**: Using fixed `px` for font sizes instead of responsive units.

**Example Violation**:
```tsx
// ❌ Bad
<div style={{ fontSize: '16px' }}>

// ✅ Good
<div style={{ fontSize: '1rem' }}>
// Or use design tokens
<div style={{ fontSize: 'var(--ds-font-size-md)' }}>
```

### 4. Hardcoded Z-Index

**Issue**: Using hardcoded z-index values instead of design tokens.

**Example Violation**:
```tsx
// ❌ Bad
<div style={{ zIndex: 1000 }}>

// ✅ Good
<div style={{ zIndex: 'var(--ds-z-index-modal)' }}>
```

### 5. Non-Responsive Images

**Issue**: Images without responsive attributes may overflow on small screens.

**Example Violation**:
```tsx
// ❌ Bad
<img src="/image.jpg" alt="Description" />

// ✅ Good
<img src="/image.jpg" alt="Description" style={{ maxWidth: '100%', height: 'auto' }} />
// Or wrap in responsive container
<div style={{ width: '100%', overflow: 'hidden' }}>
  <img src="/image.jpg" alt="Description" />
</div>
```

### 6. Tables Without Wrappers

**Issue**: Tables without responsive wrappers may overflow on mobile.

**Example Violation**:
```tsx
// ❌ Bad
<table>
  <thead>...</thead>
  <tbody>...</tbody>
</table>

// ✅ Good
<div style={{ overflowX: 'auto', width: '100%' }}>
  <table>
    <thead>...</thead>
    <tbody>...</tbody>
  </table>
</div>
```

## Best Practices

### 1. Use Responsive Units

Prefer responsive units over fixed pixels:

```tsx
// ✅ Responsive units
width: '100%'
width: '50rem'
width: '80vw'
height: '100vh'
fontSize: '1rem'
padding: 'var(--ds-spacing-4)'
```

### 2. Use Design Tokens

Design tokens provide consistent, responsive values:

```tsx
// ✅ Design tokens
width: 'var(--ds-size-container-md)'
padding: 'var(--ds-spacing-4)'
fontSize: 'var(--ds-font-size-md)'
zIndex: 'var(--ds-z-index-modal)'
```

### 3. Use Container Queries

Prefer container queries for component-level responsiveness:

```css
/* ✅ Container query (component-level) */
@container ds-container (min-width: 600px) {
  .component {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Media query (viewport-level) */
@media (min-width: 768px) {
  .layout {
    display: flex;
  }
}
```

### 4. Mobile-First Approach

Start with mobile styles, then enhance for larger screens:

```tsx
// ✅ Mobile-first
<div style={{
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--ds-spacing-4)',
  // Desktop: use container query or media query
}}>
```

### 5. Ensure Touch Targets

All interactive elements should be at least 44x44px:

```tsx
// ✅ Minimum touch target
<button style={{
  minWidth: '44px',
  minHeight: '44px',
  padding: 'var(--ds-spacing-2)',
}}>
  Click me
</button>
```

### 6. Responsive Images

Always make images responsive:

```tsx
// ✅ Responsive image
<img
  src="/image.jpg"
  alt="Description"
  style={{
    maxWidth: '100%',
    height: 'auto',
    display: 'block',
  }}
/>
```

## CI/CD Integration

The responsive design scanner runs automatically in CI:

```yaml
# .github/workflows/ci.yml
- name: Verify responsive design
  run: pnpm verify:responsive
```

All verification steps must pass before merging PRs.

## Disabling Checks

If you need to disable responsive checks for specific files:

1. **Move to excluded directory**: Place files in `src/stories/` or `src/themes/`
2. **Use design tokens**: Replace fixed values with design tokens
3. **Add comments**: The scanner skips commented code

## Troubleshooting

### False Positives

The scanner may flag false positives for:
- Design tokens (already handled)
- Very small decorative elements (≤ 24px)
- Commented code

### Common Issues

**Issue**: Scanner flags design token usage
**Solution**: Ensure tokens use `var(--ds-*)` format

**Issue**: Scanner flags icon sizes
**Solution**: Icons ≤ 24px are automatically excluded

**Issue**: Scanner flags Storybook examples
**Solution**: Storybook files are automatically excluded

## Related Documentation

- [Design Tokens Guide](./DESIGN_TOKENS.md)
- [Accessibility Scanning Guide](./ACCESSIBILITY_SCANNING.md)
- [Component Architecture](../architecture/ARCHITECTURE.md)

## Resources

- [WCAG 2.5.5 - Target Size](https://www.w3.org/WAI/WCAG21/Understanding/target-size.html)
- [MDN: Responsive Design](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design)
- [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Container_Queries)

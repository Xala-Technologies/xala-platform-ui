# Responsive Design Violations Report

Generated: $(date)

## Summary

- **Total files scanned**: 714
- **Files with violations**: 33
- **Violation rate**: 4.6%

## Violation Types

### 1. Image Without Responsive Attributes (Most Common)
- **Count**: ~40+ occurrences across 30+ files
- **Issue**: Images without `max-width: 100%` or `width: 100%` may overflow on small screens
- **Priority**: HIGH - Real responsive design issue
- **Fix**: Add `style={{ maxWidth: '100%', height: 'auto' }}` to all `<img>` tags

### 2. Fixed Pixel Widths
- **Count**: ~20+ occurrences across 5+ files
- **Issue**: Fixed `px` widths instead of responsive units or design tokens
- **Priority**: MEDIUM - Should use %, rem, em, vw, or design tokens
- **Fix**: Replace fixed widths with responsive units or `var(--ds-size-*)` tokens

### 3. Fixed Pixel Heights
- **Count**: ~14 occurrences in 1 file (`features/booking/engine/styles.ts`)
- **Issue**: Fixed `px` heights instead of responsive units
- **Priority**: MEDIUM
- **Fix**: Replace with responsive units or design tokens

### 4. Fixed Pixel Font Sizes
- **Count**: ~3 occurrences in 1 file (`features/booking/engine/styles.ts`)
- **Issue**: Fixed `px` font sizes instead of rem/em or design tokens
- **Priority**: MEDIUM
- **Fix**: Replace with `rem`, `em`, or `var(--ds-font-size-*)` tokens

### 5. Tables Without Responsive Wrappers
- **Count**: ~2 occurrences in 2 files
- **Issue**: Tables may overflow on mobile without responsive wrappers
- **Priority**: MEDIUM
- **Fix**: Wrap tables in `<div style={{ overflowX: 'auto', width: '100%' }}>`

### 6. Hardcoded Z-Index
- **Count**: ~1 occurrence in 1 file
- **Issue**: Hardcoded z-index instead of design tokens
- **Priority**: LOW
- **Fix**: Use `var(--ds-z-index-*)` tokens

## Top Violating Files

### High Priority (Images)
- `MediaResourceCard.tsx` - 3 image violations
- `ResourceCard.tsx` (patterns) - 3 image violations
- `ImageSlider.tsx` - 2 image violations
- `ImageGallery.tsx` - 2 image violations + 1 fixed width
- `ResourceListItem.tsx` - 2 image violations

### Medium Priority (Fixed Sizes)
- `features/booking/engine/styles.ts` - 16 fixed widths, 14 fixed heights, 3 fixed font sizes, 1 hardcoded z-index
- `header-parts.tsx` - 1 fixed width + 1 image violation
- `LoginComponents.tsx` - 1 fixed width + 2 image violations
- `BookingFormModal.tsx` - 1 fixed width

### Low Priority (Tables)
- `TemplateCanvas.tsx` - 1 table wrapper + 1 image violation

## Recommendations

### Immediate Actions

1. **Fix Non-Responsive Images** (HIGH Priority)
   - Add `maxWidth: '100%'` and `height: 'auto'` to all `<img>` tags
   - Or wrap images in responsive containers

2. **Replace Fixed Pixel Values** (MEDIUM Priority)
   - Replace fixed widths/heights with responsive units or design tokens
   - Focus on `features/booking/engine/styles.ts` first (largest violation count)

3. **Wrap Tables** (MEDIUM Priority)
   - Wrap all `<table>` elements in responsive containers with `overflowX: 'auto'`

### Code Examples

#### Fix Images
```tsx
// ❌ Before
<img src="/image.jpg" alt="Description" />

// ✅ After
<img 
  src="/image.jpg" 
  alt="Description"
  style={{ maxWidth: '100%', height: 'auto' }}
/>
```

#### Fix Fixed Widths
```tsx
// ❌ Before
<div style={{ width: '500px' }}>

// ✅ After
<div style={{ width: '100%', maxWidth: 'var(--ds-size-container-md)' }}>
// Or
<div style={{ width: '50rem' }}>
```

#### Fix Tables
```tsx
// ❌ Before
<table>
  <thead>...</thead>
  <tbody>...</tbody>
</table>

// ✅ After
<div style={{ overflowX: 'auto', width: '100%' }}>
  <table>
    <thead>...</thead>
    <tbody>...</tbody>
  </table>
</div>
```

## Commands

```bash
# Static code analysis (this report)
pnpm verify:responsive

# Run all verifications
pnpm verify:all

# Full quality check
pnpm quality
```

## Next Steps

1. Fix image responsiveness (highest impact)
2. Refactor `features/booking/engine/styles.ts` to use responsive units
3. Add responsive wrappers to tables
4. Replace hardcoded z-index values with design tokens

## Related Documentation

- [Responsive Design Scanning Guide](./docs/guides/RESPONSIVE_DESIGN_SCANNING.md)
- [Design Tokens Guide](./docs/guides/DESIGN_TOKENS.md)
- [Accessibility Scanning Guide](./docs/guides/ACCESSIBILITY_SCANNING.md)

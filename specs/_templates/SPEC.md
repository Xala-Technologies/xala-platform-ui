# {{ComponentName}} Specification

## Overview

**Component Name:** {{ComponentName}}
**Layer:** {{layer}} (Level {{level}})
**Status:** Draft
**Created:** {{date}}
**Last Updated:** {{date}}

### Purpose

<!-- Brief description of what this component does and why it exists -->

### User Stories

| ID | Story | Priority |
|----|-------|----------|
| US-001 | As a {{role}}, I want to {{action}}, so that {{benefit}} | High |
| US-002 | | Medium |
| US-003 | | Low |

---

## Visual Design

### Layout

<!-- Describe the visual structure, dimensions, and spacing -->

```
┌─────────────────────────────────────────┐
│                                         │
│    [Visual representation of layout]    │
│                                         │
└─────────────────────────────────────────┘
```

### Variants

| Variant | Description | Use Case |
|---------|-------------|----------|
| default | Standard appearance | General use |
| compact | Reduced spacing | Dense layouts |
| expanded | Full-width/height | Featured content |

### States

| State | Visual Indicator | User Action |
|-------|------------------|-------------|
| default | Normal appearance | None |
| hover | Subtle highlight | Mouse over |
| focus | Focus ring | Keyboard navigation |
| active | Pressed appearance | Click/tap |
| disabled | Reduced opacity | N/A |
| loading | Skeleton/spinner | Async operation |
| error | Error styling | Validation failure |
| empty | Empty state message | No data |

---

## Props Interface

```typescript
export interface {{ComponentName}}Props {
  /**
   * Primary content to display
   */
  children?: React.ReactNode;

  /**
   * Visual variant
   * @default 'default'
   */
  variant?: 'default' | 'compact' | 'expanded';

  /**
   * Component size
   * @default 'medium'
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Color theme
   * @default 'neutral'
   */
  color?: 'neutral' | 'accent' | 'brand1' | 'brand2' | 'brand3';

  /**
   * Loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Disabled state
   * @default false
   */
  disabled?: boolean;

  /**
   * Additional CSS class names
   */
  className?: string;

  /**
   * Callback fired on interaction
   */
  onAction?: (event: React.MouseEvent) => void;
}
```

---

## Data Requirements

### Input Data

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| | | | |

### Output Events

| Event | Payload | Description |
|-------|---------|-------------|
| onAction | `{ id: string }` | Fired when user interacts |
| onChange | `{ value: T }` | Fired when value changes |

---

## Composition

### Designsystemet Components Used

| Component | Purpose | Import Path |
|-----------|---------|-------------|
| Card | Container | `@digdir/designsystemet-react` |
| Heading | Title | `@digdir/designsystemet-react` |
| Paragraph | Description | `@digdir/designsystemet-react` |
| Button | Actions | `@digdir/designsystemet-react` |

### Internal Components Used

| Component | Layer | Purpose |
|-----------|-------|---------|
| | | |

### Composition Structure

```
{{ComponentName}}
├── Card (wrapper)
│   ├── Heading (title)
│   ├── Paragraph (description)
│   └── Box (actions)
│       └── Button (primary action)
```

---

## Accessibility

### WCAG 2.1 AA Requirements

- [ ] **1.1.1 Non-text Content** - All images have alt text
- [ ] **1.3.1 Info and Relationships** - Semantic HTML structure
- [ ] **1.4.3 Contrast** - Minimum 4.5:1 text contrast
- [ ] **2.1.1 Keyboard** - All interactive elements keyboard accessible
- [ ] **2.4.3 Focus Order** - Logical tab order
- [ ] **2.4.7 Focus Visible** - Clear focus indicators
- [ ] **4.1.2 Name, Role, Value** - ARIA attributes correct

### Keyboard Navigation

| Key | Action |
|-----|--------|
| Tab | Move focus to next element |
| Shift+Tab | Move focus to previous element |
| Enter | Activate focused element |
| Space | Activate focused element |
| Escape | Close/cancel if applicable |

### Screen Reader Behavior

<!-- Describe how the component should be announced -->

---

## Implementation Notes

### Do's

- Use Designsystemet components exclusively
- Use `data-color` and `data-size` attributes for styling
- Emit events via callbacks, never handle business logic
- Support all standard HTML attributes via spreading

### Don'ts

- Don't use raw HTML elements (div, span, etc.)
- Don't use inline styles (except `var(--ds-*)` tokens)
- Don't make API calls or handle authentication
- Don't implement i18n - accept translated strings as props

### Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Empty data | Show empty state message |
| Long text | Truncate with ellipsis |
| Many items | Implement pagination/virtualization |
| Network error | Show error state |

---

## Test Scenarios

### Unit Tests

| Test ID | Scenario | Expected Result |
|---------|----------|-----------------|
| T-001 | Renders with default props | Component mounts without errors |
| T-002 | Handles loading state | Shows loading indicator |
| T-003 | Handles error state | Shows error message |
| T-004 | Fires onAction callback | Callback invoked with correct payload |

### Accessibility Tests

| Test ID | Scenario | Expected Result |
|---------|----------|-----------------|
| A-001 | axe-core scan | No violations |
| A-002 | Keyboard navigation | All elements focusable |
| A-003 | Screen reader test | Correct announcements |

### Visual Regression Tests

| Test ID | Scenario | Expected Result |
|---------|----------|-----------------|
| V-001 | Default state | Matches snapshot |
| V-002 | All variants | Each variant matches snapshot |
| V-003 | All states | Each state matches snapshot |

---

## Storybook Stories

### Required Stories

- [ ] Default
- [ ] All Variants
- [ ] All Sizes
- [ ] Loading State
- [ ] Error State
- [ ] Empty State
- [ ] Interactive (with actions)
- [ ] Accessibility Documentation

---

## Changelog

| Version | Date | Changes | Author |
|---------|------|---------|--------|
| 0.1.0 | {{date}} | Initial draft | |

---

## Approval

**Design Review:** Pending
**Technical Review:** Pending
**Accessibility Review:** Pending

See `APPROVAL.json` for detailed approval workflow status.

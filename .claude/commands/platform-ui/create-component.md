---
description: Generate a UI component following platform-ui patterns
---

# /create-component

Generates a UI component following platform-ui design patterns and component registry.

## Usage

```
/create-component <component-name> [--type primitive|composed|block|widget]
```

## Component Types

| Type | Location | Purpose |
|------|----------|---------|
| primitive | primitives/ | Low-level building blocks |
| composed | composed/ | Higher-level combinations |
| block | blocks/ | Page sections |
| widget | widgets/ | Gazetteer-bindable components |

## Component Registry

All components must be in `component-registry.ts`:
```typescript
export const COMPONENT_REGISTRY = {
  primitives: { ... },
  composed: { ... },
  designsystemet: { ... }
}
```

## Output

Creates component file:
```tsx
/**
 * <ComponentName>
 * 
 * @platform-ui-component
 */
import { Stack, Text } from '@xala-technologies/platform-ui';

export interface <ComponentName>Props {
  // Props
}

export function <ComponentName>({ ...props }: <ComponentName>Props) {
  return (
    <Stack>...</Stack>
  );
}
```

## Platform UI Rules

- ✅ Use only platform-ui components
- ❌ No raw HTML (`<div>`, `<span>`)
- ❌ No local CSS
- ✅ Use design tokens for spacing/colors

## Next Steps
After `/create-component`, run:
- `/qa-verify` to validate the component

---
description: Generate sample/seed data for development and testing
---

# /create-data

Generates sample and seed data for development and testing.

## Usage

```
/create-data <entity-name> [--count 10] [--realistic]
```

## What It Creates

1. **Seed Data** - Database seeds for development
2. **Mock Data** - Test fixtures
3. **API Mocks** - MSW handlers for testing

## Output

### Seed File
```typescript
// seeds/<entity>.seed.ts
export const <entity>Seeds = [
  { id: '1', name: 'Sample 1', ... },
  { id: '2', name: 'Sample 2', ... },
];
```

### Test Fixtures
```typescript
// tests/fixtures/<entity>.fixtures.ts
export const mock<Entity> = {
  valid: { ... },
  invalid: { ... },
  list: [ ... ],
};
```

### MSW Handlers
```typescript
// tests/mocks/<entity>.handlers.ts
import { http, HttpResponse } from 'msw';

export const <entity>Handlers = [
  http.get('/api/<entity>', () => {
    return HttpResponse.json(mock<Entity>.list);
  }),
];
```

## Realistic Data

With `--realistic` flag, generates:
- Norwegian names and addresses
- Valid organization numbers
- Realistic dates and timestamps

## Next Steps
After `/create-data`, run:
- `/qa-verify` to validate the data

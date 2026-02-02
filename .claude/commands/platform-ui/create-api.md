---
description: Generate API endpoints from data spec
---

# /create-api

Generates API endpoints based on the data specification.

## Usage

```
/create-api <entity-name> [--crud] [--custom <action>]
```

## CRUD Endpoints

With `--crud` flag, generates standard endpoints:

| Method | Path | Purpose |
|--------|------|---------|
| GET | `/api/<entity>` | List all |
| GET | `/api/<entity>/:id` | Get one |
| POST | `/api/<entity>` | Create |
| PUT | `/api/<entity>/:id` | Update |
| DELETE | `/api/<entity>/:id` | Delete |

## Output

Creates route file following platform API patterns:
```typescript
// routes/<entity>.routes.ts
import { Hono } from 'hono';
import { db } from '@xala-technologies/platform-schema';

const app = new Hono();

// GET /api/<entity>
app.get('/', async (c) => {
  const items = await db.select().from(<entity>);
  return c.json(items);
});

// ... other CRUD endpoints
```

## Validation

Uses Zod schemas from data spec:
```typescript
import { insert<Entity>Schema } from '@xala-technologies/platform-schema';

app.post('/', zValidator('json', insert<Entity>Schema), async (c) => {
  // ...
});
```

## SDK Generation

Also generates SDK controller:
```typescript
// sdk/<entity>.controller.ts
export const <entity>Controller = {
  list: () => api.get('/api/<entity>'),
  get: (id) => api.get(`/api/<entity>/${id}`),
  create: (data) => api.post('/api/<entity>', data),
  // ...
};
```

## Next Steps
After `/create-api`, run:
- `/qa-verify` to validate the API

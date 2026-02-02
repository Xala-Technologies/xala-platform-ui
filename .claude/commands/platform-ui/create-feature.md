---
description: Generate a feature module with pages, API, and tests
---

# /create-feature

Generates a complete feature module including pages, routes, API endpoints, and tests.

## Usage

```
/create-feature <feature-name> [--entity <entity-name>]
```

## What It Creates

A feature is a cohesive module with:
- List page (table view)
- Detail page (view single)
- Form page (create/edit)
- API endpoints (CRUD)
- Tests (unit, integration, E2E)

## Output Structure

```
gazetteer/
├── pages/
│   ├── <feature>-list.page.json
│   ├── <feature>-detail.page.json
│   └── <feature>-form.page.json
├── routes/
│   ├── <feature>-list.route.json
│   ├── <feature>-detail.route.json
│   └── <feature>-form.route.json
tests/
├── e2e/<feature>.spec.ts
```

## Entity Binding

If `--entity` specified, binds to data spec:
```json
{
  "bindings": {
    "entity": "entities.<entity-name>",
    "fields": "entities.<entity-name>.properties"
  }
}
```

## Example

```
/create-feature projects --entity Project
```

Creates:
- `/projects` - List of projects
- `/projects/:id` - View project
- `/projects/new` - Create project
- `/projects/:id/edit` - Edit project

## Next Steps
After `/create-feature`, run:
- `/create-api` to generate API endpoints
- `/qa-verify` to validate the feature

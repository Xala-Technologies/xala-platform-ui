---
description: Generate a page with widgets from catalogs
---

# /create-page

Generates a page specification with widgets based on page type and catalog selection.

## Usage

```
/create-page <page-name> [--type dashboard|table|detail|form|wizard|public]
```

## Page Types

| Type | Widgets | Use Case |
|------|---------|----------|
| dashboard | StatCard, Chart, RecentActivity | Overview pages |
| table | DataTable, FilterBar, Actions | List/index pages |
| detail | EntityHeader, KeyValue, Tabs | View single entity |
| form | SchemaForm, Validation | Create/edit entity |
| wizard | WizardStepper, Steps | Multi-step flows |
| public | HeroBanner, FeatureGrid | Marketing pages |

## Widget Catalogs

Pages pull widgets from:
- `catalogs/widgets.dashboard.catalog.json`
- `catalogs/widgets.tables.catalog.json`
- `catalogs/widgets.crud.catalog.json`
- `catalogs/shells.public.catalog.json`

## Output

Creates `gazetteer/pages/<page-name>.page.json`:
```json
{
  "$schema": "@xala-technologies/gazetteer/schemas/page.spec.json",
  "pageId": "<page-name>",
  "shellType": "authenticated",
  "widgets": {
    "header": [ ... ],
    "content": [ ... ]
  }
}
```

Also creates matching route: `gazetteer/routes/<page-name>.route.json`

## i18n Keys

Adds required translation keys to `gazetteer/i18n/*.json`

## Next Steps
After `/create-page`, run:
- `/qa-verify` to validate the page

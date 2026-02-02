---
description: Define product vision, roadmap, and user stories
---

# /spec-product

Defines the product specification before building. This is the first step in the Design OS process.

## What It Produces

1. **Product Vision** - Why this product exists, target users, key differentiators
2. **Product Roadmap** - Phases, milestones, MVP scope
3. **User Stories** - Epics and stories with acceptance criteria
4. **Feature Map** - Feature breakdown by module/section

## Usage

```
/spec-product <product-name>
```

## Process

### Step 1: Vision Definition
Ask the user:
- What problem does this product solve?
- Who are the target users?
- What's the unique value proposition?

### Step 2: Roadmap Planning
- Define MVP scope
- Identify phase 1, 2, 3 features
- Set milestones

### Step 3: User Stories
For each feature:
- Epic title
- User stories with "As a... I want... So that..."
- Acceptance criteria

## Output

Create `specs/product.spec.json`:
```json
{
  "$schema": "@xala-technologies/gazetteer/schemas/product.spec.json",
  "name": "<product-name>",
  "vision": { ... },
  "roadmap": { ... },
  "features": [ ... ],
  "stories": [ ... ]
}
```

## Next Steps
After `/spec-product`, run:
- `/spec-data` to define data model
- `/spec-design` to define design system

---
description: Define data model, entities, and relationships
---

# /spec-data

Defines the data structure for the product. Second step in the Design OS process.

## What It Produces

1. **Entities** - Core data objects with properties
2. **Relationships** - How entities connect
3. **Validation Rules** - Constraints and business rules
4. **Sample Data Schema** - Shape of seed data

## Usage

```
/spec-data <product-name>
```

## Process

### Step 1: Entity Identification
From the product spec, extract:
- Core entities (User, Project, Task, etc.)
- Supporting entities (Comments, Attachments, etc.)
- Reference data (Status, Types, Categories)

### Step 2: Property Definition
For each entity:
- ID, timestamps (createdAt, updatedAt)
- Core properties with types
- Nullable vs required

### Step 3: Relationships
Define:
- One-to-one
- One-to-many
- Many-to-many (junction tables)

### Step 4: Validation Rules
- Required fields
- Format validation
- Business constraints

## Output

Create `specs/data.spec.json`:
```json
{
  "$schema": "@xala-technologies/gazetteer/schemas/data.spec.json",
  "entities": {
    "Project": {
      "properties": {
        "id": { "type": "uuid", "primary": true },
        "name": { "type": "string", "required": true },
        "ownerId": { "type": "uuid", "ref": "User" }
      }
    }
  },
  "relationships": [ ... ]
}
```

## Next Steps
After `/spec-data`, run:
- `/spec-design` to define design system
- `/create-api` to generate API from data model

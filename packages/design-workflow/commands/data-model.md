# /data-model

Define the core data entities and relationships.

## Prerequisites

Run `/product-vision` and `/product-roadmap` first.

## Instructions

Based on the product vision and roadmap, help define:

1. **Entities** - Core data objects (User, Story, Document, etc.)

2. **Fields** - Properties of each entity with types

3. **Relationships** - How entities connect (one-to-many, etc.)

## Questions to Ask

- What are the main "things" in your system?
- What information do you need to store about each?
- How do these things relate to each other?
- What fields are required vs optional?

## Output Format

Create `product/data-model.yaml`:

```yaml
entities:
  - name: User
    description: A registered user of the platform
    fields:
      - name: id
        type: string
        required: true
        description: Unique identifier
      - name: email
        type: string
        required: true
      - name: name
        type: string
        required: true
      - name: avatar
        type: string
        required: false
      - name: createdAt
        type: Date
        required: true
    relationships:
      - entity: Story
        type: one-to-many
        field: authorId

  - name: Story
    description: A user-created story
    fields:
      - name: id
        type: string
        required: true
      - name: title
        type: string
        required: true
      - name: content
        type: string
        required: true
      - name: status
        type: "'draft' | 'published' | 'archived'"
        required: true
      - name: authorId
        type: string
        required: true
      - name: createdAt
        type: Date
        required: true
      - name: updatedAt
        type: Date
        required: true
    relationships:
      - entity: User
        type: many-to-one
        field: authorId
```

## TypeScript Output

Also generate `product/types.ts`:

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  status: 'draft' | 'published' | 'archived';
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}
```

## Next Step

After completing data model, run `/section-spec [name]` for each section in the roadmap.

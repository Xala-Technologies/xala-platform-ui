# /product-roadmap

Break down the product into implementable sections.

## Prerequisites

Run `/product-vision` first to establish the product foundation.

## Instructions

Based on the product vision, help the user define:

1. **Phases** - Logical groupings of work (MVP, v1.0, v1.1, etc.)

2. **Sections** - Distinct feature areas within each phase

3. **Priorities** - critical, high, medium, low

4. **Dependencies** - What must be built before what?

## Questions to Ask

- What's the minimum viable product (MVP)?
- What features can wait for later phases?
- Are there any technical dependencies between features?
- What's the most valuable feature to users?

## Output Format

Create `product/roadmap.yaml`:

```yaml
phases:
  - name: MVP
    description: Core functionality for first release
    sections:
      - name: [Section Name]
        description: [What this section does]
        priority: critical
        status: planned
        dependencies: []
      
      - name: [Section Name]
        description: [What this section does]
        priority: high
        status: planned
        dependencies:
          - [Dependent Section]

  - name: v1.0
    description: Feature-complete first version
    sections:
      - name: [Section Name]
        description: [What this section does]
        priority: medium
        status: planned
```

## Section Naming Guidelines

Good section names are:
- **Noun-based**: "User Dashboard", "Story Editor", "Settings"
- **Feature-focused**: Describe what the user can do
- **Independent**: Can be implemented separately

## Next Step

After completing roadmap, run `/data-model` to define the data structure.

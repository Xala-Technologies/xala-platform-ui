# /section-spec [section-name]

Specify requirements for a section.

## Prerequisites

Run `/product-vision`, `/product-roadmap`, and `/data-model` first.

## Instructions

For the specified section, define:

1. **User Stories** - As a [user], I want to [action] so that [benefit]

2. **Components** - What UI components are needed?

3. **Data Requirements** - What entities and fields are used?

4. **States** - Loading, empty, populated, error states

## Questions to Ask

- What can users do in this section?
- What information is displayed?
- What actions can users take?
- What happens when there's no data?
- What errors might occur?

## Component Reference

Use components from **@xala-technologies/platform-ui**:

### Primitives
`button`, `card`, `badge`, `chip`, `text-field`, `select`, `checkbox`, `radio`, `switch`

### Composed
`data-table`, `modal`, `drawer`, `tabs`, `accordion`, `breadcrumbs`

### Blocks
`notification-bell`, `user-menu`, `search-bar`, `filter-panel`

### Shells
`app-layout`, `dashboard-layout`, `dashboard-sidebar`

### Patterns
`resource-card`, `resource-grid`, `slot-calendar`, `pricing-summary`

## Styling Attributes

- `data-color`: `accent` | `neutral` | `brand1` | `brand2` | `brand3`
- `data-size`: `sm` | `md` | `lg`

## Output Format

Create `product/sections/[section-name]/spec.yaml`:

```yaml
name: Story Editor
description: Interface for creating and editing stories

userStories:
  - as: content creator
    want: write and format my story
    so: I can share it with my audience
  - as: content creator
    want: save my work automatically
    so: I don't lose my progress
  - as: content creator
    want: preview how my story will look
    so: I can ensure quality before publishing

components:
  - type: card
    category: primitives
    name: EditorCard
    purpose: Container for the editor interface
    props:
      data-color: neutral
  
  - type: text-field
    category: primitives
    name: TitleInput
    purpose: Story title input
    props:
      data-size: lg
  
  - type: button
    category: primitives
    name: SaveButton
    purpose: Save the current story
    props:
      data-color: accent
    variants:
      - primary
      - loading
      - disabled

  - type: tabs
    category: composed
    name: EditorTabs
    purpose: Switch between edit and preview modes

dataRequirements:
  - entity: Story
    fields:
      - id
      - title
      - content
      - status
      - updatedAt
    operations:
      - read
      - update

states:
  - loading
  - empty
  - populated
  - error
  - saving

routes:
  - path: /stories/:id/edit
    name: Edit Story
    description: Edit an existing story
  - path: /stories/new
    name: New Story
    description: Create a new story
```

## Next Step

After completing all section specs, run `/export` to generate implementation handoff.

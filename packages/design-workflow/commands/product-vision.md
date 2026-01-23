# /product-vision

Define the product vision and goals.

## Instructions

Guide the user through defining their product vision by asking about:

1. **Product Name & Tagline** - What is this product called? One-line description?

2. **Problem Statement** - What problem does this solve? Who has this problem?

3. **Target Users** - Who are the primary users? What are their needs?

4. **Key Features** - What are the 3-5 core features?

5. **Success Metrics** - How will you measure success?

## Output Format

Create `product/vision.yaml`:

```yaml
name: [Product Name]
tagline: [One-line description]
description: |
  [2-3 sentence description]
problemStatement: |
  [Clear problem statement]
targetUsers:
  - name: [User Type]
    description: [Who they are]
    needs:
      - [Need 1]
      - [Need 2]
keyFeatures:
  - name: [Feature Name]
    description: [What it does]
successMetrics:
  - [Metric 1]
  - [Metric 2]
```

## Design System Context

This product will use **@xala-technologies/platform-ui** built on Norwegian Designsystemet.

Available component categories:
- **primitives**: Button, Card, Badge, Chip, TextField, Select, Checkbox, Radio, Switch
- **composed**: DataTable, Modal, Drawer, Tabs, Accordion, Breadcrumbs
- **blocks**: NotificationBell, UserMenu, SearchBar, FilterPanel
- **shells**: AppLayout, DashboardLayout, DashboardSidebar
- **patterns**: ResourceCard, ResourceGrid, SlotCalendar, PricingSummary

## Next Step

After completing vision, run `/product-roadmap` to break down the product into sections.
